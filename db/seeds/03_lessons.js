exports.seed = function(knex, Promise) {
  return knex('lessons').insert([
    {
      id: 1,
      user_client_id: null,
      user_instructor_id: 3,
      location: 'CU School of Music',
      cost: '$60',
      date: '12/23/17',
      time: '1:00PM',
      lesson_name: 'Intro to Electric Guitar'
    },

    {
      id: 3,
      user_client_id: null,
      user_instructor_id: 3,
      location: 'Galvanize Rooftop',
      cost: '$50',
      date: '12/18/17',
      time: '1:00PM',
      lesson_name: 'How to throw your Guitar 101.'
    }

  ]).then(() => {
    return knex.raw(
      `SELECT setval('lessons_id_seq', (SELECT MAX(id) FROM lessons));`
    )
  })
};
