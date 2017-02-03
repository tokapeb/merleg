// Add automatic subject.
$('a[data-toggle="modal"]').mousedown(function() {
  $('.modal-body #subject').attr("placeholder", $(this).data("subject"));
});