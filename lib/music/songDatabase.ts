export type SongCategory = 'genre' | 'decade' | 'mood' | 'karaoke' | 'artists' | 'challenge' | 'custom';

export interface SongEntry {
  id: string;
  title: string;
  artist?: string;
  category: SongCategory;
  subcategory?: string;
  decade?: string;
  karaokeNote?: string;
  challengePrompt?: string;
}

export const SONG_DATABASE: SongEntry[] = [
  // POPULAR GENRES
  { id: 'g-1', title: 'Pop Anthems', artist: 'Dua Lipa, Taylor Swift, Bruno Mars', category: 'genre', subcategory: 'Pop' },
  { id: 'g-2', title: 'Classic & Modern Rock', artist: 'Queen, Foo Fighters, Arctic Monkeys', category: 'genre', subcategory: 'Rock' },
  { id: 'g-3', title: 'Hip-Hop & Rap', artist: 'Kendrick Lamar, Drake, Missy Elliott', category: 'genre', subcategory: 'Hip-Hop' },
  { id: 'g-4', title: 'R&B & Soul', artist: 'SZA, The Weeknd, Stevie Wonder', category: 'genre', subcategory: 'R&B' },
  { id: 'g-5', title: 'Electronic & EDM', artist: 'Daft Punk, Calvin Harris, Avicii', category: 'genre', subcategory: 'EDM' },
  { id: 'g-6', title: 'Country & Americana', artist: 'Luke Combs, Dolly Parton, Chris Stapleton', category: 'genre', subcategory: 'Country' },
  { id: 'g-7', title: 'K-Pop Global Hits', artist: 'BTS, BLACKPINK, NewJeans', category: 'genre', subcategory: 'K-Pop' },
  { id: 'g-8', title: 'Latin & Reggaeton', artist: 'Bad Bunny, Rosalía, J Balvin', category: 'genre', subcategory: 'Latin' },
  { id: 'g-9', title: 'Indie & Alternative', artist: 'Tame Impala, Phoebe Bridgers, Hozier', category: 'genre', subcategory: 'Indie' },

  // DECADES
  { id: 'd-1', title: 'Bohemian Rhapsody', artist: 'Queen', category: 'decade', decade: '1970s' },
  { id: 'd-2', title: 'Stayin\' Alive', artist: 'Bee Gees', category: 'decade', decade: '1970s' },
  { id: 'd-3', title: 'Sweet Child O\' Mine', artist: 'Guns N\' Roses', category: 'decade', decade: '1980s' },
  { id: 'd-4', title: 'Billie Jean', artist: 'Michael Jackson', category: 'decade', decade: '1980s' },
  { id: 'd-5', title: 'Smells Like Teen Spirit', artist: 'Nirvana', category: 'decade', decade: '1990s' },
  { id: 'd-6', title: 'Wannabe', artist: 'Spice Girls', category: 'decade', decade: '1990s' },
  { id: 'd-7', title: 'Crazy in Love', artist: 'Beyoncé ft. Jay-Z', category: 'decade', decade: '2000s' },
  { id: 'd-8', title: 'Mr. Brightside', artist: 'The Killers', category: 'decade', decade: '2000s' },
  { id: 'd-9', title: 'Uptown Funk', artist: 'Mark Ronson ft. Bruno Mars', category: 'decade', decade: '2010s' },
  { id: 'd-10', title: 'Rolling in the Deep', artist: 'Adele', category: 'decade', decade: '2010s' },
  { id: 'd-11', title: 'Blinding Lights', artist: 'The Weeknd', category: 'decade', decade: '2020s' },
  { id: 'd-12', title: 'As It Was', artist: 'Harry Styles', category: 'decade', decade: '2020s' },

  // MOODS
  { id: 'm-1', title: 'Eye of the Tiger', artist: 'Survivor', category: 'mood', subcategory: 'High Energy & Workout' },
  { id: 'm-2', title: 'Can\'t Stop the Feeling!', artist: 'Justin Timberlake', category: 'mood', subcategory: 'Feel-Good Party' },
  { id: 'm-3', title: 'Sunflower', artist: 'Post Malone & Swae Lee', category: 'mood', subcategory: 'Chill & Relaxed' },
  { id: 'm-4', title: 'Nightcall', artist: 'Kavinsky', category: 'mood', subcategory: 'Late Night Drive' },
  { id: 'm-5', title: 'Fast Car', artist: 'Tracy Chapman / Luke Combs', category: 'mood', subcategory: 'Melancholy & Acoustic' },
  { id: 'm-6', title: 'Shut Up and Dance', artist: 'WALK THE MOON', category: 'mood', subcategory: 'Feel-Good Party' },

  // KARAOKE MODE
  { id: 'k-1', title: 'Don\'t Stop Believin\'', artist: 'Journey', category: 'karaoke', karaokeNote: 'Ultimate crowd sing-along!' },
  { id: 'k-2', title: 'I Will Always Love You', artist: 'Whitney Houston', category: 'karaoke', karaokeNote: 'Vocal power test!' },
  { id: 'k-3', title: 'Shallow', artist: 'Lady Gaga & Bradley Cooper', category: 'karaoke', karaokeNote: 'Best duet showcase!' },
  { id: 'k-4', title: 'I Want It That Way', artist: 'Backstreet Boys', category: 'karaoke', karaokeNote: 'Boyband harmony challenge!' },
  { id: 'k-5', title: 'Sweet Caroline', artist: 'Neil Diamond', category: 'karaoke', karaokeNote: 'Instant pub favorite!' },
  { id: 'k-6', title: 'Dancing Queen', artist: 'ABBA', category: 'karaoke', karaokeNote: 'Dancefloor classic!' },

  // SONG CHALLENGES
  { id: 'c-1', title: 'Chorus Relay', category: 'challenge', challengePrompt: '🎤 Sing the chorus of the winning song from memory without looking up lyrics!' },
  { id: 'c-2', title: 'Decade Trivia', category: 'challenge', challengePrompt: '📅 Name the exact release year and artist for the selected track!' },
  { id: 'c-3', title: 'A Cappella Pitch', category: 'challenge', challengePrompt: '🎵 Sing 15 seconds of the verse with zero instrument backing!' },
  { id: 'c-4', title: 'Humming Mystery', category: 'challenge', challengePrompt: '🤫 Hum the melody to your group. First person to guess gets 10 points!' },
  { id: 'c-5', title: 'Artist Discography', category: 'challenge', challengePrompt: '🧠 Name 3 other hit songs created by the same artist!' },

  // ARTISTS
  { id: 'a-1', title: 'Taylor Swift', artist: 'Pop / Country Icon', category: 'artists' },
  { id: 'a-2', title: 'The Weeknd', artist: 'R&B / Synthwave Superstar', category: 'artists' },
  { id: 'a-3', title: 'Queen', artist: 'Legendary British Rock Band', category: 'artists' },
  { id: 'a-4', title: 'Drake', artist: 'Hip-Hop Chart Topper', category: 'artists' },
  { id: 'a-5', title: 'Beyoncé', artist: 'Pop & R&B Royalty', category: 'artists' },
  { id: 'a-6', title: 'Coldplay', artist: 'Global Stadium Rock', category: 'artists' },
  { id: 'a-7', title: 'Bruno Mars', artist: 'Funk & Soul Mastermind', category: 'artists' },
  { id: 'a-8', title: 'Daft Punk', artist: 'Electronic Dance Pioneers', category: 'artists' }
];

export const SONG_PRACTICE_TIPS = [
  'Use custom mode to paste your personal Spotify or Apple Music playlist titles.',
  'Turn on Karaoke Mode during party gatherings for hilarious group sing-alongs.',
  'Filter by Decades to organize retro music trivia nights.'
];
