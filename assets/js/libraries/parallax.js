if ($(window).width() > 400 ){
  $(window).scroll(function(){
    parallax()
  });
}

function parallax(){
  var scrolled = $(window).scrollTop();
  $(".hero").css('background-position','center calc(50% - '+scrolled*0.65+'px)');
}
