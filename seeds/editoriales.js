exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('editoriales').del()
    .then(function () {
      // Inserts seed entries
      return knex('editoriales').insert([
        {editorial: 'Cultural, S. A. Ediciones'},
        {editorial: 'Salamandra S. A.'},
        {editorial: 'Ediciem'},
        {editorial: 'Albatros SRL.'}
      ]);
    });
  }

  
