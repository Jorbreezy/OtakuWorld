// eslint-disable-next-line arrow-body-style
exports.seed = (knex) => {
  // Deletes ALL existing entries
  return knex('manga_genre').del()
    .then(() => knex('manga_genre')
      .insert([
        {
          id: 1,
          manga_id: 1,
          genre_id: 1,
        },
        {
          id: 2,
          manga_id: 1,
          genre_id: 2,
        },
        {
          id: 3,
          manga_id: 1,
          genre_id: 3,
        },
        {
          id: 4,
          manga_id: 2,
          genre_id: 1,
        },
        {
          id: 5,
          manga_id: 2,
          genre_id: 2,
        },
        {
          id: 6,
          manga_id: 2,
          genre_id: 8,
        },
        {
          id: 7,
          manga_id: 3,
          genre_id: 1,
        },
        {
          id: 8,
          manga_id: 3,
          genre_id: 2,
        },
        {
          id: 9,
          manga_id: 3,
          genre_id: 4,
        },
      ]));
};
