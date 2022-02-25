




/* 핫트랙스 라이브 */
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
