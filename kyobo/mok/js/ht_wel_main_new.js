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
        autoplay: {
            delay:5000,
            disableOnInteraction: false,
        },
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

$(function(){
    if(!$('.wel_curation_cont').length) return;
    if($('.curation_img').find('.swiper-slide').length > 1) {
        welCuration();
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





// Scroll Event
$(window).on('scroll', feScrollFn);
$.fn.feScrollGet = function(){
    var offset = $(window).scrollTop() + $(window).height() * 0.9;
  	
	$animate = $('.mc_cont, .wel_cont, .li_box_ty .li, .li_ty .li, .tab_swiper,   .li_resp_ty.ty02 .li');
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



// Tab
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





// easytimer : 임시
var module,Timer=function(a){"use strict";function b(){return"undefined"!=typeof document}function c(){return A}function d(a,b){return(a%b+b)%b}function e(a,b,c){var d,e="";for(d=0;b>d;d+=1)e+=String(c);return(e+a).slice(-e.length)}function f(){this.secondTenths=0,this.seconds=0,this.minutes=0,this.hours=0,this.days=0,this.toString=function(a,b,c){a=a||["hours","minutes","seconds"],b=b||":",c=c||2;var d,f,g=[],h="";for(f=0;c>f;f+=1)h+="0";for(f=0;f<a.length;f+=1)void 0!==this[a[f]]&&g.push(e(this[a[f]],c,"0"));return d=g.join(b)}}function g(){function a(){return ka.countdown}function e(a,b){fa[a]+=b,ga[a]+=b}function g(a){e(y,a),U("daysUpdated")}function B(b){e(x,b),fa.hours=d(fa.hours,o),(a()&&fa.hours===o-1||!a()&&0===fa.hours)&&g(b),_===x&&(ga[w]+=a()?-l:l,ga[v]+=a()?-m:m,ga[u]+=a()?-n:n),U("hoursUpdated")}function C(b){e(w,b),fa.minutes=d(fa.minutes,l),(a()&&fa.minutes===l-1||!a()&&0===fa.minutes)&&B(b),_===w&&(ga[v]+=a()?-j:j,ga[u]+=a()?-k:k),U("minutesUpdated")}function D(b){e(v,b),fa.seconds=d(fa.seconds,j),(a()&&fa.seconds===j-1||!a()&&0===fa.seconds)&&C(b),_===v&&(ga[u]+=a()?-i:i),U("secondsUpdated")}function E(b){e(u,b),fa.secondTenths=d(fa.secondTenths,i),(a()&&fa.secondTenths===i-1||!a()&&0===fa.secondTenths)&&D(b),U("secondTenthsUpdated")}function F(){clearInterval($),$=void 0,ia=!1,ja=!1}function G(){var a,b=z[_];switch(_){case y:a=g;break;case x:a=B;break;case w:a=C;break;case u:a=E;break;default:a=D}$=setInterval(function(){a(aa),ba(fa),J()&&(U("targetAchieved"),P())},b),ia=!0,ja=!1}function H(){return fa.days>ca[t]||fa.days===ca[t]&&(fa.hours>ca[r]||fa.hours===ca[s]&&(fa.minutes>ca[r]||fa.minutes===ca[r]&&(fa.seconds>=ca[q]||fa.seconds===ca[v]&&fa.secondTenths>=ca[p])))}function I(){return fa.days<ca[t]||fa.days===ca[t]&&(fa.hours<ca[s]||fa.hours===ca[s]&&(fa.minutes<ca[r]||fa.minutes===ca[r]&&(fa.seconds<ca[q]||fa.seconds===ca[q]&&fa.secondTenths<=ca[p])))}function J(){return ca instanceof Array&&(ka.countdown&&I()||!ka.countdown&&H())}function K(){for(var a in fa)fa.hasOwnProperty(a)&&"number"==typeof fa[a]&&(fa[a]=0);for(var a in ga)ga.hasOwnProperty(a)&&"number"==typeof ga[a]&&(ga[a]=0)}function L(a){_=a&&"string"==typeof a.precision?a.precision:v,ba=a&&"function"==typeof a.callback?a.callback:function(){},aa=a&&a.countdown===!0?-1:1,ea=a&&1==a.countdown,a&&"object"==typeof a.target&&N(a.target),a&&"object"==typeof a.startValues&&O(a.startValues),ca=ca||!ea?ca:[0,0,0,0,0],ka={precision:_,callback:ba,countdown:"object"==typeof a&&1==a.countdown,target:ca,startValues:da}}function M(a){var b,c,d,e,f,g;if("object"==typeof a)if(a instanceof Array){if(5!=a.length)throw new Error("Array size not valid");g=a}else g=[a.secondTenths||0,a.seconds||0,a.minutes||0,a.hours||0,a.days||0];for(var h=0;h<a.length;h+=1)a[h]<0&&(a[h]=0);return b=g[p],c=g[q]+Math.floor(b/i),d=g[r]+Math.floor(c/j),e=g[s]+Math.floor(d/l),f=g[t]+Math.floor(e/o),g[p]=b%i,g[q]=c%j,g[r]=d%l,g[s]=e%o,g[t]=f,g}function N(a){ca=M(a)}function O(a){da=M(a),fa.secondTenths=da[p],fa.seconds=da[q],fa.minutes=da[r],fa.hours=da[s],fa.days=da[t],ga.days=fa.days,ga.hours=ga.days*o+fa.hours,ga.minutes=ga.hours*l+fa.minutes,ga.seconds=ga.minutes*j+fa.seconds,ga.secondTenths=ga.seconds*i+fa.secondTenths}function P(){F(),K(),U("stopped")}function Q(a){if(this.isRunning())throw new Error("Timer already running");this.isPaused()||L(a),J()||(G(),U("started"))}function R(){F(),ja=!0,U("paused")}function S(a,d){b()?ha.addEventListener(a,d):c()&&ha.on(a,d)}function T(a,d){b()?ha.removeEventListener(a,d):c()&&ha.removeListener(a,d)}function U(a){b()?ha.dispatchEvent(new h(a)):c()&&ha.emit(a)}function V(){return ia}function W(){return ja}function X(){return fa}function Y(){return ga}function Z(){return ka}var $,_,aa,ba,ca,da,ea,fa=new f,ga=new f,ha=b()?document.createElement("span"):c()?new A.EventEmitter:void 0,ia=!1,ja=!1,ka={};"undefined"!=typeof this&&(this.start=Q,this.pause=R,this.stop=P,this.isRunning=V,this.isPaused=W,this.getTimeValues=X,this.getTotalTimeValues=Y,this.getConfig=Z,this.addEventListener=S,this.removeEventListener=T)}var h="undefined"!=typeof window?window.CustomEvent:void 0;"undefined"!=typeof window&&"function"!=typeof h&&(h=function(a,b){b=b||{bubbles:!1,cancelable:!1,detail:void 0};var c=document.createEvent("CustomEvent");return c.initCustomEvent(a,b.bubbles,b.cancelable,b.detail),c},h.prototype=window.Event.prototype,window.CustomEvent=h);var i=10,j=60,k=600,l=60,m=3600,n=36e3,o=24,p=0,q=1,r=2,s=3,t=4,u="secondTenths",v="seconds",w="minutes",x="hours",y="days",z={secondTenths:100,seconds:1e3,minutes:6e4,hours:36e5,days:864e5},A=a&&a.exports?require("events"):void 0;return a&&a.exports?a.exports=g:"function"==typeof define&&define.amd&&define([],function(){return g}),g}(module);










