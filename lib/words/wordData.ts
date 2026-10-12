export type WordCategory = 'all' | 'nouns' | 'verbs' | 'adjectives' | 'easy' | 'advanced' | 'custom';

export interface WordItem {
  id: string;
  word: string;
  partOfSpeech: 'noun' | 'verb' | 'adjective' | 'other';
  difficulty: 'easy' | 'advanced' | 'medium';
  definition: string;
  exampleSentence: string;
}

export const NOUNS_LIST: WordItem[] = [
  { id: 'n-1', word: 'Compass', partOfSpeech: 'noun', difficulty: 'easy', definition: 'An instrument used for navigation showing magnetic north.', exampleSentence: 'He checked the brass compass before trekking into the misty woods.' },
  { id: 'n-2', word: 'Lantern', partOfSpeech: 'noun', difficulty: 'easy', definition: 'A portable lamp with a protective case.', exampleSentence: 'The old lantern cast dancing shadows across the cabin wall.' },
  { id: 'n-3', word: 'Echo', partOfSpeech: 'noun', difficulty: 'easy', definition: 'A sound caused by the reflection of sound waves.', exampleSentence: 'Her laughter returned as a soft echo from the deep canyon.' },
  { id: 'n-4', word: 'Castle', partOfSpeech: 'noun', difficulty: 'easy', definition: 'A large fortified building from the medieval period.', exampleSentence: 'The ancient stone castle stood proudly atop the rocky cliff.' },
  { id: 'n-5', word: 'Orchard', partOfSpeech: 'noun', difficulty: 'easy', definition: 'A piece of land planted with fruit trees.', exampleSentence: 'Sweet ripe apples filled the air with perfume across the orchard.' },
  { id: 'n-6', word: 'Galaxy', partOfSpeech: 'noun', difficulty: 'easy', definition: 'A massive system of millions or billions of stars.', exampleSentence: 'Through the telescope, the spiral galaxy sparkled like diamond dust.' },
  { id: 'n-7', word: 'Feather', partOfSpeech: 'noun', difficulty: 'easy', definition: 'One of the light horny structures forming the plumage of birds.', exampleSentence: 'A brilliant blue jay feather lay silently on the mossy rock.' },
  { id: 'n-8', word: 'Harbor', partOfSpeech: 'noun', difficulty: 'easy', definition: 'A sheltered body of water where ships may anchor.', exampleSentence: 'Fishing boats swayed gently in the protected harbor at dawn.' },
  { id: 'n-9', word: 'Labyrinth', partOfSpeech: 'noun', difficulty: 'advanced', definition: 'A complicated irregular network of passages or paths; a maze.', exampleSentence: 'The library was a labyrinth of ancient towering bookshelves.' },
  { id: 'n-10', word: 'Petrichor', partOfSpeech: 'noun', difficulty: 'advanced', definition: 'A pleasant smell that frequently accompanies the first rain after dry weather.', exampleSentence: 'The sweet petrichor rose from the sun-baked cobblestones as raindrops fell.' },
  { id: 'n-11', word: 'Cacophony', partOfSpeech: 'noun', difficulty: 'advanced', definition: 'A harsh, discordant mixture of sounds.', exampleSentence: 'A cacophony of blaring horns and street vendors filled the marketplace.' },
  { id: 'n-12', word: 'Solitude', partOfSpeech: 'noun', difficulty: 'advanced', definition: 'The state or situation of being alone, especially peacefully.', exampleSentence: 'She found quiet solace and creative inspiration in mountain solitude.' },
  { id: 'n-13', word: 'Beacon', partOfSpeech: 'noun', difficulty: 'easy', definition: 'A fire or light set up in a high position as a signal.', exampleSentence: 'The lighthouse beacon cut through the dense oceanic fog.' },
  { id: 'n-14', word: 'Telescope', partOfSpeech: 'noun', difficulty: 'easy', definition: 'An optical instrument designed to make distant objects appear nearer.', exampleSentence: 'He aimed his telescope toward Saturn to gaze at its shimmering rings.' },
  { id: 'n-15', word: 'Symphony', partOfSpeech: 'noun', difficulty: 'medium', definition: 'An elaborate musical composition for full orchestra.', exampleSentence: 'The rushing river sounded like a natural symphony in the quiet forest.' },
  { id: 'n-16', word: 'Whistle', partOfSpeech: 'noun', difficulty: 'easy', definition: 'A clear, high-pitched sound made by forcing breath through teeth or a device.', exampleSentence: 'The distant whistle of a midnight train echoed through the valley.' }
];

