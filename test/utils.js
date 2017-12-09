'use strict';
const knex = require('../knex');

const addDatabaseHooks = (func) => {
  return function(...args) {
    beforeEach((done) => {
     knex.migrate.rollback()
     .then(() => {
       return knex.migrate.latest()
     })
     .then(() => {
       return knex.seed.run()
     })
     .finally(() => {
       done();
     })
    });

    afterEach((done) => {
      knex.migrate.rollback()
      .finally(() => {
        done();
      });
    });

    return func(...args);
  }
}

module.exports = {
  addDatabaseHooks
};
