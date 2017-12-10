const ajaxGetLessons = () => {
  $.get('lessons', (result) => {
    console.log(result)
  })
}
const ajaxGetLessonId = (id) => {
  $.get(`lessons/${id}`, (result) => {
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
// console.log(ajaxGetId(1))
// lessonPost(sendInfo)
// lessonPatch(1, {cost: 90, date_time: "FredTime"})
// lessonDelete(1)
