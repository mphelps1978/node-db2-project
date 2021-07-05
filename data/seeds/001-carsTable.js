
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('cars').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('cars').insert([
        {
          make: "Ford",
          model: "Escort",
          vin: "NA4412P018",
          mileage: "250000",
          transType: "Automatic",
          titleStatus: "Salvage"
        },

        {
          make: "Ford",
          model: "Mustang",
          vin: "PO1NN41245",
          mileage: "5000",
          transType: "Manual",
          titleStatus: "Total"
        },

        {
          make: "Toyota",
          model: "Celica",
          vin: "XUY21812",
          mileage: "15481",
          transType: "Selectable",
          titleStatus: "Clean"
        },
      ]);
    });
};
