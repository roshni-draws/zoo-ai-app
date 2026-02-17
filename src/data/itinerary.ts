export interface TourStop {
  id: string;
  name: string;
  emoji: string;
  time: string;
  duration: string;
  zone: string;
  type: 'exhibit' | 'dining' | 'show' | 'break' | 'activity';
  insight: string;
  priority: 'must-see' | 'recommended' | 'optional';
  walkTimeToNext: string;
  completed: boolean;
}

export interface TourPreferences {
  pace: 'relaxed' | 'moderate' | 'active';
  interests: string[];
  groupType: 'solo' | 'couple' | 'family' | 'friends' | 'school-group';
  accessibility: ('wheelchair' | 'stroller' | 'low-mobility' | 'sensory-friendly')[];
  duration: '2-hours' | 'half-day' | 'full-day';
  dining: 'pack-lunch' | 'quick-service' | 'sit-down' | 'none';
}

export const paceOptions = [
  { id: 'relaxed', label: 'Relaxed', description: 'Plenty of rest stops, shorter distances', icon: '🐢' },
  { id: 'moderate', label: 'Moderate', description: 'Balanced pace with some breaks', icon: '🚶' },
  { id: 'active', label: 'Active', description: 'Cover maximum ground, power walk between exhibits', icon: '🏃' },
];

export const groupTypeOptions = [
  { id: 'solo', label: 'Solo', icon: '🧑' },
  { id: 'couple', label: 'Couple', icon: '💑' },
  { id: 'family', label: 'Family', icon: '👨‍👩‍👧‍👦' },
  { id: 'friends', label: 'Friends', icon: '👯' },
  { id: 'school-group', label: 'School Group', icon: '🏫' },
];

export const durationOptions = [
  { id: '2-hours', label: '2 Hours', description: 'Quick highlights tour' },
  { id: 'half-day', label: 'Half Day', description: '3-4 hours of exploration' },
  { id: 'full-day', label: 'Full Day', description: '6+ hours — see it all' },
];

export const interestOptions = [
  { id: 'big-cats', label: 'Big Cats', icon: '🦁' },
  { id: 'marine-life', label: 'Marine Life', icon: '🐙' },
  { id: 'primates', label: 'Primates', icon: '🦍' },
  { id: 'birds', label: 'Birds', icon: '🦜' },
  { id: 'reptiles', label: 'Reptiles', icon: '🦎' },
  { id: 'insects', label: 'Insects', icon: '🦋' },
  { id: 'conservation', label: 'Conservation', icon: '🌍' },
  { id: 'photography', label: 'Photography', icon: '📸' },
  { id: 'shows', label: 'Shows & Talks', icon: '🎪' },
  { id: 'kids-activities', label: 'Kids Activities', icon: '🧒' },
];

export const accessibilityOptions = [
  { id: 'wheelchair', label: 'Wheelchair', icon: '♿' },
  { id: 'stroller', label: 'Stroller', icon: '👶' },
  { id: 'low-mobility', label: 'Low Mobility', icon: '🦯' },
  { id: 'sensory-friendly', label: 'Sensory-Friendly', icon: '🧏' },
];

export const diningOptions = [
  { id: 'pack-lunch', label: 'Packed Lunch', icon: '🧺' },
  { id: 'quick-service', label: 'Quick Service', icon: '🍟' },
  { id: 'sit-down', label: 'Sit-Down Restaurant', icon: '🍽️' },
  { id: 'none', label: 'No Dining', icon: '⏭️' },
];

export const defaultTourStops: TourStop[] = [
  {
    id: 'ts-1',
    name: 'African Lion',
    emoji: '🦁',
    time: '9:15 AM',
    duration: '15 min',
    zone: 'Wonders of the Wild',
    type: 'exhibit',
    insight: 'Best viewing window — lions most active in the morning cool',
    priority: 'must-see',
    walkTimeToNext: '4 min',
    completed: false,
  },
  {
    id: 'ts-2',
    name: 'Giraffe Feeding Experience',
    emoji: '🦒',
    time: '9:34 AM',
    duration: '20 min',
    zone: 'Wonders of the Wild',
    type: 'activity',
    insight: 'Feeding platform opens at 9:30 — arrive early for shortest wait',
    priority: 'must-see',
    walkTimeToNext: '6 min',
    completed: false,
  },
  {
    id: 'ts-3',
    name: 'Elephant Keeper Talk',
    emoji: '🐘',
    time: '10:00 AM',
    duration: '20 min',
    zone: 'Wonders of the Wild',
    type: 'show',
    insight: 'Keeper Sarah gives the most engaging talk — don\'t miss the trunk painting demo',
    priority: 'must-see',
    walkTimeToNext: '8 min',
    completed: false,
  },
  {
    id: 'ts-4',
    name: 'Lunch at Bamboo Kitchen',
    emoji: '🍜',
    time: '10:28 AM',
    duration: '45 min',
    zone: 'Habitats of the Earth',
    type: 'dining',
    insight: 'Beat the lunch rush by eating early. Try the Panda Ramen Bowl!',
    priority: 'recommended',
    walkTimeToNext: '5 min',
    completed: false,
  },
  {
    id: 'ts-5',
    name: 'Giant Panda & Red Panda',
    emoji: '🐼',
    time: '11:18 AM',
    duration: '25 min',
    zone: 'Habitats of the Earth',
    type: 'exhibit',
    insight: 'Mei is usually eating bamboo at this time — great photo opportunity',
    priority: 'must-see',
    walkTimeToNext: '10 min',
    completed: false,
  },
  {
    id: 'ts-6',
    name: 'Sea Lion Splash Show',
    emoji: '🦭',
    time: '11:53 AM',
    duration: '30 min',
    zone: 'Blue Planet Wonders',
    type: 'show',
    insight: 'Sit in rows 4-6 for the best view without getting splashed',
    priority: 'must-see',
    walkTimeToNext: '3 min',
    completed: false,
  },
  {
    id: 'ts-7',
    name: 'Penguin Beach',
    emoji: '🐧',
    time: '12:26 PM',
    duration: '15 min',
    zone: 'Blue Planet Wonders',
    type: 'exhibit',
    insight: 'Head to the underwater viewing window — penguins are most active after the sea lion show energy',
    priority: 'recommended',
    walkTimeToNext: '7 min',
    completed: false,
  },
  {
    id: 'ts-8',
    name: 'Butterfly House',
    emoji: '🦋',
    time: '12:48 PM',
    duration: '20 min',
    zone: 'Secret Life of Small Things',
    type: 'exhibit',
    insight: 'Wear something brightly colored — butterflies may land on you!',
    priority: 'recommended',
    walkTimeToNext: '0 min',
    completed: false,
  },
];
