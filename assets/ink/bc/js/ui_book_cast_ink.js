$(function() {
	var bookCastSearchWrap;
	bookCastSearchWrap = $('.book_cast_menu .search_wrap');
	KyoboBookPub.ink.setSpsOffsetData();

	$('.book_cast_menu .btn_search_open').on('click.bookCast', function(event) {
		bookCastSearchWrap.addClass('active');
		bookCastSearchWrap.find('.form_ip').focus();

	});

	bookCastSearchWrap.find('a, button:not(.btn_search_open), input').on('focusout.bookCast', function(event) {
		var that;
		that = this;
		if ($(that).is('.btn_search_open')) {
			console.log('btn_search_open');
		}
		setTimeout(function () {
			if ((bookCastSearchWrap.find('a:focus').length < 1 && bookCastSearchWrap.find('button:focus').length < 1 && bookCastSearchWrap.find('input:focus').length < 1)
				|| bookCastSearchWrap.find('.btn_search_open').is(":focus")) {
				bookCastSearchWrap.find('.btn_search_open').focus();
				bookCastSearchWrap.removeClass('active');
			}
		}, 1);
	});
});