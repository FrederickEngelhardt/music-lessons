$.get('lessons', (result) => {
  console.log(result)
})
const ajaxGetId = (id) => {
  $.get(`lessons/${id}`, (result) => {
    console.log(result)
  })
}
console.log(ajaxGetId(1))

const sendInfo = {
  user_client_id: "1",
  user_instructor_id: "2",
  cost: "$60",
  date_time: "12/23/17 1:00PM",
  lesson_name: "Intro to Electric Guitar",
  location: "CU School of Music",
}
function lessonPost(data) {

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
                   alert("Lesson" + sendInfo.lesson_name + " was added in list !");
                   // location.reload(true);
               } else {
                   alert("Cannot add to list !");
               }
           },
           data: JSON.stringify(data)
       });
}
// lessonPost(sendInfo)

$.patch('lessons', (result) => {

})
