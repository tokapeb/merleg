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

$(function() {

  // Get the form.
  var form = $('#contactForm');

  // Get the messages div.
  var formMessages = $('.msg-message');

  $(form).addClass('cica');

  $(form).submit(function(e) {
    // Stop the browser from submitting the form.
    e.preventDefault();

    // Serialize the form data.
    var formData = $(form).serialize();

    // Submit the form using AJAX.
    $.ajax({
      type: 'POST',
      url: $(form).attr('action'),
      data: formData
    })
        .done(function(response) {
          if (response == 'Az üzenetet sikeresen elküldtük') {
            // Make sure that the formMessages div has the 'success' class.
            $(formMessages).removeClass('bg-danger');
            $(formMessages).addClass('bg-success');

            // Set the message text.
            $(formMessages).text(response);

            // Clear the form.
            $('#first_name, #subject, #email, #phone, #address, #comments').val('');
          } else {
            // Make sure that the formMessages div has the 'error' class.
            $(formMessages).removeClass('bg-success');
            $(formMessages).addClass('bg-danger');

            // Set the message text.
            if (response !== '') {
              $(formMessages).text(response);
            } else {
              $(formMessages).text('Hiba történt az üzenet elküldése közben, kérjük próbálja meg később.');
            }
          }

        })
        .fail(function(data) {
          // Make sure that the formMessages div has the 'error' class.
          $(formMessages).removeClass('bg-success');
          $(formMessages).addClass('bg-danger');

          // Set the message text.
          if (data.responseText !== '') {
            $(formMessages).text(data.responseText);
          } else {
            $(formMessages).text('Hiba történt az üzenet elküldése közben, kérjük próbálja meg később.');
          }
        });

  });
});
