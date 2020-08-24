exports.seed = (knex) => (
  // Deletes ALL existing entries
  knex('manga_genre').del()
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
        {
          id: 10,
          manga_id: 4,
          genre_id: 1,
        },
        {
          id: 11,
          manga_id: 4,
          genre_id: 2,
        },
        {
          id: 12,
          manga_id: 4,
          genre_id: 9,
        },
        {
          id: 13,
          manga_id: 5,
          genre_id: 1,
        },
        {
          id: 14,
          manga_id: 5,
          genre_id: 2,
        },
        {
          id: 15,
          manga_id: 5,
          genre_id: 5,
        },
        {
          id: 16,
          manga_id: 6,
          genre_id: 1,
        },
        {
          id: 17,
          manga_id: 6,
          genre_id: 2,
        },
        {
          id: 18,
          manga_id: 6,
          genre_id: 9,
        },
      ])));
