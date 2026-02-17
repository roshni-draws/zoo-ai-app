export interface EventFull {
  id: string;
  name: string;
  time: string;
  endTime: string;
  location: string;
  zone: string;
  type: 'talk' | 'feeding' | 'show' | 'workshop' | 'tour';
  icon: string;
  duration: string;
  description: string;
  gallery: string[];
  facts: string[];
  faq: { question: string; answer: string }[];
  capacity: number;
  spotsLeft: number;
  recurring: boolean;
  date: string;
}

export const eventsExtended: EventFull[] = [
  {
    id: 'e1',
    name: 'Elephant Keeper Talk',
    time: '10:15 AM',
    endTime: '10:35 AM',
    location: 'Elephant Yard Viewing Deck',
    zone: 'Wonders of the Wild',
    type: 'talk',
    icon: '🎤',
    duration: '20 min',
    description:
      'Join our senior keeper Sarah as she shares stories about Tembo and the herd. Learn about their daily care routines, enrichment activities, and the zoo\'s conservation partnerships in Kenya.',
    gallery: [
      'https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1564760055775-d63b17a55c44?w=600&h=400&fit=crop',
    ],
    facts: [
      'Tembo eats 200 lbs of food every day',
      'Elephants mourn their dead and visit grave sites',
      'Their trunks contain over 40,000 muscles',
    ],
    faq: [
      { question: 'Can I take photos?', answer: 'Yes! Photos and videos are welcome. Flash photography is not permitted.' },
      { question: 'Is there seating?', answer: 'Limited bench seating is available. Arrive 10 minutes early for best spots.' },
      { question: 'Is this wheelchair accessible?', answer: 'Yes, the viewing deck is fully accessible with ramp access.' },
    ],
    capacity: 60,
    spotsLeft: 23,
    recurring: true,
    date: '2026-02-17',
  },
  {
    id: 'e2',
    name: 'Sea Lion Splash Show',
    time: '11:00 AM',
    endTime: '11:30 AM',
    location: 'Sea Lion Amphitheatre',
    zone: 'Blue Planet Wonders',
    type: 'show',
    icon: '🦭',
    duration: '30 min',
    description:
      'Watch Clyde and his companions show off their incredible agility, intelligence, and playful personality in our signature aquatic show. Splash zone seating available!',
    gallery: [
      'https://images.unsplash.com/photo-1580052614034-c55d20bfee3b?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1517423738875-5ce310acd3da?w=600&h=400&fit=crop',
    ],
    facts: [
      'Sea lions can hold their breath for up to 20 minutes',
      'Clyde can balance a ball on his nose for 45 seconds',
      'Sea lions communicate with over 10 different vocalizations',
    ],
    faq: [
      { question: 'Will I get wet?', answer: 'The first 3 rows are splash zones! Ponchos are available at the gift shop.' },
      { question: 'How early should I arrive?', answer: 'We recommend arriving 15-20 minutes early. This is our most popular show.' },
    ],
    capacity: 200,
    spotsLeft: 67,
    recurring: true,
    date: '2026-02-17',
  },
  {
    id: 'e3',
    name: 'Birds of Prey Flight Demo',
    time: '1:30 PM',
    endTime: '2:00 PM',
    location: 'Sky Amphitheatre',
    zone: 'Wings of the Sky',
    type: 'show',
    icon: '🦅',
    duration: '30 min',
    description:
      'Experience the thrill of eagles, hawks, and owls soaring just inches overhead. Our expert falconers demonstrate hunting techniques and share the remarkable stories of these rescued raptors.',
    gallery: [
      'https://images.unsplash.com/photo-1611689342806-0863700ce8e4?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1521651201144-634f700b36ef?w=600&h=400&fit=crop',
    ],
    facts: [
      'Bald eagles can spot a rabbit from 2 miles away',
      'Owls can rotate their heads 270 degrees',
      'Peregrine falcons dive at over 240 mph',
    ],
    faq: [
      { question: 'Will the birds fly near the audience?', answer: 'Yes! Birds fly just above the audience. Stay seated for safety.' },
      { question: 'Is this suitable for small children?', answer: 'Yes, children of all ages enjoy this show. Loud sounds may startle very young children.' },
    ],
    capacity: 150,
    spotsLeft: 42,
    recurring: true,
    date: '2026-02-17',
  },
  {
    id: 'e4',
    name: 'Penguin Feeding Time',
    time: '2:00 PM',
    endTime: '2:15 PM',
    location: 'Penguin Beach',
    zone: 'Blue Planet Wonders',
    type: 'feeding',
    icon: '🐟',
    duration: '15 min',
    description:
      'Watch our colony of 35 African penguins dive and compete for their afternoon fish. Keepers narrate each penguin\'s personality and share conservation updates.',
    gallery: [
      'https://images.unsplash.com/photo-1551986782-d0169b3f8fa7?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1462888210965-bddf7ba7f5e5?w=600&h=400&fit=crop',
    ],
    facts: [
      'Each penguin eats about 1 lb of fish per day',
      'Penguins can recognize their mate by voice alone',
      'Pip is the fastest swimmer in the colony',
    ],
    faq: [
      { question: 'Can I feed the penguins?', answer: 'Feeding is handled by trained keepers only, for the animals\' safety.' },
      { question: 'Where is the best viewing spot?', answer: 'The underwater viewing window gives the best angle during feeding.' },
    ],
    capacity: 80,
    spotsLeft: 31,
    recurring: true,
    date: '2026-02-17',
  },
  {
    id: 'e5',
    name: 'Gorilla Keeper Talk',
    time: '3:00 PM',
    endTime: '3:20 PM',
    location: 'Gorilla Observation Deck',
    zone: 'Wonders of the Wild',
    type: 'talk',
    icon: '🎤',
    duration: '20 min',
    description:
      'Meet the gorilla family up close as our primate team discusses Koga\'s role as silverback, the group\'s social dynamics, and groundbreaking gorilla conservation work in the Congo.',
    gallery: [
      'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?w=600&h=400&fit=crop',
    ],
    facts: [
      'Gorillas share 98.3% of DNA with humans',
      'Koga can use simple sign language with keepers',
      'Baby gorilla Amara was born here last spring',
    ],
    faq: [
      { question: 'Why is the glass tinted?', answer: 'Tinted glass reduces stress for the gorillas by limiting direct eye contact with visitors.' },
      { question: 'Can gorillas see us?', answer: 'Yes, but the tinted glass makes visitors appear less threatening to them.' },
    ],
    capacity: 45,
    spotsLeft: 12,
    recurring: true,
    date: '2026-02-17',
  },
  {
    id: 'e6',
    name: 'Butterfly Release Workshop',
    time: '10:30 AM',
    endTime: '11:15 AM',
    location: 'Butterfly House',
    zone: 'Secret Life of Small Things',
    type: 'workshop',
    icon: '🦋',
    duration: '45 min',
    description:
      'Help release newly emerged butterflies into the tropical house. Learn about metamorphosis, pollination, and how to create a butterfly garden at home. Each participant gets a milkweed seed packet.',
    gallery: [
      'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=600&h=400&fit=crop',
    ],
    facts: [
      'A monarch caterpillar increases its body mass 2,000 times',
      'Butterflies taste with their feet',
      'Our house hatches about 30 butterflies per week',
    ],
    faq: [
      { question: 'Is this suitable for children?', answer: 'Perfect for ages 5+. Younger children can observe with a parent.' },
      { question: 'Do I need to pre-book?', answer: 'Pre-booking is recommended as this workshop fills quickly.' },
    ],
    capacity: 25,
    spotsLeft: 8,
    recurring: true,
    date: '2026-02-17',
  },
  {
    id: 'e7',
    name: 'Reptile Encounter',
    time: '3:00 PM',
    endTime: '3:30 PM',
    location: 'Reptile Touch Station',
    zone: 'Realm of Reptiles',
    type: 'workshop',
    icon: '🐍',
    duration: '30 min',
    description:
      'Get hands-on with some of our ambassador reptiles. Touch a blue-tongued skink, hold a corn snake, and learn why these misunderstood creatures are vital to ecosystems worldwide.',
    gallery: [
      'https://images.unsplash.com/photo-1531386151447-fd76ad50012f?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1504450874802-0ba2bcd659e0?w=600&h=400&fit=crop',
    ],
    facts: [
      'Reptiles have been on Earth for over 300 million years',
      'Snakes smell with their tongues',
      'Komodo dragons can eat 80% of their body weight in one meal',
    ],
    faq: [
      { question: 'Is it safe to touch the animals?', answer: 'All ambassador animals are calm, healthy, and accustomed to gentle handling.' },
      { question: 'Can my toddler participate?', answer: 'Children under 3 can look but may not hold animals, for safety reasons.' },
    ],
    capacity: 30,
    spotsLeft: 15,
    recurring: true,
    date: '2026-02-17',
  },
  {
    id: 'e8',
    name: 'Flamingo Feeding',
    time: '11:30 AM',
    endTime: '11:45 AM',
    location: 'Flamingo Lagoon',
    zone: 'Wings of the Sky',
    type: 'feeding',
    icon: '🦩',
    duration: '15 min',
    description:
      'Watch our flock of 35 Chilean flamingos enjoy their midday meal. Learn why flamingos stand on one leg and how their diet creates that iconic pink plumage.',
    gallery: [
      'https://images.unsplash.com/photo-1497206365907-f5e630693df0?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?w=600&h=400&fit=crop',
    ],
    facts: [
      'Flamingo chicks are born white or grey',
      'They can only eat with their heads upside down',
      'A group of flamingos is called a "flamboyance"',
    ],
    faq: [
      { question: 'Can I feed them?', answer: 'Visitors can purchase small feeding cups at the gift kiosk nearby.' },
    ],
    capacity: 50,
    spotsLeft: 38,
    recurring: true,
    date: '2026-02-17',
  },
  {
    id: 'e9',
    name: 'Behind-the-Scenes Safari Tour',
    time: '9:00 AM',
    endTime: '10:30 AM',
    location: 'Main Gate (Meeting Point)',
    zone: 'Wonders of the Wild',
    type: 'tour',
    icon: '🚐',
    duration: '90 min',
    description:
      'Exclusive small-group tour of off-exhibit areas, veterinary facilities, and keeper prep kitchens. Meet animals you won\'t see on the regular path and learn what goes on behind the scenes.',
    gallery: [
      'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=600&h=400&fit=crop',
    ],
    facts: [
      'Our kitchen prepares 4,000 lbs of food daily',
      'The veterinary hospital has an MRI for large animals',
      'Behind-the-scenes areas are 3x larger than public exhibits',
    ],
    faq: [
      { question: 'What age is this suitable for?', answer: 'Recommended for ages 8+. Children must be accompanied by an adult.' },
      { question: 'Is this included in admission?', answer: 'No, this is a premium experience at $45/person. Book in advance.' },
      { question: 'What should I wear?', answer: 'Closed-toe shoes required. Sun protection recommended.' },
    ],
    capacity: 15,
    spotsLeft: 4,
    recurring: true,
    date: '2026-02-17',
  },
  {
    id: 'e10',
    name: 'Night Safari Experience',
    time: '6:30 PM',
    endTime: '8:30 PM',
    location: 'Main Gate (Meeting Point)',
    zone: 'Wonders of the Wild',
    type: 'tour',
    icon: '🌙',
    duration: '120 min',
    description:
      'Experience the zoo after dark! Guided tour with night-vision equipment to observe nocturnal behaviors. See animals you\'d never spot during the day. Includes hot cocoa and cookies.',
    gallery: [
      'https://images.unsplash.com/photo-1504173010664-32509aeebb62?w=600&h=400&fit=crop',
    ],
    facts: [
      'Many animals are most active at dusk and dawn',
      'Our big cats are 3x more active after dark',
      'Owls begin hunting as soon as the sun sets',
    ],
    faq: [
      { question: 'Is it scary for kids?', answer: 'It is magical, not scary! Recommended for ages 6+. Flashlights provided.' },
      { question: 'What if it rains?', answer: 'Tours run rain or shine. Ponchos provided. Full refund for severe weather cancellations.' },
      { question: 'How much does it cost?', answer: '$55 per adult, $35 per child (ages 6-12). Members get 20% off.' },
    ],
    capacity: 25,
    spotsLeft: 9,
    recurring: false,
    date: '2026-02-21',
  },
];

export const eventFilters = [
  { id: 'all', label: 'All Events', icon: '📋' },
  { id: 'talk', label: 'Keeper Talks', icon: '🎤' },
  { id: 'feeding', label: 'Feedings', icon: '🐟' },
  { id: 'show', label: 'Shows', icon: '🎪' },
  { id: 'workshop', label: 'Workshops', icon: '🔬' },
  { id: 'tour', label: 'Tours', icon: '🚐' },
];
