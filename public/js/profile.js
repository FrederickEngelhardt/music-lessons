const getAccount = (id) => {
  $.get(`/users/${id}`).done( (data) => {
    console.log(data);
    $('#first_name').append(data.first_name)
    $('#last_name').append(data.last_name)
    $('#phone_number').append(data.phone_number)
    $('#skill_level_id').append(data.skill_level_id)
    $('#bio').append(data.bio)
  })
}
const modifyAccount = (id, data) => {
  $.ajax({
     headers : {
          'Accept' : 'application/json',
          'Content-Type' : 'application/json'
      },
     type: "PATCH",
     url: `/users/${id}`,
     dataType: "json",
     success: function (msg) {
         if (msg) {
             console.log(`User ${id} was added in list !`);
             // location.reload(true);
             /* Activate this refresh when we hit submit.
             even better way is:
             $('#thisdiv').load(document.URL +  ' #thisdiv');
              */
         } else {alert("Cannot add to list !")}
     },
     data: JSON.stringify(data)
  });
}
$(document).ready( () => {
  getAccount(1)
})




/* Tests */
// console.log(getAccount(1));
// console.log(modifyAccount(1, {first_name: "I have Been Modified"}))
