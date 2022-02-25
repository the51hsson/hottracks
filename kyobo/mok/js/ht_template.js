/* wel_mc */
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





/*** 웰컴메인 ***/
/* Hero Banner */
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




/* 오늘만 특가 */
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




/* 핫트랙스 라이브 */
function welLive(){
    var $target = $('.wel_live_cont .swiper-container');
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
                $('.wel_live_cont .swiper-slide').removeClass('act');
                $('.wel_live_cont .swiper-slide').eq(this.realIndex).addClass('act');
            }
        }
    };
    $('.wel_live_cont .swiper-slide').eq(0).addClass('act');
    welLiveSwiper = new Swiper($target.get(), slideOption);
}

$(function(){
    if(!$('.wel_live_cont').length) return;
    welLive();
});



/* MD Pick */
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




/* ONLY Hottracks */
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



/* 실시간 홈쇼핑 */
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



/* 큐레이션 */
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



/* 띠배너 스와이프 */
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



/* 카테고리 */
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



/* wel_category_tab */
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



/* Sticky Tab */
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


/* Tab */
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


/* anchor 이동 */
$(function(){
    $.fn.anchorChk = function(){
        $.each(this, function(i,v){
            var s = $(v).attr('href');
            $('html, body').stop().animate({scrollTop:$(s).offset().top - 60 }, 500 );
        });
    };

    $('.btn_anchor_chk').click(function(){    
        $(this).anchorChk();
        return false;
    });
});








/*** 큐레이션 메인 ***/
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




/* 이럴 땐? 이런상품 */
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





/* 최근 본 상품 추천 */
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



/* What’s in your bag : 팝업 */
$(function(){
    $('.cur_new02_li.on .fold_btn span').text('접기');
    $('.cur_new02_li .fold_btn').click(function(e){
        e.preventDefault();
        $(this).fold_ty();
    });
});









/* Scroll Event */
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

function feScrollFn(){
    $.fn.feScrollGet();
}









/*** 라이브 메인 ***/
/* 라이브 다시보기 */
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




/* 라이브 달력 */
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




/* 미리 만나는 라이브 */
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




$(function(){

    /* prod_replace_chk */
    $.fn.prod_replace_chk = function(){
        var tar = $(this).closest('.li').children('article.replace_prod_swap');
        var foldingChk = tar.hasClass('show_bubble');
        if (foldingChk){
            //tar.removeClass('show_bubble');
        } else {
            tar.addClass('show_bubble');
            //$(window).scrollTop(tar.offset().top - 250);
        }
    };
    
    $('.btn_prod_replace_chk').click(function(e){
        e.preventDefault();
        $(this).prod_replace_chk();
    });
    
    $('.replace_prod_swap .close_swap').click(function(e){
        e.preventDefault();
        $(this).parents('.replace_prod_swap').removeClass('show_bubble');
    });

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

});







/**** 선물추천 ****/
/* 선물이 필요한 순간 핫트 하세요 */
function gftNeed(){
    var $target = $('.gft_need_cont  .swiper-container');
    var slideOption = {
        observer: true,
        observeParents: true,
        slidesPerView: 'auto',
        centeredSlides: true,
        loop: true,
        loopsSlide: 1,
        spaceBetween: 20,
        /*autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },*/
        speed: 700,
		pagination: false,
    };
    gftNeedSwiper = new Swiper($target.get(), slideOption);
}

$(function(){
    if(!$('.gft_need_cont').length) return;
    gftNeed();
});



/* 선물이 고민된다면, 핫트에 물어보세요 */
function gftQuestion(){
    var $target = $('.gft_question_cont .swiper-container');
    var slideOption = {
        observer: true,
        observeParents: true,
        slidesPerView: 'auto',
        centeredSlides: false,
        //loop: true,
        loopsSlide: 1,
        spaceBetween:0,
        /*autoplay: {
            delay:5000,
            disableOnInteraction: false,
        },*/
        speed: 700,
		pagination: {

		},
    };
    gftQuestionSwiper = new Swiper($target.get(), slideOption);
}

$(function(){
    if(!$('.gft_question_cont').length) return;
    gftQuestion();
});

