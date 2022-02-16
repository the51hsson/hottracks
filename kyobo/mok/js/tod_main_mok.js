$(function(){
	//오늘만 특가, 핫딜 특가 메뉴 활성화
	$(document).on('click', '.tod_menu_wrap .tod_menu', function(){
		$(this).addClass('active').siblings('.tod_menu').removeClass('active');
	});
	//상품 리스트 찜하기 토글
	$(document).on('click', '.evt_good_count', function(){
		if ($(this).hasClass('active')) {
			$(this).removeClass('active');
		} else {
			$(this).addClass('active');
		}
	});
	
	//MD 추천 상단스왑
	$('.swiper-container.ctg_top_swiper').each(function(i, ele){
	    var ctgSwiper = new Swiper(this,  {
			observer: true,
			observeParents: true,
			slidesPerView: 'auto',
			centeredSlides: true,
			loop: true,
			loopsSlide: 1,
			spaceBetween: 20,
			autoplay: {
				delay: 5000,
				disableOnInteraction: false,
			},
			speed: 700,
			pagination: {
			el: $(ele).find('.swiper-pagination')[0],
			type: 'fraction',
			formatFractionCurrent: function (number) {
				return KyoboHottracks.mok.setPrependZero(number, 2);
			},
			formatFractionTotal: function (number) {
				return KyoboHottracks.mok.setPrependZero(number, 2);
			}
			}
	    });
	});

	

   //말풍선 효과
	if($('.ranking_bubble_area').length > 0){
		window.addEventListener('scroll', promotionEffect);
		promotionEffect();
	}
	
	function promotionEffect(){
       var bubbles = document.querySelectorAll('.ranking_bubble_area');
	   for(var i=0; i< bubbles.length; i++){
		 if(bubbleHighlight(bubbles[i])){
			$(bubbles[i]).css('visibility', 'visible');
			$(bubbles[i]).find('.rank_icon').addClass('icon_show');

		 }else{
			$(bubbles[i]).css('visibility', 'hidden');
			$(bubbles[i]).find('.rank_icon').removeClass('icon_show');
		 };
	   }

	} 
	function bubbleHighlight(item){
		var isShow
		var headerHeight = $('#headerWrapper').height();
		var stickMenuHeight = $('.ctg_topMenu').height();
		var scrolltop  = $(window).scrollTop();
		var offsetTop = $(item).offset().top;

		isShow = (offsetTop - headerHeight - stickMenuHeight - 200 > 0 ) &&
		         (offsetTop - headerHeight - stickMenuHeight - 200 < scrolltop);
		return isShow; 
	}
	//베스트, 신상품, 무료배송 서브 메뉴 활성화 기능
	$(document).on('click', '.menu_sort .btn_sort', function(){
		$(this).addClass('active').siblings().removeClass('active');
	})

	//상품 리스트 정렬 방식 토글 버튼
	$('.ctg_prod_wrap .ctg_list_icon').click(function(){
	//품절 대체 스왑 display:none으로 초기화 
		$('.show_bubble.show_bubble').removeClass('show_bubble');

		if ($(this).hasClass('row_list')) {
			$(this).removeClass('row_list');
			$('.evt_products').removeClass('row_dir');
			$('.list_sort_txt').text('두줄보기');

		} else {
			$(this).addClass('row_list');
			$('.evt_products').addClass('row_dir');
			$('.list_sort_txt').text('한줄보기');
		}
	 });
	//품절 대체 상품 버튼 클릭
	$(document).on('click', '.sold_out .replace_prod_btn', function(){
		var replaceBubble = $(this).parents('li').children('article.replace_prod_swap');
		
		if(replaceBubble.length > 0 &&  replaceBubble.css('display') == 'none'){
			replaceBubble.addClass('show_bubble');
			$(window).scrollTop(replaceBubble.offset().top - 250);
		};
	});
	//품절 대체 스왑 닫기
	$(document).on('click', '.replace_prod_swap .close_swap', function(){
		$(this).parents('.replace_prod_swap').removeClass('show_bubble');
	});
	//품절 대체 상품 스왑배너
	$('.replace_prod_swap .mySwiper').each(function (index, element) {
		var $parent = $(this).parent('.replace_prod_swap');
		$parent.addClass('idx_' + index);

		if($parent.find('.swiper-slide').length > 1) {
			var replaceSwiper = new CustomSwiper(this, {
			slidesPerView: 'auto',
			spaceBetween: 16,
			freeMode: true,
			observer: true,
			observeParents: true,
			}); 
		}
	});
    /*================================= HTR-M-EVT-VIEW-015, 016.html ==============================*/  
    //스티키 샐렉트 메뉴 선택 시 해당 위치로 이동
    $(document).on('change', '.sticky_selec .common_select', function(){
        var thisTarget = $(this).children('option:selected').data('target') ;
        var fixedTopHeight = 150; 
        if(!thisTarget || $(thisTarget).length == 0) return;
        var Top = $(thisTarget).offset().top - fixedTopHeight;
        $('html, body').animate({
                  scrollTop: Top
              }, 200);
    }); 

})