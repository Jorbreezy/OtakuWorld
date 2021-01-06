exports.seed = (knex) => (
  // Deletes ALL existing entries
  knex('genre').del()
    .then(() => knex('genre')
      .insert([
        { genre: 'Action' },
        { genre: 'Adventure' },
        { genre: 'Drama' },
        { genre: 'Comedy' },
        { genre: 'Fantasy' },
        { genre: 'Horror' },
        { genre: 'Slice of life' },
        { genre: 'Martial Arts' },
        { genre: 'Romance' },
        { genre: 'Sci-fi' },
        { genre: 'Psychological' },
        { genre: 'Shounen' },
        { genre: 'Supernatural' },
        { genre: 'Seinen' },
        { genre: 'Sports' },
        { genre: 'Tragedy' },
      ])));
