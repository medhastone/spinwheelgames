export type BirthdayModeId = 'person' | 'activity' | 'food' | 'gifts' | 'games' | 'theme';

export interface BirthdayItem {
  id: string;
  text: string;
  subtitle?: string;
  category?: BirthdayModeId;
}

export interface BirthdayModeConfig {
  id: BirthdayModeId;
  label: string;
  shortLabel: string;
  tagline: string;
  description: string;
  iconName: string;
  badge: string;
  accentColor: string;
  palette: string[];
  placeholderInput: string;
  sampleItems: BirthdayItem[];
}

export const BIRTHDAY_PALETTES: Record<BirthdayModeId, string[]> = {
  person: ['#f43f5e', '#ec4899', '#d946ef', '#a855f7', '#8b5cf6', '#6366f1', '#3b82f6', '#06b6d4'],
  activity: ['#f59e0b', '#f97316', '#ef4444', '#ec4899', '#8b5cf6', '#3b82f6', '#10b981', '#14b8a6'],
  food: ['#10b981', '#059669', '#14b8a6', '#06b6d4', '#0284c7', '#6366f1', '#8b5cf6', '#ec4899'],
  gifts: ['#8b5cf6', '#a855f7', '#d946ef', '#ec4899', '#f43f5e', '#f97316', '#f59e0b', '#3b82f6'],
  games: ['#3b82f6', '#2563eb', '#1d4ed8', '#6366f1', '#8b5cf6', '#a855f7', '#ec4899', '#f43f5e'],
  theme: ['#06b6d4', '#0891b2', '#0284c7', '#2563eb', '#4f46e5', '#7c3aed', '#9333ea', '#c026d3']
};

