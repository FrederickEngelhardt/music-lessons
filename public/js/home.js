const instructorFields = () => {
  $('add_lessons').append(`<div class='row center'>
        <button class="homebutton btn waves-effect waves-light" type="submit" name="action">Add Lessons</button>
      </div>`)
}

const checkPrivileges = () => {
  if (id === 4){
    return instructorFields()
  }
  else {
    return studentFields()
  }
}
const id = 4
$(document).ready(() => {
  checkPrivileges()
  $('.modal').modal();
   $(".button-collapse").sideNav();
})
