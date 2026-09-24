import { MovieItem, MovieGenre } from './types';

export const GENRE_METADATA: Record<
  MovieGenre,
  { label: string; icon: string; description: string; color: string }
> = {
  animation: {
    label: 'Animation',
    icon: 'Sparkles',
    description: 'Breathtaking visual animation, Pixar masterpieces & anime epics',
    color: '#38bdf8'
  },
  comedy: {
    label: 'Comedy',
    icon: 'Smile',
    description: 'Side-splitting laughs, witty satyres & feel-good slapstick',
    color: '#facc15'
  },
  action: {
    label: 'Action',
    icon: 'Zap',
    description: 'High-octane thrill rides, superhero sagas & martial arts showdowns',
    color: '#ef4444'
  },
  horror: {
    label: 'Horror',
    icon: 'Ghost',
    description: 'Spine-chilling jump scares, supernatural dread & psychological tension',
    color: '#a855f7'
  },
  family: {
    label: 'Family',
    icon: 'HeartHandshake',
    description: 'Wholesome adventures loved by kids, teens, and parents alike',
    color: '#4ade80'
  },
  classic: {
    label: 'Classic',
    icon: 'Film',
    description: 'Timeless cinematic masterpieces and golden-age legends',
    color: '#f97316'
  },
  scifi: {
    label: 'Sci-Fi',
    icon: 'Rocket',
    description: 'Mind-bending time travel, cyberpunk futures & interstellar voyages',
    color: '#06b6d4'
  },
  drama: {
    label: 'Drama',
    icon: 'Drama',
    description: 'Powerful human emotions, biographical triumphs & poignant stories',
    color: '#e11d48'
  },
  thriller: {
    label: 'Thriller',
    icon: 'Eye',
    description: 'Edge-of-your-seat suspense, heist twists & psychological mysteries',
    color: '#ec4899'
  },
  romance: {
    label: 'Romance',
    icon: 'Heart',
    description: 'Warm rom-coms, passionate heartthrobs & memorable love stories',
    color: '#f43f5e'
  }
};

