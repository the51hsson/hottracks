/*
 * name : glim.js
 * desc : 퍼블리싱 현황판
 * writer : glim han
 * date : 2020/02/13
 * last : 2020/02/13
 *
*/

$(document).ready(function(){
    ia.init();
});


function funcIAMenuDropdown (){
    $('.ia_header_guide_mobile').toggleClass('is_visible');
}

var ia = {
    init : function(){
        var _this = this;
        var _color= $('body').data('theme-color');
        $('.ia_header_wrapper').css('background-color', _color);
        $('.ia_header_wrapper > .ia_section').append('<ul class="js_cate_group"></ul>');


        $('.ia_section_list').each(function(i){
            var file = $(this).data('file');
            var color = $(this).data('color');
            var graphHtml =
                '<li>'
                +'	<a href="#gIA'+i+'">'
                +'		<span class="tit"><!-- 자동입력 --></span>'
                +'		<span class="bar" data-color="'+_color+'"><span class="active"></span></span>'
                +'		<span class="pages"><em class="graph_complete"></em>/<em class="graph_total"></em></span>'
                +'	</a>'
                +'</li>';

            var cateHtml =
                '<li>'
                +'	<a href="#gIA'+i+'">'+ i +"-" + $(this).find('.ia_h2 > a').text()
                +'	</a>'
                +'</li>';

            $(this).attr('id', 'gIA'+i);
            $('.ia_graph .graph').append(graphHtml);

            _this.cal('#gIA'+i, i);

            $('.js_cate_group').append(cateHtml);
            $('.ia_content_body').css('padding-top', $('.ia_header_wrapper').outerHeight());
            $('.ia_content_body .ia_section_list').css('padding-top', $('.ia_header_wrapper').outerHeight());


        }).promise().done(function () {

            //console.log ( 'len',  $('.ia_tbl_wrap').find('.row_done_new').length );
            $(".ia_total_legend .c_total .value").text ($('.ia_tbl_wrap').find('tbody > tr').length);
            $(".ia_total_legend .c_done .value").text ($('.ia_tbl_wrap').find('.row_done').length + $('.ia_tbl_wrap').find('.row_done_new').length + $('.ia_tbl_wrap').find('.row_done_update').length );
            $(".ia_total_legend .c_done_new .value").text ($('.ia_tbl_wrap').find('.row_done_new').length);
            $(".ia_total_legend .c_done_update .value").text ($('.ia_tbl_wrap').find('.row_done_update').length);

            $('.ia_section_header').on('click', function(){
                $(this).parents('.ia_section').toggleClass('is_hide');
            })
        });


    },
    cal : function(obj, idx){


        var lastUpdateDate = String(findLastUpdateDate(obj));//날짜중 최종완료날짜 찾아옴
        //console.log(lastUpdateDate);
        var today = lastUpdateDate.substr(0, 2) + '-' + lastUpdateDate.substr(2,2)+ '-' + lastUpdateDate.substr(4,2);

        $(obj).find('td.col_complete').each(function(n){

            var text = $(this).text();
            var completedd = $(this).siblings('.col_date').text().toString();
            //완료,수정날짜있는경우 마지막날짜로 체크
            var lastdate = (completedd.indexOf('/')==-1) ? completedd.trim():completedd.toString().split('/')[1].trim();
            //console.log(lastdate, today);
            if ( (completedd.indexOf('/') == -1) && text == "완료" && lastdate == today.toString()){
                $(this).parent('tr').addClass('row_done_new');//노란색
            }else if ( (completedd.indexOf('/') != -1) && lastdate == today.toString()){
                $(this).parent('tr').addClass('row_done_update');//초록색
                $(this).text('수정');
            }else if ( text == "완료" ){
                $(this).parent('tr').addClass('row_done');//하늘색
            }else if ( text == "삭제" ){
                $(this).parent('tr').addClass('row_del');//
                $(this).parent('tr').find('.col_memo').empty();
            }
        })

        //console.log(lastUpdateDate, today);

        //계산
        var cal_total = $(obj).find('.ia_tbl_wrap tbody > tr').length;//총페이지갯수
        var cal_complete = $(obj).find('.row_done , .row_done_update, .row_done_new, .row_del').length;//완료페이지
        var cal_process = Math.round((cal_complete/cal_total)*100);

        var new_len = $(obj).find('.row_done_new').length;
        var update_len = $(obj).find('.row_done_update').length;
        var cal_total_txt = (new_len == 0 ) ? cal_total : cal_total +'<span class="ico_new">New('+new_len+')</span>';
        cal_total_txt = (update_len == 0 ) ? cal_total_txt : cal_total_txt +'<span class="ico_update">Update('+update_len+')</span>';


        //그래프
        var graph = $('.ia_graph a[href="'+obj+'"]');
        var graph_tit = $(graph).find('.tit');
        var graph_total = $(graph).find('.graph_total');
        var graph_complete = $(graph).find('.graph_complete');
        var graph_process = $(graph).find('.bar');
        var graph_active = $(graph).find('.bar .active');
        graph_total.html(cal_total_txt);
        graph_complete.html(cal_complete);
        graph_process.attr('data-process', cal_process+'%');
        graph_active.css({backgroundColor:graph_process.data('color'), width:cal_process+'%'});

        //범례
        var legend_total = $(obj).find('.legend_total');
        var legend_complete = $(obj).find('.legend_complete');
        var legend_process = $(obj).find('.legend_process');
        legend_total.text(cal_total);
        legend_complete.text(cal_complete);
        if (cal_complete > 0){legend_process.text(cal_process+'%')}
        else {legend_process.text('0%')}

        //리스트
        var ia_num = $(obj).find('.col_num');
        graph_tit.html(ia_tit);

        //넘버링
        for (var i=0;i < cal_total;i++){
            ia_num.eq(i).text(i+1);
        }

        /*20190516 update*/
        //리스트
        var ia_tit = $(obj).find('.ia_h2 > a').text();
        $(obj).find('.ia_h2 > a').text('#' + idx + " " + ia_tit);
        graph_tit.html('#' + idx + " " + ia_tit);

        $(".ia_total_legend .c_last_date .value").text (lastUpdateDate);

        $(obj).find("button.btn_memo").each(function() {
            if ( $(this).closest("tr").hasClass("row_done_new") || $(this).closest("tr").hasClass("row_done_update") ){
                $(this).closest('tr').find(".col_memo").toggleClass("active");
            };
            $(this).click(function() {
                $(this).closest('tr').find(".col_memo").toggleClass("active");
                return false;
            });
        });

        $(obj).find('.btn_memo_all').click(function() {
            if ( $(this).parents('table').find(".col_memo.active").length > 0 ){
                $(this).parents('table').find(".col_memo").removeClass("active");
            }else{
                $(this).parents('table').find(".col_memo").addClass("active");
            }

        });

    }
};


function numReturnToZero (a){
    if (a < 10) {
        a = '0' + a;
    }
    return a;
}
function findLastUpdateDate (obj){

    var maxdd = 0;
    var lastdate=0;
    $('td.col_date').each(function(n){
        var completedd = $(this).text().split('-').join("").trim();
        completedd = completedd.replace(/ /gi, "");
        lastdate = (completedd.indexOf('/')==-1) ? Number(completedd):Number(completedd.toString().split('/')[1]);
        lastdate = (lastdate.toString().length > 6) ? Number(lastdate.toString().substring(6,6)):lastdate;//20200313 case add
        maxdd = Math.max(lastdate, maxdd);
        //console.log ("---------------", lastdate, completedd, maxdd);
    });
    //console.log ( "--------------------recent----",  maxdd );
    return maxdd;

}

function trim(x) {
    return x.replace(/^\s+|\s+$/gm,'');
}
