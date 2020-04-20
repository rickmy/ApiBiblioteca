
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('stand').del()
    .then(function () {
      // Inserts seed entries
      return knex('stand').insert([
        {stand: 'A1'},
        {stand: 'A2'},
        {stand: 'A3'},
        {stand: 'A4'},
        {stand: 'B1'},
        {stand: 'B2'},
        {stand: 'B3'},
        {stand: 'B4'},
        {stand: 'C1'},
        {stand: 'C2'},
        {stand: 'C3'},
        {stand: 'C4'}
      ]);
    });
}



 