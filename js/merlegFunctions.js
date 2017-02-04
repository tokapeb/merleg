// Add automatic subject.
$('a[data-toggle="modal"]').mousedown(function() {
//  $('.modal-body #subject').attr("placeholder", $(this).data("subject"));
  $('.modal-body #subject').attr("value", $(this).data("subject"));
});

$("a[href='#top']").click(function() {
  $("html, body").animate({ scrollTop: 0 }, "slow");
  return false;
});

$('#topbutton').hide();

var entryheight = $('.highlighted').height();

$(document).scroll(function () {
  var y = $(this).scrollTop();
  if (y > entryheight) {
    $('#topbutton').fadeIn();
  } else {
    $('#topbutton').fadeOut();
  }
});