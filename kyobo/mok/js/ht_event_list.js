$(function(){
  /*================================= HTR-M-EVT-LIST-000.html ==============================*/
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

  //스크롤 애니메이션(마감임박 말풍선)

  if(document.querySelector('.evt_slider_wrap.deadline_section .deadline_bubble')){
    window.addEventListener('scroll', promotionEffect);
    promotionEffect();
  }

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
    var topMenuHeight = $('.evt_quick_menu_slide').height();
    isShow = offsetTop - headerHeight - topMenuHeight - 200 < scrolltop

    return isShow; 
  }

  $('.evt_quick_menu_slide .swiper-slide').on('click',function(){
			$(this).addClass('active').siblings('div').removeClass('active');
  }); 

   /*================================= HTR-M-EVT-MDL-002.html ==============================*/  
   //앵커 메뉴 버튼 활성화 기능
   $('.evt_mdl2_menu.anchor').children('li').click(function(){
      $(this).addClass('active').siblings('li').removeClass('active');;
   });
  //  //앵커 태그 부드럽게 이동
  //  document.querySelectorAll('.evt_mdl2_menu a[href^="#"]').forEach(function(anchor){
  //     anchor.addEventListener('click', function (e) {
  //         e.preventDefault();
  //         document.querySelector(this.getAttribute('href')).scrollIntoView({
  //             behavior: 'smooth'
  //         });
  //     });
  // });

  /*================================= HTR-M-EVT-MDL-004.html ==============================*/
  //  배너 스와이프 (3타입으로 세번 반복 적용)
  // TODO 최종 1타입의 배너만 사용되므로 2가지는 삭제 해야됨 
  var evtSwiperType1, evtSwiperType2, evtSwiperType3;
  if($('.evt_banner_wrap').eq(0).find('li.swiper-slide').length > 1){
    evtSwiperType1 = new CustomSwiper('.evt_banner_wrap:nth-of-type(1) .swiper-container', {
          slidesPerView: 'auto',
          speed: 500,
          spaceBetween: 10,
          centeredSlides: true,
              loop: true,
              loopsSlide:1,
              autoplay: {
                  delay: 5000,
                  disableOnInteraction: false,
                },
          pagination: {
            el: $('.evt_banner_wrap').find('.swiper-pagination')[0],
            type: 'fraction',
            formatFractionCurrent: function (number) {
              return KyoboHottracks.mok.setPrependZero(number, 2);
            },
            formatFractionTotal: function (number) {
              return KyoboHottracks.mok.setPrependZero(number, 2);
            },
          },
          navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          },
    });
  }else{
    $('.evt_banner_wrap').eq(0).find('.option_box').addClass('hidden');
    $('.evt_banner_wrap').eq(0).find('.swiper-button-prev').addClass('hidden');
    $('.evt_banner_wrap').eq(0).find('.swiper-button-next').addClass('hidden');
  }
    $('.evt_banner_wrap').eq(0).find('.play_pause_box').click(function(){
      if ( $(this).hasClass('play') ) {
          evtSwiperType1.autoplay.stop();
          $(this).removeClass('play').addClass('pause');
      } else {
          evtSwiperType1.autoplay.start();
          $(this).removeClass('pause').addClass('play');
      }
  });
    /*===이하 삭제 가능(두번째 배너 소스)===*/
    if($('.evt_banner_wrap').eq(1).find('li.swiper-slide').length > 1){
      evtSwiperType2 = new CustomSwiper('.evt_banner_wrap:nth-of-type(2) .swiper-container', {
            slidesPerView: 'auto',
            speed: 500,
            spaceBetween: 10,
            centeredSlides: true,
                loop: true,
                loopsSlide:1,
                autoplay: {
                    delay: 5000,
                    disableOnInteraction: false,
                  },
            pagination: {
              el: $('.evt_banner_wrap').find('.swiper-pagination')[1],
              type: 'fraction',
              formatFractionCurrent: function (number) {
                return KyoboHottracks.mok.setPrependZero(number, 2);
              },
              formatFractionTotal: function (number) {
                return KyoboHottracks.mok.setPrependZero(number, 2);
              },
            },
            navigation: {
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            }
      });
    }else{
      $('.evt_banner_wrap').eq(1).find('.option_box').addClass('hidden')
      $('.evt_banner_wrap').eq(1).find('.swiper-button-next').addClass('hidden');
      $('.evt_banner_wrap').eq(1).find('.swiper-button-prev').addClass('hidden');
    }
    $('.evt_banner_wrap').eq(1).find('.play_pause_box').click(function(){
      if ( $(this).hasClass('play') ) {
          evtSwiperType2.autoplay.stop();
          $(this).removeClass('play').addClass('pause');
      } else {
          evtSwiperType2.autoplay.start();
          $(this).removeClass('pause').addClass('play');
      }
    });
  /*===이하 삭제 가능(세번째 배너 소스)===*/
  if($('.evt_banner_wrap').eq(2).find('li.swiper-slide').length > 1){
  evtSwiperType3 = new CustomSwiper('.evt_banner_wrap:nth-of-type(3) .swiper-container', {
        slidesPerView: 'auto',
        speed: 500,
        spaceBetween: 10,
        centeredSlides: true,
            loop: true,
            loopsSlide:1,
            autoplay: {
                delay: 5000,
                disableOnInteraction: false,
              },
        pagination: {
          el: $('.evt_banner_wrap').find('.swiper-pagination')[2],
          type: 'fraction',
          formatFractionCurrent: function (number) {
            return KyoboHottracks.mok.setPrependZero(number, 2);
          },
          formatFractionTotal: function (number) {
            return KyoboHottracks.mok.setPrependZero(number, 2);
          },
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }
  });
  }else{
      $('.evt_banner_wrap').eq(2).find('.option_box').addClass('hidden')
      $('.evt_banner_wrap').eq(2).find('.swiper-button-next').addClass('hidden');
      $('.evt_banner_wrap').eq(2).find('.swiper-button-prev').addClass('hidden');
    }

  $('.evt_banner_wrap').eq(2).find('.play_pause_box').click(function(){
    if ( $(this).hasClass('play') ) {
         evtSwiperType3.autoplay.stop();
        $(this).removeClass('play').addClass('pause');
    } else {
         evtSwiperType3.autoplay.start();
        $(this).removeClass('pause').addClass('play');
    }
  });
  /*================================= HTR-M-EVT-MDL-007.html ==============================*/  
     //시즌 BEST 상품 배너
    //상품 개수 2개이하일때 ul class 설정
    if($('#mdl7swapAble1 li').length <= 2){
      $('#mdl7swapAble1 ul').removeClass('swiper-wrapper').addClass('nonswipe');
    }else{
      var mdl7EventSwiper1 =  new CustomSwiper('#mdl7swapAble1', {
        slidesPerView: 'auto',
        spaceBetween: 0,
        freeMode: true,
        observer: true,
        observeParents: true,
    });
    }
    if($('#mdl7swapAble2 li').length <= 2){
      $('#mdl7swapAble2 ul').removeClass('swiper-wrapper').addClass('nonswipe');
    }else{
      var mdl7EventSwiper2 =  new CustomSwiper('#mdl7swapAble2', {
        slidesPerView: 'auto',
        spaceBetween: 0,
        freeMode: true,
        observer: true,
        observeParents: true,
    });
    }


  /*================================= HTR-M-EVT-MDL-009-3.html ==============================*/  
