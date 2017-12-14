# Music Lessons

A web application for scheduling music lessons

## Heroku

[Heroku App](https://q2-music-lessons.herokuapp.com/)

## Installation
Prerequisites:
1. Install Postgresql

- Clone the repository and run `npm install`
```shell
createdb music_lessons_dev
createdb music_lessons_test
knex migrate:latest
knex seed:run
```
- Create the JWT_KEY

```shell
bash -c 'echo "JWT_KEY="$(openssl rand -base64 64)' > .env
```
- Run tests using `npm test`


## Routes

- GET users/
- GET users/id
- GET users/id/lessons
- POST users/
- PATCH users/id
- DELETE users/id

- GET lessons/
- GET lessons/id
- POST lessons/
- PATCH lessons/id
- DELETE lessons/id

- GET skill_level/
- GET skill_level/id
- POST skill_level/
- PATCH skill_level/id
- DELETE skill_level/id

- GET /token
- POST /token
- DELETE /token

## Trello

[Trello Board](https://trello.com/b/qFSJYITo/music-lessons-portal)


## Style Guide

- Materialize
- Font - YuKyokasho
- Pod Colors - #FAAD00 - yellow
- Background - #333030 - dark grey
- Font color - white / black 
- Logo border & background graphic - #95989A

## Wire Frames

[Wire Frames](https://xd.adobe.com/view/53e24b1a-cddb-4d2e-8578-5ea2c928b772/)

## JWT_KEY
```shell
bash -c 'echo "JWT_KEY="$(openssl rand -base64 64)' > .env
```