export const VERBS_LIST: WordItem[] = [
  { id: 'v-1', word: 'Illuminate', partOfSpeech: 'verb', difficulty: 'medium', definition: 'To light up or make something clearly understandable.', exampleSentence: 'Sunlight burst through the shutters to illuminate the dusty parchment.' },
  { id: 'v-2', word: 'Wander', partOfSpeech: 'verb', difficulty: 'easy', definition: 'To walk or move in a leisurely, casual, or aimless way.', exampleSentence: 'They loved to wander through antique shops on rainy Saturday afternoons.' },
  { id: 'v-3', word: 'Whisper', partOfSpeech: 'verb', difficulty: 'easy', definition: 'To speak very softly using breath without vocal cord vibration.', exampleSentence: 'The autumn breeze seemed to whisper ancient secrets through the pine needles.' },
  { id: 'v-4', word: 'Unravel', partOfSpeech: 'verb', difficulty: 'medium', definition: 'To undo twisted, knitted, or woven threads; investigate and solve.', exampleSentence: 'The detective worked tirelessly to unravel the mystery behind the missing painting.' },
  { id: 'v-5', word: 'Ignite', partOfSpeech: 'verb', difficulty: 'easy', definition: 'To catch fire or cause something to catch fire.', exampleSentence: 'A single spark was enough to ignite the dry birch kindling.' },
  { id: 'v-6', word: 'Conquer', partOfSpeech: 'verb', difficulty: 'easy', definition: 'To overcome and take control of a challenge or obstacle.', exampleSentence: 'She trained every morning to conquer the steep alpine summit.' },
  { id: 'v-7', word: 'Navigate', partOfSpeech: 'verb', difficulty: 'medium', definition: 'To plan and direct the course of a ship, aircraft, or journey.', exampleSentence: 'The sailors used ancient celestial constellations to navigate the dark open sea.' },
  { id: 'v-8', word: 'Resonate', partOfSpeech: 'verb', difficulty: 'advanced', definition: 'To produce or be filled with a deep, full, reverberating sound or meaning.', exampleSentence: 'The speaker’s heartfelt words continued to resonate deeply with the audience.' },
  { id: 'v-9', word: 'Decipher', partOfSpeech: 'verb', difficulty: 'advanced', definition: 'To convert code or difficult handwriting into normal language.', exampleSentence: 'Historians worked for decades to decipher the carved stone hieroglyphs.' },
  { id: 'v-10', word: 'Elevate', partOfSpeech: 'verb', difficulty: 'medium', definition: 'To raise to a higher position or state of mind.', exampleSentence: 'Adding fresh rosemary will instantly elevate the flavor of this rustic soup.' },
  { id: 'v-11', word: 'Forging', partOfSpeech: 'verb', difficulty: 'medium', definition: 'To create something through concerted effort or hammer hot metal.', exampleSentence: 'The two rivals bonded over adversity, forging an unbreakable friendship.' },
  { id: 'v-12', word: 'Sculpt', partOfSpeech: 'verb', difficulty: 'easy', definition: 'To shape or fashion a three-dimensional figure or form.', exampleSentence: 'The relentless ocean waves sculpt smooth curves into the granite cliffs.' },
  { id: 'v-13', word: 'Radiate', partOfSpeech: 'verb', difficulty: 'medium', definition: 'To emit energy or warmth; clearly manifest an emotional quality.', exampleSentence: 'Her confident smile seemed to radiate genuine warmth throughout the room.' },
  { id: 'v-14', word: 'Accelerate', partOfSpeech: 'verb', difficulty: 'medium', definition: 'To increase in speed or cause something to happen sooner.', exampleSentence: 'The car began to accelerate smoothly down the mountain highway.' },
  { id: 'v-15', word: 'Surge', partOfSpeech: 'verb', difficulty: 'medium', definition: 'To move suddenly and powerfully forward or upward.', exampleSentence: 'A feeling of profound relief surged through her chest as the letter arrived.' },
  { id: 'v-16', word: 'Glimmer', partOfSpeech: 'verb', difficulty: 'easy', definition: 'To shine faintly with a wavering light.', exampleSentence: 'Distant fireflies began to glimmer softly above the quiet meadow.' }
];

