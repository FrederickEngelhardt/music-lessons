$(document).ready(function() {
  $('#loginScreenButton').on('click', (event) => {
    event.preventDefault()
    const email_address = $('#email').val()
    const password = $('#password').val()

    const options = {
      contentType: 'application/json',
      data: JSON.stringify({ email_address, password }),
      dataType: 'json',
      type: 'POST',
      url: '/token'
    };
    $.ajax(options)
      .done(() => {
        window.location.href = '/home.html'
      })
      .fail($xhr => {
        Materialize.toast($xhr.responseText, 3000)
      })
  })
})
