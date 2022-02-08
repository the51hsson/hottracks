// Hero Banner
$(function(){
    if(!$('.wel_hero_banner').length) return;
    if($('.wel_hero_banner .swiper-slide').length > 1) {
        var heroSwiper = new CustomSwiper('.wel_hero_banner .swiper-container', {
            slidesPerView: 'auto',
            speed:700,
            spaceBetween:20,
            centeredSlides: true,
            loop: true,
            loopsSlide:1,
            autoplay: {
                delay: 5000,
                disableOnInteraction: false,
            },
            pagination: {
                el: $('.wel_hero_banner').find('.swiper-pagination')[0],
                type: 'fraction',
                formatFractionCurrent: function (number) {
                    return KyoboHottracks.mok.setPrependZero(number, 2);
                },
                formatFractionTotal: function (number) {
                    return KyoboHottracks.mok.setPrependZero(number, 2);
                },
            }
        });
        $('.wel_hero_banner .option_box').css('display','flex');
    }
    $('.wel_hero_banner .play_pause_box').click(function(){
        if ( $(this).hasClass('play') ) {
            heroSwiper.autoplay.stop();
            $(this).removeClass('play').addClass('pause');
        } else {
            heroSwiper.autoplay.start();
            $(this).removeClass('pause').addClass('play');
        }
    });
});

function btnHeroListOp(){
    $('body').css('overflow','hidden');
    $('.pop_hero').addClass('on');
}
function btnHeroListCl(){
    $('body').css('overflow','');
    $('.pop_hero').addClass('off');
    setTimeout(function(){
        $('.pop_hero').removeClass('off').removeClass('on');
    }, 600);
}



// 오늘만 특가
$(function(){
    if(!$('.wel_today_cont').length) return;
    var welToday = new CustomSwiper('.wel_today_cont .swiper-container', {
        observer: true,
        observeParents: true,
        slidesPerView: 'auto',
        centeredSlides: true,
        loop: true,
        loopsSlide:1,
        spaceBetween:20,
        autoplay: {
            delay:5000,
            disableOnInteraction: false,
        },
        speed:700,
		pagination: {
			el: $('.wel_today_cont').find('.swiper-pagination')[0],
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




// 핫트랙스 라이브
$(function(){
    $('.btn_wel_live_good').on('click', function(e) {
        e.preventDefault();
        if( $(this).hasClass('on')){
            $(this).removeClass('on')
        }else{
            $(this).addClass('on');
            setTimeout(function(){
                $('.btn_wel_live_good').removeClass('on');
            }, 8000); 
        }
    });  
});





// 실시간 홈쇼핑
$(function(){
    var welSearchOption = {
        direction: "vertical",
        slidesPerView: 'auto',
        loop:true,
        loopsSlide:1,
        spaceBetween:0,
        touchRatio: 0,  //드래그 금지
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
       },
        speed:500,
    };
    var welSearchSwiper = new Swiper('.wel_search_list .swiper-container', welSearchOption);

    $('.btn_wel_search').on('click', function(e) {
        e.preventDefault();
        if($(this).hasClass('on')){
            welSearchSwiper = new Swiper('.wel_search_list .swiper-container', welSearchOption);
            $(this).removeClass('on');
        }else{
            welSearchSwiper.destroy();
            $(this).addClass('on');
        }
    });  
});





// 큐레이션
$(function(){
    if(!$('.wel_curation_cont').length) return;
    var welCurationSwiper = new CustomSwiper('.wel_curation_cont .curation_wrap', {
        observer: true,
        observeParents: true,
        slidesPerView: 'auto',
        centeredSlides: true,
        loop: true,
        loopsSlide:1,
        spaceBetween:20,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false
       },
        speed:700,
		pagination: {
			el: $('.wel_curation_cont').find('.swiper-pagination')[0],
			type: 'fraction',
			formatFractionCurrent: function (number) {
				return KyoboHottracks.mok.setPrependZero(number, 2);
			},
			formatFractionTotal: function (number) {
				return KyoboHottracks.mok.setPrependZero(number, 2);
			}
		}
    });
    /*
    var welCurationSwiper2 = new CustomSwiper('.wel_curation_cont .curation_txt', {
        slidesPerView: 'auto',
        spaceBetween: 16,
        loop:false,
        freeMode: true,
        observer: true,
        observeParents: true,
    });
    */
});

function curation_btn(val){
    if( $(val).closest('.li').hasClass('on')){
        $(val).closest('.li').removeClass('on')
    }else{
        $(val).closest('.curation_marker').find('.li').removeClass('on')
        $(val).closest('.li').addClass('on')
    }
}






// 띠배너 스와이프
$(function(){
    if(!$('.wel_belt_banner').length) return;
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






// 카테고리
$(function(){
    if(!$('.wel_category_cont').length) return;
    if($('.wel_category_cont .swiper-slide').length > 1) {
        var wel_CategorySwiper = new CustomSwiper('.wel_category_cont  .swiper-container', {
            observer: true,
            observeParents: true,
            slidesPerView: 'auto',
            centeredSlides: true,
            loop: true,
            loopsSlide:1,
            spaceBetween:20,
            autoHeight: true,
            autoplay: {
                delay: 5000,
                disableOnInteraction: false,
                
            },
            speed:700,
            pagination: {
                el: $('.wel_category_cont').find('.swiper-pagination')[0],
                type: 'fraction',
                formatFractionCurrent: function (number) {
                    return KyoboHottracks.mok.setPrependZero(number, 2);
                },
                formatFractionTotal: function (number) {
                    return KyoboHottracks.mok.setPrependZero(number, 2);
                }
            }
        });
    }
});




/* Scroll Event */
$(window).on('scroll', feScrollFn);
$.fn.feScrollGet = function(){
    var offset = $(window).scrollTop() + $(window).height() * 0.9;
  	
	$animate = $('.mc_cont, .wel_cont, .li_resp_ty .li, .li_ty .li, .scroll_tab');
    $animate.each(function(i){
        var $ani = $(this),
            ani = $ani,
            item_top = $ani.offset().top,
            item_h = $ani.height();
		if(($ani.offset().top) < offset){
            if(!$ani.hasClass('active')){
                $ani.addClass('active');	
            }
        }else{
            if($ani.hasClass('active')){
            	$ani.removeClass('active');
            }
        }
        
        if(!$('.wel_live_wrap').hasClass('active')){
            $(this).find('.btn_wel_live_good').trigger('click');
        } 
    });
	
};

// Scroll Event Function 
function feScrollFn(){
    $.fn.feScrollGet();
}


$(function(){
    if(!$('.wel_category_tab').length) return;
	$(window).resize (resizeBox).resize();
	function resizeBox(){
		function scrollEvent() {
		 	var locS =  $(window).scrollTop();
            var locA1 = $('.wel_category_tab').offset().top - $('.main_menu_wrap').height() - 10;
            if( locS < locA1) {
                $('.wel_category_tab').removeClass('on');
            } else {
                $('.wel_category_tab').addClass('on');
            }
		}
		$(window).scroll(function() {
			scrollEvent();
		});
		$(window).resize(function() {
			scrollEvent();  
		});
	}
});



