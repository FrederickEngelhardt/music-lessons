exports.seed = function(knex, Promise) {
  return knex('users').insert([
    {
      id: 1,
      first_name: 'Eddie',
      last_name: 'Marovich',
      phone_number: '303-654-3210',
      email_address: 'spiggy6@gmail.com',
      hashed_password: '$2a$10$jrcJg8OzLrJZFbtcMXVXQ.173TA2jgo.IFhdoOCuGZvD6rOl/kPei',
      skill_level_id: 2,
      user_avatar: 'guitarPlayer2.png',
      created_at: new Date('2016-06-29 14:26:16 UTC'),
      updated_at: new Date('2016-06-29 14:26:16 UTC')
    },
    {
      id: 2,
      first_name: 'The Swamp Monster',
      last_name: 'Not A Lizard',
      phone_number: '303-619-5321',
      email_address: 'Swamp@swamp.io',
      hashed_password: '$2a$10$zaDd/g677uKzQEU.Z1SyH.sP53Fu5VFzZQcQTrXx4si/QPI46c/zq',
      skill_level_id: 4,
      user_avatar: 'swamp_monster.jpg',
      created_at: new Date('2016-06-29 14:26:16 UTC'),
      updated_at: new Date('2016-06-29 14:26:16 UTC')
    },
    {
      id: 3,
      first_name: 'Nigel',
      last_name: 'Flippo',
      phone_number: '303-619-5321',
      email_address: 'nigel.flippo@gmail.com',
      hashed_password: '$2a$10$zaDd/g677uKzQEU.Z1SyH.sP53Fu5VFzZQcQTrXx4si/QPI46c/zq',
      skill_level_id: 4,
      user_avatar: 'guitarPlayer2.png',
      created_at: new Date('2016-06-29 14:26:16 UTC'),
      updated_at: new Date('2016-06-29 14:26:16 UTC')
    },
    {
      id: 4,
      first_name: 'Ashley',
      last_name: 'Amato',
      phone_number: '303-619-9999',
      email_address: 'ashleyamato@gmail.com',
      hashed_password: '$2a$10$GuYwNz4igdVNY95hXJaw8e7aBkX2nzea0yEBIOQprnn4YAdNiQ9LW',
      skill_level_id: 4,
      user_avatar: 'guitarPlayer2.png',
      created_at: new Date('2016-06-29 14:26:16 UTC'),
      updated_at: new Date('2016-06-29 14:26:16 UTC')
    },
    {
      id: 5,
      first_name: 'Fred',
      last_name: 'Engelhardt',
      phone_number: '303-619-9979',
      email_address: 'fredshredz@gmail.com',
      hashed_password: '$2a$10$ROmIuhz5ztHJKyvovhd7tOt7ersMaDesynTlV350VgGfcEUM5G1su',
      skill_level_id: 4,
      user_avatar: 'fredster.jpg',
      created_at: new Date('2016-06-29 14:26:16 UTC'),
      updated_at: new Date('2016-06-29 14:26:16 UTC')
    }
  ]).then(() => {
    return knex.raw(
      `SELECT setval('users_id_seq', (SELECT MAX(id) FROM users));`
    )
  })
};