export const MOVIE_DATABASE: MovieItem[] = [
  // --- ANIMATION ---
  {
    id: 'spider-verse-1',
    title: 'Spider-Man: Into the Spider-Verse',
    year: 2018,
    genre: 'animation',
    secondaryGenre: 'Action',
    rating: 'PG',
    runtimeMinutes: 117,
    director: 'Bob Persichetti, Peter Ramsey, Rodney Rothman',
    synopsis: 'Teenager Miles Morales becomes the new Spider-Man and joins other Spider-Heroes from alternate dimensions to stop a multiverse-threatening Kingpin.',
    streamingPlatforms: ['Netflix', 'Prime Video'],
    modes: ['decision', 'family', 'group']
  },
  {
    id: 'spirited-away',
    title: 'Spirited Away',
    year: 2001,
    genre: 'animation',
    secondaryGenre: 'Fantasy',
    rating: 'PG',
    runtimeMinutes: 125,
    director: 'Hayao Miyazaki',
    synopsis: 'During her family move to the suburbs, a 10-year-old girl wanders into a magical world ruled by gods, witches, and spirits where humans are transformed into beasts.',
    streamingPlatforms: ['Max', 'Apple TV'],
    modes: ['decision', 'family', 'date_night']
  },
  {
    id: 'coco',
    title: 'Coco',
    year: 2017,
    genre: 'animation',
    secondaryGenre: 'Family',
    rating: 'PG',
    runtimeMinutes: 105,
    director: 'Lee Unkrich, Adrian Molina',
    synopsis: 'Aspiring musician Miguel journeys to the dazzling Land of the Dead to unlock the real story behind his family heritage.',
    streamingPlatforms: ['Disney+'],
    modes: ['decision', 'family', 'date_night']
  },
  {
    id: 'shrek-2',
    title: 'Shrek 2',
    year: 2004,
    genre: 'animation',
    secondaryGenre: 'Comedy',
    rating: 'PG',
    runtimeMinutes: 93,
    director: 'Andrew Adamson, Kelly Asbury, Conrad Vernon',
    synopsis: 'Shrek and Fiona travel to the Kingdom of Far Far Away, where Fiona parents discover their new son-in-law is an ogre.',
    streamingPlatforms: ['Hulu', 'Prime Video'],
    modes: ['decision', 'family', 'group']
  },
  {
    id: 'wall-e',
    title: 'WALL-E',
    year: 2008,
    genre: 'animation',
    secondaryGenre: 'Sci-Fi',
    rating: 'G',
    runtimeMinutes: 98,
    director: 'Andrew Stanton',
    synopsis: 'A small waste-collecting robot inadvertently embarks on a space journey that will ultimately decide the fate of mankind.',
    streamingPlatforms: ['Disney+'],
    modes: ['decision', 'family', 'date_night']
  },
  {
    id: 'spider-verse-2',
    title: 'Spider-Man: Across the Spider-Verse',
    year: 2023,
    genre: 'animation',
    secondaryGenre: 'Action',
    rating: 'PG',
    runtimeMinutes: 140,
    director: 'Joaquim Dos Santos, Kemp Powers, Justin K. Thompson',
    synopsis: 'Miles Morales catapults across the Multiverse, where he encounters a team of Spider-People charged with protecting its very existence.',
    streamingPlatforms: ['Netflix'],
    modes: ['decision', 'group']
  },
  {
    id: 'ratatouille',
    title: 'Ratatouille',
    year: 2007,
    genre: 'animation',
    secondaryGenre: 'Comedy',
    rating: 'G',
    runtimeMinutes: 111,
    director: 'Brad Bird',
    synopsis: 'A rat who can cook makes an unusual alliance with a young kitchen worker at a famous Parisian restaurant.',
    streamingPlatforms: ['Disney+'],
    modes: ['decision', 'family', 'date_night']
  },
  {
    id: 'how-to-train-your-dragon',
    title: 'How to Train Your Dragon',
    year: 2010,
    genre: 'animation',
    secondaryGenre: 'Adventure',
    rating: 'PG',
    runtimeMinutes: 98,
    director: 'Dean DeBlois, Chris Sanders',
    synopsis: 'A hapless young Viking who aspires to hunt dragons becomes the unlikely friend of a young dragon himself.',
    streamingPlatforms: ['Prime Video', 'Max'],
    modes: ['decision', 'family', 'group']
  },

  // --- COMEDY ---
  {
    id: 'superbad',
    title: 'Superbad',
    year: 2007,
    genre: 'comedy',
    secondaryGenre: 'Coming-of-age',
    rating: 'R',
    runtimeMinutes: 113,
    director: 'Greg Mottola',
    synopsis: 'Two co-dependent high school seniors are forced to deal with separation anxiety after their plan to stage a booze-soaked party goes awry.',
    streamingPlatforms: ['Netflix', 'Prime Video'],
    modes: ['decision', 'group']
  },
  {
    id: 'the-grand-budapest-hotel',
    title: 'The Grand Budapest Hotel',
    year: 2014,
    genre: 'comedy',
    secondaryGenre: 'Adventure',
    rating: 'R',
    runtimeMinutes: 99,
    director: 'Wes Anderson',
    synopsis: 'A writer encounters the owner of an aging high-class hotel, who tells him of his early years serving as a lobby boy in the hotel glorious years under an exceptional concierge.',
    streamingPlatforms: ['Hulu', 'Apple TV'],
    modes: ['decision', 'date_night', 'group']
  },
  {
    id: 'groundhog-day',
    title: 'Groundhog Day',
    year: 1993,
    genre: 'comedy',
    secondaryGenre: 'Fantasy',
    rating: 'PG',
    runtimeMinutes: 101,
    director: 'Harold Ramis',
    synopsis: 'A narcissistic, self-centered weatherman finds himself in a time loop on Groundhog Day, and the day keeps repeating until he gets it right.',
    streamingPlatforms: ['Prime Video', 'Apple TV'],
    modes: ['decision', 'date_night', 'family']
  },
  {
    id: 'palm-springs',
    title: 'Palm Springs',
    year: 2020,
    genre: 'comedy',
    secondaryGenre: 'Romance',
    rating: 'R',
    runtimeMinutes: 90,
    director: 'Max Barbakow',
    synopsis: 'Stuck in a time loop at a Palm Springs wedding, two guests develop a budding romance while living the same day over and over.',
    streamingPlatforms: ['Hulu'],
    modes: ['decision', 'date_night']
  },
  {
    id: 'shaun-of-the-dead',
    title: 'Shaun of the Dead',
    year: 2004,
    genre: 'comedy',
    secondaryGenre: 'Horror',
    rating: 'R',
    runtimeMinutes: 99,
    director: 'Edgar Wright',
    synopsis: 'An uneventful, aimless 30-something Londoner and his slacker roommate have to fight their way through an unexpected zombie apocalypse.',
    streamingPlatforms: ['Prime Video', 'Max'],
    modes: ['decision', 'group']
  },
  {
    id: 'crazy-rich-asians',
    title: 'Crazy Rich Asians',
    year: 2018,
    genre: 'comedy',
    secondaryGenre: 'Romance',
    rating: 'PG-13',
    runtimeMinutes: 120,
    director: 'Jon M. Chu',
    synopsis: 'A native New Yorker travels to Singapore to meet her boyfriend family and discovers they are one of the wealthiest dynasties in Asia.',
    streamingPlatforms: ['Max', 'Prime Video'],
    modes: ['decision', 'date_night', 'group']
  },
  {
    id: 'knives-out',
    title: 'Knives Out',
    year: 2019,
    genre: 'comedy',
    secondaryGenre: 'Mystery',
    rating: 'PG-13',
    runtimeMinutes: 130,
    director: 'Rian Johnson',
    synopsis: 'A detective investigates the mysterious death of a patriarch of an eccentric, combative family in a lavish estate.',
    streamingPlatforms: ['Netflix', 'Prime Video'],
    modes: ['decision', 'date_night', 'group', 'family']
  },

  // --- ACTION ---
  {
    id: 'mad-max-fury-road',
    title: 'Mad Max: Fury Road',
    year: 2015,
    genre: 'action',
    secondaryGenre: 'Sci-Fi',
    rating: 'R',
    runtimeMinutes: 120,
    director: 'George Miller',
    synopsis: 'In a post-apocalyptic wasteland, a woman rebels against a tyrannical ruler in search of her homeland with the aid of a group of female prisoners and a drifter named Max.',
    streamingPlatforms: ['Max', 'Apple TV'],
    modes: ['decision', 'group']
  },
  {
    id: 'john-wick-4',
    title: 'John Wick: Chapter 4',
    year: 2023,
    genre: 'action',
    secondaryGenre: 'Thriller',
    rating: 'R',
    runtimeMinutes: 169,
    director: 'Chad Stahelski',
    synopsis: 'John Wick uncovers a path to defeating the High Table, but before he can earn his freedom, Wick must face off against a new enemy with powerful alliances across the globe.',
    streamingPlatforms: ['Prime Video', 'Apple TV'],
    modes: ['decision', 'group']
  },
  {
    id: 'top-gun-maverick',
    title: 'Top Gun: Maverick',
    year: 2022,
    genre: 'action',
    secondaryGenre: 'Drama',
    rating: 'PG-13',
    runtimeMinutes: 130,
    director: 'Joseph Kosinski',
    synopsis: 'After thirty years, Maverick is still pushing the envelope as a top naval aviator, but must confront ghosts of his past when he leads TOP GUN elite graduates on a dangerous mission.',
    streamingPlatforms: ['Prime Video', 'Apple TV'],
    modes: ['decision', 'group', 'family']
  },
  {
    id: 'the-dark-knight',
    title: 'The Dark Knight',
    year: 2008,
    genre: 'action',
    secondaryGenre: 'Crime',
    rating: 'PG-13',
    runtimeMinutes: 152,
    director: 'Christopher Nolan',
    synopsis: 'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.',
    streamingPlatforms: ['Max', 'Prime Video'],
    modes: ['decision', 'group']
  },
  {
    id: 'everything-everywhere',
    title: 'Everything Everywhere All at Once',
    year: 2022,
    genre: 'action',
    secondaryGenre: 'Sci-Fi',
    rating: 'R',
    runtimeMinutes: 139,
    director: 'Daniel Kwan, Daniel Scheinert',
    synopsis: 'A middle-aged Chinese immigrant is swept up into an insane adventure in which she alone can save existence by exploring other universes and connecting with the lives she could have led.',
    streamingPlatforms: ['Prime Video', 'Apple TV'],
    modes: ['decision', 'date_night', 'group']
  },
  {
    id: 'mission-impossible-fallout',
    title: 'Mission: Impossible - Fallout',
    year: 2018,
    genre: 'action',
    secondaryGenre: 'Thriller',
    rating: 'PG-13',
    runtimeMinutes: 147,
    director: 'Christopher McQuarrie',
    synopsis: 'Ethan Hunt and his IMF team, along with some familiar allies, race against time after a mission goes wrong.',
    streamingPlatforms: ['Prime Video', 'Apple TV'],
    modes: ['decision', 'group']
  },

  // --- HORROR ---
  {
    id: 'get-out',
    title: 'Get Out',
    year: 2017,
    genre: 'horror',
    secondaryGenre: 'Thriller',
    rating: 'R',
    runtimeMinutes: 104,
    director: 'Jordan Peele',
    synopsis: 'A young African-American visits his White girlfriend parents for the weekend, where his simmering uneasiness about their reception of him eventually reaches a boiling point.',
    streamingPlatforms: ['Prime Video', 'Apple TV'],
    modes: ['decision', 'date_night', 'group']
  },
  {
    id: 'a-quiet-place',
    title: 'A Quiet Place',
    year: 2018,
    genre: 'horror',
    secondaryGenre: 'Sci-Fi',
    rating: 'PG-13',
    runtimeMinutes: 90,
    director: 'John Krasinski',
    synopsis: 'A family struggles for survival in a world where most humans have been killed by blind but noise-sensitive creatures. They are forced to communicate in sign language to keep the creatures at bay.',
    streamingPlatforms: ['Prime Video', 'Max'],
    modes: ['decision', 'date_night', 'group']
  },
  {
    id: 'hereditary',
    title: 'Hereditary',
    year: 2018,
    genre: 'horror',
    secondaryGenre: 'Drama',
    rating: 'R',
    runtimeMinutes: 127,
    director: 'Ari Aster',
    synopsis: 'A grieving family is haunted by tragic and disturbing occurrences after the death of their secretive grandmother.',
    streamingPlatforms: ['Max', 'Prime Video'],
    modes: ['decision', 'group']
  },
  {
    id: 'the-shining',
    title: 'The Shining',
    year: 1980,
    genre: 'horror',
    secondaryGenre: 'Classic',
    rating: 'R',
    runtimeMinutes: 146,
    director: 'Stanley Kubrick',
    synopsis: 'A family heads to an isolated hotel for the winter where a sinister presence influences the father into violence, while his psychic son sees horrific forebodings from both past and future.',
    streamingPlatforms: ['Max', 'Apple TV'],
    modes: ['decision', 'group']
  },
  {
    id: 'talk-to-me',
    title: 'Talk to Me',
    year: 2022,
    genre: 'horror',
    secondaryGenre: 'Thriller',
    rating: 'R',
    runtimeMinutes: 95,
    director: 'Danny Philippou, Michael Philippou',
    synopsis: 'When a group of friends discover how to conjure spirits using an embalmed hand, they become hooked on the new thrill, until one of them goes too far and unleashes terrifying supernatural forces.',
    streamingPlatforms: ['Netflix', 'Prime Video'],
    modes: ['decision', 'group']
  },
  {
    id: 'the-conjuring',
    title: 'The Conjuring',
    year: 2013,
    genre: 'horror',
    secondaryGenre: 'Mystery',
    rating: 'R',
    runtimeMinutes: 112,
    director: 'James Wan',
    synopsis: 'Paranormal investigators Ed and Lorraine Warren work to help a family terrorized by a dark presence in their secluded farmhouse.',
    streamingPlatforms: ['Max', 'Apple TV'],
    modes: ['decision', 'date_night', 'group']
  },

  // --- FAMILY ---
  {
    id: 'paddington-2',
    title: 'Paddington 2',
    year: 2017,
    genre: 'family',
    secondaryGenre: 'Comedy',
    rating: 'PG',
    runtimeMinutes: 103,
    director: 'Paul King',
    synopsis: 'Paddington, now happily settled with the Brown family and a popular member of the local community, picks up odd jobs to buy a unique pop-up book for his aunt 100th birthday.',
    streamingPlatforms: ['Prime Video', 'Apple TV'],
    modes: ['decision', 'family', 'date_night']
  },
  {
    id: 'the-princess-bride',
    title: 'The Princess Bride',
    year: 1987,
    genre: 'family',
    secondaryGenre: 'Classic',
    rating: 'PG',
    runtimeMinutes: 98,
    director: 'Rob Reiner',
    synopsis: 'A bedridden boy grandfather reads him the story of a farmboy-turned-pirate who encounters numerous obstacles, enemies and allies in his quest to be reunited with his true love.',
    streamingPlatforms: ['Disney+', 'Prime Video'],
    modes: ['decision', 'family', 'date_night']
  },
  {
    id: 'home-alone',
    title: 'Home Alone',
    year: 1990,
    genre: 'family',
    secondaryGenre: 'Comedy',
    rating: 'PG',
    runtimeMinutes: 103,
    director: 'Chris Columbus',
    synopsis: 'An eight-year-old troublemaker, accidentally left home alone by his family during Christmas vacation, must protect his house from a pair of burglars.',
    streamingPlatforms: ['Disney+'],
    modes: ['decision', 'family', 'group']
  },
  {
    id: 'harry-potter-1',
    title: 'Harry Potter and the Sorcerer Stone',
    year: 2001,
    genre: 'family',
    secondaryGenre: 'Fantasy',
    rating: 'PG',
    runtimeMinutes: 152,
    director: 'Chris Columbus',
    synopsis: 'An orphaned boy enrolls in a school of wizardry, where he learns the truth about himself, his family and the terrible evil that haunts the magical world.',
    streamingPlatforms: ['Max', 'Prime Video'],
    modes: ['decision', 'family', 'group']
  },
  {
    id: 'the-lion-king',
    title: 'The Lion King',
    year: 1994,
    genre: 'family',
    secondaryGenre: 'Animation',
    rating: 'G',
    runtimeMinutes: 88,
    director: 'Roger Allers, Rob Minkoff',
    synopsis: 'Lion prince Simba and his father are targeted by his bitter uncle, who wants to ascend the throne himself.',
    streamingPlatforms: ['Disney+'],
    modes: ['decision', 'family']
  },
  {
    id: 'wonka',
    title: 'Wonka',
    year: 2023,
    genre: 'family',
    secondaryGenre: 'Musical',
    rating: 'PG',
    runtimeMinutes: 116,
    director: 'Paul King',
    synopsis: 'With dreams of opening a shop in a city renowned for its chocolate, a young and poor Willy Wonka discovers that the industry is run by a cartel of greedy chocolatiers.',
    streamingPlatforms: ['Max', 'Prime Video'],
    modes: ['decision', 'family', 'date_night']
  },

  // --- CLASSIC ---
  {
    id: 'casablanca',
    title: 'Casablanca',
    year: 1942,
    genre: 'classic',
    secondaryGenre: 'Drama',
    rating: 'PG',
    runtimeMinutes: 102,
    director: 'Michael Curtiz',
    synopsis: 'A cynical expatriate American cafe owner struggles to decide whether or not to help his former lover and her fugitive husband escape the Nazis in French Morocco.',
    streamingPlatforms: ['Max', 'Apple TV'],
    modes: ['decision', 'date_night']
  },
  {
    id: 'back-to-the-future',
    title: 'Back to the Future',
    year: 1985,
    genre: 'classic',
    secondaryGenre: 'Sci-Fi',
    rating: 'PG',
    runtimeMinutes: 116,
    director: 'Robert Zemeckis',
    synopsis: 'Marty McFly, a 17-year-old high school student, is accidentally sent thirty years into the past in a time-traveling DeLorean invented by his close friend, the eccentric scientist Doc Brown.',
    streamingPlatforms: ['Prime Video', 'Apple TV'],
    modes: ['decision', 'family', 'group']
  },
  {
    id: 'jurassic-park',
    title: 'Jurassic Park',
    year: 1993,
    genre: 'classic',
    secondaryGenre: 'Action',
    rating: 'PG-13',
    runtimeMinutes: 127,
    director: 'Steven Spielberg',
    synopsis: 'A pragmatic paleontologist touring an almost complete theme park on an island in Central America is tasked with protecting a couple of kids after a power failure causes the cloned dinosaurs to run loose.',
    streamingPlatforms: ['Prime Video', 'Apple TV'],
    modes: ['decision', 'family', 'group']
  },
  {
    id: 'raiders-of-the-lost-ark',
    title: 'Raiders of the Lost Ark',
    year: 1981,
    genre: 'classic',
    secondaryGenre: 'Action',
    rating: 'PG',
    runtimeMinutes: 115,
    director: 'Steven Spielberg',
    synopsis: 'In 1936, archaeologist and adventurer Indiana Jones is hired by the U.S. government to find the Ark of the Covenant before Adolf Hitler Nazis can obtain its awesome powers.',
    streamingPlatforms: ['Disney+', 'Prime Video'],
    modes: ['decision', 'family', 'group']
  },
  {
    id: 'the-godfather',
    title: 'The Godfather',
    year: 1972,
    genre: 'classic',
    secondaryGenre: 'Crime',
    rating: 'R',
    runtimeMinutes: 175,
    director: 'Francis Ford Coppola',
    synopsis: 'The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant youngest son.',
    streamingPlatforms: ['Paramount+', 'Apple TV'],
    modes: ['decision', 'group']
  },

  // --- SCI-FI ---
  {
    id: 'interstellar',
    title: 'Interstellar',
    year: 2014,
    genre: 'scifi',
    secondaryGenre: 'Adventure',
    rating: 'PG-13',
    runtimeMinutes: 169,
    director: 'Christopher Nolan',
    synopsis: 'When Earth becomes uninhabitable in the future, a farmer and ex-NASA pilot, Joseph Cooper, is tasked to pilot a spacecraft, along with a team of researchers, to find a new planet for humans.',
    streamingPlatforms: ['Prime Video', 'Apple TV'],
    modes: ['decision', 'date_night', 'group']
  },
  {
    id: 'dune-part-two',
    title: 'Dune: Part Two',
    year: 2024,
    genre: 'scifi',
    secondaryGenre: 'Action',
    rating: 'PG-13',
    runtimeMinutes: 166,
    director: 'Denis Villeneuve',
    synopsis: 'Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family.',
    streamingPlatforms: ['Max', 'Apple TV'],
    modes: ['decision', 'group']
  },
  {
    id: 'inception',
    title: 'Inception',
    year: 2010,
    genre: 'scifi',
    secondaryGenre: 'Action',
    rating: 'PG-13',
    runtimeMinutes: 148,
    director: 'Christopher Nolan',
    synopsis: 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.',
    streamingPlatforms: ['Max', 'Prime Video'],
    modes: ['decision', 'date_night', 'group']
  },
  {
    id: 'the-matrix',
    title: 'The Matrix',
    year: 1999,
    genre: 'scifi',
    secondaryGenre: 'Action',
    rating: 'R',
    runtimeMinutes: 136,
    director: 'Lana Wachowski, Lilly Wachowski',
    synopsis: 'When a beautiful stranger leads computer hacker Neo to a forbidding underworld, he discovers the shocking truth: the life he knows is the elaborate deception of an evil cyber-intelligence.',
    streamingPlatforms: ['Max', 'Apple TV'],
    modes: ['decision', 'group']
  },

  // --- DRAMA & THRILLER ---
  {
    id: 'oppenheimer',
    title: 'Oppenheimer',
    year: 2023,
    genre: 'drama',
    secondaryGenre: 'History',
    rating: 'R',
    runtimeMinutes: 180,
    director: 'Christopher Nolan',
    synopsis: 'The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb during World War II.',
    streamingPlatforms: ['Prime Video', 'Apple TV'],
    modes: ['decision', 'date_night']
  },
  {
    id: 'parasite',
    title: 'Parasite',
    year: 2019,
    genre: 'thriller',
    secondaryGenre: 'Drama',
    rating: 'R',
    runtimeMinutes: 132,
    director: 'Bong Joon Ho',
    synopsis: 'Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan.',
    streamingPlatforms: ['Max', 'Hulu'],
    modes: ['decision', 'date_night', 'group']
  },
  {
    id: 'whiplash',
    title: 'Whiplash',
    year: 2014,
    genre: 'drama',
    secondaryGenre: 'Music',
    rating: 'R',
    runtimeMinutes: 106,
    director: 'Damien Chazelle',
    synopsis: 'A promising young drummer enrolls at a cut-throat music conservatory where his dreams of greatness are mentored by an instructor who will stop at nothing to realize a student potential.',
    streamingPlatforms: ['Netflix', 'Apple TV'],
    modes: ['decision', 'date_night']
  },
  {
    id: 'the-prestige',
    title: 'The Prestige',
    year: 2006,
    genre: 'thriller',
    secondaryGenre: 'Mystery',
    rating: 'PG-13',
    runtimeMinutes: 130,
    director: 'Christopher Nolan',
    synopsis: 'After a tragic accident, two stage magicians in 1890s London engage in a battle to create the ultimate illusion while sacrificing everything they have to outwit each other.',
    streamingPlatforms: ['Apple TV', 'Prime Video'],
    modes: ['decision', 'date_night', 'group']
  },

  // --- ROMANCE ---
  {
    id: 'la-la-land',
    title: 'La La Land',
    year: 2016,
    genre: 'romance',
    secondaryGenre: 'Musical',
    rating: 'PG-13',
    runtimeMinutes: 128,
    director: 'Damien Chazelle',
    synopsis: 'While navigating their careers in Los Angeles, a pianist and an actress fall in love while attempting to reconcile their aspirations for the future.',
    streamingPlatforms: ['Netflix', 'Prime Video'],
    modes: ['decision', 'date_night']
  },
  {
    id: 'about-time',
    title: 'About Time',
    year: 2013,
    genre: 'romance',
    secondaryGenre: 'Sci-Fi',
    rating: 'R',
    runtimeMinutes: 123,
    director: 'Richard Curtis',
    synopsis: 'At the age of 21, Tim discovers he can travel in time and change what happens and has happened in his own life. His decision to make his world a better place by getting a girlfriend turns out to be not as easy as you might think.',
    streamingPlatforms: ['Prime Video', 'Apple TV'],
    modes: ['decision', 'date_night']
  },
  {
    id: 'past-lives',
    title: 'Past Lives',
    year: 2023,
    genre: 'romance',
    secondaryGenre: 'Drama',
    rating: 'PG-13',
    runtimeMinutes: 105,
    director: 'Celine Song',
    synopsis: 'Nora and Hae Sung, two deeply connected childhood friends, are wrested apart after Nora family emigrates from South Korea. Two decades later, they are reunited in New York for one fateful week as they confront notions of destiny, love, and the choices that make a life.',
    streamingPlatforms: ['Prime Video', 'Apple TV'],
    modes: ['decision', 'date_night']
  },
  {
    id: 'pride-and-prejudice',
    title: 'Pride & Prejudice',
    year: 2005,
    genre: 'romance',
    secondaryGenre: 'Drama',
    rating: 'PG',
    runtimeMinutes: 129,
    director: 'Joe Wright',
    synopsis: 'Sparks fly when spirited Elizabeth Bennet meets single, rich, and proud Mr. Darcy. But Mr. Darcy reluctantly finds himself falling in love with a woman beneath his class.',
    streamingPlatforms: ['Netflix', 'Prime Video'],
    modes: ['decision', 'date_night']
  }
];

