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
	toggleRadioTextArea();

	$('#popProductReview').on({
		'dialogopen': function() {
			reviewAnimation(0);
		},

		'dialogclose': function() {
			reviewAnimation(1);
		},
	});
    
	// 상품정보 헤더 노출
	
	$(window).on('scroll', function(){  

		var visualImgHeight = $('.prod_detail_header .visual_wrap').outerHeight(true);
		var tgPosition = $(window).scrollTop();
		var headerWrap = $('#headerWrapper');

		if ( tgPosition > visualImgHeight ) {
			headerWrap.addClass('active_product');
		} else {
			headerWrap.removeClass('active_product');
		}
	});

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
					return KyoboHottracks.mok.setPrependZero(number, 2);
				},
				formatFractionTotal: function (number) {
					return KyoboHottracks.mok.setPrependZero(number, 2);
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

	var visualSwiper = new CustomSwiper('.visual_wrap .swiper-container', {
		slidesPerView: '1',	
		speed: 500,
		pagination: {
			el: $('.visual_wrap').find('.swiper-pagination')[0],
			type: 'fraction',
			formatFractionCurrent: function (number) {
				return KyoboHottracks.mok.setPrependZero(number, 2);
			},
			formatFractionTotal: function (number) {
				return KyoboHottracks.mok.setPrependZero(number, 2);
			},
		}
	});
	var hotpickSwiper = new CustomSwiper('.hotpickslide_wrap .swiper-container', {
		slidesPerView: 'auto',
		speed: 500,
		spaceBetween: 10,
		pagination: {
			el: $('.hotpickslide_wrap').find('.swiper_control_box .swiper-pagination')[0],
		},
	});
	

		
	var photoreviewSwiper = new CustomSwiper('.photoreviewSlide-01 .swiper-container', {
		slidesPerView: 'auto',
		speed: 500,
		spaceBetween: 10,
		centeredSlides: true,
		pagination: {
			el: $('.photoreviewSlide-01').find('.swiper-pagination')[0],
			type: 'fraction',
			formatFractionCurrent: function (number) {
				return KyoboHottracks.mok.setPrependZero(number, 2);
			},
			formatFractionTotal: function (number) {
				return KyoboHottracks.mok.setPrependZero(number, 2);
			},
		}
	});
	var photoreview02Swiper = new CustomSwiper('.photoreviewSlide-02 .swiper-container', {
		slidesPerView: 'auto',
		speed: 500,
		spaceBetween: 10,
		centeredSlides: true,
		pagination: {
			el: $('.photoreviewSlide-02').find('.swiper-pagination')[0],
			type: 'fraction',
			formatFractionCurrent: function (number) {
				return KyoboHottracks.mok.setPrependZero(number, 2);
			},
			formatFractionTotal: function (number) {
				return KyoboHottracks.mok.setPrependZero(number, 2);
			},
		}
	});
	
	//Q & A 펼치기 닫기
	$(document).on('click', '.all_qa_wrap .btn_expand', function(){
		if($(this).hasClass('btn_up')) {
			$(this).parents('.review_inner').removeClass('active');
			$(this).removeClass('btn_up').children('.txt').text('펼치기');
			return;
		}
		$(this).parents('.review_inner').addClass('active');
		$(this).addClass('btn_up').children('.txt').text('접기');

	});
	//별점 영역 선택 시 하단 리뷰 영역으로 이동
	$(document).on('click', '.rating_score_wrap .rating_container', function(){
		var reviewTop = $('.review_best_area').offset().top;
		var fixedHeight = $('.tab_list_wrap').height(); 
		$('html, body').scrollTop( reviewTop - fixedHeight );
	})

	//카테고리 상품 리스트 찜하기 토글
	$(document).on('click', '.module_wrap .evt_good_count', function(){
		if ($(this).hasClass('active')) {
			$(this).removeClass('active');
		} else {
			$(this).addClass('active');
		}
	});
	//대댓글 5개까지만 노출 후 전체 노출
	prodDetailCmtShow(true);

	function prodDetailCmtShow(bool){
		var reCmtEA = $('.all_review_wrap .review_reply .reply_list').children('.reply_list_item').length;

		if(bool){
			for(var i=0; i<reCmtEA; i++){
				if(i> 4) $('.all_review_wrap .review_reply .reply_list').children('.reply_list_item').eq(i).css('display', 'none');
			}
		}else{
			$('.all_review_wrap .review_reply .reply_list').children('.reply_list_item').css('display', 'block');
		}
	
	}
	$(document).on('click', '.btn_expand.reply_cmt', function(){
		if($(this).hasClass('active')) prodDetailCmtShow(false);
		else prodDetailCmtShow(true);
	})
	
	//장바구니, 구매하기 버튼 하단 팝업 시 노출
    footTabCustom();

	$('button[data-foot-btn]').click(function(){
		footTabCustom(true);
	});
	$(document).on('click','.dialog_header .close', function(){
		footTabCustom();
	});

	function footTabCustom( bool){
		if(bool){
			//Class:footer_wrap fixed_foot에 btm_pop_upper_foot 추가 시 팝업 위로 장바구니 버튼 노출
			$('.footer_wrap.fixed_foot').addClass('btm_pop_upper_foot');
			//뒤로가기 맨위로가기 안보이게
			$('.btn_go_back,.btn_go_top').css('opacity', '0');
		}else{
			$('.footer_wrap.fixed_foot').removeClass('btm_pop_upper_foot');
			$('.btn_go_back,.btn_go_top').css('opacity', '1');
		} 
	}

	//장바구니 팝업 상세 내용 닫기
	$(document).on('click', '.buy_info .close', function(){
		$(this).closest('.buy_info').css('display', 'none');
	});
	
    //쿠폰 다운 받기 토스트 메시지
	$(document).on('click', '.dialog_wrap .dialog_contents .buy_info .cpon',  toastBtn);
	function toastBtn(){
        KyoboHottracks.mok.setToastMessage('상품 쿠폰을 다운로드 받았습니다.', 3000);
    }

    //textarea focus 효과
	$(document).on('focus', '.mycomment_box textarea, .byte_check_wrap textarea', function(){
		$(this).parent().addClass('focus');
	});

	$(document).on('blur', '.mycomment_box textarea, .byte_check_wrap textarea', function(){
		$(this).parent().removeClass('focus');
	});

    //textarea 20자 제한 효과
	$(document).on('keyup', '.mycomment_box textarea', function(){
		if($(this).val().length > 20){
			$(this).parent().addClass('notice');
		} else {
			$(this).parent().removeClass('notice');
		}
	});

	//셀렉트 박스 커스텀
	$(document).on('click', '.selected_option', function(){
	var arrowIcon = $(this).children('.selec_icon');
	var thisOptionBox =  $(this).next('.option_ul');

	//셀렉트 박스 여러개인 경우 다른 옵션박스 닫기
	$('.option_ul').not(thisOptionBox).css('display', 'none');
	$('.title_selec').removeClass('active');

	//옵션박스 나타나는 토글
	if($(this).next('.option_ul').css('display') == 'none'){
		$(this).parent().addClass('active');
		$(this).next('.option_ul').css('display', 'block');
		$(arrowIcon).addClass('open'); 
	}else{
		$(this).parent().removeClass('active');
		$(this).next('.option_ul').css('display', 'none');
		$(arrowIcon).removeClass('open'); 
	}
	});

	//옵션 선택
	$(document).on('click', '.option_ul li', function(){
		var select = $(this).parent().prev('.selected_option').find('em').eq(0);
		var arrowIcon  =  $(this).parent().prev('.selected_option').find('.selec_icon');
		var thisVal = $(this).attr('data-val');
		var thisTxt = $(this).text();

		select.text(thisTxt).attr('data-val', thisVal);
		//화살표 에니메이션 
		$(arrowIcon).addClass('open'); 
		//옵션 박스 닫기
		$(this).parents('.title_selec').removeClass('active');
		$(this).parent().css('display', 'none');
		$(arrowIcon).removeClass('open'); 
	});
	
	//바디 영역 선택시 셀렉트 닫기
	$(document).on('click', function(e){
		if( !$(e.target).parent().hasClass('option_ul') &&
			!$(e.target).parent().hasClass('selected_option') &&
			!$(e.target).parent().hasClass('title_selec')
		){ 
			$('.title_selec').removeClass('active');
			$('.option_ul').css('display', 'none');
			$('.selec_icon').removeClass('open');
		};
	});
	   
});