$(function(){
    $('.gft_question_chk input').click(function(){ 
        var chk = $(this).is(':checked');
        if(chk){
            $(this).closest('.gft_question_chk').addClass('on');
            $(this).closest('.gft_question_chk').find('input').prop('disabled', true);
            $(this).prop('disabled', false);

        }else{
            $(this).closest('.gft_question_chk').removeClass('on');
            $(this).closest('.gft_question_chk').find('input').prop('disabled', false);
        }
    }); 
});



/* 선물추천 - 팝업 */
function btnPopAddListOp(v){
    $('body').css('overflow','hidden');
    var s = $(v).attr('value');
    $('#' + s + '').addClass('on');
}
function btnPopAddListCl(){
    $('body').css('overflow','');
    $('.pop_view_add').addClass('off');
    setTimeout(function(){
        $('.pop_view_add').removeClass('off').removeClass('on');
    }, 600);
}






/* 고객센터 */
$(function(){
    /* fold_ty */
    $.fn.fold_ty = function(){
        var tar = $(this).closest('.li');
        var foldingChk = tar.hasClass('on');
        if (foldingChk){
            tar.removeClass('on');
            tar.find('.fold_btn span').text('펼치기');
        } else {
            tar.siblings('.li').removeClass('on');
            tar.siblings('.li').find('.fold_btn span').text('펼치기');
            tar.addClass('on');
            tar.find('.fold_btn span').text('접기');
        }
    };
});
$(function(){
    if(!$('.fold_ty').length) return;
    $('.fold_ty .li.on .fold_btn span').text('접기');
    $('.fold_ty .fold_btn').click(function(e){
        e.preventDefault();
        $(this).fold_ty();
    });
});

$(function(){
    if(!$('.fold_ty02').length) return;
    $('.fold_ty02 .li.on .fold_btn span').text('접기');
    $('.fold_ty02 .fold_btn').click(function(e){
        e.preventDefault();
        $(this).fold_ty();
    });
});

/* BEST FAQ */
function cusBestFaq(){
    var $target = $('.cus_mc_best_cont .swiper-container');
    var slideOption = {
        observer: true,
        observeParents: true,
        slidesPerView: 'auto',
        centeredSlides: false,
        //loop: true,
        loopsSlide: 1,
        spaceBetween:0,
        /*autoplay: {
            delay:5000,
            disableOnInteraction: false,
        },*/
        speed: 700,
		pagination: {

		},
    };
    cusBestFaqSwiper = new Swiper($target.get(), slideOption);
}

$(function(){
    if(!$('.cus_mc_best_cont').length) return;
    cusBestFaq();
});


/* 핫트랙스 서비스 안내 */
$(function(){
    if(!$('.cus_cont_view').length) return;
    $(window).on('scroll', function() {
        $('.cus_cont_view').each(function (index, element) {
            if($(window).scrollTop() >= $(this).offset().top - 125) {
                $('.cus_sv_tab a').removeClass('active');
                $('.cus_sv_tab a').eq(index).addClass('active');
            } 
        });
    });
    $.fn.anchorCusChk = function(){
        $.each(this, function(i,v){
            var s = $(v).attr('href');
            $('html, body').stop().animate({scrollTop:$(s).offset().top - 124 }, 500);
        });
    };
    $('.cus_sv_tab a').on('click', function(e) {
        $(this).anchorCusChk();
        e.preventDefault();
    });
});




//$(function(){
    /* 22.02.17 삭제 */ 
	//오늘만 특가, 핫딜 특가 메뉴 활성화
	// $(document).on('click', '.tod_menu_wrap .tod_menu', function(){
	// 	$(this).addClass('active').siblings('.tod_menu').removeClass('active');
	// });
	//상품 리스트 찜하기 토글
    /*$(document).on('click', '.evt_good_count', function(){
		if ($(this).hasClass('active')) {
			$(this).removeClass('active');
		} else {
			$(this).addClass('active');
		}
	});
    22.02.17 삭제 */ 	

	//MD 추천 상단스왑
     /* callback 대체로 삭제 */
