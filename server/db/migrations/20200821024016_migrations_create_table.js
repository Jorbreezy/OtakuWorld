exports.up = (knex) => knex.schema
  .createTable('users', (table) => {
    table.increments().primary();
    table.string('username', 256).unique().notNullable();
    table.string('password', 256).notNullable();
  })
  .createTable('genre', (table) => {
    table.increments().primary();
    table.string('genre', 16).unique();
  })
  .createTable('type', (table) => {
    table.increments().primary();
    table.string('type', 16).unique();
  })
  .createTable('status', (table) => {
    table.increments().primary();
    table.string('status', 16).unique();
  })
  .createTable('manga', (table) => {
    table.increments().primary();
    table.string('title', 256).unique().notNullable();
    table.string('author', 128).notNullable();
    table.string('thumbnail', 256).notNullable();
    table.text('description').notNullable();
    table.integer('chapters').notNullable();
    table
      .integer('type')
      .references('id')
      .inTable('type');
    table
      .integer('status')
      .references('id')
      .inTable('status');
  })
  .createTable('rating', (table) => {
    table.increments().primary();
    table.integer('rating').notNullable().defaultTo(0);
    table
      .integer('user_id')
      .references('id')
      .inTable('users');
    table
      .integer('manga_id')
      .references('id')
      .inTable('manga');
  })
  .createTable('manga_genre', (table) => {
    table.increments().primary();
    table
      .integer('manga_id')
      .references('id')
      .inTable('manga');
    table
      .integer('genre_id')
      .references('id')
      .inTable('genre');
  })
  .createTable('user_manga', (table) => {
    table.increments().primary();
    table.integer('current_chapter').notNullable().defaultTo(0);
    table
      .integer('manga_id')
      .references('id')
      .inTable('manga');
    table
      .integer('user_id')
      .references('id')
      .inTable('users');
  });

exports.down = (knex) => knex.schema
  .dropTable('users')
  .dropTable('manga_genre')
  .dropTable('user_manga')
  .dropTable('genre')
  .dropTable('type')
  .dropTable('status')
  .dropTable('rating')
  .dropTable('manga');
