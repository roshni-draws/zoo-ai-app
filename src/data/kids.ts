export interface KidsWorksheet {
  id: string;
  title: string;
  description: string;
  ageRange: string;
  zone: string;
  type: 'coloring' | 'quiz' | 'scavenger-hunt' | 'matching' | 'word-search';
  icon: string;
  estimatedTime: string;
  difficulty: 'easy' | 'medium' | 'hard';
  questions?: { question: string; answer: string }[];
}

export interface KidsGame {
  id: string;
  name: string;
  description: string;
  type: 'ar' | 'trivia' | 'puzzle' | 'collection';
  icon: string;
  ageRange: string;
  rewardBadge?: string;
  steps: string[];
}

export interface KidsBadge {
  id: string;
  name: string;
  description: string;
  icon: string;
  requirement: string;
  category: 'exploration' | 'learning' | 'conservation' | 'social';
  rarity: 'common' | 'rare' | 'legendary';
  xpReward: number;
}

export const kidsWorksheets: KidsWorksheet[] = [
  {
    id: 'ws-1',
    title: 'African Savanna Coloring Book',
    description: 'Color in the lions, elephants, and giraffes of the African savanna while learning fun facts about each animal.',
    ageRange: '3-6',
    zone: 'Wonders of the Wild',
    type: 'coloring',
    icon: '🎨',
    estimatedTime: '15 min',
    difficulty: 'easy',
  },
  {
    id: 'ws-2',
    title: 'Animal Tracks Scavenger Hunt',
    description: 'Follow animal footprint clues to find 10 hidden stamps throughout the zoo. Collect all stamps to earn a special badge!',
    ageRange: '5-10',
    zone: 'All Zones',
    type: 'scavenger-hunt',
    icon: '🔍',
    estimatedTime: '45 min',
    difficulty: 'medium',
  },
  {
    id: 'ws-3',
    title: 'Who Eats What? Matching Game',
    description: 'Match each animal to its diet. Draw lines connecting the animal to the food it eats — some answers might surprise you!',
    ageRange: '6-9',
    zone: 'Wonders of the Wild',
    type: 'matching',
    icon: '🍎',
    estimatedTime: '10 min',
    difficulty: 'easy',
  },
  {
    id: 'ws-4',
    title: 'Conservation Hero Quiz',
    description: 'Test your knowledge about endangered species and what we can do to help. Score 8/10 to earn the Conservation Hero badge!',
    ageRange: '8-12',
    zone: 'All Zones',
    type: 'quiz',
    icon: '🏆',
    estimatedTime: '10 min',
    difficulty: 'medium',
    questions: [
      { question: 'How many Sumatran tigers remain in the wild?', answer: 'Fewer than 400' },
      { question: 'What is the biggest threat to polar bears?', answer: 'Loss of Arctic sea ice from climate change' },
      { question: 'How much of their DNA do gorillas share with humans?', answer: '98.3%' },
      { question: 'What do flamingos eat that makes them pink?', answer: 'Shrimp and algae containing carotenoid pigments' },
      { question: 'How far do monarch butterflies migrate?', answer: 'Up to 3,000 miles' },
      { question: 'How many hours a day do koalas sleep?', answer: 'Up to 22 hours' },
      { question: 'What is a group of flamingos called?', answer: 'A flamboyance' },
      { question: 'How many muscles are in an elephant trunk?', answer: 'Over 40,000' },
      { question: 'Which animal is the world\'s largest living lizard?', answer: 'The Komodo dragon' },
      { question: 'Why are poison dart frogs brightly colored?', answer: 'To warn predators they are toxic (aposematic coloring)' },
    ],
  },
  {
    id: 'ws-5',
    title: 'Ocean Animals Word Search',
    description: 'Find 15 ocean animals hidden in the word search grid. Circle each one and learn a fun fact about it!',
    ageRange: '7-12',
    zone: 'Blue Planet Wonders',
    type: 'word-search',
    icon: '🔤',
    estimatedTime: '15 min',
    difficulty: 'medium',
  },
  {
    id: 'ws-6',
    title: 'Bug Detective Trail',
    description: 'Explore the insect house with your magnifying glass card and identify 8 different bugs. Sketch what you see in the journal pages.',
    ageRange: '5-9',
    zone: 'Secret Life of Small Things',
    type: 'scavenger-hunt',
    icon: '🐛',
    estimatedTime: '20 min',
    difficulty: 'easy',
  },
];

