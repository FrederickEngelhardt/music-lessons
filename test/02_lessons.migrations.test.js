'use strict';

process.env.NODE_ENV = 'test';

const assert = require('chai').assert;
const { suite, test } = require('mocha');
const knex = require('../knex');
const { addDatabaseHooks } = require('./utils')
suite('02_lessons migrations', addDatabaseHooks(() => {
  test('lessons columns', (done) => {
    knex('lessons').columnInfo()
      .then((actual) => {
        const expected = {
          id: {
            type: 'integer',
            maxLength: null,
            nullable: false,
            defaultValue: 'nextval(\'lessons_id_seq\'::regclass)'
          },

          user_client_id: {
            type: 'integer',
            maxLength: null,
            nullable: false,
            defaultValue: null
          },

          user_instructor_id: {
            type: 'integer',
            maxLength: null,
            nullable: false,
            defaultValue: null
          },

          location: {
            type: 'character varying',
            maxLength: 255,
            nullable: false,
            defaultValue: '\'\'::character varying'
          },

          cost: {
            type: 'character varying',
            maxLength: 255,
            nullable: false,
            defaultValue: '\'\'::character varying'
          },

          date_time: {
            type: 'character varying',
            maxLength: 255,
            nullable: false,
            defaultValue: '\'\'::character varying'
          },

          lesson_name: {
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
