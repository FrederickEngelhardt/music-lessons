
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', table => {
    table.increments()
    table.string('first_name').notNullable().defaultTo('')
    table.string('last_name').notNullable().defaultTo('')
    table.string('phone_number').notNullable().defaultTo('')
    table.string('email_address').notNullable().unique()
    table.specificType('hashed_password', 'char(60)').notNullable()
    table.integer('skill_level_id').notNullable()
    table.foreign('skill_level_id').references('skill_levels.id')
    table.text('bio').notNullable().defaultTo('New User')
    table.timestamp('created_at').notNullable().defaultTo(knex.raw('now()'))
        table.timestamp('updated_at').notNullable().defaultTo(knex.raw('now()'))  })
}
exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users')
}
