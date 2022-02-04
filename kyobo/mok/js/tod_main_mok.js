$(function(){
    //오늘만 특가, 핫딜 특가 메뉴 활성화
    $(document).on('click', '.tod_menu_wrap .tod_menu', function(){
        $(this).addClass('active').siblings('.tod_menu').removeClass('active');
    });
  //상품 리스트 찜하기 토글
	$(document).on('click', '.evt_good_count', function(){
            if ($(this).hasClass('active')) {
                $(this).removeClass('active');
            } else {
                $(this).addClass('active');
            }
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