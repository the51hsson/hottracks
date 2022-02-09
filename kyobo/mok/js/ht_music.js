$(function(){

    //fit text 
    $.fn.fitText = function( kompressor, options ) {

        // Setup options
        var compressor = kompressor || 1,
            settings = $.extend({
              'minFontSize' : Number.NEGATIVE_INFINITY,
              'maxFontSize' : Number.POSITIVE_INFINITY
            }, options);
    
        return this.each(function(){
    
          // Store the object
          var $this = $(this);
    
          // Resizer() resizes items based on the object width divided by the compressor * 10
          var resizer = function () {
            $this.css('font-size', Math.max(Math.min($this.width() / (compressor*10), parseFloat(settings.maxFontSize)), parseFloat(settings.minFontSize)));
          };
    
          // Call once to set.
          resizer();
    
          // Call on resize. Opera debounces their resize by default.
          $(window).on('resize.fittext orientationchange.fittext', resizer);
    
        });
    
    };

    // hero 배너 스와이프
    var heroSwiper = new CustomSwiper('.here_banner_wrap .swiper-container', {
		slidesPerView: 'auto',
		speed: 500,
		spaceBetween: 10,
		centeredSlides: true,
        loop: true,
        loopsSlide:1,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
          },
		pagination: {
			el: $('.here_banner_wrap').find('.swiper-pagination')[0],
			type: 'fraction',
			formatFractionCurrent: function (number) {
				return KyoboHottracks.mok.setPrependZero(number, 2);
			},
			formatFractionTotal: function (number) {
				return KyoboHottracks.mok.setPrependZero(number, 2);
			},
		}
	});

    $('.play_pause_box').click(function(){
        if ( $(this).hasClass('play') ) {
            heroSwiper.autoplay.stop();
            $(this).removeClass('play').addClass('pause');
        } else {
            heroSwiper.autoplay.start();
            $(this).removeClass('pause').addClass('play');
        }
    });
    

    // 예약 상품 스와이프
    var reservedSwiper = new CustomSwiper('.reserved_product_wrap .swiper-container', {
        observer: true,
        observeParents: true,
        slidesPerView: 'auto',
        centeredSlides: true,
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
                $('.swiper-slide-active').removeClass('zoom_out').addClass('zoom_in');
            },
            slideChange: function() {
                $('.swiper-slide-active').removeClass('zoom_in');
            }
        }
    });

    // 구매 상품 스와이프
    var purchaseSwiper = new CustomSwiper('.purchase_history_wrap .swiper-container', {
        observer: true,
        observeParents: true,
        slidesPerView: 'auto',
        spaceBetween: 12,
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
    var autoChart = setInterval(function() {
        nextSlide();
    }, 5000);
    $('.realtime_chart_wrap .chart_box').on('click',function(){
        clearInterval(autoChart);
        $(this).addClass('active').siblings('div').removeClass('active');
        autoChart = setInterval(function() {
            nextSlide();
        }, 5000);
    });
    function nextSlide() {
        var allSlide = $('.realtime_chart_wrap .chart_box');
        allSlide.each(function(index,item){
            if($(this).hasClass('active')) {
                currentIndex = index;
            }
        });
        var newIndex = 0;
        if(currentIndex >= allSlide.length-1) {
            //현재 슬라이드 index가 마지막 순서면 0번째로 보냄(무한반복)
            newIndex = 0;
        } else {
            //현재 슬라이드의 index에서 한 칸 만큼 앞으로 간 index 지정
            newIndex = currentIndex+1;
        }
        allSlide.removeClass('active');
	    allSlide.eq(newIndex).addClass('active');
    }
    
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

    // 요즘 핫한 해외 팝음반
    var autoPop = setInterval(function() {
        nextPopSlide();
    }, 5000);
    $('.thumb_img_list li').on('click',function(){
        clearInterval(autoPop);
        $(this).addClass('active').siblings('li').removeClass('active');
        $('.record_info_area .img_box img').attr('src',$(this).find('img').attr('src'));
        $('.record_info_area .overseas_hot_prod_info').html($(this).find('.info_txt').html());

        autoPop = setInterval(function() {
            nextPopSlide();
        }, 5000);
    });
    $('.record_info_area .img_box img').attr('src',$('.thumb_img_list li.active img').attr('src'));
   

    function nextPopSlide() {
        var allSlide = $('.thumb_img_list li');
        var imgSrc = allSlide.find('img').attr('src');
        var prodInfo;
        allSlide.each(function(index,item){
            if($(this).hasClass('active')) {
                currentIndex = index;
                imgSrc = $(this).find('img').attr('src');
            }
        });
        var newIndex = 0;
        if(currentIndex >= allSlide.length-1) {
            //현재 슬라이드 index가 마지막 순서면 0번째로 보냄(무한반복)
            newIndex = 0;
        } else {
            //현재 슬라이드의 index에서 한 칸 만큼 앞으로 간 index 지정
            newIndex = currentIndex+1;
        }
        allSlide.removeClass('active');
	    allSlide.eq(newIndex).addClass('active');
        imgSrc = allSlide.eq(newIndex).find('img').attr('src');
        prodInfo =  allSlide.eq(newIndex).find('.info_txt').html();
        $('.record_info_area .img_box img').attr('src',imgSrc);
        $('.record_info_area .overseas_hot_prod_info').html(prodInfo);
    }

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

    // 찜하기 : todo 공통으로 정리 할 것
    $('.img_box .btn_like').on('click',function(){
        $(this).toggleClass('active');
    });
    //상품 리스트 찜하기 토글
	$(document).on('click', '.evt_good_count', function(){
		if ($(this).hasClass('active')) {
			$(this).removeClass('active');
		} else {
			$(this).addClass('active');
		}
	});

});
//히어로 배너 팝업
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
