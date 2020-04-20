;
exports.up = function(knex, Promise) {
    return knex.schema
    .createTable('usuarios', function (t) {
       t.increments('id');
       t.string('cedula', 15).notNullable().unique();
       t.string('primerNombre',30).notNullable();
       t.string('segundoNombre', 30).notNullable();
       t.string('primerApellido', 30).notNullable();
       t.string('segundoApellido', 30).notNullable();
       t.string('correo',250).notNullable();
       t.string('clave',100).notNullable();
       t.string('telefonoCelular',10).notNullable();
       t.date('fechaRegistro').notNullable().defaultTo(knex.fn.now());
       t.boolean('estado').notNullable().defaultTo(true);
    })

    

    .createTable('lectores', function (t) {
        t.increments('id');
        t.integer('idUsuarios').notNullable().references('id').inTable('usuarios');
        t.integer('numMaxEjemplaresPrest').notNullable().defaultTo(2);
        t.boolean('estado').notNullable().defaultTo(true);
     })

    .createTable('bibliotecarios', function (t) {
        t.increments('id');
        t.integer('idUsuarios').references('id').inTable('usuarios');
     })
    
    .createTable('stand', function (t) {
        t.increments('id');
        t.string('stand',100).notNullable();
        t.boolean('estado').notNullable().defaultTo(true);
     })
     

    .createTable('tipoTextos', function (t) {
        t.increments('id');
        t.string('tipoTexto',100).notNullable();
        t.boolean('estado').notNullable().defaultTo(true);
     })

    .createTable('editoriales', function (t) {
        t.increments('id');
        t.string('editorial',100).notNullable();
        t.boolean('estado').notNullable().defaultTo(true);
     })

    .createTable('estadoConservaciones', function (t) {
        t.increments('id');
        t.string('estadoConservacion',60).notNullable();
        t.boolean('estado').notNullable().defaultTo(true);
     })
    
    .createTable('imagenes', function (t) {
        t.increments('id');
        t.string('url', 250).notNullable();
        t.boolean('estado').notNullable().defaultTo(true) 
    }).createTable('documentos', function (t) {
        t.increments('id');
        t.integer('idUsuario').notNullable().references('id').inTable('usuario');
        t.string('codigo',45).notNullable().unique();
        t.date('fechaElaboracion').notNullable().defaultTo(knex.fn.now());
        t.date('fechaModificacion').notNullable();
        t.integer('idTipoDocumento').notNullable().references('id').inTable('tipoDocumentos');
        t.string('path',150).notNullable();
        t.boolean('estado').notNullable().defaultTo(true);
     })

    .createTable('disponibilidades', function (t) {
        t.increments('id');
        t.string('disponibilidad',50).notNullable();
        t.boolean('estado').notNullable().defaultTo(true)
    })

    .createTable('textos', function (t) {
        t.increments('id');
        t.string('codigo',20).notNullable().unique();
        t.string('titulo',100).notNullable();
        t.integer('idEditoriales').notNullable().references('id').inTable('editoriales');
        t.integer('idTipoTextos').notNullable().references('id').inTable('tipoTextos');
        t.string('descripcion',200).notNullable();
        t.boolean('estado').notNullable().defaultTo(true);
     })

    .createTable('ejemplares', function (t) {
        t.increments('id');
        t.string('codigo',20).notNullable().unique();
        t.integer('idTextos').notNullable().references('id').inTable('textos');
        t.date('fechaPublicacion').notNullable();
        t.integer('idStand').notNullable().references('id').inTable('stand');
        t.integer('idEstadoConservaciones').notNullable().references('id').inTable('estadoConservaciones');
        t.integer('idDisponibilidad').notNullable().references('id').inTable('disponibilidades')
        t.boolean('estado').notNullable().defaultTo(true);
     })

    .createTable('nacionalidades', function (t) {
        t.increments('id');
        t.string('nacionalidad',100).notNullable();
        t.boolean('estado').notNullable().defaultTo(true);
     })

    .createTable('autores', function (t) {
        t.increments('id');
        t.string('nombre',30).notNullable();
        t.string('apellido',30).notNullable();
        t.integer('idNacionalidades').notNullable().references('id').inTable('nacionalidades');
        t.boolean('estado').notNullable().defaultTo(true);
     })

    .createTable('textosAutores', function (t) {
        t.increments('id');
        t.integer('idTextos').notNullable().references('id').inTable('textos');
        t.integer('idAutores').notNullable().references('id').inTable('autores');
     })

    .createTable('prestamos', function (t) {
        t.increments('id');
        t.string('codigo',20).notNullable().unique();
        t.date('fechaPrestamo').notNullable().defaultTo(knex.fn.now());
        t.integer('idLectores').notNullable().references('id').inTable('lectores');
        t.date('fechaMaxEntrega').notNullable();
        t.integer('idBibliotecario').notNullable().references('id').inTable('bibliotecarios');
        t.string('observaciones',100).notNullable();
     })

    .createTable('detallePrestamos', function (t) {
        t.increments('id');      
        t.integer('idPrestamos').notNullable().references('id').inTable('prestamos');
        t.integer('idEjemplares').notNullable().references('id').inTable('ejemplares');
     })

    .createTable('devoluciones', function (t) {
        t.increments('id');
        t.string('codigo',20).notNullable().unique();
        t.integer('idPrestamos').notNullable().references('id').inTable('prestamos');
        t.date('fechaDevolucion').notNullable();
        t.integer('idBibliotecario').notNullable().references('id').inTable('bibliotecarios');
        t.string('observaciones',100).notNullable();
     })
     
    

    .createTable('preguntasSeguridad', function (t) {
        t.increments('id');
        t.string('preguntaSeguridad',100).notNullable();
        t.boolean('estado').notNullable().defaultTo(true)
    })

    .createTable('preguntasUsuarios', function (t) {
        t.increments('id');
        t.integer('idUsuario').notNullable().references('id').inTable('usuarios');
        t.integer('idPreguntas').notNullable().references('id').inTable('preguntasSeguridad');
        t.string('respuestas',100).notNullable();
    })
    


};

exports.down = function(knex, Promise) {
    return knex.schema
    .dropTable("usuarios")
    .dropTable("lectores")
    .dropTable("bibliotecarios")
    .dropTable("stand")
    .dropTable("tipotextos")
    .dropTable("editoriales")
    .dropTable("estadoConservaciones")
    .dropTable("textos")
    .dropTable("ejemplares")
    .dropTable("nacionalidades")
    .dropTable("autores")
    .dropTable("textosAutores")
    .dropTable("prestamos")
    .dropTable("detallePrestamos")
    .dropTable("devoluciones")
    .dropTable('imagenes')
    .dropTable('preguntasSeguridad')
    .dropTable('preguntasUsuarios')
    .dropTable('disponibilidades')
};
