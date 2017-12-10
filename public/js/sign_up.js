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
                   console.log("User" + sendInfo.email_ + " was added in list !");
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
console.log(createAccount(user1));
