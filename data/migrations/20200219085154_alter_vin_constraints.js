
exports.up = function(knex, Promise) {
  return knex.schema.table("cars", function(tbl) {
    tbl.dropUnique('vin');
    tbl.dropIndex('vin')
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table("cars", function(tb) {
    tbl.unique('vin')
    tbl.index('vin')
  });
};