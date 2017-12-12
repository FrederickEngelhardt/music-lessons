// $(document).ready(() => {
//   $.get('/token', result => {
//     const id = result.cookie.user_id
//     $.get(`/lessons/${id}`, result => {
//       console.log(result);
//     })
//
//   })

//   $.get('/lessons')
//     .done(([data]) => {
//       const id = data.user_instructor_id
//       $.get(`/users/${id}`)
//         .done(user => {
//           console.log(user);
//           $('tbody').append('<tr><td>' + user.first_name + '</td><td>' + data.date_time + '</td><td>' + data.location + '</td><td>' + data.cost + '</td><td><button class="addLesson">+</button></td></tr>' );
//         })
//     })
// })
// const checkPrivileges = () => {
//   let skill_level
//   $.get('/token', result => {
//     const id = result.cookie.user_id
//     $.get(`/users/${id}`)
//       .done(data => {
//         skill_level = data.skill_level_id
//         if (skill_level == 4){return instructorFields()}
//         console.log(skill_level);
//       })
//   })
// }
