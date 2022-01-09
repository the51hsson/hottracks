$(function(){

    // 예약 상품 스와이프
    var reservedSwiper = new CustomSwiper('.reserved_product_wrap .swiper-container', {
        observer: true,
        observeParents: true,
        slidesPerView: 'auto',
        loop: true,
        loopsSlide:1,
        pagination: {
            el: '.reserved_product_wrap .swiper-pagination',
            type: "progressbar",
        },
        on: {
            slideChangeTransitionEnd: function(){
                var circles = document.getElementsByClassName("circle_txt");
                for (var i = 0; i < circles.length; i++) {
                    var circleType = new CircleType(circles.item(i));
                }
            }
        }
    });
    // 구매 상품 스와이프
    var purchaseSwiper = new CustomSwiper('.purchase_history_wrap .swiper-container', {
        observer: true,
        observeParents: true,
        slidesPerView: 'auto',
        loop: true,
        loopsSlide:1,
        pagination: {
            el: '.purchase_history_wrap .swiper-pagination',
            type: "progressbar",
        },
        on: {
            slideChangeTransitionEnd: function () {
                $('.purchase_history_wrap .swiper-slide').eq(this.realIndex).addClass('active_slide');

            },
            slideChangeTransitionStart:function() {
                $('.purchase_history_wrap .swiper-slide').eq(this.realIndex).removeClass('active_slide');
            }
        }
    });
    // 시시간 차트 rolling

    // 새로나온 음반 스와이프
    var newAlbumSwiper = new CustomSwiper('.new_album_wrap .swiper-container', {
        observer: true,
        observeParents: true,
        slidesPerView: 'auto',
        loop: true,
        loopsSlide:1,
        pagination: {
            el: '.new_album_wrap .swiper-pagination',
            type: "progressbar",
        },
    });

    // 팬사인회 소식
    var fanWwiperOptions;
    if ($('.fan_sign_wrap .swiper-slide').length >= 2) {
        saleListWrapInit = true;
        fanWwiperOptions = {
            observer: true,
            observeParents: true,
            slidesPerView: 'auto',
            spaceBetween: 20,
            loop: true,
            loopFillGroupWithBlank: true,
            loopsSlide: 1,
            pagination: {
                el: ('.fan_sign_wrap .swiper-pagination'),
            },
            navigation: {
                nextEl: '.fan_sign_wrap .swiper-button-next',
                prevEl: '.fan_sign_wrap .swiper-button-prev',
            },
        }
        var fanSignWrap = new Swiper('.fan_sign_wrap .swiper-container', fanWwiperOptions);
    } else {
        $('.fan_sign_wrap').css('padding-bottom', 0);
        $('.fan_sign_wrap').addClass('no_swiper');
        $('.fan_sign_wrap .swiper-wrapper').css('display', 'block');
        $('.fan_sign_wrap .swiper-slide li').removeClass('product_list__group').addClass('product_list__div');
    }

    // 띠배너 스와이프
    $(".belt_banner_wrap .swiper-container").each(function (index, element) {
        var $parent = $(this).parent('.belt_banner_wrap');
        $parent.addClass('idx_' + index);
		var beltBannerSwiper = new CustomSwiper(this, {
			observer: true,
            observeParents: true,
            slidesPerView: 1,
            loop: true,
            loopsSlide:1,
            pagination: {
                el: ('.idx_' + index + ' .swiper-pagination'),
            },
            
		});
	});

    // LP SHOP 스와이프
    var lpShopSwiper = new CustomSwiper('.lp_shop_wrap .swiper-container', {
        observer: true,
        observeParents: true,
        slidesPerView: 'auto',
        loop: true,
        loopsSlide:1,
        // freeMode: true,
        pagination: {
            el: '.lp_shop_wrap .swiper-pagination',
            type: "progressbar",
        },
    });

    // 특별한 할인상품 스와이프
    var swiperOptions;
    if ( $('.sale_list_wrap .swiper-slide').length >= 3 ) {
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
                el: ('.sale_list_wrap .swiper-pagination'),
            },
            navigation: {
                nextEl: '.sale_list_wrap .swiper-button-next',
                prevEl: '.sale_list_wrap .swiper-button-prev',
            },
        }
        var saleListWrap = new Swiper('.sale_list_wrap .swiper-container', swiperOptions);
    } else {
        $('.sale_list_wrap').css('padding-bottom',0);
        $('.sale_list_wrap').addClass('no_swiper');
        $('.sale_list_wrap .swiper-wrapper').css('display','block');
        $('.sale_list_wrap .swiper-slide li').removeClass('product_list__group').addClass('product_list__div');
    }

});
