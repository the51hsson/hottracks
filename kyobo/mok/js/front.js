


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
 * fold 설정
 */
function setFoldBox(selector) {
	selector = selector ? selector : '.fold_box_wrap';
	if ($(selector).length > 0) {
		$(selector).find('.fold_box .fold_box_header').each(function (index) {
			$(this).find('.btn_fold').off('click.uiFold').on('click.uiFold', function (event) {
				if ($(event.target).is('a') || $(event.currentTarget).closest('.fold_box').is('.no_fold') || $(event.target).is('input')) {
					console.log('setFoldBox', $(event.target).is('a'), $(event.target).is('button'))
					event.preventDefault();
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
					allFoldBox.find('.hidden').text('컨텐츠 열기');
				}

				if(isExpanded){
					foldBox.removeClass('expanded');
					foldBox.find('.hidden').text('컨텐츠 열기');
				}else{
					foldBox.addClass('expanded');
					foldBox.find('.hidden').text('컨텐츠 닫기');
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



$(document).ready(function(){
	
	setTabs();
	setFoldBox();





	
});


// Custom Swiper
var CustomSwiper = function(selector, options) {
	options = $.extend(options, {containerModifierClass: 'swiper-'});
	return new Swiper(selector, options);
}