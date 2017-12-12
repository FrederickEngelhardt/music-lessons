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
            <a id="browse_lessons" class="home-button btn waves-effect waves-light" type="submit" name="action" href="#">
            <text>Add Lesson</text></a>
          </div>
        </div>`)
}

const checkPrivileges = () => {
  let skill_level
  $.get('/token', result => {
    const id = result.cookie.user_id
    $.get(`/users/${id}`)
      .done(data => {
        skill_level = data.skill_level_id
        if (skill_level == 4){return instructorFields()}
        console.log(skill_level);
      })
  })
}


/* These are all profile card functions*/
const createAccountOverview = (data) => {
  const newCard = `<div id="myProfile" class="card">
        <table class="highlight">
          <thead>
            <h3>My Profile</h3>
          </thead>
          <tbody>
            <tr>
              <td>First Name</td>
              <td id="first_name"></td>
            </tr>
            <tr>
              <td>Last Name</td>
              <td id="last_name"></td>
            </tr>
            <tr>
              <td>Phone Number</td>
              <input><td id="phone_number"></td>
            </tr>
            <tr>
              <td>Email</td>
              <td id="email_address"></td>
            </tr>
            <tr>
              <td>Skill Level</td>
              <td id="skill_level_id"></td>
            </tr>
            <tr>
              <td>Bio</td>
              <td id="bio"></td>
            </tr>
          </tbody>
        </table>
        <div class="row center">
          <button id="editButton" class="btn waves-effect waves-light orange" type="submit" name="action">Edit Profile</button>
        </div>
      </div>`
  $('#edit_card').remove()
  $('#profile_card').append(newCard)
  $('#first_name').append(data[0].first_name)
  $('#last_name').append(data[0].last_name)
  $('#phone_number').append(data[0].phone_number)
  $('#email_address').append(data[0].email_address)
  $('#skill_level_id').append(data[0].skill_level_id)
  $('#bio').append(data[0].bio)
}
const getAccount = () => {
  $.get('/token', result => {
    const id = result.cookie.user_id
    $.get(`/users/${id}`).done((data) => {
      $('#first_name').append(data.first_name)
      $('#last_name').append(data.last_name)
      $('#phone_number').append(data.phone_number)
      $('#email_address').append(data.email_address)
      $('#skill_level_id').append(data.skill_level_id)
      $('#bio').append(data.bio)
    })
  })
}
const editWindow = () => {
  const editCard = `<div id="edit_card" class="card">

      <table class="highlight">
        <thead>
          <h3>Edit Profile</h3>
        </thead>
        <tbody>
          <tr>
            <td>Phone Number</td>
            <td>
              <input type="tel" id="phone_number">
            </td>
          </tr>
          <tr>
            <td>Bio</td>
            <td>
              <input type="text" id="bio">
            </td>
          </tr>
        </tbody>
      </table>
      <div class="row center">
        <a href="./profile.html" id="submitButton" class="waves-effect waves-light btn">
          <p class="login-button">Submit Changes</p>
        </a>
      </div>
    </div>`
  $('#myProfile').remove()
  $('#profile_card').append(editCard)
  $('#submitButton').click(function(event) {
    event.preventDefault()
    submitEdit()
  })
}
const submitEdit = () => {
  let phone_number = $('#phone_number').val()
  let bio = $('#bio').val()
  let data = {
    phone_number,
    bio
  }
  for (i in data) {
    if (data[i] === '') {
      delete data[i]
    }
  }
  $.get('/token', result => {
    user_id = result.cookie.user_id
  }).done((result) => {
    const id = result.cookie.user_id
    $.ajax({
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      type: "PATCH",
      url: `/users/${id}`,
      dataType: "json",
      success: function(msg) {
        if (msg) {
          console.log(`User information was successfully update!`);
        } else {
          alert("Cannot add to list.")
        }
      },
      data: JSON.stringify(data)
    }).done((final_result) => {
      createAccountOverview(final_result)
    })
  })
}
const createListeners = () => {
  $('#editButton').click(function(event) {
    event.preventDefault()
    editWindow()
  })
}
/* End of profile functions */

$(document).ready(() => {
  checkPrivileges()
  $('.modal').modal();
  $('.button-collapse').sideNav({
      menuWidth: 300, // Default is 300
      edge: 'right', // Choose the horizontal origin
      closeOnClick: true, // Closes side-nav on <a> clicks, useful for Angular/Meteor
      draggable: true,
      // onOpen: function(el) {}
      // onClose: function(el) {}
    }
  )
  createListeners()
})
