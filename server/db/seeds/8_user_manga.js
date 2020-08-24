exports.seed = (knex) => (
  // Deletes ALL existing entries
  knex('user_manga').del()
    .then(() => knex('user_manga')
      .insert([
        {
          id: 1,
          manga_id: 2,
          user_id: 1,
          current_chapter: 10,
        },
        {
          id: 2,
          manga_id: 1,
          user_id: 1,
          current_chapter: 20,
        },
        {
          id: 3,
          manga_id: 3,
          user_id: 2,
          current_chapter: 9,
        },
      ])));
