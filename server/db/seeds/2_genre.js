// eslint-disable-next-line arrow-body-style
exports.seed = (knex) => {
  // Deletes ALL existing entries
  return knex('genre').del()
    .then(() => knex('genre')
      .insert([
        { id: 1, genre: 'Action' },
        { id: 2, genre: 'Adventure' },
        { id: 3, genre: 'Drama' },
        { id: 4, genre: 'Comedy' },
        { id: 5, genre: 'Fantasy' },
        { id: 6, genre: 'Horror' },
        { id: 7, genre: 'Slice of life' },
        { id: 8, genre: 'Martial Arts' },
        { id: 9, genre: 'Romance' },
        { id: 10, genre: 'Sci-fi' },
        { id: 11, genre: 'Psychological' },
        { id: 12, genre: 'Shounen' },
        { id: 13, genre: 'Supernatural' },
        { id: 14, genre: 'Seinen' },
        { id: 15, genre: 'Sports' },
        { id: 16, genre: 'Tragedy' },
      ]));
};
