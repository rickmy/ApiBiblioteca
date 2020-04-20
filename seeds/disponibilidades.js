exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('disponibilidades').del()
    .then(function () {
      // Inserts seed entries
      return knex('disponibilidades').insert([
        {disponibilidad: 'Disponible'},
        {disponibilidad: 'Prestado'},
        {disponibilidad: 'Perdido'},
        {disponibilidad: 'No devuelto'}
      ]);
    });
  };