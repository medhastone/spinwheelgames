import { SeoPageData } from './seoArchitecture';

export type ClusterExperienceOverride = Partial<
  Pick<
    SeoPageData,
    | 'title'
    | 'h1'
    | 'metaDescription'
    | 'introduction'
    | 'instructions'
    | 'whoItsUsefulFor'
    | 'useCases'
    | 'customizationOptions'
    | 'tips'
    | 'resultExplanation'
    | 'uniqueExamples'
    | 'comparisonTable'
    | 'uniqueContentBlocks'
    | 'faqs'
  >
>;

export const CLUSTER_EXPERIENCE_OVERRIDES: Record<string, ClusterExperienceOverride> = {
  '1-10-wheel': {
    title: '1 to 10 Number Wheel – Single-Digit Spinner',
    h1: '1 to 10 Number Wheel: Single-Digit Rating & Turn Spinner',
    metaDescription:
      'Spin a random number between 1 and 10 with exact 10% slice probability. Ideal for Top-10 countdown lists, 1–10 rating scales, elementary math drills, and 10-player turn order.',
    introduction:
      'The 1 to 10 Number Wheel divides a 360-degree circle into ten equal 36-degree wedges, assigning each integer from 1 through 10 an exact 10.0% selection probability. Unlike broad range generators that require typing minimum and maximum bounds, this pre-calibrated base-10 spinner launches ready for Top-10 ranking countdowns, 1-to-10 intensity challenges, early-elementary number recognition games, and 10-seat board game turn order.',
    instructions: [
      'Click the center SPIN button or press Spacebar to launch the 10-slice wheel with realistic angular deceleration.',
      'Enable No-Repeat Elimination mode when counting down a Top-10 list so each integer from 1 to 10 is drawn once without duplicates.',
      'Toggle Even Only (2, 4, 6, 8, 10) or Odd Only (1, 3, 5, 7, 9) in the slice panel for parity math games.',
      'Adjust individual slice weights if you want a weighted 1–10 difficulty scale where higher levels appear less frequently.'
    ],
    uniqueExamples: [
      'Top-10 Movie or Album Review Order: Eliminate numbers 1 through 10 sequentially to randomize which ranked item your podcast discusses next.',
      'Fitness & Spice Intensity Scale (1–10): Let the pointer pick how many burpee sets to complete or which hot-sauce tier to taste.',
      'Kindergarten Number Bonds to 10: Spin a number and ask students to shout the complementary integer that sums to 10.'
    ],
    uniqueContentBlocks: [
      {
        heading: 'Why Base-10 Visual Wedges Outperform Text Number Pickers',
        body: [
          'Human numeracy is fundamentally anchored to base-10 counting. When ten equal slices are arranged around a circle, every integer occupies a clear 36-degree arc that even young learners and live-stream audiences can read at a glance from across a room.',
          'For content creators filming "Rating Dishes 1 to 10" or "Level 1 vs. Level 10 Challenge" videos, seeing the physical pointer tick past 9 and land on 10 creates visual drama that a plain text box calculator cannot replicate.'
        ]
      },
      {
        heading: 'Classroom Math Centers: Complements of 10 & Multiplication Drills',
        body: [
          'First- and second-grade teachers use the 1–10 wheel daily for fluency warmups. Project the wheel on a smartboard, spin once, and have the class write down the ten-frame complement (for example, landing on 7 requires writing 3) or multiply the landed digit by the week’s target factor.',
          'Because No-Repeat mode removes each landed digit until all ten integers have been practiced, teachers cover the entire 1–10 multiplication family in under five minutes without accidentally repeating the same problem.'
        ]
      }
    ],
    faqs: [
      {
        question: 'What are the exact odds of landing on any number on the 1–10 wheel?',
        answer:
          'Every integer from 1 to 10 occupies an identical 36-degree slice, giving each number an exact 1 in 10 (10.0%) probability on every fresh spin.'
      },
      {
        question: 'How do I draw all numbers from 1 to 10 without repeats?',
        answer:
          'Turn on Elimination (No-Repeat) mode before spinning. After each spin, click "Remove Winner" so the remaining integers share the wheel until all 10 numbers have been called.'
      },
      {
        question: 'Can I add 0 to make a 0 to 10 wheel?',
        answer:
          'Yes. Open the slice editor in the sidebar and add "0" at the top of the list to convert the wheel into an 11-slice 0–10 spinner.'
      }
    ]
  },

  '1-50-wheel': {
    title: '1 to 50 Number Wheel – 50-Ticket & States Spinner',
    h1: '1 to 50 Number Wheel: Mid-Range Raffle & 50-State Spinner',
    metaDescription:
      'Spin random numbers from 1 to 50 online with 2% per-slice odds. Built for 50 US states geography quizzes, 50-ticket classroom raffles, and 50-rep workout challenges.',
    introduction:
      'The 1 to 50 Number Wheel is purpose-built for mid-sized pools where a 1–10 wheel is too small and a 1–100 wheel has twice as many slots as you need. Featuring 50 individually color-coded 7.2-degree segments (2.0% probability per number), it maps directly to the 50 U.S. states, 50-ticket classroom reward drawings, two-class combined rosters, and 1-to-50 fitness repetition challenges.',
    instructions: [
      'Press SPIN or tap Spacebar to rotate all 50 numbered segments with high-contrast slice labels.',
      'Match each drawn integer (1–50) to an alphabetical list of the 50 U.S. states or a 50-line spreadsheet row.',
      'Use Elimination mode during ticket raffles or bingo-style games so drawn numbers are never called twice.',
      'Trim the top or bottom numbers in the sidebar if your roster has 35, 40, or 45 participants.'
    ],
    uniqueExamples: [
      '50 U.S. States Geography Bee: Assign numbers 1–50 alphabetically from Alabama (1) to Wyoming (50) and spin to quiz capitals and state flags.',
      '50-Ticket Classroom Prize Jar: Hand out numbered tickets 1–50 on Friday afternoon and project the wheel for a transparent prize drawing.',
      '1-to-50 Accumulator Workout: Spin the wheel to determine how many kettlebell swings, push-ups, or jump-rope skips to perform in your finisher set.'
    ],
    uniqueContentBlocks: [
      {
        heading: 'Why 1–50 Is the Sweet Spot for Combined Classrooms & Raffles',
        body: [
          'Standard single classrooms average 22 to 30 students, while combined grade-level assemblies, university lecture sections, and community club raffles typically cap out between 35 and 50 participants. Using a 100-slice wheel for a 45-person group forces half the spins to land on unassigned numbers.',
          'Starting with a pre-built 1–50 wheel lets organizers delete just a few trailing numbers in the editor to match their exact headcount while keeping slice labels crisp and readable on a projector.'
        ]
      },
      {
        heading: 'Gamifying 50-Question Exam Reviews & Flashcard Decks',
        body: [
          'Study groups and AP teachers frequently organize review packets into 50 numbered questions. Instead of working through the packet in predictable linear order—where students tune out until their assigned row arrives—spinning the 1–50 wheel with Elimination enabled keeps every learner alert for the next random question jump.'
        ]
      }
    ],
    faqs: [
      {
        question: 'What is the probability of landing on a specific number from 1 to 50?',
        answer:
          'Each of the 50 slices spans 7.2 degrees of the wheel, giving every integer from 1 to 50 an exact 2.0% (1 in 50) chance on the initial spin.'
      },
      {
        question: 'Are all 50 numbers readable on mobile screens?',
        answer:
          'Yes. The canvas automatically scales radial typography and highlights the winning integer in a large celebratory banner as soon as the pointer stops.'
      },
      {
        question: 'How do I adjust the wheel from 1–50 to 1–40?',
        answer:
          'Open the Edit Items list in the sidebar, highlight numbers 41 through 50, and delete them in one click to create a 40-slice wheel.'
      }
    ]
  },

  '1-100-wheel': {
    title: '1 to 100 Number Wheel – Percentile & 100-Ticket Spinner',
    h1: '1 to 100 Number Wheel: Full Percentile & Raffle Spinner',
    metaDescription:
      'Spin a random number from 1 to 100 on a full 100-slice wheel. Ideal for 100-square charity boards, D100 RPG loot tables, percentile checks, and 1–100 guessing games.',
    introduction:
      'The 1 to 100 Number Wheel renders all one hundred integers around a precision radial dial, giving every number from 1 to 100 an exact 1.0% (3.6-degree) cryptographic probability. Designed for 100-square fundraiser boards, D100 tabletop RPG loot tables, century envelope savings challenges, and classroom百-chart (100-chart) number sense activities, it turns a 1-in-100 draw into a high-suspense visual spectacle.',
    instructions: [
      'Click SPIN or press Spacebar to launch the 100-slice wheel with Web Audio peg-ticking feedback.',
      'Watch the magnified winning banner announce the exact integer between 1 and 100 once the wheel stops.',
      'Turn on Elimination mode for 100-envelope savings challenges or 100-square raffles so each number is crossed off automatically.',
      'Use Fullscreen mode (press F) when streaming or projecting a 100-ticket giveaway so viewers can follow the pointer.'
    ],
    uniqueExamples: [
      '100-Envelope Money Saving Challenge: Spin once per week with Elimination mode active; stuff the landed dollar amount ($1 to $100) into its matching envelope to save $5,050.',
      'Tabletop RPG D100 Wild Magic & Loot Tables: Replace two ten-sided percentile dice with a visual 1–100 wheel spin during boss encounters.',
      '100-Square Sports Pool & Charity Fundraiser: Draw winning grid coordinates or ticket stubs from 001 to 100 live on camera.'
    ],
    uniqueContentBlocks: [
      {
        heading: 'Running Transparent 100-Square Fundraisers & Raffles',
        body: [
          'Community sports boosters and charity fundraisers frequently sell 100 numbered squares or raffle stubs. Drawing folded paper slips from a bucket on a webcam looks opaque and invites skepticism.',
          'Projecting the 1 to 100 Number Wheel in Fullscreen or OBS Streamer Mode (?stream=1) lets every ticket holder watch the pointer decelerate across all 100 slices in real time, backed by browser Web Crypto API entropy.'
        ]
      },
      {
        heading: 'The 100-Envelope Savings Challenge Protocol',
        body: [
          'Personal finance creators popularized the 100-envelope challenge: numbering envelopes 1 through 100 and filling them randomly until all 100 are sealed for a total of $5,050. By saving your 1–100 wheel state locally with Elimination mode turned on, you can spin each payday without ever drawing the same envelope twice.'
        ]
      }
    ],
    faqs: [
      {
        question: 'Does every number from 1 to 100 have an equal 1% chance?',
        answer:
          'Yes. All 100 slices occupy an identical 3.6-degree arc, and the winning angle is selected via window.crypto.getRandomValues() for an exact 1.0% probability per number.'
      },
      {
        question: 'How does the 1–100 wheel compare to rolling a D100 die?',
        answer:
          'Both produce a uniform 1 to 100 integer, but the 1–100 wheel supports 1-click Elimination mode so previously rolled numbers cannot repeat during raffles or loot draws.'
      },
      {
        question: 'Can I use the 1–100 wheel on an OBS live stream?',
        answer:
          'Yes! Click the Streamer Mode / OBS button above the wheel to copy a transparent browser-source overlay URL (?stream=1) for Twitch, YouTube, or Kick.'
      }
    ]
  },

  'dice-wheel': {
    title: 'Dice Wheel (1 to 6) – Board Game Die Replacement',
    h1: 'Dice Wheel: 1 to 6 Board Game Die Replacement Spinner',
    metaDescription:
      'Lost your board game dice? Spin the 1 to 6 Dice Wheel online for exact 16.67% six-sided die odds. Great for Monopoly, Catan, Risk, and quiet classroom math games.',
    introduction:
      'The Dice Wheel converts a traditional six-sided cubic die (1d6) into a silent, unlosable 6-slice radial spinner where each face from 1 to 6 holds an exact 16.67% (60-degree) probability. Whenever physical dice roll under the couch during family board game night or create too much clatter on classroom desks, this 1–6 spinner delivers instant six-sided rolls on any phone or tablet.',
    instructions: [
      'Tap SPIN or press Spacebar on your phone or tablet placed flat in the center of the game board.',
      'For games requiring two six-sided dice (2d6 like Catan or Monopoly), spin twice and sum the two results—or add slices 2 through 12 weighted by 2d6 combinations.',
      'Keep Elimination mode OFF for true independent dice rolls where every spin resets to 1-in-6 odds.',
      'Mute audio ticks during quiet library or classroom center sessions.'
    ],
    uniqueExamples: [
      'Missing Board Game Die Rescue: Keep your game of Ludo, Trouble, Backgammon, or Monopoly moving when the box die goes missing.',
      'Noise-Free Classroom Math Centers: Replace 30 clattering plastic dice on hard desks with silent iPad Dice Wheel spins.',
      'Road Trip & Airplane Tabletop Gaming: Play roll-and-write games on tray tables where rolling physical dice is impossible.'
    ],
    uniqueContentBlocks: [
      {
        heading: 'Why a 6-Slice Wheel Is Mathematically Identical to a Casino d6',
        body: [
          'Cheap molded plastic dice often suffer from internal air bubbles and rounded corners that bias rolls toward specific faces. A six-slice digital wheel assigns exactly 60.0 degrees to each outcome from 1 through 6 and draws its stopping angle from cryptographic hardware entropy, guaranteeing a true 1/6 (16.6667%) uniform distribution.'
        ]
      },
      {
        heading: 'When to Use the 1–6 Dice Wheel vs. Our 3D Polyhedral Dice Roller',
        body: [
          'If you want a flat, high-contrast 2D spinner that you can customize with penalty slices (such as "Lose a Turn" or "Roll Again"), the Dice Wheel is ideal. If you need multi-dice tabletop RPG notation like 4d6 drop lowest or 3D physics tumbling, switch to our dedicated 3D Dice Roller (/dice/d6).'
        ]
      }
    ],
    faqs: [
      {
        question: 'Can the same number land twice in a row on the Dice Wheel?',
        answer:
          'Yes, by default Elimination mode is off so every spin is an independent 1-in-6 event—just like rolling a real six-sided die.'
      },
      {
        question: 'How do I simulate rolling two dice (2d6) for Settlers of Catan?',
        answer:
          'Simply spin the 1–6 Dice Wheel twice and add the two numbers together, or use our 3D Dice Roller (/dice/d6) to roll two cubes simultaneously.'
      },
      {
        question: 'Can I customize the 6 faces with words instead of numbers?',
        answer:
          'Yes! Open the slice editor to replace 1–6 with custom board game actions like "Move Ahead 2", "Draw a Card", or "Swap Places".'
      }
    ]
  },

  'percentage-wheel': {
    title: 'Percentage Wheel (0% to 100%) – Discount & Odds Spinner',
    h1: 'Percentage Wheel: Discount Tier & Probability Spinner',
    metaDescription:
      'Spin random percentages from 0% to 100% online. Built for e-commerce mystery discount wheels, RPG critical hit chance checks, and classroom probability demonstrations.',
    introduction:
      'The Percentage Wheel is calibrated in 10% increments from 0% to 100% for probability demonstrations, retail promotional discount spins, tabletop critical-hit checks, and effort-level challenges. Store owners and event hosts can weight rare tiers (such as 50% OFF or 100% Free) down to a 1x slice while assigning common tiers (10% OFF or 15% OFF) higher weights.',
    instructions: [
      'Spin the default 0%–100% decile slices to generate a quick percentage benchmark.',
      'For retail or booth mystery discounts, edit the slices to your promotional tiers (e.g., 5% Off, 10% Off, 20% Off, 50% Off) and adjust the weight sliders to protect your profit margin.',
      'Display the live percentage odds badge in the slice list so customers or students see the exact probability of each tier.',
      'Press F for Fullscreen kiosk display at trade shows, pop-up shops, and classroom smartboards.'
    ],
    uniqueExamples: [
      'Pop-Up Shop Spin-to-Win Kiosk: Weight "10% Off" at 6x, "20% Off" at 3x, and "50% Off Grand Prize" at 1x on an iPad checkout stand.',
      'STEM Probability Lesson: Have students compare theoretical slice percentages against 50 empirical spins recorded in the session log.',
      'Creative Project Collaboration Split: Spin lighthearted percentage contributions or tip-jar splits during charity streams.'
    ],
    uniqueContentBlocks: [
      {
        heading: 'Configuring Profit-Safe Promotional Discount Wheels',
        body: [
          'Unlike equal-slice number wheels, promotional percentage wheels rely on weighted probability control. By setting your entry-level 5% or 10% discount to weight 8 and your headline 50% discount to weight 1, you create genuine excitement for every shopper while maintaining a predictable average discount cost across hundreds of spins.'
        ]
      },
      {
        heading: 'Teaching Theoretical vs. Experimental Probability in Grade 6–8 Math',
        body: [
          'Because the Percentage Wheel displays both the angular arc and the exact numerical weight of every slice, middle-school math teachers use it to demonstrate the Law of Large Numbers—comparing 10 spins (high variance) against 100 spins (convergence toward theoretical percentages).'
        ]
      }
    ],
    faqs: [
      {
        question: 'Can I make the 50% or 100% slice rarer than the 10% slice?',
        answer:
          'Yes! Use the weight slider next to each percentage slice in the sidebar. Setting "10%" to weight 5 and "50%" to weight 1 makes the 10% slice five times wider and five times more likely to hit.'
      },
      {
        question: 'Does the wheel show the exact odds of each percentage tier?',
        answer:
          'Yes. The slice editor automatically calculates and displays the exact probability percentage of every item based on its weight relative to the total wheel.'
      },
      {
        question: 'Can I use this wheel on a tablet at a trade show booth?',
        answer:
          'Absolutely. It runs 100% locally in your tablet browser after loading, so it works reliably even on spotty convention center Wi-Fi.'
      }
    ]
  },

  'what-should-i-eat': {
    title: 'What Should I Eat Wheel – Craving & Appetite Decider',
    h1: 'What Should I Eat Wheel: Instant Craving & Meal Format Decider',
    metaDescription:
      'Stuck asking "What should I eat?" Spin this craving diagnostic wheel to choose between home cooking, takeout, comfort food, light salads, or street food in 5 seconds.',
    introduction:
      'When hunger strikes and you have no idea whether you want to cook from scratch, order delivery, grab a quick wrap, or indulge in comfort food, the What Should I Eat Wheel breaks through appetite deadlock. Rather than listing 50 overwhelming restaurant names, it diagnoses your immediate craving format—pitting savory comfort classics, fresh bowls, spicy street food, and quick pantry staples against each other so you know exactly how to feed yourself right now.',
    instructions: [
      'Spin the wheel as soon as you catch yourself opening and closing the refrigerator door or scrolling delivery apps for more than 3 minutes.',
      'Apply the "Gut Reaction Rule": if the pointer lands on Salad Bowl and you feel disappointed, delete Salad Bowl and spin once more for your true craving.',
      'Remove any dishes whose ingredients you lack at home or that are closed in your neighborhood.',
      'Share the winning craving screenshot in your household group chat to lock in the plan.'
    ],
    uniqueExamples: [
      'Solo Work-From-Home Hunger Crash: Decide in one spin between a 10-minute quesadilla, a protein smoothie bowl, or walking to the corner deli.',
      'Late-Night Craving Check: Settle the debate between savory ramen noodles, crispy air-fryer snacks, or cereal before midnight.',
      'Couple Appetite Narrowing: Spin once to pick the food vibe (Spicy Asian, Italian Comfort, Tex-Mex, or Fresh Mediterranean) before picking a specific spot.'
    ],
    uniqueContentBlocks: [
      {
        heading: 'How "What Should I Eat?" Differs from a Restaurant or Dinner Wheel',
        body: [
          'Searching "what should I eat" happens earlier in the hunger cycle than picking a specific restaurant. Often you do not even know if you want a full sit-down meal, a light snack plate, or a 10-minute stovetop dish.',
          'This wheel is curated around distinct flavor profiles and effort levels—crunchy, brothy, cheesy, fresh, or spicy—so your brain immediately reacts to the sensory profile it actually craves.'
        ]
      },
      {
        heading: 'The 3-Minute Hypoglycemic Indecision Trap',
        body: [
          'Behavioral nutritionists note that low blood sugar directly impairs prefrontal decision-making. The hungrier you get, the harder it becomes to evaluate menus rationally. Delegating the first filter to a 4-second wheel spin bypasses menu fatigue and gets food on your plate faster.'
        ]
      }
    ],
    faqs: [
      {
        question: 'How is the What Should I Eat Wheel different from the Food Wheel?',
        answer:
          'The What Should I Eat Wheel focuses on immediate craving types and meal formats (comfort food, spicy noodles, fresh bowls, quick bites), whereas our main Food Wheel (/food-wheel) includes dietary filters and a 2-stage Cuisine-to-Dish engine.'
      },
      {
        question: 'Can I customize the slices for vegetarian, keto, or halal cravings?',
        answer:
          'Yes! Edit or replace any slice in the sidebar to build your own personalized go-to meal list and save it in your browser.'
      },
      {
        question: 'What if I hate the food the wheel lands on?',
        answer:
          'That is a feature, not a bug! Feeling instant regret when a slice wins reveals what you definitely do not want. Click "Remove Winner" and spin the remaining options.'
      }
    ]
  },

  'dinner-wheel': {
    title: 'Dinner Wheel – Random Weeknight & Family Meal Spinner',
    h1: 'Dinner Wheel: Weeknight Family Meal & Recipe Decider',
    metaDescription:
      'End the 6 PM "What’s for dinner?" debate. Spin the Dinner Wheel to choose weeknight family recipes, sheet-pan meals, pasta nights, or takeout in seconds.',
    introduction:
      'The Dinner Wheel is designed specifically for the 5:30 PM weeknight dinner bottleneck when work is over, everyone is hungry, and nobody wants to plan a menu. Pre-loaded with balanced evening staples—sheet-pan roast chicken, taco night, stir-fry bowls, garlic pasta, homemade flatbreads, and cozy curries—it helps families, roommates, and couples lock in tonight’s main course or generate a 5-day Monday-to-Friday dinner schedule in under a minute.',
    instructions: [
      'Spin once at 5 PM to pick tonight’s dinner, or spin 5 times on Sunday with Elimination mode enabled to build your Monday–Friday meal plan.',
      'Weight quick 20-minute stovetop meals higher on busy weeknights and save slow-simmered dishes for weekend spins.',
      'Add your household’s 8 favorite family recipes in the sidebar so every spin lands on a meal you already know how to cook.',
      'Let kids take turns pressing Spacebar on family dinner night so they feel invested in eating the winning meal.'
    ],
    uniqueExamples: [
      'Sunday 5-Day Grocery List Builder: Spin 5 times with No-Repeat mode on to assign Monday through Friday dinners before ordering groceries.',
      'Picky Eater Family Truce: Give each family member 2 slices on the Dinner Wheel so everyone gets a fair 20% shot at their favorite evening meal.',
      'Cook at Home vs. Takeout Night: Include 5 home-cooked staples and 1 "Order Local Takeout" wildcard slice for a 1-in-6 treat night.'
    ],
    uniqueContentBlocks: [
      {
        heading: 'Weekly Meal Planning with No-Repeat Elimination Mode',
        body: [
          'Most households rotate through the same 10 to 12 core dinner recipes, yet deciding which night to cook which dish causes daily friction. By entering your 10 household staples into the Dinner Wheel and spinning five times in Elimination mode on Sunday morning, you generate a varied, zero-repeat weeknight menu and an exact grocery list in 60 seconds.'
        ]
      },
      {
        heading: 'Reducing Evening Food Waste with Fridge-Inventory Spins',
        body: [
          'Before heading to the supermarket, enter the proteins and vegetables currently sitting in your crisper drawer—such as ground turkey, bell peppers, tortellini, and salmon fillets—and spin the Dinner Wheel to cook through your existing inventory first.'
        ]
      }
    ],
    faqs: [
      {
        question: 'How do I use the Dinner Wheel to plan a full week of meals?',
        answer:
          'Turn on Elimination (No-Repeat) mode and spin 5 or 7 times in a row. Each winning dinner is removed automatically, giving you a complete non-repeating weekly menu.'
      },
      {
        question: 'Can I save my family’s custom dinner list for next week?',
        answer:
          'Yes. Your customized dinner slices are stored in your browser’s local presets so your family recipes are ready every evening.'
      },
      {
        question: 'How does the Dinner Wheel differ from the Restaurant Wheel?',
        answer:
          'The Dinner Wheel focuses on evening dishes and weeknight home-cooking rotation, while the Restaurant Wheel (/restaurant-wheel) is built for choosing where to dine out or order table reservations.'
      }
    ]
  },

  'breakfast-wheel': {
    title: 'Breakfast Wheel – Morning Meal & Brunch Idea Spinner',
    h1: 'Breakfast Wheel: Morning Meal, Smoothie & Brunch Picker',
    metaDescription:
      'Spin the Breakfast Wheel to choose between eggs & avocado toast, protein oatmeal, pancakes, smoothies, or weekend brunch classics. Fast morning decision maker.',
    introduction:
      'Mornings leave zero bandwidth for culinary overthinking. The Breakfast Wheel wakes up your routine with a balanced mix of savory protein breakfasts (eggs Benedict, breakfast burritos, avocado sourdough), sweet griddle favorites (buttermilk pancakes, Belgian waffles, French toast), and 3-minute grab-and-go fuel (berry protein smoothies, overnight oats, Greek yogurt parfaits).',
    instructions: [
      'Spin over your first cup of coffee to pick today’s morning fuel before hunger slows your morning commute.',
      'Customize the wheel into a "5-Minute Workday Breakfast" list for Monday–Friday or a "Lazy Sunday Brunch" list for weekends.',
      'Use Elimination mode to rotate through 5 different high-protein breakfasts across the workweek without eating plain toast five days straight.',
      'Add local bagel shops or coffee roasters when spinning for a weekend morning pastry run.'
    ],
    uniqueExamples: [
      'High-Protein Pre-Workout Rotation: Spin between egg-white veggie scrambles, cottage cheese bowls, smoked salmon bagels, and protein oats.',
      'Weekend Family Pancake vs. Waffle Showdown: Let the kids spin on Saturday morning to decide what goes on the griddle.',
      'Office Coffee & Bagel Run: Spin to pick which pastry box or breakfast taco platter to bring to the morning standup meeting.'
    ],
    uniqueContentBlocks: [
      {
        heading: 'Breaking Out of the Monotonous Weekday Breakfast Rut',
        body: [
          'Nutritional diversity at breakfast stabilizes morning energy and prevents mid-morning sugar crashes, yet groggy commuters default to the exact same cereal or toast every day. Keeping a 7-slice Breakfast Wheel bookmarked on your phone introduces effortless variety across eggs, oats, smoothies, and whole-grain bakes.'
        ]
      },
      {
        heading: 'Hosting Stress-Free Weekend Brunch Gatherings',
        body: [
          'When hosting friends for Sunday brunch, spin the Breakfast Wheel twice—once on a savory set (shakshuka, frittata, chilaquiles) and once on a sweet set (cinnamon rolls, Dutch baby pancake, fruit crepes)—to build a balanced two-dish spread.'
        ]
      }
    ],
    faqs: [
      {
        question: 'What breakfast options come pre-loaded on the Breakfast Wheel?',
        answer:
          'The default preset includes Buttermilk Pancakes, Eggs & Crispy Bacon, Avocado Sourdough Toast, Berry Protein Smoothie, Breakfast Burrito, Belgian Waffles, Greek Yogurt Parfait, and Oatmeal with Cinnamon.'
      },
      {
        question: 'Can I filter the Breakfast Wheel for quick 5-minute weekday meals?',
        answer:
          'Yes—simply delete the weekend brunch items in the sidebar editor or increase the weight sliders on quick options like smoothies, overnight oats, and toast.'
      },
      {
        question: 'Can I share our winning brunch pick with friends?',
        answer:
          'Yes! Click the Share button after spinning to send the winning breakfast or brunch choice directly to your group chat.'
      }
    ]
  },

  'restaurant-wheel': {
    title: 'Restaurant Wheel – Where to Eat Out & Cuisine Picker',
    h1: 'Restaurant Wheel: Dine-Out Cuisine & Table Reservation Decider',
    metaDescription:
      'Going out to eat and can’t agree on a spot? Spin the Restaurant Wheel to pick between Italian trattorias, sushi bars, steakhouse grills, Thai bistros, and local eateries.',
    introduction:
      'When everyone is dressed to go out—or sitting in the car in a parking lot—asking "Where do you want to eat?" triggers the endless "I don’t care, you pick" loop. The Restaurant Wheel is built specifically for dining out and local hospitality choices: comparing sit-down cuisines, neighborhood bistros, sushi bars, gastropubs, ramen shops, and date-night reservations so your group picks a destination and heads out the door.',
    instructions: [
      'Have each person in your dinner party nominate 2 local restaurants or dining styles and type them into the sidebar.',
      'Veto any restaurant that requires a reservation you don’t have or exceeds the group’s budget before spinning.',
      'Spin once in the car or group chat and commit to walking into whichever restaurant the pointer selects.',
      'Use the weight sliders to give a 2x boost to a newly opened local spot everyone has been meaning to try.'
    ],
    uniqueExamples: [
      'Friday Date Night Reservation Picker: Load 6 bookmarked neighborhood restaurants from your Google Maps "Want to Go" list and spin on Thursday evening.',
      'Team Offsite & Client Lunch Decider: Pick impartially between a Mediterranean mezze spot, a wood-fired pizzeria, a sushi bar, or an upscale burger bistro.',
      'New Neighborhood Explorer: Enter 8 independent restaurants within a 15-minute walk and use Elimination mode over two months to try every single one.'
    ],
    uniqueContentBlocks: [
      {
        heading: 'The "Nominate Two, Veto One" Group Dining Protocol',
        body: [
          'Group restaurant stalemates happen because nobody wants the social blame for picking a restaurant someone else dislikes. Solve this with a two-step rule: every diner adds two restaurants to the Restaurant Wheel, and each person gets one pre-spin veto. Every remaining slice on the wheel is pre-approved by the whole group, making the final spin 100% drama-free.'
        ]
      },
      {
        heading: 'Turning Your Saved Maps Bookmarks into an Actionable Wheel',
        body: [
          'Most food lovers have dozens of saved pins in Google Maps or Yelp that they never actually visit because they default to the same two familiar spots. Copying 8 of those saved restaurants into the Restaurant Wheel turns passive bookmarking into real culinary adventures.'
        ]
      }
    ],
    faqs: [
      {
        question: 'How is the Restaurant Wheel different from the Fast Food Wheel?',
        answer:
          'The Restaurant Wheel is tailored for sit-down dining, local independent eateries, cuisine styles, and date-night reservations, whereas the Fast Food Wheel (/fast-food-wheel) focuses on quick-service drive-thru chains.'
      },
      {
        question: 'Can I paste my favorite local restaurants into the wheel?',
        answer:
          'Yes! Open the Edit Items panel, clear or edit the default cuisines, and type in the exact names of restaurants in your city.'
      },
      {
        question: 'How do we prevent landing on the same restaurant two weeks in a row?',
        answer:
          'Enable Elimination (No-Repeat) mode so last week’s winning restaurant is removed from the wheel until you have rotated through all your local favorites.'
      }
    ]
  },

  'fast-food-wheel': {
    title: 'Fast Food Wheel – Drive-Thru & Takeout Chain Spinner',
    h1: 'Fast Food Wheel: Random Drive-Thru & Quick-Service Chain Picker',
    metaDescription:
      'Hungry on the road or craving a quick drive-thru run? Spin the Fast Food Wheel to choose between burgers, crispy chicken, tacos, subs, and popular fast-food chains.',
    introduction:
      'Sitting at a green light with hungry passengers is no time for a 20-minute culinary debate. The Fast Food Wheel is engineered for road trips, late-night drive-thru runs, and quick 15-minute takeout breaks—pitting iconic burger joints, crispy chicken drive-thrus, taco counters, sub shops, and burrito bowls against each other for an instant turn-signal decision.',
    instructions: [
      'Pull up the Fast Food Wheel while parked before pulling out of the driveway or highway rest stop.',
      'Delete any chains that do not have a location along your current route.',
      'Tap SPIN for an instant drive-thru verdict so the driver knows which exit or turn lane to take.',
      'Add specific combo orders (e.g., "Spicy Chicken Sandwich" vs. "Double Smashburger") if you already picked the chain.'
    ],
    uniqueExamples: [
      'Interstate Road Trip Exit Decider: Enter the 5 drive-thru signs listed on the blue highway exit board and spin before reaching the off-ramp.',
      'Post-Game Team Bus Stop: Let the winning captain spin the Fast Food Wheel to choose where the team stops after an away game.',
      'Friday Treat-Meal Showdown: Settle the household split between crispy chicken tenders, crunchy tacos, waffle fries, or loaded burritos.'
    ],
    uniqueContentBlocks: [
      {
        heading: 'Highway Exit & Drive-Thru Decision Speed',
        body: [
          'Unlike sit-down restaurant planning, fast-food decisions are constrained by geography and speed: what is open right now within two miles of the car? Keeping a mobile-ready Fast Food Wheel with your local drive-thru staples eliminates parking-lot idling and keeps road trips on schedule.'
        ]
      },
      {
        heading: 'Customizing By Regional Chains (In-N-Out, Culver’s, Whataburger, Shake Shack)',
        body: [
          'Every region has its fiercely debated fast-food champions. Use the sidebar editor to swap in your local icons—whether that is Culver’s ButterBurgers in the Midwest, Whataburger in Texas, In-N-Out on the West Coast, or Cook Out in the South.'
        ]
      }
    ],
    faqs: [
      {
        question: 'Can I customize the Fast Food Wheel with chains near my zip code?',
        answer:
          'Yes. Tap Edit Items to add or remove any fast-food or fast-casual chain in your town so every spin is a realistic drive-thru option.'
      },
      {
        question: 'Does the Fast Food Wheel work on mobile phones in the car?',
        answer:
          'Yes, it is fully touch-optimized for smartphones with one-tap spinning and zero login barriers.'
      },
      {
        question: 'How is this different from the general Food Wheel?',
        answer:
          'The Fast Food Wheel is strictly focused on quick-service drive-thrus, counter-service chains, and road-trip stops rather than home-cooked recipes or fine dining.'
      }
    ]
  },

  'dessert-wheel': {
    title: 'Dessert Wheel – Sweet Tooth, Bakery & Ice Cream Spinner',
    h1: 'Dessert Wheel: Sweet Treat, Bakery & Ice Cream Picker',
    metaDescription:
      'Craving something sweet after dinner? Spin the Dessert Wheel to pick between gelato, warm brownies, cheesecake, boba tea, macarons, and homemade baking ideas.',
    introduction:
      'Whether you are strolling past dessert shops after dinner, ordering a sweet treat for a birthday celebration, or deciding what to bake on a rainy Sunday afternoon, the Dessert Wheel satisfies your sweet tooth without indecision. Pre-loaded with decadent chocolate, fruity, frozen, and pastry classics, it helps you pick between warm molten lava cake, artisanal gelato, New York cheesecake, churros, and boba milk tea in one spin.',
    instructions: [
      'Spin after finishing your main course to choose tonight’s dessert run or baking project.',
      'Customize slices into "Frozen Treats Only" (gelato, soft serve, sorbet, froyo) on hot summer nights or "Warm Bakes" (brownies, cobbler, cookies) in winter.',
      'Use weight sliders to keep rich indulgence slices as rare 1x jackpots while giving lighter fruit or dark-chocolate treats a 3x weight.',
      'Share the winning dessert card with your group to rally everyone for a late-night bakery or ice cream run.'
    ],
    uniqueExamples: [
      'Weekend Baking Project Picker: Spin between chocolate chip skillet cookies, lemon bars, banana bread, tiramisu, and cinnamon rolls.',
      'Post-Dinner Date Night Sweet Run: Choose between the local gelato parlor, a late-night creperie, a boba tea lounge, or a pie shop.',
      'Ice Cream Parlor Flavor Decider: Replace the slices with 10 scoop flavors (pistachio, salted caramel, mint chip, mango sorbet) while standing in line.'
    ],
    uniqueContentBlocks: [
      {
        heading: 'Balancing Indulgence and Portion Control with Weighted Slices',
        body: [
          'If you enjoy a nightly sweet ritual but want to balance heavy pastries with lighter options, the Dessert Wheel’s probability weights make moderation effortless. Assign a 3x weight to dark chocolate squares, berries with whipped cream, or Greek yogurt bark, and a 1x weight to fudge brownies or cheesecake so big treats feel like a genuine jackpot.'
        ]
      },
      {
        heading: 'Interactive Dessert Bars for Parties & Bridal Showers',
        body: [
          'Event hosts set up a tablet running the Dessert Wheel next to a cupcake or sundae bar so guests can spin for a random topping combination or mystery pastry flavor.'
        ]
      }
    ],
    faqs: [
      {
        question: 'What desserts are included on the default Dessert Wheel?',
        answer:
          'Default slices include Warm Chocolate Brownie, Artisanal Gelato / Ice Cream, New York Cheesecake, Fresh Fruit Tart, Cinnamon Churros, Boba Milk Tea, Molten Lava Cake, and French Macarons.'
      },
      {
        question: 'Can I turn this into a baking recipe wheel?',
        answer:
          'Yes! Edit the items in the sidebar to list recipes from your favorite baking cookbook or saved Pinterest board.'
      },
      {
        question: 'Can I weight healthier sweet treats higher than heavy desserts?',
        answer:
          'Yes, use the 1x–10x weight sliders in the item editor to make fruit or dark chocolate slices appear more frequently than heavy cakes.'
      }
    ]
  },

  'snack-wheel': {
    title: 'Snack Wheel – Salty, Sweet & Study Snack Spinner',
    h1: 'Snack Wheel: Late-Night, Gaming & Study Snack Decider',
    metaDescription:
      'Need a quick bite between meals? Spin the Snack Wheel to choose between popcorn, chips & salsa, trail mix, cheese boards, fruit & nut butter, or gaming snacks.',
    introduction:
      'The Snack Wheel is built for the 3 PM afternoon slump, late-night study sessions, and movie-night munchies when you want a satisfying bite without cooking a full meal. It balances crunchy, salty, savory, and sweet finger foods—kettle popcorn, tortilla chips with guacamole, apple slices with almond butter, edamame, trail mix, and pretzel bites—so you can grab a snack and get back to your desk or couch.',
    instructions: [
      'Spin when you want a quick 100-to-300-calorie bite between lunch and dinner or during a movie marathon.',
      'Edit slices to match what is currently stocked in your pantry or office breakroom.',
      'Organize slices by texture (Crunchy, Creamy, Salty, Sweet, High-Protein) to pinpoint what your palate is looking for.',
      'Turn on Elimination mode when packing 5 different school or work snacks for Monday through Friday.'
    ],
    uniqueExamples: [
      'Kids After-School Snack Station: Let children spin a parent-approved wheel of apple nachos, string cheese, hummus & carrots, pretzels, and berry smoothies.',
      'Movie & Board Game Night Munchies: Decide whether to pop buttered popcorn, build a nacho tray, or set out a charcuterie snack board.',
      'Pomodoro Study Break Fuel: Reward yourself after a 50-minute focus block with a random brain-food snack spin.'
    ],
    uniqueContentBlocks: [
      {
        heading: 'Parent-Approved After-School Snack Autonomy for Kids',
        body: [
          'Pediatric dietitians recommend offering structured choice at snack time: parents decide what options go on the list, and children decide which one to eat. Loading six nutritious snacks onto the Snack Wheel turns after-school kitchen negotiations into an exciting game.'
        ]
      },
      {
        heading: 'Clean-Finger Gaming & Desk Snacks vs. Lounge Platters',
        body: [
          'When gaming with a controller or typing at a mechanical keyboard, messy snacks are a hazard. Customize a "Desk-Safe Snack Wheel" with chopsticks-friendly popcorn, roasted almonds, pretzel crisps, and frozen grapes.'
        ]
      }
    ],
    faqs: [
      {
        question: 'How is the Snack Wheel different from the Dessert or Food Wheel?',
        answer:
          'The Snack Wheel focuses on quick, zero-prep finger foods and between-meal energy bites (popcorn, nuts, chips & dip, fruit), whereas the Dessert Wheel is strictly sweet treats and the Food Wheel covers full meals.'
      },
      {
        question: 'Can I use the Snack Wheel to pack weekly school lunchbox snacks?',
        answer:
          'Yes! Enter 8 pantry snacks, turn on Elimination mode, and spin 5 times on Sunday evening to pack a different snack for every school day.'
      },
      {
        question: 'Can I save separate Savory and Sweet snack lists?',
        answer:
          'Yes, you can edit the slices anytime and save custom presets in your browser.'
      }
    ]
  },

  'group-generator': {
    title: 'Group Generator Wheel – Classroom Partner & Breakout Picker',
    h1: 'Group Generator Wheel: Lab Partner, Triad & Breakout Room Spinner',
    metaDescription:
      'Assign students or workshop attendees into study groups, lab partners, and breakout rooms with the visual Group Generator Wheel. Eliminates social exclusion.',
    introduction:
      'While a bulk team splitter divides an entire roster in one silent click, teachers and workshop facilitators often prefer the visual drama and transparency of spinning a wheel on the smartboard to assign students one by one to Table Group A, Lab Station B, Breakout Room C, or Literature Circle D. The Group Generator Wheel makes partner pairing and station rotation visible, equitable, and socially safe.',
    instructions: [
      'Choose your grouping approach: either put Table/Station names on the wheel and spin once for each student, OR put student names on the wheel and spin in Elimination mode to draw pairs and triads.',
      'Project the wheel on your classroom smartboard so students see that lab partners and peer-review pairs are chosen by pure mathematics.',
      'Use Elimination mode so every student is assigned to a group before the wheel resets.',
      'Switch to our bulk Team Generator (/team-generator) if you want to split 30 names into 6 instant squads without spinning individually.'
    ],
    uniqueExamples: [
      'Science Lab Partner Pairing: Spin student names in Elimination mode two at a time to form unbiased chemistry or biology lab dyads.',
      'Jigsaw Reading & Learning Stations: Place "Station 1: Primary Sources", "Station 2: Map Analysis", "Station 3: Timeline", and "Station 4: Debate" on the wheel to route students.',
      'Workshop & Zoom Breakout Icebreakers: Assign conference attendees to numbered discussion tables live on the main screen.'
    ],
    uniqueContentBlocks: [
      {
        heading: 'Why Visible Smartboard Pairing Prevents Classroom Social Anxiety',
        body: [
          'Telling a middle- or high-school class to "find a partner" immediately triggers social anxiety for introverted or new students who worry about being left out. Spinning the Group Generator Wheel on the front projector removes all social pressure and cliques, normalizing working with every classmate across the semester.'
        ]
      },
      {
        heading: 'Group Generator Wheel vs. Bulk Team Generator (/team-generator)',
        body: [
          'Use this Group Generator Wheel when you want live, one-by-one visual suspense on a projector—for example, drafting students into 4 house cups or rotating learning stations. When you need to divide a pasted CSV of 32 names into 8 balanced squads in a single instant table, use our dedicated Team Generator (/team-generator).'
        ]
      }
    ],
    faqs: [
      {
        question: 'What is the difference between the Group Generator Wheel and the Team Generator?',
        answer:
          'The Group Generator Wheel is an interactive spinning wheel for live one-by-one partner draws and station assignments on a smartboard, whereas the Team Generator (/team-generator) is a bulk roster splitter that outputs balanced multi-team tables in one click.'
      },
      {
        question: 'How do I draw pairs of lab partners without repeating a student?',
        answer:
          'Enter your class roster, turn on Elimination (No-Repeat) mode, and spin twice per lab table. Each selected student is removed automatically until the entire class is paired.'
      },
      {
        question: 'Is student roster data kept private?',
        answer:
          'Yes. All student names stay 100% inside your local browser memory (localStorage) and are never uploaded to any external database—making it FERPA and COPPA friendly.'
      }
    ]
  },

  'never-have-i-ever-wheel': {
    title: 'Never Have I Ever Wheel – Party Questions & Rules',
    h1: 'Never Have I Ever Wheel: Clean, College & Party Confession Prompts',
    metaDescription:
      'Spin the Never Have I Ever Wheel for instant party prompts, 10-finger countdown rules, and customizable clean, college, or couples confession lists.',
    introduction:
      'Most games of Never Have I Ever stall out after five minutes because players freeze when it is their turn to invent a clever prompt on the spot. The Never Have I Ever Wheel keeps the confession circle moving at high speed with curated, universally relatable prompts—from harmless travel mishaps and awkward text fails to hilarious college stories—while letting your group switch seamlessly between Clean Family, Icebreaker, and After-Hours Party lists.',
    instructions: [
      'Have everyone in the circle hold up 5 or 10 fingers (or start with zero penalty points).',
      'Spin the Never Have I Ever Wheel and read the winning confession prompt out loud.',
      'Anyone who HAS done the action on the slice must put one finger down and share the 30-second backstory if they were the only person in the room to fold.',
      'Turn on Elimination (No-Repeat) mode so every question is asked only once during the round.'
    ],
    useCases: [
      {
        title: '1. Clean Classroom & Youth Group Icebreaker List',
        description:
          'Safe-for-school prompts that get students laughing without crossing personal boundaries: "Fallen asleep in class", "Sent a text to the wrong group chat", "Pretended to know a song lyric", "Binge-watched an entire season in one Saturday".',
        benefit: 'Works for middle school, high school, and corporate retreats with zero awkwardness.'
      },
      {
        title: '2. College Dorm & Housewarming Party Deck',
        description:
          'High-energy prompts for twenty-somethings: "Stayed up past 5 AM cramming", "Ghosted a bad first date", "Faked a sick day to travel", "Re-gifted a birthday present", "Missed a flight or train by minutes".',
        benefit: 'Uncovers hilarious dorm and roommate stories within the first three spins.'
      },
      {
        title: '3. Couples & Double-Date Edition',
        description:
          'Relationship-focused prompts: "Snooped through a partner’s Spotify history", "Forgotten an anniversary or birthday", "Pretended to like a home-cooked meal", "Stalked an ex’s LinkedIn profile".',
        benefit: 'Sparks playful banter on double dates and bachelorette weekends.'
      },
      {
        title: '4. Remote Team Happy Hour & Discord Hangout',
        description:
          'Work-from-home confessions: "Joined a Zoom call in pajama pants", "Blamed Wi-Fi for being late", "Accidentally unmuted during a rant", "Worked from a coffee shop just for the pastry".',
        benefit: 'Lets remote coworkers bond over shared WFH habits on video calls.'
      }
    ],
    uniqueExamples: [
      'Clean & Family Slice List: Forgotten someone’s name right after meeting, Dropped my phone on my face in bed, Wave back at someone waving at the person behind me, Locked myself out of the house, Cried during an animated movie, Pretended to be on a phone call to avoid small talk.',
      'College & Game Night Slice List: Pulled an all-nighter before an exam, Lied about my age or major at a party, Sent a risky text and immediately put my phone on airplane mode, Crashed a party where I knew nobody, Used someone else’s Netflix login for over a year.',
      'Solo Backstory Rule: If only ONE person in the circle puts a finger down on a spin, they earn their finger back if they tell the full 60-second story behind it.'
    ],
    tips: [
      'Use the "Solo Storyteller Bonus" rule: whenever only one player puts a finger down, pause the wheel for 60 seconds so they can tell the story behind that confession.',
      'Start with a 5-Finger Sprint for large groups (8+ people) so rounds finish in 12 minutes rather than dragging on for an hour.',
      'Give every player one "Pass & Add" token: they can veto one slice before it is answered if they replace it with two custom prompts of their own.',
      'Pair with the Truth or Dare Wheel (/truth-or-dare-wheel) by making the first player who loses all five fingers spin a dare penalty.'
    ],
    uniqueContentBlocks: [
      {
        heading: 'When, Why, and How to Use a Never Have I Ever Spinner Instead of Prompt Cards',
        body: [
          'Traditional Never Have I Ever relies on each player thinking up a statement on their turn. In practice, players either target one specific friend in the circle or draw a total mental blank, killing the room’s momentum. Placing 10 to 20 prompts on an impartial spinning wheel removes targeted targeting and keeps everyone guessing what slice the pointer will click onto next.',
          'Even better, a digital wheel lets you tailor the room temperature in 15 seconds. Before friends arrive, paste a mixed deck of 12 slices—combining travel blunders, social media mishaps, and custom inside jokes specific to your friend group—and toggle Elimination Mode so every spin reveals a brand-new confession.'
        ]
      },
      {
        heading: 'How to Score the 5-Finger Sprint vs. Reverse Point Accumulation',
        body: [
          'For groups of 4 to 6 people, play the classic 10-Finger Countdown where the last player with a finger standing wins. For larger groups of 7 to 15 people—or virtual Zoom/Discord calls where counting fingers on webcams is difficult—play Reverse Point Accumulation: anyone who has done the prompt raises their hand and scores +1 Adventurer Point, and the first player to reach 7 points wins the round.'
        ]
      }
    ],
    faqs: [
      {
        question: 'How do you play Never Have I Ever with a spinning wheel?',
        answer:
          'Everyone starts with 5 or 10 fingers held up. One player spins the Never Have I Ever Wheel and reads the winning slice aloud ("Never have I ever..."). Anyone in the group who HAS done that action lowers one finger. Turn on Elimination mode so completed prompts are removed after each spin.'
      },
      {
        question: 'Can I customize the wheel with clean PG questions or adult party prompts?',
        answer:
          'Yes! The default slices are lighthearted, PG-13 crowd-pleasers suitable for any hangout. You can click the Entries sidebar to bulk-paste clean classroom prompts, remote team WFH confessions, or spicier college game-night questions.'
      },
      {
        question: 'What happens if nobody in the room has done the action on the wheel?',
        answer:
          'Under house wheel rules, if a spin lands on a prompt and zero players put a finger down, the person who spun the wheel must tell a quick truth or spin again immediately with Elimination enabled.'
      },
      {
        question: 'How many prompts should I put on the Never Have I Ever Wheel?',
        answer:
          'We recommend loading 10 to 16 prompts on the wheel at a time with Elimination mode turned on. That gives you a brisk 15-minute round with clean, readable typography on mobile phones and living-room TVs.'
      }
    ]
  },

  'workout-wheel': {
    title: 'Workout Wheel – HIIT Circuit & EMOM Exercise Spinner',
    h1: 'Workout Wheel: Random HIIT, Tabata & Bodyweight Circuit Generator',
    metaDescription:
      'Break gym boredom with the Workout Wheel. Spin random bodyweight exercises, 20-minute EMOM intervals, and equipment-free HIIT circuits at home or the gym.',
    introduction:
      'Doing the exact same three exercises in the same order every Tuesday leads to both mental boredom and muscular adaptation plateaus. The Workout Wheel turns bodyweight training, garage gym sessions, and group fitness classes into a gamified interval circuit: spin once every 60 seconds to pick your next movement—eliminating cherry-picking and forcing full-body variety across push, pull, legs, and core.',
    instructions: [
      'Complete a 3-minute dynamic warm-up (arm circles, bodyweight squats, inchworms, and high knees) before your first spin.',
      'Choose your protocol: either spin for 8–12 total sets in Elimination mode, or run a 15-minute EMOM (Every Minute on the Minute) where you spin at the top of each minute.',
      'Perform the winning exercise for 40 seconds of work followed by 20 seconds of rest (during which you click Spin for the next station).',
      'Customize the slices in the sidebar to match your available equipment (bodyweight-only, dumbbells, kettlebells, or pull-up bar).'
    ],
    useCases: [
      {
        title: '1. Zero-Equipment Living Room HIIT Circuit (16 Minutes)',
        description:
          'Load 8 bodyweight slices: "20 Jump Squats", "15 Push-Ups", "60-Sec Plank Hold", "12 Burpees", "20 Alternating Lunges", "30 Mountain Climbers", "15 Tricep Chair Dips", "45-Sec Wall Sit".',
        benefit: 'Delivers a high-heart-rate full-body sweat in a hotel room or apartment with zero gear.'
      },
      {
        title: '2. Garage Gym Kettlebell & Dumbbell EMOM',
        description:
          'Load 6 weighted slices: "15 Kettlebell Swings", "10 Goblet Squats", "8 Dumbbell Thrusters", "12 Renegade Rows", "10 Romanian Deadlifts", "40m Farmer Carry".',
        benefit: 'Balances posterior chain, overhead press, and grip endurance across 15–20 rounds.'
      },
      {
        title: '3. Work-From-Home "Pomodoro Movement Snack" Wheel',
        description:
          'Spin once every 60 minutes at your standing desk: "15 Air Squats", "10 Desk Push-Ups", "45-Sec Dead Hang / Doorway Stretch", "20 Calf Raises", "30-Sec Thoracic Spine Opener".',
        benefit: 'Reverses desk stiffness and boosts afternoon energy in under 90 seconds per break.'
      },
      {
        title: '4. PE Class & Bootcamp Finisher Roulette',
        description:
          'Let the athlete of the day spin the final 3-minute team finisher on the gym tablet: "Synchronized Plank Hold", "Partner Wheelbarrow Relay", "25 Team Jumping Jacks", "Bear Crawl Shuttle".',
        benefit: 'Turns dreaded conditioning finishers into a cheering group spectacle.'
      }
    ],
    uniqueExamples: [
      'Balanced Push/Pull/Legs/Core Deck (8 Slices): 15 Push-Ups (Upper Push), 12 Inverted Table Rows or Band Pull-Aparts (Upper Pull), 20 Bodyweight Squats (Quad Dominant), 15 Glute Bridges (Posterior Chain), 20 Alternating Reverse Lunges (Unilateral Legs), 60-Second Forearm Plank (Anti-Extension Core), 30 Mountain Climbers (Cardio Core), 12 Burpees (Full-Body Metabolic).',
      'Rep-Multiplier Combo Workflow: Pair the Workout Wheel with our 1-10 Number Wheel (/1-10-wheel)—spin the Workout Wheel for the exercise, then spin the Number Wheel and multiply by 3 to set your rep target (3 to 30 reps).',
      'Anti-Back-to-Back Rule: Turn on Elimination mode so you never draw three upper-body pushing movements in a row before hitting legs and core.'
    ],
    tips: [
      'Always enable Elimination (No-Repeat) mode for your first 8 spins so you hit every muscle group exactly once before resetting the wheel for Round 2.',
      'Add one "60-Second Active Recovery (Walk + Deep Nasal Breathing)" slice with a 1x weight to keep your heart rate in an sustainable aerobic-anaerobic zone.',
      'Scale intensity by time rather than fixed reps (e.g., 40 seconds of quality reps, 20 seconds to breathe and spin) so beginners and advanced athletes can train together.',
      'Mount a tablet or phone on a tripod in Fullscreen Mode and use the Spacebar on a Bluetooth keyboard for sweaty hands-free spinning.'
    ],
    uniqueContentBlocks: [
      {
        heading: 'When, Why, and How Randomized Interval Training Beats Workout Skip Bias',
        body: [
          'When athletes design their own quick home workouts on the fly, human psychology naturally gravitates toward favorite strengths and skips uncomfortable movements like burpees, single-leg lunges, or isometric wall sits. Exercise physiologists note that introducing structured randomness removes pre-workout negotiation and increases session adherence because you only have to focus on the current 45-second slice.',
          'To keep a randomized workout biomechanically safe, never throw 15 exercises from the same joint pattern onto the wheel. Instead, structure your Workout Wheel using the 2-2-2-2 Balance Rule: two upper-body pushes/pulls, two lower-body knee/hip hinges, two core stabilizers, and two metabolic cardio bursts. With Elimination mode enabled, an 8-spin circuit guarantees a complete, anatomically balanced training session in under 15 minutes.'
        ]
      },
      {
        heading: 'Workout Wheel vs. Exercise Wheel vs. Home Workout Wheel',
        body: [
          'Use this flagship Workout Wheel for high-intensity interval circuits (HIIT), Tabata timers, and 15-to-30-minute conditioning blocks. If you want a gentler 60-second movement break between office meetings, check out our Exercise Wheel (/exercise-wheel), or use the Home Workout Wheel (/home-workout-wheel) for quiet, apartment-friendly routines with zero jumping.'
        ]
      }
    ],
    faqs: [
      {
        question: 'Is a randomized Workout Wheel actually effective for fitness, or just a gimmick?',
        answer:
          'When loaded with balanced compound movements (squats, push-ups, lunges, planks, swings) and spun with Elimination mode enabled, the Workout Wheel functions as a structured full-body circuit. Randomizing the sequence prevents you from skipping hard exercises while guaranteeing every movement pattern is trained.'
      },
      {
        question: 'How do I prevent the wheel from picking burpees or push-ups three times in a row?',
        answer:
          'Toggle on Elimination (No-Repeat) mode in the wheel controls before starting your circuit. Each winning exercise is removed after you complete it, ensuring you complete all 8 exercises once before the wheel resets for Round 2.'
      },
      {
        question: 'Can I customize the exercises for dumbbells, kettlebells, or knee-friendly low impact?',
        answer:
          'Yes! Open the Entries panel to delete any high-impact jumping movement and paste your own dumbbell, resistance band, or physical-therapy rehab exercises. Your custom circuit saves automatically in your browser.'
      },
      {
        question: 'How many spins make a complete workout?',
        answer:
          'For a brisk morning energizer, run 1 round of 8 spins with Elimination on (about 8–10 minutes). For a full conditioning session, complete 2 to 3 full rounds (16 to 24 total spins) using a 40-seconds-on, 20-seconds-rest interval clock.'
      }
    ]
  },

  'chore-picker': {
    title: 'Chore Picker Wheel – Fair Family & Roommate Task Spinner',
    h1: 'Chore Picker Wheel: Conflict-Free Household & Kids Chore Decider',
    metaDescription:
      'End arguments over who washes dishes or vacuums. Spin the Chore Picker Wheel for fair roommate cleaning drafts, kids allowance charts, and 15-minute power cleans.',
    introduction:
      'Static paper chore charts almost always fail by Week 3 because someone feels stuck with the worst bathroom job or accuses the house organizer of nagging. The Chore Picker Wheel turns Saturday morning housekeeping into a transparent, 60-second draft: gather the family or roommates in the kitchen, turn on No-Repeat Elimination mode, and let each person spin their own assignment so nobody can blame the parent or leaseholder.',
    instructions: [
      'Match the chore slices on the wheel to the actual tasks that need to be finished today (and remove any task that is already clean).',
      'Turn on Elimination (No-Repeat) mode so once a chore is claimed, it disappears from the wheel for the next spinner.',
      'Have each child, partner, or roommate tap Spin themselves—personal ownership jumps dramatically when you trigger your own spin.',
      'Set a shared 15- or 20-minute countdown timer and blast an upbeat playlist so everyone cleans simultaneously.'
    ],
    useCases: [
      {
        title: '1. Saturday Morning Kids Chore & Allowance Draft',
        description:
          'Load age-appropriate tasks: "Unload Dishwasher", "Feed Pets & Refill Water", "Vacuum Living Room Rug", "Collect & Take Out Recycling", "Wipe Dining Table & Counters", "Sort & Fold Towel Load", "BONUS: Pick Tonight’s Dessert!".',
        benefit: 'Stops sibling bickering ("You always give me the hard job!") with visible mathematical fairness.'
      },
      {
        title: '2. Apartment Roommate Sunday Reset Protocol',
        description:
          'Split shared common-area zones fairly among 3–4 roommates: "Kitchen Sink, Stovetop & Counters", "Bathroom Mirror, Sink & Toilet", "Sweep & Mop Hard Floors", "Trash, Recycling & Entryway Declutter".',
        benefit: 'Eliminates passive-aggressive group chat texts about dirty dishes and shared bathrooms.'
      },
      {
        title: '3. Solo ADHD 15-Minute "Clean One Thing" Momentum Starter',
        description:
          'Overwhelmed by a messy house? Break cleaning into tiny 10-minute micro-slices: "Clear Just the Coffee Table", "Run 1 Load of Laundry", "Empty Kitchen Trash Only", "2-Minute Bathroom Counter Wipe", "Put Away 10 Items".',
        benefit: 'Bypasses executive dysfunction by picking one bite-sized starting point in 3 seconds.'
      },
      {
        title: '4. Classroom End-of-Day 3-Minute Cleanup Jobs',
        description:
          'Elementary and middle school teachers spin classroom jobs: "Floor Inspector", "Whiteboard Eraser", "Chromebook Cart Plug-In", "Bookshelf Straightener", "Supply Caddy Organizer".',
        benefit: 'Gets 25 students resetting the classroom in under 180 seconds before the bell rings.'
      }
    ],
    uniqueExamples: [
      'Equal-Effort 15-Minute Task List (8 Slices): Unload & Reload Dishwasher (12 min), Vacuum Living Room & Hallway (12 min), Scrub Bathroom Sink, Mirror & Toilet (12 min), Wipe Kitchen Counters, Stovetop & Microwave (12 min), Fold & Put Away One Laundry Basket (12 min), Take Out All Trash & Recycling Bins (10 min), Sweep Kitchen & Entryway Floors (10 min), Wildcard: Pick Your Favorite Chore or Assist!',
      'The "Golden Ticket" Reward Slice: Add one low-weight bonus slice—"DJ & Hydration Boss (Picks the Music + 5 Min Early Break)"—so kids actually race to the tablet to spin.',
      '30-Second Trade Window Rule: After everyone spins their chore in Elimination mode, open a 30-second swap window where two people can mutually trade tasks if one prefers vacuuming and the other prefers dishes.'
    ],
    tips: [
      'Keep every slice on the wheel roughly equal in duration (e.g., all 10–15 minute tasks). Never put a 45-minute deep oven scrub next to a 2-minute plant watering on the same wheel!',
      'Include one fun reward or wildcard slice (like "Music DJ + Easy Chore" or "Skip One Task Token") when spinning with kids ages 5–12 to build positive excitement.',
      'Allow a 30-second consensual trade window after all spins are done: if Sibling A hates trash duty and Sibling B hates folding laundry, let them swap voluntarily.',
      'For ADHD or executive-function overwhelm, commit to the "One Spin Only" pact: you only have to do the single micro-chore the wheel lands on, then you have full permission to stop.'
    ],
    uniqueContentBlocks: [
      {
        heading: 'When, Why, and How to Use a Chore Picker Wheel Without Sparking Resentment',
        body: [
          'Household conflict over chores rarely comes from the physical labor itself—it comes from perceived unfairness and the mental load of one partner or parent acting as the "house manager." When a human assigns chores, family members instinctively negotiate or feel micromanaged. When every member of the household taps the Chore Picker Wheel themselves with Elimination mode active, the algorithm becomes the neutral referee.',
          'The secret to a successful chore wheel is Time-Boxing Equivalence. Before spinning, calibrate your slices so every option takes roughly 12 to 15 minutes of active effort. If you have a massive 40-minute job (like cleaning out the refrigerator), split it into two separate 15-minute slices ("Fridge Top 2 Shelves" and "Fridge Drawers & Door Bins") so no unlucky spinner gets stuck working twice as long as everyone else.'
        ]
      },
      {
        heading: 'How Adults With ADHD Use Micro-Chore Wheels to Beat Cleaning Paralysis',
        body: [
          'Looking at a cluttered apartment creates an all-or-nothing cognitive bottleneck where your brain sees 20 intertwined tasks and freezes. By loading 6 tiny, self-contained 10-minute actions onto the Chore Picker Wheel (such as "Collect all cups and plates into the sink" or "Clear the entryway floor"), you outsource the prioritization step completely. Once the wheel picks a single micro-target, starting takes zero willpower.'
        ]
      }
    ],
    faqs: [
      {
        question: 'How do I make sure two kids or roommates don’t get the same chore?',
        answer:
          'Turn on Elimination (No-Repeat) mode before the first person spins. Every time a chore slice is selected, it is automatically removed from the wheel so the next spinner draws from the remaining unassigned tasks.'
      },
      {
        question: 'What if one chore takes 30 minutes and another takes only 5 minutes?',
        answer:
          'For maximum fairness, split big jobs into equal 10-to-15-minute slices (e.g., split "Clean Bathroom" into "Bathroom Sink & Mirror" and "Toilet & Bathroom Floor"), or bundle two quick 5-minute tasks onto a single slice ("Take Out Trash + Wipe Dining Table").'
      },
      {
        question: 'Can I save separate Daily After-School and Saturday Deep-Clean chore lists?',
        answer:
          'Yes! You can edit the slices in the sidebar and save custom lists in your browser or copy a shareable link for your weekday routine versus your weekend deep-clean draft.'
      },
      {
        question: 'What is the "30-Second Trade Rule" for family chore wheels?',
        answer:
          'After everyone has spun their random chore, allow a 30-second window where any two players can mutually agree to swap assignments. Because the baseline assignment was 100% fair, voluntary trades feel collaborative rather than forced.'
      }
    ]
  },

  'exercise-wheel': {
    title: 'Exercise Wheel – Desk Mobility & PE Warm-Up Spinner',
    h1: 'Exercise Wheel: Quick Desk Breaks, PE Warm-Ups & Mobility Prompts',
    metaDescription:
      'Spin the Exercise Wheel for 60-second desk mobility breaks, school PE class warm-ups, and low-barrier daily movement prompts without changing clothes.',
    introduction:
      'While our high-intensity Workout Wheel (/workout-wheel) is built for sweaty 20-minute HIIT circuits, the Exercise Wheel is designed for instant, zero-barrier movement snacks throughout the day—from 60-second work-from-home posture resets and physical therapy mobility drills to energetic K–12 PE warm-up circles.',
    instructions: [
      'Keep the Exercise Wheel open in a pinned browser tab during long desk workdays or project it on the gymnasium screen for PE warm-ups.',
      'Spin once every 50–60 minutes (or at the start of class) to select a 60-second movement prompt.',
      'Perform the movement at a comfortable, controlled tempo focusing on joint range of motion and blood flow.',
      'Enable Elimination mode so you cycle through upper spine, hips, legs, and core across the day.'
    ],
    useCases: [
      {
        title: '1. Remote Worker Hourly Posture & Mobility Reset',
        description:
          'No-sweat desk slices: "15 Desk Push-Ups", "20 Bodyweight Air Squats", "45-Sec Doorway Chest Stretch", "10 Standing Hip Circles", "20 Standing Calf Raises", "30-Sec Wall Angels".',
        benefit: 'Eliminates afternoon lower-back stiffness and neck tension without needing gym clothes.'
      },
      {
        title: '2. Elementary & Middle School PE Warm-Up Circle',
        description:
          'Let the student leader of the day spin 4 warm-up movements: "20 Jumping Jacks", "10 High Knees + Butt Kicks", "10 Frankenstein Toe Touches", "10 Arm Circles Forward & Back", "30-Sec Balance on One Foot".',
        benefit: 'Gets 30 students excited and moving within 60 seconds of entering the gym.'
      },
      {
        title: '3. Study Break & Classroom Brain-Break Spinner',
        description:
          'Between 45-minute test prep blocks: "10 Star Jumps", "Touch Toes & Reach for Sky x10", "30-Sec Invisible Jump Rope", "10 Slow Lunges".',
        benefit: 'Floods the brain with oxygen and restores classroom focus in 2 minutes.'
      },
      {
        title: '4. Gamer Between-Match Lobby Fitness Wheel',
        description:
          'Spin during 90-second matchmaking queues: "10 Push-Ups", "15 Squats", "45-Sec Plank", "20 Wrist & Forearm Stretches".',
        benefit: 'Turns dead lobby waiting time into 100+ effortless reps per gaming evening.'
      }
    ],
    uniqueExamples: [
      'No-Sweat Office Mobility Deck (8 Slices): 15 Incline Desk Push-Ups, 15 Chair Sit-to-Stand Squats, 30-Second Doorway Pec Stretch, 10 Standing Thoracic Windmills, 20 Standing Calf Raises, 10 Reverse Lunges, 30-Second Wrist & Finger Flexor Stretch, 45-Second Single-Leg Balance.',
      'PE Class Leader Protocol: Have a different student spin the Exercise Wheel at the start of each PE period until all 4 warm-up slices are completed.'
    ],
    tips: [
      'Keep movements under 60 seconds so you never hesitate to spin during a busy workday.',
      'If you want a full 20-minute sweaty cardio or dumbbell circuit instead of quick movement snacks, switch to our Workout Wheel (/workout-wheel).'
    ],
    uniqueContentBlocks: [
      {
        heading: 'Why 60-Second "Exercise Snacks" Outperform Sitting for 8 Hours Straight',
        body: [
          'Sports medicine research shows that even if you work out for 45 minutes in the evening, sitting motionless for 8 consecutive hours still impairs glucose metabolism and tightens hip flexors. Spinning the Exercise Wheel once per hour for a 60-second set of squats, wall angels, or desk push-ups reactivates postural muscles and sharpens mental alertness.'
        ]
      }
    ],
    faqs: [
      {
        question: 'How is the Exercise Wheel different from the Workout Wheel?',
        answer:
          'The Exercise Wheel is tailored for quick 60-second movement snacks, office mobility breaks, and classroom/PE warm-ups, while the Workout Wheel (/workout-wheel) is built for full 15-to-30-minute HIIT and strength circuits.'
      },
      {
        question: 'Can teachers use the Exercise Wheel for classroom brain breaks?',
        answer:
          'Yes! Project the wheel on your smartboard between lessons and let a student spin two 30-second movement slices to reset class energy.'
      },
      {
        question: 'Can I add my physical therapist’s daily rehab stretches?',
        answer:
          'Absolutely. Replace the default slices with your prescribed PT stretches and use Elimination mode to check off all 6 exercises every day.'
      }
    ]
  },

  'home-workout-wheel': {
    title: 'Home Workout Wheel – Quiet Apartment & No-Gear Routines',
    h1: 'Home Workout Wheel: Zero-Equipment & Apartment-Friendly Fitness Spinner',
    metaDescription:
      'Spin quiet, zero-equipment home workout routines that won’t wake downstairs neighbors. Perfect for small apartments, bedrooms, and hotel travel fitness.',
    introduction:
      'Training in a second-floor apartment or a cramped bedroom means noisy box jumps and sprawling gym equipment are off the table. The Home Workout Wheel is curated specifically for small spaces and quiet floors—combining slow-tempo strength movements, isometric holds, and low-impact core work that require nothing more than a yoga mat.',
    instructions: [
      'Clear a 6-by-3-foot yoga mat space in your living room, bedroom, or hotel room.',
      'Turn on Elimination mode and spin 6 to 8 slices for a complete, neighbor-friendly strength circuit.',
      'Use a slow 3-second lowering tempo on squats, push-ups, and lunges to maximize muscle tension without noisy jumping.',
      'Swap in resistance band or dumbbell slices in the sidebar if you have compact home gear.'
    ],
    useCases: [
      {
        title: '1. Quiet Upstairs Apartment Circuit (Zero Jumping)',
        description:
          '100% silent floor slices: "15 Slow-Tempo Squats", "12 Push-Ups", "45-Sec Forearm Plank", "20 Glute Bridges", "12 Reverse Lunges per Leg", "30-Sec Side Plank Left & Right", "15 Superman Back Extensions", "45-Sec Wall Sit".',
        benefit: 'Builds serious lower-body and core strength at 6 AM or 10 PM without thumping the floor.'
      },
      {
        title: '2. Resistance Band & Door Anchor Home Gym',
        description:
          'Compact band slices: "15 Banded Rows", "12 Overhead Band Presses", "15 Banded Chest Flies", "20 Banded Clamshells", "15 Bicep Curls", "15 Tricep Pressdowns".',
        benefit: 'Adds pulling and shoulder hypertrophy to home routines using a single $15 resistance band.'
      },
      {
        title: '3. Hotel Room Business Travel Routine',
        description:
          'No-floor-touching travel slices (when hotel carpet feels sketchy): "20 Bulgarian Split Squats (Foot on Bed)", "15 Incline Bed/Desk Push-Ups", "60-Sec Wall Sit", "20 Standing Calf Raises", "30 Standing Bicycle Crunches".',
        benefit: 'Keeps you fit on the road without ever lying down on hotel room carpet.'
      }
    ],
    uniqueExamples: [
      'Silent Apartment Strength List (8 Slices): 12 Slow 3-Second Tempo Push-Ups, 20 Pause Bodyweight Squats, 60-Second Forearm Plank, 15 Single-Leg Glute Bridges, 16 Alternating Reverse Lunges, 45-Second Isometric Wall Sit, 20 Dead Bug Core Reps, 15 Chair Tricep Dips.'
    ],
    tips: [
      'Replace explosive jumping power with a 3-second eccentric pause at the bottom of every squat and push-up—your muscles will burn twice as hard with zero floor noise.',
      'Use the Hotel Stand-Only preset above whenever you want a great sweat without lying on a floor.'
    ],
    uniqueContentBlocks: [
      {
        heading: 'How to Build Real Strength at Home Without Heavy Weights or Noise',
        body: [
          'The biggest mistake in home workouts is assuming you need high-impact jumping to get an effective session. By switching to unilateral (single-leg) movements like Bulgarian split squats, single-leg glute bridges, and slow-tempo push-ups on the Home Workout Wheel, you double the load on each working muscle while keeping floor noise at zero decibels.'
        ]
      }
    ],
    faqs: [
      {
        question: 'Can I remove jumping exercises for an upstairs apartment?',
        answer:
          'Yes! Use our Quiet Upstairs Apartment preset or delete any plyometric jump slice in the sidebar so your entire routine is 100% silent and neighbor-friendly.'
      },
      {
        question: 'How is the Home Workout Wheel different from the main Workout Wheel?',
        answer:
          'The Home Workout Wheel focuses on zero-equipment, small-space, and low-noise apartment movements, whereas the main Workout Wheel (/workout-wheel) includes high-intensity gym intervals, sprints, and equipment-based EMOMs.'
      },
      {
        question: 'How much space do I need for the Home Workout Wheel?',
        answer:
          'Every default exercise on the Home Workout Wheel can be performed inside a standard 6-foot by 3-foot yoga mat footprint.'
      }
    ]
  },

  'date-night-wheel': {
    title: 'Date Night Wheel – Romantic At-Home & Outing Ideas',
    h1: 'Date Night Wheel: Spontaneous Couple Activities & Romantic Ideas',
    metaDescription:
      'Break out of the "dinner and scrolling phones" rut. Spin the Date Night Wheel for budget at-home dates, adventurous local outings, and couple challenges.',
    introduction:
      'After a busy workweek, most couples want quality time together but lack the mental bandwidth to plan something creative—defaulting to ordering the same takeout on the couch. The Date Night Wheel injects immediate novelty into Friday and Saturday nights with curated ideas spanning cozy $0 living-room dates, local foodie adventures, and nostalgic novelty outings.',
    instructions: [
      'Agree on tonight’s budget and energy level before spinning (Cozy Stay-In vs. Out on the Town).',
      'Have each partner add 2 secret dream dates to the wheel alongside 4 classic favorites.',
      'Make a pact to honor the very first spin—or give each partner one single Veto token for the evening.',
      'Pair with our Dinner Wheel (/dinner-wheel) and Movie Wheel (/movie-wheel) for a 3-spin full evening itinerary.'
    ],
    useCases: [
      {
        title: '1. Zero-Budget Cozy Stay-At-Home Date Night (Babysitter-Free)',
        description:
          'Slices after the kids are asleep: "Living Room Blanket Fort & Classic Movie", "Blind Wine/Chocolate Tasting Flight", "Cook a 3-Course Pasta Recipe Together", "2-Player Board Game Championship", "At-Home Spa & Massage Swap", "Sunset Balcony Mocktails & Music".',
        benefit: 'Turns a stay-at-home evening into an intentional event without spending on a sitter.'
      },
      {
        title: '2. Under-$40 Local Adventure & Novelty Outing',
        description:
          'Out-of-the-house slices: "Arcade & Pinball Bar Showdown", "Progressive Dinner (Apps, Mains, Dessert at 3 Spots)", "Late-Night Bookstore + Coffee Date", "Mini Golf or Bowling Loser-Buys-Ice-Cream", "Botanical Garden or Museum Evening Walk", "Food Truck Park Tasting".',
        benefit: 'Creates memorable shared experiences for less than a standard restaurant bill.'
      },
      {
        title: '3. The "3-Wheel Combo" Full Evening Generator',
        description:
          'Spin 1: Cuisine on the Dinner Wheel (/dinner-wheel). Spin 2: Activity on the Date Night Wheel. Spin 3: Film on the Movie Wheel (/movie-wheel).',
        benefit: 'Plans an entire 4-hour Friday date night from start to finish in 30 seconds.'
      }
    ],
    uniqueExamples: [
      'Balanced 8-Slice Date Night Deck: Homemade Pizza & Cocktail Lab, Sunset Picnic at a Scenic Overlook, Retro Arcade & Ice Cream Run, Bookstore Pick-For-Each-Other Challenge, Comedy Club or Live Local Music, Tapas & Dessert Crawl, Stargazing with Thermos Hot Cocoa, Board Game Café Showdown.'
    ],
    tips: [
      'Use the "Secret Wildcard Slice": let each partner type one surprise date onto the wheel without explaining the details until it lands.',
      'Turn on Elimination mode across the month so you try 4 completely different date nights every four weeks instead of repeating the same restaurant.'
    ],
    uniqueContentBlocks: [
      {
        heading: 'Why Novelty Spins Strengthen Relationships Better Than Routine Dinner Dates',
        body: [
          'Relationship researchers studying the "self-expansion model" have found that couples experience a measurable spike in relationship satisfaction when they share novel, slightly unpredictable activities rather than repeating familiar routines. Spinning the Date Night Wheel removes planning friction while nudging both partners out of their default Friday habits.'
        ]
      }
    ],
    faqs: [
      {
        question: 'Can we customize the Date Night Wheel for a stay-at-home or rainy night?',
        answer:
          'Yes! Use our Cozy Stay-At-Home list above or edit the slices in the sidebar to include only indoor activities like homemade pizza challenges, board games, and movie marathons.'
      },
      {
        question: 'How do we prevent one partner from vetoing every spin?',
        answer:
          'Before spinning, let both partners review the 6 to 8 slices on the wheel and remove any genuine non-starters. Once the wheel is approved, each person gets at most one Veto token.'
      },
      {
        question: 'Can we save our monthly bucket-list dates on the wheel?',
        answer:
          'Yes. Your custom date list persists in local browser storage, so you can load 12 bucket-list dates at the start of the season and eliminate one every weekend.'
      }
    ]
  },

  'task-selector': {
    title: 'Task Selector Wheel – ADHD & Pomodoro To-Do Prioritizer',
    h1: 'Task Selector Wheel: Overcome To-Do List Overwhelm & Start Working',
    metaDescription:
      'Stuck staring at 15 equally urgent tasks? Spin the Task Selector Wheel to pick your next 25-minute Pomodoro sprint and break procrastination instantly.',
    introduction:
      'When five tasks on your to-do list all carry equal priority, your brain wastes more energy debating which one to tackle first than it takes to actually complete one. The Task Selector Wheel acts as an external executive-function starter: paste your top 5 deliverables, spin once, and commit to a single 25-minute Pomodoro block on whichever slice wins.',
    instructions: [
      'Paste only 4 to 7 actionable, ready-to-start tasks onto the Task Selector Wheel (break huge projects into 25-minute sub-steps first).',
      'Turn on Elimination mode so finished tasks are cleared off your board with a burst of confetti.',
      'Spin the wheel and start a 25-minute timer within 10 seconds—no second-guessing allowed.',
      'When the timer rings, remove the completed slice and spin for your next sprint.'
    ],
    useCases: [
      {
        title: '1. Morning Email & Admin Inbox Zero Sprint',
        description:
          'Clear dreaded admin tasks: "Reply to 3 Client Emails", "Submit Expense Receipts", "Update Jira/Asana Tickets", "Review Pull Request", "Schedule Dentist/Doctor Appointment", "Clean Desktop Downloads Folder".',
        benefit: 'Turns boring administrative backlog into a rapid-fire game.'
      },
      {
        title: '2. Student Exam Study & Homework Block Selector',
        description:
          'Rotate study subjects: "25-Min Biology Flashcards", "Solve 5 Calculus Practice Problems", "Outline History Essay Intro", "Review Spanish Vocab Deck", "Read 15 Pages of Literature Chapter".',
        benefit: 'Prevents students from procrastinating by interleaved subject switching.'
      },
      {
        title: '3. Freelancer & Creator Backlog Crusher',
        description:
          'Balance creative tasks: "Draft Newsletter Hook", "Edit 60-Sec Video Clip", "Send 2 Pitch Outreach Emails", "Update Portfolio Case Study", "Invoice Completed Project".',
        benefit: 'Ensures marketing, billing, and creative work all get done across the week.'
      }
    ],
    uniqueExamples: [
      'The 25-Minute Rule: Never put "Write Annual Report" on a slice; put "Draft Outline & First 200 Words of Report" so every spin is 100% achievable in one sitting.'
    ],
    tips: [
      'Assign 2x or 3x weight to high-deadline tasks so they are statistically more likely to be drawn early in the morning while your focus is sharpest.',
      'Add one "10-Minute Walk & Coffee Break" slice so your Pomodoro sprints include built-in recovery.'
    ],
    uniqueContentBlocks: [
      {
        heading: 'How Random Task Selection Defeats Procrastination & Analysis Paralysis',
        body: [
          'Procrastination is rarely laziness; cognitive psychologists define it as emotional friction triggered by ambiguity and choice overload. When you force yourself to reduce a sprawling backlog into six concrete 25-minute slices on the Task Selector Wheel, the spin makes the starting decision for you—preserving your prefrontal cortex energy for deep work.'
        ]
      }
    ],
    faqs: [
      {
        question: 'Should I use a random wheel when some tasks are more urgent than others?',
        answer:
          'Only put tasks from the SAME priority tier on the wheel at once (for example, your Top 5 tasks due today), OR use the Weight slider to give urgent deadlines a 3x higher probability of landing first.'
      },
      {
        question: 'How does the Task Selector Wheel help with ADHD task initiation?',
        answer:
          'People with ADHD often experience paralysis when choosing between multiple unappealing or equally interesting tasks. The visual spin, audio click track, and winner confetti create an immediate dopamine cue that bridges the gap between planning and starting.'
      },
      {
        question: 'How is the Task Selector different from the Chore Picker Wheel?',
        answer:
          'The Task Selector Wheel is built for solo deep work, Pomodoro study blocks, and professional to-do lists, while the Chore Picker Wheel (/chore-picker) is designed for household cleaning and multi-person family/roommate task drafts.'
      }
    ]
  }
};

