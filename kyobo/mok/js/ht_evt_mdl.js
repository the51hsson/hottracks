$(function(){
    //카테고리 상품 리스트 찜하기 토글
	$(document).on('click', '.evt_good_count', function(){
		if ($(this).hasClass('active')) {
			$(this).removeClass('active');
		} else {
			$(this).addClass('active');
		}
	});
  // 오늘만 특가 스와이프(1개)
   var horDealSwiper = new CustomSwiper('.mySwiper.hotdeal', {
    slidesPerView: 'auto',
    spaceBetween: 12,
    freeMode: true,
    observer: true,
    observeParents: true,
});
   /*================================= HTR-M-EVT-MDL-002.html ==============================*/
   //2022-02-04 개발에서 진행 예정
      //앵커 메뉴 버튼 활성화 기능
    //   $('.evt_mdl2_menu').children('li').click(function(){
    //     $(this).addClass('active').siblings('li').removeClass('active');
    //  }); 
  /*================================= HTR-M-EVT-MDL-004.html ==============================*/
  //  배너 스와이프 
  $('.evt_banner_wrap .swiper-container').each(function (i, ele){
    if($(ele).find('li.swiper-slide').length > 1){
      var evtSwiperType = new CustomSwiper(this , {
              slidesPerView: 'auto',
              speed: 500,
              spaceBetween: 10,
              centeredSlides: true,
              loop: true,
              pagination: {
                el: $(ele).find('.swiper-pagination')[0],
                type : 'bullets',
              },
              navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
              },
          });
        } else {
          //이미지 한장인 경우 좌우 이동 버튼 안보이게
          $(ele).find('.swiper-button-prev').addClass('hidden');
          $(ele).find('.swiper-button-next').addClass('hidden');
      }

      $(ele).find('.play_pause_box').click(function(){
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
     //시즌 BEST 상품 배너(type_sm 140*140)
     //상품 개수 2개이하일때 ul class 설정
	$('.mySwiper_sm').each(function () {
		var $parent = $(this).parent('.module_wrap');
		if($parent.find('.swiper-slide').length > 2) {

			var  mdlEventSwiper_sm = new CustomSwiper(this, {
			  slidesPerView: 'auto',
			  spaceBetween: 16,
			  freeMode: true,
			  observer: true,
			  observeParents: true,
			}); 
		} else {
			$parent.find('.prod-wrapper').removeClass('swiper-wrapper').addClass('nonswipe');
		}
	  });
  
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
      if ($('#userComment').val().length > 0 &&  ckCheck) isActive = true;
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
    /*=================================== HTR-M-EVT-MDL-013.html =================================*/ 
    stepEvtCalc();  //하단 스텝 이미지 너비값 계산

    function stepEvtCalc(){
      var colLength = $('.evt_step_wrap').data('column');
      var wRate = 100 / colLength;

      wRate = Math.floor(wRate * 100) / 100;
      $('.evt_step_wrap').find('.step_item').css('width', wRate +'%');
    }
    /*================================= HTR-M-EVT-VIEW-015, 016.html ==============================*/  
    //스티키 샐렉트 메뉴 선택 시 해당 위치로 이동
    $(document).on('change', '.sticky_selec .common_select', function(){
       var thisTarget = $(this).children('option:selected').data('target');
       var fixedTopHeight = 150;  //header + select 높이값 

      if(!thisTarget || $(thisTarget).length == 0) return;
      var Top = $(thisTarget).offset().top - fixedTopHeight;
      $('html, body').animate({
				scrollTop: Top
			}, 200);
    });

    /*================================= HTR-M-EVT-VIEW-019.html ==============================*/  
    //댓글 입력 이미지 리스트 활성화 
    $(document).on('click', '.cmt_imgs_list .cmt_img_item', function(){
       $(this).removeClass('active_non').addClass('active').siblings('.cmt_img_item').removeClass('active').addClass('active_non');
    });
})