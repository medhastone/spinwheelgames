import { FoodItem, CuisineType, FoodPresetDefinition } from './types';

export const CUISINE_OPTIONS: { label: string; value: CuisineType }[] = [
  { label: 'All Cuisines', value: 'all' },
  { label: 'Indian & Curry', value: 'indian' },
  { label: 'Asian & Thai', value: 'asian' },
  { label: 'Italian & Pizza', value: 'italian' },
  { label: 'Mexican & Tacos', value: 'mexican' },
  { label: 'American & Diner', value: 'american' },
  { label: 'Mediterranean', value: 'mediterranean' },
  { label: 'Latin American', value: 'latin' },
  { label: 'Global & Fusion', value: 'global' }
];

export const MEAL_TYPE_OPTIONS: {
  label: string;
  value: 'all' | 'breakfast' | 'lunch' | 'dinner' | 'snack' | 'dessert';
  emoji: string;
}[] = [
  { label: 'All Meals', value: 'all', emoji: '🍽️' },
  { label: 'Dinner', value: 'dinner', emoji: '🍲' },
  { label: 'Lunch', value: 'lunch', emoji: '🥪' },
  { label: 'Breakfast', value: 'breakfast', emoji: '🥞' },
  { label: 'Snacks', value: 'snack', emoji: '🥨' },
  { label: 'Desserts', value: 'dessert', emoji: '🍰' }
];

export const FOOD_PRESETS: FoodPresetDefinition[] = [
  {
    id: 'breakfast',
    label: 'Breakfast',
    shortLabel: 'Breakfast',
    emoji: '🥞',
    description: 'Fluffy pancakes, breakfast burritos, acai bowls, avocado toast, and morning classics.',
    filterState: { mealType: 'breakfast', cuisine: 'all', isVegetarianOnly: false, isFastFoodOnly: false, isHealthyOnly: false }
  },
  {
    id: 'lunch',
    label: 'Lunch',
    shortLabel: 'Lunch',
    emoji: '🥪',
    description: 'Crispy wraps, noodle bowls, gourmet sandwiches, grain bowls, and midday fuel.',
    filterState: { mealType: 'lunch', cuisine: 'all', isVegetarianOnly: false, isFastFoodOnly: false, isHealthyOnly: false }
  },
  {
    id: 'dinner',
    label: 'Dinner (Dinner Wheel)',
    shortLabel: 'Dinner',
    emoji: '🍲',
    description: 'Hearty evening meals, comfort curries, pizzas, pastas, sizzling stir-fries, and platters.',
    filterState: { mealType: 'dinner', cuisine: 'all', isVegetarianOnly: false, isFastFoodOnly: false, isHealthyOnly: false }
  },
  {
    id: 'snacks',
    label: 'Snacks',
    shortLabel: 'Snacks',
    emoji: '🥨',
    description: 'Quick bites, samosas, guacamole, bruschetta, edamame, and afternoon cravings.',
    filterState: { mealType: 'snack', cuisine: 'all', isVegetarianOnly: false, isFastFoodOnly: false, isHealthyOnly: false }
  },
  {
    id: 'dessert',
    label: 'Dessert',
    shortLabel: 'Dessert',
    emoji: '🍰',
    description: 'Molten chocolate lava cake, churros, gelato, gulab jamun, and sweet treats.',
    filterState: { mealType: 'dessert', cuisine: 'all', isVegetarianOnly: false, isFastFoodOnly: false, isHealthyOnly: false }
  },
  {
    id: 'fast-food',
    label: 'Fast Food',
    shortLabel: 'Fast Food',
    emoji: '🍔',
    description: 'Double smash burgers, crispy chicken tenders, loaded burritos, and street-style favorites.',
    filterState: { mealType: 'all', cuisine: 'all', isVegetarianOnly: false, isFastFoodOnly: true, isHealthyOnly: false }
  },
  {
    id: 'indian',
    label: 'Indian Food',
    shortLabel: 'Indian',
    emoji: '🍛',
    description: 'Paneer butter masala, rich biryanis, garlic naan, dal makhani, dosas, and fragrant curries.',
    filterState: { mealType: 'all', cuisine: 'indian', isVegetarianOnly: false, isFastFoodOnly: false, isHealthyOnly: false }
  },
  {
    id: 'asian',
    label: 'Asian Food',
    shortLabel: 'Asian',
    emoji: '🍜',
    description: 'Authentic ramen, pad thai, sushi rolls, dim sum, bibimbap, and Thai coconut curries.',
    filterState: { mealType: 'all', cuisine: 'asian', isVegetarianOnly: false, isFastFoodOnly: false, isHealthyOnly: false }
  },
  {
    id: 'vegetarian',
    label: 'Vegetarian',
    shortLabel: 'Vegetarian',
    emoji: '🥗',
    description: '100% meat-free, plant-powered meals, paneer dishes, falafel bowls, and fresh pasta.',
    filterState: { mealType: 'all', cuisine: 'all', isVegetarianOnly: true, isFastFoodOnly: false, isHealthyOnly: false }
  },
  {
    id: 'custom',
    label: 'Custom Food List',
    shortLabel: 'Custom List',
    emoji: '📝',
    description: 'Spin your own favorite restaurants, takeout spots, grocery meal kits, or fridge ingredients.',
    isCustom: true
  }
];

