




// Tab

function curProdSwiper(){
    var $target = $('.cur_prod_img');
    $target.each(function (index, element) {
        var $parent = $(this);
        $parent.addClass('pagn_idx_' + index);
        
        var slideOption = {
            slidesPerView: 'auto',
            spaceBetween:0,
            freeMode: true,
            observer: true,
            observeParents: true,
            speed:300,
        };

        if($parent.find('.swiper-slide').length > 1) {
            curProdSwiperCont = new Swiper(this, slideOption);
        }
	});



}

$(function(){
    if(!$('.cur_prod_img').length) return;
    curProdSwiper();
});



















function scrollEvent2() {
    let images = document.querySelectorAll(".image");
    let imgStack = [0, 0];
    let colWidth = 100;
    for(let i = 0; i < images.length; i++) {
        let minIndex = imgStack.indexOf(Math.min.apply(0, imgStack));
        let x = colWidth * minIndex;
        let y = imgStack[minIndex];
        imgStack[minIndex] += (images[i].children[0].height + 20);
        images[i].style.transform = `translateX(${x}%) translateY(${y}px)`;
        if(i === images.length - 1) {
            document.querySelector(".images").style.height = `${Math.max.apply(0, imgStack)}px`;
        }
    }
}

window.onload = function(){
    scrollEvent2();  
}
$(window).resize(function() {
    scrollEvent2();  
});
