$(function(){
  /*=================================== HTR-M-CTG-LIST-001.html ==============================*/
    //카테고리 리스트 스왑배너
    var mdProduct1 =  new CustomSwiper('#mdProduct1', {
      slidesPerView: 'auto',
      spaceBetween: 0,
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
  //상단 메뉴(1depth, 2depth, 3depth)
  $(document).on('click' , '.ctg_topMenu.depth1 a', function(){
    $(this).addClass('active').siblings('a').removeClass('active');
  });

  $(document).on('click' ,'.ctg_topMenu.depth2 a', function(){
    $(this).addClass('active').siblings('a').removeClass('active');
  });
  $(document).on('click' ,'.sub_menu_wrap .ctg_subMenu a', function(){
    $(this).addClass('active').siblings('a').removeClass('active');
  });
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
  })
 //스티키 메뉴
 $(document).on('click' , '.ctg_floating_menues li', function(e){
   if(e.target.className == 'brand_li') {
     return;
   }
  $(this).addClass('active').siblings('li').removeClass('active');
});

});
//
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
              loopsSlide:1,
              autoHeight: true,
              pagination: {
                  el: ('.idx_' + index + ' .swiper-pagination'),
              }
          }); 
      }
});
});