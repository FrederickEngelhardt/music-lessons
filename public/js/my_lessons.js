$(document).ready(() => {
  $.get('/token', result => {
    const id = result.cookie.user_id
    $.get('/lessons').done(result => {
      result.forEach(data => {
        const client = data.user_client_id

        if (client === id) {
          $.get(`/users/${id}`, user => {
            $('tbody').append('<tr><td>' + user.first_name + '</td><td>' + data.date_time + '</td><td>' + data.location + '</td><td>' + data.cost + '</td></tr>' )
          })
        }
      })
    })
  })
  $('.modal').modal();
  $('.button-collapse').sideNav({
      menuWidth: 300, // Default is 300
      edge: 'right', // Choose the horizontal origin
      closeOnClick: true, // Closes side-nav on <a> clicks, useful for Angular/Meteor
      draggable: true,
      // onOpen: function(el) {}
      // onClose: function(el) {}
    })
})
