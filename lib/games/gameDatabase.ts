export type GameCategory =
  | 'party'
  | 'board'
  | 'card'
  | 'two-player'
  | 'group'
  | 'classroom'
  | 'quick';

export interface GameItem {
  id: string;
  name: string;
  category: GameCategory;
  players: string; // e.g. "4-10 players", "2 players", "Entire class"
  playtime: string; // e.g. "15-30 mins"
  difficulty: 'Easy' | 'Medium' | 'Challenging';
  description: string;
  howToPlay: string;
  setupTips: string;
  tags: string[];
}

export const GAME_DATABASE: GameItem[] = [
  // ==========================================
  // 1. PARTY GAMES
  // ==========================================
  {
    id: 'pty-1',
    name: 'Charades (Celebrity & Actions)',
    category: 'party',
    players: '4-16 players',
    playtime: '20-45 mins',
    difficulty: 'Easy',
    description: 'The timeless non-verbal pantomime game where teammates race to guess actions, movie scenes, or historical icons.',
    howToPlay: 'One player silently acts out a secret word or phrase without speaking or pointing at room objects while their team guesses against a 60-second timer.',
    setupTips: 'Divide into two teams. Prepare slips with movie titles, animals, and hilarious actions.',
    tags: ['Classic', 'Acting', 'No Equipment', 'Icebreaker']
  },
  {
    id: 'pty-2',
    name: 'Codenames',
    category: 'party',
    players: '4-8+ players',
    playtime: '15-30 mins',
    difficulty: 'Medium',
    description: 'Two rival spymasters give clever one-word clues pointing to secret agent words on a 5x5 grid while dodging the Assassin.',
    howToPlay: 'Spymasters give a one-word clue plus a number (e.g., "Water, 2"). Field operatives tap grid cards trying to find their team\'s agents.',
    setupTips: 'Lay out 25 word cards in a 5x5 grid. Spymasters sit together opposite the field operatives.',
    tags: ['Wordplay', 'Deduction', 'Team vs Team']
  },
  {
    id: 'pty-3',
    name: 'Mafia / Werewolf',
    category: 'party',
    players: '7-20 players',
    playtime: '30-50 mins',
    difficulty: 'Medium',
    description: 'Social deduction mystery where an uninformed majority of villagers must identify and execute the secret conspirators before night falls.',
    howToPlay: 'Moderator orchestrates night phase where the secret mafia eliminates a player, followed by intense day trials and public voting.',
    setupTips: 'Designate an enthusiastic moderator. Ensure cards or roles are dealt in secret.',
    tags: ['Social Deduction', 'Bluffing', 'Large Groups']
  },
  {
    id: 'pty-4',
    name: 'Telestrations (Eat Poop You Cat)',
    category: 'party',
    players: '4-12 players',
    playtime: '20-35 mins',
    difficulty: 'Easy',
    description: 'The visual telephone game where sketches and secret guesses mutate into hilarious misunderstandings.',
    howToPlay: 'Draw a secret word, pass the booklet, next person guesses what was drawn, then next person draws that guess. Reveal the hilarious chain!',
    setupTips: 'Give every player paper and a pen. Everyone starts with a different funny prompt.',
    tags: ['Drawing', 'Humor', 'Creative']
  },
  {
    id: 'pty-5',
    name: 'Fishbowl',
    category: 'party',
    players: '6-14 players',
    playtime: '30-45 mins',
    difficulty: 'Easy',
    description: 'A 3-round party mashup where the same set of secret words is played across Catchphrase, Charades, and Password.',
    howToPlay: 'Round 1: Describe with any words (no rhymes). Round 2: Act out with charades only. Round 3: One single word clue only!',
    setupTips: 'Have each player write 3 nouns/phrases on paper strips and toss them into a central bowl.',
    tags: ['High Energy', 'Memory', 'Trivia']
  },
  {
    id: 'pty-6',
    name: 'Heads Up! / Celebrity',
    category: 'party',
    players: '3-12 players',
    playtime: '15-25 mins',
    difficulty: 'Easy',
    description: 'Guess the secret name displayed on your forehead based on frantic shouted clues from your friends.',
    howToPlay: 'Hold a card or phone against your forehead. Friends shout clues, rhymes, or act out scenes before the 60-second buzzer sounds.',
    setupTips: 'Use sticky notes on foreheads or a deck of celebrity cards.',
    tags: ['Fast Paced', 'Pop Culture', 'Laughter']
  },
  {
    id: 'pty-7',
    name: 'Monikers',
    category: 'party',
    players: '4-16 players',
    playtime: '30-45 mins',
    difficulty: 'Easy',
    description: 'Fast, hilarious party game where you describe absurd cultural figures across escalating rounds of verbal and pantomime rules.',
    howToPlay: 'Teams cycle through 60-second turns guessing goofy cards, with clues strictly restricted round by round.',
    setupTips: 'Pick 40-50 funny cards from the deck for a 3-round marathon.',
    tags: ['Humor', 'Party Favorite']
  },

  // ==========================================
  // 2. BOARD GAMES
  // ==========================================
  {
    id: 'brd-1',
    name: 'Catan (Settlers of Catan)',
    category: 'board',
    players: '3-4 players',
    playtime: '60-90 mins',
    difficulty: 'Medium',
    description: 'Harvest wood, brick, sheep, wheat, and ore to build roads and settlements across the modular hex island of Catan.',
    howToPlay: 'Roll dice each turn to generate resources. Trade vigorously with rivals, build settlements, and reach 10 Victory Points first.',
    setupTips: 'Randomize hex tiles and number tokens for fresh resource strategies every match.',
    tags: ['Trading', 'Resource Management', 'Modern Classic']
  },
  {
    id: 'brd-2',
    name: 'Ticket to Ride',
    category: 'board',
    players: '2-5 players',
    playtime: '45-60 mins',
    difficulty: 'Easy',
    description: 'Cross-country train adventure where players collect colored train cards to claim railway routes connecting iconic cities.',
    howToPlay: 'On your turn, draw train cards, claim a route by matching colors, or draw destination tickets for big endgame bonuses.',
    setupTips: 'Hand each player 45 colored plastic train cars and 3 initial destination tickets.',
    tags: ['Route Building', 'Family Friendly', 'Gateway Game']
  },
  {
    id: 'brd-3',
    name: 'Azul',
    category: 'board',
    players: '2-4 players',
    playtime: '30-45 mins',
    difficulty: 'Easy',
    description: 'Tile-placement masterpiece where artisans draft exquisite ceramic Moorish tiles to decorate the royal Palace of Evora.',
    howToPlay: 'Draft tiles from factory displays into pattern lines. Score points for completed rows and columns while avoiding floor penalties.',
    setupTips: 'Place 5 to 9 factory displays in the center based on player count.',
    tags: ['Abstract', 'Tactical', 'Beautiful Art']
  },
  {
    id: 'brd-4',
    name: 'Carcassonne',
    category: 'board',
    players: '2-5 players',
    playtime: '35-45 mins',
    difficulty: 'Easy',
    description: 'Medieval tile-laying game where players draw and place landscape tiles to construct walled cities, monasteries, and roads.',
    howToPlay: 'Draw one landscape tile, connect it logically to existing terrain, and choose whether to claim it with one of your wooden meeples.',
    setupTips: 'Place the dark starting tile in the center of a wide table with plenty of room to expand.',
    tags: ['Tile Placement', 'Meeples', 'Relaxing Strategy']
  },
  {
    id: 'brd-5',
    name: 'Pandemic',
    category: 'board',
    players: '2-4 players',
    playtime: '45-60 mins',
    difficulty: 'Medium',
    description: 'High-stakes cooperative board game where specialized disease-fighting specialists race to cure 4 deadly global outbreaks.',
    howToPlay: 'Work together sharing cards, treating infection hotspots, and building research stations before outbreaks spiral out of control.',
    setupTips: 'Adjust the difficulty by seeding 4, 5, or 6 Epidemic cards into the player deck.',
    tags: ['Cooperative', 'Tense', 'Team Strategy']
  },
  {
    id: 'brd-6',
    name: 'Wingspan',
    category: 'board',
    players: '1-5 players',
    playtime: '40-70 mins',
    difficulty: 'Medium',
    description: 'Engine-building strategy game where bird enthusiasts discover and attract a vibrant aviary of bird species to wildlife preserves.',
    howToPlay: 'Gather food dice, lay pastel eggs, and play bird cards that chain powerful automated habitat powers across 4 rounds.',
    setupTips: 'Roll the wooden food dice into the birdfeeder dice tower and draw bonus cards.',
    tags: ['Engine Building', 'Nature', 'Award Winner']
  },

  // ==========================================
  // 3. CARD GAMES
  // ==========================================
  {
    id: 'crd-1',
    name: 'Exploding Kittens',
    category: 'card',
    players: '2-5 players',
    playtime: '15 mins',
    difficulty: 'Easy',
    description: 'A kitty-powered Russian roulette card game filled with laser pointers, belly rubs, and thermonuclear kittens.',
    howToPlay: 'Play cards from your hand to attack, skip, or peek at the deck. End your turn by drawing a card—draw an Exploding Kitten and you are out unless defused!',
    setupTips: 'Always insert 1 fewer Exploding Kitten cards than the number of active players.',
    tags: ['Russian Roulette', 'Fast', 'Silly']
  },
  {
    id: 'crd-2',
    name: 'The Mind',
    category: 'card',
    players: '2-4 players',
    playtime: '15-20 mins',
    difficulty: 'Easy',
    description: 'Sync your minds without speaking a single word to play numbered cards 1-100 in ascending order.',
    howToPlay: 'Players look at their dealt hand, synchronize through collective silence, and place cards onto a center pile in ascending sequence.',
    setupTips: 'Zero communication, gestures, or secret signals allowed! Breathe and trust collective timing.',
    tags: ['Silent', 'Cooperative', 'Mind Meld']
  },
  {
    id: 'crd-3',
    name: 'Sushi Go!',
    category: 'card',
    players: '2-5 players',
    playtime: '15-20 mins',
    difficulty: 'Easy',
    description: 'Fast-paced conveyor belt sushi drafting game where players pick cards and pass hands to build the highest-scoring meal combinations.',
    howToPlay: 'Pick one card from your hand simultaneously, reveal it on the table, and pass remaining cards clockwise across 3 delicious rounds.',
    setupTips: 'Hand out 7 to 10 cards per player depending on count, and save wasabi for triple nigiri scoring.',
    tags: ['Drafting', 'Set Collection', 'Cute']
  },
  {
    id: 'crd-4',
    name: 'Taco Cat Goat Cheese Pizza',
    category: 'card',
    players: '3-8 players',
    playtime: '10-15 mins',
    difficulty: 'Easy',
    description: 'Addictive slap card game where verbal chant meets instant visual reflexes and goofy physical gestures.',
    howToPlay: 'Chant "Taco, Cat, Goat, Cheese, Pizza" in order while flipping cards. When card matches the chant word, race to slap the center pile!',
    setupTips: 'Watch out for special Gorilla, Narwhal, and Groundhog action cards that require funny physical motions before slapping.',
    tags: ['Reflexes', 'Slap Jack', 'Chaotic Fun']
  },
  {
    id: 'crd-5',
    name: 'Classic Card Games (Spades & Hearts)',
    category: 'card',
    players: '4 players',
    playtime: '30-45 mins',
    difficulty: 'Medium',
    description: 'Standard 52-card deck trick-taking royalty where partnership bidding and suit trumping decide victory.',
    howToPlay: 'Bid on how many tricks your team can capture. Follow the lead suit, play high cards, or trump with spades to win hands.',
    setupTips: 'Standard 52-card poker deck without jokers. Partner with the player sitting directly across.',
    tags: ['Standard Deck', 'Partnership', 'Strategy']
  },

  // ==========================================
  // 4. TWO-PLAYER GAMES
  // ==========================================
  {
    id: 'two-1',
    name: '7 Wonders Duel',
    category: 'two-player',
    players: '2 players',
    playtime: '30 mins',
    difficulty: 'Medium',
    description: 'The premier head-to-head drafting game where rivals build ancient civilizations, wage military campaigns, and advance science.',
    howToPlay: 'Draft cards from an overlapping pyramid structure. Win instantly via military supremacy, scientific dominance, or civil points.',
    setupTips: 'Lay out the Age I cards in the prescribed overlapping pyramid pattern.',
    tags: ['Civilization', 'Drafting', 'Competitive 1v1']
  },
  {
    id: 'two-2',
    name: 'Patchwork',
    category: 'two-player',
    players: '2 players',
    playtime: '20-30 mins',
    difficulty: 'Easy',
    description: 'Charming puzzle duel where two quilters spend buttons and time to assemble the most complete patchwork quilt on a 9x9 board.',
    howToPlay: 'Spend buttons and move along the central time track to draft polyomino fabric patches and fit them onto your quilt board.',
    setupTips: 'Arrange all irregular patch tiles in an oval track around the time board with the wooden pawn.',
    tags: ['Polyomino', 'Relaxing', 'Date Night']
  },
  {
    id: 'two-3',
    name: 'Hive',
    category: 'two-player',
    players: '2 players',
    playtime: '20 mins',
    difficulty: 'Medium',
    description: 'Chess-like boardless abstract strategy game played with tactile hexagonal insect tiles crawling across the tabletop.',
    howToPlay: 'Move ants, grasshoppers, beetles, and spiders with unique motion rules to surround your opponent\'s Queen Bee before yours falls.',
    setupTips: 'Zero setup or board required! Just pull the 22 bakelite tiles out of the travel pouch.',
    tags: ['No Board', 'Abstract', 'Chess Alternative']
  },
  {
    id: 'two-4',
    name: 'Jaipur',
    category: 'two-player',
    players: '2 players',
    playtime: '20-30 mins',
    difficulty: 'Easy',
    description: 'Fast-paced Arabian marketplace trading duel where merchants trade spices, silk, and gold camels to earn the Maharaja\'s seal.',
    howToPlay: 'Manage your hand to trade goods or herd camels from the market. Sell goods in bulk for luxury token multipliers.',
    setupTips: 'Stack the 6 goods tokens by descending point values and lay out 3 camels and 2 goods cards.',
    tags: ['Marketplace', 'Hand Management', 'Quick Play']
  },
  {
    id: 'two-5',
    name: 'Battleship / Naval Radar Duel',
    category: 'two-player',
    players: '2 players',
    playtime: '15-25 mins',
    difficulty: 'Easy',
    description: 'Classic grid deduction warfare where commanders search and destroy hidden naval fleets through coordinate callouts.',
    howToPlay: 'Call out coordinates (e.g. "B-4"). Mark hits with red pegs and misses with white pegs until an entire vessel sinks.',
    setupTips: 'Arrange your Carrier, Battleship, Cruiser, Submarine, and Destroyer secretly without touching.',
    tags: ['Grid Warfare', 'Deduction', 'Nostalgia']
  },

  // ==========================================
  // 5. GROUP GAMES
  // ==========================================
  {
    id: 'grp-1',
    name: 'Wavelength',
    category: 'group',
    players: '4-12+ players',
    playtime: '30-45 mins',
    difficulty: 'Easy',
    description: 'Telepathic spectrum guessing game where teams read each other’s minds along a dial between two opposing concepts.',
    howToPlay: 'A psychic gives a clue on a spectrum (e.g. "Cold to Hot"). Teammates discuss and turn the physical dial where they think the target target hidden zone lies.',
    setupTips: 'Spin the wheel mechanism behind the plastic screen and slide the cover closed before clue giving.',
    tags: ['Spectrum', 'Discussion', 'Crowd Pleaser']
  },
  {
    id: 'grp-2',
    name: 'Just One',
    category: 'group',
    players: '3-7 players',
    playtime: '20 mins',
    difficulty: 'Easy',
    description: 'Spiel des Jahres cooperative word game where players write 1-word clues to help a guesser, but duplicate clues cancel out!',
    howToPlay: 'Guesser closes eyes. Other players write 1 clue word on easels. Before showing the guesser, identical clues are wiped away!',
    setupTips: 'Encourage creative, oblique clues so your word won\'t duplicate someone else\'s obvious choice.',
    tags: ['Cooperative', 'Word Association', 'Award Winner']
  },
  {
    id: 'grp-3',
    name: 'Secret Hitler',
    category: 'group',
    players: '5-10 players',
    playtime: '45 mins',
    difficulty: 'Medium',
    description: 'Dramatic political social deduction game set in 1930s Germany, pitting secret liberals against disguised fascists.',
    howToPlay: 'Elect a President and Chancellor each round to enact laws from a blind policy deck while liberals sniff out fascist subversion.',
    setupTips: 'Deal envelope roles in total darkness or closed-eye night phase.',
    tags: ['High Tension', 'Social Deduction', 'Strategy']
  },
  {
    id: 'grp-4',
    name: 'Spaceteam',
    category: 'group',
    players: '3-8 players',
    playtime: '10-15 mins',
    difficulty: 'Easy',
    description: 'Cooperative shouting card game where players work together to repair an exploding spaceship before a black hole consumes it.',
    howToPlay: 'Everyone plays simultaneously, shouting absurd sci-fi maintenance instructions across the table to find whoever holds the tool.',
    setupTips: 'Set a 5-minute hourglass timer and ensure everyone can hear each other loudly.',
    tags: ['Real Time', 'Shouting', 'Chaos']
  },
  {
    id: 'grp-5',
    name: 'The Resistance: Avalon',
    category: 'group',
    players: '5-10 players',
    playtime: '30 mins',
    difficulty: 'Medium',
    description: 'Loyal knights of King Arthur battle Mordred\'s minions to complete 3 successful quests without traitors sabotaging missions.',
    howToPlay: 'Leader proposes a quest team. Players publicly vote to approve or reject the team. Approved teams cast secret Success or Fail cards.',
    setupTips: 'Include Merlin and Assassin role cards for extra mind games and deductive depth.',
    tags: ['Social Deduction', 'No Player Elimination', 'Team Work']
  },

  // ==========================================
  // 6. CLASSROOM GAMES
  // ==========================================
  {
    id: 'cls-1',
    name: 'Trivia Bowl & Kahoot Showdown',
    category: 'classroom',
    players: 'Entire class (10-35)',
    playtime: '15-25 mins',
    difficulty: 'Easy',
    description: 'High-energy curriculum quiz competition where tables or individual students buzz in to answer review questions.',
    howToPlay: 'Teacher displays a question on the smartboard. Teams formulate answers and ring a buzzer or submit on digital tablets.',
    setupTips: 'Prep 10-15 review questions categorized by 100, 200, 300 point values.',
    tags: ['Educational', 'Review', 'Team Spirit']
  },
  {
    id: 'cls-2',
    name: 'Four Corners',
    category: 'classroom',
    players: '10-35 students',
    playtime: '10-15 mins',
    difficulty: 'Easy',
    description: 'Active movement elimination game where students quietly scurry to numbered corners while a blindfolded picker calls a number.',
    howToPlay: 'Label 4 corners of the classroom 1 through 4. One student closes their eyes in the center, counts down from 10, and calls out a corner. Anyone in that corner sits down!',
    setupTips: 'Remind students of walking feet and quiet movements during the 10-second repositioning window.',
    tags: ['Movement', 'Active Energizer', 'Zero Equipment']
  },
  {
    id: 'cls-3',
    name: 'Silent Ball',
    category: 'classroom',
    players: '10-35 students',
    playtime: '10-15 mins',
    difficulty: 'Easy',
    description: 'The golden classroom quiet game: toss a soft foam ball without uttering a single sound or dropping the ball.',
    howToPlay: 'Students stand up and gently toss a foam ball. You sit down if you drop a catchable pass, make a wild throw, or talk/laugh aloud.',
    setupTips: 'Use a soft foam dodgeball or plush ball. Perfect for transitioning between intense subjects.',
    tags: ['Focus', 'Quiet', 'Reflexes']
  },
  {
    id: 'cls-4',
    name: 'Pictionary Relay',
    category: 'classroom',
    players: '2-4 teams',
    playtime: '15-20 mins',
    difficulty: 'Easy',
    description: 'Classroom whiteboard relay race where team artists sketch vocabulary words until their team guesses correctly.',
    howToPlay: 'One student from each team runs to the board, receives the secret vocabulary word from the teacher, and sketches. First team to guess scores!',
    setupTips: 'Provide dry-erase markers and write word lists connecting to your current lesson.',
    tags: ['Visual', 'Curriculum', 'Relay']
  },
  {
    id: 'cls-5',
    name: 'Jeopardy Classroom Review',
    category: 'classroom',
    players: '3-6 teams',
    playtime: '25-40 mins',
    difficulty: 'Medium',
    description: 'Interactive grid quiz show where teams choose categories and point stakes to prove mastery of subject material.',
    howToPlay: 'Teams take turns picking categories (e.g. "Science for 300"). If answered correctly in the form of a question, they bank the points.',
    setupTips: 'Set up 5 categories with 5 questions each, plus a Final Jeopardy wager round.',
    tags: ['Curriculum', 'Study Review', 'Points Race']
  },

  // ==========================================
  // 7. QUICK GAMES
  // ==========================================
  {
    id: 'qck-1',
    name: '5 Second Rule',
    category: 'quick',
    players: '2-8 players',
    playtime: '5-10 mins',
    difficulty: 'Easy',
    description: 'Name three items in a category in five rapid seconds under high pressure.',
    howToPlay: 'Draw a topic card (e.g. "Name 3 pizza toppings"). A 5-second marble timer spins—shout out 3 answers before it ends or forfeit the round!',
    setupTips: 'Keep a fast-talking cadence and laugh off goofy panicked answers.',
    tags: ['High Speed', 'Laughter', 'Pressure']
  },
  {
    id: 'qck-2',
    name: 'Rock Paper Scissors Tournament',
    category: 'quick',
    players: '4-30 players',
    playtime: '5-8 mins',
    difficulty: 'Easy',
    description: 'High-energy bracket where defeated players instantly become the cheering section for the person who defeated them.',
    howToPlay: 'Pair off and play best 2-of-3 RPS. The loser immediately follows behind the winner, loudly chanting their name as they face their next opponent!',
    setupTips: 'The final championship showdown between the last two players will feature the entire room cheering.',
    tags: ['Energizer', 'Hype', 'Instant Play']
  },
  {
    id: 'qck-3',
    name: '20 Questions',
    category: 'quick',
    players: '2-10 players',
    playtime: '5-10 mins',
    difficulty: 'Easy',
    description: 'The deduction classic where players have up to 20 Yes/No inquiries to deduce a mystery person, place, or thing.',
    howToPlay: 'One person thinks of a secret noun. The group asks yes/no questions (e.g. "Is it alive? Can it fit in a breadbox?") to solve it.',
    setupTips: 'Clarify whether answers must be strictly Yes, No, or Sometimes.',
    tags: ['Deduction', 'Road Trip', 'Zero Setup']
  },
  {
    id: 'qck-4',
    name: 'Would You Rather? (Rapid Fire)',
    category: 'quick',
    players: '2-12 players',
    playtime: '5-15 mins',
    difficulty: 'Easy',
    description: 'Hilarious moral and absurd dilemma choices where everyone votes and debates their choices.',
    howToPlay: 'Present two ridiculous choices (e.g. "Have hands for feet OR have spaghetti for hair?"). Count to 3 and point left or right to reveal votes.',
    setupTips: 'Keep scenarios lighthearted and funny for broad audience enjoyment.',
    tags: ['Debate', 'Conversation', 'Icebreaker']
  },
  {
    id: 'qck-5',
    name: 'Speed Scribble / 30-Second Doodle Duel',
    category: 'quick',
    players: '2-10 players',
    playtime: '5 mins',
    difficulty: 'Easy',
    description: 'Quickfire sketching battle where everyone gets 30 seconds to sketch the same wacky prompt.',
    howToPlay: 'Announce a random object or mashed-up concept. Start 30 seconds on the clock. Everyone displays their drawing simultaneously and votes on the favorite!',
    setupTips: 'Scrap paper and pens for everyone is all you need.',
    tags: ['Creative', 'Visual', 'Warmup']
  }
];

