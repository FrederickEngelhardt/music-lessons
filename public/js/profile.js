var user_id

function id() {
  $.get('/token', result => {
    user_id = result.cookie.user_id
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
  const editCard = `<div class="card">

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
  let data = {phone_number,bio}
  for (i in data){
    if (data[i] === ''){
      delete data[i]
    }
  }
  $.get('/token', result => {
    user_id = result.cookie.user_id
  }).done( (result) => {
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
    });
  })
}

$(document).ready(() => {
  console.log(getAccount())
  $('#editButton').click(function(event) {
    event.preventDefault()
    editWindow()
  })
})




/* Tests */
// console.log(getAccount(1));
// console.log(modifyAccount(1, {first_name: "I have Been Modified"}))
