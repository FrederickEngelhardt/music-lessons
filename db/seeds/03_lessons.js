exports.seed = function(knex, Promise) {
  return knex('lessons').insert([
    {
      id: 1,
      user_client_id: null,
      user_instructor_id: 3,
      location: 'CU School of Music',
      cost: '$60',
      date_time: '12/23/17 1:00PM',
      lesson_name: 'Intro to Electric Guitar'
    },
    {
      id: 2,
      user_client_id: null,
      user_instructor_id: 2,
      location: `Fred's House`,
      cost: '$5',
      date_time: '12/22/17 5:00PM',
      lesson_name: 'How to not go deaf using a tube amp.'
    },
    {
      id: 3,
      user_client_id: null,
      user_instructor_id: 1,
      location: 'Galvanize Rooftop',
      cost: '$50',
      date_time: '12/18/17 1:00PM',
      lesson_name: 'How to throw your Guitar 101.'
    },
    {
      id: 4,
      user_client_id: null,
      user_instructor_id: 2,
      location: 'In my dank basement',
      cost: '$20',
      date_time: '12/16/17 8:00PM',
      lesson_name: 'Karokee w/ the Boyz'
    }
  ]).then(() => {
    return knex.raw(
      `SELECT setval('lessons_id_seq', (SELECT MAX(id) FROM lessons));`
    )
  })
};
