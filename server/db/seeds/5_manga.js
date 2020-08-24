exports.seed = (knex) => (
  // Deletes ALL existing entries
  knex('manga')
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
        {
          id: 4,
          title: 'Maou Gakuin no Futekigousha',
          author: 'Shuu',
          description: `The demon lord of tyranny, Anoth, destroyed humans, spirits, and even gods.
          But, growing tired of the neverending war, he dreams of a peaceful world and chooses to reincarnate.
          Unfortunately, two thousand years in the future, his descendants have become weak from the years of peace, and magic has atrophied.
          Anoth enrolls in a "Demon Lord Academy" dedicated to finding him - the demon lord's reincarnation - but the academy fails to recognize his strength,
          and labels him as unqualified. 
          Amidst those who underestimate him, along with his single ally Misha, this demon lord unqualified as a demon lord will race up the demonfolk hierarchy!`,
          thumbnail: 'https://mangadex.org/images/manga/31962.jpg?1594191037',
          chapters: 20,
          status: 2,
          type: 1,
        },
        {
          id: 5,
          title: 'Solo Leveling',
          author: 'Chugong 추공',
          description: `10 years ago, after “the Gate” that connected the real world with the monster world opened, some of the ordinary, everyday people received the power to hunt monsters within the Gate.
          They are known as "Hunters". However, not all Hunters are powerful. My name is Sung Jin-Woo, an E-rank Hunter. 
          I'm someone who has to risk his life in the lowliest of dungeons, the "World's Weakest". 
          Having no skills whatsoever to display, 
          I barely earned the required money by fighting in low-leveled dungeons… at least until I found a hidden dungeon with the hardest difficulty within the D-rank dungeons! 
          In the end, as I was accepting death, I suddenly received a strange power,
          a quest log that only I could see, a secret to leveling up that only I know about! If I trained in accordance with my quests and hunted monsters, 
          my level would rise. Changing from the weakest Hunter to the strongest S-rank Hunter!`,
          thumbnail: 'https://mangadex.org/images/manga/31477.jpeg?1596241657',
          chapters: 115,
          status: 2,
          type: 2,
        },
        {
          id: 6,
          title: 'Tales of Demons and Gods',
          author: 'Fuse',
          description: `Nie Li, the strongest Demon Spiritist in his past life standing at the pinnacle of the martial world. 
          However, he lost his life during the battle with Sage Emperor and the six deity ranked beast, his soul was then reborn back in time back to when he is still 13. 
          Although he's the weakest in his class with the lowest talent at only Red soul realm, but with the aid of the vast knowledge which he accumulated from his previous life, 
          he trained faster then anyone. Trying to protect the city which in the coming future was being assaulted by beast and ended up being destroyed as well as protecting his lover, 
          friends and family who died by the beast assault. And to destroy the Sacred family whom abandon their duty and betrayed city in his past life.`,
          thumbnail: 'https://www.anime-planet.com/images/manga/covers/yaoshenji-novel-17531.jpg?t=1440366082',
          chapters: 492,
          status: 2,
          type: 3,
        },
      ])));
