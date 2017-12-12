$(document).ready(() => {
  $.get('/token', result => {
    const id = result.cookie.user_id
    $.get('/lessons', ([data]) => {
      const client = data.user_client_id

      if (client === id) {
        $.get(`/users/${id}`, user => {
          $('tbody').append('<tr><td>' + user.first_name + '</td><td>' + data.date_time + '</td><td>' + data.location + '</td><td>' + data.cost + '</td></tr>' )
        })
      }
    })
  })
})