export const ADJECTIVES_LIST: WordItem[] = [
  { id: 'a-1', word: 'Luminous', partOfSpeech: 'adjective', difficulty: 'advanced', definition: 'Full of or shedding light; bright or shining, especially in the dark.', exampleSentence: 'The full moon cast a luminous silver reflection across the calm lake.' },
  { id: 'a-2', word: 'Mysterious', partOfSpeech: 'adjective', difficulty: 'easy', definition: 'Difficult or impossible to understand, explain, or identify.', exampleSentence: 'A mysterious wooden chest with an ornate iron lock sat in the attic corner.' },
  { id: 'a-3', word: 'Vibrant', partOfSpeech: 'adjective', difficulty: 'easy', definition: 'Full of energy and enthusiasm; bright and striking in color.', exampleSentence: 'The bustling spice bazaar was a vibrant collage of sounds and colors.' },
  { id: 'a-4', word: 'Resilient', partOfSpeech: 'adjective', difficulty: 'medium', definition: 'Able to withstand or recover quickly from difficult conditions.', exampleSentence: 'The resilient mountain wildflowers bloomed even through the cold spring frost.' },
  { id: 'a-5', word: 'Ancient', partOfSpeech: 'adjective', difficulty: 'easy', definition: 'Belonging to the very distant past and no longer in existence.', exampleSentence: 'They stood in awe beneath the ancient sequoia trees that predated Rome.' },
  { id: 'a-6', word: 'Serene', partOfSpeech: 'adjective', difficulty: 'medium', definition: 'Calm, peaceful, and untroubled; tranquil.', exampleSentence: 'Early morning paddleboarding across the glass-like water was a serene experience.' },
  { id: 'a-7', word: 'Fierce', partOfSpeech: 'adjective', difficulty: 'easy', definition: 'Having or displaying an intense or ferocious aggressiveness or energy.', exampleSentence: 'A fierce winter blizzard battered against the sturdy timber windows.' },
  { id: 'a-8', word: 'Delicate', partOfSpeech: 'adjective', difficulty: 'easy', definition: 'Very fine in texture or structure; easily broken or damaged.', exampleSentence: 'The spider spun an intricately delicate web between the garden rosebushes.' },
  { id: 'a-9', word: 'Ephemeral', partOfSpeech: 'adjective', difficulty: 'advanced', definition: 'Lasting for a very short time; fleeting or transient.', exampleSentence: 'Rainbows are beautiful yet ephemeral wonders that vanish as the clouds shift.' },
  { id: 'a-10', word: 'Mellifluous', partOfSpeech: 'adjective', difficulty: 'advanced', definition: 'Sweet or musical; pleasant to hear.', exampleSentence: 'The cello soloist filled the concert hall with deep, mellifluous melodies.' },
  { id: 'a-11', word: 'Tenacious', partOfSpeech: 'adjective', difficulty: 'advanced', definition: 'Tending to keep a firm hold of something; clinging or determined.', exampleSentence: 'Her tenacious spirit carried her through every round of the grueling spelling bee.' },
  { id: 'a-12', word: 'Prismatic', partOfSpeech: 'adjective', difficulty: 'advanced', definition: 'Relating to or having the colors produced by a prism; brilliantly varied.', exampleSentence: 'Cut crystal chandeliers cast prismatic bursts of rainbow light across the ballroom.' },
  { id: 'a-13', word: 'Celestial', partOfSpeech: 'adjective', difficulty: 'advanced', definition: 'Positioned in or relating to the sky, or outer space as observed in astronomy.', exampleSentence: 'Astronomers mapped the celestial coordinates of the newly discovered comet.' },
  { id: 'a-14', word: 'Audacious', partOfSpeech: 'adjective', difficulty: 'advanced', definition: 'Showing a willingness to take surprisingly bold risks.', exampleSentence: 'The young architect presented an audacious design for the floating botanical garden.' },
  { id: 'a-15', word: 'Brisk', partOfSpeech: 'adjective', difficulty: 'easy', definition: 'Active, fast, and energetic; pleasantly cool and dry.', exampleSentence: 'A brisk autumn walk along the shoreline cleared her mind before writing.' },
  { id: 'a-16', word: 'Majestic', partOfSpeech: 'adjective', difficulty: 'easy', definition: 'Having or showing impressive beauty or dignity.', exampleSentence: 'A majestic golden eagle soared gracefully over the snowcapped peaks.' }
];