export const FOOD_DATABASE: FoodItem[] = [
  // ==========================================
  // INDIAN CUISINE (AUTHENTIC DISHES)
  // ==========================================
  {
    id: 'f-in-1',
    name: 'Butter Chicken (Murgh Makhani)',
    emoji: '🍛',
    mealTypes: ['lunch', 'dinner'],
    cuisine: 'indian',
    isVegetarian: false,
    isFastFood: false,
    isHealthy: false,
    description: 'Tender tandoori chicken cooked in a velvety, buttery tomato gravy infused with fenugreek and cream.',
    popularPairing: 'Hot garlic butter naan & steamed jeera rice',
    estimatedPrepTime: '25-35 mins'
  },
  {
    id: 'f-in-2',
    name: 'Paneer Butter Masala',
    emoji: '🧀',
    mealTypes: ['lunch', 'dinner'],
    cuisine: 'indian',
    isVegetarian: true,
    isFastFood: false,
    isHealthy: false,
    description: 'Succulent cubes of fresh cottage cheese simmered in a luscious spiced onion-tomato cashew gravy.',
    popularPairing: 'Tandoori roti and pickled red onions',
    estimatedPrepTime: '20-30 mins'
  },
  {
    id: 'f-in-3',
    name: 'Hyderabadi Chicken Dum Biryani',
    emoji: '🍗',
    mealTypes: ['lunch', 'dinner'],
    cuisine: 'indian',
    isVegetarian: false,
    isFastFood: false,
    isHealthy: false,
    description: 'Fragrant basmati rice slow-cooked in sealed dum with marinated chicken, saffron, fried onions, and whole spices.',
    popularPairing: 'Cool cucumber raita and spicy mirchi ka salan',
    estimatedPrepTime: '30-40 mins'
  },
  {
    id: 'f-in-4',
    name: 'Royal Vegetable Dum Biryani',
    emoji: '🍚',
    mealTypes: ['lunch', 'dinner'],
    cuisine: 'indian',
    isVegetarian: true,
    isFastFood: false,
    isHealthy: true,
    description: 'Layered fragrant saffron basmati rice with spiced fresh veggies, paneer, mint, and toasted cashews.',
    popularPairing: 'Boondi raita and roasted papad',
    estimatedPrepTime: '25-35 mins'
  },
  {
    id: 'f-in-5',
    name: 'Palak Paneer with Garlic Naan',
    emoji: '🥬',
    mealTypes: ['lunch', 'dinner'],
    cuisine: 'indian',
    isVegetarian: true,
    isFastFood: false,
    isHealthy: true,
    description: 'Fresh paneer cubes folded into a vibrantly spiced, creamy smooth spinach puree with garlic and ginger.',
    popularPairing: 'Charred garlic naan bread',
    estimatedPrepTime: '20-25 mins'
  },
  {
    id: 'f-in-6',
    name: 'Chole Bhature (Chana Masala)',
    emoji: '🫓',
    mealTypes: ['breakfast', 'lunch'],
    cuisine: 'indian',
    isVegetarian: true,
    isFastFood: true,
    isHealthy: false,
    description: 'Robust, spicy dark chickpea curry accompanied by fluffy, golden deep-fried fermented sourdough bhature bread.',
    popularPairing: 'Pickled green chilies and sliced red onions',
    estimatedPrepTime: '20 mins'
  },
  {
    id: 'f-in-7',
    name: 'Masala Dosa with Sambar & Chutney',
    emoji: '🥞',
    mealTypes: ['breakfast', 'dinner'],
    cuisine: 'indian',
    isVegetarian: true,
    isFastFood: true,
    isHealthy: true,
    description: 'Crispy fermented lentil crepe rolled around spiced mustard potato masala, served with piping hot vegetable stew.',
    popularPairing: 'Creamy coconut chutney and tomato chutney',
    estimatedPrepTime: '15-20 mins'
  },
  {
    id: 'f-in-8',
    name: 'Dal Makhani Slow-Cooked',
    emoji: '🥣',
    mealTypes: ['lunch', 'dinner'],
    cuisine: 'indian',
    isVegetarian: true,
    isFastFood: false,
    isHealthy: true,
    description: 'Black lentils and red kidney beans slow-simmered for 12 hours with butter, cream, and smoky aromatic spices.',
    popularPairing: 'Steamed basmati rice or tandoori paratha',
    estimatedPrepTime: '25 mins'
  },
  {
    id: 'f-in-9',
    name: 'Tandoori Chicken Tikka Platter',
    emoji: '🍢',
    mealTypes: ['dinner', 'snack'],
    cuisine: 'indian',
    isVegetarian: false,
    isFastFood: true,
    isHealthy: true,
    description: 'Smoky skewered chicken breast cubes marinated in hung yogurt, Kashmiri chili, garam masala, and lemon juice.',
    popularPairing: 'Cool mint coriander chutney and lemon wedges',
    estimatedPrepTime: '20 mins'
  },
  {
    id: 'f-in-10',
    name: 'Crispy Punjabi Samosas (Pair)',
    emoji: '🥟',
    mealTypes: ['snack'],
    cuisine: 'indian',
    isVegetarian: true,
    isFastFood: true,
    isHealthy: false,
    description: 'Flaky pastry pyramids stuffed with spiced potatoes, green peas, cumin, and coriander seeds.',
    popularPairing: 'Sweet tamarind chutney and spicy mint dip',
    estimatedPrepTime: '10 mins'
  },
  {
    id: 'f-in-11',
    name: 'Mumbai Pav Bhaji',
    emoji: '🥘',
    mealTypes: ['lunch', 'dinner', 'snack'],
    cuisine: 'indian',
    isVegetarian: true,
    isFastFood: true,
    isHealthy: false,
    description: 'Spiced thick vegetable mash cooked on a giant flat top with generous butter, served with toasted soft dinner rolls.',
    popularPairing: 'Extra butter dollop and diced onions',
    estimatedPrepTime: '15-20 mins'
  },
  {
    id: 'f-in-12',
    name: 'Warm Gulab Jamun with Cardamom Syrup',
    emoji: '🍯',
    mealTypes: ['dessert'],
    cuisine: 'indian',
    isVegetarian: true,
    isFastFood: false,
    isHealthy: false,
    description: 'Melt-in-mouth soft milk-solid dumplings soaked in aromatic rosewater and cardamom infused sugar syrup.',
    popularPairing: 'Scoop of vanilla ice cream',
    estimatedPrepTime: '5 mins'
  },
  {
    id: 'f-in-13',
    name: 'Mango Kulfi & Pistachio Falooda',
    emoji: '🍦',
    mealTypes: ['dessert', 'snack'],
    cuisine: 'indian',
    isVegetarian: true,
    isFastFood: false,
    isHealthy: false,
    description: 'Traditional dense Indian mango ice cream flavored with saffron, crushed pistachios, and slivered almonds.',
    popularPairing: 'Rose basil seeds falooda',
    estimatedPrepTime: '5 mins'
  },

  // ==========================================
  // ASIAN CUISINE (THAI, JAPANESE, CHINESE, KOREAN, VIETNAMESE)
  // ==========================================
  {
    id: 'f-as-1',
    name: 'Authentic Pad Thai Noodles',
    emoji: '🍜',
    mealTypes: ['lunch', 'dinner'],
    cuisine: 'asian',
    isVegetarian: false,
    isFastFood: true,
    isHealthy: true,
    description: 'Wok-tossed rice noodles with shrimp, tofu, bean sprouts, scrambled egg, tamarind sauce, and crushed peanuts.',
    popularPairing: 'Fresh lime squeeze and Thai iced tea',
    estimatedPrepTime: '15-20 mins'
  },
  {
    id: 'f-as-2',
    name: 'Rich Tonkotsu Pork Ramen',
    emoji: '🍜',
    mealTypes: ['lunch', 'dinner'],
    cuisine: 'asian',
    isVegetarian: false,
    isFastFood: false,
    isHealthy: false,
    description: 'Steaming wheat noodles in a 16-hour simmered pork bone broth with chashu pork belly, ajitsuke tamago egg, and nori.',
    popularPairing: 'Crispy pork gyoza dumplings',
    estimatedPrepTime: '20 mins'
  },
  {
    id: 'f-as-3',
    name: 'Salmon & Spicy Tuna Sushi Platter',
    emoji: '🍣',
    mealTypes: ['lunch', 'dinner'],
    cuisine: 'asian',
    isVegetarian: false,
    isFastFood: false,
    isHealthy: true,
    description: 'Fresh Atlantic salmon nigiri, spicy tuna rolls with avocado, cucumber, and sesame seeds over seasoned sushi rice.',
    popularPairing: 'Warm edamame and miso soup',
    estimatedPrepTime: '15-20 mins'
  },
  {
    id: 'f-as-4',
    name: 'Steamed Dim Sum Dumplings & Har Gow',
    emoji: '🥟',
    mealTypes: ['lunch', 'snack'],
    cuisine: 'asian',
    isVegetarian: false,
    isFastFood: true,
    isHealthy: true,
    description: 'Translucent crystal shrimp dumplings and pork siu mai steamed in bamboo baskets, served with chili crisp.',
    popularPairing: 'Hot jasmine tea',
    estimatedPrepTime: '15 mins'
  },
  {
    id: 'f-as-5',
    name: 'Vietnamese Beef Pho Bo',
    emoji: '🍲',
    mealTypes: ['lunch', 'dinner'],
    cuisine: 'asian',
    isVegetarian: false,
    isFastFood: false,
    isHealthy: true,
    description: 'Aromatic star-anise beef bone broth with tender rice noodles, thinly sliced brisket, Thai basil, and bean sprouts.',
    popularPairing: 'Hoisin sauce, sriracha, and fresh lime',
    estimatedPrepTime: '20 mins'
  },
  {
    id: 'f-as-6',
    name: 'Thai Green Coconut Curry with Jasmine Rice',
    emoji: '🍛',
    mealTypes: ['lunch', 'dinner'],
    cuisine: 'asian',
    isVegetarian: true,
    isFastFood: false,
    isHealthy: true,
    description: 'Aromatic coconut milk curry with lemongrass, Thai green chilies, bamboo shoots, eggplant, and fragrant Thai basil.',
    popularPairing: 'Fluffy steamed jasmine rice',
    estimatedPrepTime: '20-25 mins'
  },
  {
    id: 'f-as-7',
    name: 'Korean Sizzling Dolsot Bibimbap',
    emoji: '🍚',
    mealTypes: ['lunch', 'dinner'],
    cuisine: 'asian',
    isVegetarian: true,
    isFastFood: false,
    isHealthy: true,
    description: 'Warm short-grain rice served in a hot stone bowl with sautéed seasoned vegetables, kimchi, fried egg, and gochujang.',
    popularPairing: 'Fermented napa cabbage kimchi',
    estimatedPrepTime: '20 mins'
  },
  {
    id: 'f-as-8',
    name: 'Crispy Pork Belly Bao Buns',
    emoji: '🥟',
    mealTypes: ['lunch', 'snack'],
    cuisine: 'asian',
    isVegetarian: false,
    isFastFood: true,
    isHealthy: false,
    description: 'Fluffy steamed lotus leaf buns filled with glazed caramelized pork belly, pickled cucumbers, scallions, and hoisin.',
    popularPairing: 'Sweet potato fries with kewpie mayo',
    estimatedPrepTime: '15 mins'
  },
  {
    id: 'f-as-9',
    name: 'Spicy Tom Yum Goong Soup',
    emoji: '🥣',
    mealTypes: ['lunch', 'dinner'],
    cuisine: 'asian',
    isVegetarian: false,
    isFastFood: false,
    isHealthy: true,
    description: 'Hot and sour Thai soup with tiger prawns, kaffir lime leaves, galangal, lemongrass, straw mushrooms, and chili oil.',
    popularPairing: 'Steamed white rice',
    estimatedPrepTime: '15-20 mins'
  },
  {
    id: 'f-as-10',
    name: 'Japanese Chicken Katsu Curry',
    emoji: '🍛',
    mealTypes: ['lunch', 'dinner'],
    cuisine: 'asian',
    isVegetarian: false,
    isFastFood: true,
    isHealthy: false,
    description: 'Crispy panko-breaded deep-fried chicken cutlet served with thick, savory Japanese golden curry sauce and rice.',
    popularPairing: 'Pickled fukujinzuke radish',
    estimatedPrepTime: '20-25 mins'
  },

  // ==========================================
  // BREAKFAST ITEMS
  // ==========================================
  {
    id: 'f-b-1',
    name: 'Fluffy Buttermilk Pancakes',
    emoji: '🥞',
    mealTypes: ['breakfast'],
    cuisine: 'american',
    isVegetarian: true,
    isFastFood: false,
    isHealthy: false,
    description: 'Golden, tender pancake stack served with warm pure maple syrup and melted salted sweet cream butter.',
    popularPairing: 'Crispy hash browns or fresh blueberries',
    estimatedPrepTime: '15 mins'
  },
  {
    id: 'f-b-2',
    name: 'Avocado Toast with Poached Egg',
    emoji: '🥑',
    mealTypes: ['breakfast', 'snack'],
    cuisine: 'global',
    isVegetarian: true,
    isFastFood: false,
    isHealthy: true,
    description: 'Crushed ripe Haas avocado on sourdough toast topped with microgreens, runny poached egg, and red pepper flakes.',
    popularPairing: 'Iced cold brew coffee',
    estimatedPrepTime: '10 mins'
  },
  {
    id: 'f-b-3',
    name: 'Loaded Breakfast Burrito',
    emoji: '🌯',
    mealTypes: ['breakfast', 'lunch'],
    cuisine: 'mexican',
    isVegetarian: false,
    isFastFood: true,
    isHealthy: false,
    description: 'Scrambled eggs, crispy hash browns, melted cheddar cheese, smoky chorizo, and fire-roasted salsa.',
    popularPairing: 'Spicy salsa verde',
    estimatedPrepTime: '12 mins'
  },
  {
    id: 'f-b-4',
    name: 'Greek Yogurt & Berry Parfait',
    emoji: '🫐',
    mealTypes: ['breakfast', 'snack'],
    cuisine: 'mediterranean',
    isVegetarian: true,
    isFastFood: false,
    isHealthy: true,
    description: 'Creamy high-protein Greek yogurt layered with raw clover honey, cinnamon granola, and organic mixed berries.',
    popularPairing: 'Green jasmine tea',
    estimatedPrepTime: '5 mins'
  },
  {
    id: 'f-b-5',
    name: 'Belgian Waffles with Strawberries',
    emoji: '🧇',
    mealTypes: ['breakfast', 'dessert'],
    cuisine: 'american',
    isVegetarian: true,
    isFastFood: false,
    isHealthy: false,
    description: 'Crisp exterior, airy interior grid waffle topped with fresh sliced strawberries and whipped vanilla cream.',
    popularPairing: 'Double espresso or hot cocoa',
    estimatedPrepTime: '15 mins'
  },
  {
    id: 'f-b-6',
    name: 'Traditional Mediterranean Shakshuka',
    emoji: '🍳',
    mealTypes: ['breakfast', 'lunch'],
    cuisine: 'mediterranean',
    isVegetarian: true,
    isFastFood: false,
    isHealthy: true,
    description: 'Eggs gently poached in a spiced tomato, red bell pepper, garlic, and cumin sauce topped with creamy feta.',
    popularPairing: 'Warm crusty sourdough or pita bread',
    estimatedPrepTime: '20 mins'
  },
  {
    id: 'f-b-7',
    name: 'Toasted Bagel with Lox & Cream Cheese',
    emoji: '🥯',
    mealTypes: ['breakfast', 'lunch'],
    cuisine: 'american',
    isVegetarian: false,
    isFastFood: false,
    isHealthy: true,
    description: 'Freshly toasted everything bagel with smooth cream cheese, smoked salmon, capers, dill, and red onion.',
    popularPairing: 'Fresh squeezed orange juice',
    estimatedPrepTime: '8 mins'
  },
  {
    id: 'f-b-8',
    name: 'Acai Superfood Smoothie Bowl',
    emoji: '🥣',
    mealTypes: ['breakfast', 'snack'],
    cuisine: 'latin',
    isVegetarian: true,
    isFastFood: false,
    isHealthy: true,
    description: 'Thick frozen organic acai purée topped with sliced bananas, chia seeds, coconut flakes, and crunchy granola.',
    popularPairing: 'Iced matcha latte',
    estimatedPrepTime: '8 mins'
  },
  {
    id: 'f-b-9',
    name: 'Classic Eggs Benedict on English Muffin',
    emoji: '🥚',
    mealTypes: ['breakfast', 'lunch'],
    cuisine: 'american',
    isVegetarian: false,
    isFastFood: false,
    isHealthy: false,
    description: 'Poached eggs and Canadian bacon over toasted English muffin halves, smothered in velvety lemon hollandaise sauce.',
    popularPairing: 'Seasoned breakfast potatoes',
    estimatedPrepTime: '20 mins'
  },
  {
    id: 'f-b-10',
    name: 'Steel-Cut Oatmeal with Banana & Nuts',
    emoji: '🥣',
    mealTypes: ['breakfast'],
    cuisine: 'american',
    isVegetarian: true,
    isFastFood: false,
    isHealthy: true,
    description: 'Warm cinnamon-spiced steel-cut oats topped with caramelized banana slices, toasted walnuts, and pure maple drizzle.',
    popularPairing: 'Chai tea or almond milk',
    estimatedPrepTime: '10 mins'
  },

  // ==========================================
  // LUNCH & FAST FOOD ITEMS
  // ==========================================
  {
    id: 'f-l-1',
    name: 'Smash Double Cheeseburger & Fries',
    emoji: '🍔',
    mealTypes: ['lunch', 'dinner'],
    cuisine: 'american',
    isVegetarian: false,
    isFastFood: true,
    isHealthy: false,
    description: 'Two crispy-edged smashed beef patties with melted American cheese, caramelized onions, pickles, and secret spread.',
    popularPairing: 'Crispy salted shoestring french fries',
    estimatedPrepTime: '15 mins'
  },
  {
    id: 'f-l-2',
    name: 'Crispy Chicken Sandwich with Pickles',
    emoji: '🥪',
    mealTypes: ['lunch', 'dinner'],
    cuisine: 'american',
    isVegetarian: false,
    isFastFood: true,
    isHealthy: false,
    description: 'Buttermilk-brined fried chicken breast with garlic herb mayo and crunchy crinkle-cut dill pickles on a brioche bun.',
    popularPairing: 'Waffle fries and iced lemonade',
    estimatedPrepTime: '15 mins'
  },
  {
    id: 'f-l-3',
    name: 'Street Tacos Trio (Carne Asada / Veggie)',
    emoji: '🌮',
    mealTypes: ['lunch', 'dinner'],
    cuisine: 'mexican',
    isVegetarian: false,
    isFastFood: true,
    isHealthy: true,
    description: 'Warm corn tortillas topped with tender grilled skirt steak, diced white onions, cilantro, and roasted habanero salsa.',
    popularPairing: 'Horchata or cold Mexican soda',
    estimatedPrepTime: '12 mins'
  },
  {
    id: 'f-l-4',
    name: 'Crispy Falafel Mezze Wrap with Tahini',
    emoji: '🥙',
    mealTypes: ['lunch', 'dinner'],
    cuisine: 'mediterranean',
    isVegetarian: true,
    isFastFood: true,
    isHealthy: true,
    description: 'Golden spiced chickpea falafel patties tucked in pita with shredded romaine, cucumber-tomato salad, and creamy sesame tahini.',
    popularPairing: 'Pickled turnip spears & hummus',
    estimatedPrepTime: '10 mins'
  },
  {
    id: 'f-l-5',
    name: 'Artisan Grilled Cheese & Tomato Bisque',
    emoji: '🧀',
    mealTypes: ['lunch'],
    cuisine: 'american',
    isVegetarian: true,
    isFastFood: true,
    isHealthy: false,
    description: 'Gooey sharp white cheddar and gruyere melted between butter-toasted thick sourdough, served with rich tomato basil soup.',
    popularPairing: 'Creamy tomato soup for dipping',
    estimatedPrepTime: '12 mins'
  },
  {
    id: 'f-l-6',
    name: 'Classic Caesar Salad with Grilled Chicken',
    emoji: '🥗',
    mealTypes: ['lunch', 'dinner'],
    cuisine: 'american',
    isVegetarian: false,
    isFastFood: false,
    isHealthy: true,
    description: 'Crisp romaine hearts tossed in creamy anchovy-garlic dressing with shaved Parmigiano-Reggiano, herb croutons, and grilled chicken.',
    popularPairing: 'Sparkling lemon water',
    estimatedPrepTime: '15 mins'
  },
  {
    id: 'f-l-7',
    name: 'Poke Bowl with Ahi Tuna & Avocado',
    emoji: '🥗',
    mealTypes: ['lunch', 'dinner'],
    cuisine: 'asian',
    isVegetarian: false,
    isFastFood: true,
    isHealthy: true,
    description: 'Sashimi-grade marinated ahi tuna cubes over sushi rice with edamame, sliced avocado, sea salad, and spicy ponzu drizzle.',
    popularPairing: 'Iced unsweetened green tea',
    estimatedPrepTime: '10 mins'
  },
  {
    id: 'f-l-8',
    name: 'Chicken Shawarma Plate with Garlic Toum',
    emoji: '🥙',
    mealTypes: ['lunch', 'dinner'],
    cuisine: 'mediterranean',
    isVegetarian: false,
    isFastFood: true,
    isHealthy: true,
    description: 'Spit-roasted spiced chicken carved thin over turmeric basmati rice, served with whipped Lebanese garlic toum and pita.',
    popularPairing: 'Fattoush salad and sumac onions',
    estimatedPrepTime: '15 mins'
  },
  {
    id: 'f-l-9',
    name: 'Crispy Fish & Chips with Tartar Sauce',
    emoji: '🐟',
    mealTypes: ['lunch', 'dinner'],
    cuisine: 'american',
    isVegetarian: false,
    isFastFood: true,
    isHealthy: false,
    description: 'Beer-battered flaky Atlantic cod fillets fried to a golden crunch, served with thick-cut chips and tangy house tartar sauce.',
    popularPairing: 'Malted vinegar and mushy peas',
    estimatedPrepTime: '20 mins'
  },

  // ==========================================
  // DINNER CLASSICS (DINNER WHEEL FAVORITES)
  // ==========================================
  {
    id: 'f-d-1',
    name: 'Wood-Fired Margherita & Pepperoni Pizza',
    emoji: '🍕',
    mealTypes: ['dinner'],
    cuisine: 'italian',
    isVegetarian: false,
    isFastFood: true,
    isHealthy: false,
    description: 'Charred bubbly sourdough crust topped with San Marzano tomato sauce, fresh mozzarella fior di latte, basil, and pepperoni.',
    popularPairing: 'Cold craft beer or Italian soda',
    estimatedPrepTime: '20 mins'
  },
  {
    id: 'f-d-2',
    name: 'Authentic Roman Spaghetti Carbonara',
    emoji: '🍝',
    mealTypes: ['dinner'],
    cuisine: 'italian',
    isVegetarian: false,
    isFastFood: false,
    isHealthy: false,
    description: 'Al dente spaghetti tossed with crispy cured guanciale, rich egg yolks, aged Pecorino Romano cheese, and coarse cracked black pepper.',
    popularPairing: 'Arugula and shaved parmesan side salad',
    estimatedPrepTime: '25 mins'
  },
  {
    id: 'f-d-3',
    name: 'Pan-Seared Salmon with Lemon Herb Butter',
    emoji: '🍣',
    mealTypes: ['dinner'],
    cuisine: 'mediterranean',
    isVegetarian: false,
    isFastFood: false,
    isHealthy: true,
    description: 'Crispy-skin wild salmon fillet seared in cast iron, drizzled with garlic-dill butter, alongside roasted asparagus and quinoa.',
    popularPairing: 'Chilled sparkling water with lime',
    estimatedPrepTime: '25 mins'
  },
  {
    id: 'f-d-4',
    name: 'Grilled Ribeye Steak with Herb Butter',
    emoji: '🥩',
    mealTypes: ['dinner'],
    cuisine: 'american',
    isVegetarian: false,
    isFastFood: false,
    isHealthy: false,
    description: 'Prime marbling ribeye steak flame-grilled to medium-rare, topped with melting rosemary garlic butter and mashed potatoes.',
    popularPairing: 'Steamed green beans or wedge salad',
    estimatedPrepTime: '30 mins'
  },
  {
    id: 'f-d-5',
    name: 'Classic Creamy Fettuccine Alfredo',
    emoji: '🍝',
    mealTypes: ['dinner'],
    cuisine: 'italian',
    isVegetarian: true,
    isFastFood: false,
    isHealthy: false,
    description: 'Fresh ribbons of pasta swirled in an emulsion of rich heavy cream, butter, and freshly grated 24-month Parmigiano-Reggiano.',
    popularPairing: 'Warm garlic knots',
    estimatedPrepTime: '20 mins'
  },
  {
    id: 'f-d-6',
    name: 'Mediterranean Greek Mezze Bowl',
    emoji: '🥗',
    mealTypes: ['dinner', 'lunch'],
    cuisine: 'mediterranean',
    isVegetarian: true,
    isFastFood: false,
    isHealthy: true,
    description: 'Herbed brown rice topped with kalamata olives, diced cucumbers, cherry tomatoes, creamy hummus, feta block, and tzatziki.',
    popularPairing: 'Grilled warm whole-wheat pita bread',
    estimatedPrepTime: '15 mins'
  },
  {
    id: 'f-d-7',
    name: 'Slow-Cooked Hearty Beef or Lentil Chili',
    emoji: '🍲',
    mealTypes: ['dinner'],
    cuisine: 'american',
    isVegetarian: false,
    isFastFood: false,
    isHealthy: true,
    description: 'Thick comforting chili simmered with ground beef, kidney beans, chipotle peppers, cocoa powder, and melted cheddar on top.',
    popularPairing: 'Warm honey cornbread slice',
    estimatedPrepTime: '35 mins'
  },
  {
    id: 'f-d-8',
    name: 'Crispy Vegetarian Enchiladas Verdes',
    emoji: '🌯',
    mealTypes: ['dinner'],
    cuisine: 'mexican',
    isVegetarian: true,
    isFastFood: false,
    isHealthy: true,
    description: 'Corn tortillas stuffed with black beans, sweet corn, and queso fresco, baked under tangy roasted tomatillo salsa verde.',
    popularPairing: 'Mexican red rice and refried beans',
    estimatedPrepTime: '30 mins'
  },

  // ==========================================
  // SNACKS & QUICK BITES
  // ==========================================
  {
    id: 'f-sn-1',
    name: 'Fresh Guacamole & Warm Tortilla Chips',
    emoji: '🥑',
    mealTypes: ['snack'],
    cuisine: 'mexican',
    isVegetarian: true,
    isFastFood: true,
    isHealthy: true,
    description: 'Ripe Hass avocados mashed with lime, cilantro, red onion, tomato, and jalapeño, served with hot crispy corn tortilla chips.',
    popularPairing: 'Fresh lime sparkling soda',
    estimatedPrepTime: '5 mins'
  },
  {
    id: 'f-sn-2',
    name: 'Tomato Basil Bruschetta on Ciabatta',
    emoji: '🍞',
    mealTypes: ['snack'],
    cuisine: 'italian',
    isVegetarian: true,
    isFastFood: false,
    isHealthy: true,
    description: 'Toasted garlic-rubbed artisan bread slices topped with marinated heirloom tomatoes, fresh basil, extra virgin olive oil, and balsamic glaze.',
    popularPairing: 'Chilled herbal iced tea',
    estimatedPrepTime: '10 mins'
  },
  {
    id: 'f-sn-3',
    name: 'Steamed Edamame with Flaky Sea Salt',
    emoji: '🫛',
    mealTypes: ['snack'],
    cuisine: 'asian',
    isVegetarian: true,
    isFastFood: true,
    isHealthy: true,
    description: 'Young soy bean pods steamed tender and sprinkled with coarse Maldon sea salt flakes and roasted sesame oil.',
    popularPairing: 'Matcha green tea',
    estimatedPrepTime: '5 mins'
  },
  {
    id: 'f-sn-4',
    name: 'Soft Bavarian Pretzel with Warm Beer Cheese',
    emoji: '🥨',
    mealTypes: ['snack'],
    cuisine: 'american',
    isVegetarian: true,
    isFastFood: true,
    isHealthy: false,
    description: 'Jumbo twisted sourdough pretzel brushed with butter and coarse salt crystals, paired with velvety sharp cheddar cheese dip.',
    popularPairing: 'Whole-grain spicy mustard',
    estimatedPrepTime: '8 mins'
  },

  // ==========================================
  // DESSERTS & SWEET FINISHES
  // ==========================================
  {
    id: 'f-ds-1',
    name: 'Warm Chocolate Lava Cake',
    emoji: '🍫',
    mealTypes: ['dessert'],
    cuisine: 'global',
    isVegetarian: true,
    isFastFood: false,
    isHealthy: false,
    description: 'Decadent dark chocolate cake with a molten flowing fudge center, dusted with powdered sugar and served with vanilla gelato.',
    popularPairing: 'Double espresso or cold whole milk',
    estimatedPrepTime: '15 mins'
  },
  {
    id: 'f-ds-2',
    name: 'Classic Italian Espresso Tiramisu',
    emoji: '☕',
    mealTypes: ['dessert'],
    cuisine: 'italian',
    isVegetarian: true,
    isFastFood: false,
    isHealthy: false,
    description: 'Coffee-soaked Savoiardi ladyfingers layered with whipped mascarpone cream and dusted with Dutch cocoa powder.',
    popularPairing: 'Hot cappuccino',
    estimatedPrepTime: '10 mins'
  },
  {
    id: 'f-ds-3',
    name: 'Crispy Cinnamon Sugar Churros',
    emoji: '🥖',
    mealTypes: ['dessert', 'snack'],
    cuisine: 'latin',
    isVegetarian: true,
    isFastFood: true,
    isHealthy: false,
    description: 'Golden piped fried pastry tossed in fragrant cinnamon sugar, accompanied by warm Mexican chocolate and dulce de leche dips.',
    popularPairing: 'Mexican spiced hot chocolate',
    estimatedPrepTime: '10 mins'
  },
  {
    id: 'f-ds-4',
    name: 'New York Style Strawberry Cheesecake',
    emoji: '🍰',
    mealTypes: ['dessert'],
    cuisine: 'american',
    isVegetarian: true,
    isFastFood: false,
    isHealthy: false,
    description: 'Dense, velvety smooth cream cheese cake over a buttery graham cracker crust, topped with macerated strawberry glaze.',
    popularPairing: 'Fresh mint tea',
    estimatedPrepTime: '5 mins'
  },
  {
    id: 'f-ds-5',
    name: 'Mango Sticky Rice with Coconut Cream',
    emoji: '🥭',
    mealTypes: ['dessert'],
    cuisine: 'asian',
    isVegetarian: true,
    isFastFood: false,
    isHealthy: true,
    description: 'Sweet glutinous rice cooked with sweetened coconut milk and served with chilled, fragrant sweet yellow mango slices and toasted sesame.',
    popularPairing: 'Jasmine tea',
    estimatedPrepTime: '10 mins'
  },
  {
    id: 'f-ds-6',
    name: 'Artisanal Italian Pistachio Gelato',
    emoji: '🍨',
    mealTypes: ['dessert'],
    cuisine: 'italian',
    isVegetarian: true,
    isFastFood: true,
    isHealthy: false,
    description: 'Silky, slow-churned Italian gelato with roasted Sicilian pistachios and dark chocolate ribbon flakes in a crisp waffle cone.',
    popularPairing: 'Short black espresso',
    estimatedPrepTime: '5 mins'
  }
];
