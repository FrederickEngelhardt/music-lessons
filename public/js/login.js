$(document).ready(() => {
  $('.enterbutton').on('submit', () => {
    event.preventDefault()

    const email_address = $('#email').val().trim()
    const password = $('#password').val()

    if (!email) {
      return Materialize.toast('Email must not be blank', 3000);
    }

    if (!password) {
      return Materialize.toast('Password must not be blank', 3000);
    }
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
      .fail(($xhr) => {
        Materialize.toast('Invalid')
      })
  })
})