export const kidsGames: KidsGame[] = [
  {
    id: 'game-1',
    name: 'Zoo AR Animal Finder',
    description: 'Point your phone camera at exhibit signs to unlock 3D animated animals that pop out of the signs! Collect all 20 to complete the challenge.',
    type: 'ar',
    icon: '📱',
    ageRange: '6+',
    rewardBadge: 'AR Explorer',
    steps: [
      'Open the Zoo App and tap "AR Finder"',
      'Point your camera at any exhibit sign with the AR icon',
      'Watch the 3D animal appear and tap to learn facts',
      'Collect all 20 AR animals to unlock a special reward',
    ],
  },
  {
    id: 'game-2',
    name: 'Daily Animal Trivia',
    description: 'Answer 5 questions about today\'s featured animals. Get all 5 right to earn bonus XP and climb the leaderboard!',
    type: 'trivia',
    icon: '🧠',
    ageRange: '7+',
    rewardBadge: 'Trivia Champion',
    steps: [
      'Open the Zoo App and tap "Daily Trivia"',
      'Read each question carefully and pick your answer',
      'Get instant feedback and learn from the explanations',
      'Score 5/5 to earn the Trivia Champion badge',
    ],
  },
  {
    id: 'game-3',
    name: 'Habitat Builder Puzzle',
    description: 'Drag and drop elements to build the perfect habitat for different animals. Learn what each species needs to thrive!',
    type: 'puzzle',
    icon: '🧩',
    ageRange: '5+',
    steps: [
      'Choose an animal to build a habitat for',
      'Drag and drop trees, water, shelter, and food sources',
      'The animal will react to your choices in real time',
      'Build all 6 habitats to become a Master Builder',
    ],
  },
  {
    id: 'game-4',
    name: 'Stamp Collector Challenge',
    description: 'Visit each zone and find the hidden stamp station. Scan the QR code to collect a digital stamp. Complete your passport for a real reward!',
    type: 'collection',
    icon: '📬',
    ageRange: 'All ages',
    rewardBadge: 'Stamp Master',
    steps: [
      'Pick up a stamp passport at the Main Entrance',
      'Find the stamp station in each of the 6 zones',
      'Scan the QR code or use the physical stamp',
      'Return your completed passport to the gift shop for a prize',
    ],
  },
];

export const kidsBadges: KidsBadge[] = [
  {
    id: 'kb-1',
    name: 'First Steps',
    description: 'Visit your first exhibit and scan an animal',
    icon: '👣',
    requirement: 'Scan 1 animal with the app',
    category: 'exploration',
    rarity: 'common',
    xpReward: 10,
  },
  {
    id: 'kb-2',
    name: 'Zone Hopper',
    description: 'Visit all 6 zones in a single day',
    icon: '🗺️',
    requirement: 'Check in at all 6 zones',
    category: 'exploration',
    rarity: 'rare',
    xpReward: 50,
  },
  {
    id: 'kb-3',
    name: 'Trivia Whiz',
    description: 'Score 100% on 3 daily trivia challenges',
    icon: '🧠',
    requirement: 'Perfect score on 3 trivia games',
    category: 'learning',
    rarity: 'rare',
    xpReward: 40,
  },
  {
    id: 'kb-4',
    name: 'Conservation Champ',
    description: 'Complete the Conservation Hero quiz with 8+ correct',
    icon: '🌍',
    requirement: 'Score 8/10 on Conservation Hero Quiz',
    category: 'conservation',
    rarity: 'common',
    xpReward: 30,
  },
  {
    id: 'kb-5',
    name: 'Social Butterfly',
    description: 'Share 3 animal facts with friends or family using the app',
    icon: '🦋',
    requirement: 'Use the share feature 3 times',
    category: 'social',
    rarity: 'common',
    xpReward: 15,
  },
  {
    id: 'kb-6',
    name: 'Stamp Master',
    description: 'Collect all 6 zone stamps in your passport',
    icon: '📬',
    requirement: 'Complete the stamp passport',
    category: 'exploration',
    rarity: 'rare',
    xpReward: 60,
  },
  {
    id: 'kb-7',
    name: 'Animal Whisperer',
    description: 'Scan and learn about 20 different animals',
    icon: '🔍',
    requirement: 'Scan 20 unique animals',
    category: 'learning',
    rarity: 'rare',
    xpReward: 50,
  },
  {
    id: 'kb-8',
    name: 'Legendary Explorer',
    description: 'Earn all other badges to unlock this ultimate achievement',
    icon: '👑',
    requirement: 'Earn all 7 other badges',
    category: 'exploration',
    rarity: 'legendary',
    xpReward: 100,
  },
];
