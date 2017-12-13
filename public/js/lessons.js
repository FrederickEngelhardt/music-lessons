const lessonCard = (element, user_data) => {
  let html = `
  <div class="row center">
    <button id="addLessonButton" class="btn waves-effect waves-light orange" type="submit" name="action">Add Lesson</button>
    </div>`
  console.log(element);
  $(`#open_lesson_${element.id}`).click((event) => {
    console.log('working');
    event.preventDefault()
    if ($('#addLessonButton').html()){
      // Remove the listener if the button exists
      $('#addLessonButton').unbind()
      $('#addLessonButton').delete()
    }
    // add a button and a listener to the modal menu
    $('.add_button').append(html)
    $('#addLessonButton').click( (event) =>{

    })

    $(`#lesson_card_name`).append(element.lesson_name)
    $(`#lesson_card_instructor_name`).append(user_data.first_name)
    $(`#lesson_card_date`).append(element.date)
    $(`#lesson_card_time`).append(element.time)
    $(`#lesson_card_location`).append(element.location)
    $(`#lesson_card_price`).append(`$${element.cost}`)
  })
}
const getAllLessons = () => {
  $.get('/lessons').done(result => {
    result.forEach((element) => {
      const id = element.user_instructor_id
      const student = element.user_client_id
      if (student === null) {
        $.get(`/users/${id}`).done(user_data => {
          // console.log(user_data);
          $('.build_tables').append(`
                <tr id="tr_${element.id}">
                  <td>${user_data.first_name}</td>
                  <td>${element.time}</td>
                  <td>${element.location}</td>
                  <td>$${element.cost}</td>
                  <td> <a id="open_lesson_${element.id}" class="addLesson modal-trigger btn-floating btn-small waves-effect waves-light orange" href="#open_lesson_info_modal"><i class="material-icons">arrow_drop_down_circle
                  </i></a></td>
                </tr>
                `)
          lessonCard(element, user_data)
          // $(`#open_lesson_${element.id}`).click( (event) => {
          //   $.get('/token').done( (user_result) => {
          //     const user_identity = user_result.cookie.user_id
          //     let data = {
          //       user_client_id: user_identity
          //     }
          //     $.ajax({
          //       headers: {
          //         'Accept': 'application/json',
          //         'Content-Type': 'application/json'
          //       },
          //       type: "PATCH",
          //       url: `/lessons/${element.id}`,
          //       dataType: "json",
          //       success: function(msg) {
          //         if (msg) {
          //           console.log(`Successfully added this lesson to your schedule.`);
          //         } else {
          //           alert("Cannot add to list.")
          //         }
          //       },
          //       data: JSON.stringify(data)
          //     })
          //   }).done( () => {
          //     $(`#tr_${element.id}`).remove()
          //   })
          //
          // })
        })
      }
    })
  })
}

const createAccountOverview = (data) => {
  const newCard = `
  <div id="myProfile">
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
        <div class="modal-footer">
          <a href="#!" class="modal-action modal-close waves-effect waves-green btn-flat">Back</a>
        </div>
      </div>
      `
  $('#edit_card').remove()
  $('#profile_card').append(newCard)
  $('#first_name').append(data.first_name)
  $('#last_name').append(data.last_name)
  $('#phone_number').append(data.phone_number)
  $('#email_address').append(data.email_address)
  $('#skill_level_id').append(data.skill_level_id)
  $('#bio').append(data.bio)
  $('#editButton').click(function(event) {
    event.preventDefault()
    editWindow()
  })
}

const ajaxGetLessons = () => {
  $.get('/lessons', (result) => {
    console.log(result);
  })
}
const ajaxGetLessonId = (id) => {
  $.get(`/lessons/${id}`, (result) => {
    console.log(result)
  })
}
const lessonPost = (data) => {

  $.ajax({
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    type: "POST",
    url: "/lessons",
    dataType: "json",
    success: function(msg) {
      if (msg) {
        console.log("Lesson" + sendInfo.lesson_name + " was added in list !");
        // location.reload(true);
        /* Activate this refresh when we hit submit.
        even better way is:
        $('#thisdiv').load(document.URL +  ' #thisdiv');
         */
      } else {
        alert("Cannot add to list !");
      }
    },
    data: JSON.stringify(data)
  });
}
const lessonPatch = (id, data) => {
  $.ajax({
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    type: "PATCH",
    url: `/lessons/${id}`,
    dataType: "json",
    success: function(msg) {
      if (msg) {
        console.log(`Lesson" ${sendInfo.lesson_name} was updated in the list !`);
        // location.reload(true);
        /* Activate this refresh when we hit submit.
        even better way is:
        $('#thisdiv').load(document.URL +  ' #thisdiv');
         */
      } else {
        alert("Cannot add to list !");
      }
    },
    data: JSON.stringify(data)
  })
}
const lessonDelete = (...id) => {
  id.forEach((element) => {
    $.ajax({
      type: "DELETE",
      url: `/lessons/${element}`
    })
  })
}
$(document).ready(() => {
  getAllLessons()
  $('.modal').modal();
  $('.button-collapse').sideNav({
    menuWidth: 300, // Default is 300
    edge: 'left', // Choose the horizontal origin
    closeOnClick: true, // Closes side-nav on <a> clicks, useful for Angular/Meteor
    draggable: true,
    // onOpen: function(el) {}
    // onClose: function(el) {}
  })
})
