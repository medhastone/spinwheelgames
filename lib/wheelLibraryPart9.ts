import { WheelExperience } from './wheelLibraryTypes';

export const WHEEL_LIBRARY_PART9: WheelExperience[] = [
  // ==========================================
  // 17. ICEBREAKERS & TEAM BUILDING (6 experiences)
  // ==========================================
  {
    id: 'zoom-icebreaker-wheel',
    name: 'Zoom Icebreaker Wheel',
    purpose: 'Warm up virtual standups, remote all-hands meetings, and webinars in 60 seconds.',
    targetAudience: 'Scrum masters, remote team leads, virtual conference moderators.',
    defaultEntries: [
      'Show & Tell: Grab the nearest unusual object on your desk and explain it',
      'What was your very first paid job, and what was your worst memory of it?',
      'If you could add any absurd company perk tomorrow, what would it be?',
      'Two-Word Check-in: How is your mental battery right now in two words?',
      'What is your go-to productivity song, album, or background noise?',
      'Virtual Background Roulette: Change your Zoom background to your dream vacation'
    ],
    category: 'ICEBREAKERS & TEAM BUILDING',
    instructions: 'Spin during the first 3 minutes of a remote call while waiting for attendees to join.',
    optionalModes: ['Lightning Round (15s per person)', 'Chat-Only Answers', 'Physical Desk Show-and-Tell'],
    relatedWheels: ['Water Cooler Wheel', 'Standup Order Wheel', 'Team Maker'],
    relatedTools: ['Meeting Timer 60-Second Clock', 'Slack/Zoom Integration Prompt'],
    difficulty: 'Easy',
    shareableResultConcept: 'Meeting Energized Badge showing prompt and team participation score.',
    uniqueValueProposition: 'Prevents uncomfortable Zoom silence with instant, non-cringe conversation catalysts.',
    paletteKey: 'arcade'
  },
  {
    id: 'water-cooler-wheel',
    name: 'Water Cooler Wheel',
    purpose: 'Replicate casual office hallway banter and serendipitous conversations across hybrid teams.',
    targetAudience: 'Slack channel hosts, office managers, distributed teams across time zones.',
    defaultEntries: [
      'Is cereal soup? Defend your controversial culinary position in 30 seconds',
      'What is the absolute best movie or TV show you watched this past month?',
      'What is one small luxury under $25 that significantly upgraded your life?',
      'What was your favorite childhood cartoon or video game console?',
      'Are you a morning lark, a night owl, or a permanently caffeinated pigeon?',
      'What is the strangest food combination you genuinely enjoy eating?'
    ],
    category: 'ICEBREAKERS & TEAM BUILDING',
    instructions: 'Post the prompt in your team\'s #random or #watercooler Slack/Teams channel every Wednesday.',
    optionalModes: ['Weekly Slack Bot Post', 'Voice Memo Exchange', 'Photo Response Only'],
    relatedWheels: ['Zoom Icebreaker Wheel', 'Would You Rather', 'Food Wheel'],
    relatedTools: ['Slack Markdown Formatter', 'Water Cooler Poll Generator'],
    difficulty: 'Casual',
    shareableResultConcept: 'Water Cooler Debate Stamp with conversational controversy meter.',
    uniqueValueProposition: 'Lighthearted, universally relatable questions that bridge departmental silos.',
    paletteKey: 'pastel'
  },
  {
    id: 'standup-order-wheel',
    name: 'Standup Order Wheel',
    purpose: 'Eliminate awkward "who goes next?" hesitation during agile daily scrums.',
    targetAudience: 'Engineering managers, agile scrum masters, Kanban coordinators.',
    defaultEntries: ['Frontend Lead', 'Backend Engineer', 'Product Designer', 'QA Specialist', 'DevOps / Infra', 'Product Manager', 'Data Analyst', 'Engineering Intern'],
    category: 'ICEBREAKERS & TEAM BUILDING',
    instructions: 'Spin at 9:30 AM sharp to establish speaker order. Enable elimination mode.',
    optionalModes: ['Elimination Standup Order', '1-Minute Speaker Countdown', 'Pass the Mic Mode'],
    relatedWheels: ['Random Name Picker', 'Team Maker', 'Task Picker'],
    relatedTools: ['60-Second Scrum Speaker Timer', 'Jira Sprint Ticket Linker'],
    difficulty: 'Easy',
    shareableResultConcept: 'Daily Scrum Order Roster highlighting the speaking sequence.',
    uniqueValueProposition: 'Includes built-in 60-second speaker countdown to prevent rambling updates.',
    paletteKey: 'emerald'
  },
  {
    id: 'team-trivia-topic-wheel',
    name: 'Team Trivia Topic Wheel',
    purpose: 'Select diverse, fun trivia categories for Friday team socials and virtual happy hours.',
    targetAudience: 'Team social committees, pub trivia organizers, corporate event coordinators.',
    defaultEntries: ['90s Pop Culture & Boy Bands', 'World Geography & Bizarre Flags', 'Tech History & Failed Gadgets', 'Famous Movie Quotes & Taglines', 'Science Curiosities & Space Exploration', 'Food Origins & Global Cuisine', 'One-Hit Wonders & Music Trivia', 'Mythology & Ancient Legends'],
    category: 'ICEBREAKERS & TEAM BUILDING',
    instructions: 'Spin to determine each round\'s topic during company trivia competitions.',
    optionalModes: ['Double Points Lightning Round', 'Team vs Team Duel', 'Buzzer Rush'],
    relatedWheels: ['Quiz Topic Wheel', 'Tournament Wheel', 'Team Name Wheel'],
    relatedTools: ['Trivia Round Scoreboard', 'Team Buzzer Sound Effects'],
    difficulty: 'Medium',
    shareableResultConcept: 'Company Trivia Trophy Card with winning department emblem.',
    uniqueValueProposition: 'Curated topics tailored for workplace inclusivity across diverse ages and backgrounds.',
    paletteKey: 'casino'
  },
  {
    id: 'feedback-starter-wheel',
    name: 'Feedback Starter Wheel',
    purpose: 'Guide constructive, psychological safe peer reviews and quarterly retrospective discussions.',
    targetAudience: 'Agile teams running sprint retrospectives, design critique facilitators.',
    defaultEntries: [
      'What went surprisingly well during this sprint that we didn\'t anticipate?',
      'Where did we encounter unnecessary friction, bureaucracy, or bottlenecks?',
      'Give a genuine shout-out to a teammate who helped unblock your work',
      'What is one experiment we should commit to trying during our next cycle?',
      'What should we immediately stop doing because it drains our energy?',
      'If you had a magic wand to fix one technical or operational debt, what is it?'
    ],
    category: 'ICEBREAKERS & TEAM BUILDING',
    instructions: 'Spin during sprint retrospectives (Sprint Retros) to structure honest team dialogue.',
    optionalModes: ['Start / Stop / Continue Framework', 'Kudos Round Only', 'Anonymous Card Submission'],
    relatedWheels: ['Standup Order Wheel', 'Task Picker', 'Creativity Prompt Wheel'],
    relatedTools: ['Sprint Retro Sticky Wall', 'Action Item Assignee Tracker'],
    difficulty: 'Medium',
    shareableResultConcept: 'Sprint Retrospective Blueprint with team consensus items highlighted.',
    uniqueValueProposition: 'Grounded in psychological safety frameworks to promote candid, actionable feedback.',
    paletteKey: 'vibrant'
  },
  {
    id: 'culture-celebration-wheel',
    name: 'Culture Celebration Wheel',
    purpose: 'Recognize teammate milestones, personal achievements, and work anniversaries.',
    targetAudience: 'People Ops managers, team leads building positive work cultures.',
    defaultEntries: [
      'Peer Spotlight: Teammates share 3 things they deeply respect about you',
      'Choose Today\'s Team Social Soundtrack / DJ for the Afternoon',
      'Spin for Company Swag Store Voucher ($50 Gift Code)',
      'Free Friday Afternoon Early Finish Pass (Sign Off at 2 PM)',
      'Donation to Your Favorite Charity Funded in Your Name ($100)',
      'Silly Honorary Trophy Delivery to Your Desk or Mailbox'
    ],
    category: 'ICEBREAKERS & TEAM BUILDING',
    instructions: 'Spin whenever an employee completes an onboarding milestone, promotion, or anniversary.',
    optionalModes: ['Milestone Rewards', 'Peer Recognition Kudos', 'Charity Donation Match'],
    relatedWheels: ['Winner Picker', 'Giveaway Wheel', 'Team Name Wheel'],
    relatedTools: ['Digital Kudos Card Builder', 'Swag Store Credit Linker'],
    difficulty: 'Casual',
    shareableResultConcept: 'Culture Champion Badge celebrating the team member\'s impact.',
    uniqueValueProposition: 'Turns sterile HR recognition into spontaneous, joyous moments of celebration.',
    paletteKey: 'pastel'
  },

  // ==========================================
  // 18. FINANCE & BUDGETING (5 experiences)
  // ==========================================
  {
    id: 'savings-challenge-wheel',
    name: 'Savings Challenge Wheel',
    purpose: 'Gamify your weekly financial savings to build an emergency fund effortlessly.',
    targetAudience: 'Budgeters, young professionals, families building emergency savings.',
    defaultEntries: [
      'Transfer $15 to Savings & Skip One Takeout Drink',
      'Transfer $25 to Savings & Pack Lunch Tomorrow',
      'Transfer $50 to High-Yield Savings Account Today',
      'No-Spend Day Tomorrow (Zero non-essential purchases)',
      'Cancel One Underutilized Monthly Subscription',
      'Sell One Unused Item Online & Bank the Proceeds ($20+)',
      'Round-Up Day: Transfer the change from today\'s account balance',
      'Bank $10 and Match It in an Index Fund Investment'
    ],
    category: 'FINANCE & BUDGETING',
    instructions: 'Spin every Monday morning to assign your micro-savings mission for the week.',
    optionalModes: ['52-Week Money Challenge', 'No-Spend Day Streak', 'High-Roller ($50-$200)'],
    relatedWheels: ['No Spend Challenge Wheel', 'Budget Allocation Wheel', 'Side Hustle Wheel'],
    relatedTools: ['Savings Growth Compound Interest Calculator', 'Emergency Fund Progress Meter'],
    difficulty: 'Medium',
    shareableResultConcept: 'Savings Piggy Bank Medal showing cash transferred to security.',
    uniqueValueProposition: 'Turns boring budgeting discipline into micro-wins that add up to thousands annually.',
    paletteKey: 'emerald'
  },
  {
    id: 'no-spend-challenge-wheel',
    name: 'No-Spend Challenge Wheel',
    purpose: 'Conquer impulse spending by committing to fun zero-dollar weekend and evening constraints.',
    targetAudience: 'Impulse shoppers, recovery budgeters, debt-payoff warriors.',
    defaultEntries: [
      'Zero-Dollar Date Night: Free park walk + homemade popcorn + movie',
      'Cook Dinner Exclusively Using Pantry Staples Already in House',
      'Repair, Mend, or Clean an Item Rather Than Replacing It',
      'Borrow a Book or Movie from Your Local Public Library',
      'Host a Clothing or Game Swap with Friends Instead of Shopping',
      'Full 48-Hour Weekend No-Spend Lock (Zero Cards Swiped)'
    ],
    category: 'FINANCE & BUDGETING',
    instructions: 'Spin when tempted by online sales or on Friday before the weekend begins.',
    optionalModes: ['48-Hour Weekend Lockout', 'Pantry-Only Cooking', 'Free Local Event Quest'],
    relatedWheels: ['Savings Challenge Wheel', 'What Should I Do?', 'At-Home Date Wheel'],
    relatedTools: ['Zero-Spend Calendar Tracker', 'Impulse Purchase 48-Hour Delay Timer'],
    difficulty: 'Challenging',
    shareableResultConcept: 'Zero-Spend Weekend Victor Badge proving total financial discipline.',
    uniqueValueProposition: 'Replaces consumer spending with fulfilling, creative zero-cost human experiences.',
    paletteKey: 'arcade'
  },
  {
    id: 'budget-allocation-wheel',
    name: 'Budget Allocation Wheel',
    purpose: 'Allocate unexpected financial windfalls (tax refunds, bonuses, cash gifts) responsibly.',
    targetAudience: 'Recipients of bonuses, tax refunds, freelance milestone payments.',
    defaultEntries: [
      '50% High-Interest Debt Payoff / 50% Emergency Fund',
      '70% Low-Cost Broad Market Index Fund / 30% Fun Guilt-Free Splurge',
      '80% Emergency Savings Buffer / 20% Home Maintenance',
      '40% Retirement IRA / 40% Vacation Savings / 20% Dining Out',
      '60% Extra Mortgage or Student Loan Principal / 40% Savings',
      '100% High-Yield Savings Account (Hold for Future Goal)'
    ],
    category: 'FINANCE & BUDGETING',
    instructions: 'Spin when a bonus check clears to prevent impulsive lifestyle creep before it happens.',
    optionalModes: ['50/30/20 Rule Integration', 'Debt Snowball / Avalanche Focus', 'Guilt-Free Splurge Cap'],
    relatedWheels: ['Savings Challenge Wheel', 'Side Hustle Wheel', 'Travel Destination Wheel'],
    relatedTools: ['Windfall Allocation Matrix', 'Debt Payoff Acceleration Calculator'],
    difficulty: 'Medium',
    shareableResultConcept: 'Smart Money Allocation Blueprint with percentage breakdowns certified.',
    uniqueValueProposition: 'Protects unexpected windfalls from disappearing into untracked micro-purchases.',
    paletteKey: 'casino'
  },
  {
    id: 'splurge-vs-save-wheel',
    name: 'Splurge vs. Save Wheel',
    purpose: 'Make ethical, guilt-free calls on whether to purchase a coveted discretionary luxury.',
    targetAudience: 'Shoppers with an item sitting in their online cart for over 72 hours.',
    defaultEntries: [
      'BUY IT NOW: You\'ve earned it and it provides lasting utility!',
      'WAIT 7 DAYS: If you still desire it next week, purchase guilt-free',
      'FIND IT USED: Look on eBay / FB Marketplace for 40% off first',
      'PASS ON IT: Put the exact purchase amount into your index fund',
      'RENT / BORROW: Borrow from a friend or library first to test use',
      'BUY ON ONE CONDITION: Must declutter two existing items first'
    ],
    category: 'FINANCE & BUDGETING',
    instructions: 'Spin while looking at an item in your shopping cart that you don\'t strictly need.',
    optionalModes: ['7-Day Cooling Off Rule', 'One In, Two Out Rule', 'Cost-Per-Use Calculation'],
    relatedWheels: ['Decision Wheel', 'Yes or No Wheel', 'No Spend Challenge Wheel'],
    relatedTools: ['Cost-Per-Wear/Use Calculator', '72-Hour Cart Timer'],
    difficulty: 'Easy',
    shareableResultConcept: 'Conscious Consumer Seal certifying mindful purchase evaluation.',
    uniqueValueProposition: 'Provides nuance beyond a simple "no" by offering practical third paths like buying used.',
    paletteKey: 'pastel'
  },
  {
    id: 'side-hustle-wheel',
    name: 'Side Hustle Idea Wheel',
    purpose: 'Explore low-overhead freelance ventures and weekend income-generating experiments.',
    targetAudience: 'Aspiring solopreneurs, creatives seeking diversified income streams.',
    defaultEntries: [
      'Offer Local Dog Walking & Pet Sitting on Rover',
      'Build & Sell a Specialized Notion Template for Professionals',
      'Freelance Proofreading & Editing for College Theses / Resumes',
      'Sell Curated Vintage Clothes & Books on Depop / eBay',
      'Host Virtual Music or Language Tutoring Sessions',
      'Offer Website Accessibility & SEO Audits for Local Businesses',
      'Create and Sell Digital Planners / Printable Wall Art on Etsy',
      'Weekend Photography Sessions for Families and Pet Owners'
    ],
    category: 'FINANCE & BUDGETING',
    instructions: 'Spin to commit to validating one side hustle experiment for the next 14 days.',
    optionalModes: ['Zero-Cost Startup Only', 'Digital/Remote Only', 'Local In-Person Service'],
    relatedWheels: ['Savings Challenge Wheel', 'Creativity Prompt Wheel', 'Task Picker'],
    relatedTools: ['Side Hustle 14-Day Validation Checklist', 'Profit Margin Calculator'],
    difficulty: 'Challenging',
    shareableResultConcept: 'Solopreneur Launch Ticket with business model and first milestone target.',
    uniqueValueProposition: 'Focuses strictly on proven, low-capital ventures that can generate first revenue in 14 days.',
    paletteKey: 'emerald'
  }
];
