$(document).ready(() => {
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
             $('.instructor-list').append('<div>' + data[i].first_name + '</div>')
           }
         }
       } else {
           alert("No teachers found.")
       }
     },
  })
})
