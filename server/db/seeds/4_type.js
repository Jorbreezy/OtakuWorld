exports.seed = (knex) => (
  // Deletes ALL existing entries
  knex('type').del()
    .then(() => knex('type')
      .insert([
        { type: 'Manga' },
        { type: 'Webtoon' },
        { type: 'Manhua' },
      ])));
