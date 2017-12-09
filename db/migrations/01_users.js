
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', table => {
    table.increments()
    table.string('first_name').notNullable().defaultTo('')
    table.string('last_name').notNullable().defaultTo('')
    table.string('phone_number').notNullable().defaultTo('')
    table.string('email_address').notNullable().defaultTo('')
    table.specificType('hashed_password', 'char(60)').notNullable()
    table.integer('skill_level_id').notNullable()
    table.foreign('skill_level_id').references('skill_levels.id')
    table.text('bio').notNullable().defaultTo('Ready to shred with big boi Fred')
    table.timestamps(true, true)
  })
}
exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users')
}
