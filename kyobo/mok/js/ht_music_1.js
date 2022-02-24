$(function(){


    // 특별한 할인상품 스와이프
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
        $('.sale_list_wrap').css('padding-bottom',0);
        $('.sale_list_wrap').addClass('no_swiper');
        $('.sale_list_wrap .swiper-wrapper').css('display','block');
        $('.sale_list_wrap .swiper-slide li').removeClass('product_list__group').addClass('product_list__div');
    }

    
 });