//     if($('.swiper-container.ctg_top_swiper').length == 0 ) return;
// 	$('.swiper-container.ctg_top_swiper').each(function(i, ele){
// 	    var ctgSwiper = new Swiper(this,  {
// 			observer: true,
// 			observeParents: true,
// 			slidesPerView: 'auto',
// 			centeredSlides: true,
// 			loop: true,
// 			loopsSlide: 1,
// 			spaceBetween: 20,
// 			autoplay: {
// 				delay: 5000,
// 				disableOnInteraction: false,
// 			},
// 			speed: 700,
// 			pagination: {
// 			el: $(ele).find('.swiper-pagination')[0],
// 			type: 'fraction',
// 			formatFractionCurrent: function (number) {
// 				return KyoboHottracks.mok.setPrependZero(number, 2);
// 			},
// 			formatFractionTotal: function (number) {
// 				return KyoboHottracks.mok.setPrependZero(number, 2);
// 			}
// 			}
// 	    });
// 	});
// });
 
//관련 기획전, 브랜드 쿠폰 스왑배너
$(function(){
    if($('.swiper.brandSwiper').length > 0) {
        $('.swiper.brandSwiper').each(function(i, ele){
            var brandSwiper = new Swiper(this,  {
                slidesPerView: 'auto',
                spaceBetween: 16,
                freeMode: true,
                observer: true,
                observeParents: true,
            });
        });
    }
});

 //카테고리 리스트 하단 스왑배너
$(function(){
    if($('.evt_slider_wrap .swiper.mySwiper').length > 0) {
        $('.evt_slider_wrap .swiper.mySwiper').each(function(i, ele){
            var brandSwiper = new Swiper(this,  {
                slidesPerView: 'auto',
                spaceBetween: 16,
                freeMode: true,
                observer: true,
                observeParents: true,
            });
        });
    }
});

$(function(){
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
    //[2022-02-17] 삭제, 진행
	//베스트, 신상품, 무료배송 서브 메뉴 활성화 기능
	// $(document).on('click', '.menu_sort .btn_sort', function(){
	// 	$(this).addClass('active').siblings().removeClass('active');
	// })
    
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
        //[2022-02-17] 다른 대체 상품 스왑 닫기 기능 추가 
        $('.replace_prod_swap').removeClass('show_bubble');
		
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
    /*========================================  CTG-LIST(menu)  ==================================*/
     //상단 메뉴(1depth, 2depth, 3depth)
    $(document).on('click' , '.ctg_topMenu a, .sub_menu_wrap .ctg_subMenu a', function(){
        $(this).addClass('active').siblings('a').removeClass('active');
    });

    //2depth 선택 => 3depth 열림 
    $(document).on('click', '.ctg_topMenu.depth2 a', function(){

    if($(this).hasClass('depth3_none')) {
        $('.sub_menu_wrap').css('display', 'none');
    } else { 
        $('.sub_menu_wrap').css('display', 'block');
    }
    });

    //3depth 토글 버튼
    $(document).on('click', '.sub_menu_wrap .subMenu_btn', function(){
        $('.sub_menu_wrap .ctg_subMenu').addClass('menuDown');
        $(this).addClass('menuDown');
    });
    $(document).on('click', '.sub_menu_wrap .subMenu_btn.menuDown', function(){
        $('.sub_menu_wrap .ctg_subMenu').removeClass('menuDown');
        $(this).removeClass('menuDown');
    });

    $(document).on('click', '.md_tab .md_anchor', function(){
        $(this).addClass('active').siblings('.md_anchor').removeClass('active');
    });

    //스티키 메뉴
    $(document).on('click' , '.ctg_floating_menues li, .ctg_floating_menues button', function(){
        if($(this).hasClass('arrow_li')) return;  // 애로우 아이콘 있는 메뉴

        // 2022-01-28 개발 요청 사항 : 개발에서 진행
        // if($(this).hasClass('active')){
        //   $(this).removeClass('active');
        // }else{
        //   $(this).addClass('active');
        // }
    });

     //체크박스, 라디오 선택 시 팝업 닫히게
    $(document).on('click', '.dialog_wrap[id^="ClickCksClose"] .dialog_contents .checkbox_cm', function(){
        var closeBtn = $(this).parents('.dialog_wrap').find('button[data-dialog-close]');

        setTimeout(function(){
             $(closeBtn ).trigger('click');
        }, 200);
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




