/*
 * name : ui.js
 * desc : 怨듯넻 �먮컮�ㅽ겕由쏀듃
 * writer : glim
 * create : 2021/11/12
 * update :
 * -
 */

var KyoboBookPub = KyoboBookPub || {};

$(function(){

});

KyoboBookPub.mok = KyoboBookPub.mok || (function () {
	var _front = {},
		_dialogCount = 0,
		_scrollTop = 0,
		saveScrollTop = 0,
		_headerWrapper,
		_dockerWrap,
		_floatingFixed,
		_container,
		_btnGoTop,
		_isMacLike,
		_isAndroid,
		_transitionEnd = 'transitionend webkitTransitionEnd oTransitionEnd otransitionend',
		_fisHeight = 0,
		_vh,
		_resizeVh;

	/**
	 * �ㅻ뜑 �묓떚釉� �곹깭 �대깽�� �ㅼ젙
	 */
	function setHeader() {
		if(_headerWrapper === undefined){return;}

		var gnb, nextScrollTop, currentScrollTop, gnbOffset, pageHeight, headerH;
		headerH = _headerWrapper.outerHeight();
		pageHeight = $('.wrapper').outerHeight() - $(window).height() - headerH;
		$(window).off('resize.uiGNB scroll.uiGNB', setScrollUp).on('resize.uiGNB scroll.uiGNB', setScrollUp);

		setScrollUp();
		setHeaderMain();

		// scrollUp/down check
		function setScrollUp() {
			var offset;
			offset = _headerWrapper.height() / 2;

			currentScrollTop = _scrollTop;

			if (_scrollTop === 0) {
				_headerWrapper.removeClass('scroll_up scroll_down');
			}

			if (saveScrollTop <= currentScrollTop && _scrollTop > offset) { // �ㅽ겕濡� �대┫ ��
				if(!_headerWrapper.hasClass('header_main')) _headerWrapper.removeClass('scroll_up').addClass('scroll_down');

				if (!_dockerWrap.hasClass('docker_fixed') && !$('.wrapper').hasClass('member_login')) {
					_dockerWrap.removeClass('scroll_up').addClass('scroll_down');
				}
			} else { // �ㅽ겕濡� �щ┫ ��
				if(_scrollTop < pageHeight){
					if (_headerWrapper.hasClass('scroll_down')) {
						if(!_headerWrapper.hasClass('header_main') && !_headerWrapper.hasClass('scroll_up')) _headerWrapper.addClass('scroll_up');

						if (!_dockerWrap.hasClass('docker_fixed') && !$('.wrapper').hasClass('member_login')) {
							_dockerWrap.addClass('scroll_up');
						}
					}

					_dockerWrap.removeClass('scroll_down');
					_headerWrapper.removeClass('scroll_down');
				}else{
					if (_scrollTop !== 0) {
						if(!_headerWrapper.hasClass('header_main') && !_headerWrapper.hasClass('scroll_down')) _headerWrapper.removeClass('scroll_up').addClass('scroll_down');

						if (!_dockerWrap.hasClass('docker_fixed') && !$('.wrapper').hasClass('member_login')) {
							_dockerWrap.removeClass('scroll_up').addClass('scroll_down');
						}
					}
				}
			}



			saveScrollTop = currentScrollTop;

		}

		function setHeaderMain(){
			if(!_headerWrapper.hasClass('header_main')) return;

			var searchIp = $('.search_input_wrap');

			_headerWrapper.find('.btn_brand_more').on('click', function(){
				var serviceAllList = $(this).closest('.service_mall_wrap');
				if(serviceAllList.hasClass('active')) {
					serviceAllList.removeClass('active animated');
				}else{
					serviceAllList.addClass('active');

					setTimeout(function () {
						serviceAllList.addClass('animated');
					}, 30);
				}
			});

			// 寃��됱뼱 �낅젰 �� 寃��됱갹 x踰꾪듉(珥덇린�붾쾭�� �몄텧)
			setSearchInput(searchIp, '.ip_gnb_search');
		}
	}

	/**
	 * top踰꾪듉
	 */
	function setGoTop(){
		if (_scrollTop > 50) {
			_btnGoTop.removeClass('hidden').addClass('active');
		} else {
			_btnGoTop.addClass('hidden').removeClass('active');
		}

		_btnGoTop.off('click').on('click', function(e) {
			e.preventDefault();
			$('html, body').animate({
				scrollTop: 0
			}, 200, function() {});
		});

		_btnGoTop.on(_transitionEnd, function(){
			if(!_btnGoTop.hasClass('active')) _btnGoTop.addClass('hidden');
		})

		$(window).on('scroll', function (event) {
			if (_scrollTop > 50) {
				_btnGoTop.removeClass('hidden').addClass('active');
			} else {
				_btnGoTop.removeClass('active');
			}
		});
	}

	/**
	 * 寃��됱갹 input �낅젰 �� 珥덇린�� 踰꾪듉 �몄텧
	 * @param wrap 而⑦뀒�대꼫 DOM ���됲꽣(default : .form_ip_search)
	 * @param input input ���됲꽣(default : .form_ip)
	 * �쒗솕硫댁뿉�� �숈씪 援ъ“媛� n媛쒖씤 寃쎌슦, 蹂꾨룄 泥섎━ �꾩슂�섎�濡� �대옒�ㅻ챸 媛곴컖 �ㅻⅤ寃� 泥섎━�꾩슂
	 */
	function setSearchInput(wrap, input) {
		wrap = wrap || '.form_ip_search';
		input = input || '.form_ip';

		var searchWrap, searchIp, clearBtn;

		if($(wrap).length > 0){
			$(wrap).each(function(){
				searchWrap = $(this);
				searchIp = $(this).find(input);
				clearBtn = $(this).find('.btn_ip_clear');

				if(searchIp.val().length > 0 ) searchWrap.addClass('value');

				clearBtn.off('click').on('click', function(){
					searchWrap = $(this).closest(wrap);
					searchWrap.find(input).val('').focus();
					searchWrap.removeClass('value');

				})

				searchIp.on({
					'propertychange change input paste': function () {
						searchWrap = $(this).closest(wrap);
						if($(this).val().length > 0 ) {
							searchWrap.addClass('value');
						} else{
							searchWrap.removeClass('value');
						}
					},
					'focusin': function () {
						searchWrap = $(this).closest(wrap);

						if (!searchWrap.hasClass('focus')) searchWrap.addClass('focus');
					},
					'focusout': function () {
						searchWrap = $(this).closest(wrap);

						if (searchWrap.hasClass('focus')) searchWrap.removeClass('focus');
					}
				});
			});

		}

	}

	/**
	 * �뚯씠釉� 罹≪뀡 �앹꽦
	 */
	function setTableCaption() {
		$('table[class*="tbl_col"], table[class*="tbl_row"]').each(function (index) {
			var table, tableClass, captionText, captionComplex, theadHeader, tbodyHeader, bodyToHeadIdxs, hasThead,
				captionSubFix;
			table = $(this);
			tableClass = $(this).attr('class');
			captionTextOrigin = $(this).find('caption').text();
			captionComplex = '';
			captionSubFix = '';
			theadHeader = [];
			tbodyHeader = [];
			bodyToHeadIdxs = [];
			hasThead = false;
			// 180123 �섏젙 : match 媛� �섏젙
			if (tableClass.match('tbl-form') && tableClass.match('form-view') !== null) {
				/* console.log('has _ip!!'); */
				captionSubFix = '��(瑜�) �낅젰�섎뒗 �쒖엯�덈떎.';
			} else {
				/* console.log('no _ip!!'); */
				captionSubFix = '��(瑜�) �섑��� �쒖엯�덈떎.';
			}


			// thead th媛� 異붿텧
			if ($(this).find('thead th').length > 0) {
				$(this).find('thead th').each(function (index) {
					theadHeader.push($(this).text());
				});
			}
			// tbody th媛� 異붿텧
			if ($(this).find('tbody th').length > 0) {
				$(this).find('tbody th').each(function (index) {
					// tbody th媛� thead th�� �쒕툕 �ㅻ뜑�� 寃쎌슦(thead th�� tbody th媛� �� �� 議댁옱�섎뒗 寃쎌슦)
					if (theadHeader.length > 0) {
						if (tbodyHeader[$(this).index()] === undefined) {
							tbodyHeader[$(this).index()] = theadHeader[$(this).index()] + ' 而щ읆�� �섏쐞濡�';
						}
						tbodyHeader[$(this).index()] += ' ' + $(this).text();
					} else {
						tbodyHeader.push($(this).text());
					}
				});

				tbodyHeader = tbodyHeader.filter(function (n) {
					return n != undefined
				});
			}
			// console.log(theadHeader);
			// console.log(tbodyHeader);

			if (theadHeader.length > 0 && tbodyHeader.length > 0) {
				captionComplex += theadHeader.join(', ') + ' ' + tbodyHeader.join(', ');
			} else if (theadHeader.length > 0) {
				captionComplex += theadHeader.join(', ');
			} else if (tbodyHeader.length > 0) {
				captionComplex += tbodyHeader.join(', ');
			}

			//console.log(captionTextOrigin + ' 紐⑸줉�대ŉ ' + captionComplex +  ' ��(瑜�) �섑��� �쒖엯�덈떎.');
			$(this).find('caption').text(captionTextOrigin + ' �뚯씠釉붾줈 ' + captionComplex + captionSubFix);
		});
	}

	/**
	 * 蹂꾩젏 而댄룷�뚰듃 �앹꽦
	 */
	function setStarRating() {
		if ($('.form_rating').length <= 0) return false;

		$('.form_rating').each(function(){
			var that = $(this);

			that.rating({
				language: 'ko',
				theme: 'krajee-gly',
				clearCaption: 0,
				stars: 4,
				min: 0,
				max: 10,
				step: 2.5,

				starCaptions: function (rating) {
					if(that.data('caption') !== undefined) {
						return '<span class="val">' + rating + '</span>' + '<span class="total">' + 10 + '</span>';
					}else{
						return ' ';
					}
				}
			});

			if(that.data('caption') !== undefined) {
				that.closest('.rating-container').addClass('has_caption');
			}
		});
	}

	/**
	 * �ㅽ겕濡� �숈옉�� �대떦 �붿냼�� �꾨떖 �� �섎━癒쇳듃 �곷떒 怨좎젙(sps init)
	 */
	function setSpsOffsetData() {
		var ignoreClassList = [];
		var spsElem;
		var headerH = $('.header_wrapper').hasClass('sps') ? 80 : 0;

		ignoreClassList = [
			// 'header_wrapper',
		];

		spsElem = $('.sps', _container);

		// container_wrapper > sps �섎━癒쇳듃 ��寃잜똿
		$('.sps', _container).each(function (index) {

			var that, isIgnore;
			that = this;
			isIgnore = ignoreClassList.some(function (element) {
				return $(that).hasClass(element);
			});
			if (!isIgnore) {
				spsElem.push(that);
			}
		});

		if( spsElem.length === 0 ) return false;

		spsElem.each(function (i) {
			var target = $(this);
			fixData(target);
			// heightChangeTarget.push(target.data('height-change'));
		});

		// heightChangeTarget.forEach(function (target, idx) {
		// 	var sensor = null;
		// 	sensor = new ResizeSensor( $('.' + target), function() {
		// 		fixData( $('.sps[data-height-change='+heightChangeTarget[idx]+']') );
		// 	});
		// });


		var sensor = null;
		sensor = new ResizeSensor( _container, function() {
			$('.sps[data-height-observe]').each(function(index){
				fixData($(this));
			})
		});

		function fixData(tg) {
			var observerCont, addOfs, tgHeight;
			if( tg.find('.sps_observer').length === 0 ) {
				tg.append('<div class="sps_observer" style="top:'+ tg.css('top') +';"></div>');
			}

			observerCont = tg.find('.sps_observer');
			addOfs = ( tg.data('add-offset') !== undefined && !isNaN(tg.data('add-offset')) ) ? tg.data('add-offset') : 0;
			tgHeight = tg.outerHeight();

			if( tg.hasClass('sps_ofs_bottom') ) {
				tg.attr('data-sps-offset', Math.round(observerCont.offset().top - headerH + tg.outerHeight() - addOfs ));
			}
			else {
				tg.attr('data-sps-offset', Math.round(observerCont.offset().top - headerH - tgHeight - addOfs ));
			}
			ScrollPosStyler.init();
		}
	}

	/**
	 * class 蹂��붽컧吏� �듭�踰�
	 * @param mutationTg ��寃�
	 * @param observerClassName 蹂��붾� 泥댄겕 �� �대옒�ㅻ챸
	 * @param callback 蹂��� 媛먯� �� 肄쒕갚
	 */
	function observerMutation(mutationTg, observerClassName, callback){
		var prevClassState = mutationTg;
		var observer = new MutationObserver(function(mutations) {
			mutations.forEach(function(mutation) {
				if(mutation.attributeName === "class"){
					var currentClassState = mutation.target.classList.contains(observerClassName);
					if(prevClassState !== currentClassState)    {
						prevClassState = currentClassState;

						if(currentClassState){
							if ( callback != null && typeof callback === "function" ) {
								callback.apply ( null, [prevClassState]);
							}
						} else{
							if ( callback != null && typeof callback === "function" ) {
								callback.apply ( null, [prevClassState]);
							}
						}
					}
				}
			});
		});

		// 媛먯떆�� �듭뀡 �ы븿, ���� �몃뱶�� �꾨떖
		var config = {
			attributes: true,
		};

		observer.observe(mutationTg, config);
	}

	/**
	 * sps init
	 */
	if (window.ScrollPosStyler) {
		ScrollPosStyler.init({
			classAbove: 'sps-abv',
			classBelow: 'sps-blw',
		});
	}

	/**
	 * �덉씠�� �앹뾽 �ㅼ젙 (jquery UI Dialog)
	 * @param selector {string} �덉씠�� �앹뾽�쇰줈 �앹꽦�� 而⑦뀒�대꼫 ���됲꽣(default: '.dialog_wrap')
	 * @param btnOpen {string} �덉씠�� �앹뾽�� �꾩슦湲� �꾪븳 踰꾪듉 ���됲꽣(default: [data-role=btn-dialog])
	 * @param btnClose {string} �덉씠�� �앹뾽�� �꾩슦湲� �꾪븳 踰꾪듉 ���됲꽣(default: [data-role=btn-dialog-close])
	 */
	function setUIDialog(selector, btnOpen, btnClose) {
		selector = selector || '.dialog_wrap';
		btnOpen = btnOpen || '[data-role=btn-dialog]';
		btnClose = btnClose || '[data-dialog-close]';

		if( $(selector).length > 0 ) {
			var dialogClass, containerId, dialogId, containerClasses;

			$(selector).each(function() {
				if ( $(this).parents('.ui-dialog').length > 0 ) return false;

				containerId = 'body';
				containerClasses = 'dialog_wrapper';
				dialogClass = '';

				// dialog multi class 異붽�
				if ($(this).data('class') !== undefined) {
					if (isNaN(parseInt($(this).data('class')))) {
						dialogClass = $(this).data('class');
					} else {
						dialogClass = 'auto';
					}
				}

				// resize��, popup 媛��대뜲 �뺣젹 css�쒖뼱瑜� �꾪빐 container append
				dialogId = containerId.replace('#', '') + 'Dialog' + _dialogCount;
				$(containerId).append('<div id="' + dialogId + '" class="' + containerClasses + '"></div>');

				_dialogCount++;

				// �앹뾽 湲곕낯 �ㅼ젙
				$(this).dialog({
					appendTo: containerId + ' #' + dialogId, // resize��, popup 媛��대뜲 �뺣젹 css�쒖뼱瑜� �꾪빐 container append
					autoOpen: false,
					minHeight: 'none',
					closeText: "�リ린",
					modal: true,
					resize:false,
					resizable:false,
					draggable:false,
					position: null,
					classes: {
						'ui-dialog': dialogClass, // popup case multi class 異붽�
					},
					open: function( event, ui ) {
						var that = $(this);
						var papa = that.closest('.ui-dialog');
						var container = that.closest('.' + containerClasses);


						// �앹뾽 �リ린 ��, 湲곗〈 �ㅽ겕濡� �꾩튂濡� �대룞�꾪빐 �꾩옱 �ㅽ겕濡ㅺ컪 ����(�곷떒 �대룞 留됯린)
						if($('.ui-dialog-content:visible').length === 0){
							var scrollTop = $(document).scrollTop();
							$('body').css({'top': (scrollTop * -1),}).addClass('dialog_open');
						}

						// �앹뾽 2媛� �댁긽 �몄텧 �� z-index 吏���(�앹뾽 �� �앹뾽 誘멸뎄�꾩떆 ��젣)
						var zNum = 99;
						if ( $('.dialog_wrapper:visible').length > 0 ) {
							$('.dialog_wrapper:visible').each(function (){
								var dialog;
								dialog = $(this);
								zNum = Math.max(zNum, parseInt(dialog.css('z-index')));
							});
						}
						container.addClass('open').css('z-index', zNum+2);

                        // �앹뾽 �� swiper �낅뜲�댄듃
                        if ($(this).parent().find('.swiper-container').length > 0) {
                            $(this).parent().find('.swiper-container').each(function (event) {
                                updateDialogSwiper(this);
                            });
                        }
					},
					close: function( event, ui ) {
						var that = $(this);
						var container = that.closest('.dialog_wrapper')
						var scrollTopPos = $('body').css('top');

						// z-index style ��젣
						container.removeClass('open').removeAttr('style');

						// �앹뾽 �リ린 ��, 湲곗〈 �ㅽ겕濡� �꾩튂濡� �대룞(�곷떒 �대룞 留됯린)
						if( $('.ui-dialog-content:visible' ).length === 0 ) {
							$(containerId).removeClass('dialog_open').removeAttr('style');
							$(window).scrollTop(parseInt(scrollTopPos) * -1);
						}
					},
				});

				// floating ���낆씪 寃쎌슦 modal false 泥섎━
				if($(this).data('class') === 'dialog_floating'){
					$(this).dialog({modal: false});
				}

				if ($(btnOpen).length > 0) {
					$(btnOpen).each(function (index) {
						$(this).off('click').on('click', function (event) {
							var popTgId = $(this).data('target');

							event.preventDefault();
							dialogOnOff().popOpen(popTgId);
						});
					});
				}

				if ($(btnClose).length > 0) {
					$(btnClose).each(function (index) {
						$(this).off('click').on('click', function (event) {
							var openTgId, closeTgId;
							closeTgId = $(this).closest(selector).attr('id');

							event.preventDefault();
							dialogOnOff().popClose('#' + closeTgId);

							if ($(this).data('role') === 'btn-dialog') {
								openTgId = $(this).data('target');
								dialogOnOff().popOpen(openTgId);
							}
						});
					});
				}
			});
		}
	}

	/**
	 * �덉씠�� �앹뾽 On/Off(�몃� �몄텧��)
	 */
	function dialogOnOff(){
		var control = {
			/**
			 * �덉씠�댄뙘�� open
			 * @param tgId {string} �앹뾽 ��寃� id
			 * @param callback {string} �앹뾽 open �� callback �⑥닔
			 */
			popOpen : function(tgId, callback){
				$(tgId).dialog('open');
				if ( callback != null && typeof callback === "function" ) {
					callback.apply ( null, [tgId]);
				}
			},

			/**
			 * �덉씠�댄뙘�� close
			 * @param tgId {string} �앹뾽 ��寃� id
			 */
			popClose : function(tgId) {
				$(tgId).dialog('close');
			},
		}

		return control;
	}


    /**
     * �앹뾽�� �ㅽ뵂�� �� �ㅼ젣 釉뚮씪�곗� �뚮뜑留곸씠 �� �� swiper �낅뜲�댄듃瑜� �꾪븳 �ш��⑥닔
     */
    function updateDialogSwiper(dialog) {
        if (dialog.clientWidth > 0) {
            if (dialog.swiper !== undefined) {
                // �몃꽕�� swiper update
                if (dialog.swiper.params.thumbs.swiper !== null) {
                    dialog.swiper.params.thumbs.swiper.update();
                }
                dialog.swiper.update();
            }
        } else {
            setTimeout(function () {
                updateDialogSwiper(dialog);
            }, 10);
        }
    }


	/**
	 * togglePassword : 鍮꾨�踰덊샇 �④�/蹂댁엫 toggle
	 * @param selector {string} �ㅽ뻾 ���� element
	 * @param btnSelector {string} �ㅽ뻾 button
	 */
	function togglePassword(wrap, btnSelector){
		wrap = wrap || '.form_ip_pw';
		btnSelector = btnSelector || '.btn_toggle_pw';

		var that, toggleInput;
		$(btnSelector).each(function (index) {
			that = $(this);

			if (that.closest(wrap).find('input').prop('disabled')){
				that.attr("disabled", true);
			}

			that.off('click').on('click', function(){
				toggleInput = $(this).closest(wrap).find('input');

				if ($(this).hasClass('active') && toggleInput.attr('type') === 'text'){
					$(this).removeClass('active');
					toggleInput.attr('type', 'password');
				} else {
					$(this).addClass('active');
					toggleInput.attr('type', 'text');
				}
			});
		});
	}

	/**
	 * jQuery UI �� �ㅼ젙
	 * @param selector Tab �앹꽦 DOM ���됲꽣(default : .tab_wrap)
	 */
	function setTabs(selector) {
		selector = selector || '.tab_wrap';

		if ($(selector).length > 0) {
			$(selector).each(function (index) {
				var disabledTabs;
				disabledTabs = [];

				if($(this).data('type-btn') !== undefined){
					return;
				}

				$(this).find('> .tab_list_wrap .tabs .tab_link').each(function (index) {
					if ($(this).hasClass('tab_disabled')) {
						disabledTabs.push(index);
					}
				});

				$(this).tabs({
					disabled: disabledTabs,
					beforeActivate: function (event, ui) {
						if ($(ui.newTab).find('a').attr('href').indexOf('#') !== 0) {
							window.open($(ui.newTab).find('a').attr('href'), '_self');
						}
					},
					activate: function(event, ui){

					},
				});
			});
		}
	}

	/**
	 * fold �ㅼ젙
	 * @param selector Tab �앹꽦 DOM ���됲꽣(default : .tab_wrap)
	 */
	function setFoldBox(selector) {
		selector = selector ? selector : '.fold_box_wrap';
		if ($(selector).length > 0) {
			$(selector).find('.fold_box .fold_box_header').each(function (index) {
				$(this).find('.btn_fold').off('click.uiFold').on('click.uiFold', function (event) {
					if ($(event.target).is('a') || $(event.currentTarget).closest('.fold_box').is('.no_fold') || $(event.target).is('input')) {
						// console.log('setFoldBox', $(event.target).is('a'), $(event.target).is('button'))
						// event.preventDefault();
						return;
					}

					if($(event.target).is('label')){
						if($(event.target).is('label') || $(event.target).is('input')){
							return;
						}
					}

					var foldBox = $(this).closest('.fold_box');

					var isExpanded;
					isExpanded = foldBox.hasClass('expanded');

					if (!($(event.currentTarget).closest('.fold_box_wrap').data('type') === 'multi')) {
						var allFoldBox;
						if(isExpanded){
							allFoldBox = $(this).closest('.fold_box_wrap').find('.fold_box').not('.expanded');
						}else{
							allFoldBox = $(this).closest('.fold_box_wrap').find('.fold_box');
						}

						allFoldBox.removeClass('expanded');
						allFoldBox.find('.hidden').text('而⑦뀗痢� �닿린');
					}

					if(isExpanded){
						foldBox.removeClass('expanded');
						foldBox.find('.hidden').text('而⑦뀗痢� �닿린');
					}else{
						foldBox.addClass('expanded');
						foldBox.find('.hidden').text('而⑦뀗痢� �リ린');
					}

					var evtData = {
						index: $(event.currentTarget).closest('.fold_box').index(),
						isExpanded: $(event.currentTarget).closest('.fold_box').hasClass('expanded'),
					};
					var evt = new CustomEvent('headerClick', {'detail': evtData});

					$(event.currentTarget).closest('.fold_box')[0].dispatchEvent(evt);
				});
			});
		}
	}

	/**
	 * max-height �곸뿭 �덉뿉 �붿냼媛� �섏튂�� 寃쎌슦 auto overflow 泥섎━
	 * @param wrap 而⑦뀒�대꼫 DOM ���됲꽣 (default: '.auto_overflow_wrap')
	 * @param contents �섏뼱�섎뒗 而⑦뀗痢� �곸뿭 (default: '.auto_overflow_contents')
	 * @param inner �섏뼱�섎뒗 �붿냼 ���됲꽣 (default: '.auto_overflow_inner')
	 * @param btn �곸뿭 �쇱묠 踰꾪듉 ���됲꽣 (default: '[data-btn-toggle]')
	 */
	function autoOverflowContents(wrap, contents, inner, btn){
		wrap = wrap || '.auto_overflow_wrap';
		contents = contents || '.auto_overflow_contents';
		inner = inner|| '.auto_overflow_inner';
		btn = btn || '> .auto_overflow_footer [data-btn-toggle]';

		if($(wrap).length > 0){
			$(wrap).each(function(){
				var tg, isToggle, isOpened, wrapMaxHeight, innerHeight, btnBeforeText, btnAfterText;
				tg = $(this);
				wrapMaxHeight = parseInt(tg.find(contents).css('max-height').replace('px', ''));
				btnBeforeText = tg.find(btn).text();

				function overflowChk() {
					innerHeight = tg.find(inner).outerHeight();
					if (innerHeight > wrapMaxHeight) {
						tg.addClass('overflow');
					} else {
						if (tg.hasClass('overflow')) tg.removeClass('overflow');
					}
				}

				overflowChk();

				if(tg.hasClass('overflow')) {
					if (tg.hasClass('active')) {
						isOpened = true;
					}

					if (tg.find(btn).data('btn-toggle') !== undefined) {
						isToggle = true;
					}

					if (isToggle) {
						tg.find(btn).on('click', function (event) {
							if (Boolean(btnBeforeText.match('�쇱튂湲�'))) {
								btnAfterText = btnBeforeText.replace('�쇱튂湲�', '�묎린');
							} else if (Boolean(btnBeforeText.match('�붾낫湲�'))) {
								btnAfterText = btnBeforeText.replace('�붾낫湲�', '�リ린');
							} else if (Boolean(btnBeforeText.match('�묎린'))) {
								btnAfterText = btnBeforeText.replace('�묎린', '�쇱튂湲�');
							} else if (Boolean(btnBeforeText.match('�リ린'))) {
								btnAfterText = btnBeforeText.replace('�リ린', '�붾낫湲�');
							}

							if ($(this).closest(wrap).hasClass('active')) {
								$(this).closest(wrap).removeClass('active');
								$(this).removeClass('active');

								if (isOpened) {
									$(this).find('.text').text(btnAfterText);
								} else {
									$(this).find('.text').text(btnBeforeText);
								}
							} else {
								$(this).closest(wrap).addClass('active');
								$(this).addClass('active');

								if (isOpened) {
									$(this).find('.text').text(btnBeforeText);
								} else {
									$(this).find('.text').text(btnAfterText);
								}
							}
						});
					}
				}

				$(window).off('resize.uiAutoOverflow', overflowChk).on('resize.uiAutoOverflow', overflowChk);
			});
		}
	}

	/**
	 * �レ옄 number�� ���� n �먮┸�� 臾몄옄�대줈 移섑솚�섏뿬 諛섑솚
	 * @param number {number} �뺤닔 �レ옄 媛�
	 * @param digits {number} �먮┸��(defalut: 2)
	 * @returns {string} 移섑솚 �� 臾몄옄��
	 */
	function setPrependZero(number, digits) {
		number = number + '';
		digits = digits || 2;
		return number.length >= digits ? number : new Array(digits - number.length + 1).join('0') + number;
	}

	/**
	 * toast message
	 * @param msg �몄텧�섎뒗 硫붿꽭吏� �댁슜
	 * @param timer toast �몄텧 �쒓컙 諛�由ъ꽭而⑤뱶濡� 怨꾩궛(default: 2000)
	 */
	function setToastMessage(msg, timer){
		if (!timer) { timer = 2000; }

		var toastCont, dockerHeight, bottomMargin;
		toastCont = $("<div class='toast_wrap'><span class='toast_message'>" + msg + "</span></div>");
		dockerHeight = $('.docker_wrapper').height();
		bottomMargin = 36;

		if($('body').find('.toast_wrap').length < 1) $('body').append(toastCont);
		// toastPopupCalaPos();

		toastCont.slideToggle(200, function() {
			if (!isNaN(timer)) {
				setTimeout(function() {
					toastCont.fadeOut(function() {
						$(this).remove();
					});
				}, timer);
			}
		});

		// $(window).off('scroll.uiToast resize.uiToast', toastPopupCalaPos).on('scroll.uiToast resize.uiToast', toastPopupCalaPos);

		function toastPopupCalaPos() {
			if ($('body').hasClass('dialog_open')) return;

			if ($('.header_wrapper').hasClass('scroll_down')){
				console.log('scroll_down')
				$('.toast_wrap').css({
					'bottom': '30px',
				});
				return false;
			}
			$('.toast_wrap').css({
				'bottom': dockerHeight + bottomMargin + 'px',
			});
		}
	}

	/**
	 * setUISpinner : spinner set
	 * @param selector {string} �ㅽ뻾 element
	 */
	function setUISpinner(selector) {
		selector = selector || '.form_spinner';

		if ($(selector).length > 0) {
			$(selector).each(function (index) {
				var isDisabled = $(this).attr('disabled');

				$(this).spinner({
					decreseText: '�곹뭹 �섎웾 �� 媛� 以꾩씠湲�',
					increseText: '�곹뭹 �섎웾 �� 媛� �섎━湲�',
					min: $(this).data('min') === undefined ? 0 : $(this).data('min'),
					max: $(this).data('max'),
					disabled: isDisabled,
				});
			});

			// �쒓� �낅젰 留됯린
			$(selector).off('input').on('input', function (event) {
				var val, regExVal;
				val = $(this).spinner('value');
				if (val === null) {
					val = 0;
				}
				regExVal = val.toString().replace(/[^\d+$]/g, '');
				$(this).spinner('value', regExVal);
			});
		}
	}

	/**
	 * �고렪踰덊샇 寃��� 寃곌낵 �곸꽭二쇱냼蹂닿린 �곸뿭 on/off
	 */
	function addressDetailAreaOnOff(){
		var btnRoad = $('.btn_road_name');
		var btnLand = $('.btn_land_number');

		btnRoad.add(btnLand).on('click', function(){
			$(this).closest('.address_success_item').siblings().find('.success_detail').removeClass('active');
			$(this).closest('.address_success_item').find('.success_detail').addClass('active');
		});
	}

	/**
	 * tooltip hover type on off
	 * @param container tooltip 而⑦뀒�대꼫 �곸뿭 DOM ���됲꽣 (default : .tooltip_wrap)
	 */
	function tooltipOnOff(container){
		container = container || '.tooltip_wrap';

		if ($(container).length > 0){
			$(container).each(function(){
				var that, isToggle;
				that = $(this);

				$(this).find('.btn_tooltip').on('click', function(){
					if ($(this).data('btn-toggle') !== undefined){
						isToggle = true;
					}

					if(isToggle){
						if (that.hasClass('active')) {
							that.removeClass('active').addClass('hide');
							$(this).find('.hidden').text('�곸꽭�댁슜 �닿린');
						} else {
							$('.tooltip_wrap.active').removeClass('active').addClass('hide');
							that.removeClass('hide').addClass('active');
							$(this).find('.hidden').text('�곸꽭�댁슜 �닿린');
						}
						return;
					}

					if(that.hasClass('active')) return;
					$('.tooltip_wrap.active').removeClass('active').addClass('hide');
					that.removeClass('hide').addClass('active');
				});

				if (!isToggle){
					$(this).find('.btn_tooltip_close').on('click', function(){
						that.removeClass('active').addClass('hide');
					});
				}

				$(this).on(_transitionEnd, function(){
					$(this).removeClass('hide');
				});
			});
		}
	}

	/**
	 * img 媛�濡쒗삎/�몃줈�� 泥댄겕
	 * @param container tooltip 而⑦뀒�대꼫 �곸뿭 DOM ���됲꽣 (default : [data-role=tooltip-click])
	 */
	function checkImagePortrait(imgTg) {
		var chkImg = imgTg.find('img').get(0);

		if (chkImg.naturalWidth > chkImg.naturalHeight) { // 媛�濡쒗삎
			imgTg.addClass('landscape');
		} else if (chkImg.naturalWidth < chkImg.naturalHeight) { //�몃줈��
			imgTg.addClass('portrait');
		} else { // �뺤궗媛곹삎
			imgTg.addClass('even');
		}
	}

	/**
	 * ios safari �ㅽ뙣�� �몄텧 �� �섏씠吏� �ㅽ겕濡ㅼ떆 �섎떒 �щ갚 �앹꽦 踰꾧렇 泥섎━
	 */
	function setIpFocusBlur(){
		$(document).on("touchend", function (e) {
			/* ios safari �ㅻ낫�� �몄텧 �� �곹깭濡� �ㅽ겕濡� 諛쒖깮 ��, �섎떒 怨좎젙 nav bar 留뚰겮 �ㅽ겕濡� �곸뿭�� 異붽�濡� 諛쒖깮�섏뿬
				 �ㅻ낫�� �몄텧�곹깭�먯꽌 touchend �대깽�� 諛쒖깮 ��, input�먯꽌 focusout�섏뿬 �ㅻ낫�� 誘몃끂異� �� */
			if($(':focus').is('textarea, input')) $(':focus').blur();
		});
	}

	/**
	 * tag button on/off
	 */
	function setTagToggle(){
		$('.tag_wrap').each(function(){
			if($(this).data('tag-toggle') !== undefined) {
				$(this).find('.tag_item').on('click', function () {
					$(this).siblings().removeClass('active');
					$(this).addClass('active');
				})
			}
		});
	}

	_front.setSpsOffsetData = setSpsOffsetData;
	_front.setTableCaption = setTableCaption;
	_front.setStarRating = setStarRating;
	_front.setUIDialog = setUIDialog;
	_front.dialogOnOff = dialogOnOff;
	_front.togglePassword = togglePassword;
	_front.setTabs = setTabs;
	_front.setHeader = setHeader;
	_front.setPrependZero = setPrependZero;
	_front.setToastMessage = setToastMessage;
	_front.setFoldBox = setFoldBox;
	_front.tooltipOnOff = tooltipOnOff;
	_front.checkImagePortrait = checkImagePortrait;
	_front.autoOverflowContents = autoOverflowContents;

	// �뚯쟾蹂�寃� �대깽�� 諛쒖깮 �� : 100vh �ㅽ��� 吏���
	$(window).on('orientationChange ', function () {

		if (isMacLike) {
			_vh = getBodyHeight * 0.01;
			_resizeVh = getBodyHeight * 0.01;
			document.documentElement.style.setProperty('--vh', _vh + 'px');
			document.documentElement.style.setProperty('--reVh', _resizeVh + 'px');
		}
		if (_isAndroid) {
			_vh = window.outerHeight;
			_resizeVh = window.outerHeight;
			document.documentElement.style.setProperty('--vh', _vh + 'px');
			document.documentElement.style.setProperty('--reVh', _resizeVh + 'px');
		}else {
			_vh = window.innerHeight;
			_resizeVh = window.innerHeight;
			document.documentElement.style.setProperty('--vh', _vh + 'px');
			document.documentElement.style.setProperty('--reVh', _resizeVh + 'px');
		}


	});

	// �뚯쟾蹂�寃� �대깽�� 諛쒖깮 �� : 100vh �ㅽ��� 吏���
	$(window).on('resize.uiCommon', function () {

		_resizeVh = window.outerHeight;

		if (_isMacLike) {
			_resizeVh = getBodyHeight * 0.01;
			document.documentElement.style.setProperty('--reVh', _resizeVh + 'px');
		}
		if (_isAndroid) {
			_resizeVh = window.outerHeight;
			document.documentElement.style.setProperty('--reVh', _resizeVh + 'px');
		}else {
			_resizeVh = window.innerHeight;
			document.documentElement.style.setProperty('--reVh', _resizeVh + 'px');
		}

	});

	$(document).on('touchstart', function (e) {
		_fisHeight = window.innerHeight;
	});

	clearTimeout($(document).data('scrollEnd'));

	$(window).on('scroll.uiCommon', function (event) {
		_scrollTop = $(window).scrollTop();

		$(document).data('scrollEnd', setTimeout(function () {
			if (_isMacLike && window.innerHeight !== _fisHeight) {
				_resizeVh = (window.innerHeight + 1);
				document.documentElement.style.setProperty('--reVh', _resizeVh + 'px');
			} else if (_isAndroid && window.outerHeight !== _fisHeight) {
				_resizeVh = window.outerHeight;
				document.documentElement.style.setProperty('--reVh', _resizeVh + 'px');
			}
		}, event));

	});

	function getBodyHeight() {
		var myHeight = 0;
		if( typeof( window.innerWidth ) == 'number' ) {
			//Non-IE
			myHeight = window.innerHeight;
		} else if( document.documentElement && ( document.documentElement.clientWidth || document.documentElement.clientHeight ) ) {
			//IE 6+ in 'standards compliant mode'
			myHeight = document.documentElement.clientHeight;
		} else if( document.body && ( document.body.clientWidth || document.body.clientHeight ) ) {
			//IE 4 compatible
			myHeight = document.body.clientHeight;
		}
		return myHeight;
	}

	$(window).on('load.uiCommon', function () {
		/* 留� OS �먮뒗 iOS / android �붾컮�댁뒪 泥댄겕 */
		_isMacLike = /(Mac|iPhone|iPod|iPad)/i.test(navigator.platform);
		_isAndroid = /Android/i.test(navigator.userAgent);

		if (_isMacLike) {
			_vh = getBodyHeight * 0.01;
			_resizeVh = getBodyHeight * 0.01;
			document.documentElement.style.setProperty('--vh', _vh + 'px');
			document.documentElement.style.setProperty('--reVh', _resizeVh + 'px');
		}
		if (_isAndroid) {
			_vh = window.outerHeight;
			_resizeVh = window.outerHeight;
			document.documentElement.style.setProperty('--vh', _vh + 'px');
			document.documentElement.style.setProperty('--reVh', _resizeVh + 'px');
		}else {
			_vh = window.innerHeight;
			_resizeVh = window.innerHeight;
			document.documentElement.style.setProperty('--vh', _vh + 'px');
			document.documentElement.style.setProperty('--reVh', _resizeVh + 'px');
		}

	});

	$(document).ready(function () {
		_btnGoTop = $('.btn_go_top');
		_headerWrapper = $('.header_wrapper');
		_floatingFixed = $('.floating_fixed');
		_container = $('.container_wrapper');
		_scrollTop = $(window).scrollTop();
		_dockerWrap = $('.docker_wrapper');

		_btnGoTop.off('click').on('click', function(e) {
			e.preventDefault();
			$('html, body').animate({
				scrollTop: 0
			}, 200, function() {});
		});

		setSpsOffsetData();
		setHeader();
		setGoTop();
		setTableCaption();
		setUIDialog();
		togglePassword();
		setTabs();
		setSearchInput();
		setUISpinner();
		setStarRating();
		addressDetailAreaOnOff();
		setIpFocusBlur();
		setFoldBox();
		tooltipOnOff();
		autoOverflowContents();
		setTagToggle();
	});

	// �댄븯 媛� �붾㈃�먯꽌 �몄텧�섎뒗 �곸뿭
	function setSwitchListBtn(callback) {
		$('.switch_list_btn_wrap').each(function (index){
			var btns, target;
			btns = $(this).find('button');
			target = $($(this).data('target'));

			btns.on('click.switch', function(event) {
				var type;
				btns.removeClass('active');
				$(this).addClass('active');
				type = 'view_type_' + $(this).data('type');
				// console.log(type);
				target.removeClass('view_type_img view_type_txt view_type_list').addClass(type);
				// console.log(target, type);

				callback(target, type);
			});
		});
	}

	_front.setSwitchListBtn = setSwitchListBtn;

	return _front;
})();

// Custom Swiper
var CustomSwiper = function(selector, options) {
	options = $.extend(options, {containerModifierClass: 'swiper-'});
	return new Swiper(selector, options);
}