/**
 * Created by mohsom on 16.03.2015.
 */
$(document).ready(function () {
  $('.radio-button').click(function () {
    var id = $(this).attr('id');
    $('.active-radio').removeClass('active-radio');
    $('#' + id).addClass('active-radio');
    $('.slide-active').removeClass('slide-active');
    $('[data-slide=' + id + ']').addClass('slide-active');
  });
  $('.left-arrow').click(function () {

  });
  $('.right-arrow').click(function () {
    var current = 0;
    var setSlide = function () {
      current++;
      $('.slide-active').removeClass('slide-active');
      $('.slides')[current].addClass('.slide-active');
    };
    return setSlide();
  });
});
