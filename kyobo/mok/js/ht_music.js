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
    
    

});
