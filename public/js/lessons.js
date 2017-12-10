$.get('lessons', (result) => {
  console.log(result)
})
const ajaxGetId = (id) => {
  $.get(`lessons/${id}`, (result) => {
    console.log(result)
  })
}
console.log(ajaxGetId(1))

// const ajaxPost = () => {
//   insertData = JSON.stringify({
//       user_client_id: "1",
//       user_instructor_id: "2",
//       cost: "$60",
//       date_time: "12/23/17 1:00PM",
//       lesson_name: "Intro to Electric Guitar",
//       location: "CU School of Music",
//     })
//   $.ajax({
//     type: "POST",
//     url: 'lessons',
//     data:   insertData,
//     success: (result) => {
//       console.log(result)
//     },
//     dataType: 'json'
//   });
// }
// console.log(ajaxPost())
