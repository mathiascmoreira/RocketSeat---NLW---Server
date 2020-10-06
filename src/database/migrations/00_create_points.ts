import Knex from 'knex';  //Ao importar tipos, geralmente se usa letra maiuscula

export async function up(knex: Knex) {  //Pode se denifir o tipo de um parâmetro, e aprovaitar das vantagens do intellisense
    return knex.schema.createTable('points', table => {
        table.increments('id').primary();
        table.string('image').notNullable();
        table.string('name').notNullable();
        table.string('email').notNullable();
        table.string('whatsapp').notNullable();
        table.decimal('latitude').notNullable();
        table.decimal('longitude').notNullable();
        table.string('city').notNullable();
        table.string('uf', 2).notNullable();
    });
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('points');
}


//ao executar esta primeira migration, será criado o banco de dados com a tabela points
//e mais duas tabelas padrões do knex para armazenar as migrations já executadas