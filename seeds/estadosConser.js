

exports.seed=function(knex,Promise){
  return knex('estadoConservaciones').del()
  .then(function (){
  return knex('estadoConservaciones').insert([
    {estadoConservacion:'Bueno'},
    {estadoConservacion:'arrugado'},
    {estadoConservacion:'mojado'},
    {estadoConservacion:'viejo'},
  ]);
 });
 }