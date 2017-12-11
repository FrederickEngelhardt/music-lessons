$(document).ready(() => {
  $('#loginForm').on('submit', (event) => {
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
      .fail(($xhr) => {
        Materialize.toast('Invalid input', 3000)
      })

  })
})


// (function() {
//   $('#loginForm').submit((event) => {
//     event.preventDefault()
//
//     const email_address = $('#email').val()
//     const password = $('#password').val()
//     console.log(email_address);
//     console.log(password);
//
//     if (!email_address) {
//       return Materialize.toast('Email must not be blank', 3000);
//     }
//
//     if (!password) {
//       return Materialize.toast('Password must not be blank', 3000);
//     }
//     const options = {
//       headers : {
//            'Accept' : 'application/json',
//            'Content-Type' : 'application/json'
//        },
//       data: JSON.stringify({ email_address, password }),
//       dataType: 'json',
//       type: 'POST',
//       url: '/token'
//     };
//     $.ajax(options)
//       .done(() => {
//         window.location.href = '/home.html'
//       })
//       .fail(($xhr) => {
//         Materialize.toast('Invalid', 3000)
//       })
//   })
// })()
// $(document).ready(()=>{
//   $('.modal').modal();
// })
