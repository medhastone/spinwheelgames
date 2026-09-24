import { FoodItem, CuisineType } from './types';

export const FOOD_DATABASE: FoodItem[] = [
  // BREAKFAST ITEMS
  {
    id: 'f-b-1',
    name: 'Fluffy Buttermilk Pancakes',
    emoji: '🥞',
    mealTypes: ['breakfast'],
    cuisine: 'american',
    isFastFood: false,
    isHealthy: false,
    description: 'Golden, tender pancake stack served with warm maple syrup and melted salted butter.',
    popularPairing: 'Crispy bacon or fresh blueberries'
  },
  {
    id: 'f-b-2',
    name: 'Avocado Toast with Poached Egg',
    emoji: '🥑',
    mealTypes: ['breakfast', 'snack'],
    cuisine: 'global',
    isFastFood: false,
    isHealthy: true,
    description: 'Crushed ripe Haas avocado on sourdough toast topped with microgreens and red pepper flakes.',
    popularPairing: 'Iced cold brew coffee'
  },
  {
    id: 'f-b-3',
    name: 'Loaded Breakfast Burrito',
    emoji: '🌯',
    mealTypes: ['breakfast', 'lunch'],
    cuisine: 'mexican',
    isFastFood: true,
    isHealthy: false,
    description: 'Scrambled eggs, crispy hash browns, melted cheddar, smoky chorizo, and roasted salsa.',
    popularPairing: 'Spicy salsa verde'
  },
  {
    id: 'f-b-4',
    name: 'Greek Yogurt & Berry Parfait',
    emoji: '🫐',
    mealTypes: ['breakfast', 'snack'],
    cuisine: 'mediterranean',
    isFastFood: false,
    isHealthy: true,
    description: 'Creamy high-protein Greek yogurt layered with raw honey, cinnamon granola, and mixed berries.',
    popularPairing: 'Green jasmine tea'
  },
  {
    id: 'f-b-5',
    name: 'Belgian Waffles with Strawberries',
    emoji: '🧇',
    mealTypes: ['breakfast', 'dessert'],
    cuisine: 'american',
    isFastFood: false,
    isHealthy: false,
    description: 'Crisp exterior, fluffy interior grid waffle topped with fresh sliced berries and whipped cream.',
    popularPairing: 'Espresso or hot cocoa'
  },
  {
    id: 'f-b-6',
    name: 'Traditional Shakshuka',
    emoji: '🍳',
    mealTypes: ['breakfast', 'lunch'],
    cuisine: 'mediterranean',
    isFastFood: false,
    isHealthy: true,
    description: 'Eggs gently poached in a spiced tomato, red pepper, onion, and cumin sauce topped with feta.',
    popularPairing: 'Warm crusty pita bread'
  },
  {
    id: 'f-b-7',
    name: 'Toasted Bagel with Lox & Cream Cheese',
    emoji: '🥯',
    mealTypes: ['breakfast', 'lunch'],
    cuisine: 'american',
    isFastFood: false,
    isHealthy: true,
    description: 'Freshly toasted everything bagel with smooth cream cheese, smoked salmon, capers, and red onion.',
    popularPairing: 'Fresh squeezed orange juice'
  },
  {
    id: 'f-b-8',
    name: 'Acai Superfood Smoothie Bowl',
    emoji: '🥣',
    mealTypes: ['breakfast', 'snack'],
    cuisine: 'latin',
    isFastFood: false,
    isHealthy: true,
    description: 'Thick frozen organic acai purée topped with sliced bananas, chia seeds, coconut flakes, and granola.',
    popularPairing: 'Matcha green tea'
  },
  {
    id: 'f-b-9',
    name: 'Classic Eggs Benedict',
    emoji: '🥚',
    mealTypes: ['breakfast'],
    cuisine: 'american',
    isFastFood: false,
    isHealthy: false,
    description: 'Toasted English muffins layered with Canadian bacon, poached eggs, and silky rich hollandaise.',
    popularPairing: 'Fresh fruit salad'
  },
  {
    id: 'f-b-10',
    name: 'Chilaquiles Verdes with Fried Egg',
    emoji: '🍳',
    mealTypes: ['breakfast', 'lunch'],
    cuisine: 'mexican',
    isFastFood: false,
    isHealthy: false,
    description: 'Crispy fried tortilla chips simmered in tangy salsa verde, garnished with cotija cheese and crema.',
    popularPairing: 'Refried black beans'
  },

  // LUNCH ITEMS
  {
    id: 'f-l-1',
    name: 'Vietnamese Grilled Pork Banh Mi',
    emoji: '🥖',
    mealTypes: ['lunch'],
    cuisine: 'asian',
    isFastFood: true,
    isHealthy: false,
    description: 'Crisp French baguette filled with savory lemongrass pork, pickled daikon, cucumber, cilantro, and chili mayo.',
    popularPairing: 'Vietnamese iced coffee'
  },
  {
    id: 'f-l-2',
    name: 'Salmon Poke Bowl with Edamame',
    emoji: '🥗',
    mealTypes: ['lunch', 'dinner'],
    cuisine: 'asian',
    isFastFood: false,
    isHealthy: true,
    description: 'Fresh sushi-grade salmon tossed in ponzu sauce over seasoned rice, seaweed salad, avocado, and sesame.',
    popularPairing: 'Miso soup'
  },
  {
    id: 'f-l-3',
    name: 'Warm Chicken Caesar Wrap',
    emoji: '🌯',
    mealTypes: ['lunch'],
    cuisine: 'american',
    isFastFood: true,
    isHealthy: false,
    description: 'Grilled herb chicken breast, crisp romaine lettuce, shaved parmesan, and creamy garlic caesar dressing in a flour wrap.',
    popularPairing: 'Kettle-cooked potato chips'
  },
  {
    id: 'f-l-4',
    name: 'Falafel Pita Pocket with Tahini',
    emoji: '🥙',
    mealTypes: ['lunch'],
    cuisine: 'mediterranean',
    isFastFood: true,
    isHealthy: true,
    description: 'Crispy herb chickpea falafel stuffed inside warm pita with tomato-cucumber salad and garlic tahini sauce.',
    popularPairing: 'Crispy spiced fries'
  },
  {
    id: 'f-l-5',
    name: 'Smoked Turkey Club Panini',
    emoji: '🥪',
    mealTypes: ['lunch'],
    cuisine: 'american',
    isFastFood: false,
    isHealthy: false,
    description: 'Triple-decker artisan sourdough pressed with roast turkey, crisp bacon, avocado, aged cheddar, and herb aioli.',
    popularPairing: 'Pickle spear and iced tea'
  },
  {
    id: 'f-l-6',
    name: 'Pad Kra Pao (Thai Basil Chicken Bowl)',
    emoji: '🍛',
    mealTypes: ['lunch', 'dinner'],
    cuisine: 'asian',
    isFastFood: true,
    isHealthy: false,
    description: 'Wok-seared minced chicken with holy basil, garlic, and Thai bird\'s eye chilies over fragrant jasmine rice with a crispy fried egg.',
    popularPairing: 'Thai iced tea'
  },
  {
    id: 'f-l-7',
    name: 'Gourmet Grilled Cheese & Tomato Bisque',
    emoji: '🧀',
    mealTypes: ['lunch'],
    cuisine: 'american',
    isFastFood: false,
    isHealthy: false,
    description: 'Sharp cheddar and creamy gruyere melted inside golden butter-toasted brioche, paired with roasted tomato basil soup.',
    popularPairing: 'Creamy tomato dipping soup'
  },
  {
    id: 'f-l-8',
    name: 'Authentic Street Tacos (Al Pastor & Carnitas)',
    emoji: '🌮',
    mealTypes: ['lunch', 'dinner'],
    cuisine: 'mexican',
    isFastFood: true,
    isHealthy: false,
    description: 'Warm double corn tortillas filled with citrus-marinated pork, grilled pineapple, cilantro, diced white onion, and lime.',
    popularPairing: 'Horchata or Agua Fresca'
  },
  {
    id: 'f-l-9',
    name: 'Mediterranean Grain Salad Bowl',
    emoji: '🥗',
    mealTypes: ['lunch'],
    cuisine: 'mediterranean',
    isFastFood: false,
    isHealthy: true,
    description: 'Warm quinoa, cherry tomatoes, kalamata olives, diced cucumbers, roasted chickpeas, crumbled feta, and lemon oregano vinaigrette.',
    popularPairing: 'Toasted pita chips'
  },
  {
    id: 'f-l-10',
    name: 'Chicken Teriyaki Rice Bowl',
    emoji: '🍚',
    mealTypes: ['lunch', 'dinner'],
    cuisine: 'asian',
    isFastFood: true,
    isHealthy: false,
    description: 'Glazed chicken thighs in sweet savory teriyaki sauce served over steamed Calrose rice and steamed broccoli.',
    popularPairing: 'Gyoza dumplings'
  },

  // DINNER ITEMS
  {
    id: 'f-d-1',
    name: 'Wood-Fired Margherita Pizza',
    emoji: '🍕',
    mealTypes: ['lunch', 'dinner'],
    cuisine: 'italian',
    isFastFood: false,
    isHealthy: false,
    description: 'Neapolitan style charred crust with San Marzano tomato sauce, fresh buffalo mozzarella, aromatic sweet basil, and extra virgin olive oil.',
    popularPairing: 'Italian sparkling water or red Chianti'
  },
  {
    id: 'f-d-2',
    name: 'Chicken Tikka Masala with Garlic Naan',
    emoji: '🥘',
    mealTypes: ['dinner'],
    cuisine: 'asian',
    isFastFood: false,
    isHealthy: false,
    description: 'Tender marinated chicken breast simmered in a luscious spiced tomato cream curry sauce with cumin basmati rice and tandoor-baked naan.',
    popularPairing: 'Mango lassi or crisp lager'
  },
  {
    id: 'f-d-3',
    name: 'Classic Smash Cheeseburger & Fries',
    emoji: '🍔',
    mealTypes: ['lunch', 'dinner'],
    cuisine: 'american',
    isFastFood: true,
    isHealthy: false,
    description: 'Double seared beef patties with crispy lacy edges, melted American cheese, pickles, minced onions, and special sauce on a toasted potato bun.',
    popularPairing: 'Salted crinkle-cut fries'
  },
  {
    id: 'f-d-4',
    name: 'Pan-Seared Salmon with Garlic Asparagus',
    emoji: '🐟',
    mealTypes: ['dinner'],
    cuisine: 'global',
    isFastFood: false,
    isHealthy: true,
    description: 'Crispy-skin Atlantic salmon fillet pan-roasted with lemon herb butter, accompanied by roasted asparagus spears and wild rice.',
    popularPairing: 'Crisp Pinot Grigio or chilled water'
  },
  {
    id: 'f-d-5',
    name: 'Sizzling Steak & Chicken Fajitas',
    emoji: '🥩',
    mealTypes: ['dinner'],
    cuisine: 'mexican',
    isFastFood: false,
    isHealthy: false,
    description: 'Cast-iron skillet of grilled flank steak, chicken, bell peppers, and caramelized onions served with warm flour tortillas, guacamole, and salsa.',
    popularPairing: 'Fresh lime margarita'
  },
  {
    id: 'f-d-6',
    name: 'Japanese Tonkotsu Pork Ramen',
    emoji: '🍜',
    mealTypes: ['lunch', 'dinner'],
    cuisine: 'asian',
    isFastFood: false,
    isHealthy: false,
    description: 'Rich, collagen-infused 12-hour pork bone broth with springy noodles, chashu pork belly slices, marinated soft-boiled egg, and scallions.',
    popularPairing: 'Pan-fried pork gyoza'
  },
  {
    id: 'f-d-7',
    name: 'Handmade Tagliatelle Bolognese',
    emoji: '🍝',
    mealTypes: ['dinner'],
    cuisine: 'italian',
    isFastFood: false,
    isHealthy: false,
    description: 'Egg pasta ribbons tossed in a slow-simmered rich ragù of beef, pork, white wine, and aromatic herbs with freshly grated Parmigiano-Reggiano.',
    popularPairing: 'Warm garlic focaccia'
  },
  {
    id: 'f-d-8',
    name: 'Korean BBQ Bulgogi & Kimchi Rice',
    emoji: '🍲',
    mealTypes: ['dinner'],
    cuisine: 'asian',
    isFastFood: false,
    isHealthy: false,
    description: 'Thinly sliced ribeye marinated in sweet soy, garlic, and Asian pear grilled with scallions and served with banchan sides and fermented kimchi.',
    popularPairing: 'Crispy scallion pancake'
  },
  {
    id: 'f-d-9',
    name: 'Classic Fish and Chips with Tartar Sauce',
    emoji: '🍟',
    mealTypes: ['lunch', 'dinner'],
    cuisine: 'american',
    isFastFood: true,
    isHealthy: false,
    description: 'Beer-battered flaky Atlantic cod fried golden crisp, served with thick pub chips, lemon wedge, and house-made caper tartar sauce.',
    popularPairing: 'Malted vinegar and mushy peas'
  },
  {
    id: 'f-d-10',
    name: 'Greek Souvlaki Platter with Tzatziki',
    emoji: '🍢',
    mealTypes: ['dinner'],
    cuisine: 'mediterranean',
    isFastFood: false,
    isHealthy: true,
    description: 'Skewers of grilled lemon-oregano chicken breast served over lemon rice, Greek salad, warm pita triangles, and fresh cucumber dill tzatziki.',
    popularPairing: 'Dolmades (stuffed grape leaves)'
  },
  {
    id: 'f-d-11',
    name: 'Pad Thai Noodles with Tiger Prawns',
    emoji: '🥡',
    mealTypes: ['lunch', 'dinner'],
    cuisine: 'asian',
    isFastFood: true,
    isHealthy: false,
    description: 'Rice noodles stir-fried in tamarind sauce with plump prawns, pressed tofu, eggs, bean sprouts, crushed roasted peanuts, and lime wedges.',
    popularPairing: 'Crispy spring rolls'
  },
  {
    id: 'f-d-12',
    name: 'Roast Herb Chicken & Garlic Mashed Potatoes',
    emoji: '🍗',
    mealTypes: ['dinner'],
    cuisine: 'american',
    isFastFood: false,
    isHealthy: true,
    description: 'Herb-butter roasted half chicken with crisp golden skin, served alongside creamy roasted garlic mashed potatoes and savory pan gravy.',
    popularPairing: 'Buttered dinner rolls'
  },
  {
    id: 'f-d-13',
    name: 'Spanish Seafood Paella',
    emoji: '🥘',
    mealTypes: ['dinner'],
    cuisine: 'mediterranean',
    isFastFood: false,
    isHealthy: true,
    description: 'Saffron-infused Bomba rice simmered in a wide pan with mussels, shrimp, calamari, chicken, and red peppers with a crispy caramelized bottom crust.',
    popularPairing: 'Red wine Sangria'
  },
  {
    id: 'f-d-14',
    name: 'Steak Frites with Herb Chimichurri',
    emoji: '🥩',
    mealTypes: ['dinner'],
    cuisine: 'latin',
    isFastFood: false,
    isHealthy: false,
    description: 'Grilled prime sirloin steak sliced and draped in vibrant parsley garlic chimichurri sauce, served with crispy shoestring French fries.',
    popularPairing: 'Arugula and shaved parmesan salad'
  },
  {
    id: 'f-d-15',
    name: 'Steaming Pho Ga (Vietnamese Chicken Noodle Soup)',
    emoji: '🍜',
    mealTypes: ['lunch', 'dinner'],
    cuisine: 'asian',
    isFastFood: false,
    isHealthy: true,
    description: 'Clear, star anise and ginger infused chicken broth with silky rice noodles, shredded chicken, fresh Thai basil, cilantro, jalapeño, and lime.',
    popularPairing: 'Fresh summer rolls'
  },
  {
    id: 'f-d-16',
    name: 'Creamy Vegetable Thai Green Curry',
    emoji: '🍛',
    mealTypes: ['lunch', 'dinner'],
    cuisine: 'asian',
    isFastFood: false,
    isHealthy: true,
    description: 'Fragrant coconut milk curry with lemongrass, bamboo shoots, bell peppers, eggplant, and crispy tofu over steamed jasmine rice.',
    popularPairing: 'Steamed edamame with sea salt'
  },
  {
    id: 'f-d-17',
    name: 'Authentic Enchiladas Verdes',
    emoji: '🫔',
    mealTypes: ['dinner'],
    cuisine: 'mexican',
    isFastFood: false,
    isHealthy: false,
    description: 'Corn tortillas filled with shredded chicken, rolled and smothered in warm tomatillo sauce, melted Monterey Jack cheese, and Mexican crema.',
    popularPairing: 'Mexican red rice'
  },
  {
    id: 'f-d-18',
    name: 'Classic Pepperoni Pizza',
    emoji: '🍕',
    mealTypes: ['lunch', 'dinner'],
    cuisine: 'american',
    isFastFood: true,
    isHealthy: false,
    description: 'Crispy stone-baked crust layered with seasoned pizza sauce, whole milk mozzarella, and crispy cupping pepperoni.',
    popularPairing: 'Garlic dipping knots'
  },

  // SNACK ITEMS
  {
    id: 'f-s-1',
    name: 'Loaded Stadium Nachos with Warm Queso',
    emoji: '🧀',
    mealTypes: ['snack'],
    cuisine: 'mexican',
    isFastFood: true,
    isHealthy: false,
    description: 'Crisp tortilla chips smothered in melted cheddar cheese, pickled jalapeño slices, sour cream, and fresh pico de gallo.',
    popularPairing: 'Iced lemonade or soda'
  },
  {
    id: 'f-s-2',
    name: 'Creamy Garlic Hummus & Warm Pita',
    emoji: '🫒',
    mealTypes: ['snack'],
    cuisine: 'mediterranean',
    isFastFood: false,
    isHealthy: true,
    description: 'Silky whipped chickpeas with tahini, extra virgin olive oil, and smoked paprika, served with warm sliced pita and cucumber rounds.',
    popularPairing: 'Kalamata olives'
  },
  {
    id: 'f-s-3',
    name: 'Crispy Mozzarella Sticks with Marinara',
    emoji: '🧀',
    mealTypes: ['snack'],
    cuisine: 'american',
    isFastFood: true,
    isHealthy: false,
    description: 'Herb breaded mozzarella fried until golden with an elastic cheese pull, served with warm garlic marinara dipping sauce.',
    popularPairing: 'Sparkling iced tea'
  },
  {
    id: 'f-s-4',
    name: 'Crispy Vegetable Spring Rolls',
    emoji: '🥢',
    mealTypes: ['snack'],
    cuisine: 'asian',
    isFastFood: true,
    isHealthy: false,
    description: 'Delicate pastry rolls filled with shredded cabbage, carrots, and glass noodles, fried crisp and served with sweet plum chili sauce.',
    popularPairing: 'Hot green tea'
  },
  {
    id: 'f-s-5',
    name: 'Steamed Edamame with Flaky Sea Salt',
    emoji: '🫛',
    mealTypes: ['snack'],
    cuisine: 'asian',
    isFastFood: false,
    isHealthy: true,
    description: 'Tender young soybean pods steamed to order and generously tossed with coarse Maldon sea salt flakes.',
    popularPairing: 'Chilled iced green tea'
  },
  {
    id: 'f-s-6',
    name: 'Bavarian Soft Pretzel with Beer Mustard',
    emoji: '🥨',
    mealTypes: ['snack'],
    cuisine: 'american',
    isFastFood: true,
    isHealthy: false,
    description: 'Jumbo oven-baked pretzel with coarse pretzel salt crystals, served with tangy whole grain beer mustard and warm beer cheese.',
    popularPairing: 'Craft cider or root beer'
  },
  {
    id: 'f-s-7',
    name: 'Fresh Guacamole & Crispy Totopos',
    emoji: '🥑',
    mealTypes: ['snack'],
    cuisine: 'mexican',
    isFastFood: false,
    isHealthy: true,
    description: 'Chunky avocado mashed with fresh lime juice, sea salt, diced Roma tomato, cilantro, and minced jalapeño.',
    popularPairing: 'Tortilla chips'
  },
  {
    id: 'f-s-8',
    name: 'Tomato Basil Bruschetta',
    emoji: '🍞',
    mealTypes: ['snack'],
    cuisine: 'italian',
    isFastFood: false,
    isHealthy: true,
    description: 'Grilled garlic-rubbed ciabatta slices topped with marinated heirloom tomatoes, fresh basil, and aged balsamic glaze.',
    popularPairing: 'Chilled sparkling water'
  },

  // DESSERT ITEMS
  {
    id: 'f-ds-1',
    name: 'Warm Chocolate Lava Cake',
    emoji: '🍫',
    mealTypes: ['dessert'],
    cuisine: 'global',
    isFastFood: false,
    isHealthy: false,
    description: 'Decadent dark chocolate cake with a molten, flowing fudge center, dusted with powdered sugar and served with vanilla gelato.',
    popularPairing: 'Espresso or cold whole milk'
  },
  {
    id: 'f-ds-2',
    name: 'Classic Italian Tiramisu',
    emoji: '☕',
    mealTypes: ['dessert'],
    cuisine: 'italian',
    isFastFood: false,
    isHealthy: false,
    description: 'Coffee-soaked Savoiardi ladyfingers layered with whipped mascarpone cream and dusted with bitter cocoa powder.',
    popularPairing: 'Hot cappuccino'
  },
  {
    id: 'f-ds-3',
    name: 'Crispy Cinnamon Sugar Churros',
    emoji: '🥖',
    mealTypes: ['dessert', 'snack'],
    cuisine: 'latin',
    isFastFood: true,
    isHealthy: false,
    description: 'Golden piped fried pastry tossed in fragrant cinnamon sugar, accompanied by warm Mexican chocolate and dulce de leche dips.',
    popularPairing: 'Mexican hot chocolate'
  },
  {
    id: 'f-ds-4',
    name: 'New York Style Cheesecake with Strawberries',
    emoji: '🍰',
    mealTypes: ['dessert'],
    cuisine: 'american',
    isFastFood: false,
    isHealthy: false,
    description: 'Dense, velvety smooth cream cheese cake over a buttery graham cracker crust, topped with macerated strawberry glaze.',
    popularPairing: 'Fresh mint tea'
  },
  {
    id: 'f-ds-5',
    name: 'Mango Sticky Rice with Coconut Cream',
    emoji: '🥭',
    mealTypes: ['dessert'],
    cuisine: 'asian',
    isFastFood: false,
    isHealthy: true,
    description: 'Sweet glutinous rice cooked with sweetened coconut milk and served with chilled, fragrant sweet yellow mango slices and toasted sesame.',
    popularPairing: 'Jasmine tea'
  },
  {
    id: 'f-ds-6',
    name: 'Artisanal Gelato (Pistachio & Stracciatella)',
    emoji: '🍨',
    mealTypes: ['dessert'],
    cuisine: 'italian',
    isFastFood: true,
    isHealthy: false,
    description: 'Silky, slow-churned Italian gelato with roasted Sicilian pistachios and chocolate ribbon flakes in a crisp waffle cone.',
    popularPairing: 'Short black espresso'
  },
  {
    id: 'f-ds-7',
    name: 'French Vanilla Crème Brûlée',
    emoji: '🍮',
    mealTypes: ['dessert'],
    cuisine: 'global',
    isFastFood: false,
    isHealthy: false,
    description: 'Rich vanilla custard base crowned with a brittle, tap-crackable layer of caramelized burnt sugar.',
    popularPairing: 'Fresh raspberries'
  },
  {
    id: 'f-ds-8',
    name: 'Warm Apple Crisp with Vanilla Ice Cream',
    emoji: '🥧',
    mealTypes: ['dessert'],
    cuisine: 'american',
    isFastFood: false,
    isHealthy: false,
    description: 'Spiced Honeycrisp apple slices baked under a crunchy cinnamon-oat streusel topping, crowned with melting vanilla bean ice cream.',
    popularPairing: 'Warm apple cider'
  }
];

export const CUISINE_OPTIONS: { label: string; value: CuisineType }[] = [
  { label: 'All Cuisines', value: 'all' },
  { label: 'Italian', value: 'italian' },
  { label: 'Mexican', value: 'mexican' },
  { label: 'Asian & Thai', value: 'asian' },
  { label: 'American & Diner', value: 'american' },
  { label: 'Mediterranean & Greek', value: 'mediterranean' },
  { label: 'Latin American', value: 'latin' },
  { label: 'Global & Fusion', value: 'global' }
];

export const MEAL_TYPE_OPTIONS: { label: string; value: 'all' | 'breakfast' | 'lunch' | 'dinner' | 'snack' | 'dessert'; emoji: string }[] = [
  { label: 'All Meals', value: 'all', emoji: '🍽️' },
  { label: 'Dinner', value: 'dinner', emoji: '🍲' },
  { label: 'Lunch', value: 'lunch', emoji: '🥪' },
  { label: 'Breakfast', value: 'breakfast', emoji: '🥞' },
  { label: 'Snacks', value: 'snack', emoji: '🥨' },
  { label: 'Desserts', value: 'dessert', emoji: '🍰' }
];
