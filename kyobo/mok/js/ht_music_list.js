$(function(){
//스티키 메뉴
  $(document).on('click' , '.ctg_floating_menues li, .ctg_floating_menues button', function(){
        if($(this).hasClass('arrow_li')) { // 애로우 있는 화면 
        return; 
        }
        //개발에서 진행예정
        // if($(this).hasClass('active')){
        //   $(this).removeClass('active');
        // }else{
        //   $(this).addClass('active');
        // }
    });

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
    $(document).on('click', '.ctg_prod_wrap .sold_out .replace_prod_btn', function(){
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
    //카테고리 상품 리스트 찜하기 토글
	$(document).on('click', '.evt_good_count', function(){
		if ($(this).hasClass('active')) {
			$(this).removeClass('active');
		} else {
			$(this).addClass('active');
		}
	});
    //체크박스, 라디오 선택 시 팝업 닫히게
    $(document).on('click', '.dialog_wrap[id^="ClickCksClose"] .dialog_contents .checkbox_cm', function(){
            var closeBtn = $(this).parents('.dialog_wrap').find('button[data-dialog-close]');
        setTimeout(function(){
            $(closeBtn ).trigger('click');
        }, 200);
    });
 

  //예약 상품, 베스트, 신상품  스왑배너
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
    //차트 선택 팝업 스왑
    chartPeriod('2023년', '10월', '3주', '13일');

    function chartPeriod(yy ,mm ,wk ,dd){
        if(! $('.vertical_swap_content').length) return;
        //초기 설정 날짜 인덱스 값
        var initNum = null;
        var initYear = yy;
        var initMonth = mm;
        var initWeek = wk;
        var initDay = dd; 

        $('.swiper.chart_date_swap').each(function(i, ele) {
            var year =  $(ele).parents('.dialog_contents').find('.swiper.chart_date_swap.year');
            var month = $(ele).parents('.dialog_contents').find('.swiper.chart_date_swap.month');
            var week =  $(ele).parents('.dialog_contents').find('.swiper.chart_date_swap.week');
            var day =  $(ele).parents('.dialog_contents').find('.swiper.chart_date_swap.day');

            if(year.length){
                $(year).find('.swiper-slide').each(function(index, item){
                   if($(item).text()== initYear){
                       initNum  =  index; 
                   };
                });
            }
            if(month.length){
                $(ele).find('.swiper-slide').each(function(index, item){
                   if($(item).text() == initMonth){
                       initNum  =  index;
               
                   };
                });
            }
            if(week.length){
                $(ele).find('.swiper-slide').each(function(index, item){
                   if($(item).text() == initWeek){
                       initNum  =  index;

                   };
                });
            }
            if(day.length){
                $(ele).find('.swiper-slide').each(function(index, item){
                   if($(item).text() == initDay){
                       initNum  =  index;
                   };
                });
            }
    
            var chartSwiper = new Swiper(this, {
                direction: "vertical",
                loop:true,
                slidesPerView: 5,
                initialSlide: initNum,
                centeredSlides: true,
                centeredSlidesBounds: true,
                observer: true,
                observeParents: true,
                on:{
                        observerUpdate:setTitle,
                        slideChangeTransitionEnd:setTitle,
                    }
            });
            function setTitle() {        
                //해당 팝업 안의 날짜 선택 스왑 개수      
                var yearTxt, yearTarget, monthTxt, monthTarget, weekTarget, weekTxt, dayTarget, dayTxt;  
                if(year.length) {
                    yearTxt = year.find('.swiper-slide.swiper-slide-active').text();
                    yearTarget  = $(ele).parents('.dialog_wrap').find('.dialog_header .year');
                    yearTarget.text(yearTxt);
                }
                if(month.length) {
                    monthTxt = month.find('.swiper-slide.swiper-slide-active').text();
                    monthTarget  = $(ele).parents('.dialog_wrap').find('.dialog_header .month');
                    monthTarget.text(monthTxt);
                    }
                if(day.length) {
                    dayTxt = day.find('.swiper-slide.swiper-slide-active').text();
                    dayTarget  = $(ele).closest('.dialog_wrap').find('.dialog_header .day');
                    dayTarget.text(dayTxt);
                }
                if(week.length) {
                    weekTxt = week.find('.swiper-slide.swiper-slide-active').text();
                    weekTarget  = $(ele).closest('.dialog_wrap').find('.dialog_header .week');
                    weekTarget.text(weekTxt);
                }
            
                            
            }
        });
    }
});
//광고 배너 스왑
$(function(){
    if (!$('.wel_belt_banner').length) return;
    $('.wel_belt_banner .swiper-container').each(function (index, element) {
        var $parent = $(this).parent('.wel_belt_banner');
        $parent.addClass('idx_' + index);

        if($parent.find('.swiper-slide').length > 1) {
            var beltBannerSwiper = new CustomSwiper(this, {
                observer: true,
                observeParents: true,
                slidesPerView: 1,
                loop: true,
                loopsSlide:1,
                autoHeight: true,
                pagination: {
                    el: ('.idx_' + index + ' .swiper-pagination'),
                }
            }); 
        }
    });
});