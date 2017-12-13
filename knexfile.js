'use strict';

module.exports = {
  development: {
    client: 'pg',
    connection: 'postgres://localhost/music_lessons_dev',
    migrations: {
      directory: './db/migrations'
    },
    seeds: {
      directory: './db/seeds'
    }
  },
  test: {
    client: 'pg',
    connection: 'postgres://localhost/music_lessons_test',
    migrations: {
      directory:'./db/migrations'
    },
    seeds: {
      directory: './db/seeds'
    }
  },
  production: {
    client: 'pg',
    connection: music_lessons_dev,
    migrations: {
      directory:'./db/migrations'
    },
    seeds: {
      directory: './db/seeds'
    }
  }
};
