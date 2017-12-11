(function() {
  'use strict'

  $.getJSON('/token')
    .done(loggedIn => {
      if (loggedIn) {
        $('#logout').on('click', () => {
          const options = {
            dataType: 'json',
            type: 'DELETE',
            url: '/token'
          }
          $.ajax(options)
            .done(() => {
              window.location.href = '/index.html'
            })
            .fail(() => {
              Materialize.toast('Unable to log out', 3000)
            })
        })
      }
    })

})()

const instructorFields = () => {
  $('.add_lessons').append(`
        <div class='row home-menu center'>
          <div class="center col s12 m6 l6">
            <a id="browse_instructors" class="home-button btn waves-effect waves-light" type="submit" name="action" href="instructors.html">
            <text>Add Lesson</text></a>
          </div>
        </div>`)
}

const checkPrivileges = () => {
  if (id === 4) {
    return instructorFields()
  } else {
    return studentFields()
  }
}
const id = 4
$(document).ready(() => {
  checkPrivileges()
  $('.modal').modal();
  $(".button-collapse").sideNav();
})
