export interface QuantityPreset {
  count: number;
  label: string;
  sublabel: string;
  dropLowest?: number;
  keepHighest?: number;
  modifier?: number;
}

export interface DiePageFaq {
  question: string;
  answer: string;
}

export interface NotationGuideItem {
  notation: string;
  count: number;
  min: number;
  max: number;
  expected: number;
  meaning: string;
}

export interface CommonUseItem {
  title: string;
  desc: string;
}

export interface DiePageConfig {
  sides: number;
  dieType: string;
  name: string;
  shape: string;
  expectedValue: number;
  minResult: number;
  maxResult: number;
  possibleOutcomes: number[];
  arithmeticFormula: string;
  arithmeticSteps: string[];
  h1Title?: string;
  metaTitle: string;
  metaDescription: string;
  primaryKeywords: string[];
  introParagraphs: string[];
  howToUse: string[];
  whatIsDescription: string;
  notationGuide: NotationGuideItem[];
  quantityPresets: QuantityPreset[];
  commonUses: CommonUseItem[];
  standardDeviationFormula?: string;
  standardDeviationValue?: number;
  varianceValue?: number;
  probabilityPerOutcome?: string;
  faqs?: DiePageFaq[];
  defaultCount?: number;
}

export const DIE_PAGE_CONFIGS: Record<string, DiePageConfig> = {
  d2: {
    sides: 2,
    dieType: 'd2',
    name: '2-Sided Coin / D2',
    shape: 'Two-Sided Coin',
    expectedValue: 1.5,
    minResult: 1,
    maxResult: 2,
    possibleOutcomes: [1, 2],
    arithmeticFormula: '(1 + 2) / 2 = 3 / 2 = 1.5',
    arithmeticSteps: [
      'A fair 2-sided die has 2 equal outcomes: 1 and 2.',
      'Add the minimum and maximum possible values: 1 + 2 = 3.',
      'Divide the sum by the 2 sides: 3 ÷ 2 = 1.5.',
      'The expected average value over time is exactly 1.5.'
    ],
    h1Title: 'Roll D2 Online - 3D Dice Roller',
    metaTitle: 'Roll a D2 Online (Free Realistic 3D Two-Sided Dice Roller & Coin Toss)',
    metaDescription: 'Roll a D2 online with realistic 3D rolling. Free 2-sided virtual dice roller and coin toss for quick 50/50 decisions, tabletop rulings, and games.',
    primaryKeywords: ['roll a d2', 'd2 roller', '2 sided dice', 'roll 1d2', 'two sided die', 'virtual d2', 'coin flip online'],
    introParagraphs: [
      'Welcome to the SpinWheelGames 3D D2 Roller. Whether you are making a quick 50/50 decision, flipping for the first turn in a board game, or making a quick ruling in your tabletop game, this virtual two-sided die gives you instant, smooth rolling directly in your browser.',
      'A standard D2 has two equal outcomes: 1 and 2 (often used for Heads and Tails). Our interactive roller renders a lifelike 3D coin that spins, flips, bounces, and settles naturally on the table.',
      'Pick how many dice you want to roll, add bonuses or penalties, examine the 3D coin from any angle, or turn roll sound on and off with a single click.'
    ],
    howToUse: [
      'Click the large "Roll D2" button or press Spacebar on your keyboard to roll.',
      'Use the Quantity buttons or slider to roll multiple D2s at once (like 2d2, 3d2, or 5d2).',
      'Choose a preset to quickly test decision formats like "Best of 3" or "Majority Vote".',
      'Click "360° Inspect" to rotate and look around the 3D coin to see both sides clearly.',
      'Check your total score, average, and each individual coin face in real time.'
    ],
    whatIsDescription: `A D2 is a two-sided random choice maker. In real life, it is usually a round coin or a two-sided cylinder. In tabletop roleplaying games and board games, a D2 is used whenever you need a fair 50/50 decision, giving each of the two sides an equal chance of landing face up. In gaming shorthand, rolling one two-sided die is written as 1d2.`,
    notationGuide: [
      { notation: '1d2', count: 1, min: 1, max: 2, expected: 1.5, meaning: 'One 2-sided die roll (gives a 1 or 2 result).' },
      { notation: '2d2', count: 2, min: 2, max: 4, expected: 3.0, meaning: 'Two D2 dice rolled together (total from 2 to 4).' },
      { notation: '3d2', count: 3, min: 3, max: 6, expected: 4.5, meaning: 'Three D2 dice (great for best-of-three tiebreakers).' },
      { notation: '5d2', count: 5, min: 5, max: 10, expected: 7.5, meaning: 'Five D2 dice (used for majority votes and group decisions).' }
    ],
    quantityPresets: [
      { count: 1, label: '1d2', sublabel: 'Single Coin Flip / 50-50' },
      { count: 2, label: '2d2', sublabel: '2 Flips (Sum 2–4)' },
      { count: 3, label: '3d2', sublabel: 'Best of 3 Tiebreaker' },
      { count: 5, label: '5d2', sublabel: 'Majority Vote' },
      { count: 10, label: '10d2', sublabel: '10-Coin Toss Trial' }
    ],
    commonUses: [
      {
        title: '50/50 Tabletop Rulings',
        desc: 'Quickly decide sudden weather changes, which way a hallway turns, or random NPC reactions during game sessions.'
      },
      {
        title: 'Initiative & Turn Order Tiebreakers',
        desc: 'Fairly decide who takes their turn first whenever two players roll the exact same score.'
      },
      {
        title: 'Simple Classroom Probability',
        desc: 'Great for math classes and students learning coin-flip probabilities and averages with hands-on rolling.'
      }
    ],
    faqs: [
      {
        question: 'What is a D2 dice?',
        answer: 'A D2 is a two-sided die or coin used to give an equal 50% chance for two outcomes: 1 or 2.'
      },
      {
        question: 'What is the average roll of a D2?',
        answer: 'The average of a fair D2 is (1 + 2) ÷ 2 = 1.5. If you roll many times, the average of all your rolls will be very close to 1.5.'
      },
      {
        question: 'How do you roll a D2 with a standard 6-sided die?',
        answer: 'You can roll any standard D6 and count Odd numbers (1, 3, 5) as 1, and Even numbers (2, 4, 6) as 2.'
      },
      {
        question: 'How does this online 3D D2 roll work?',
        answer: 'When you click roll, our system generates a fair random outcome, animates the 3D coin tossing and spinning realistically, and reads the winning face as soon as it lands flat.'
      },
      {
        question: 'What is the difference between 1d2 and flipping a coin?',
        answer: 'Mathematically, 1d2 and a fair coin toss are the same. A D2 numbers the sides 1 and 2, while a coin calls them Heads and Tails.'
      }
    ]
  },

  d4: {
    sides: 4,
    dieType: 'd4',
    name: '4-Sided Pyramid Die (D4)',
    shape: 'Four-Sided Pyramid (Tetrahedron)',
    expectedValue: 2.5,
    minResult: 1,
    maxResult: 4,
    possibleOutcomes: [1, 2, 3, 4],
    arithmeticFormula: '(1 + 2 + 3 + 4) / 4 = 10 / 4 = 2.5',
    arithmeticSteps: [
      'A fair 4-sided pyramid die has 4 triangle faces numbered 1 through 4.',
      'Add the minimum and maximum possible values: 1 + 4 = 5 (or add all faces: 1 + 2 + 3 + 4 = 10).',
      'Divide the sum of all faces by 4: 10 ÷ 4 = 2.5.',
      'The expected average value for a single D4 roll is 2.5.'
    ],
    h1Title: 'Roll D4 Online - 3D Dice Roller',
    metaTitle: 'Roll a D4 Online (Free Realistic 3D Four-Sided Dice Roller)',
    metaDescription: 'Roll 1d4, 2d4, 3d4, 4d4, or 5d4 online with realistic 3D rolling. Free four-sided virtual dice roller for D&D Magic Missile, healing potions, and weapon damage.',
    primaryKeywords: ['roll a d4', 'd4 roller', 'roll 1d4', 'four sided dice roller', 'd4 roll', 'virtual d4', 'roll 4 sided dice'],
    introParagraphs: [
      'Welcome to the SpinWheelGames 3D D4 Roller. The four-sided die (D4) is shaped like a small triangle pyramid and is famous in fantasy tabletop games for small weapons, basic spells, and standard healing potions.',
      'Because real physical D4s have sharp points that tend to slide rather than roll across tables, our online 3D roller gives you satisfying, lifelike tumbling and clear top-number reading every time.',
      'Roll a single dagger strike, cast a 3d4 Magic Missile volley, or calculate a 2d4+2 healing potion recovery with smooth 3D animations and live math summaries.'
    ],
    howToUse: [
      'Click "Roll D4" or hit Spacebar to start rolling.',
      'Change the number of dice to roll multiple D4s at the same time.',
      'Select convenient gaming presets like "Magic Missile (3d4+3)" or "Healing Potion (2d4+2)".',
      'Open "360° Inspect" to rotate the 3D pyramid model and see all numbers clearly.',
      'Read your total score, average, and individual face numbers instantly.'
    ],
    whatIsDescription: `A D4 is a four-sided die shaped like a regular pyramid with four triangular faces. In tabletop RPGs like Dungeons & Dragons, it is rolled for light weapon attacks (such as daggers, darts, and clubs) and low-level spells. Because it lands on a flat base with a pointed top, the rolled number is read at the upward-facing point.`,
    notationGuide: [
      { notation: '1d4', count: 1, min: 1, max: 4, expected: 2.5, meaning: 'One 4-sided die (Dagger attack or light damage).' },
      { notation: '2d4 + 2', count: 2, min: 4, max: 10, expected: 7.0, meaning: 'Standard Potion of Healing recovery.' },
      { notation: '3d4 + 3', count: 3, min: 6, max: 15, expected: 10.5, meaning: 'Level 1 Magic Missile spell damage.' },
      { notation: '4d4 + 4', count: 4, min: 8, max: 20, expected: 14.0, meaning: 'Greater Healing Potion recovery.' }
    ],
    quantityPresets: [
      { count: 1, label: '1d4', sublabel: 'Dagger / Dart Attack' },
      { count: 2, label: '2d4 + 2', sublabel: 'Potion of Healing (Avg 7.0)' },
      { count: 3, label: '3d4 + 3', sublabel: 'Magic Missile Spell' },
      { count: 4, label: '4d4 + 4', sublabel: 'Potion of Greater Healing' },
      { count: 5, label: '5d4', sublabel: '5-Dart Barrage' }
    ],
    commonUses: [
      {
        title: 'Magic Missile Spell Damage',
        desc: 'Wizard characters roll 1d4 + 1 force damage per dart when casting the classic Magic Missile spell.'
      },
      {
        title: 'Potions of Healing',
        desc: 'A standard healing potion restores 2d4 + 2 hit points, while greater healing potions restore 4d4 + 4.'
      },
      {
        title: 'Daggers & Light Weapons',
        desc: 'Daggers, darts, slings, and small clubs use 1d4 for base damage in standard tabletop roleplaying games.'
      }
    ],
    faqs: [
      {
        question: 'What is a D4 dice?',
        answer: 'A D4 is a four-sided die shaped like a triangular pyramid with faces numbered 1 through 4.'
      },
      {
        question: 'What is the average roll on a D4?',
        answer: 'The average roll on a single D4 is 2.5. For a standard healing potion (2d4 + 2), the expected healing is (2 × 2.5) + 2 = 7 hit points.'
      },
      {
        question: 'How do you read a real D4 die?',
        answer: 'Physical D4 dice show the rolled number at the top upward point of the pyramid faces when the die rests on the table.'
      },
      {
        question: 'How does the online 3D D4 roller work?',
        answer: 'Our roller uses fair random number generation, animates the 3D pyramid rolling and bouncing smoothly, and automatically displays the top point value.'
      },
      {
        question: 'What does 3d4+3 mean in D&D?',
        answer: 'It means roll three 4-sided dice, add their rolled numbers together, and then add 3 to the total score.'
      }
    ]
  },

  d6: {
    sides: 6,
    dieType: 'd6',
    name: '6-Sided Cube Die (D6)',
    shape: 'Six-Sided Cube',
    expectedValue: 3.5,
    minResult: 1,
    maxResult: 6,
    possibleOutcomes: [1, 2, 3, 4, 5, 6],
    arithmeticFormula: '(1 + 2 + 3 + 4 + 5 + 6) / 6 = 21 / 6 = 3.5',
    arithmeticSteps: [
      'A fair 6-sided cubic die has six faces numbered 1 through 6.',
      'Add the minimum and maximum values: 1 + 6 = 7 (or sum all 6 faces: 1 + 2 + 3 + 4 + 5 + 6 = 21).',
      'Divide the sum by 6: 21 ÷ 6 = 3.5.',
      'The average outcome over many rolls is always 3.5.'
    ],
    h1Title: 'Roll D6 Online - 3D Dice Roller',
    metaTitle: 'Roll a D6 Online (Free Realistic 3D Six-Sided Dice Roller | 1d6 to 100d6)',
    metaDescription: 'Roll a D6 online with realistic 3D rolling. Free six-sided virtual dice roller for board games, Yahtzee, D&D Fireball (8d6), Greatsword (2d6), and dice averages.',
    primaryKeywords: ['roll a d6', 'd6 roller', 'why is the average of a d6 3.5', 'roll 1d6', 'six sided die', 'roll 3d6', 'roll 5d6', 'virtual d6', 'roll 6 sided dice'],
    introParagraphs: [
      'Welcome to the SpinWheelGames 3D D6 Roller. The 6-sided die (D6) is the most popular, timeless dice in the world, found in classic board games like Monopoly and Yahtzee, tabletop strategy games, and fantasy roleplaying games.',
      'Whether you need to roll two dice for a board game move, roll 8d6 for a massive Fireball spell, or roll multiple dice pools for tabletop wargames, our 3D roller provides smooth rolling, natural bounces, and instant calculations.',
      'Pick any number of dice from 1 to 100, add custom modifiers, explore dice probability tables, and enjoy realistic rolling sounds right in your web browser.'
    ],
    howToUse: [
      'Click "Roll D6" or hit Spacebar to roll the dice.',
      'Adjust the dice slider or buttons to roll any amount (like 2d6, 3d6, 4d6, 6d6, or 8d6).',
      'Select quick presets like "Fireball Spell (8d6)" or "Greatsword (2d6)" for instant gameplay rolling.',
      'Use "360° Inspect" to view the 3D cube model and check each face clearly.',
      'See your total sum, average score, and each die value updated in real time.'
    ],
    whatIsDescription: `A D6 is a six-sided cube die with faces numbered from 1 to 6. On standard dice, opposite sides always add up to 7 (1 opposes 6, 2 opposes 5, and 3 opposes 4). In tabletop roleplaying games, rolling one six-sided die is written as 1d6, while rolling two is written as 2d6.`,
    notationGuide: [
      { notation: '1d6', count: 1, min: 1, max: 6, expected: 3.5, meaning: 'One 6-sided die (Shortsword, Hand Crossbow, or board game roll).' },
      { notation: '2d6', count: 2, min: 2, max: 12, expected: 7.0, meaning: 'Two D6 dice (Monopoly movement, Greatsword weapon attack).' },
      { notation: '3d6', count: 3, min: 3, max: 18, expected: 10.5, meaning: 'Three D6 dice (Classic tabletop character ability score roll).' },
      { notation: '4d6 dl 1', count: 4, min: 3, max: 18, expected: 12.24, meaning: 'Roll 4d6 and drop the lowest die (Standard D&D stat creation).' },
      { notation: '8d6', count: 8, min: 8, max: 48, expected: 28.0, meaning: 'Eight D6 dice (Iconic Fireball spell damage).' }
    ],
    quantityPresets: [
      { count: 1, label: '1d6', sublabel: 'Single Die (Avg 3.5)' },
      { count: 2, label: '2d6', sublabel: 'Greatsword / Board Game (Avg 7.0)' },
      { count: 3, label: '3d6', sublabel: 'Classic Character Stat (Avg 10.5)' },
      { count: 4, label: '4d6 dl 1', sublabel: 'D&D Stat (Drop Lowest)', dropLowest: 1 },
      { count: 6, label: '6d6', sublabel: 'High-Level Spell Burst' },
      { count: 8, label: '8d6', sublabel: 'Fireball Spell (Avg 28.0)' },
      { count: 10, label: '10d6', sublabel: 'Massive Dice Pool' },
      { count: 20, label: '20d6', sublabel: 'Maximum Fall Damage (Avg 70.0)' }
    ],
    commonUses: [
      {
        title: 'Classic Board Games & Family Games',
        desc: 'Essential for playing Monopoly, Yahtzee, Risk, Catan, Backgammon, Craps, and Farkle.'
      },
      {
        title: 'Fireball & Lightning Spell Damage',
        desc: 'The iconic Fireball spell deals 8d6 fire damage, averaging an expected 28 damage on a direct hit.'
      },
      {
        title: 'Two-Handed Heavy Weapons (Greatsword & Maul)',
        desc: 'Martial heavy weapons deal 2d6 damage, providing reliable, consistent damage centered around an average of 7.'
      },
      {
        title: 'Tabletop Wargames & Armies',
        desc: 'Used in mass army combat games to resolve shooting volleys, melee combat rounds, and armor saves.'
      }
    ],
    faqs: [
      {
        question: 'Why is the average of a D6 3.5?',
        answer: 'The average is 3.5 because adding all 6 face values (1 + 2 + 3 + 4 + 5 + 6) equals 21. When you divide 21 by 6, you get exactly 3.5. Over many rolls, the average of all results will balance out to 3.5.'
      },
      {
        question: 'What is the average damage of an 8d6 Fireball spell?',
        answer: 'An 8d6 Fireball deals an average of 8 × 3.5 = 28 fire damage on a failed save (or 14 damage on a successful save).'
      },
      {
        question: 'Why is 2d6 more consistent than 1d12?',
        answer: '2d6 produces a bell-shaped curve where middle scores like 6, 7, and 8 appear much more frequently, and the minimum roll is 2. A 1d12 has an equal chance for every number from 1 to 12.'
      },
      {
        question: 'How do you roll 4d6 drop the lowest die for stats?',
        answer: 'You roll four 6-sided dice, eliminate the single lowest number, and add the remaining three dice together. This raises the average stat score from 10.5 to 12.24.'
      },
      {
        question: 'How does this online 3D D6 roller work?',
        answer: 'Our roller uses fair random number generation to pick the outcome, animates the 3D dice rolling, bouncing, and tumbling across the tray, and automatically reads the upward-facing numbers.'
      }
    ]
  },

  '4d6': {
    sides: 6,
    dieType: '4d6',
    name: '4D6 Dice Roller (Four 6-Sided Dice)',
    shape: 'Four 6-Sided Cubes',
    expectedValue: 14.0,
    minResult: 4,
    maxResult: 24,
    possibleOutcomes: Array.from({ length: 21 }, (_, i) => i + 4),
    arithmeticFormula: '4 × ((1 + 6) / 2) = 4 × 3.5 = 14',
    arithmeticSteps: [
      'Each 6-sided die has an expected average of 3.5.',
      'Multiply the single die average by the 4 dice: 4 × 3.5 = 14.',
      'The minimum possible total is 4 (all 1s), and the maximum is 24 (all 6s).',
      'The expected average total for rolling 4d6 straight is exactly 14.'
    ],
    h1Title: 'Roll 4 D6 Online - 3D Multi-Dice Roller',
    metaTitle: 'Roll 4d6 Online (Free Realistic 3D Four 6-Sided Dice Roller)',
    metaDescription: 'Roll 4d6 online with realistic 3D rolling. Track individual dice results, roll 4d6 drop lowest for D&D ability stats, and view probability averages.',
    primaryKeywords: ['roll 4d6', '4d6 roll', '4d6 roller', '4d6 dice', '4d6 average', 'virtual 4d6', 'roll four d6'],
    introParagraphs: [
      'Welcome to the dedicated SpinWheelGames 4D6 Roller. Rolling four 6-sided dice (4d6) is one of the most common dice rolls in tabletop gaming—used for character ability score generation in D&D, powerful spell strikes, and tabletop board game checks.',
      'Our interactive 4D6 roller throws four 3D dice across the tray with lifelike tumbling, bouncing, and collision sound. You can see each die result clearly and track the combined sum and average in real time.',
      'Need to create a new fantasy character? Switch on the "Drop Lowest" option to automatically discard the lowest die and sum the highest three, exactly as specified in official 5e rules.'
    ],
    howToUse: [
      'Click "Roll 4D6" or tap Spacebar to roll all four dice together.',
      'Toggle "Drop Lowest" to discard the single lowest die and sum the top 3 (average 12.24).',
      'Add custom bonuses or penalties using the flat modifier buttons.',
      'Inspect any individual 3D die using the "360° Inspect" viewer.',
      'Review your roll breakdown and track your recent roll results.'
    ],
    whatIsDescription: `4D6 represents rolling four individual six-sided dice at once. The total sum can range from a minimum of 4 (four 1s) to a maximum of 24 (four 6s). When all four dice are summed, the expected average total is 14. In tabletop roleplaying games, 4d6 is famously used in the "4d6 drop lowest" method to generate balanced character ability scores.`,
    notationGuide: [
      { notation: '4d6 (Straight)', count: 4, min: 4, max: 24, expected: 14.0, meaning: 'Sum of all four 6-sided dice (ranges from 4 to 24).' },
      { notation: '4d6 dl 1 (Drop Lowest)', count: 4, min: 3, max: 18, expected: 12.24, meaning: 'Roll 4 dice, discard lowest 1, sum top 3 (D&D stat creation).' },
      { notation: '4d6 + 4', count: 4, min: 8, max: 28, expected: 18.0, meaning: 'Four D6 dice with a +4 flat modifier added.' }
    ],
    quantityPresets: [
      { count: 4, label: '4d6 (Standard)', sublabel: 'Sum all 4 dice (Avg 14.0)' },
      { count: 4, label: '4d6 Drop Lowest', sublabel: 'D&D 5e Character Stat (Avg 12.24)', dropLowest: 1 },
      { count: 4, label: '4d6 + 2', sublabel: 'Damage with modifier' },
      { count: 4, label: '4d6 Keep Highest', sublabel: 'Best single die result', keepHighest: 1 }
    ],
    commonUses: [
      {
        title: 'D&D Ability Score Generation',
        desc: 'The standard method for rolling character stats: roll 4d6, discard the lowest single die, and record the sum of the best three.'
      },
      {
        title: 'Multi-Target Spell Damage',
        desc: 'Spells such as Ice Storm and Scorching Ray volleys frequently roll pools of 4d6 elemental damage.'
      },
      {
        title: 'Board Game Dice Rolls',
        desc: 'Games like Risk, King of Tokyo, and tabletop wargames where four or more dice are rolled together in combat rounds.'
      }
    ],
    faqs: [
      {
        question: 'What is the average roll of 4d6?',
        answer: 'The average of rolling four standard 6-sided dice is 4 × 3.5 = 14. The total score will range from 4 to 24.'
      },
      {
        question: 'What is the average of 4d6 drop lowest?',
        answer: 'When you roll 4d6 and discard the single lowest die, the expected average of the top three dice is 12.24 (compared to 10.5 for straight 3d6).'
      },
      {
        question: 'What are the odds of rolling an 18 on 4d6 drop lowest?',
        answer: 'The probability of rolling a perfect 18 (at least three 6s on four dice) is 21 out of 1,296 combinations, which is approximately 1.62%.'
      },
      {
        question: 'How does this 3D 4D6 roller work online?',
        answer: 'Our simulator generates fair random values for all four dice, animates them rolling and colliding realistically in 3D, and displays the individual and total scores immediately.'
      }
    ]
  },

  d8: {
    sides: 8,
    dieType: 'd8',
    name: '8-Sided Diamond Die (D8)',
    shape: 'Eight-Sided Octahedron',
    expectedValue: 4.5,
    minResult: 1,
    maxResult: 8,
    possibleOutcomes: [1, 2, 3, 4, 5, 6, 7, 8],
    arithmeticFormula: '(1 + 2 + 3 + 4 + 5 + 6 + 7 + 8) / 8 = 36 / 8 = 4.5',
    arithmeticSteps: [
      'A fair 8-sided octahedron die has 8 triangle faces numbered 1 through 8.',
      'Add the minimum and maximum values: 1 + 8 = 9 (or sum all 8 faces: 1 + ... + 8 = 36).',
      'Divide the sum by 8: 36 ÷ 8 = 4.5.',
      'The expected average result for a single D8 roll is 4.5.'
    ],
    h1Title: 'Roll D8 Online - 3D Dice Roller',
    metaTitle: 'Roll a D8 Online (Free Realistic 3D Eight-Sided Dice Roller)',
    metaDescription: 'Roll a D8, 2d8, 4d8, or 8d8 online with realistic 3D rolling. Free 8-sided virtual dice roller for D&D Divine Smite, Longsword, Rapier, and Cure Wounds.',
    primaryKeywords: ['roll a d8', 'd8 roller', 'roll 1d8', 'eight sided die', 'roll 2d8', 'roll 8d8', 'd8 roll', 'virtual d8'],
    introParagraphs: [
      'Welcome to the SpinWheelGames 3D D8 Roller. The 8-sided die (D8) is shaped like two pyramids joined at their bases, creating a classic diamond silhouette. It is one of the most widely used dice in fantasy tabletop games.',
      'In tabletop roleplaying games like D&D and Pathfinder, the D8 is the standard damage die for popular one-handed weapons (like Longswords, Rapiers, and Warhammers), the foundation for Cleric healing spells, and the core die for Paladin Divine Smite attacks.',
      'Roll a single weapon strike, trigger explosive 2d8–8d8 radiant damage, or roll Hit Dice for leveling up with smooth 3D rolling and clear visual feedback.'
    ],
    howToUse: [
      'Click "Roll D8" or hit Spacebar to start rolling.',
      'Select any number of dice to roll multiple D8s (like 2d8, 3d8, 4d8, or 8d8).',
      'Choose presets like "Level 1 Divine Smite (2d8)" or "Cure Wounds (1d8+3)" for quick in-game rolls.',
      'Open "360° Inspect" to rotate the 3D model and look at every face.',
      'Check your active total, average roll, and individual dice faces instantly.'
    ],
    whatIsDescription: `A D8 is an eight-sided die with eight triangular faces forming a regular octahedron. In fantasy tabletop games, the D8 is the primary damage die for versatile and finesse weapons, and serves as the class Hit Die for Clerics, Rogues, Bards, Druids, Monks, and Warlocks.`,
    notationGuide: [
      { notation: '1d8', count: 1, min: 1, max: 8, expected: 4.5, meaning: 'One 8-sided die (Longsword, Rapier, or 1st-level Cure Wounds).' },
      { notation: '2d8', count: 2, min: 2, max: 16, expected: 9.0, meaning: 'Two D8 dice (1st-level Paladin Divine Smite damage).' },
      { notation: '3d8', count: 3, min: 3, max: 24, expected: 13.5, meaning: 'Three D8 dice (2nd-level Divine Smite or spell damage).' },
      { notation: '4d8', count: 4, min: 4, max: 32, expected: 18.0, meaning: 'Four D8 dice (Guiding Bolt spell or 3rd-level Smite).' },
      { notation: '8d8', count: 8, min: 8, max: 64, expected: 36.0, meaning: 'Eight D8 dice (Max-level Divine Smite vs undead/fiend).' }
    ],
    quantityPresets: [
      { count: 1, label: '1d8', sublabel: 'Longsword / Rapier (Avg 4.5)' },
      { count: 2, label: '2d8', sublabel: '1st Level Divine Smite (Avg 9.0)' },
      { count: 3, label: '3d8', sublabel: '2nd Level Divine Smite' },
      { count: 4, label: '4d8', sublabel: 'Guiding Bolt Spell (Avg 18.0)' },
      { count: 8, label: '8d8', sublabel: 'Max Divine Smite vs Fiend' }
    ],
    commonUses: [
      {
        title: 'Paladin Divine Smite Damage',
        desc: 'Paladins roll 2d8 radiant damage for a 1st-level slot, scaling up to 5d8 (plus an extra 1d8 against fiends and undead).'
      },
      {
        title: 'Versatile Longswords & Rapiers',
        desc: 'The staple weapon for knights, rogues, and warriors deals 1d8 slashing or piercing damage in standard rules.'
      },
      {
        title: 'Cleric, Rogue & Bard Hit Die',
        desc: 'Used as the class Hit Die to determine maximum health points gained when leveling up and healing on short rests.'
      }
    ],
    faqs: [
      {
        question: 'What is a D8 dice?',
        answer: 'A D8 is an eight-sided die shaped like an octahedron with triangular faces numbered 1 through 8.'
      },
      {
        question: 'What is the average roll of a D8?',
        answer: 'The average of a single D8 is (1 + 8) ÷ 2 = 4.5. Over many rolls, the average will balance out to 4.5.'
      },
      {
        question: 'What is the average damage of a 2d8 Divine Smite?',
        answer: 'A 2d8 Divine Smite deals an expected average of 2 × 4.5 = 9.0 radiant damage (with a minimum of 2 and maximum of 16).'
      },
      {
        question: 'Which D&D classes use a D8 Hit Die?',
        answer: 'Bards, Clerics, Druids, Monks, Rogues, and Warlocks all use a D8 as their class Hit Die for hit points.'
      },
      {
        question: 'How does the online 3D D8 roller work?',
        answer: 'Our simulator generates fair random outcomes, animates the 3D octahedron tumbling and bouncing across the tray, and displays the top face number once it lands.'
      }
    ]
  },

  d10: {
    sides: 10,
    dieType: 'd10',
    name: '10-Sided Kite Die (D10)',
    shape: 'Ten-Sided Decahedron',
    expectedValue: 5.5,
    minResult: 1,
    maxResult: 10,
    possibleOutcomes: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    arithmeticFormula: '(1 + 2 + 3 + ... + 10) / 10 = 55 / 10 = 5.5',
    arithmeticSteps: [
      'A fair 10-sided die has 10 kite-shaped faces numbered 1 through 10 (or 0–9 in percentile sets).',
      'Add the minimum and maximum values: 1 + 10 = 11 (or sum all 10 faces: 1 + ... + 10 = 55).',
      'Divide the sum by 10: 55 ÷ 10 = 5.5.',
      'The expected average result for a single D10 roll is 5.5.'
    ],
    h1Title: 'Roll D10 Online - 3D Dice Roller',
    metaTitle: 'Roll a D10 Online (Free Realistic 3D Ten-Sided Dice Roller)',
    metaDescription: 'Roll a D10, 2d10, 3d10, 4d10, or 10d10 online with realistic 3D rolling. Free 10-sided virtual dice roller for Warlock Eldritch Blast, Heavy Crossbows, and D&D.',
    primaryKeywords: ['roll d10', 'd10 roller', 'roll 1d10', 'roll 3d10', 'roll 4d10', 'ten sided die', 'virtual d10', 'roll 10 sided dice'],
    introParagraphs: [
      'Welcome to the SpinWheelGames 3D D10 Roller. The ten-sided die (D10) features 10 kite-shaped faces and provides convenient decimal-friendly numbers from 1 to 10.',
      'In tabletop games, the D10 is the signature die for Warlock Eldritch Blast beams, heavy polearms and sniper crossbows, Fighter and Paladin Hit Dice, and percentile rolls when paired with a tens die.',
      'Roll a single beam, launch a multi-beam barrage (up to 4d10), or test high-level spell damage with smooth 3D rolling and clear face readouts.'
    ],
    howToUse: [
      'Click "Roll D10" or tap Spacebar to roll the dice.',
      'Select your desired dice count to roll multiple D10s at once (like 2d10, 3d10, 4d10, or 10d10).',
      'Choose quick presets like "Eldritch Blast (1d10–4d10)" for instant gameplay rolls.',
      'Use "360° Inspect" to examine the 3D model and verify all face numbers.',
      'View your combined score, average, and each individual face result live.'
    ],
    whatIsDescription: `A D10 is a ten-sided die with ten kite-shaped faces forming a pentagonal shape. In tabletop roleplaying games, it is used for heavy ranged weapons, polearms, high-impact spells, and as the unit die in percentile rolling systems.`,
    notationGuide: [
      { notation: '1d10', count: 1, min: 1, max: 10, expected: 5.5, meaning: 'One 10-sided die (Eldritch Blast beam or Heavy Crossbow).' },
      { notation: '2d10', count: 2, min: 2, max: 20, expected: 11.0, meaning: 'Two D10 dice (Level 5 Eldritch Blast or heavy weapon crit).' },
      { notation: '3d10', count: 3, min: 3, max: 30, expected: 16.5, meaning: 'Three D10 dice (Level 11 Eldritch Blast / spell burst).' },
      { notation: '4d10', count: 4, min: 4, max: 40, expected: 22.0, meaning: 'Four D10 dice (Level 17 max-level Eldritch Blast).' },
      { notation: '10d10', count: 10, min: 10, max: 100, expected: 55.0, meaning: 'Ten D10 dice (Massive high-level spell attack).' }
    ],
    quantityPresets: [
      { count: 1, label: '1d10', sublabel: 'Eldritch Blast (Avg 5.5)' },
      { count: 2, label: '2d10', sublabel: 'Level 5 Warlock (2 Beams)' },
      { count: 3, label: '3d10', sublabel: 'Level 11 Warlock (3 Beams)' },
      { count: 4, label: '4d10', sublabel: 'Level 17 Warlock (4 Beams)' },
      { count: 10, label: '10d10', sublabel: 'Massive Volley (Avg 55.0)' }
    ],
    commonUses: [
      {
        title: 'Warlock Eldritch Blast Cantrip',
        desc: 'The staple offensive cantrip deals 1d10 force damage per beam, scaling up to 4 beams at level 17.'
      },
      {
        title: 'Heavy Crossbows, Halberds & Glaives',
        desc: 'Heavy reach weapons and powerful sniper crossbows deal 1d10 piercing or slashing damage.'
      },
      {
        title: 'Fighter & Paladin Class Hit Dice',
        desc: 'Frontline warrior classes roll a D10 for health increases when leveling up and resting.'
      }
    ],
    faqs: [
      {
        question: 'What is a D10 dice?',
        answer: 'A D10 is a ten-sided die with kite-shaped faces numbered 1 through 10.'
      },
      {
        question: 'What is the average roll of a D10?',
        answer: 'The average of a single D10 is (1 + 10) ÷ 2 = 5.5. Over many rolls, the average balances out to 5.5.'
      },
      {
        question: 'What is the average damage of 4d10 Eldritch Blast?',
        answer: 'A 4d10 Eldritch Blast deals an expected average of 4 × 5.5 = 22.0 base force damage (plus any Charisma bonus).'
      },
      {
        question: 'How does the online 3D D10 roll work?',
        answer: 'Our roller uses fair random number generation, animates the 3D die rolling and spinning across the tray, and displays the resting top number.'
      }
    ]
  },

  d12: {
    sides: 12,
    dieType: 'd12',
    name: '12-Sided Pentagon Die (D12)',
    shape: 'Twelve-Sided Dodecahedron',
    expectedValue: 6.5,
    minResult: 1,
    maxResult: 12,
    possibleOutcomes: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    arithmeticFormula: '(1 + 2 + 3 + ... + 12) / 12 = 78 / 12 = 6.5',
    arithmeticSteps: [
      'A fair 12-sided die has 12 regular pentagon faces numbered 1 through 12.',
      'Add the minimum and maximum values: 1 + 12 = 13 (or sum all 12 faces: 1 + ... + 12 = 78).',
      'Divide the sum by 12: 78 ÷ 12 = 6.5.',
      'The expected average result for a single D12 roll is 6.5.'
    ],
    h1Title: 'Roll D12 Online - 3D Dice Roller',
    metaTitle: 'Roll a D12 Online (Free Realistic 3D Twelve-Sided Dice Roller)',
    metaDescription: 'Roll a D12, 2d12, 4d12, or 6d12 online with realistic 3D rolling. Compare Greataxe (1d12) vs Greatsword (2d6), Barbarian Hit Die math, and D12 averages.',
    primaryKeywords: ['roll a d12', 'd12 roller', 'roll 1d12', 'twelve sided die', 'roll 2d12', '4d12', '6d12', 'virtual d12'],
    introParagraphs: [
      'Welcome to the SpinWheelGames 3D D12 Roller. The 12-sided die (D12) is built from 12 regular pentagon faces, creating a beautifully balanced sphere-like shape.',
      'In fantasy roleplaying games, the D12 is the signature damage die of heavy two-handed Greataxes and serves as the class Hit Die for Barbarians. It provides exciting high-variance rolls with equal chances for numbers from 1 to 12.',
      'Roll a single axe swing, trigger Barbarian Brutal Critical hits, or test spell effects with realistic 3D rolling and instant math calculations.'
    ],
    howToUse: [
      'Click "Roll D12" or hit Spacebar to start rolling.',
      'Use the Quantity buttons or slider to roll multiple D12s at once (like 2d12, 3d12, or 6d12).',
      'Choose presets like "Barbarian Greataxe (1d12)" or "Greataxe Critical Hit (2d12)" for quick rolls.',
      'Use "360° Inspect" to rotate the 3D model and look at all 12 pentagon faces.',
      'View your total score, average, and individual face results in real time.'
    ],
    whatIsDescription: `A D12 is a twelve-sided die composed of 12 regular pentagonal faces forming a regular dodecahedron. In tabletop RPGs, it is known for Greataxe weapon damage and Barbarian class mechanics, offering a flat distribution from 1 to 12.`,
    notationGuide: [
      { notation: '1d12', count: 1, min: 1, max: 12, expected: 6.5, meaning: 'One 12-sided die (Barbarian Greataxe or Witch Bolt spell).' },
      { notation: '2d12', count: 2, min: 2, max: 24, expected: 13.0, meaning: 'Two D12 dice (Greataxe critical hit damage).' },
      { notation: '3d12', count: 3, min: 3, max: 36, expected: 19.5, meaning: 'Three D12 dice (Barbarian Brutal Critical at level 9).' },
      { notation: '6d12', count: 6, min: 6, max: 72, expected: 39.0, meaning: 'Six D12 dice (High-tier spell or monster strike).' }
    ],
    quantityPresets: [
      { count: 1, label: '1d12', sublabel: 'Barbarian Greataxe (Avg 6.5)' },
      { count: 2, label: '2d12', sublabel: 'Greataxe Critical Hit (Avg 13.0)' },
      { count: 3, label: '3d12', sublabel: 'Brutal Critical (Level 9)' },
      { count: 4, label: '4d12', sublabel: 'Brutal Critical (Level 13)' },
      { count: 6, label: '6d12', sublabel: 'High-Level Spell Burst' }
    ],
    commonUses: [
      {
        title: 'Barbarian Greataxe Damage & Brutal Critical',
        desc: 'Greataxes deal 1d12 slashing damage. When Barbarians land critical hits, extra D12 dice add high-damage spikes.'
      },
      {
        title: 'Barbarian Class Hit Die',
        desc: 'Barbarians have the highest Hit Die in D&D (1d12 + Constitution modifier HP per level), making them durable tanks.'
      },
      {
        title: 'High-Impact Spells (Witch Bolt & Chain Lightning)',
        desc: 'Used for spells that channel raw lightning and elemental surges dealing 1d12 damage per level.'
      }
    ],
    faqs: [
      {
        question: 'What is a D12 dice?',
        answer: 'A D12 is a twelve-sided die with pentagon-shaped faces numbered 1 through 12.'
      },
      {
        question: 'What is the average roll of a D12?',
        answer: 'The average of a single D12 is (1 + 12) ÷ 2 = 6.5. Over many rolls, the average converges to 6.5.'
      },
      {
        question: 'Why do Barbarians like a Greataxe (1d12) over a Greatsword (2d6)?',
        answer: 'While 2d6 has a slightly higher base average (7.0 vs 6.5), the Barbarian Brutal Critical feature adds one extra weapon die on crits. A D12 adds +6.5 average per extra die, while a D6 adds only +3.5.'
      },
      {
        question: 'How does the online 3D D12 roller work?',
        answer: 'Our roller uses fair random number generation, animates the 3D dodecahedron rolling smoothly across the tray, and automatically reads the winning face.'
      }
    ]
  },

  d20: {
    sides: 20,
    dieType: 'd20',
    name: '20-Sided Die (D20)',
    shape: 'Twenty-Sided Icosahedron',
    expectedValue: 10.5,
    minResult: 1,
    maxResult: 20,
    possibleOutcomes: Array.from({ length: 20 }, (_, i) => i + 1),
    arithmeticFormula: '(1 + 2 + 3 + ... + 20) / 20 = 210 / 20 = 10.5',
    arithmeticSteps: [
      'A fair 20-sided die has 20 triangular faces numbered 1 through 20.',
      'Add the minimum and maximum values: 1 + 20 = 21 (or sum all 20 faces: 1 + ... + 20 = 210).',
      'Divide the sum by 20: 210 ÷ 20 = 10.5.',
      'The expected average result for a standard D20 roll is 10.5.'
    ],
    h1Title: 'Roll D20 Online - 3D Dice Roller',
    metaTitle: 'Roll a D20 Online (Free Realistic 3D Twenty-Sided Dice Roller with Advantage)',
    metaDescription: 'Roll a D20 online with realistic 3D rolling. Free 20-sided virtual dice roller with Natural 20 critical detection, Advantage, Disadvantage, and D&D check math.',
    primaryKeywords: ['roll a d20', 'd20 roller', '1d20', 'd20 advantage', 'twenty sided die', 'virtual d20', 'roll 20 sided dice'],
    introParagraphs: [
      'Welcome to the SpinWheelGames 3D D20 Roller. The 20-sided die (D20) is the heart of tabletop roleplaying games like Dungeons & Dragons and Pathfinder, deciding the outcome of attack rolls, saving throws, and skill checks.',
      'Our interactive 3D roller features authentic rolling animations, Natural 20 critical hit highlights, and dedicated Advantage and Disadvantage rolling modes.',
      'Roll a quick attack, make a clutch saving throw, or test difficulty class odds with smooth 3D animations and live math summaries right in your browser.'
    ],
    howToUse: [
      'Click "Roll D20" or press Spacebar to roll.',
      'Use the Advantage preset to roll 2d20 and keep the higher number (average 13.82).',
      'Use the Disadvantage preset to roll 2d20 and keep the lower number (average 7.17).',
      'Click "360° Inspect" to rotate the 3D icosahedron model and view all 20 faces.',
      'Read your final score, check for Natural 20s or Natural 1s, and track roll history.'
    ],
    whatIsDescription: `A D20 is a twenty-sided die with twenty equilateral triangular faces forming a regular icosahedron. In the D20 System used by modern tabletop RPGs, players roll a D20, add their character modifiers, and compare the total against a target Difficulty Class (DC) or Armor Class (AC).`,
    notationGuide: [
      { notation: '1d20', count: 1, min: 1, max: 20, expected: 10.5, meaning: 'Standard D20 roll (attacks, saving throws, ability checks).' },
      { notation: '1d20 (Advantage)', count: 2, min: 1, max: 20, expected: 13.82, meaning: 'Roll two D20s, keep the higher result.' },
      { notation: '1d20 (Disadvantage)', count: 2, min: 1, max: 20, expected: 7.17, meaning: 'Roll two D20s, keep the lower result.' },
      { notation: '2d20 (Sum)', count: 2, min: 2, max: 40, expected: 21.0, meaning: 'Sum of two D20 dice rolled together.' }
    ],
    quantityPresets: [
      { count: 1, label: '1d20', sublabel: 'Standard Attack / Check (Avg 10.5)' },
      { count: 2, label: '2d20 Advantage', sublabel: 'Roll 2, Keep Highest (Avg 13.82)', keepHighest: 1 },
      { count: 2, label: '2d20 Disadvantage', sublabel: 'Roll 2, Keep Lowest (Avg 7.17)', dropLowest: 1 },
      { count: 4, label: '4d20', sublabel: 'Group Saving Throws' },
      { count: 6, label: '6d20', sublabel: 'Mass Monster Initiative' }
    ],
    commonUses: [
      {
        title: 'Attack Rolls & Critical Hits (Nat 20)',
        desc: 'Rolling a Natural 20 on an attack roll is an automatic hit and doubles your damage dice.'
      },
      {
        title: 'Ability Checks & Skill Contests',
        desc: 'Players roll a D20 plus skill modifiers to climb cliffs, pick locks, spot hidden traps, or recall lore.'
      },
      {
        title: 'Saving Throws & Death Saves',
        desc: 'Resist dragon breath, poison, and spells. On Death Saves, a Natural 20 revives your hero with 1 HP.'
      }
    ],
    faqs: [
      {
        question: 'What is a D20 dice?',
        answer: 'A D20 is a twenty-sided die with triangular faces numbered 1 through 20, used as the main die for tabletop RPG checks.'
      },
      {
        question: 'What is the average roll of a D20?',
        answer: 'The average of a standard D20 is (1 + 20) ÷ 2 = 10.5. Over many rolls, the average balances out to 10.5.'
      },
      {
        question: 'What is the average of a D20 with Advantage?',
        answer: 'Rolling with Advantage (roll two D20s and keep the highest) raises the expected average from 10.5 to 13.82 (giving an effective bonus of about +3.3).'
      },
      {
        question: 'What are the odds of rolling a Natural 20 with Advantage?',
        answer: 'With Advantage, your chance of rolling at least one Natural 20 increases from 5.0% to 9.75% (nearly double).'
      },
      {
        question: 'How does the online 3D D20 roller work?',
        answer: 'Our simulator generates a fair random roll, animates the 3D die tumbling realistically across the tray, and highlights the winning face number.'
      }
    ]
  },

  d100: {
    sides: 100,
    dieType: 'd100',
    name: '100-Sided Percentile Dice (D100)',
    shape: 'Percentile Pair (Tens + Ones)',
    expectedValue: 50.5,
    minResult: 1,
    maxResult: 100,
    possibleOutcomes: Array.from({ length: 100 }, (_, i) => i + 1),
    arithmeticFormula: '(1 + 2 + 3 + ... + 100) / 100 = 5050 / 100 = 50.5',
    arithmeticSteps: [
      'A fair 100-sided percentile roll spans numbers 1 through 100.',
      'Add the minimum and maximum values: 1 + 100 = 101 (or sum 1 to 100: 5,050).',
      'Divide the sum by 100 outcomes: 5,050 ÷ 100 = 50.5.',
      'The expected average value for a D100 roll is 50.5.'
    ],
    h1Title: 'Roll D100 Online - 3D Dice Roller',
    metaTitle: 'Roll a D100 Online (Free Realistic 3D Percentile Dice Roller)',
    metaDescription: 'Roll a D100 online with realistic 3D rolling. Free percentile virtual dice roller for D&D Wild Magic Surges, Call of Cthulhu skill checks, and loot tables.',
    primaryKeywords: ['roll 1d100', 'd100 roller', 'rolld100', 'percentile dice roller', 'd100 roll', 'virtual d100', 'roll 100 sided dice'],
    introParagraphs: [
      'Welcome to the SpinWheelGames 3D D100 Roller. Percentile dice (D100 or d%) are used in tabletop gaming whenever you need to generate an exact percentage from 1% to 100%.',
      'Rather than using an unwieldy 100-sided ball that rolls off tables, standard tabletop gaming uses a pair of 10-sided dice: one tens die (00, 10, 20... 90) and one single-digit die (0 through 9).',
      'Our interactive 3D roller throws both dice together, calculates the combined number instantly, and supports Wild Magic Surges, Divine Intervention checks, and Call of Cthulhu skill rolls.'
    ],
    howToUse: [
      'Click "Roll D100" or tap Spacebar to roll the percentile dice pair.',
      'Watch both the tens die and units die roll and settle together.',
      'Read the combined percentile total from 1 to 100 directly from the display.',
      'Use "360° Inspect" to rotate and look at both dice up close.',
      'Check your result against your game table, skill threshold, or loot chart.'
    ],
    whatIsDescription: `A D100 is a percentile dice roll producing a random number from 1 to 100. In tabletop gaming, it is most commonly rolled using two ten-sided dice: one reading tens (00–90) and one reading single digits (0–9). A roll of "00" and "0" represents 100, while "00" and "7" represents 7.`,
    notationGuide: [
      { notation: '1d100 / d%', count: 1, min: 1, max: 100, expected: 50.5, meaning: 'Single percentile roll from 1 to 100.' },
      { notation: '2d100', count: 2, min: 2, max: 200, expected: 101.0, meaning: 'Two percentile rolls summed together.' },
      { notation: '3d100', count: 3, min: 3, max: 300, expected: 151.5, meaning: 'Three percentile rolls for complex multi-table checks.' }
    ],
    quantityPresets: [
      { count: 1, label: '1d100 (Percentile)', sublabel: 'Tens + Ones (Avg 50.5)' },
      { count: 2, label: '2d100', sublabel: 'Dual Percentile Roll' },
      { count: 3, label: '3d100', sublabel: 'Triple Table Lookup' }
    ],
    commonUses: [
      {
        title: 'Wild Magic Surge Table (D&D 5e)',
        desc: 'Wild Magic Sorcerers roll 1d100 to trigger wild magical surges from the official 100-entry spell table.'
      },
      {
        title: 'Call of Cthulhu Skill Checks',
        desc: 'Investigators roll a D100 and must roll equal to or below their skill percentage to succeed.'
      },
      {
        title: 'Cleric Divine Intervention',
        desc: 'Clerics roll a D100 to seek direct aid from their deity, succeeding if they roll at or below their class level.'
      },
      {
        title: 'Random Loot & Treasure Tables',
        desc: 'Dungeon Masters roll a D100 to determine magic item rewards, dungeon trinkets, and random encounters.'
      }
    ],
    faqs: [
      {
        question: 'How do you read a D100 percentile roll?',
        answer: 'You roll two 10-sided dice: one for tens (00–90) and one for ones (0–9). For example, 70 + 4 = 74. A roll of 00 and 0 equals 100.'
      },
      {
        question: 'What is the average roll of a D100?',
        answer: 'The average of a D100 roll is (1 + 100) ÷ 2 = 50.5. Over many rolls, the average will balance out to 50.5.'
      },
      {
        question: 'What is a Zocchihedron?',
        answer: 'A Zocchihedron is a single physical 100-sided sphere die invented in 1985. Because it is round, tabletop gamers prefer rolling a pair of 10-sided dice.'
      },
      {
        question: 'How does the online 3D D100 roller work?',
        answer: 'Our roller uses fair random number generation to roll both the tens and units dice simultaneously in 3D, automatically calculating the combined number from 1 to 100.'
      }
    ]
  }
};
