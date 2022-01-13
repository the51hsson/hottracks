$(function(){

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
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
});
  var eventSwiper2 = new CustomSwiper('#swapAble2', {
      slidesPerView: 'auto',
      spaceBetween: 16,
      freeMode: true,
      observer: true,
      observeParents: true,
      pagination: {
          el: ".swiper-pagination",
          clickable: true,
      },
  });
   // 오늘만 특가 스와이프
   var horDealSwiper = new CustomSwiper('.mySwiper.hotdeal', {
      slidesPerView: 'auto',
      spaceBetween: 12,
      freeMode: true,
      observer: true,
      observeParents: true,
      pagination: {
          el: ".swiper-pagination",
          clickable: true,
      },
  });
  //스크롤 처리
    //var prevScroll = $(window).scrollTop();
    //var currentScroll = 0;

    window.addEventListener('scroll', promotionEffect);
    window.addEventListener('resize', promotionEffect);

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
    var deviceHeight = $(window).height();
    var deviceWidth = $(window).width();
    var elemHeight = $(item).height();
    var focusTop = $(item).offset().top;
    // var scrollDown;       //스크롤 올림 또는 내림 컨트롤 변수
    // currentScroll = $(window).scrollTop();
    // scrollDown = (currentScroll > prevScroll  ) ? true : false; 
    // prevScroll = currentScroll;
    isShow = (focusTop + elemHeight - deviceHeight - headerHeight - deviceWidth*0.05 < scrolltop) &&
             (focusTop + elemHeight - deviceHeight - headerHeight - deviceWidth*1.05 < scrolltop) ;

    return isShow; 
  }
})