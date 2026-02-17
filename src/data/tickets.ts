export interface TicketType {
  id: string;
  name: string;
  description: string;
  adultPrice: number;
  childPrice: number;
  seniorPrice: number;
  features: string[];
  popular?: boolean;
  color: string;
  icon: string;
  validDays: string;
  restrictions?: string;
}

export interface TicketAddon {
  id: string;
  name: string;
  description: string;
  price: number;
  icon: string;
  category: 'experience' | 'convenience' | 'dining';
}

export const ticketTypes: TicketType[] = [
  {
    id: 'general',
    name: 'General Admission',
    description: 'Full access to all public exhibits, shows, and daily events. Perfect for a casual visit to explore the zoo at your own pace.',
    adultPrice: 62,
    childPrice: 52,
    seniorPrice: 57,
    features: [
      'Access to all 6 zones',
      'All scheduled shows and talks',
      'Interactive map with live updates',
      'Free shuttle service',
    ],
    color: '#2D6A4F',
    icon: '🎟️',
    validDays: 'Single day',
  },
  {
    id: 'group',
    name: 'Group Package',
    description: 'Save 20% for groups of 10 or more. Includes a dedicated group entry lane and a complimentary group photo at the entrance.',
    adultPrice: 49,
    childPrice: 42,
    seniorPrice: 46,
    features: [
      'Everything in General Admission',
      '20% group discount',
      'Dedicated group entry lane',
      'Complimentary group photo',
      'Group coordinator contact',
    ],
    color: '#1B4965',
    icon: '👥',
    validDays: 'Single day',
    restrictions: 'Minimum 10 guests. Must book 48 hours in advance.',
  },
  {
    id: 'educational',
    name: 'Educational Visit',
    description: 'Designed for school groups and homeschool co-ops. Includes grade-appropriate learning packets, a guided tour, and access to the education center.',
    adultPrice: 42,
    childPrice: 32,
    seniorPrice: 42,
    features: [
      'Everything in General Admission',
      'Guided educational tour (90 min)',
      'Grade-appropriate learning packets',
      'Education center access',
      'Teacher resources & lesson plans',
      'One free chaperone per 10 students',
    ],
    color: '#6B4E71',
    icon: '📚',
    validDays: 'Weekdays only',
    restrictions: 'School groups only. Teacher verification required. Must book 1 week in advance.',
  },
  {
    id: 'premier',
    name: 'Premier Experience',
    description: 'The ultimate zoo day. Skip all lines, enjoy backstage access, a gourmet lunch, and an exclusive keeper encounter. Limited to 50 guests per day.',
    adultPrice: 149,
    childPrice: 119,
    seniorPrice: 139,
    features: [
      'Everything in General Admission',
      'Skip-the-line access at all exhibits',
      'One backstage animal encounter',
      'Gourmet lunch at Savanna Grill',
      'Complimentary buggy transport',
      'Souvenir gift bag',
      'Priority seating at all shows',
      'Dedicated concierge support',
    ],
    popular: true,
    color: '#C9A84C',
    icon: '👑',
    validDays: 'Any day',
    restrictions: 'Limited to 50 guests per day. Advance booking required.',
  },
];

export const ticketAddons: TicketAddon[] = [
  {
    id: 'addon-photo',
    name: 'Unlimited Photo Pass',
    description: 'Download all professional photos taken during your visit at any photo station across the zoo.',
    price: 24.99,
    icon: '📸',
    category: 'convenience',
  },
  {
    id: 'addon-feeding',
    name: 'Animal Feeding Bundle',
    description: 'Includes giraffe feeding, flamingo feeding, and lorikeet nectar cup tokens. One per person.',
    price: 18.99,
    icon: '🦒',
    category: 'experience',
  },
  {
    id: 'addon-meal',
    name: 'All-Day Meal Deal',
    description: 'One entree, one side, and one drink at any zoo restaurant. Redeemable once per meal period (lunch and dinner).',
    price: 34.99,
    icon: '🍽️',
    category: 'dining',
  },
  {
    id: 'addon-buggy',
    name: 'Mobility Buggy Rental',
    description: 'Full-day electric buggy rental with driver for up to 4 guests. Great for families with young children or mobility needs.',
    price: 35.00,
    icon: '🚗',
    category: 'convenience',
  },
  {
    id: 'addon-audio',
    name: 'Audio Guide',
    description: 'Narrated audio tour with 50+ stops covering animals, conservation stories, and behind-the-scenes insights. Available in 6 languages.',
    price: 9.99,
    icon: '🎧',
    category: 'experience',
  },
];
