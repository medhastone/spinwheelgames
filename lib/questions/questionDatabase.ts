export type QuestionMode = 'trivia' | 'icebreakers' | 'classroom' | 'party' | 'conversation' | 'interview' | 'kids' | 'custom';
export type QuestionDifficulty = 'easy' | 'medium' | 'hard';

export interface QuestionEntry {
  id: string;
  text: string;
  mode: QuestionMode;
  category: string;
  difficulty: QuestionDifficulty;
  hintOrAnswer?: string;
}

export const QUESTION_DATABASE: QuestionEntry[] = [
  // TRIVIA MODE
  { id: 't-1', text: 'What is the largest organ in the human body?', mode: 'trivia', category: 'Science', difficulty: 'easy', hintOrAnswer: 'The Skin' },
  { id: 't-2', text: 'Which planet has the most moons in our Solar System?', mode: 'trivia', category: 'Astronomy', difficulty: 'medium', hintOrAnswer: 'Saturn (146+ moons)' },
  { id: 't-3', text: 'What element has the chemical symbol "Au"?', mode: 'trivia', category: 'Chemistry', difficulty: 'easy', hintOrAnswer: 'Gold' },
  { id: 't-4', text: 'In which year did the Titanic sink?', mode: 'trivia', category: 'History', difficulty: 'medium', hintOrAnswer: '1912' },
  { id: 't-5', text: 'What is the hardest natural substance on Earth?', mode: 'trivia', category: 'Geology', difficulty: 'hard', hintOrAnswer: 'Diamond (or Lonsdaleite)' },

  // ICEBREAKERS MODE
  { id: 'i-1', text: 'If you could instantly become an expert in one subject, what would it be?', mode: 'icebreakers', category: 'Get to Know You', difficulty: 'easy' },
  { id: 'i-2', text: 'What is your favorite comfort food on a rainy day?', mode: 'icebreakers', category: 'Food & Lifestyle', difficulty: 'easy' },
  { id: 'i-3', text: 'What is the most memorable travel trip you have ever taken?', mode: 'icebreakers', category: 'Travel', difficulty: 'medium' },
  { id: 'i-4', text: 'If you had to listen to one artist for the rest of your life, who would it be?', mode: 'icebreakers', category: 'Music & Culture', difficulty: 'medium' },
  { id: 'i-5', text: 'What is a small habit that instantly brightens your day?', mode: 'icebreakers', category: 'Mindset', difficulty: 'easy' },

  // CLASSROOM MODE
  { id: 'c-1', text: 'Can you summarize what we learned today in 3 key words?', mode: 'classroom', category: 'Review & Recap', difficulty: 'easy' },
  { id: 'c-2', text: 'How does this scientific concept apply to real life outside of school?', mode: 'classroom', category: 'Critical Thinking', difficulty: 'medium' },
  { id: 'c-3', text: 'What is one question you still have about this topic?', mode: 'classroom', category: 'Reflection', difficulty: 'easy' },
  { id: 'c-4', text: 'If you were teaching this lesson to a younger student, how would you explain it?', mode: 'classroom', category: 'Teaching Back', difficulty: 'hard' },
  { id: 'c-5', text: 'Share one compliment with a classmate seated near you.', mode: 'classroom', category: 'Class Culture', difficulty: 'easy' },

  // PARTY MODE
  { id: 'p-1', text: 'What is the funniest or most embarrassing thing that happened to you recently?', mode: 'party', category: 'Humor & Stories', difficulty: 'medium' },
  { id: 'p-2', text: 'If you won $1,000 right now, what would you spend it on within 1 hour?', mode: 'party', category: 'Fun Hypotheticals', difficulty: 'easy' },
  { id: 'p-3', text: 'What song immediately gets you onto the dance floor?', mode: 'party', category: 'Music & Fun', difficulty: 'easy' },
  { id: 'p-4', text: 'Who in this room would be the most likely to survive a zombie apocalypse?', mode: 'party', category: 'Group Debate', difficulty: 'medium' },
  { id: 'p-5', text: 'What is your guilty pleasure movie or TV show?', mode: 'party', category: 'Pop Culture', difficulty: 'easy' },

  // CONVERSATION MODE
  { id: 'conv-1', text: 'What is a core value or belief that shapes how you make decisions?', mode: 'conversation', category: 'Deep Values', difficulty: 'hard' },
  { id: 'conv-2', text: 'What advice would you give your 18-year-old self?', mode: 'conversation', category: 'Reflection', difficulty: 'medium' },
  { id: 'conv-3', text: 'What is a book, film, or podcast that genuinely changed your perspective?', mode: 'conversation', category: 'Inspiration', difficulty: 'medium' },
  { id: 'conv-4', text: 'What accomplishment are you most proud of over the last 12 months?', mode: 'conversation', category: 'Growth', difficulty: 'medium' },

  // INTERVIEW MODE
  { id: 'int-1', text: 'Tell me about a time you faced a difficult challenge at work and how you solved it.', mode: 'interview', category: 'Behavioral', difficulty: 'medium' },
  { id: 'int-2', text: 'How do you handle tight deadlines and competing priorities under pressure?', mode: 'interview', category: 'Workplace Skills', difficulty: 'medium' },
  { id: 'int-3', text: 'What is your biggest professional strength, and how do you leverage it?', mode: 'interview', category: 'Self Awareness', difficulty: 'easy' },
  { id: 'int-4', text: 'Describe a situation where you had a conflict with a teammate. How was it resolved?', mode: 'interview', category: 'Leadership & Teamwork', difficulty: 'hard' },

  // KIDS MODE
  { id: 'k-1', text: 'If you could have any superpower for one day, what would it be?', mode: 'kids', category: 'Superheroes', difficulty: 'easy' },
  { id: 'k-2', text: 'What animal would be the most fun to talk to if animals could speak?', mode: 'kids', category: 'Animals', difficulty: 'easy' },
  { id: 'k-3', text: 'If you could build a house out of candy, what candy would you use for the roof?', mode: 'kids', category: 'Imagination', difficulty: 'easy' },
  { id: 'k-4', text: 'What is your favorite game to play at recess?', mode: 'kids', category: 'School & Play', difficulty: 'easy' },
  { id: 'k-5', text: 'If you invented a new ice cream flavor, what would be in it?', mode: 'kids', category: 'Fun', difficulty: 'easy' }
];
