var gCom = {
	init : function(){
		//console.log('gCom.init()');
		this.gHeader.init();
		this.gAside.init();
		this.gResponsive.init();
	},
	gHeader : {
		headerEl : 'js_wsg_header_wrapper',
		init : function(){
			//this.setInit();
			this.setSnbInit();
		},
		setInit : function(){
			var path = location.pathname;
			var snbMenu = 'wsg_snbMenu0';
			var activeEl = null;
			$('.wsg_lnb a').each(function(i){
				if (path.indexOf($(this).attr('data-url')) > -1){
					activeEl = $(this);
					activeEl.parent().addClass('is_current');
					snbMenu = activeEl.attr('data-aside');
					$('.'+snbMenu).show().siblings().not(':visible').remove();
				}
				else if ($('.wsg_lnb a').length - 1 == i){
					if (activeEl == null){
						$('.'+snbMenu).show().siblings().not(':visible').remove();
					}
				}


				return;
			});
		},
		setSnbInit : function(){//lnb focus
			var path = location.pathname;
			var activeEl = null;
			var pageUrl = path.split("/")[path.split("/").length-1];
			var tgUrl = "";

			$('.wsg_snb .wsg_node2').removeClass('is_current');
			$('.wsg_snb .wsg_node2 > a').each(function(i){
				tgUrl = $(this).attr("href").split("/")[$(this).attr("href").split("/").length-1];

				if (tgUrl == pageUrl){
					$(this).parent().addClass('is_current');
				}
				return;
			});

			var papa = $('.wsg_snb .wsg_node2.is_current');
			var el = $("<ul class='wsg_node3'>");
			$('.wsg_content_body .wsg_section').each(function(i){
				// el.append("<li><a href='#"+$(this).attr("id")+"'>"+$(this).find('.wsg_h2').html()+"</li>");
				el.append("<li><a href='#' data-target="+$(this).attr('id')+" >"+$(this).find('.wsg_h2').html()+"</li>");
			});
			papa.append (el);

			papa.find(".wsg_node3").find("a").bind("click", function(){
				var yy = $('.wsg_content_body').find('#'+$(this).data("target")).offset().top - 80;
				$(window).scrollTop(yy);
				return false;
			})
		}
	},
	gAside : {
		asideEl : '.js_wsg_aside',
		anbBtnEl : '.btn_aside',
		maskEl : '.g_mask',
		asideWid : null,
		init : function(){
			if (location.hash != ''){
				gUI.spyScroll.action(location.hash);
			}

			this.asideWid = $(this.asideEl).width();
			this.setInit();
			this.event();

		},
		setInit : function(){
			var _this = this;
			var path = location.pathname;
			$(this.asideEl).find('.wsg_snb a[href*="'+path+'"]').parent().addClass('is_current');
		},
		event : function(){
			$('body').addClass('is_aside_opened');
			//펼치기
			$(this.anbBtnEl).off('click').on('click', function(e){

				if (!$('body').hasClass('is_aside_closed')){
					$('body').removeClass('is_aside_opened');
					$('body').addClass('is_aside_closed');
				} else {
					$('body').addClass('is_aside_opened');
					$('body').removeClass('is_aside_closed');
				}
			}).addClass('is_clickEvent');

			//숨기기
			$(this.maskEl).not('.is_clickEvent').on('click', function(e){
				$('body').removeClass('is_aside_opened').addClass('is_aside_closed');
			}).addClass('is_clickEvent');
		},
	},
	gResponsive : {
		asideW : $('.js_wsg_aside').width(),
		init : function(){
			this.action();
			this.event();


		},
		event : function(){
			var _this = this;
			var time = null;
			$(window).on('resize', function(){
				clearTimeout(time);
				time = setTimeout(function(){
					_this.action();
				},300);
			})
		},
		action : function(){
			//Set is_responsive_md
			if ($(window).width() > 719 && $(window).width() < 1024 && !$('body').hasClass('is_responsive_md')){
				$('body').addClass('is_responsive_md');
			} else if ($(window).width() > 1023 && $('body').hasClass('is_responsive_md')){
				$('body').removeClass('is_responsive_md');
			}

			//Set is_responsive_sm
			if ($(window).width() < 720 && !$('body').hasClass('is_responsive_sm')){
				$('body').addClass('is_responsive_sm');
				$('body').removeClass('is_responsive_md');
				if ($('.wsg_lnb > .g_node_title').length == 0){
					var noteTitle = $('.wsg_lnb > ul > li.is_current > a').text();
					$('.wsg_lnb > ul').before('<button type="button" class="g_node_title"></button>');
					$('.wsg_lnb > .g_node_title').text(noteTitle);

					//Event
					$('.g_node_title').on('click', function(){
						$(this).parent().toggleClass('is_visible');
					})
				}
			} else if ($(window).width() > 719 && $('body').hasClass('is_responsive_sm')){
				$('body').removeClass('is_responsive_sm');
				$('body').addClass('is_responsive_md');
				$('.wsg_lnb > .g_node_title').remove();
			}

			//Set is_aside_closed
			if ($(window).width() < 1024 && !$('body').hasClass('is_aside_closed') && !$('body').hasClass('is_aside_opened')){
				$('body').addClass('is_aside_closed');
			} else if ($(window).width() > 1023 && $('body').hasClass('is_aside_closed')){
				$('body').removeClass('is_aside_closed');
			}


			if ( $(window).width() < 720 && $('body').hasClass('is_aside_opened') ){
				$('body').removeClass('is_aside_opened');
				$('body').addClass('is_aside_closed');
			}
		}
	}
}