export const EASY_WORDS_LIST: WordItem[] = [
  { id: 'e-1', word: 'Smile', partOfSpeech: 'noun', difficulty: 'easy', definition: 'A pleased, kind, or amused facial expression.', exampleSentence: 'Her warm smile instantly put everyone at ease.' },
  { id: 'e-2', word: 'Brave', partOfSpeech: 'adjective', difficulty: 'easy', definition: 'Ready to face and endure danger or pain; showing courage.', exampleSentence: 'The brave firefighter entered the smoky building without hesitation.' },
  { id: 'e-3', word: 'River', partOfSpeech: 'noun', difficulty: 'easy', definition: 'A large natural stream of water flowing in a channel to the sea.', exampleSentence: 'They launched their red canoe into the gentle winding river.' },
  { id: 'e-4', word: 'Dance', partOfSpeech: 'verb', difficulty: 'easy', definition: 'To move rhythmically to music, typically following steps.', exampleSentence: 'The children began to dance joyfully around the garden fountain.' },
  { id: 'e-5', word: 'Bright', partOfSpeech: 'adjective', difficulty: 'easy', definition: 'Giving out or reflecting a lot of light; shining.', exampleSentence: 'The bright morning sun melted the frosty dew from the grass.' },
  { id: 'e-6', word: 'Friend', partOfSpeech: 'noun', difficulty: 'easy', definition: 'A person whom one knows and with whom one has a bond of mutual affection.', exampleSentence: 'A loyal friend stood by him through every chapter of his life.' },
  { id: 'e-7', word: 'Sing', partOfSpeech: 'verb', difficulty: 'easy', definition: 'To make musical sounds with the voice, especially words with a set tune.', exampleSentence: 'Songbirds began to sing as twilight faded into dawn.' },
  { id: 'e-8', word: 'Garden', partOfSpeech: 'noun', difficulty: 'easy', definition: 'A piece of ground adjoining a house, used for growing flowers, fruit, or vegetables.', exampleSentence: 'Her grandmother tended a lush garden bursting with fragrant lavender.' },
  { id: 'e-9', word: 'Sweet', partOfSpeech: 'adjective', difficulty: 'easy', definition: 'Having the pleasant taste characteristic of sugar or honey.', exampleSentence: 'Fresh wild strawberries offered a delightfully sweet burst of flavor.' },
  { id: 'e-10', word: 'Explore', partOfSpeech: 'verb', difficulty: 'easy', definition: 'To travel in or through an unfamiliar area to learn about it.', exampleSentence: 'They set out at sunrise to explore the hidden mountain trail.' },
  { id: 'e-11', word: 'Golden', partOfSpeech: 'adjective', difficulty: 'easy', definition: 'Made of or resembling gold; having a yellow shiny color.', exampleSentence: 'The golden hour bathed the wheat fields in amber radiance.' },
  { id: 'e-12', word: 'Spark', partOfSpeech: 'noun', difficulty: 'easy', definition: 'A small fiery particle thrown off from a fire; a tiny creative trace.', exampleSentence: 'A single spark of curiosity led to a breakthrough scientific invention.' }
];

