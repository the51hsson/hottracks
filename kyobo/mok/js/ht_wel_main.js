// wel_mc
$(function(){
    if(!$('.wel_mc').length) return;
	$(window).resize(welMcBox).resize();
	function welMcBox(){
		function scrollEvent() {
		 	var locS =  $(window).scrollTop();
            var locA1 = $('.main_menu_wrap').offset().top
            if( locS < locA1) {
                $('.wel_mc').removeClass('mc_chk');
            } else {
                $('.wel_mc').addClass('mc_chk');
            }
		}
		$(window).scroll(function() {
			scrollEvent();
		});
	}
});





//// 웰컴메인
// Hero Banner
$(function(){
    if(!$('.wel_hero_banner').length) return;
    if($('.wel_hero_banner .swiper-slide').length > 1) {
        var heroSwiper = new CustomSwiper('.wel_hero_banner .swiper-container', {
            slidesPerView: 'auto',
            speed: 700,
            spaceBetween: 0,
            centeredSlides: true,
            loop: true,
            loopsSlide: 1,
            autoplay: {
                delay: 5000,
                disableOnInteraction: false,
                //pauseOnMouseEnter: true,
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
function welToday(){
    var $target = $('.wel_today_cont .swiper-container');
    var slideOption = {
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
			el: $('.wel_today_cont').find('.swiper-pagination')[0],
			type: 'fraction',
			formatFractionCurrent: function (number) {
				return KyoboHottracks.mok.setPrependZero(number, 2);
			},
			formatFractionTotal: function (number) {
				return KyoboHottracks.mok.setPrependZero(number, 2);
			}
		}
    };
    welTodaySwiper = new Swiper($target.get(), slideOption);
}

$(function(){
    if(!$('.wel_today_cont').length) return;
    welToday();
});




// 핫트랙스 라이브
function welLive(){
    var $target = $('.wel_live_cont .swiper-container');
    var slideOption = {
        observer: true,
        observeParents: true,
        slidesPerView: 'auto',
        centeredSlides: false,
        loop: true,
        loopsSlide: 1,
        spaceBetween: 0,
        /*autoplay: {
            delay:5000,
            disableOnInteraction: false,
        },*/
        speed: 700,
		pagination: {
			el: $('.wel_live_cont').find('.swiper-pagination')[0],
			type: 'fraction',
			formatFractionCurrent: function (number) {
				return KyoboHottracks.mok.setPrependZero(number, 2);
			},
			formatFractionTotal: function (number) {
				return KyoboHottracks.mok.setPrependZero(number, 2);
			}
		},
        on: {
            activeIndexChange: function () {
                $('.wel_live_good_ani').removeClass('on');
            }
        }
    };
    welLiveSwiper = new Swiper($target.get(), slideOption);
}

$(function(){
    if(!$('.wel_live_cont').length) return;
    welLive();

    $('.alarm_chk label').click(function(){ 
        var chk = $(this).prev().is(':checked');
        if(chk){
            $(this).prev().prop('checked', false);
            setTimeout(function(){
                $('.wel_live_good_ani').addClass('on');
            }, 7000); 
        }else{
            $(this).prev().prop('checked', true);
            $('.wel_live_good_ani').removeClass('on');
        }
    }); 
});





// MD
function welMdPick(){
    var $target = $('.wel_md_pick_cont .swiper-container');
    var slideOption = {
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
		pagination: false
    };
    welMdPickSwiper = new Swiper($target.get(), slideOption);
}

$(function(){
    if(!$('.wel_md_pick_cont').length) return;
    welMdPick();
});




// ONLY Hottracks
function welOnly(){
    var $target = $('.wel_only_cont');
    var slideOption = {
        slidesPerView: 'auto',
        spaceBetween:0,
        freeMode: true,
        observer: true,
        observeParents: true,
        grid: {
          rows: 2,
        },
        spaceBetween:0,
    };
    welOnlySwiper = new Swiper($target.get(), slideOption);
}

$(function(){
    if(!$('.wel_only_cont').length) return;
    welOnly();
});




// 실시간 홈쇼핑
function welSearch(){
    var $target = $('.wel_search_list .swiper-container');
    var slideOption = {
        direction: 'vertical',
        slidesPerView: 'auto',
        loop: true,
        loopsSlide: 1,
        spaceBetween: 0,
        touchRatio: 0,  //드래그 금지
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
       },
        speed: 500,
    };
    welSearchSwiper = new Swiper($target.get(), slideOption);
}

$(function(){
    if(!$('.wel_search_cont').length) return;
    welSearch();

    $('.btn_wel_search').on('click', function(e) {
        e.preventDefault();
        if($(this).closest('.wel_search_cont').hasClass('on')){
            welSearch();
            $(this).closest('.wel_search_cont').removeClass('on');
        }else{
            welSearchSwiper.destroy();
            $(this).closest('.wel_search_cont').addClass('on');
        }
    });  
    $('.btn_wel_search_cl').on('click', function(e) {
        e.preventDefault();
        welSearch();
        $(this).closest('.wel_search_cont').removeClass('on');
    });
});





// 큐레이션
function welCuration(){
	var curationThumb = new Swiper('.curation_thumb', {
        observer: true,
        observeParents: true,
        spaceBetween: 5,
        slidesPerView: 'auto',
        slideToClickedSlide: true,
        loop: true,
        loopedSlides: 3,
        speed: 600,
        /*autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },*/
        loopAdditionalSlides: 1
    });
    var curationImg = new Swiper('.curation_img', {
        observer: true,
        observeParents: true,
        spaceBetween: 20,
        loop: true,
        loopedSlides: 3,
        speed: 600,
        loopAdditionalSlides: 1
    });
    curationImg.controller.control = curationThumb;
    curationThumb.controller.control = curationImg;

}

function welCurationSize() {
	var curSize = document.querySelectorAll('.wel_curation_cont .curation_box');
	for (var i = 0; i < curSize.length; ++i) {
		var div = curSize[i];
		var img = div.querySelector('img');
		var curSizeChk = div.querySelector('.curation_cont');

		var divAspect = div.offsetHeight / div.offsetWidth;
		var imgAspect = img.height / img.width;
		if (imgAspect < divAspect) {
			curSizeChk.classList.add('ch_w')				
		} 
	}
}

$(function(){
    if(!$('.wel_curation_cont').length) return;
    if($('.curation_img').find('.swiper-slide').length > 1) {
        welCuration();
    }
    window.onload = function(){
        welCurationSize();  
    }
    
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
                loopsSlide: 1,
                autoHeight: true,
                pagination: {
                    el: ('.idx_' + index + ' .swiper-pagination'),
                }
            }); 
        }
	});
});





