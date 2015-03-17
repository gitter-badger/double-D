/**
 * Created by mohsom on 16.03.2015.
 */
$(document).ready(function () {
  var currentSlide=1;
  var INTERVAL;
  $('.radio-button').click(function () {
    var id = $(this).attr('id');
    var num=$(this).attr('set-data-slide');
    currentSlide=num;
    $('.active-radio').removeClass('active-radio');
    $('#' + id).addClass('active-radio');
    $('.slide-active').removeClass('slide-active');
    $('[data-slide=' + id + ']').addClass('slide-active');
    deleteInterval();
    interval();
  });
  $('.left-arrow').click(function () {
    prevSlide();
  });
  $('.right-arrow').click(function () {
    nextSlide();
  });
  var prevSlide=function(){
    currentSlide--;
    if(currentSlide<1) {
      currentSlide = 4;
    }
    $('.slide-active').removeClass('slide-active');
    $('#slide'+currentSlide).addClass('slide-active');
    $('.active-radio').removeClass('active-radio');
    $('#radio-slide'+currentSlide).addClass('active-radio');
  };
  var nextSlide=function(){
    currentSlide++;
    if(currentSlide>4) {
      currentSlide = 1;
    }
    $('.slide-active').removeClass('slide-active');
    $('#slide'+currentSlide).addClass('slide-active');
    $('.active-radio').removeClass('active-radio');
    $('#radio-slide'+currentSlide).addClass('active-radio');
  };
  var interval=function(){
    INTERVAL=setInterval(nextSlide,10000);
  };
  var deleteInterval=function(){
    clearInterval(INTERVAL);
  };
  interval();
});
