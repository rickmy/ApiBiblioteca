exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('tipoTextos').del()
    .then(function () {
      // Inserts seed entries
      return knex('tipoTextos').insert([
        {tipoTexto: 'Científicos'},
        {tipoTexto: 'Literatura y lingüísticos'},
        {tipoTexto: 'Literatura y lingüísticos'},
        {tipoTexto: 'Poéticos'}
      ]);
    });
  }

 