var gUI = {
	init : function(){

		if ($('.g_js_scroll').length){
			this.mScroll.init();
		}
		if ($('[data-role=spy-scroll]').length){
			this.spyScroll.init();
		}
		if ($('.wsg_tab_codeview').length){
			this.tabCodeview.init();
		}
		if ($('.wsg_example_wrap').length){
			this.example.init();
		}
		if ($('.js_follow').length){
			this.followActive.init();
		}
		if ($('.wsg_example_copy').length){
			//ut.setScriptLoader(gRootURL.root+'wsg/common/js/addon/jquery.clipboard.min.js', 'clipboardScript');
			//this.copyed.init();
		}
	},
	mScroll : {
		scrollEl : '.g_js_scroll',
		init : function(){
			$(this.scrollEl).each(function(){
				$(this).mCustomScrollbar({scrollInertia:200});
			})
		}
	},
	spyScroll : {
		init : function(){
			var _this = this;
			var id = null;
			$('[data-role=spy-scroll]').on('click', function(){
				if ($(this).attr('href').indexOf('#') > -1){
					id = '#' + $(this).attr('href').split('#')[1];
				} else {
					id = $(this).attr('href');
				}

				_this.action(id);
			})
		},
		action : function(id){
			var topH = $('#wsg_header_wrapper').height();
			var gapH = 30;
			var scrObj = 'html, body';
			if ($(id).length){
				$(scrObj).stop().animate({scrollTop:$(id).offset().top - topH - gapH}, 500);
			}
		},
	},
	tabCodeview : {
		tabNav : '.g_tab',
		tabLink : '.wsg_tab_codeview .wsg_tab_nav a',
		target : null,

		init : function(){
			if ($(this.tabNav).length > 0){
				this.event();
			}
		},
		event : function(){
			//현재페이지의 탭 활성화
			$(this.tabLink).on('click', function(){
				gUI.tabCodeview.action($(this));return false;
			});
		},
		action : function($this){
			this.target = $this.attr('href');
			if ($this.parent().is('.is_active')){
				$this.parent().removeClass('is_active');
				$(this.target).removeClass('is_active');
			} else {
				$this.parent().addClass('is_active').siblings().removeClass('is_active');
				$(this.target).addClass('is_active').siblings().removeClass('is_active');
			}
		}
	},
	example : {
		headerEl : '.wsg_example_header',
		btnEl : '.wsg_example_btn',
		target : null,

		init : function(){
			this.event();
		},
		event : function(){
			//현재페이지의 탭 활성화
			$(this.btnEl).on('click', function(){
				gUI.example.action($(this));return false;
			});
		},
		action : function($this){
			this.target = $this.attr('href');
			if ($this.is('.is_active')){
				$this.removeClass('is_active');
				$(this.target).removeClass('is_active');
			} else {
				$this.addClass('is_active').siblings().removeClass('is_active');
				$(this.target).addClass('is_active').siblings().removeClass('is_active');
			}
		}
	},
	copyed : {
		elWrap : '.wsg_example_wrap',
		elCopy : '.wsg_example_copy',
		elTarget : '.wsg_example_body',
		init : function(){
			this.reset();
		},
		reset : function(){
			var _this = this;
			var lenCopy = $(_this.elCopy).length;
			$(_this.elCopy).each(function(i){
				var targetHTML = $(this).closest(_this.elWrap).find(_this.elTarget).html();
				$(this).attr('data-clipboard-text', targetHTML);
				if (i == lenCopy-1){
					//_this.action();
				}
			})
		},
		action : function(){
			var clipboard = new Clipboard($(this.elCopy));
		}
	}
}
$(document).ready(function(){
	gCom.init();
	gUI.init();
})
