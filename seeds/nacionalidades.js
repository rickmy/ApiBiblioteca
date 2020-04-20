
  

    exports.seed=function(knex,Promise){
      return knex('nacionalidades').del()
      .then(function (){
      return knex('nacionalidades').insert([
        {nacionalidad:'Ecuatoriano/a'},
        {nacionalidad:'Venezolano/a'},
        {nacionalidad:'Español/a'},
        {nacionalidad:'Peruano/a'},
        {nacionalidad:'Colombiano/a'}
      ]);
     });
    }

    