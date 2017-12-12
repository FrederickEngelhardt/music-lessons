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

const editAccount = (id, data) => {
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
        console.log(`User ${id} was added in list !`);
        // location.reload(true);
        /* Activate this refresh when we hit submit.
        even better way is:
        $('#thisdiv').load(document.URL +  ' #thisdiv');
         */
      } else {
        alert("Cannot add to list !")
      }
    },
    data: JSON.stringify(data)
  });
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
              <input id="phone_number">
            </td>
          </tr>
          <tr>
            <td>Email</td>
            <td id="email_address"></td>
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
  $('#myProfile').remove()
  $('#profile_card').append(editCard)
  console.log('clicked');
  // $('#phone_number').append('')
  // $('#email_address').html()
  // $('#bio')



  $.get('/token', result => {
    const id = result.cookie.user_id
  })
  // getAccount()
}
$(document).ready(() => {
  console.log(getAccount())
  $('#editButton').click(function(event) {
    event.preventDefault()
    editWindow()
  })
  // editWindow()
})




/* Tests */
// console.log(getAccount(1));
// console.log(modifyAccount(1, {first_name: "I have Been Modified"}))
