const createAccount = (data) => {
        $.ajax({
           headers : {
                'Accept' : 'application/json',
                'Content-Type' : 'application/json'
            },
           type: "POST",
           url: "/users",
           dataType: "json",
           success: function (msg) {
               if (msg) {
                   console.log("User" + " was added in list !");
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


/* TESTS */
let user1 = {"first_name":"This is a Test","last_name":"TEST","phone_number":"303-654-3210","email_address":"spiggy6@gmail.com","password":"hello123@Ilikecats","skill_level_id": "4","bio":"Stupid Tests all day long"}

console.log(modifyAccount(1, {first_name: "I have Been Modified"}))
// console.log(createAccount(user1));