export const PRESET_WATCHLISTS: { name: string; description: string; movies: string[] }[] = [
  {
    name: 'Top 10 Crowd Pleasers',
    description: 'Guaranteed hits that everyone in the room will love.',
    movies: [
      'Spider-Man: Into the Spider-Verse',
      'Knives Out',
      'Top Gun: Maverick',
      'The Grand Budapest Hotel',
      'Back to the Future',
      'A Quiet Place',
      'Everything Everywhere All at Once',
      'Paddington 2',
      'Shaun of the Dead',
      'Coco'
    ]
  },
  {
    name: 'Cozy Date Night Picks',
    description: 'Witty rom-coms, lush visuals, and heartwarming romantic stories.',
    movies: [
      'La La Land',
      'About Time',
      'Palm Springs',
      'Crazy Rich Asians',
      'Past Lives',
      'Pride & Prejudice',
      'The Princess Bride',
      'Spirited Away'
    ]
  },
  {
    name: 'Family & Kids Animation',
    description: 'Wholesome G and PG adventures for all generations.',
    movies: [
      'Spider-Man: Into the Spider-Verse',
      'Coco',
      'WALL-E',
      'Ratatouille',
      'How to Train Your Dragon',
      'Paddington 2',
      'The Lion King',
      'Home Alone',
      'Shrek 2'
    ]
  },
  {
    name: 'High-Octane Action & Sci-Fi',
    description: 'Edge-of-your-seat blockbusters and mind-bending space thrillers.',
    movies: [
      'Mad Max: Fury Road',
      'The Dark Knight',
      'John Wick: Chapter 4',
      'Inception',
      'Interstellar',
      'Dune: Part Two',
      'The Matrix',
      'Mission: Impossible - Fallout'
    ]
  },
  {
    name: 'Spooky & Thriller Night',
    description: 'Tense mysteries and spine-chilling horror favorites.',
    movies: [
      'Get Out',
      'A Quiet Place',
      'The Conjuring',
      'Talk to Me',
      'Hereditary',
      'Parasite',
      'The Shining',
      'Knives Out'
    ]
  }
];
