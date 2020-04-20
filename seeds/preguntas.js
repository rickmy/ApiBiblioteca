exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('preguntasSeguridad').del()
    .then(function () {
      // Inserts seed entries
      return knex('preguntasSeguridad').insert([
        {preguntaSeguridad: '¿Cuál es tu color favorito?'},
        {preguntaSeguridad: '¿El nombre de tu comida favoríta?'},
        {preguntaSeguridad: '¿Cuál fue tu apodo?'},
        {preguntaSeguridad: '¿Cuál es tu película favorita?'},
        {preguntaSeguridad: '¿El nombre de tu cantante culposo o que te da pena decirlo?'}
      ]);
    });
  }
