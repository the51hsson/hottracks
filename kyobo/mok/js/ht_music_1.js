


$(function(){
    if(!$('.wel_hero_banner').length) return;
    $('.wel_hero_banner').find('.s1, .s2').lettering('lines');
});



/* 예약상품 */
function musReserved(){
    var $target = $('.mus_mc_reserved_cont .swiper-container');
    var slideOption = {
        observer: true,
        observeParents: true,
        slidesPerView: 'auto',
        centeredSlides: true,
        loop: true,
        loopsSlide: 1,
        spaceBetween:0,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        speed: 700,
		pagination: {
			el: $('.mus_mc_reserved_cont').find('.swiper-pagination')[0],
			type: 'fraction',
			formatFractionCurrent: function (number) {
				return KyoboHottracks.mok.setPrependZero(number, 2);
			},
			formatFractionTotal: function (number) {
				return KyoboHottracks.mok.setPrependZero(number, 2);
			}
		},
        on: {
            slideChangeTransitionEnd: function(){
                var circles = document.getElementsByClassName("circle_txt");
                for (var i = 0; i < circles.length; i++) {
                    var circleType = new CircleType(circles.item(i));
                }
                $('.mus_mc_reserved_cont .swiper-slide-active').addClass('zoom_in');
            },
            slideChange: function() {
                $('.mus_mc_reserved_cont .swiper-slide-active').removeClass('zoom_in');
            }
        }
    };
    musReservedSwiper = new Swiper($target.get(), slideOption);
}

$(function(){
    if(!$('.mus_mc_reserved_cont').length) return;
    musReserved();
});



/* 주문내역 */
function musOrder(){
    var $target = $('.mus_mc_order_cont .swiper-container');
    var slideOption = {
        observer: true,
        observeParents: true,
        slidesPerView: 'auto',
        centeredSlides: false,
        loop: false,
        loopsSlide: 1,
        spaceBetween: 0,
        /*autoplay: {
            delay:5000,
            disableOnInteraction: false,
        },*/
        speed: 700,
    };
    musOrderSwiper = new Swiper($target.get(), slideOption);
}

$(function(){
    if(!$('.mus_mc_order_cont').length) return;
    musOrder();
});



/* 실시간차트 */
function btn_chart_view(val){
    if( $(val).closest('.li').hasClass('active')){
        $(val).closest('.li').removeClass('active')
    }else{
        $(val).closest('.mus_mc_chart_cont').find('.li').removeClass('active')
        $(val).closest('.li').addClass('active')
    }
}



/* 새로 나온 음반 */
function musNewAlbum(){
    var $target = $('.mus_mc_new_album_cont .swiper-container');
    var slideOption = {
        observer: true,
        observeParents: true,
        slidesPerView:1,
        centeredSlides: false,
        loop: false,
        spaceBetween: 0,

        grid: {
            rows: 2,
        },
        speed: 700,

    };
    musNewAlbumSwiper = new Swiper($target.get(), slideOption);
}

$(function(){
    if(!$('.mus_mc_new_album_cont').length) return;
    musNewAlbum();
});



/* 팬사인회 소식 */
function musFan(){
    var $target = $('.mus_mc_fan_cont .swiper-container');
    var slideOption = {
        observer: true,
        observeParents: true,
        slidesPerView: 'auto',
        centeredSlides: false,
        loop: false,
        loopsSlide: 1,
        spaceBetween: 0,
        /*autoplay: {
            delay:5000,
            disableOnInteraction: false,
        },*/
        speed: 700,
		pagination: {
			el: $('.mus_mc_fan_cont').find('.swiper-pagination')[0],
			type: 'fraction',
			formatFractionCurrent: function (number) {
				return KyoboHottracks.mok.setPrependZero(number, 2);
			},
			formatFractionTotal: function (number) {
				return KyoboHottracks.mok.setPrependZero(number, 2);
			}
		}
    };
    musFanSwiper = new Swiper($target.get(), slideOption);
}

$(function(){
    if(!$('.mus_mc_fan_cont').length) return;
    musFan();
});



/* 해외 POP 음반 */
function musPop(){
	var musPopThumb = new Swiper('.mus_mc_pop_thumb', {
        centeredSlides: true,
        centeredSlidesBounds: true,
        slidesPerView: 6,
        watchOverflow: true,
        watchSlidesVisibility: true,
        watchSlidesProgress: true,
        direction: 'vertical',
    });
    
    var musPopImg = new Swiper('.mus_mc_pop_img', {
        watchOverflow: true,
        watchSlidesVisibility: true,
        watchSlidesProgress: true,
        preventInteractionOnTransition: true,
        navigation:'false',
        effect: 'fade',
        loop: true,
        fadeEffect: {
            crossFade: true
        },
        thumbs: {
            swiper: musPopThumb
        }
    });
    musPopImg.on('slideChangeTransitionStart', function() {
        musPopThumb.slideTo(musPopImg.activeIndex);
    });

    musPopThumb.on('transitionStart', function(){
        musPopImg.slideTo(musPopThumb.activeIndex);
    });
}

