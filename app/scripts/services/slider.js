/**
 * Created by yasmine on 2/28/2018.
 */

var responsiveSlider = function() {

    var slider = document.getElementById("slider");
    var sliderWidth = slider.offsetWidth;
    var slideList = document.getElementById("slideWrap");
    var count = 1;
    var items = slideList.querySelectorAll("li").length;
    var prev = document.getElementsByClassName("slider__prev")[0];
    var next = document.getElementsByClassName("slider__next")[0];

    var prevSlide = function() {
        if(count > 1) {
            count = count - 2;
            slideList.style.left = "-" + count * sliderWidth + "px";
            count++;
        }
        else if(count = 1) {
            count = items - 1;
            slideList.style.left = "-" + count * sliderWidth + "px";
            count++;
        }
    };

    var nextSlide = function() {
        if(count < items) {
            slideList.style.left = "-" + count * sliderWidth + "px";
            count++;
        }
        else if(count = items) {
            slideList.style.left = "0px";
            count = 1;
        }
    };

    next.addEventListener("click", function(event) {
        event.preventDefault();
        nextSlide();
    });

    prev.addEventListener("click", function(event) {
        event.preventDefault();
        prevSlide();
    });

};

window.onload = function() {
    responsiveSlider();
}