// 카테고리
function welCategory(){
    var $target = $('.wel_category_cont  .swiper-container');
    $target.each(function (index, element) {
        var $parent = $(this).parent('.wel_category_cont');
        $parent.addClass('pagn_idx_' + index);
        
        var slideOption = {
            observer: true,
            observeParents: true,
            slidesPerView: 'auto',
            //centeredSlides: true,
            loop: true,
            loopsSlide: 1,
            spaceBetween: 20,
            autoHeight: true,
            autoplay: {
                delay: 5000,
                disableOnInteraction: false,
                
            },
            speed:700,
            pagination: {
                el: ('.pagn_idx_' + index + ' .swiper-pagination'),
                type: 'fraction',
                formatFractionCurrent: function (number) {
                    return KyoboHottracks.mok.setPrependZero(number, 2);
                },
                formatFractionTotal: function (number) {
                    return KyoboHottracks.mok.setPrependZero(number, 2);
                }
            }
        };

        if($parent.find('.swiper-slide').length > 1) {
            welCategorySwiper = new Swiper(this, slideOption);
        }
	});
}

$(function(){
    if(!$('.wel_category_cont').length) return;
    welCategory();
});

// wel_category_tab
$(function(){
    if(!$('.wel_category_tab').length) return;
	$(window).resize (resizeBox).resize();
	function resizeBox(){
		function scrollEvent() {
		 	var locS =  $(window).scrollTop();
            var locA1 = $('.wel_category_tab').offset().top - $('.main_menu_wrap').height() - 11;
            if( locS < locA1) {
                $('.wel_category_tab').removeClass('on');
                $('.sticky_tab a').removeClass('on');
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

// Sticky Tab
function tabStickySwiper(){
    var $target = $('.tab_sticky_swiper');
    var slideOption = {
        slidesPerView: 'auto',
        spaceBetween:5,
        freeMode: true,
        observer: true,
        observeParents: true,
        speed:0
    };
    stickySwiperCont = new Swiper($target.get(), slideOption);
}

$(function(){
    if(!$('.tab_sticky_swiper').length) return;
    tabStickySwiper();

    $(window).on('scroll', function() {
        $('.sticky_cont').each(function (index, element) {
            if($(window).scrollTop() >= $(this).offset().top - 127) {
                $('.sticky_tab a').removeClass('on');
                $('.sticky_tab a').eq(index).addClass('on');
                stickySwiperCont.slideTo(index);
            } 
        });
    });
    $('.sticky_tab a').on('click', function(e) {
        e.preventDefault();
        var idx = $(this).closest('li').index();
        $('html, body').stop().animate({scrollTop: $('.sticky_cont').eq(idx).offset().top - 126 }, 500 );
    });
});




// Tab
function tabSwiper(){
    var $target = $('.tab_swiper');
    var slideOption = {
        slidesPerView: 'auto',
        spaceBetween:5,
        freeMode: true,
        observer: true,
        observeParents: true,
        speed:300,
    };
    tabSwiperCont = new Swiper($target.get(), slideOption);
}

$(function(){
    if(!$('.tab_swiper').length) return;
    tabSwiper();
});

$(function(){
    $.fn.tabTy = function(){
        $.each(this, function(i,v){
            $(v).closest('.tab_link').find('a').removeClass('on');
            $(v).addClass('on');
            var s = $(v).attr('href');
            $(s).parent().find('.tab_cont').removeClass('on');
            $(s).addClass('on');
        });
    };
    $('.tab_link a').click(function(){    
        $(this).tabTy();
        return false;
    });
});











//// 큐레이션 메인
/*
function curScrollEvent() {
    var images = document.querySelectorAll('.curation_list_cont .lis');
    var imgStack = [0, 0];
    var colWidth = 100;
    for(var i = 0; i < images.length; i++) {
        var minIndex = imgStack.indexOf(Math.min.apply(0, imgStack));
        var x = colWidth * minIndex;
        var y = imgStack[minIndex];
        imgStack[minIndex] += (images[i].children[0].height + 20);
        images[i].style.transform = `translateX(${x}%) translateY(${y}px)`;
        if(i === images.length - 1) {
            document.querySelector('.curation_list_cont > ul').style.height = `${Math.max.apply(0, imgStack)}px`;
        }
    }
}

$(function(){
    if(!$('.curation_list').length) return;
    window.onload = function(){
        curScrollEvent();  
    }
    $(window).resize(function() {
        curScrollEvent();  
    });
});
*/
$(function(){
    $('.cur_view .btn_cur_view').click(function(){    
        return false;
    });
});




// 이럴 땐? 이런상품
function curProdSwiper(){
    var $target = $('.cur_prod_img');
    $target.each(function (index, element) {
        var $parent = $(this);
        $parent.addClass('cur_prod_idx_' + index);
        var slideOption = {
            slidesPerView: 'auto',
            spaceBetween:0,
            freeMode: true,
            observer: true,
            observeParents: true,
            speed:300,
        };

        if($parent.find('.swiper-slide').length > 1) {
            curProdSwiperCont = new Swiper(this, slideOption);
        }
	});
}

$(function(){
    if(!$('.cur_prod_img').length) return;
    curProdSwiper();
});





//최근 본 상품 추천
function curProdViewSwiper(){
    var $target = $('.cur_prod_view_list');
    $target.each(function (index, element) {
        var $parent = $(this);
        $parent.addClass('cur_view_idx_' + index);
        var slideOption = {
            slidesPerView: 'auto',
            spaceBetween:0,
            freeMode: true,
            observer: true,
            observeParents: true,
            speed:300,
        };

        if($parent.find('.swiper-slide').length > 1) {
            curProdViewSwiperCont = new Swiper(this, slideOption);
        }
	});
}

$(function(){
    if(!$('.cur_prod_view_list').length) return;
    curProdViewSwiper();
});









// Scroll Event
$(window).on('scroll', feScrollFn);
$.fn.feScrollGet = function(){
    var offset = $(window).scrollTop() + $(window).height() * 0.9;
	$animate = $('.mc_cont, .wel_cont, .li_box_ty .li, .li_ty .li, .tab_swiper, .li_resp_ty.ty02 .li');
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










// 라이브 다시보기
function livReplaySwiper(){
    var $target = $('.liv_replay_cont');
    $target.each(function (index, element) {
        var $parent = $(this);
        var slideOption = {
            spaceBetween: 20,
            observer: true,
            observeParents: true,
            slidesPerView:3,
            loop: true,
            loopsSlide:1,
            autoHeight: true,
            pagination: {
                el: '.swiper-pagination',
            },
            speed:400,
        };

        if($parent.find('.swiper-slide').length > 3) {
            livReplaySwiperCont = new Swiper(this, slideOption);
        }
	});
}

$(function(){
    if(!$('.liv_replay_cont').length) return;
    livReplaySwiper();
});




// 라이브 달력
function calendarTabSwiper(){
    var $target = $('.calendar_tab');
    var slideOption = {
        slidesPerView: 'auto',
        spaceBetween:0,
        freeMode: true,
        observer: true,
        observeParents: true,
        slidesPerView:7,
        speed:300,
    };
    calendarTabSwiperCont = new Swiper($target.get(), slideOption);
}

$(function(){
    if(!$('.calendar_tab').length) return;
    calendarTabSwiper();
});




// 미리 만나는 라이브
function livNewMsg(){
	var offsetPosition = $('.liv_list .li:first-child .alarm_chk02').offset();
	var y = offsetPosition.top - $('.liv_list').offset().top + 35;
	$('.liv_new_msg').css('top', y);
}
$(function(){
    if(!$('.liv_new_msg').length) return;
	livNewMsg();
	$(window).resize(function() {
		livNewMsg();
	});
});






// 
function gifQuestion(){
    var $target = $('.gif_question_cont .swiper-container');
    var slideOption = {
        observer: true,
        observeParents: true,
        slidesPerView: 'auto',
        centeredSlides: false,
        loop: true,
        loopsSlide: 1,
        spaceBetween: 0,
        /*autoplay: {
            delay:5000,
            disableOnInteraction: false,
        },*/
        speed: 700,
		pagination: {

		},
    };
    gifQuestionSwiper = new Swiper($target.get(), slideOption);
}

$(function(){
    if(!$('.gif_question_cont').length) return;
    gifQuestion();
});


