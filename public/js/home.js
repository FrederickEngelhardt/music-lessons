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

const studentFields = () => {
  $('.add_lessons').append(`
        <div class='row home-menu center'>
          <div class="center col s12 m6 l6">
            <a id="browse_lessons" class="home-button btn waves-effect waves-light" type="submit" name="action" href="lessons.html">
            <text>Add Lesson</text></a>
          </div>
        </div>`)
}
const instructorFields = () => {
  $('.add_lessons').append(`
        <div class='row home-menu center'>
          <div class="center col s12 m6 l6">
            <a id="create_lesson" class="home-button btn waves-effect waves-light" type="submit" name="action" href="#">
            <text>Create Lesson</text></a>
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
        if (skill_level == 4){
          instructorFields()
          studentFields()
          return
        }
        else {return studentFields()}
      })
  })
}
/* These are all profile card functions*/
const createAccountOverview = (data) => {
  const newCard = `
  <div id="myProfile" class="card">
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
      </div>
      `
  $('#edit_card').remove()
  $('#profile_card').append(newCard)
  $('#first_name').append(data[0].first_name)
  $('#last_name').append(data[0].last_name)
  $('#phone_number').append(data[0].phone_number)
  $('#email_address').append(data[0].email_address)
  $('#skill_level_id').append(data[0].skill_level_id)
  $('#bio').append(data[0].bio)
  $('#editButton').click(function(event) {
    event.preventDefault()
    editWindow()
  })
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
  const editCard = `
  <div id="edit_card" class="">
      <table class="highlight">
        <thead>
          <h3>Edit Profile</h3>
        </thead>
        <tbody>
          <tr class="row">
            <td class="col s3 m3 l3">Phone Number</td>
            <td class="col s9 m9 l9">
              <input placeholder='XXX-XXX-XXXX' type="tel" id="phone_number">
            </td>
          </tr>
          <tr class="row">
            <td class="col s3 m3 l3">Bio</td>
            <td class="col s9 m9 l9">
              <div class="row">
                <form class="col s12">
                  <div class="row">
                    <div placeholder='XXX-XXX-XXXX' class="input-field white col s12">
                      <textarea id="bio-text" class="materialize-textarea"></textarea>
                      <label for="bio">Tell us about yourself.</label>
                    </div>
                  </div>
                </form>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="row center">
        <a href="#" id="submitButton" class="waves-effect waves-light btn">
          <p class="login-button">save changes</p>
        </a>
      </div>
    </div>
    `
  $('#myProfile').remove()
  $('#profile_card').append(editCard)
  createListeners()
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

/* Beginning of instructor lesson creation fields*/
const createLesson = (data) => {
  if (!data) {

  }
  $.ajax({
     headers : {
          'Accept' : 'application/json',
          'Content-Type' : 'application/json'
      },
     type: "POST",
     url: "/lessons",
     dataType: "json",
     success: function (msg) {
         if (msg) {
             console.log("Lesson" + sendInfo.lesson_name + " was added in list !");
         } else {
             alert("Cannot add to list !");
         }
     },
     data: JSON.stringify(data)
  });
}









$(document).ready(() => {
  checkPrivileges()
  getAccount()
  $('.modal').modal({
    dismissible: true, // Modal can be dismissed by clicking outside of the modal
    opacity: .5, // Opacity of modal background
    inDuration: 300, // Transition in duration
    outDuration: 200, // Transition out duration
    startingTop: '4%', // Starting top style attribute
    endingTop: '10%', // Ending top style attribute
    // ready: function(modal, trigger) {
    // },
    // complete: function() {}
  }
)
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