export const ADVANCED_WORDS_LIST: WordItem[] = [
  { id: 'adv-1', word: 'Serendipity', partOfSpeech: 'noun', difficulty: 'advanced', definition: 'The occurrence and development of events by chance in a happy or beneficial way.', exampleSentence: 'Finding that rare signed first-edition book was pure serendipity.' },
  { id: 'adv-2', word: 'Ubiquitous', partOfSpeech: 'adjective', difficulty: 'advanced', definition: 'Present, appearing, or found everywhere at the same time.', exampleSentence: 'Smartphones have become ubiquitous in modern global society.' },
  { id: 'adv-3', word: 'Ineffable', partOfSpeech: 'adjective', difficulty: 'advanced', definition: 'Too great or extreme to be expressed or described in words.', exampleSentence: 'Standing before the Grand Canyon filled her with an ineffable sense of awe.' },
  { id: 'adv-4', word: 'Petrichor', partOfSpeech: 'noun', difficulty: 'advanced', definition: 'A pleasant scent of wet earth after warm rain.', exampleSentence: 'He inhaled deeply, savoring the nostalgic petrichor of the summer storm.' },
  { id: 'adv-5', word: 'Quixotic', partOfSpeech: 'adjective', difficulty: 'advanced', definition: 'Exceedingly idealistic; unrealistic and impractical.', exampleSentence: 'His quixotic quest to build a perpetual motion machine inspired many.' },
  { id: 'adv-6', word: 'Perspicacious', partOfSpeech: 'adjective', difficulty: 'advanced', definition: 'Having a ready insight into and understanding of things; shrewd.', exampleSentence: 'The perspicacious detective noticed the misplaced pocket watch immediately.' },
  { id: 'adv-7', word: 'Resplendent', partOfSpeech: 'adjective', difficulty: 'advanced', definition: 'Attractive and impressive through being richly colorful or sumptuous.', exampleSentence: 'The peacock stood resplendent in the botanical garden courtyard.' },
  { id: 'adv-8', word: 'Halcyon', partOfSpeech: 'adjective', difficulty: 'advanced', definition: 'Denoting a period of time in the past that was idyllically happy and peaceful.', exampleSentence: 'He reminisced fondly about the halcyon days of his university studies.' },
  { id: 'adv-9', word: 'Surreptitious', partOfSpeech: 'adjective', difficulty: 'advanced', definition: 'Kept secret, especially because it would not be approved of.', exampleSentence: 'She cast a surreptitious glance at her wristwatch during the lengthy meeting.' },
  { id: 'adv-10', word: 'Labyrinthine', partOfSpeech: 'adjective', difficulty: 'advanced', definition: 'Irregular and twisting; intricately complicated.', exampleSentence: 'The old medina featured labyrinthine alleys lined with spices and rugs.' },
  { id: 'adv-11', word: 'Magnanimous', partOfSpeech: 'adjective', difficulty: 'advanced', definition: 'Generous or forgiving, especially toward a rival or less powerful person.', exampleSentence: 'The champion was magnanimous in victory, praising his opponent’s skill.' },
  { id: 'adv-12', word: 'Alacrity', partOfSpeech: 'noun', difficulty: 'advanced', definition: 'Brisk and cheerful readiness; eager promptness.', exampleSentence: 'She accepted the prestigious fellowship offer with sincere alacrity.' }
];

export const ALL_WORDS_MASTER: WordItem[] = [
  ...NOUNS_LIST,
  ...VERBS_LIST,
  ...ADJECTIVES_LIST,
  ...EASY_WORDS_LIST.filter(w => !NOUNS_LIST.some(n => n.word === w.word)),
  ...ADVANCED_WORDS_LIST.filter(w => !NOUNS_LIST.some(n => n.word === w.word) && !ADJECTIVES_LIST.some(a => a.word === w.word))
];

export const CATEGORY_METADATA: Record<WordCategory, { label: string; tagline: string; color: string; count: number }> = {
  all: { label: 'All Words', tagline: 'Diverse vocabulary spanning all parts of speech', color: '#6366f1', count: ALL_WORDS_MASTER.length },
  nouns: { label: 'Nouns', tagline: 'People, places, objects, landmarks & concepts', color: '#3b82f6', count: NOUNS_LIST.length },
  verbs: { label: 'Verbs', tagline: 'Actions, sensory motions, cognitive feats & transformations', color: '#10b981', count: VERBS_LIST.length },
  adjectives: { label: 'Adjectives', tagline: 'Descriptive, evocative, and sensory modifiers', color: '#f59e0b', count: ADJECTIVES_LIST.length },
  easy: { label: 'Easy Words', tagline: 'High-frequency, accessible words for kids & ESL learners', color: '#06b6d4', count: EASY_WORDS_LIST.length },
  advanced: { label: 'Advanced Words', tagline: 'SAT, GRE, literary & sophisticated vocabulary', color: '#8b5cf6', count: ADVANCED_WORDS_LIST.length },
  custom: { label: 'Custom List', tagline: 'Your personalized spelling lists & vocabulary banks', color: '#ec4899', count: 0 }
};
