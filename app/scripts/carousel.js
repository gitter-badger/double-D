/**
 * Created by mohsom on 16.03.2015.
 */
$(document).ready(function(){
     $('.radio-button').click(function(){
        var id=$(this).attr('id');
        $('.active-radio').removeClass('active-radio');
        $('#'+id).addClass('active-radio');
     });
});
