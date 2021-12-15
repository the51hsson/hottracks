/*
 * name : ui_product_mok.js
 * desc : 상품 공통 자바스크립트
 * writer : glim
 * create : 2021/11/26
 * update :
 * -
 */

$(function(){
	setProdDetailAnchor();
	reviewTabAnchor();

	setProdTitleMoreBtn();

	// 리뷰 내 리뷰 썸네일 swiper
	$(".review_swiper .swiper-container").each(function (index, element) {
		var reviewSwiper = new CustomSwiper(this, {
			observer: true,
			observeParents: true,
			slidesPerView: 'auto',
			loop: true,
			navigation: {
				nextEl: $(this).siblings('.swiper-button-next'),
				prevEl: $(this).siblings('.swiper-button-prev'),
			},
			pagination: {
				el: '.review_swiper .swiper-pagination',
				type: 'fraction',
				renderFraction: function(currentClass, totalClass){
					return '<span class="' + currentClass + '"></span>' + '<span class="' + totalClass + '"></span>';
				},
				formatFractionCurrent: function (number) {
					return KyoboBookPub.mok.setPrependZero(number, 2);
				},
				formatFractionTotal: function (number) {
					return KyoboBookPub.mok.setPrependZero(number, 2);
				},
			},
		});
	});

	// 추천 팝업 스와이퍼
	var prodRecommendSwiper;

	prodRecommendSwiper = new CustomSwiper('.prod_recommend_list_wrap .swiper-container', {
		slidesPerView: '1',
		loop: true,
		speed: 500,
		autoHeight: true,
		on: {
			slideChangeTransitionStart: function(swiper) {
				$('#popRecommendList .dialog_contents .prod_recommend_list').scrollTop(0);
			}
		}
	});

	// 추천 팝업 전체보기, 전체닫기 버튼
	$('.prod_recommend .dialog_wrap .btn_show_all_list').on('click', function(event) {
		$('.prod_recommend .dialog_wrap .dialog_contents').addClass('show_all_list').find('.btn_close_all_list').focus();
	});
	$('.prod_recommend .dialog_wrap .btn_close_all_list').on('click', function(event) {
		$('.prod_recommend .dialog_wrap .dialog_contents').removeClass('show_all_list');
		$('.prod_recommend .dialog_wrap .btn_show_all_list').focus();
	});
});

// 상품상세 앵커탭 기능
function setProdDetailAnchor(){
	if($('.tab_wrap.prod_detail_body').length > 0) {
		var _tabLinks;
		_tabLinks = $('.tab_wrap.prod_detail_body > .tab_list_wrap .tabs .tab_item .tab_link');

		// 옵션영역 펼치기
		$('.btn_option_more', '.prod_option_info_wrap').on('click', function () {
			var optionSelectBox = $(this).closest('.prod_option_info_wrap');

			if (optionSelectBox.hasClass('active')) {
				optionSelectBox.removeClass('active');
				$(this).find('.hidden').text('옵션 선택 영역 접기');
			} else {
				optionSelectBox.addClass('active');
				$(this).find('.hidden').text('옵션 선택 영역 펼치기');
			}
		});

		// 상품 상세 탭 링크 클릭시 해당 위치로 이동
		_tabLinks.on('click.product', function (event) {
			var targetId, offsetTop;
			event.preventDefault();

			targetId = event.currentTarget.getAttribute('href');
			offsetTop = $(targetId).offset().top - 46;
			$('html, body').stop().animate({scrollTop: offsetTop}, 300);
		});

		// 상세 컨텐츠 블럭별 class 값 변경 Observer
		var tabObserver = new MutationObserver(function (mutations) {
			mutations.forEach(function (mutation) {
				if (mutation.attributeName === 'class') {
					var target, currentClassList;
					target = mutation.target;
					currentClassList = target.classList.value;
					if (target.dataset.prevClass !== currentClassList) {
						target.dataset.prevClass = currentClassList;

						setTabBtnActive();
					}
				}
			});
		});

		// 스크롤에 따라 탭 active 상태 변경
		function setTabBtnActive() {
			var activeIndex;
			activeIndex = $('.prod_detail_contents .tab_content.sps-blw').length - 1;

			_tabLinks.parent().removeClass('active');
			if (activeIndex !== -1) {
				_tabLinks.eq(activeIndex).parent().addClass('active');
				$('.wrapper').addClass('sticky_tabs');
			} else {
				$('.wrapper').removeClass('sticky_tabs');
			}
		}

		document.querySelectorAll('.prod_detail_contents .tab_content.sps').forEach(function (target) {
			target.dataset.prevClass = target.classList;
			tabObserver.observe(target, {attributes: true});
		});

		// 상세 해더영역 이미지 하단 class 값 변경 Observer
		var prodHeaderObserver = new MutationObserver(function (mutations) {
			mutations.forEach(function (mutation) {
				if (mutation.attributeName === 'class') {
					var target, currentClassList;
					target = mutation.target;
					currentClassList = target.classList.value;
					if (target.dataset.prevClass !== currentClassList) {
						target.dataset.prevClass = currentClassList;

						setHeaderType();
					}
				}
			});
		});

		function setHeaderType() {
			if ($('.prod_detail_header .prod_detail_view_wrap').hasClass('sps-blw')) {
				$('.header_wrapper').removeClass('type_white');
			}
			else {
				$('.header_wrapper').addClass('type_white');
			}
		}

		document.querySelectorAll('.prod_detail_header .prod_detail_view_wrap.sps').forEach(function (target) {
			target.dataset.prevClass = target.classList;
			prodHeaderObserver.observe(target, {attributes: true});
		});
	}
}

// 상품 상단 - 리뷰 영역 선택 시 하단 리뷰로 이동
function reviewTabAnchor() {
	if ($('.prod_review_box .btn_go_review').length > 0) {
		$('.prod_review_box .btn_go_review').on('click', function () {
			var reviewOffsetTop;
			reviewOffsetTop = Math.floor($('#scrollSpyProdReview').offset().top) - 46;

			$('html, body').stop().animate({scrollTop: reviewOffsetTop}, 300);
		});
	}
}

// 상품 상세 상단 타이틀 더보기 버튼 - 한 개만 노출 되도록
function setProdTitleMoreBtn() {
	var overflowEl, overflowElCnt;
	overflowEl = $('.prod_detail_title_wrap .auto_overflow_wrap.overflow');
	overflowElCnt = overflowEl.length;

	if (overflowElCnt > 1) {
		overflowEl.each(function (index) {
			if (index < overflowElCnt - 1) {
				$(this).find('> .auto_overflow_footer .btn_more_detail').remove();
			}
		});
	}
}
$(window).off('resize.uiProdTitle orientationChange.uiProdTitle', setProdTitleMoreBtn).on('resize.uiProdTitle orientationChange.uiProdTitle', setProdTitleMoreBtn);