$(function(){
    if(!$('.mus_mc_pop_cont').length) return;
    if($('.mus_mc_pop_img').find('.swiper-slide').length > 1) {
        musPop();
    }
    $(window).resize(function() {
        musPop();
    });
});


/*
$(function(){
    var galleryThumbs = new Swiper(".gallery-thumbs", {
        centeredSlides: true,
        centeredSlidesBounds: true,
        slidesPerView: 6,
        watchOverflow: true,
        watchSlidesVisibility: true,
        watchSlidesProgress: true,
        direction: 'vertical',
    });

    var galleryMain = new Swiper(".gallery-main", {
        watchOverflow: true,
        watchSlidesVisibility: true,
        watchSlidesProgress: true,
        preventInteractionOnTransition: true,
        navigation:'false',
        effect: 'fade',
        loop: true,
        fadeEffect: {
            crossFade: true
        },
        thumbs: {
            swiper: galleryThumbs
        }
    });

    galleryMain.on('slideChangeTransitionStart', function() {
        galleryThumbs.slideTo(galleryMain.activeIndex);
    });

    galleryThumbs.on('transitionStart', function(){
        galleryMain.slideTo(galleryThumbs.activeIndex);
    });

});
*/
/* 해외 POP 음반 */
/*
function musPop(){
	var musPopThumb = new Swiper('.mus_mc_pop_thumb', {
        observer: true,
        observeParents: true,
        spaceBetween: 5,
        slidesPerView: 'auto',
        slideToClickedSlide: true,
        loop: true,
        loopedSlides: 3,
        speed: 600,
        direction: "vertical",
        loopAdditionalSlides: 1
    });
    var musPopImg = new Swiper('.mus_mc_pop_img', {
        observer: true,
        observeParents: true,
        effect: "fade",
        spaceBetween: 20,
        loop: true,
        speed: 600,
        loopAdditionalSlides: 1
    });
    musPopImg.controller.control = musPopThumb;
    musPopThumb.controller.control = musPopImg;
}

$(function(){
    if(!$('.mus_mc_pop_cont').length) return;
    if($('.mus_mc_pop_img').find('.swiper-slide').length > 1) {
        musPop();
    }
});
*/









/* LP SHOP */
function musLpshop(){
    var $target = $('.mus_mc_lpshop_cont .swiper-container');
    var slideOption = {
        observer: true,
        observeParents: true,
        slidesPerView: 'auto',
        centeredSlides: false,
        loop: false,
        loopsSlide: 1,
        spaceBetween:0,
        /*autoplay: {
            delay:5000,
            disableOnInteraction: false,
        },*/
        speed: 700,
		pagination: false,
    };
    musLpshopSwiper = new Swiper($target.get(), slideOption);
}

$(function(){
    if(!$('.mus_mc_lpshop_cont').length) return;
    musLpshop();
});



/* 특별한 할인상품 스와이프 */
function musSpecial(){
    var $target = $('.mus_mc_special_cont .swiper-container');
    saleListWrapInit = true;
    var slideOption = {
        observer: true,
        observeParents: true,
        slidesPerView: 3,
        spaceBetween: 20,
        slidesPerGroup: 1,
        loop: true,
        loopFillGroupWithBlank: true,
        loopsSlide:1,
        pagination: {
            el: ('.mus_mc_special_cont .swiper-pagination'),
        },
        navigation: {
            nextEl: '.mus_mc_special_cont .swiper-button-next',
            prevEl: '.mus_mc_special_cont .swiper-button-prev',
        }
    };
    musSpecialSwiper = new Swiper($target.get(), slideOption);
}

$(function(){
    if($('.mus_mc_special_cont .swiper-slide').length > 3 ){
        musSpecial();
    }
});















$(function(){




    // 특별한 할인상품 스와이프
    /*
    var swiperOptions;
    if ( $('.mus_mc_special_cont .swiper-slide').length >= 0 ) {
        saleListWrapInit = true;
        swiperOptions = {
            observer: true,
            observeParents: true,
            slidesPerView: 3,
            spaceBetween: 20,
            slidesPerGroup: 3,
            loop: true,
            loopFillGroupWithBlank: true,
            loopsSlide:1,
            pagination: {
                el: ('.mus_mc_special_cont .swiper-pagination'),
            },
            navigation: {
                nextEl: '.mus_mc_special_cont .swiper-button-next',
                prevEl: '.mus_mc_special_cont .swiper-button-prev',
            },
        }
        var saleListWrap = new Swiper('.mus_mc_special_cont .swiper-container', swiperOptions);
    } else {
        /*
        $('.sale_list_wrap').css('padding-bottom',0);
        $('.sale_list_wrap').addClass('no_swiper');
        $('.sale_list_wrap .swiper-wrapper').css('display','block');
        $('.sale_list_wrap .swiper-slide li').removeClass('product_list__group').addClass('product_list__div');
        */
   /* }*/

    
 });
