import { ALL_SEO_PAGES_LIST } from '../lib/seoData';

const categoryHubs = [
  'food', 'sports', 'travel', 'finance', 'classroom',
  'party', 'decisions', 'games', 'numbers', 'wellness',
  'productivity', 'creativity', 'challenges', 'date-night', 'icebreakers'
];

console.log('Mapping all pages to the 15 category hubs...');

const hubPages: Record<string, typeof ALL_SEO_PAGES_LIST> = {};
categoryHubs.forEach(h => hubPages[h] = []);

ALL_SEO_PAGES_LIST.forEach(p => {
  if (p.pageType === 'category') return;
  // Match category
  let matchedHub = '';
  const path = p.fullPath.toLowerCase();
  const slug = p.slug.toLowerCase();
  
  if (path.includes('food') || path.includes('dinner') || path.includes('restaurant') || path.includes('pizza') || path.includes('eat') || path.includes('breakfast') || path.includes('lunch') || path.includes('snack')) {
    matchedHub = 'food';
  } else if (path.includes('sport') || path.includes('nba') || path.includes('nfl') || path.includes('football') || path.includes('cricket') || path.includes('player') || path.includes('tournament')) {
    matchedHub = 'sports';
  } else if (path.includes('travel') || path.includes('trip') || path.includes('city') || path.includes('country') || path.includes('vacation')) {
    matchedHub = 'travel';
  } else if (path.includes('finance') || path.includes('money') || path.includes('saving') || path.includes('spend') || path.includes('budget') || path.includes('splurge') || path.includes('hustle')) {
    matchedHub = 'finance';
  } else if (path.includes('classroom') || path.includes('student') || path.includes('teacher') || path.includes('school')) {
    matchedHub = 'classroom';
  } else if (path.includes('party') || path.includes('truth') || path.includes('dare') || path.includes('drink') || path.includes('social')) {
    matchedHub = 'party';
  } else if (path.includes('decision') || path.includes('yes-or-no') || path.includes('what-should-i-do') || path.includes('choice') || path.includes('dilemma') || path.includes('a-or-b')) {
    matchedHub = 'decisions';
  } else if (path.includes('game') || path.includes('pokemon') || path.includes('minecraft') || path.includes('fortnite') || path.includes('rpg') || path.includes('board')) {
    matchedHub = 'games';
  } else if (path.includes('number') || path.includes('dice') || path.includes('roll') || path.includes('1-50') || path.includes('dnd') || path.includes('stat') || path.includes('digit') || path.includes('random-number')) {
    matchedHub = 'numbers';
  } else if (path.includes('wellness') || path.includes('mindful') || path.includes('gratitude') || path.includes('affirmation') || path.includes('self-care') || path.includes('journal')) {
    matchedHub = 'wellness';
  } else if (path.includes('productivity') || path.includes('pomodoro') || path.includes('habit') || path.includes('declutter') || path.includes('detox') || path.includes('routine')) {
    matchedHub = 'productivity';
  } else if (path.includes('creativ') || path.includes('writing') || path.includes('story') || path.includes('draw') || path.includes('art') || path.includes('poetry') || path.includes('song')) {
    matchedHub = 'creativity';
  } else if (path.includes('challenge')) {
    matchedHub = 'challenges';
  } else if (path.includes('date') || path.includes('couple') || path.includes('romance') || path.includes('anniversary')) {
    matchedHub = 'date-night';
  } else if (path.includes('icebreaker') || path.includes('meeting') || path.includes('water-cooler') || path.includes('standup') || path.includes('team-building') || path.includes('trivia') || path.includes('feedback')) {
    matchedHub = 'icebreakers';
  } else {
    // Check decisions / games / party as fallback
    matchedHub = 'decisions';
  }

  if (hubPages[matchedHub]) {
    hubPages[matchedHub].push(p);
  }
});

for (const hub of categoryHubs) {
  console.log(`Hub /${hub}: ${hubPages[hub].length} child tool pages`);
  console.log(`  Sample:`, hubPages[hub].slice(0, 4).map(p => p.fullPath).join(', '));
}

