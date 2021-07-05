

exports.up = function(knex) {
  return knex.schema.createTable('cars', tbl => {
    // ID
    tbl.increments()

    // Required Fields
    tbl.text('make', 50).notNullable().defaultTo('');
    tbl.text('model', 50).notNullable().defaultTo('')
    tbl.text('vin', 20).unique().notNullable().defaultTo('').index()
    tbl.decimal('mileage', 8).notNullable().defaultTo('')

    // Optional Fields
    tbl.text('transType', 20).defaultTo('Automatic')
    tbl.text('titleStatus', 10).defaultTo('Clean')

  })
};

exports.down = function(knex, Promise) {
  //Drop entire table
  return knex.schema.dropTableIfExists('cars')

};
