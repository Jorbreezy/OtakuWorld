exports.seed = (knex) => (
  // Deletes ALL existing entries
  knex('status').del()
    .then(() => knex('status')
      .insert([
        { status: 'Completed' },
        { status: 'Ongoing' },
      ])));
