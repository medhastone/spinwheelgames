import { TruthOrDarePrompt, ForfeitPenalty } from './types';

export const TRUTH_OR_DARE_DATABASE: TruthOrDarePrompt[] = [
  // ==========================================
  // CLEAN / FAMILY - TRUTHS (MILD)
  // ==========================================
  {
    id: 'cf-t-1',
    type: 'truth',
    text: 'What is the weirdest food combination that you secretly love?',
    audience: 'clean',
    difficulty: 'mild',
    category: 'Food Quirk',
    suggestedTimerSeconds: 45
  },
  {
    id: 'cf-t-2',
    type: 'truth',
    text: 'If you could have any wild animal as a loyal pet, which one would it be?',
    audience: 'clean',
    difficulty: 'mild',
    category: 'Imagination',
    suggestedTimerSeconds: 30
  },
  {
    id: 'cf-t-3',
    type: 'truth',
    text: 'What cartoon character are you most embarrassed to admit you love?',
    audience: 'clean',
    difficulty: 'mild',
    category: 'Favorites',
    suggestedTimerSeconds: 30
  },
  {
    id: 'cf-t-4',
    type: 'truth',
    text: 'What is the silly superpower you would choose if you could only pick an everyday minor ability?',
    audience: 'clean',
    difficulty: 'mild',
    category: 'Superpowers',
    suggestedTimerSeconds: 45
  },
  {
    id: 'cf-t-5',
    type: 'truth',
    text: 'Have you ever blamed a funny sound or smell on a family pet?',
    audience: 'clean',
    difficulty: 'mild',
    category: 'Confession',
    suggestedTimerSeconds: 30
  },
  {
    id: 'cf-t-6',
    type: 'truth',
    text: 'What is the funniest rumor you have ever heard about yourself?',
    audience: 'clean',
    difficulty: 'mild',
    category: 'Stories',
    suggestedTimerSeconds: 45
  },
  {
    id: 'cf-t-7',
    type: 'truth',
    text: 'What is something you believed as a child that turned out to be completely untrue?',
    audience: 'clean',
    difficulty: 'mild',
    category: 'Childhood',
    suggestedTimerSeconds: 45
  },
  {
    id: 'cf-t-8',
    type: 'truth',
    text: 'If you could swap lives with anyone in this room for 24 hours, who would it be?',
    audience: 'clean',
    difficulty: 'mild',
    category: 'Social',
    suggestedTimerSeconds: 30
  },

  // ==========================================
  // CLEAN / FAMILY - TRUTHS (MEDIUM)
  // ==========================================
  {
    id: 'cf-t-9',
    type: 'truth',
    text: 'What is the most ridiculous excuse you gave to get out of doing a chore or homework?',
    audience: 'clean',
    difficulty: 'medium',
    category: 'Excuses',
    suggestedTimerSeconds: 45
  },
  {
    id: 'cf-t-10',
    type: 'truth',
    text: 'What is the absolute worst fashion trend or haircut you proudly rocked in the past?',
    audience: 'clean',
    difficulty: 'medium',
    category: 'Style Regrets',
    suggestedTimerSeconds: 45
  },
  {
    id: 'cf-t-11',
    type: 'truth',
    text: 'What is the most embarrassing song currently in your music rotation?',
    audience: 'clean',
    difficulty: 'medium',
    category: 'Guilty Pleasures',
    suggestedTimerSeconds: 30
  },
  {
    id: 'cf-t-12',
    type: 'truth',
    text: 'Have you ever accidentally said something completely awkward to a teacher or boss?',
    audience: 'clean',
    difficulty: 'medium',
    category: 'Awkward Moments',
    suggestedTimerSeconds: 60
  },
  {
    id: 'cf-t-13',
    type: 'truth',
    text: 'What movie makes you cry like a baby every single time you watch it?',
    audience: 'clean',
    difficulty: 'medium',
    category: 'Movies',
    suggestedTimerSeconds: 30
  },
  {
    id: 'cf-t-14',
    type: 'truth',
    text: 'What is the funniest nickname someone ever gave you and why?',
    audience: 'clean',
    difficulty: 'medium',
    category: 'Nicknames',
    suggestedTimerSeconds: 45
  },

  // ==========================================
  // CLEAN / FAMILY - TRUTHS (EXTREME)
  // ==========================================
  {
    id: 'cf-t-15',
    type: 'truth',
    text: 'What is the biggest harmless secret you kept from your parents for over a year?',
    audience: 'clean',
    difficulty: 'extreme',
    category: 'Secrets',
    suggestedTimerSeconds: 60
  },
  {
    id: 'cf-t-16',
    type: 'truth',
    text: 'If you had to delete every app on your phone except two, which two stay and why?',
    audience: 'clean',
    difficulty: 'extreme',
    category: 'Tech Habits',
    suggestedTimerSeconds: 45
  },
  {
    id: 'cf-t-17',
    type: 'truth',
    text: 'Have you ever re-gifted a birthday or holiday present without the original giver knowing?',
    audience: 'clean',
    difficulty: 'extreme',
    category: 'Gift Scandals',
    suggestedTimerSeconds: 45
  },

  // ==========================================
  // CLEAN / FAMILY - DARES (MILD)
  // ==========================================
  {
    id: 'cf-d-1',
    type: 'dare',
    text: 'Speak in a dramatic Shakespearean accent for the next two rounds of the game.',
    audience: 'clean',
    difficulty: 'mild',
    category: 'Accents',
    suggestedTimerSeconds: 60
  },
  {
    id: 'cf-d-2',
    type: 'dare',
    text: 'Do your best vocal impression of a dolphin, rooster, and goat in under 15 seconds.',
    audience: 'clean',
    difficulty: 'mild',
    category: 'Impressions',
    suggestedTimerSeconds: 30
  },
  {
    id: 'cf-d-3',
    type: 'dare',
    text: 'Attempt to juggle 3 random small objects chosen by the group for 20 seconds.',
    audience: 'clean',
    difficulty: 'mild',
    category: 'Skill Challenge',
    suggestedTimerSeconds: 45
  },
  {
    id: 'cf-d-4',
    type: 'dare',
    text: 'Let the person to your right draw a tiny smiley face on your forehead with a washable pen.',
    audience: 'clean',
    difficulty: 'mild',
    category: 'Artwork',
    suggestedTimerSeconds: 30
  },
  {
    id: 'cf-d-5',
    type: 'dare',
    text: 'Walk backwards like a fashion runway model around the room twice.',
    audience: 'clean',
    difficulty: 'mild',
    category: 'Runway',
    suggestedTimerSeconds: 45
  },

  // ==========================================
  // CLEAN / FAMILY - DARES (MEDIUM)
  // ==========================================
  {
    id: 'cf-d-6',
    type: 'dare',
    text: 'Eat a cracker, marshmallow, or slice of bread without using your hands in 30 seconds.',
    audience: 'clean',
    difficulty: 'medium',
    category: 'Hands-Free',
    suggestedTimerSeconds: 30
  },
  {
    id: 'cf-d-7',
    type: 'dare',
    text: 'Do 15 jumping jacks while loudly singing the alphabet backwards.',
    audience: 'clean',
    difficulty: 'medium',
    category: 'Physical',
    suggestedTimerSeconds: 45
  },
  {
    id: 'cf-d-8',
    type: 'dare',
    text: 'Perform an intense slow-motion fight scene with an imaginary ninja for 30 seconds.',
    audience: 'clean',
    difficulty: 'medium',
    category: 'Acting',
    suggestedTimerSeconds: 30
  },
  {
    id: 'cf-d-9',
    type: 'dare',
    text: 'Balance an empty cup or spoon on your nose for a full 20 seconds without dropping it.',
    audience: 'clean',
    difficulty: 'medium',
    category: 'Balance',
    suggestedTimerSeconds: 30
  },

  // ==========================================
  // CLEAN / FAMILY - DARES (EXTREME)
  // ==========================================
  {
    id: 'cf-d-10',
    type: 'dare',
    text: 'Eat a spoonful of plain condiment chosen by the group (mustard, mayo, or hot sauce).',
    audience: 'clean',
    difficulty: 'extreme',
    category: 'Taste Test',
    suggestedTimerSeconds: 30
  },
  {
    id: 'cf-d-11',
    type: 'dare',
    text: 'Wear your socks on your hands until your turn comes around again.',
    audience: 'clean',
    difficulty: 'extreme',
    category: 'Costume',
    suggestedTimerSeconds: 60
  },
  {
    id: 'cf-d-12',
    type: 'dare',
    text: 'Do an energetic robotic dance to no music for a full 45 seconds.',
    audience: 'clean',
    difficulty: 'extreme',
    category: 'Dance',
    suggestedTimerSeconds: 45
  },

  // ==========================================
  // FRIENDS / CHILL - TRUTHS (MILD)
  // ==========================================
  {
    id: 'fr-t-1',
    type: 'truth',
    text: 'Who in this room would survive the longest in a zombie apocalypse, and who would be eaten first?',
    audience: 'friends',
    difficulty: 'mild',
    category: 'Friendship Dynamics',
    suggestedTimerSeconds: 45
  },
  {
    id: 'fr-t-2',
    type: 'truth',
    text: 'What was your very first impression of the person sitting across from you?',
    audience: 'friends',
    difficulty: 'mild',
    category: 'First Impressions',
    suggestedTimerSeconds: 45
  },
  {
    id: 'fr-t-3',
    type: 'truth',
    text: 'What is the pettiest reason you ever ghosted someone or stopped replying to their messages?',
    audience: 'friends',
    difficulty: 'mild',
    category: 'Petty Confessions',
    suggestedTimerSeconds: 45
  },
  {
    id: 'fr-t-4',
    type: 'truth',
    text: 'What is the most bizarre rabbit hole you went down on Wikipedia or YouTube at 2 AM?',
    audience: 'friends',
    difficulty: 'mild',
    category: 'Late Night Rabbit Holes',
    suggestedTimerSeconds: 45
  },
  {
    id: 'fr-t-5',
    type: 'truth',
    text: 'If you had to be stranded on an island with only one person from this group, who is it?',
    audience: 'friends',
    difficulty: 'mild',
    category: 'Survival Partners',
    suggestedTimerSeconds: 30
  },

  // ==========================================
  // FRIENDS / CHILL - TRUTHS (MEDIUM)
  // ==========================================
  {
    id: 'fr-t-6',
    type: 'truth',
    text: 'Have you ever secretly stalked an ex or former best friend on social media from a burner account?',
    audience: 'friends',
    difficulty: 'medium',
    category: 'Social Media',
    suggestedTimerSeconds: 45
  },
  {
    id: 'fr-t-7',
    type: 'truth',
    text: 'What is the most awkward text message you accidentally sent to the wrong person?',
    audience: 'friends',
    difficulty: 'medium',
    category: 'Texting Fails',
    suggestedTimerSeconds: 60
  },
  {
    id: 'fr-t-8',
    type: 'truth',
    text: 'What is something you lied about on your resume or college application that worked?',
    audience: 'friends',
    difficulty: 'medium',
    category: 'Career Secrets',
    suggestedTimerSeconds: 45
  },
  {
    id: 'fr-t-9',
    type: 'truth',
    text: 'What is a habit or quirk of someone in this room that secretly drives you crazy?',
    audience: 'friends',
    difficulty: 'medium',
    category: 'Hot Takes',
    suggestedTimerSeconds: 60
  },
  {
    id: 'fr-t-10',
    type: 'truth',
    text: 'What is the most expensive thing you ever broke and blamed on someone else or played dumb?',
    audience: 'friends',
    difficulty: 'medium',
    category: 'Oops Moments',
    suggestedTimerSeconds: 60
  },

  // ==========================================
  // FRIENDS / CHILL - TRUTHS (EXTREME)
  // ==========================================
  {
    id: 'fr-t-11',
    type: 'truth',
    text: 'Who was your most embarrassing childhood or teenage celebrity crush?',
    audience: 'friends',
    difficulty: 'extreme',
    category: 'Crushes',
    suggestedTimerSeconds: 45
  },
  {
    id: 'fr-t-12',
    type: 'truth',
    text: 'Have you ever eavesdropped on a private conversation about you, and what did you hear?',
    audience: 'friends',
    difficulty: 'extreme',
    category: 'Eavesdropping',
    suggestedTimerSeconds: 60
  },
  {
    id: 'fr-t-13',
    type: 'truth',
    text: 'What is a rumor about yourself that was 100% true, but you swore to everyone was fake?',
    audience: 'friends',
    difficulty: 'extreme',
    category: 'The Truth',
    suggestedTimerSeconds: 60
  },

  // ==========================================
  // FRIENDS / CHILL - DARES (MILD)
  // ==========================================
  {
    id: 'fr-d-1',
    type: 'dare',
    text: 'Let the group pick any song, and you must lip-sync dramatically with hairbrush mic for 45 seconds.',
    audience: 'friends',
    difficulty: 'mild',
    category: 'Lip Sync',
    suggestedTimerSeconds: 45
  },
  {
    id: 'fr-d-2',
    type: 'dare',
    text: 'Speak in rhymes or give a compliment before every sentence until the next round.',
    audience: 'friends',
    difficulty: 'mild',
    category: 'Wordplay',
    suggestedTimerSeconds: 60
  },
  {
    id: 'fr-d-3',
    type: 'dare',
    text: 'Call a mutual friend not here and casually ask them if penguins have knees, then hang up.',
    audience: 'friends',
    difficulty: 'mild',
    category: 'Phone Fun',
    suggestedTimerSeconds: 60
  },
  {
    id: 'fr-d-4',
    type: 'dare',
    text: 'Show the group the last three photos saved in your camera roll without deleting any.',
    audience: 'friends',
    difficulty: 'mild',
    category: 'Camera Roll',
    suggestedTimerSeconds: 30
  },

  // ==========================================
  // FRIENDS / CHILL - DARES (MEDIUM)
  // ==========================================
  {
    id: 'fr-d-5',
    type: 'dare',
    text: 'Send a voice message to the last person you texted singing Happy Birthday, even if it is not.',
    audience: 'friends',
    difficulty: 'medium',
    category: 'Social Prank',
    suggestedTimerSeconds: 60
  },
  {
    id: 'fr-d-6',
    type: 'dare',
    text: 'Let the person to your left do your makeup, hairstyle, or draw funny glasses with eyeliner.',
    audience: 'friends',
    difficulty: 'medium',
    category: 'Makeover',
    suggestedTimerSeconds: 90
  },
  {
    id: 'fr-d-7',
    type: 'dare',
    text: 'Hold an ice cube in your hand until it completely melts or for 60 seconds straight.',
    audience: 'friends',
    difficulty: 'medium',
    category: 'Endurance',
    suggestedTimerSeconds: 60
  },
  {
    id: 'fr-d-8',
    type: 'dare',
    text: 'Do a plank for 45 seconds while answering rapid-fire questions from everyone in the circle.',
    audience: 'friends',
    difficulty: 'medium',
    category: 'Hot Seat',
    suggestedTimerSeconds: 45
  },

  // ==========================================
  // FRIENDS / CHILL - DARES (EXTREME)
  // ==========================================
  {
    id: 'fr-d-9',
    type: 'dare',
    text: 'Swap shirts or outer jackets with the player directly opposite you for the next two rounds.',
    audience: 'friends',
    difficulty: 'extreme',
    category: 'Wardrobe Swap',
    suggestedTimerSeconds: 60
  },
  {
    id: 'fr-d-10',
    type: 'dare',
    text: 'Post an unflattering selfie chosen by the group on your Instagram story for 15 minutes.',
    audience: 'friends',
    difficulty: 'extreme',
    category: 'Social Exposure',
    suggestedTimerSeconds: 60
  },
  {
    id: 'fr-d-11',
    type: 'dare',
    text: 'Let someone in the room text your third most recent chat whatever single emoji they want.',
    audience: 'friends',
    difficulty: 'extreme',
    category: 'Emoji Prank',
    suggestedTimerSeconds: 45
  },

  // ==========================================
  // PARTY NIGHT - TRUTHS (MILD)
  // ==========================================
  {
    id: 'pt-t-1',
    type: 'truth',
    text: 'What was your most chaotic or disastrous night out, and how did it end?',
    audience: 'party',
    difficulty: 'mild',
    category: 'Nightlife Tales',
    suggestedTimerSeconds: 60
  },
  {
    id: 'pt-t-2',
    type: 'truth',
    text: 'Who is the most famous or unexpected person who has ever slid into your DMs?',
    audience: 'party',
    difficulty: 'mild',
    category: 'DMs & Dating',
    suggestedTimerSeconds: 45
  },
  {
    id: 'pt-t-3',
    type: 'truth',
    text: 'What is your worst dating app match story or first date horror story?',
    audience: 'party',
    difficulty: 'mild',
    category: 'Dating Disasters',
    suggestedTimerSeconds: 60
  },
  {
    id: 'pt-t-4',
    type: 'truth',
    text: 'If you had to couple up two people in this room right now, who would make the best match?',
    audience: 'party',
    difficulty: 'mild',
    category: 'Matchmaker',
    suggestedTimerSeconds: 45
  },

  // ==========================================
  // PARTY NIGHT - TRUTHS (MEDIUM)
  // ==========================================
  {
    id: 'pt-t-5',
    type: 'truth',
    text: 'What is the biggest red flag you knowingly ignored in a relationship because you liked them?',
    audience: 'party',
    difficulty: 'medium',
    category: 'Red Flags',
    suggestedTimerSeconds: 60
  },
  {
    id: 'pt-t-6',
    type: 'truth',
    text: 'Have you ever had a crush on a friend’s sibling or ex? Be honest!',
    audience: 'party',
    difficulty: 'medium',
    category: 'Taboo Crushes',
    suggestedTimerSeconds: 45
  },
  {
    id: 'pt-t-7',
    type: 'truth',
    text: 'What is something crazy you did at a party that nobody in this room knows about?',
    audience: 'party',
    difficulty: 'medium',
    category: 'Untold Stories',
    suggestedTimerSeconds: 60
  },
  {
    id: 'pt-t-8',
    type: 'truth',
    text: 'What is your current screen time daily average, and what app takes up the most time?',
    audience: 'party',
    difficulty: 'medium',
    category: 'Screen Confession',
    suggestedTimerSeconds: 30
  },

  // ==========================================
  // PARTY NIGHT - TRUTHS (EXTREME)
  // ==========================================
  {
    id: 'pt-t-9',
    type: 'truth',
    text: 'What is the most scandalous secret you are carrying that could cause drama if revealed?',
    audience: 'party',
    difficulty: 'extreme',
    category: 'Deep Secret',
    suggestedTimerSeconds: 60
  },
  {
    id: 'pt-t-10',
    type: 'truth',
    text: 'If you were forced to date one person in this room right now, who would you choose?',
    audience: 'party',
    difficulty: 'extreme',
    category: 'Room Pressure',
    suggestedTimerSeconds: 45
  },
  {
    id: 'pt-t-11',
    type: 'truth',
    text: 'What is the most regretful thing you ever bought while tipsy or late at night?',
    audience: 'party',
    difficulty: 'extreme',
    category: 'Financial Regrets',
    suggestedTimerSeconds: 45
  },

  // ==========================================
  // PARTY NIGHT - DARES (MILD)
  // ==========================================
  {
    id: 'pt-d-1',
    type: 'dare',
    text: 'Give a 30-second passionate toast to someone in the room as if you are giving a best man speech.',
    audience: 'party',
    difficulty: 'mild',
    category: 'The Toast',
    suggestedTimerSeconds: 45
  },
  {
    id: 'pt-d-2',
    type: 'dare',
    text: 'Let the person next to you choose your phone ringtone or wallpaper for the rest of tonight.',
    audience: 'party',
    difficulty: 'mild',
    category: 'Customization',
    suggestedTimerSeconds: 45
  },
  {
    id: 'pt-d-3',
    type: 'dare',
    text: 'Do a seductive runway walk across the room while playing whatever song the room chooses.',
    audience: 'party',
    difficulty: 'mild',
    category: 'Runway Drama',
    suggestedTimerSeconds: 45
  },

  // ==========================================
  // PARTY NIGHT - DARES (MEDIUM)
  // ==========================================
  {
    id: 'pt-d-4',
    type: 'dare',
    text: 'Let the group compose a random 5-word sentence to comment on the newest photo of a mutual friend.',
    audience: 'party',
    difficulty: 'medium',
    category: 'Comment Prank',
    suggestedTimerSeconds: 60
  },
  {
    id: 'pt-d-5',
    type: 'dare',
    text: 'Take a sip of a mystery drink concoction created by combining 3 safe drinks from the kitchen.',
    audience: 'party',
    difficulty: 'medium',
    category: 'Mystery Mix',
    suggestedTimerSeconds: 45
  },
  {
    id: 'pt-d-6',
    type: 'dare',
    text: 'Call a pizza place or food delivery spot and ask if they deliver to the International Space Station.',
    audience: 'party',
    difficulty: 'medium',
    category: 'Prank Call',
    suggestedTimerSeconds: 60
  },
  {
    id: 'pt-d-7',
    type: 'dare',
    text: 'Arm wrestle the physically strongest person in the room with your non-dominant arm.',
    audience: 'party',
    difficulty: 'medium',
    category: 'Arm Wrestle',
    suggestedTimerSeconds: 45
  },

  // ==========================================
  // PARTY NIGHT - DARES (EXTREME)
  // ==========================================
  {
    id: 'pt-d-8',
    type: 'dare',
    text: 'Let someone in the room scroll through your Instagram or TikTok search history for 20 seconds.',
    audience: 'party',
    difficulty: 'extreme',
    category: 'Search History',
    suggestedTimerSeconds: 30
  },
  {
    id: 'pt-d-9',
    type: 'dare',
    text: 'Let the group pick any contact in your phone and you must send them a voice note saying “I know what you did”.',
    audience: 'party',
    difficulty: 'extreme',
    category: 'Mystery Text',
    suggestedTimerSeconds: 45
  },
  {
    id: 'pt-d-10',
    type: 'dare',
    text: 'Eat a raw slice of lemon or a tablespoon of hot sauce without making any facial expression.',
    audience: 'party',
    difficulty: 'extreme',
    category: 'Poker Face',
    suggestedTimerSeconds: 30
  },
  {
    id: 'pt-d-11',
    type: 'dare',
    text: 'Let the person to your right draw a fake tattoo on your bicep or neck with a washable marker.',
    audience: 'party',
    difficulty: 'extreme',
    category: 'Tattoo Parlor',
    suggestedTimerSeconds: 60
  }
];