//투표 참여하기 버튼 활성화 기능
  $(document).on('click', '.evt_mdl9_pop_wrap .evt_vote_list input', voteActive);
  $('#userComment').keyup(voteActive);

  function voteActive(e){
      if(voteActiveCheck(e)){
        $('#evtVoteBtn').removeClass('disabled');
      }else{
        $('#evtVoteBtn').addClass('disabled');
      }
  }

    function voteActiveCheck(e){
      var ckInputs = $('.evt_mdl9_pop_wrap .evt_vote_list input');
      var ckLength = ckInputs.length;
      var isActive = false;
      var ckCheck = false;
      if(e && e.target.id == 'userComment') countCommentEA(e);

      for(var i=0; i<ckLength; i++){
      if(ckInputs.eq(i).is(':checked')) {
        ckCheck = true;
        break;
      }
      }
      if($('#userComment').val().length > 0 &&  ckCheck) isActive = true;
      else isActive = false;
      return isActive;
    }
    //댓글 입력 글자수 카운팅
    function countCommentEA(e){
      var length = $('#userComment').val().length;
      if(length>300) {
        e.preventDefault();
        $('#userComment').val($('#userComment').val().substring(0, 300));
        return;
      }

      $(commentEA).text(length);
    }
    //투표 참여 닫기 버튼 클릭 시 사용자 작성 내용 초기화
    $('#votePopClose').click(function(){
      var ckInputs = $('.evt_mdl9_pop_wrap .evt_vote_list input');
      var ckLength = ckInputs.length;

      for(var i=0; i<ckLength; i++){
        ckInputs.eq(i).prop('checked', false);
      }
      $('#userComment').val('');
    })
});