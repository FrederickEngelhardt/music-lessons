exports.seed = (knex, Promise) => {
  return knex('lessons').del()
    .then(() => knex('users').del())
    .then(() => knex('skill_levels').del())
}
