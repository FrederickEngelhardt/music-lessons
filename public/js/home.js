const instructorFields = () => {
  const lessonsButton = `<div class='row home-menu center'>
        <div class="center col s12 m6 l6">
          <a class="home-menu btn waves-effect waves-light" type="submit" name="action"><text class="button-text">Add Lessons</text></a>
        </div>
      </div>`
  return $('.add_lessons').append(lessonsButton)
}
const checkPrivileges = () => {
  if (id === 4) {
    return instructorFields()
  } else {
    return studentFields()
  }
}
const id = 4
$(document).ready(() => {
  checkPrivileges()
  $('.modal').modal();
  $('.button-collapse').sideNav();
  $('#editButton').click(function(event){
    event.preventDefault()
    $('#first_name').append(`<input>`)
  })
})
