const getAllLessons = () => {
  $.get('lessons').done( result => {
    result.forEach( (element) => {
      console.log(element);
      const id = element.user_instructor_id
      const student = element.user_client_id
      console.log(student);
      if (student === null){
      $.get(`/users/${id}`).done( user_data => {
        console.log(user_data);
              $('tbody').append(`<tr><td>${user_data.first_name}</td><td>${element.date_time}</td><td>${element.location}</td><td>${element.cost}</td><td> <a class="addLesson btn-floating btn-small waves-effect waves-light orange"><i class="material-icons">add</i></a></td></tr>` )
        $('.addLesson').on('click', (event) => {
          $.get('/token', result => {
            const id = result.cookie.user_id
            let data = {
              user_client_id: id
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
                  console.log(`Lesson information was successfully update!`);
                } else {
                  alert("Cannot add to list.")
                }
              },
              data: JSON.stringify(data)
            })
          })

        })
      })
    }
    })
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
            headers : {
                 'Accept' : 'application/json',
                 'Content-Type' : 'application/json'
             },
            type: "PATCH",
            url: `/lessons/${id}`,
            dataType: "json",
            success: function (msg) {
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
        edge: 'right', // Choose the horizontal origin
        closeOnClick: true, // Closes side-nav on <a> clicks, useful for Angular/Meteor
        draggable: true,
        // onOpen: function(el) {}
        // onClose: function(el) {}
      })
})

/* TESTs */
// const sendInfo = {
//   user_client_id: "1",
//   user_instructor_id: "2",
//   cost: "$60",
//   date_time: "12/23/17 1:00PM",
//   lesson_name: "Intro to Electric Guitar",
//   location: "CU School of Music",
// }
// console.log(ajaxGetLessons())
// console.log(ajaxGetLessonId(3))
// lessonPost(sendInfo)
// lessonPatch(1, {cost: 90, date_time: "FredTime"})
// lessonDelete(2)
