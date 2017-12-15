$(document).ready(() => {
  $('.logout_text').append(` ${JSON.parse(localStorage.user_profile).email_address}`)
  $.get('/token', result => {
    const id = result.cookie.user_id
    $.get('/lessons', (data) => {
      data.forEach( (element) => {
        if (element.user_client_id === id){
          // list the lesson
          // get instructor first_name
          $.get(`/users/${element.user_instructor_id}`, instructor => {
            $('tbody').append(`
              <tr id="tr_${element.id}"">
                <td>${instructor.first_name}</td>
                <td>${element.date}</td>
                <td>${element.location}</td>
                <td>${element.cost}</td>
                <td> <a id="${element.id}" class="addLesson btn-floating btn-small waves-effect waves-light orange"><i class="red material-icons">remove</i></a></td>
              </tr>
              `)
              $(`#${element.id}`).click( (event) => {
                  let data = {
                    user_client_id: null
                  }
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
                        console.log(`Removed this lesson from your schedule.`);
                      } else {
                        alert("Cannot add to list.")
                      }
                    },
                    data: JSON.stringify(data)
                  })
                  .done( () => {
                  console.log('activated');
                  $(`#tr_${element.id}`).remove()
                })
              })
          })
        } else if (element.user_instructor_id === id && element.user_client_id !== null) {
          $.get(`/users/${element.user_instructor_id}`, instructor => {
            $('tbody').append(`
              <tr id="tr_${element.id}"">
                <td>${instructor.first_name}</td>
                <td>${element.date}</td>
                <td>${element.location}</td>
                <td>${element.cost}</td>
                <td> <a id="${element.id}" class="addLesson btn-floating btn-small waves-effect waves-light orange"><i class="red material-icons">remove</i></a></td>
              </tr>
              `)
              $(`#${element.id}`).click( (event) => {
                  let data = {
                    user_client_id: null
                  }
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
                        console.log(`Removed this lesson from your schedule.`);
                      } else {
                        alert("Cannot add to list.")
                      }
                    },
                    data: JSON.stringify(data)
                  })
                  .done( () => {
                  console.log('activated');
                  $(`#tr_${element.id}`).remove()
                })
              })
          })
        }
      }
      )
      const client = data.user_client_id

      if (client === id) {

      }
    })
  })
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
