export interface AnimalItem {
  id: string;
  name: string;
  emoji: string;
  category: 'mammals' | 'birds' | 'marine' | 'farm' | 'wild' | 'pets' | 'dinosaurs';
  difficulty: 'easy' | 'medium' | 'hard';
  color: string;
  habitat: string;
  diet: 'Herbivore' | 'Carnivore' | 'Omnivore' | 'Piscivore';
  funFact: string;
  sound: string;
  clues: [string, string, string]; // 3 progressive clues for Guess the Animal mode
  challenge: string; // Tailored physical / creative / storytelling challenge
}

export const ANIMAL_CATEGORIES = [
  { id: 'all', label: 'All Animals', icon: '🐾', count: 64 },
  { id: 'mammals', label: 'Mammals', icon: '🦁', count: 16 },
  { id: 'birds', label: 'Birds', icon: '🦅', count: 12 },
  { id: 'marine', label: 'Marine Animals', icon: '🐬', count: 12 },
  { id: 'farm', label: 'Farm Animals', icon: '🐮', count: 10 },
  { id: 'wild', label: 'Wild Animals', icon: '🐘', count: 14 },
  { id: 'pets', label: 'Pets', icon: '🐶', count: 10 },
  { id: 'dinosaurs', label: 'Dinosaurs', icon: '🦖', count: 10 }
] as const;

