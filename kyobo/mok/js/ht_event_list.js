$(function(){
  /*================================= HTR-M-EVT-LIST-000.html ==============================*/
  //퀵메뉴 스와이프
  var eventQuickSwiper = new CustomSwiper('.evt_quick_menu_slide .swiper-container', {
    slidesPerView: 'auto',
    spaceBetween: 24,
    freeMode: true,
    observer: true,
    observeParents: true,
  });

  // 마감임박, 반응최고 스와이프
  //상품 개수 2개이하일때 ul class="evt_slider nonswipe"로 설정
 $('.swiper.mySwiper.evt').each(function(i, ele){
    if($(ele).find('li').length > 2){
      var eventSwiper = new CustomSwiper(this, {
        slidesPerView: 'auto',
        spaceBetween: 16,
        freeMode: true,
        observer: true,
        observeParents: true,
    });
    }else{
      $(ele).find('.swiper-wrapper').removeClass('swiper-wrapper').addClass('nonswipe');
  
    }
 });

//    //품절 대체 상품 스왑배너
//    $('.swiper.mySwiper').each(function (i, ele) {
//     if($parent.find('.swiper-slide').length > 1) {
//         var replaceSwiper = new CustomSwiper(this, {
//           slidesPerView: 'auto',
//           spaceBetween: 16,
//           freeMode: true,
//           observer: true,
//           observeParents: true,
//         }); 
//     }
// });
   // 오늘만 특가 스와이프(1개)
   var horDealSwiper = new CustomSwiper('.mySwiper.hotdeal', {
      slidesPerView: 'auto',
      spaceBetween: 12,
      freeMode: true,
      observer: true,
      observeParents: true,
  });

  //스크롤 애니메이션
  if(document.querySelector('.evt_slider_wrap.deadline_section .deadline_bubble')){
    window.addEventListener('scroll', promotionEffect);
    //마감임박 말풍선
    promotionEffect();
  }

  function promotionEffect(){ //마감임박 말풍선
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
    var topMenuHeight = $('.evt_quick_menu_slide').height();
    isShow = offsetTop - headerHeight - topMenuHeight - 200 < scrolltop;

    return isShow; 
  }
  $('.evt_quick_menu_slide .swiper-slide').on('click',function(){
			$(this).addClass('active').siblings('div').removeClass('active');
      var imgEa = $('.evt_quick_menu_slide .swiper-slide').length;
      for(var i=0; i<imgEa; i++){
        $('.evt_quick_menu_slide .swiper-slide').eq(i).find('img')
        .attr('src','../../images/guide/ico_evt_quick_0'+(i+1)+'.svg');
      }
      var origin_src = $(this).find('img').attr('src').split('.svg')[0];
      $(this).find('img').attr('src', origin_src+'_active.svg');
  });

  //셀렉트 박스 커스텀
  $(document).on('click', '.selected_option', function(){
	var arrowIcon = $(this).children('.selec_icon');
	var thisOptionBox =  $(this).next('.option_ul');
	//셀렉트 박스 여러개인 경우 다른 옵션박스 닫기
	$('.option_ul').not(thisOptionBox).css('display', 'none');

	  //옵션박스 나타나는 토글
    if($(this).next('.option_ul').css('display') == 'none'){
      $(this).next('.option_ul').css('display', 'block');
	  $(arrowIcon).addClass('open'); 
    }else{
	  $(this).next('.option_ul').css('display', 'none');
	  $(arrowIcon).removeClass('open'); 
	}
  });

  //옵션 선택
  $(document).on('click', '.option_ul li', function(){
		var select = $(this).parent().prev('.selected_option').find('em').eq(0);
		var arrowIcon  =  $(this).parent().prev('.selected_option').find('.selec_icon');
		var thisVal = $(this).attr('data-val');
		var thisTxt = $(this).text();
     	 select.text(thisTxt).attr('data-val', thisVal);
		 //화살표 에니메이션 
		 $(arrowIcon).addClass('open'); 
	    //옵션 박스 닫기
	  	$(this).parent().css('display', 'none');
		$(arrowIcon).removeClass('open'); 
  });
  //바디 영역 선택시 셀렉트 닫기
  $(document).on('click', function(e){
	  if(!$(e.target).parent().hasClass('option_ul') &&
	     !$(e.target).parent().hasClass('selected_option') &&
	     !$(e.target).parent().hasClass('title_selec')
	    ){ 
		  $('.option_ul').css('display', 'none');
		  $('.selec_icon').removeClass('open');
	  };
  }); 
   /*================================= HTR-M-EVT-VIEW-000.html ==============================*/  
   //이벤트 종료 블랙스크린 높이 구하기
   if(location.href.match('HTR-M-EVT-VIEW-000-1-01.html')) {
	var headerH = $('.ht_.header_wrapper').height();
	var evtMdltitleH = $('.evt_mdl_title').height();
	 $('.evt_end_dim').css('height', 'calc(100vh - '+( headerH - evtMdltitleH)+'px)');
   };   

   //앵커 메뉴 버튼 활성화 기능
   $('.evt_mdl2_menu.anchor').children('li').click(function(){
      $(this).addClass('active').siblings('li').removeClass('active');
   });
   //앵커 태그 부드럽게 이동
   document.querySelectorAll('.evt_mdl2_menu a[href^="#"]').forEach(function(anchor){
      anchor.addEventListener('click', function (e) {
          e.preventDefault();
          document.querySelector(this.getAttribute('href')).scrollIntoView({
              behavior: 'smooth'
          });
      });
  });
});