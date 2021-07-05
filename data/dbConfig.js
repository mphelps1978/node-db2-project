const knex = require('knex')

const options = require('../knexfile').development

module.exports = knex(options)