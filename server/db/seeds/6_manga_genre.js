exports.seed = (knex) => (
  // Deletes ALL existing entries
  knex('manga_genre').del()
    .then(() => knex('manga_genre')
      .insert([
        {
          manga_id: 1,
          genre_id: 1,
        },
        {
          manga_id: 1,
          genre_id: 2,
        },
        {
          manga_id: 1,
          genre_id: 3,
        },
        {
          manga_id: 2,
          genre_id: 1,
        },
        {
          manga_id: 2,
          genre_id: 2,
        },
        {
          manga_id: 2,
          genre_id: 8,
        },
        {
          manga_id: 3,
          genre_id: 1,
        },
        {
          manga_id: 3,
          genre_id: 2,
        },
        {
          manga_id: 3,
          genre_id: 4,
        },
        {
          manga_id: 4,
          genre_id: 1,
        },
        {
          manga_id: 4,
          genre_id: 2,
        },
        {
          manga_id: 4,
          genre_id: 9,
        },
        {
          manga_id: 5,
          genre_id: 1,
        },
        {
          manga_id: 5,
          genre_id: 2,
        },
        {
          manga_id: 5,
          genre_id: 5,
        },
        {
          manga_id: 6,
          genre_id: 1,
        },
        {
          manga_id: 6,
          genre_id: 2,
        },
        {
          manga_id: 6,
          genre_id: 9,
        },
      ])));
