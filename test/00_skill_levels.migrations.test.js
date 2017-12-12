'use strict';

process.env.NODE_ENV = 'test';

const assert = require('chai').assert;
const { suite, test } = require('mocha');
const knex = require('../knex');
const { addDatabaseHooks } = require('./utils')
suite('00_skill_levels migrations', addDatabaseHooks(() => {
  test('skill levels columns', (done) => {
    knex('skill_levels').columnInfo()
      .then((actual) => {
        const expected = {
          id: {
            type: 'integer',
            maxLength: null,
            nullable: false,
            defaultValue: 'nextval(\'skill_levels_id_seq\'::regclass)'
          },

          skill_level: {
            type: 'character varying',
            maxLength: 255,
            nullable: false,
            defaultValue: '\'\'::character varying'
          }
        };

        for (const column in expected) {
          assert.deepEqual(
            actual[column],
            expected[column],
            `Column ${column} is not the same`
          );
        }

        done();
      })
      .catch((err) => {
        done(err);
      });
  });
}));
