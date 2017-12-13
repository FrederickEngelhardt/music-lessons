$(document).ready(() => {
  $.get('/token', result => {
    console.log(result);
    const id = result.cookie.user_id
    $.get('/lessons', ([data]) => {
      const client = data.user_client_id

      if (client === id) {
        $.get(`/users/${id}`, user => {
          $('tbody').append(`
            <tr>
              <td>${user.first_name}</td>
              <td>${user.date_time}</td>
              <td>${user.location}</td>
              <td>${user.cost}</td>
              <td> <a class="addLesson red btn-floating btn-small waves-effect waves-light orange"><i class="material-icons">remove</i></a></td>
            </tr>
            `)
        })
      }
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
