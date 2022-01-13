$(function(){

  var eventQuickSwiper = new CustomSwiper('.evt_quick_menu_slide .swiper-container', {
    slidesPerView: 'auto',
    spaceBetween: 24,
    freeMode: true,
    observer: true,
    observeParents: true,
  });
  // 마감임박, 반응최고 스와이프
  //상품 개수 2개이하일때 ul class="evt_slider nonswipe"로 설정

  if($('#swapAble1 li').length<=2){
    $('#swapAble1 ul').removeClass('swiper-wrapper').addClass('nonswipe');
  }
  if($('#swapAble2 li').length<=2){
    $('#swapAble2 ul').removeClass('swiper-wrapper').addClass('nonswipe');
  }
  var eventSwiper1 = new CustomSwiper('#swapAble1', {
    slidesPerView: 'auto',
    spaceBetween: 16,
    freeMode: true,
    observer: true,
    observeParents: true,
});
  var eventSwiper2 = new CustomSwiper('#swapAble2', {
      slidesPerView: 'auto',
      spaceBetween: 16,
      freeMode: true,
      observer: true,
      observeParents: true,
  });
   // 오늘만 특가 스와이프
   var horDealSwiper = new CustomSwiper('.mySwiper.hotdeal', {
      slidesPerView: 'auto',
      spaceBetween: 12,
      freeMode: true,
      observer: true,
      observeParents: true,
  });
  //스크롤 처리
    //var prevScroll = $(window).scrollTop();
    //var currentScroll = 0;

    window.addEventListener('scroll', promotionEffect);
    // window.addEventListener('resize', promotionEffect);

  function promotionEffect(){
    if(bubbleHighlight('.deadline_section')){
      $('.deadline_character_area').fadeIn(200);
    }else{
      $('.deadline_character_area').fadeOut();
    }
  } 
  function bubbleHighlight(item){
    var isShow
    var headerHeight = $('#headerWrapper').height();
    var scrolltop  = $(window).scrollTop();
    var offsetTop = $(item).offset().top;
    isShow = offsetTop - headerHeight - 200 < scrolltop

    return isShow; 
  }

  $('.evt_quick_menu_slide .swiper-slide').on('click',function(){
			$(this).addClass('active').siblings('div').removeClass('active');
  });

});