export const GAME_CATEGORY_META: Record<
  GameCategory,
  { label: string; description: string; color: string; icon: string }
> = {
  party: {
    label: 'Party Games',
    description: 'Hilarious icebreakers, acting challenges, and laughter generators for get-togethers.',
    color: '#ec4899',
    icon: 'Sparkles'
  },
  board: {
    label: 'Board Games',
    description: 'Tactical tabletop favorites, engine builders, and strategic classics.',
    color: '#3b82f6',
    icon: 'Boxes'
  },
  card: {
    label: 'Card Games',
    description: 'Fast hands, deck drafting, reflex slapping, and clever set collection.',
    color: '#8b5cf6',
    icon: 'Layers'
  },
  'two-player': {
    label: 'Two-Player Games',
    description: 'Head-to-head duels, tactical date-night pastimes, and 1-on-1 matches.',
    color: '#f97316',
    icon: 'Users'
  },
  group: {
    label: 'Group Games',
    description: 'Expansive crowd pleasers, social deduction, and team collaboration.',
    color: '#10b981',
    icon: 'Compass'
  },
  classroom: {
    label: 'Classroom Games',
    description: 'Educational energizers, trivia reviews, and student engagement games.',
    color: '#eab308',
    icon: 'GraduationCap'
  },
  quick: {
    label: 'Quick Games',
    description: '5-minute microgames with instant rules and zero complex setup.',
    color: '#06b6d4',
    icon: 'Zap'
  }
};
