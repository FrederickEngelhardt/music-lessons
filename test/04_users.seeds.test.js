'use strict';

process.env.NODE_ENV = 'test';

const assert = require('chai').assert;
const { suite, test } = require('mocha');
const knex = require('../knex');
const { addDatabaseHooks } = require('./utils')
suite('04_users seeds', addDatabaseHooks(() => {
  test('users rows', (done) => {
    knex('users').orderBy('id', 'ASC')
      .then((actual) => {
        const expected = [{
          id: 1,
          first_name: 'Eddie',
          last_name: 'Marovich',
          phone_number: '303-654-3210',
          email_address: 'spiggy6@gmail.com',
          hashed_password: '$2a$10$jrcJg8OzLrJZFbtcMXVXQ.173TA2jgo.IFhdoOCuGZvD6rOl/kPei',
          skill_level_id: 2,
          bio: 'New User',
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
          skill_level_id: 2,
          bio: 'New User',

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
          bio: 'New User',
          created_at: new Date('2016-06-29 14:26:16 UTC'),
          updated_at: new Date('2016-06-29 14:26:16 UTC')
        }];

        for (let i = 0; i < expected.length; i++) {
          assert.deepEqual(
            actual[i],
            expected[i],
            `Row id=${i + 1} not the same`
          );
        }

        done();
      })
      .catch((err) => {
        done(err);
      });
  });
}));
