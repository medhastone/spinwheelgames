import { WheelExperience } from './wheelLibraryTypes';

export const WHEEL_LIBRARY_PART8: WheelExperience[] = [
  // ==========================================
  // 15. WELLNESS & MINDFULNESS (5 experiences)
  // ==========================================
  {
    id: 'mindfulness-wheel',
    name: 'Mindfulness Wheel',
    purpose: 'Ground yourself in the present moment and soothe acute anxiety in under 3 minutes.',
    targetAudience: 'Stressed students, anxious professionals, anyone feeling sensory overload.',
    defaultEntries: [
      '5-4-3-2-1 Sensory Grounding (Name 5 things you see, 4 feel, 3 hear, 2 smell, 1 taste)',
      'Box Breathing 4-4-4-4 (Inhale 4s, Hold 4s, Exhale 4s, Hold 4s for 4 cycles)',
      'Physiological Sigh (Two quick inhales through nose, long slow exhale through mouth)',
      'Unclench Jaw, Drop Shoulders, and Relax Tongue from Roof of Mouth',
      'Body Scan Meditation from Crown of Head to Tips of Toes',
      'Listen Deeply to the Farthest Sound You Can Detect for 60 Seconds'
    ],
    category: 'WELLNESS & MINDFULNESS',
    instructions: 'Spin whenever your chest tightens or mental chatter feels overwhelming. Execute immediately.',
    optionalModes: ['Panic/Anxiety Acute Protocol', 'Morning Center', 'Bedtime Calm'],
    relatedWheels: ['Evening Routine Wheel', 'Rest Day Decision Wheel', 'Gratitude Wheel'],
    relatedTools: ['Box Breathing Pacer Animation', 'Sound Frequency Zen Chimes'],
    difficulty: 'Easy',
    shareableResultConcept: 'Calm Sanctuary Token validating a moment of somatic presence.',
    uniqueValueProposition: 'Includes clinically proven somatic resets like the physiological sigh and box breathing.',
    paletteKey: 'emerald'
  },
  {
    id: 'gratitude-wheel',
    name: 'Gratitude Wheel',
    purpose: 'Rewire negative cognitive biases by actively scanning for everyday micro-blessings.',
    targetAudience: 'Individuals feeling pessimistic, families at Thanksgiving, daily journalers.',
    defaultEntries: [
      'An unexpected kindness from a stranger or colleague this month',
      'A comfort of modern technology you usually take completely for granted',
      'A mentor, teacher, or friend who shaped your values years ago',
      'A specific physical ability or sense of your body that served you today',
      'A challenge or hardship that secretly taught you resilience or boundaries',
      'A simple sensory pleasure (morning coffee, warm bed, cool breeze)'
    ],
    category: 'WELLNESS & MINDFULNESS',
    instructions: 'Spin over family dinner or during morning coffee. Share your answer aloud or write it down.',
    optionalModes: ['Family Dinner Round-Robin', 'Morning Journal Entry Prompt'],
    relatedWheels: ['Mindfulness Wheel', 'Journaling Prompt Wheel', 'Icebreaker Wheel'],
    relatedTools: ['Gratitude Journal PDF Exporter', 'Daily Reflection Prompt'],
    difficulty: 'Easy',
    shareableResultConcept: 'Gratitude Sunlight Badge highlighting the specific appreciation.',
    uniqueValueProposition: 'Frames gratitude around specific, non-superficial reflections for deeper emotional impact.',
    paletteKey: 'pastel'
  },
  {
    id: 'self-care-wheel',
    name: 'Self-Care Wheel',
    purpose: 'Nourish emotional and physical reserves with guilt-free nurturing practices.',
    targetAudience: 'Caregivers, burned-out workers, parents putting everyone else first.',
    defaultEntries: [
      'Book a 30-Minute Window for Yourself with Zero Obligations',
      'Order Your Absolute Favorite Comfort Beverage and Drink in Silence',
      'Apply a Hydrating Face Mask and Listen to Ambient Music',
      'Say a Kind, Compassionate "No" to a Draining Request Today',
      'Take a 30-Minute Nap Under a Heavy Weighted Blanket',
      'Go on a Solo Date to a Quiet Bookstore or Coffee Corner'
    ],
    category: 'WELLNESS & MINDFULNESS',
    instructions: 'Spin on Sunday morning to schedule your dedicated self-care appointment for the week.',
    optionalModes: ['Under $0 Free Options', 'Physical Body Care vs Emotional Nourishment'],
    relatedWheels: ['Rest Day Decision Wheel', 'Evening Routine Wheel', 'Mindfulness Wheel'],
    relatedTools: ['Self-Care Calendar Scheduler', 'Boundary Script Guide'],
    difficulty: 'Casual',
    shareableResultConcept: 'Recharged Cup Badge honoring intentional self-preservation.',
    uniqueValueProposition: 'Emphasizes boundary-setting and emotional recovery, not just commercial pampering.',
    paletteKey: 'vibrant'
  },
  {
    id: 'journaling-prompt-wheel',
    name: 'Journaling Prompt Wheel',
    purpose: 'Unlock deep introspective writing beyond shallow "what I did today" recaps.',
    targetAudience: 'Daily journal keepers, therapy clients, self-reflective individuals.',
    defaultEntries: [
      'What truth am I actively avoiding acknowledging right now?',
      'If I had 100% confidence I could not fail, what would I attempt next month?',
      'What boundary do I most desperately need to set with myself or others?',
      'Describe the person you were 5 years ago with deep compassion and forgiveness',
      'What does "enough" look like for me in career, wealth, and peace of mind?',
      'What emotion did I suppress today, and where did I feel it in my body?'
    ],
    category: 'WELLNESS & MINDFULNESS',
    instructions: 'Spin, open your notebook, and write unfiltered for 10 minutes without judging your thoughts.',
    optionalModes: ['Shadow Work Questions', 'Future Self Visioning', 'Morning Pages Style'],
    relatedWheels: ['Gratitude Wheel', 'Mindfulness Wheel', 'Writing Prompt Wheel'],
    relatedTools: ['Encrypted Private Journal Notepad', '10-Minute Reflection Timer'],
    difficulty: 'Medium',
    shareableResultConcept: 'Inner Clarity Compass celebrating an introspective journaling milestone.',
    uniqueValueProposition: 'Therapist-inspired prompts that prompt genuine emotional breakthroughs.',
    paletteKey: 'casino'
  },
  {
    id: 'affirmation-wheel',
    name: 'Affirmation Wheel',
    purpose: 'Replace harsh inner critic self-talk with grounded, realistic positive affirmations.',
    targetAudience: 'Imposter syndrome sufferers, students before exams, job interviewees.',
    defaultEntries: [
      '"I am allowed to take up space and express my authentic perspective."',
      '"My worth is not defined by my productivity, speed, or output today."',
      '"I have survived 100% of my hardest days so far, and I can handle this."',
      '"I am learning and growing; perfection is neither required nor expected."',
      '"I honor my energy limits and give myself permission to rest when tired."',
      '"I release what is outside my control and focus calmly on my next small step."'
    ],
    category: 'WELLNESS & MINDFULNESS',
    instructions: 'Spin in front of a mirror in the morning. Speak the chosen statement aloud with conviction.',
    optionalModes: ['Mirror Speech Technique', 'Pre-Meeting Confidence Boost', 'TTS Voice Speak'],
    relatedWheels: ['Mindfulness Wheel', 'Gratitude Wheel', 'Self-Care Wheel'],
    relatedTools: ['Daily Affirmation Desktop Widget', 'TTS Affirmation Voice Player'],
    difficulty: 'Casual',
    shareableResultConcept: 'Daily Affirmation Card with inspiring typography and serene background.',
    uniqueValueProposition: 'Avoids toxic positivity; emphasizes grounded resilience and self-compassion.',
    paletteKey: 'arcade'
  },

  // ==========================================
  // 16. DATE NIGHT & COUPLES (5 experiences)
  // ==========================================
  {
    id: 'date-night-wheel',
    name: 'Date Night Wheel',
    purpose: 'Inject romance, excitement, and novelty into date nights for couples in long-term relationships.',
    targetAudience: 'Couples stuck in "dinner and Netflix" ruts, newlyweds, anniversary celebrants.',
    defaultEntries: [
      'Blindfolded Taste Test Dinner Challenge at Home',
      'Visit a Local Vintage Arcade & Challenge Each Other in Air Hockey',
      'Couples Paint & Sip Night with Canvas and Favorite Wine',
      'Cook an Elaborate 3-Course Italian Meal from Scratch Together',
      'Stargazing Picnic with Blankets, Thermos of Hot Cocoa, and Stargazing App',
      'Thrift Store Challenge: Pick Each Other\'s Outfits for Dinner ($15 Limit)',
      'Sunset Kayaking or Paddleboarding Session',
      'Late-Night Dessert Crawl (Visit 3 Different Bakeries for 1 Item Each)'
    ],
    category: 'DATE NIGHT & COUPLES',
    instructions: 'Spin every Tuesday to lock in Friday or Saturday\'s date night adventure.',
    optionalModes: ['Budget Tier ($0 vs $$ vs $$$)', 'Stay-at-Home Date vs Out-on-Town', 'Double Date'],
    relatedWheels: ['Couples Question Wheel', 'Dinner Wheel', 'Weekend Picker'],
    relatedTools: ['Date Night Calendar Event Builder', 'Budget Splitter'],
    difficulty: 'Medium',
    shareableResultConcept: 'Date Night Golden Ticket with activity itinerary and dress code motif.',
    uniqueValueProposition: 'Replaces lazy dinner-and-movie habits with interactive, bonding shared experiences.',
    paletteKey: 'vibrant'
  },
  {
    id: 'couples-question-wheel',
    name: 'Couples Question Wheel',
    purpose: 'Deepen intimacy and spark captivating conversations beyond logistics and daily chores.',
    targetAudience: 'Couples wanting deep talks on road trips, date nights, or quiet evenings.',
    defaultEntries: [
      'What was the exact moment you first realized you had feelings for me?',
      'If we could drop everything and live anywhere in the world for 1 year, where?',
      'What is one dream or hobby you had as a kid that you still secretly want to pursue?',
      'What is something I do for you that always makes you feel deeply loved and seen?',
      'What is an adventure or trip you want us to experience together before we die?',
      'What is the funniest or most memorable mistake we have made as a couple?'
    ],
    category: 'DATE NIGHT & COUPLES',
    instructions: 'Spin while on a road trip, over coffee in bed, or while cuddling before sleep.',
    optionalModes: ['Sweet & Nostalgic', 'Deep Life Dreams', 'Spicy & Flirty'],
    relatedWheels: ['Date Night Wheel', 'Would You Rather', 'Truth or Dare'],
    relatedTools: ['Couples Question Journal', 'Conversation Audio Recorder'],
    difficulty: 'Easy',
    shareableResultConcept: 'Couples Heart Connection card featuring the question and anniversary seal.',
    uniqueValueProposition: 'Created to evoke nostalgic joy and vulnerability without interrogating.',
    paletteKey: 'pastel'
  },
  {
    id: 'at-home-date-wheel',
    name: 'At-Home Date Wheel',
    purpose: 'Intimate, budget-friendly romantic date ideas when babysitters aren\'t an option.',
    targetAudience: 'Parents with sleeping toddlers, budget-conscious couples, rainy evening dates.',
    defaultEntries: [
      'Living Room Blanket Fort with Fairy Lights & Classic Film',
      'Indoor Camping & Fondue Dinner on Living Room Floor',
      'DIY Pizza Making Competition (Vote on Best Slice)',
      'Cooperative Board Game Night with Romantic Candlelight',
      'Spa Night with Foot Massages and Soothing Acoustic Playlists',
      'Bake Gourmet Cookies Together and Decorate Them Playfully'
    ],
    category: 'DATE NIGHT & COUPLES',
    instructions: 'Put on quiet romantic music, spin the wheel, and leave phones in another room.',
    optionalModes: ['Living Room Camping', 'Kitchen Culinary Battle', 'Relaxation Spa'],
    relatedWheels: ['Date Night Wheel', 'Dessert Wheel', 'Movie Wheel'],
    relatedTools: ['Blanket Fort Construction Checklist', 'Romantic Acoustic Playlist Linker'],
    difficulty: 'Casual',
    shareableResultConcept: 'Home Sweet Home Date Badge with candle icon and date timestamp.',
    uniqueValueProposition: 'Specifically optimized for zero-travel dates within your own four walls.',
    paletteKey: 'emerald'
  },
  {
    id: 'anniversary-adventure-wheel',
    name: 'Anniversary Adventure Wheel',
    purpose: 'Plan memorable milestone anniversary trips and meaningful celebration experiences.',
    targetAudience: 'Couples celebrating 1-year, 5-year, 10-year, or 25-year milestones.',
    defaultEntries: [
      'Recreate Your Very First Date Down to the Outfits and Music',
      'Weekend Escape to a Secluded Luxury Treehouse or Glamping Dome',
      'Private Chef Cooking Class & Wine Pairing Experience',
      'Hot Air Balloon Ride at Sunrise with Champagne Toast',
      'Scenic Train Journey Through Mountains with Dining Car',
      'Commission a Custom Portrait from a Favorite Travel Photo'
    ],
    category: 'DATE NIGHT & COUPLES',
    instructions: 'Spin 3 months before your anniversary to plan and reserve your milestone celebration.',
    optionalModes: ['Milestone Year Focus', 'Luxury Splurge vs Heartfelt Nostalgia'],
    relatedWheels: ['Date Night Wheel', 'Travel Destination Wheel', 'Weekend Trip Wheel'],
    relatedTools: ['Anniversary Milestone Countdown', 'Custom Gift Idea Guide'],
    difficulty: 'Challenging',
    shareableResultConcept: 'Anniversary Milestone Banner with years celebrated and romantic crest.',
    uniqueValueProposition: 'Elevates celebrations from ordinary dinners to unforgettable milestone memories.',
    paletteKey: 'casino'
  },
  {
    id: 'romantic-gesture-wheel',
    name: 'Romantic Gesture Wheel',
    purpose: 'Surprise your partner with spontaneous, thoughtful acts of everyday appreciation.',
    targetAudience: 'Partners who want to show intentional romance on ordinary Tuesdays.',
    defaultEntries: [
      'Leave a Heartfelt Handwritten Love Note in Their Coat Pocket or Car',
      'Bring Them Their Favorite Coffee or Beverage Without Being Asked',
      'Take Care of Their Most-Dreaded Chore Today Silently',
      'Give Them an Unsolicited 15-Minute Neck and Shoulder Massage Tonight',
      'Prepare Their Favorite Homemade Breakfast in Bed Tomorrow',
      'Send a Midday Text Listing 3 Specific Things You Love About Them'
    ],
    category: 'DATE NIGHT & COUPLES',
    instructions: 'Spin in secret on Monday morning and execute the gesture before the week ends.',
    optionalModes: ['Secret Mission (Never Reveal the Wheel)', 'Love Languages Alignment'],
    relatedWheels: ['Couples Question Wheel', 'Self-Care Wheel', 'Chore Picker'],
    relatedTools: ['Love Language Assessment Linker', 'Secret Surprise Reminder Clock'],
    difficulty: 'Easy',
    shareableResultConcept: 'Cupid Secret Mission Pass celebrating everyday romantic tenderness.',
    uniqueValueProposition: 'Grounded in the 5 Love Languages to provide tangible micro-affirmations.',
    paletteKey: 'vibrant'
  }
];
