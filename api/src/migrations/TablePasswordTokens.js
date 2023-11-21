exports.up = (knex) =>
  knex.schema.createTable('passwordtokens', (table) => {
    table.increments('id').primary();
    table.string('token').notNullable().unique();
    table.integer('user_id').notNullable();
    table.boolean('used').notNullable();
    table.timestamps(true, true);
    
    table.foreign('user_id').references('id').inTable('users').onUpdate('CASCADE').onDelete('CASCADE');
  });

exports.down = (knex) => knex.schema.dropTableIfExists('passwordtokens');