// ==========================================
// FUN FORFEIT PENALTIES (When Passing or Chickening Out)
// ==========================================
export const FORFEIT_PENALTIES: ForfeitPenalty[] = [
  {
    id: 'forfeit-1',
    text: 'Do 20 rapid jumping jacks while loudly shouting "I chickened out!" on every count.',
    category: 'Physical'
  },
  {
    id: 'forfeit-2',
    text: 'Drink a glass of cold water with a pinch of salt through a straw in 15 seconds.',
    category: 'Kitchen Penalty'
  },
  {
    id: 'forfeit-3',
    text: 'Talk in a high-pitched cartoon voice for the next two turns of the game.',
    category: 'Voice'
  },
  {
    id: 'forfeit-4',
    text: 'Let the group pick an embarrassing song and dance like nobody is watching for 30 seconds.',
    category: 'Performance'
  },
  {
    id: 'forfeit-5',
    text: 'Give everyone in the circle a creative 10-second personalized compliment.',
    category: 'Social'
  },
  {
    id: 'forfeit-6',
    text: 'Hold an imaginary baby and rock it lovingly to sleep while singing a nursery rhyme for 30s.',
    category: 'Acting'
  },
  {
    id: 'forfeit-7',
    text: 'Act like a dinosaur hunter in the jungle who just spotted a T-Rex across the room.',
    category: 'Drama'
  },
  {
    id: 'forfeit-8',
    text: 'Wear an oven mitt or winter glove on your dominant hand for the rest of the game round.',
    category: 'Handicap'
  },
  {
    id: 'forfeit-9',
    text: 'Eat a small bite of raw onion or a clove of garlic chosen by the group.',
    category: 'Taste Test'
  },
  {
    id: 'forfeit-10',
    text: 'Do 15 squats while reciting your 5 favorite movies or songs without stopping.',
    category: 'Multitask'
  }
];

// Wheel Colors for Truth & Dare
export const TRUTH_COLOR = '#06b6d4'; // Cyan
export const DARE_COLOR = '#f43f5e';  // Rose / Hot Magenta
export const TRUTH_BG_GRADIENT = 'from-cyan-500 to-blue-600';
export const DARE_BG_GRADIENT = 'from-rose-500 to-amber-600';
