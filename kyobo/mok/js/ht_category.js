$(function(){
  /*=================================== HTR-M-CTG-LIST-001.html ==============================*/
    //카테고리 리스트 스왑배너
    var mdProduct1 =  new CustomSwiper('#mdProduct1', {
      slidesPerView: 'auto',
      spaceBetween: 19,
      freeMode: true,
      observer: true,
      observeParents: true,
  });
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
          var beltBannerSwiper = new CustomSwiper(this, {
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

 //3depth 토글 버튼
  $(document).on('click', '.sub_menu_wrap .subMenu_btn', function(){
    $('.sub_menu_wrap .ctg_subMenu').addClass('menuDown');
    $(this).addClass('menuDown');
  });
  $(document).on('click', '.sub_menu_wrap .subMenu_btn.menuDown', function(){
    $('.sub_menu_wrap .ctg_subMenu').removeClass('menuDown');
    $(this).removeClass('menuDown');
  });

  $(document).on('click', '.md_tab div', function(){
    $(this).addClass('active').siblings('div').removeClass('active');
  });

  //스티키 메뉴
  $(document).on('click' , '.ctg_floating_menues li', function(){
    if($(this).hasClass('brand_li')) { // 브랜드 보기 슬라이딩업
      showBrandList();
      return; 
    }
    $(this).addClass('active').siblings('li').removeClass('active');
  });

  //스티키 메뉴 브랜드 메뉴 클릭
  function  showBrandList(){
    
  }
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
   })
});

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