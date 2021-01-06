exports.seed = (knex) => (
  // Deletes ALL existing entries
  knex('user_manga').del()
    .then(() => knex('user_manga')
      .insert([
        {
          manga_id: 2,
          user_id: 1,
          current_chapter: 10,
        },
        {
          manga_id: 1,
          user_id: 1,
          current_chapter: 20,
        },
        {
          manga_id: 3,
          user_id: 2,
          current_chapter: 9,
        },
      ])));
