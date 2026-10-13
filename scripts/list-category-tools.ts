import { ALL_SEO_PAGES_LIST } from '../lib/seoData';

const categories = [
  'workout', 'travel', 'creativity', 'productivity',
  'wellness', 'date-night', 'icebreakers', 'finance',
  'food', 'sports', 'classroom', 'party', 'decisions', 'games', 'numbers'
];

categories.forEach(cat => {
  const tools = ALL_SEO_PAGES_LIST.filter(p => {
    if (p.pageType === 'category') return false;
    const path = p.fullPath.toLowerCase();
    switch(cat) {
      case 'workout': return path.includes('workout') || path.includes('cardio') || path.includes('rest-day');
      case 'travel': return path.includes('travel') || path.includes('trip') || path.includes('city') || path.includes('country');
      case 'creativity': return path.includes('writing') || path.includes('story') || path.includes('drawing') || path.includes('art') || path.includes('poetry') || path.includes('song') || path.includes('creativ');
      case 'productivity': return path.includes('pomodoro') || path.includes('habit') || path.includes('declutter') || path.includes('detox') || path.includes('routine');
      case 'wellness': return path.includes('mindful') || path.includes('gratitude') || path.includes('self-care') || path.includes('journal') || path.includes('affirmation');
      case 'date-night': return path.includes('date') || path.includes('couples') || path.includes('romantic') || path.includes('anniversary');
      case 'icebreakers': return path.includes('icebreaker') || path.includes('water-cooler') || path.includes('standup') || path.includes('team-trivia') || path.includes('feedback') || path.includes('culture-celebration');
      case 'finance': return path.includes('savings') || path.includes('spend') || path.includes('budget') || path.includes('splurge') || path.includes('side-hustle');
      case 'food': return path.includes('food') || path.includes('dinner') || path.includes('restaurant') || path.includes('pizza') || path.includes('eat');
      case 'sports': return path.includes('football') || path.includes('nba') || path.includes('nfl') || path.includes('cricket') || path.includes('sport') || path.includes('player') || path.includes('tournament');
      case 'classroom': return path.includes('classroom') || path.includes('student');
      case 'party': return path.includes('party') || path.includes('truth') || path.includes('dare');
      case 'numbers': return path.includes('number') || path.includes('dice') || path.includes('1-50');
      case 'games': return path.includes('game') || path.includes('pokemon') || path.includes('minecraft') || path.includes('fortnite') || path.includes('rpg');
      case 'decisions': return path.includes('decision') || path.includes('yes-or-no') || path.includes('what-should-i-do') || path.includes('a-or-b');
      default: return false;
    }
  });

  console.log(`\n=== Category [${cat}] (${tools.length} tools) ===`);
  tools.forEach(t => console.log(`  { name: '${t.h1.split(':')[0].trim()}', path: '${t.fullPath}', description: '${(t.metaDescription || '').slice(0, 60)}...' }`));
});
