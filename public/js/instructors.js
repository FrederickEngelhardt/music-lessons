$.ajax({
   headers : {
        'Accept' : 'application/json',
        'Content-Type' : 'application/json'
    },
   type: "GET",
   url: "/users",
   dataType: "json",
   success: function (data) {
     if (data) {
       for (let i = 0; i < data.length; i++) {
         if (data[i].skill_level_id === 4) {
           console.log(data[i])
         }
       }
     } else {
         alert("No teachers found.")
     }
   },
})

$(document).ready( () => {
  console.log('page loaded');
  $('button').click(function(event){
    event.preventDefault()
    createAccount()
  })
})
