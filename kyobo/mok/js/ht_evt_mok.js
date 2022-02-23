$(function(){
    // 오늘만 특가 스와이프
    if($('.mySwiper.hotdeal').length == 0 ) return;
    $('.mySwiper.hotdeal').each(function(i, ele){
        var horDealSwiper = new CustomSwiper(this, {
            slidesPerView: 'auto',
            spaceBetween: 12,
            freeMode: true,
            observer: true,
            observeParents: true,
        });
    });
});
$(function(){
    //퀵메뉴 스와이프
    if ($('.evt_quick_menu_slide .swiper-container').length > 0) {
        var eventQuickSwiper = new CustomSwiper('.evt_quick_menu_slide .swiper-container', {
            slidesPerView: 'auto',
            spaceBetween: 0,
            freeMode: true,
            observer: true,
            observeParents: true,
        });
    }
    // 마감임박, 반응최고 스와이프
    //상품 개수 2개이하일때 ul class="evt_slider nonswipe"로 설정
    if ($('.swiper.mySwiper.evt').length == 0 ) return; 
    
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
});
$(function(){
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
     //상품 개수 2개이하일때 ul class "prod-wrapper nonswipe"설정
     if ($('.mySwiper_sm').length == 0) return; 

	$('.mySwiper_sm').each(function () {
        var $parent = $(this).parent('.module_wrap');

		if($parent.find('.swiper-slide').length > 2) {
			var mdlEventSwiper_sm = new CustomSwiper(this, {
                slidesPerView: 'auto',
                spaceBetween: 20,
                freeMode: true,
                observer: true,
                observeParents: true,
			}); 
		} else {
			$parent.find('.prod-wrapper').removeClass('swiper-wrapper').addClass('nonswipe');
		}
	  });
});

$(function(){
    /*================================= 셀렉트 박스 커스텀 ==============================*/
    $(document).on('click', '.selected_option', function() {
        var arrowIcon = $(this).children('.selec_icon');
        var thisOptionBox =  $(this).next('.option_ul');
        //셀렉트 박스 여러개인 경우 다른 옵션박스 닫기
        $('.option_ul').not(thisOptionBox).css('display', 'none');

        //옵션박스 나타나는 토글
        if($(this).next('.option_ul').css('display') == 'none') {
            $(this).next('.option_ul').css('display', 'block');
            $(arrowIcon).addClass('open'); 
        } else {
            $(this).next('.option_ul').css('display', 'none');
            $(arrowIcon).removeClass('open'); 
        }
    });
    //옵션 선택
    $(document).on('click', '.option_ul li', function() {
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
           !$(e.target).parent().hasClass('title_selec')) { 
                $('.option_ul').css('display', 'none');
                $('.selec_icon').removeClass('open');
        }
    }); 
   /*================================= 셀렉트 박스 커스텀 종료=================================*/

    //textarea focus
	$(document).on('focus', '.mycomment_box textarea, .comment_txt_box textarea, .byte_check_wrap textarea', function(){
		$(this).parent().addClass('active');
	});
	$(document).on('blur', '.mycomment_box textarea, .comment_txt_box textarea, .byte_check_wrap textarea', function(){
		$(this).parent().removeClass('active');
	});

    //앵커 메뉴 버튼 활성화 기능
    $('.evt_mdl2_menu').children('li').click(function(){
        $(this).addClass('active').siblings('li').removeClass('active');
    });
    //앵커 태그 부드럽게 이동
    document.querySelectorAll('.evt_mdl2_menu a[href^="#"]').forEach(function(anchor){
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
           if(this.getAttribute('href').length < 2) return ;
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    /*================================= HTR-M-EVT-VIEW-019.html ==============================*/  
    //댓글 입력 이미지 리스트 활성화 
    $(document).on('click', '.cmt_imgs_list .cmt_img_item', function(){
        $(this).removeClass('active_non').addClass('active').siblings('.cmt_img_item').removeClass('active').addClass('active_non');
     });

    /*================================= HTR-M-EVT-VIEW-000.html ==============================*/  
    //블랙스크린 높이 구하기(이벤트 종료 )
    if(location.href.match('HTR-M-EVT-VIEW-000-1')) {
        var headerH = $('.ht_.header_wrapper').height();
        var evtMdltitleH = $('.evt_mdl_title').height();
        $('.evt_end_dim').css('height', 'calc(100vh - '+( headerH - evtMdltitleH)+'px)');
    }; 

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
    /*=================================== HTR-M-EVT-MDL-013.html =================================*/ 
        if( $('.evt_step_wrap').length > 0) stepEvtCalc();  //출석 도장 이미지 너비값 계산

        function stepEvtCalc(){
            var colLength = $('.evt_step_wrap').data('column');
            var wRate = 100 / colLength;

            wRate = Math.floor(wRate * 100) / 100;
            $('.evt_step_wrap').find('.step_item').css('width', wRate +'%');
        }
})