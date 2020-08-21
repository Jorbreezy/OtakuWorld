// eslint-disable-next-line arrow-body-style
exports.seed = (knex) => {
  // Deletes ALL existing entries
  return knex('status').del()
    .then(() => knex('status')
      .insert([
        { id: 1, status: 'Completed' },
        { id: 2, status: 'Ongoing' },
      ]));
};