// 상품상세 앵커탭 기능
function setProdDetailAnchor(){
	if($('.tab_wrap.prod_detail_body').length > 0) {
		var _tabLinks;
		_tabLinks = $('.tab_list_wrap .tabs .tab_item .tab_link');

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
			offsetTop = $(targetId).offset().top - 52;
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

// radio 클릭 시 textarea 노출
function toggleRadioTextArea() {
	if ($('.toggle_textarea_list .chk_col_item').length > 0) {
		var checkInput, hasTextarea, targetTextarea;

		$('.toggle_textarea_list .chk_col_item').each(function () {
			hasTextarea = $(this).find('.byte_check_wrap').length > 0;

			if (hasTextarea) {
				checkInput = $(this).find('> .form_rdo input');
				checkInput.on('change', function () {
					targetTextarea = $(this).closest('.chk_col_item').find('.byte_check_wrap .form_textarea');
					targetTextarea.attr('disabled', false);
				});
			} else {
				checkInput = $(this).find('> .form_rdo input');
				checkInput.on('change', function () {
					if (targetTextarea) {
						targetTextarea.attr('disabled', true);
					}
				});
			}
		});
	}
}

/**
 * 리뷰팝업 트랜지션 전용 스크립트
 * @param type {string} 팝업 이벤트 타입(0 - pop open / 1 - pop close)
 */
 function reviewAnimation(evttype){
	var reviewPopContainer = $('.dialog_wrap.product_review');
	var ratingTg = $('.form_rating', reviewPopContainer);
	var reviewProdItem = $('.thumbnail_round_box', reviewPopContainer);
	var reviewBtnTag = $('.tag_wrap .tag_item', reviewPopContainer);

	if(evttype === 0){
		ratingTg.on('rating:change', function(event, value, caption){
			reviewPopContainer.addClass('review_next has_btn');
			reviewProdItem.find('.thumbnail_product_item').addClass('horizontal_type');
			reviewPopContainer.find('.rating-container').addClass('rating-sm').removeClass('rating-lg');
		});

		reviewProdItem.on('transitionend', function () {
			$('.form_wrap .form_box.review_step01', reviewPopContainer).addClass('animated');
		});

		reviewBtnTag.on('click', function(){
			$('.form_wrap .form_box.review_step02', reviewPopContainer).addClass('animated');
		});

		setTimeout(function (){
			reviewPopContainer.addClass('open');
		}, 200);
	}else{
		ratingTg.rating('reset');
		reviewPopContainer.removeClass('open review_next has_btn');
		reviewProdItem.find('.thumbnail_product_item').removeClass('horizontal_type');
		reviewPopContainer.find('.rating-container').removeClass('rating-sm').addClass('rating-lg');
		reviewBtnTag.removeClass('active');
		$('.form_wrap .form_box', reviewPopContainer).removeClass('animated');
	}
}
$(window).off('resize.uiProdTitle orientationChange.uiProdTitle', setProdTitleMoreBtn).on('resize.uiProdTitle orientationChange.uiProdTitle', setProdTitleMoreBtn);