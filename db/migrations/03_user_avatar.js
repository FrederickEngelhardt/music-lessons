
exports.up = function(knex, Promise) {
  return knex.schema.alterTable('users', function(table) {
  table.string('user_avatar').notNullable().defaultTo('guitarPlayer2.png');
});
};

exports.down = function(knex, Promise) {
  return knex.schema.dropColumn('users_avatar')
};
