exports.seed = function(knex, Promise) {
  return knex('lessons').insert([
    {
      id: 1,
      user_client_id: 1,
      user_instructor_id: 2,
      location: 'CU School of Music',
      cost: '$60',
      date_time: '12/23/17 1:00PM',
      lesson_name: 'Intro to Electric Guitar'
    }
  ]).then(() => {
    return knex.raw(
      `SELECT setval('lessons_id_seq', (SELECT MAX(id) FROM lessons));`
    )
  })
};
