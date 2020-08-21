// eslint-disable-next-line arrow-body-style
exports.seed = (knex) => {
  // Deletes ALL existing entries
  return knex('manga')
    .del()
    .then(() => knex('manga')
      .insert([
        {
          id: 1,
          title: 'Dimensional Mercenary',
          author: 'Keum Ho',
          description: `Would you like to find a job? 
          Even at the cost of your soul? If so, then you’ve found the right place. 
          Our job hunting advice website, SoSe, is a site geared towards those willing to even sell their souls for employment; 
          that’s right, people like you. Are you dealing with angels or demons? 
          30-year old freeloader Chul Ho Kang made a deal through this shady site, even selling his soul for the chance at what else? 
          Money! An invitation to the other world for the weak and downtrodden of society for a chance to change their lot in life! That is the mission given to Chul Ho Kang! `,
          thumbnail: 'rowValue1',
          chapters: 128,
          status: 2,
          type: 2,
        },
        {
          id: 2,
          title: 'Panlong',
          author: 'Jia San Shao TANG',
          description: `Linley is a young noble of a declining, once-powerful clan which once dominated the world.
          He has large aspirations and wants to save his clan. 
          Linley's journey begins with an accident when he discovers a ring. 
          He took a liking to this ring, which had a dragon carved coiling around it.
          Upon being injured during a battle between two powerful fighters he discovers that his ring is not what he thought it was and possesses powers beyond his imagination.`,
          thumbnail: 'https://www.anime-planet.com/images/manga/covers/panlong-17140.jpg?t=1511638400',
          chapters: 170,
          status: 1,
          type: 3,
        },
        {
          id: 3,
          title: 'Tensei Shitara Slime Datta Ken',
          author: 'Fuse',
          description: `The ordinary Minami Satoru found himself dying after being stabbed by a slasher. 
          It should have been the end of his meager 37 years, but he found himself deaf and blind after hearing a mysterious voice. 
          He had been reincarnated into a slime! While complaining about becoming the weak but famous slime and enjoying the life of a slime at the same time, 
          Minami Satoru met with the Catastrophe-level monster “Storm Dragon Veldora”, and his fate began to move.`,
          thumbnail: 'https://mangadex.org/images/manga/15553.jpg?1595952670',
          chapters: 73,
          status: 2,
          type: 1,
        },
      ]));
};
