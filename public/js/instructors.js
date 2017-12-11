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
           $('.instructor-body').append(
             `
             <div class="row">
               <div class="col s12 m7">
                 <div class="instructor-card card">
                   <div class="card-image">
                     <img src="/images/guitarPlayer2.png">
                     <span class="card-title black">${data[i].first_name} ${data[i].last_name}</span>
                   </div>
                   <div class="card-content">
                     <p>${data[i].bio}.</p>
                   </div>
                   <div class="card-action">
                     <a href="lessons.html">View lesson availability</a>
                   </div>
                 </div>
               </div>
             `
           )
         }
       }
     } else {
         alert("No teachers found.")
     }
   },
})
})