export const ANIMAL_DATABASE: AnimalItem[] = [
  // Mammals & Wild
  {
    id: 'lion',
    name: 'Lion',
    emoji: '🦁',
    category: 'wild',
    difficulty: 'easy',
    color: '#f59e0b',
    habitat: 'African Savannas & Grasslands',
    diet: 'Carnivore',
    funFact: 'A lion\'s roar can be heard from over 5 miles (8 kilometers) away to mark territory.',
    sound: 'Deep, resonant roar (Rrrroooaaar!)',
    clues: [
      'I am known as the "King of the Jungle", though I mostly live in savannas.',
      'Females do 85% to 90% of the pride\'s hunting while males protect territory.',
      'Adult males sport a magnificent, dark mane of hair around their necks.'
    ],
    challenge: 'MIMIC: Stand up tall, puff out your chest, and let out your most ferocious 5-second lion roar!'
  },
  {
    id: 'elephant',
    name: 'African Elephant',
    emoji: '🐘',
    category: 'wild',
    difficulty: 'easy',
    color: '#64748b',
    habitat: 'Savannas, Forests & Deserts',
    diet: 'Herbivore',
    funFact: 'Elephants have over 40,000 distinct muscles in their trunk alone, allowing them to pick up a single peanut.',
    sound: 'Trumpeting blast (Paawoooo!)',
    clues: [
      'I am the largest living land mammal on Earth.',
      'My large ears are shaped like the continent of Africa and help keep me cool.',
      'I use my long trunk to breathe, drink water, trumpet, and grasp food.'
    ],
    challenge: 'CHARADES: Use your arm as a trunk to spray imaginary water and stomp heavily across the room!'
  },
  {
    id: 'tiger',
    name: 'Bengal Tiger',
    emoji: '🐯',
    category: 'wild',
    difficulty: 'easy',
    color: '#ea580c',
    habitat: 'Tropical Rainforests & Mangroves',
    diet: 'Carnivore',
    funFact: 'No two tigers have the exact same stripe pattern; their stripes are as unique as human fingerprints.',
    sound: 'Throaty growl and chuff',
    clues: [
      'I am the largest species among all wild cats.',
      'Unlike most domestic cats, I love water and am an agile swimmer.',
      'My orange coat is covered in distinctive black vertical camouflage stripes.'
    ],
    challenge: 'DRAWING: Draw a tiger face in 45 seconds, making sure to include at least 6 stripes!'
  },
  {
    id: 'giraffe',
    name: 'Giraffe',
    emoji: '🦒',
    category: 'wild',
    difficulty: 'easy',
    color: '#d97706',
    habitat: 'African Savannas & Open Woodlands',
    diet: 'Herbivore',
    funFact: 'A giraffe\'s tongue is up to 20 inches (50 cm) long and dark bluish-purple to protect it from sunburn.',
    sound: 'Gentle low-frequency hums and snorts',
    clues: [
      'I am the tallest living land animal in the world.',
      'I only need 5 to 30 minutes of sleep in a 24-hour period.',
      'My neck contains only 7 vertebrae—the exact same number as a human neck!'
    ],
    challenge: 'ACT-IT-OUT: Stretch your neck as high as possible and pretend to nibble leaves off the tallest tree canopy!'
  },
  {
    id: 'kangaroo',
    name: 'Red Kangaroo',
    emoji: '🦘',
    category: 'mammals',
    difficulty: 'medium',
    color: '#c2410c',
    habitat: 'Australian Outback & Scrublands',
    diet: 'Herbivore',
    funFact: 'Kangaroos cannot walk backwards because of their specialized, muscular tail and large feet.',
    sound: 'Soft clicks and guttural grunts',
    clues: [
      'I am a marsupial native to the Australian mainland.',
      'Mothers carry their developing babies ("joeys") in a front pouch.',
      'I use my powerful hind legs and tail to leap up to 30 feet in a single bound.'
    ],
    challenge: 'FITNESS: Do 10 giant kangaroo hops across the floor while holding your hands like front paws!'
  },
  {
    id: 'giant-panda',
    name: 'Giant Panda',
    emoji: '🐼',
    category: 'mammals',
    difficulty: 'easy',
    color: '#0f172a',
    habitat: 'Bamboo Forests of Central China',
    diet: 'Herbivore',
    funFact: 'Pandas spend up to 12 hours a day munching on bamboo, consuming up to 28 pounds (12 kg) daily.',
    sound: 'Bleats, barks, and honks',
    clues: [
      'I have distinctive black patches around my eyes and over my ears and round body.',
      'Over 99% of my natural diet consists of fibrous green bamboo.',
      'I have a specialized wrist bone that functions like an opposable thumb.'
    ],
    challenge: 'STORYTELLING: Tell a 30-second story about a panda who accidentally discovered a bamboo pizza!'
  },
  {
    id: 'wolf',
    name: 'Gray Wolf',
    emoji: '🐺',
    category: 'wild',
    difficulty: 'medium',
    color: '#475569',
    habitat: 'Tundra, Taiga & Mountain Forests',
    diet: 'Carnivore',
    funFact: 'Wolves communicate over long distances using complex communal howls with harmonic frequencies.',
    sound: 'Melodic long howl (Awooooo!)',
    clues: [
      'I live and hunt in highly organized family packs led by an alpha pair.',
      'I am the largest wild member of the Canidae (dog) family.',
      'I howl at dusk and dawn to assemble my pack and warn off rivals.'
    ],
    challenge: 'SOUND: Gather your voice and let out a spine-tingling nighttime wolf howl (Awooooo)!'
  },
  {
    id: 'cheetah',
    name: 'Cheetah',
    emoji: '🐆',
    category: 'wild',
    difficulty: 'medium',
    color: '#b45309',
    habitat: 'Grasslands & Savannas',
    diet: 'Carnivore',
    funFact: 'Cheetahs can accelerate from 0 to 60 mph (97 km/h) in just 3 seconds—faster than most sports cars!',
    sound: 'High-pitched chirps and purrs',
    clues: [
      'I am the fastest land animal on planet Earth.',
      'I have distinctive black "tear tracks" running from my eyes down to my mouth.',
      'Unlike other big cats, I cannot roar; I communicate by chirping like a bird!'
    ],
    challenge: 'SPRINT: Run in place as fast as humanly possible for 10 seconds to simulate a 60 mph sprint!'
  },
  {
    id: 'gorilla',
    name: 'Mountain Gorilla',
    emoji: '🦍',
    category: 'mammals',
    difficulty: 'medium',
    color: '#1e293b',
    habitat: 'High-Altitude Volcanic Cloud Forests',
    diet: 'Herbivore',
    funFact: 'Gorillas share approximately 98.3% of their DNA sequence with humans and can learn sign language.',
    sound: 'Chest-beating thumps and deep grunts',
    clues: [
      'Mature dominant males develop silver-gray hair along their backs ("silverbacks").',
      'I make my bed afresh every single evening by weaving leafy branches.',
      'I beat my chest with cupped hands to display strength without violence.'
    ],
    challenge: 'CHEST BEAT: Cup your hands and beat your chest gently while making a friendly gorilla grunt!'
  },
  {
    id: 'sloth',
    name: 'Three-Toed Sloth',
    emoji: '🦥',
    category: 'mammals',
    difficulty: 'easy',
    color: '#78716c',
    habitat: 'Tropical Rainforest Canopy',
    diet: 'Herbivore',
    funFact: 'Sloths move so slowly that green algae actually grows on their fur, helping camouflage them in trees.',
    sound: 'High-pitched whistle or silent sigh',
    clues: [
      'I am the slowest moving mammal in the world, moving at 0.15 mph.',
      'I spend almost my entire life hanging upside down from jungle branches.',
      'I only descend from the tree canopy once a week to use the bathroom.'
    ],
    challenge: 'SLOW-MO: Move in ultra slow-motion for the next 30 seconds as if you are hanging from a rainforest branch!'
  },
  {
    id: 'platypus',
    name: 'Duck-Billed Platypus',
    emoji: '🦆',
    category: 'mammals',
    difficulty: 'hard',
    color: '#0891b2',
    habitat: 'Freshwater Rivers of Eastern Australia',
    diet: 'Carnivore',
    funFact: 'The platypus is one of only two living mammals that lay eggs instead of giving birth to live young.',
    sound: 'Soft growls and clucks',
    clues: [
      'I am a semi-aquatic monotreme with a duck-like bill, beaver tail, and otter feet.',
      'Males have venomous spurs on their hind ankles for defense.',
      'I hunt underwater with my eyes and ears closed using electroreception!'
    ],
    challenge: 'TRIVIA: Name the other egg-laying mammal species in the world! (Answer: The Echidna)'
  },
  {
    id: 'hippopotamus',
    name: 'Hippopotamus',
    emoji: '🦛',
    category: 'wild',
    difficulty: 'medium',
    color: '#6b7280',
    habitat: 'African Rivers, Lakes & Swamps',
    diet: 'Herbivore',
    funFact: 'Hippos secrete an oily red fluid called "blood sweat" that acts as natural sunscreen and moisturizer.',
    sound: 'Loud wheeze-honk that reverberates over water',
    clues: [
      'My Greek name literally translates to "river horse."',
      'Despite weighing up to 3,000 kg, I can run on land at speeds up to 19 mph.',
      'I spend up to 16 hours a day submerged in rivers to stay cool.'
    ],
    challenge: 'YAWN: Open your mouth as wide as a hippo’s massive 150-degree territorial yawn!'
  },

  // Birds
  {
    id: 'bald-eagle',
    name: 'Bald Eagle',
    emoji: '🦅',
    category: 'birds',
    difficulty: 'easy',
    color: '#0284c7',
    habitat: 'Coasts, Lakes & River Basins',
    diet: 'Piscivore',
    funFact: 'Bald eagles have eyesight 4 to 8 times sharper than humans, allowing them to spot a rabbit from 2 miles away.',
    sound: 'High-pitched whistling chatter',
    clues: [
      'I am the national emblem and bird of the United States.',
      'I have a bright white head and tail with a dark brown body and yellow hooked beak.',
      'I build the largest tree nests of any bird species—some weigh over a ton!'
    ],
    challenge: 'FLIGHT: Spread your arms like 7-foot eagle wings and soar smoothly across the room!'
  },
  {
    id: 'emperor-penguin',
    name: 'Emperor Penguin',
    emoji: '🐧',
    category: 'birds',
    difficulty: 'easy',
    color: '#334155',
    habitat: 'Antarctic Sea Ice & Glaciers',
    diet: 'Piscivore',
    funFact: 'Father Emperor penguins balance a single egg on their feet under a warm brood pouch for 65 days in -40°C blizzards.',
    sound: 'Trumpeting two-voice bray',
    clues: [
      'I am a flightless seabird that lives exclusively in Antarctica.',
      'I am the tallest and heaviest of all living penguin species.',
      'I slide across icy terrain on my belly, a technique called "tobogganing."'
    ],
    challenge: 'WADDLE: Tuck your elbows to your sides, keep your feet together, and waddle like a penguin on ice!'
  },
  {
    id: 'flamingo',
    name: 'Greater Flamingo',
    emoji: '🦩',
    category: 'birds',
    difficulty: 'easy',
    color: '#ec4899',
    habitat: 'Shallow Saline Lagoons & Salt Flats',
    diet: 'Omnivore',
    funFact: 'Flamingos are not born pink! They turn vibrant pink from carotenoid pigments in the microscopic algae and brine shrimp they eat.',
    sound: 'Goose-like honking (Honk-honk!)',
    clues: [
      'I am famous for standing effortlessly on one long, skinny leg for hours.',
      'I eat upside down by filtering muddy water through specialized bristles in my beak.',
      'My feathers display iconic shades of coral pink and crimson.'
    ],
    challenge: 'BALANCE: Stand on your left leg only with arms out wide for 15 seconds without tipping over!'
  },
  {
    id: 'toucan',
    name: 'Toco Toucan',
    emoji: '🦜',
    category: 'birds',
    difficulty: 'medium',
    color: '#f97316',
    habitat: 'Neotropical Rainforest Canopy',
    diet: 'Omnivore',
    funFact: 'A toucan\'s oversized bill looks heavy but is made of lightweight keratin honeycomb, functioning as a thermal radiator to cool its body.',
    sound: 'Deep croaking like a tree frog',
    clues: [
      'My bill accounts for over one-third of my total body length.',
      'I use my rainbow-colored beak to pluck berries from slender jungle branches.',
      'When sleeping, I tuck my bill under my wing and fold my tail over my head.'
    ],
    challenge: 'DRAWING: Draw a giant toucan beak and color it with 3 different vibrant colors!'
  },
  {
    id: 'barn-owl',
    name: 'Barn Owl',
    emoji: '🦉',
    category: 'birds',
    difficulty: 'medium',
    color: '#a16207',
    habitat: 'Open Countryside, Farmlands & Barns',
    diet: 'Carnivore',
    funFact: 'Barn owls have specialized serrated fringe on their flight feathers that muffles air turbulence, making their flight 100% silent.',
    sound: 'Eerie raspy screech (not a hoot!)',
    clues: [
      'I have an iconic heart-shaped white facial disc that funnels sound to my ears.',
      'My ears are placed asymmetrically on my skull to triangulate prey in pitch darkness.',
      'I can swivel my head up to 270 degrees without moving my torso.'
    ],
    challenge: 'STEALTH: Take 10 steps across the room without making a single audible sound!'
  },
  {
    id: 'peacock',
    name: 'Indian Peafowl (Peacock)',
    emoji: '🦚',
    category: 'birds',
    difficulty: 'easy',
    color: '#0d9488',
    habitat: 'Forests & Cultivated Lands',
    diet: 'Omnivore',
    funFact: 'Only males are called peacocks; females are peahens, and their babies are called peachicks.',
    sound: 'Loud trumpet call (May-Aww!)',
    clues: [
      'I fan out an iridescent train of upper tail feathers covered in iridescent "eyespot" patterns.',
      'I shimmer in metallic blue, green, and gold tones.',
      'I am the national bird of India and a symbol of royal beauty.'
    ],
    challenge: 'FAN OUT: Open your arms and spread your fingers like a peacock displaying its royal train of feathers!'
  },

  // Marine Animals
  {
    id: 'blue-whale',
    name: 'Blue Whale',
    emoji: '🐋',
    category: 'marine',
    difficulty: 'easy',
    color: '#0284c7',
    habitat: 'Open Oceans Worldwide',
    diet: 'Carnivore',
    funFact: 'A blue whale\'s heart is the size of a small car, and its tongue alone weighs as much as an entire adult elephant.',
    sound: 'Low-frequency infrasonic pulses (travels 1,000 miles)',
    clues: [
      'I am the largest animal ever known to have lived on Earth—even bigger than any dinosaur!',
      'I survive entirely by filtering tiny shrimp-like krill through baleen plates.',
      'My heartbeat can be detected from over two miles away by underwater acoustic sensors.'
    ],
    challenge: 'BREATHE: Take the deepest breath you can and make a giant whale spout sound (Whoooosh) as you exhale!'
  },
  {
    id: 'shark',
    name: 'Great White Shark',
    emoji: '🦈',
    category: 'marine',
    difficulty: 'easy',
    color: '#3b82f6',
    habitat: 'Cool Coastal Waters & Pelagic Zones',
    diet: 'Carnivore',
    funFact: 'Sharks have a "sixth sense" called the Ampullae of Lorenzini that detects microscopic electrical impulses emitted by prey hearts.',
    sound: 'Silent underwater stalker',
    clues: [
      'I have rows of serrated triangular teeth that replace themselves throughout my entire lifetime.',
      'My skeleton is made entirely of flexible cartilage rather than hard bone.',
      'I have a prominent dorsal fin that slices through the ocean surface.'
    ],
    challenge: 'SWIM: Place your hands together above your head like a shark dorsal fin and glide through the room!'
  },
  {
    id: 'octopus',
    name: 'Giant Pacific Octopus',
    emoji: '🐙',
    category: 'marine',
    difficulty: 'medium',
    color: '#dc2626',
    habitat: 'Rocky Pacific Ocean Reefs & Trenches',
    diet: 'Carnivore',
    funFact: 'Octopuses have 3 hearts, 9 brains (one central brain + a mini-brain in each arm), and blue copper-based blood!',
    sound: 'Silent water jet propulsion',
    clues: [
      'I can change both the color and 3D texture of my skin in less than a second.',
      'I have zero bones, enabling me to squeeze through any hole larger than my beak.',
      'I release a cloud of dark ink to confuse predators when escaping.'
    ],
    challenge: 'MULTITASK: Wiggle all 10 fingers independently in wave patterns as if they are flexible octopus tentacles!'
  },
  {
    id: 'sea-turtle',
    name: 'Green Sea Turtle',
    emoji: '🐢',
    category: 'marine',
    difficulty: 'easy',
    color: '#059669',
    habitat: 'Tropical Coral Reefs & Open Seas',
    diet: 'Herbivore',
    funFact: 'Sea turtles navigate thousands of miles across open oceans using Earth\'s geomagnetic magnetic field like a built-in GPS.',
    sound: 'Breathing sighs at the ocean surface',
    clues: [
      'Females return to the exact same beach where they were born to lay their eggs.',
      'I have streamlined paddle-shaped flippers designed for graceful ocean gliding.',
      'Unlike land tortoises, I cannot retract my head and flippers into my shell.'
    ],
    challenge: 'GLIDE: Move your arms in slow, graceful breaststroke swimming motions like a sea turtle drifting on a current!'
  },
  {
    id: 'dolphin',
    name: 'Bottlenose Dolphin',
    emoji: '🐬',
    category: 'marine',
    difficulty: 'easy',
    color: '#06b6d4',
    habitat: 'Warm Temperate & Tropical Oceans',
    diet: 'Piscivore',
    funFact: 'Dolphins sleep with one eye open and half their brain awake so they can continue surfacing for air and watching for predators.',
    sound: 'High-pitched signature whistles and echolocation clicks',
    clues: [
      'I am an extraordinarily intelligent marine mammal that breathes air through a blowhole.',
      'I use echolocation clicks to create 3D acoustic mental maps of my underwater surroundings.',
      'I love leaping out of the water and riding the bow waves of passing boats.'
    ],
    challenge: 'CLICK: Make rapid dolphin clicking and whistling sounds with your tongue and cheeks!'
  },
  {
    id: 'clownfish',
    name: 'Ocellaris Clownfish',
    emoji: '🐠',
    category: 'marine',
    difficulty: 'easy',
    color: '#f97316',
    habitat: 'Warm Indo-Pacific Coral Reefs',
    diet: 'Omnivore',
    funFact: 'Clownfish coat themselves in a specialized mucus layer that makes them immune to the venomous stings of sea anemones.',
    sound: 'Popping and clicking jaw sounds',
    clues: [
      'I have bright orange skin with three distinctive vertical white bands outlined in black.',
      'I live in a symbiotic mutual relationship inside stinging sea anemone tentacles.',
      'I was the star species in the famous animated film "Finding Nemo."'
    ],
    challenge: 'FIN-WIGGLE: Wiggle your hands by your hips like rapid little clownfish fins darting between anemone tentacles!'
  },

  // Farm Animals
  {
    id: 'cow',
    name: 'Holstein Dairy Cow',
    emoji: '🐮',
    category: 'farm',
    difficulty: 'easy',
    color: '#1e293b',
    habitat: 'Pastures, Meadows & Dairy Barns',
    diet: 'Herbivore',
    funFact: 'Cows have nearly 360-degree panoramic vision and form close best-friend bonds with other specific cows in their herd.',
    sound: 'Deep resonant moo (Mooooo!)',
    clues: [
      'I have a specialized stomach with 4 chambers (rumen, reticulum, omasum, abomasum).',
      'I chew my cud (partially digested grass) for up to 8 hours every day.',
      'My iconic black-and-white spotted coat is famous on milk cartons worldwide.'
    ],
    challenge: 'MOO: Let out a long, peaceful pasture cow moo that lasts for at least 6 seconds!'
  },
  {
    id: 'horse',
    name: 'Thoroughbred Horse',
    emoji: '🐴',
    category: 'farm',
    difficulty: 'easy',
    color: '#92400e',
    habitat: 'Grasslands, Ranches & Stables',
    diet: 'Herbivore',
    funFact: 'Horses can sleep both lying down and standing up thanks to a specialized "stay apparatus" locking mechanism in their legs.',
    sound: 'Whinny, neigh, and snort',
    clues: [
      'I have the largest eyes of any land mammal.',
      'Humans have partnered with me for transportation, agriculture, and sport for over 5,000 years.',
      'My gaits include the walk, trot, canter, and full gallop.'
    ],
    challenge: 'GALLOP: Slap your thighs in a rhythmic gallop tempo (Clop-clop-clop) and let out a friendly neigh!'
  },
  {
    id: 'pig',
    name: 'Pot-Bellied Pig',
    emoji: '🐷',
    category: 'farm',
    difficulty: 'easy',
    color: '#f472b6',
    habitat: 'Farms, Woodlands & Barnyards',
    diet: 'Omnivore',
    funFact: 'Pigs are smarter than dogs and can learn to play video games using joysticks with their snouts!',
    sound: 'Snort, grunt, and oink (Oink-oink!)',
    clues: [
      'I do not have functional sweat glands, so I roll in cool mud to regulate my body temperature.',
      'I have an incredible sense of smell and can root out truffles buried deep underground.',
      'I have a curly corkscrew tail and a flexible, sensitive snout disc.'
    ],
    challenge: 'OINK: Wiggle your nose, push the tip gently upwards with your finger, and give 3 friendly oinks!'
  },
  {
    id: 'rooster',
    name: 'Rooster',
    emoji: '🐓',
    category: 'farm',
    difficulty: 'easy',
    color: '#dc2626',
    habitat: 'Farmyards, Coops & Free-Range Fields',
    diet: 'Omnivore',
    funFact: 'Roosters crow at dawn based on their internal circadian biological clock, not just from seeing sunlight.',
    sound: 'Cock-a-doodle-doo!',
    clues: [
      'I have a bright red fleshy comb on my head and wattles under my chin.',
      'I wake up the entire farmyard at the crack of dawn with my loud crow.',
      'I protect my flock of hens from hawks, foxes, and ground predators.'
    ],
    challenge: 'MORNING CROW: Flap your elbows like wings, puff out your chest, and crow your loudest "Cock-a-doodle-doo!"'
  },
  {
    id: 'sheep',
    name: 'Merino Sheep',
    emoji: '🐑',
    category: 'farm',
    difficulty: 'easy',
    color: '#e2e8f0',
    habitat: 'Highland Meadows & Grassy Pastures',
    diet: 'Herbivore',
    funFact: 'Sheep have rectangular pupils that give them an extraordinary 320-degree field of vision without turning their heads.',
    sound: 'Baa (Baaa-aaah!)',
    clues: [
      'My thick fleece of curly wool is sheared once a year to make warm sweaters and blankets.',
      'I have strong flocking instincts and stay tightly grouped with my fellow flock members.',
      'Baby sheep are called lambs.'
    ],
    challenge: 'BAA: Give a gentle, trembling sheep "Baa-aa-aah" while doing 5 jumping jacks!'
  },

  // Pets
  {
    id: 'dog',
    name: 'Golden Retriever',
    emoji: '🐕',
    category: 'pets',
    difficulty: 'easy',
    color: '#eab308',
    habitat: 'Homes, Backyards & Parks',
    diet: 'Omnivore',
    funFact: 'A dog\'s sense of smell is up to 100,000 times more acute than a human\'s, capable of detecting a single teaspoon of sugar in two Olympic swimming pools.',
    sound: 'Joyful bark and panting (Woof-woof!)',
    clues: [
      'I am often celebrated as "Man\'s Best Friend."',
      'I wag my tail vigorously when I am happy and excited to see my family.',
      'I love fetching tennis balls, learning tricks, and getting belly rubs.'
    ],
    challenge: 'TAIL WAG: Wag your hips back and forth like an overjoyed puppy waiting for a treat!'
  },
  {
    id: 'cat',
    name: 'Tabby Cat',
    emoji: '🐈',
    category: 'pets',
    difficulty: 'easy',
    color: '#f97316',
    habitat: 'Living Rooms, Sunlit Windows & Couches',
    diet: 'Carnivore',
    funFact: 'Cats spend approximately 70% of their lives sleeping and 15% of their waking hours grooming their fur.',
    sound: 'Contented purring and gentle meow',
    clues: [
      'I can jump up to six times my own height in a single bound.',
      'I use my sensitive whiskers to gauge whether I can fit through narrow spaces.',
      'I make a soothing vibrating purr when feeling safe and relaxed.'
    ],
    challenge: 'PURR: Curl up your hands like paws, pretend to wash your face with one paw, and give a cute "Meow!"'
  },
  {
    id: 'rabbit',
    name: 'Holland Lop Rabbit',
    emoji: '🐇',
    category: 'pets',
    difficulty: 'easy',
    color: '#d6d3d1',
    habitat: 'Meadows & Cozy Indoor Enclosures',
    diet: 'Herbivore',
    funFact: 'When rabbits are overflowing with pure happiness, they perform an acrobatic leap and mid-air twist called a "binky"!',
    sound: 'Soft tooth-clicking (rabbit purr) and nose twitches',
    clues: [
      'My front teeth never stop growing throughout my life, so I chew hay constantly.',
      'I have long, floppy ears and a soft fluffy cottontail.',
      'I love hopping around and munching on leafy green vegetables and carrots.'
    ],
    challenge: 'BINKY: Do 3 rapid bunny hops followed by a mid-air twist jump (a bunny binky)!'
  },
  {
    id: 'chameleon',
    name: 'Veiled Chameleon',
    emoji: '🦎',
    category: 'pets',
    difficulty: 'hard',
    color: '#84cc16',
    habitat: 'Tropical Shrubs & Terrariums',
    diet: 'Carnivore',
    funFact: 'A chameleon\'s eyes can rotate and focus independently, allowing it to look at two completely different objects simultaneously in a full 360-degree sphere.',
    sound: 'Hissing puff when startled',
    clues: [
      'I have a ballistic tongue that shoots out at twice my body length in 0.07 seconds to snatch insects.',
      'My zygodactylous feet have fused toes that grip tree branches like tongs.',
      'I change colors to communicate mood, temperature, and territorial dominance.'
    ],
    challenge: 'EYE FOCUS: Try looking up with one eye and down with the other (or roll your eyes in opposite circles)!'
  },

  // Dinosaurs
  {
    id: 'trex',
    name: 'Tyrannosaurus Rex',
    emoji: '🦖',
    category: 'dinosaurs',
    difficulty: 'easy',
    color: '#15803d',
    habitat: 'Late Cretaceous Floodplains & Forests',
    diet: 'Carnivore',
    funFact: 'T-Rex had a bite force of approximately 12,800 pounds—enough force to crush an entire car engine block!',
    sound: 'Low-frequency seismic rumble that shakes the earth',
    clues: [
      'My name translates to "Tyrant Lizard King."',
      'I had massive banana-sized serrated teeth up to 12 inches long.',
      'Despite my 40-foot length, I had famously tiny two-clawed arms.'
    ],
    challenge: 'T-REX ARMS: Tuck your elbows tight to your ribs, make tiny claw hands, and stomp while roaring!'
  },
  {
    id: 'triceratops',
    name: 'Triceratops',
    emoji: '🦕',
    category: 'dinosaurs',
    difficulty: 'easy',
    color: '#047857',
    habitat: 'Cretaceous Coastal Plains',
    diet: 'Herbivore',
    funFact: 'A Triceratops skull could grow up to 8 feet (2.5 meters) long—occupying nearly one-third the length of its entire body!',
    sound: 'Deep low bellow like a prehistoric rhino',
    clues: [
      'My name means "Three-Horned Face."',
      'I had a massive solid bone neck frill to defend against predators like T-Rex.',
      'I used my sharp turtle-like beak to slice through tough prehistoric palms and cycads.'
    ],
    challenge: 'THREE HORNS: Hold two index fingers to your forehead and one on your nose like 3 horns and charge gently forward!'
  },
  {
    id: 'velociraptor',
    name: 'Velociraptor',
    emoji: '🦅',
    category: 'dinosaurs',
    difficulty: 'medium',
    color: '#b91c1c',
    habitat: 'Cretaceous Desert Dunes & Arid Scrublands',
    diet: 'Carnivore',
    funFact: 'Real Velociraptors were actually the size of a modern turkey and were covered in downy flight feathers!',
    sound: 'Bird-like raptor screeches and sharp hisses',
    clues: [
      'I had a large, retractable sickle-shaped claw on the second toe of each foot.',
      'I was a swift, agile bipedal hunter with excellent binocular vision.',
      'Fossils prove that my arms had quill knobs, indicating full bird-like plumage.'
    ],
    challenge: 'RAPTOR SPRINT: Crouch low on your tiptoes, hold your hands like feathered claws, and dart left and right!'
  },
  {
    id: 'brachiosaurus',
    name: 'Brachiosaurus',
    emoji: '🦕',
    category: 'dinosaurs',
    difficulty: 'medium',
    color: '#065f46',
    habitat: 'Jurassic River Valleys & Conifer Forests',
    diet: 'Herbivore',
    funFact: 'Unlike other sauropods, Brachiosaurus had front legs longer than its hind legs, giving it a giraffe-like posture that reached 40 feet into the canopy.',
    sound: 'Deep trumpet resonating through a massive neck',
    clues: [
      'My name means "Arm Lizard" because my forelimbs were longer than my hind legs.',
      'I weighed around 40 to 60 metric tons—equivalent to 10 adult African elephants!',
      'My nostrils were located on the top of my skull crest.'
    ],
    challenge: 'CANOPY REACH: Stand on your tiptoes, reach both arms as high as the ceiling, and chew on prehistoric pine needles!'
  },
  {
    id: 'pterodactyl',
    name: 'Pterodactyl (Pteranodon)',
    emoji: '🦇',
    category: 'dinosaurs',
    difficulty: 'medium',
    color: '#7c3aed',
    habitat: 'Prehistoric Coastal Seaways & Cliffs',
    diet: 'Piscivore',
    funFact: 'Pterosaurs were not technically dinosaurs; they were flying reptiles with wing membranes supported by an elongated fourth finger.',
    sound: 'Piercing prehistoric sky shriek',
    clues: [
      'I was a flying reptile that soared over prehistoric oceans hunting fish.',
      'I had a long, backward-pointing cranial crest that helped balance my beak during flight.',
      'My wingspan could reach up to 20 feet (6 meters) across.'
    ],
    challenge: 'DIVE-BOMB: Spread your wings wide, bank left and right like you are gliding over a Cretaceous ocean, and swoop down!'
  },
  {
    id: 'ankylosaurus',
    name: 'Ankylosaurus',
    emoji: '🐢',
    category: 'dinosaurs',
    difficulty: 'hard',
    color: '#854d0e',
    habitat: 'Cretaceous Coastal Forests',
    diet: 'Herbivore',
    funFact: 'Ankylosaurus had heavily armored fused bone plates (osteoderms) even on its eyelids to survive attacks from carnivorous theropods!',
    sound: 'Low grunting thud',
    clues: [
      'I was a living biological tank covered in thick armor plates and bony spikes.',
      'I had a heavy solid bone club at the tip of my tail that could shatter T-Rex bones.',
      'My low-slung, wide body made it almost impossible for predators to flip me over.'
    ],
    challenge: 'TAIL CLUB: Swing your hip and arm around in a wide arc like a heavy bone tail club defending against a predator!'
  }
];
