'use strict';

process.env.NODE_ENV = 'test';

const assert = require('chai').assert;
const { suite, test } = require('mocha');
const knex = require('../knex');
const { addDatabaseHooks } = require('./utils')
suite('03_skill_levels seeds', addDatabaseHooks(() => {
  test('skill levels rows', (done) => {
    knex('skill_levels').orderBy('id', 'ASC')
      .then((actual) => {
        /* eslint-disable max-len */
        const expected = [{
          id: 1,
          skill_level: 'Beginner'
        },
        {
          id: 2,
          skill_level: 'Intermediate'
        },
        {
          id: 3,
          skill_level: 'Advanced'
        },
        {
          id: 4,
          skill_level: 'Expert (Instructor)'
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