export const BIRTHDAY_MODES: Record<BirthdayModeId, BirthdayModeConfig> = {
  person: {
    id: 'person',
    label: 'Birthday Person Picker',
    shortLabel: 'Person Picker',
    tagline: 'Pick who gets the spotlight, opens gifts, or blows candles',
    description: 'Perfect for deciding who blows out candles, cuts the first slice, picks the next party game, or receives the spotlight award.',
    iconName: 'Crown',
    badge: 'Spotlight VIP',
    accentColor: '#f43f5e',
    palette: BIRTHDAY_PALETTES.person,
    placeholderInput: "e.g. Alex (Birthday VIP) or Jordan...",
    sampleItems: [
      { id: 'bp-1', text: 'Birthday VIP (Guest of Honor)', subtitle: 'Gets first choice on everything & center spotlight' },
      { id: 'bp-2', text: 'Cake Candle Blower', subtitle: 'Makes the secret wish and blows out all the candles' },
      { id: 'bp-3', text: 'First Cake Slice Cutter', subtitle: 'In charge of serving the legendary first piece' },
      { id: 'bp-4', text: 'Mystery Gift Opener', subtitle: 'Unwraps the next gift in front of the group' },
      { id: 'bp-5', text: 'Party Game Captain', subtitle: 'Leads the next round of party games and team picks' },
      { id: 'bp-6', text: 'DJ & Song Selector', subtitle: 'Picks the celebratory anthem for the dance floor' },
      { id: 'bp-7', text: 'Speech Toast Master', subtitle: 'Delivers a hilarious 30-second birthday toast' },
      { id: 'bp-8', text: 'Photo Star MVP', subtitle: 'Takes center position in the next big group selfie' }
    ]
  },
  activity: {
    id: 'activity',
    label: 'Birthday Activity',
    shortLabel: 'Activity',
    tagline: 'High-energy outings, creative sessions & epic adventures',
    description: 'Stuck deciding what to do for your birthday? Spin to pick unforgettable adventures from escape rooms to sunset bonfires.',
    iconName: 'Sparkles',
    badge: 'Celebration Outings',
    accentColor: '#f59e0b',
    palette: BIRTHDAY_PALETTES.activity,
    placeholderInput: "e.g. Laser Tag Arena or Paint & Sip...",
    sampleItems: [
      { id: 'ba-1', text: 'Escape Room Challenge', subtitle: 'Crack clues and escape within 60 minutes' },
      { id: 'ba-2', text: 'Private Karaoke Lounge', subtitle: 'Belt out classic party anthems and power ballads' },
      { id: 'ba-3', text: 'Retro Arcade & Pinball Battle', subtitle: 'Compete for high scores and victory tickets' },
      { id: 'ba-4', text: 'Glow-in-the-Dark Bowling', subtitle: 'Cosmic strikes, disco lights & friendly wagers' },
      { id: 'ba-5', text: 'Paint & Sip Masterclass', subtitle: 'Canvas masterpieces with craft drinks' },
      { id: 'ba-6', text: 'Laser Tag Arena Tournament', subtitle: 'Multi-level stealth combat with friends' },
      { id: 'ba-7', text: 'High-Speed Go-Kart Grand Prix', subtitle: 'Wheel-to-wheel racing bragging rights' },
      { id: 'ba-8', text: 'Sunset Picnic & Beach Bonfire', subtitle: 'Acoustic tunes, cozy blankets & golden hour vibes' },
      { id: 'ba-9', text: 'Trampoline Park Dodgeball', subtitle: 'High-flying bounce arenas and slam dunk courts' },
      { id: 'ba-10', text: 'Outdoor Backyard Movie Night', subtitle: 'Fairy lights, projector screen & hot popcorn' }
    ]
  },
  food: {
    id: 'food',
    label: 'Birthday Food',
    shortLabel: 'Food & Dinner',
    tagline: 'Decide the feast: artisan pizza, tacos, Korean BBQ & desserts',
    description: 'Solve the eternal "what should we eat for my birthday dinner?" debate with mouth-watering cuisine choices.',
    iconName: 'Utensils',
    badge: 'Dinner & Feast',
    accentColor: '#10b981',
    palette: BIRTHDAY_PALETTES.food,
    placeholderInput: "e.g. Gourmet Pizza Feast or Street Tacos...",
    sampleItems: [
      { id: 'bf-1', text: 'Wood-Fired Artisan Pizza', subtitle: 'Crispy sourdough crusts, creamy burrata & hot honey' },
      { id: 'bf-2', text: 'Street Taco & Nacho Fiesta', subtitle: 'Slow-cooked birria, sizzling fajitas & guacamole bar' },
      { id: 'bf-3', text: 'Korean BBQ & Crispy Dumplings', subtitle: 'Tabletop grill bulgogi, pork belly & spicy kimchi' },
      { id: 'bf-4', text: 'Gourmet Smashburgers & Truffle Fries', subtitle: 'Double patties, brioche buns & loaded garlic aioli' },
      { id: 'bf-5', text: 'Hibachi Teppanyaki & Fresh Sushi', subtitle: 'Sizzling onion volcanoes, fried rice & dragon rolls' },
      { id: 'bf-6', text: 'Handmade Pasta & Truffle Garlic Bread', subtitle: 'Creamy fettuccine, fresh parmesan & pesto bowls' },
      { id: 'bf-7', text: 'Crispy Wings & Loaded Sliders Bar', subtitle: 'Buffalo glaze, honey sriracha & craft dipping sauces' },
      { id: 'bf-8', text: 'Fondue & Charcuterie Grazing Board', subtitle: 'Warm melted gruyere, cured prosciutto & grapes' },
      { id: 'bf-9', text: 'Dim Sum & Steamed Soup Dumplings', subtitle: 'Bamboo steamers packed with xiao long bao & bao buns' },
      { id: 'bf-10', text: 'Giant Ice Cream Sundae & Waffle Bar', subtitle: 'Warm Belgian waffles, hot fudge & endless toppings' }
    ]
  },
  gifts: {
    id: 'gifts',
    label: 'Birthday Gift Ideas',
    shortLabel: 'Gift Ideas',
    tagline: 'Wishlist inspiration & surprise gift recommendations',
    description: 'Find crowd-pleasing birthday presents, whether you are building your personal wishlist or picking a gift for a friend.',
    iconName: 'Gift',
    badge: 'Wishlist & Presents',
    accentColor: '#8b5cf6',
    palette: BIRTHDAY_PALETTES.gifts,
    placeholderInput: "e.g. Noise-Cancelling Headphones...",
    sampleItems: [
      { id: 'bg-1', text: 'Wireless Noise-Canceling Headphones', subtitle: 'Crystal clear acoustics and everyday immersion' },
      { id: 'bg-2', text: 'Instant Polaroid Camera & Film', subtitle: 'Tangible retro snapshots to keep the memory alive' },
      { id: 'bg-3', text: 'Live Concert or Theater Tickets', subtitle: 'The gift of an unforgettable night of live entertainment' },
      { id: 'bg-4', text: 'Personalized Leather Travel Journal', subtitle: 'Custom embossed initials with fountain pen paper' },
      { id: 'bg-5', text: 'Luxury Scented Candle & Aromatherapy Set', subtitle: 'Hand-poured soy wax, amber glass & relaxing botanicals' },
      { id: 'bg-6', text: 'Smart Ambient Sunset Lamp', subtitle: 'Warm cinematic sunset projections for bedroom aesthetic' },
      { id: 'bg-7', text: 'Artisanal Coffee & Tea Tasting Box', subtitle: 'Rare single-origin beans and loose-leaf herbal blends' },
      { id: 'bg-8', text: 'Designer Party Game / Board Game Box', subtitle: 'High-reputation table games for legendary game nights' },
      { id: 'bg-9', text: 'Waterproof Portable Bluetooth Speaker', subtitle: 'Rugged bass powerhouse for outdoor park and pool days' },
      { id: 'bg-10', text: 'Custom Star Map of Birthday Night', subtitle: 'Framed constellation alignment from the night they were born' },
      { id: 'bg-11', text: 'Cozy Premium Cashmere Throw / Hoodie', subtitle: 'Ultra-plush warmth and timeless lounge style' }
    ]
  },
  games: {
    id: 'games',
    label: 'Birthday Party Games',
    shortLabel: 'Party Games',
    tagline: 'Hilarious icebreakers, friendly battles & group challenges',
    description: 'Break the ice and keep birthday party energy soaring with fast-paced, laugh-out-loud parlor and party games.',
    iconName: 'Gamepad2',
    badge: 'Icebreakers & Fun',
    accentColor: '#3b82f6',
    palette: BIRTHDAY_PALETTES.games,
    placeholderInput: "e.g. Trivia About Birthday Star...",
    sampleItems: [
      { id: 'bgm-1', text: 'How Well Do You Know the Birthday Star?', subtitle: 'Hilarious custom trivia quiz with prizes for best score' },
      { id: 'bgm-2', text: 'Two Truths & A Lie: Birthday Edition', subtitle: 'Each guest tells secrets; the birthday star guesses truths' },
      { id: 'bgm-3', text: 'Musical Chairs with Party Anthems', subtitle: 'Fast-paced, cutthroat circle dash for the final chair' },
      { id: 'bgm-4', text: 'Charades: Milestone Memories', subtitle: 'Act out funny past moments without speaking a word' },
      { id: 'bgm-5', text: 'Saran Wrap Giant Mystery Prize Ball', subtitle: 'Unroll layers while wearing oven mitts to win hidden goodies' },
      { id: 'bgm-6', text: 'Balloon Pop Minute-to-Win-It', subtitle: 'Burst hidden message balloons without using your hands' },
      { id: 'bgm-7', text: 'Photo Scavenger Hunt Challenge', subtitle: 'Complete 10 wacky photo prompts around the party venue' },
      { id: 'bgm-8', text: 'Never Have I Ever: Celebration Cut', subtitle: 'Playful group confessions with funny penalty dares' },
      { id: 'bgm-9', text: 'Dance Freeze Elimination Battle', subtitle: 'DJ cuts the track mid-chorus; anyone wobbling sits down' },
      { id: 'bgm-10', text: 'Blindfolded Cake Decorating Duel', subtitle: 'Teams direct a blindfolded artist to frost a birthday treat' }
    ]
  },
  theme: {
    id: 'theme',
    label: 'Birthday Theme',
    shortLabel: 'Party Theme',
    tagline: 'Aesthetic decor, dress codes & immersive party vibes',
    description: 'Pick an unforgettable birthday party aesthetic, dress code, and decor motif to transform your celebration.',
    iconName: 'PartyPopper',
    badge: 'Vibes & Decor',
    accentColor: '#06b6d4',
    palette: BIRTHDAY_PALETTES.theme,
    placeholderInput: "e.g. Neon Glow Rave or 90s Throwback...",
    sampleItems: [
      { id: 'bt-1', text: 'Neon Glow-in-the-Dark Rave', subtitle: 'Blacklight fixtures, fluorescent face paint & glow necklaces' },
      { id: 'bt-2', text: 'Retro 90s & Y2K Throwback Bash', subtitle: 'Baggy denim, platform sneakers, boybands & disposable cams' },
      { id: 'bt-3', text: 'Hollywood Red Carpet & VIP Gala', subtitle: 'Black tie dress code, paparazzi photo wall & mocktail flutes' },
      { id: 'bt-4', text: 'Enchanted Forest Fairytale', subtitle: 'Fairy light canopies, trailing ivy, moss & botanical cocktails' },
      { id: 'bt-5', text: 'Tropical Island Luau & Tiki Bar', subtitle: 'Hawaiian floral shirts, coconut cups & beach party beats' },
      { id: 'bt-6', text: '1920s Speakeasy & Murder Mystery', subtitle: 'Flapper dresses, pinstripes, jazz records & secret clues' },
      { id: 'bt-7', text: 'Cosmic Space & Retro Disco Odyssey', subtitle: 'Glitter makeup, disco mirror balls & silver metallic fits' },
      { id: 'bt-8', text: 'Denim & Diamonds Glamour', subtitle: 'Casual distressed jeans mixed with sparkling rhinestone jewelry' },
      { id: 'bt-9', text: 'Pastel Boho Garden & Sunset Picnic', subtitle: 'Low wooden tables, woven rugs, floor cushions & wildflowers' },
      { id: 'bt-10', text: 'Casino Royale High Roller Night', subtitle: 'Roulette wheels, blackjack tables, fedoras & cocktail attire' }
    ]
  }
};

export const ALL_BIRTHDAY_MODE_IDS: BirthdayModeId[] = [
  'person',
  'activity',
  'food',
  'gifts',
  'games',
  'theme'
];
