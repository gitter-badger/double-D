/**
 * Created by mohsom on 16.03.2015.
 */
$(document).ready(function () {
  var currentSlide=1;
  $('.radio-button').click(function () {
    var id = $(this).attr('id');
    $('.active-radio').removeClass('active-radio');
    $('#' + id).addClass('active-radio');
    $('.slide-active').removeClass('slide-active');
    $('[data-slide=' + id + ']').addClass('slide-active');
  });
  $('.left-arrow').click(function () {
    currentSlide--;
    if(currentSlide<1) {
      currentSlide = 4;
    }
    $('.slide-active').removeClass('slide-active');
    $('#slide'+currentSlide).addClass('slide-active');
    $('.active-radio').removeClass('active-radio');
    $('#radio-slide'+currentSlide).addClass('active-radio');
  });
  $('.right-arrow').click(function () {
      currentSlide++;
      if(currentSlide>4) {
        currentSlide = 1;
      }
      $('.slide-active').removeClass('slide-active');
      $('#slide'+currentSlide).addClass('slide-active');
      $('.active-radio').removeClass('active-radio');
      $('#radio-slide'+currentSlide).addClass('active-radio');
  });
});
