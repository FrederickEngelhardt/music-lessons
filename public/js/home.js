const instructorFields = () => {
  const lessonsButton = `<div class='row home-menu center'>
        <div class="center col s12 m6 l6">
          <button class="home-menu btn waves-effect waves-light" type="submit" name="action">Add Lessons</button>
        </div>
      </div>`
  return $('.add_lessons').append(lessonsButton)
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
