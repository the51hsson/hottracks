$(function(){
  /*=================================== HTR-M-CTG-LIST-001.html ==============================*/
  /* callback 대체로 삭제
  //카테고리 리스트 스왑배너
  $('.swiper-container.ctg_top_swiper').each(function(i, ele){
      var ctgSwiper = new Swiper(this,  {
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
          el: $(ele).find('.swiper-pagination')[0],
          type: 'fraction',
          formatFractionCurrent: function (number) {
            return KyoboHottracks.mok.setPrependZero(number, 2);
          },
          formatFractionTotal: function (number) {
            return KyoboHottracks.mok.setPrependZero(number, 2);
          }
        }
    });
  })
  */

    //카테고리 리스트 하단 스왑배너
  var mdProductSwiper = new CustomSwiper('#mdProductSwiper', {
      slidesPerView: 'auto',
      spaceBetween: 16,
      freeMode: true,
      observer: true,
      observeParents: true,
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
    if($(this).hasClass('arrow_li')) { // 애로우 있는 화면 

      return; 
    }
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
   $(document).on('click', '.ctg_prod_wrap .sold_out .replace_prod_btn', function(){
     var replaceBubble = $(this).parents('li').children('article.replace_prod_swap');
    
     if(replaceBubble.length > 0 &&  replaceBubble.css('display') == 'none'){
       replaceBubble.addClass('show_bubble');
       $(window).scrollTop(replaceBubble.offset().top - 250);
     };
   });
   //품절 대체 스왑 닫기
   $(document).on('click', '.replace_prod_swap .close_swap', function(){
     $(this).parents('.replace_prod_swap').removeClass('show_bubble');
   });
   	//카테고리 상품 리스트 찜하기 토글
	$(document).on('click', '.evt_good_count', function(){
    /* 20220207(bdhan) : 개발에서 처리
		
    if ($(this).hasClass('active')) {
			$(this).removeClass('active');
		} else {
			$(this).addClass('active');
		}
    */
	});
});
//광고 배너
$(function(){
  if (!$('.wel_belt_banner').length) return;
  $('.wel_belt_banner .swiper-container').each(function (index, element) {
      var $parent = $(this).parent('.wel_belt_banner');
      $parent.addClass('idx_' + index);

      if($parent.find('.swiper-slide').length > 1) {
          var beltBannerSwiper = new CustomSwiper(this, {
              observer: true,
              observeParents: true,
              slidesPerView: 1,
              loop: true,
              loopsSlide:1,
              autoHeight: true,
              pagination: {
                  el: ('.idx_' + index + ' .swiper-pagination'),
              }
          }); 
      }
  });
});