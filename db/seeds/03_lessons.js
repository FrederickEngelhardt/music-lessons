exports.seed = function(knex, Promise) {
  return knex('lessons').insert([
    {
      id: 1,
      user_client_id: null,
      user_instructor_id: 3,
      location: 'CU School Of Music',
      cost: 50,
      date: '2017-12-23',
      time: '1:00PM',
      lesson_name: 'Intro To Electric Guitar'
    },
    {
      id: 2,
      user_client_id: null,
      user_instructor_id: 5,
      location: `Fred's House`,
      cost: 50,
      date: '2017-12-20',
      time:  '5:00PM',
      lesson_name: 'How To Not Go Deaf Using A Tube Amp.'
    },
    {
      id: 3,
      user_client_id: null,
      user_instructor_id: 4,
      location: 'Galvanize Rooftop',
      cost: 50,
      date: '2018-01-02',
      time: '1:00PM',
      lesson_name: 'How To Throw Your Guitar 101.'
    },
    {
      id: 4,
      user_client_id: null,
      user_instructor_id: 3,
      location: 'The Music Room',
      cost: 50,
      date: '2017-12-18',
      time: '8:00PM',
      lesson_name: 'Intro To Classical Guitar'
    },
    {
      id: 5,
      user_client_id: null,
      user_instructor_id: 4,
      location: 'The Booth',
      cost: 50,
      date: '2017-12-20',
      time: '6:00PM',
      lesson_name: "Pickin' A Guitar"
    }
  ]).then(() => {
    return knex.raw(
      `SELECT setval('lessons_id_seq', (SELECT MAX(id) FROM lessons));`
    )
  })
};
