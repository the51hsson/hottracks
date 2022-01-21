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
  }else{
    var eventSwiper1 = new CustomSwiper('#swapAble1', {
        slidesPerView: 'auto',
        spaceBetween: 16,
        freeMode: true,
        observer: true,
        observeParents: true,
    });
  }
  if($('#swapAble2 li').length<=2){
    $('#swapAble2 ul').removeClass('swiper-wrapper').addClass('nonswipe');
  }else{
    var eventSwiper2 = new CustomSwiper('#swapAble2', {
        slidesPerView: 'auto',
        spaceBetween: 16,
        freeMode: true,
        observer: true,
        observeParents: true,
    });
  }
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
	console.log($('.option_ul').not(thisOptionBox).length);
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
  })
   
   /*================================= HTR-M-EVT-VIEW-000.html ==============================*/  
   //이벤트 종료 블랙스크린 높이 구하기
   if(location.href.match('HTR-M-EVT-VIEW-000-1-01.html')) {
	var headerH = $('.ht_.header_wrapper').height();
	var evtMdltitleH = $('.evt_mdl_title').height();
	 $('.evt_end_dim').css('height', 'calc(100vh - '+( headerH - evtMdltitleH)+'px)');
   };   

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
  var evtSwiperType1, evtSwiperType2, evtSwiperType3;
  $('.evt_banner_wrap .swiper-container').each(function (i, ele){
    if($(ele).find('li.swiper-slide').length > 1){
      var evtSwiperType = new CustomSwiper(this , {
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
                el: $(ele).find('.swiper-pagination')[0],
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
      } else {
          $(ele).find('.option_box').addClass('hidden');
          $(ele).find('.swiper-button-prev').addClass('hidden');
          $(ele).eq(0).find('.swiper-button-next').addClass('hidden');
      }

      $(ele).find('.play_pause_box').click(function(){
        console.log($(this));
        if ( $(this).hasClass('play') ) {
            evtSwiperType.autoplay.stop();
            $(this).removeClass('play').addClass('pause');
        } else {
            evtSwiperType.autoplay.start();
            $(this).removeClass('pause').addClass('play');
        }
      });  
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
//투표 참여하기 버튼 활성화 기능(투표하기)
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
    });
       /*================================= HTR-M-EVT-MDL-010-1.html ============================*/
       //응모하기 inputNum 숫자만 입력 가능 + maxlength 적용
       var inputNums = document.querySelectorAll('.inputNum');

       for(var iNum = 0; iNum<inputNums.length; iNum++){
        inputNums[iNum].addEventListener('keyup', inpunNumCustom);
       }
       function inpunNumCustom(){
         var numCheck = /[~!@#$%^&*()_+|<>?:{}|ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;; 
         var max = this.getAttribute('maxlength');
         if(max > 0 && this.value.length > max) this.value  = this.value.slice(0, max);
         if(numCheck.test(this.value)) this.value  = this.value.replace(type, '');
       }

      //  if(document.querySelector('#evt_apply_wrap')){
      //    var applyInputs = document.querySelectorAll('.evt_apply_wrap input');
      //    for(var ckIp = 0; ckIp<applyInputs.length; ckIp++){
      //     applyInputs[ckIp].addEventListener('keyup', activeBtn);
      //    }
        
      //    function activeBtn(){
      //      var active = false;
      //      for(var ckIp = 0; ckIp<applyInputs.length; ckIp++){
      //       applyInputs[ckIp].addEventListener('keyup', activeBtn);
      //      }
      //    }
       //} 
       /*================================= HTR-M-EVT-MDL-016.html ==============================*/ 
       //셀렉트 박스 커스텀
});