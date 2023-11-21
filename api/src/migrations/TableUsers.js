exports.up = (knex) =>
  knex.schema.createTable('users', (table) => {
    table.increments('id').primary();
    table.integer('id_campaign').notNullable();
    table.string('fullname').notNullable().unique();
    table.string('num_doc').unsigned().notNullable().unique();
    table.string('email').notNullable().unique();
    table.string('password').notNullable();
    table.integer('role').notNullable();
    table.integer('status').notNullable();
    table.timestamps(true, true);

    table.foreign('id_campaign').references('id').inTable('campaigns');
  });

exports.down = (knex) => knex.schema.dropTableIfExists('users');
