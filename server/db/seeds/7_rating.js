exports.seed = (knex) => (
  // Deletes ALL existing entries
  knex('rating').del()
    .then(() => knex('rating')
      .insert([
        {
          manga_id: 1,
          user_id: 1,
          rating: 4,
        },
        {
          manga_id: 2,
          user_id: 1,
          rating: 5,
        },
        {
          manga_id: 3,
          user_id: 1,
          rating: 2,
        },
        {
          manga_id: 1,
          user_id: 2,
          rating: 2,
        },
        {
          manga_id: 2,
          user_id: 2,
          rating: 5,
        },
        {
          manga_id: 3,
          user_id: 2,
          rating: 3,
        },
      ])));
