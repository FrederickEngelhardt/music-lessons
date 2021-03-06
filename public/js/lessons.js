const lessonCard = (element, user_data) => {
  let html = `
  <div id="newButton" class="row center">
    <a id="addLessonButton" class="modal-trigger btn waves-effect waves-light" type="submit" name="action" href="#open_lesson_confirmation_modal"><div id="lesson_add_text">Add Lesson</div></a>
    </div>`
  $(`#open_lesson_${element.id}`).click((event) => {
    event.preventDefault()
    if ($('#addLessonButton').html()){
      // Remove the listener if the button exists
      $('#addLessonButton').empty()
      $('#addLessonButton').remove()
    }
    // add a button and a listener to the modal menu
    $('.add_button').append(html)
    $(`#lesson_card_name`).html(element.lesson_name)
    $(`#lesson_card_instructor_name`).html(user_data.first_name)
    $(`#lesson_card_date`).html(element.date)
    $(`#lesson_card_time`).html(element.time)
    $(`#lesson_card_location`).html(element.location)
    $(`#lesson_card_price`).html(`$${element.cost}`)
    $('#addLessonButton').click( (event) =>{
      event.preventDefault()
      confirmationCard(element, user_data)
    })
  })
}
const confirmationCard = (element, user_data) => {
  $(`#confirmButton`).click( (event) => {
    $.get('/token').done( (user_result) => {
      const user_identity = user_result.cookie.user_id
      let data = {
        user_client_id: user_identity
      }
      console.log(data);
      $.ajax({
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        type: "PATCH",
        url: `/lessons/${element.id}`,
        dataType: "json",
        success: function(msg) {
          if (msg) {
            console.log(`Successfully added this lesson to your schedule.`);
          } else {
            alert("Cannot add to schedule.")
          }
        },
        data: JSON.stringify(data)
      })
    }).done( () => {
    })

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
                <tr id="tr_${element.id}" class = "lessons_table_font">
                  <td>${user_data.first_name}</td>
                  <td>${element.date}</td>
                  <td>${element.location}</td>
                  <td>$${element.cost}</td>
                  <td> <a id="open_lesson_${element.id}" style="background-color:  #FAAD00" class="addLesson modal-trigger btn-floating btn-small waves-effect waves-light" href="#open_lesson_info_modal"><i class="material-icons">arrow_drop_down_circle
                  </i></a></td>
                </tr>
                `)
          lessonCard(element, user_data)
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
          <button id="editButton" class="btn waves-effect waves-light" type="submit" name="action">Edit Profile</button>
        </div>
        <div class="modal-footer">
          <a href="#!" class="modal-action modal-close waves-effect waves btn-flat">Back</a>
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
  $('.logout_text').append(` ${JSON.parse(localStorage.user_profile).email_address}`)
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
