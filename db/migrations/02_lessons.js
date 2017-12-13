
exports.up = function(knex, Promise) {
  return knex.schema.createTable('lessons', table => {
    table.increments()
    table.integer('user_client_id')
    table.foreign('user_client_id').references('users.id')
    table.integer('user_instructor_id').notNullable()
    table.foreign('user_instructor_id').references('users.id')
    table.string('location').notNullable().defaultsTo('')
    table.string('cost').notNullable().defaultsTo('')
    table.string('date_time').notNullable().defaultsTo('')
    table.string('lesson_name').notNullable().defaultsTo('')
  })
}
exports.down = function(knex, Promise) {
  return knex.schema.dropTable('lessons')
}
