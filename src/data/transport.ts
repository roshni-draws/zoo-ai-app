export interface ShuttleRoute {
  id: string;
  name: string;
  color: string;
  stops: { name: string; zone: string; arrivalInterval: string }[];
  frequency: string;
  hours: string;
  accessible: boolean;
  capacity: number;
  description: string;
}

export interface BuggyOption {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: string;
  capacity: number;
  features: string[];
  image: string;
  available: boolean;
}

export interface SafariTour {
  id: string;
  name: string;
  description: string;
  price: number;
  childPrice: number;
  duration: string;
  maxGroup: number;
  image: string;
  highlights: string[];
  itinerary: { time: string; stop: string; description: string; duration: string }[];
  includes: string[];
  departureTimes: string[];
  rating: number;
  reviewCount: number;
}

export const shuttleRoutes: ShuttleRoute[] = [
  {
    id: 'shuttle-green',
    name: 'Green Loop',
    color: '#2D6A4F',
    stops: [
      { name: 'Main Entrance', zone: 'Entrance', arrivalInterval: '8 min' },
      { name: 'Wonders of the Wild', zone: 'wonders-wild', arrivalInterval: '8 min' },
      { name: 'Wings of the Sky', zone: 'wings-sky', arrivalInterval: '8 min' },
      { name: 'Secret Life of Small Things', zone: 'secret-small', arrivalInterval: '8 min' },
      { name: 'Habitats of the Earth', zone: 'habitats-earth', arrivalInterval: '8 min' },
    ],
    frequency: 'Every 8 minutes',
    hours: '9:00 AM - 6:30 PM',
    accessible: true,
    capacity: 30,
    description: 'Our main loop shuttle connecting the entrance to the northern zones. Wheelchair and stroller accessible with a flat boarding ramp.',
  },
  {
    id: 'shuttle-blue',
    name: 'Blue Loop',
    color: '#1B4965',
    stops: [
      { name: 'Main Entrance', zone: 'Entrance', arrivalInterval: '10 min' },
      { name: 'Blue Planet Wonders', zone: 'blue-planet', arrivalInterval: '10 min' },
      { name: 'Realm of Reptiles', zone: 'realm-reptiles', arrivalInterval: '10 min' },
      { name: 'Habitats of the Earth', zone: 'habitats-earth', arrivalInterval: '10 min' },
    ],
    frequency: 'Every 10 minutes',
    hours: '9:00 AM - 6:30 PM',
    accessible: true,
    capacity: 25,
    description: 'Connects the entrance to the southern zones including the aquarium and reptile house. Air-conditioned during summer months.',
  },
  {
    id: 'shuttle-gold',
    name: 'Express Gold',
    color: '#C9A84C',
    stops: [
      { name: 'Main Entrance', zone: 'Entrance', arrivalInterval: '15 min' },
      { name: 'Wonders of the Wild', zone: 'wonders-wild', arrivalInterval: '15 min' },
      { name: 'Blue Planet Wonders', zone: 'blue-planet', arrivalInterval: '15 min' },
    ],
    frequency: 'Every 15 minutes',
    hours: '9:00 AM - 5:00 PM',
    accessible: true,
    capacity: 20,
    description: 'Express service between the entrance and the two most popular zones. Skip the crowds and get straight to the highlights.',
  },
];

export const buggyOptions: BuggyOption[] = [
  {
    id: 'buggy-standard',
    name: 'Standard Mobility Buggy',
    description:
      'Comfortable electric buggy for visitors with mobility needs. Covers all major paths and includes a knowledgeable driver who shares fun facts along the way.',
    price: 35,
    duration: 'Full day',
    capacity: 4,
    features: [
      'Electric-powered, zero emissions',
      'Wheelchair transfer assistance',
      'Covered canopy for sun/rain protection',
      'Storage basket for bags',
      'Complimentary water bottles',
    ],
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800&h=600&fit=crop',
    available: true,
  },
  {
    id: 'buggy-vip',
    name: 'VIP Private Buggy',
    description:
      'Premium private buggy with a dedicated driver-guide. Custom route, priority access to exhibits, and complimentary snack pack. Perfect for families or groups wanting a personalized experience.',
    price: 89,
    duration: '3 hours',
    capacity: 6,
    features: [
      'Dedicated driver-guide',
      'Custom route planning',
      'Priority exhibit access',
      'Complimentary snack pack & water',
      'Bluetooth speaker for audio guides',
      'Extended canopy with side curtains',
    ],
    image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&h=600&fit=crop',
    available: true,
  },
];

export const safariTours: SafariTour[] = [
  {
    id: 'safari-family',
    name: 'Family Discovery Safari',
    description:
      'The perfect introduction for families! An open-air vehicle takes you through the most kid-friendly exhibits with interactive stops, animal encounters, and a scavenger hunt along the way.',
    price: 29,
    childPrice: 19,
    duration: '90 min',
    maxGroup: 20,
    image: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=800&h=600&fit=crop',
    highlights: [
      'Giraffe feeding experience',
      'Interactive scavenger hunt',
      'Behind-the-scenes peek at the nursery',
      'Souvenir safari hat for kids',
    ],
    itinerary: [
      { time: '0 min', stop: 'Main Entrance', description: 'Meet your guide, collect safari hats and scavenger hunt cards', duration: '10 min' },
      { time: '10 min', stop: 'Wonders of the Wild', description: 'See the lions, elephants, and giraffes up close. Giraffe feeding included!', duration: '25 min' },
      { time: '35 min', stop: 'Blue Planet Wonders', description: 'Visit penguin beach and the touch pool for hands-on marine exploration', duration: '20 min' },
      { time: '55 min', stop: 'Secret Life of Small Things', description: 'Walk through the butterfly house and complete the scavenger hunt', duration: '20 min' },
      { time: '75 min', stop: 'Habitats of the Earth', description: 'Meet the koalas and red pandas. Photo opportunity included', duration: '15 min' },
    ],
    includes: ['Guided vehicle transport', 'Giraffe feeding token', 'Scavenger hunt card', 'Safari hat (kids)', 'Bottled water'],
    departureTimes: ['9:30 AM', '11:00 AM', '1:30 PM', '3:00 PM'],
    rating: 4.8,
    reviewCount: 456,
  },
  {
    id: 'safari-photo',
    name: 'Wildlife Photography Safari',
    description:
      'Designed for photography enthusiasts. Visit the best vantage points at golden-hour timing with a professional wildlife photographer as your guide. Learn techniques for stunning animal portraits.',
    price: 55,
    childPrice: 35,
    duration: '120 min',
    maxGroup: 12,
    image: 'https://images.unsplash.com/photo-1504173010664-32509aeebb62?w=800&h=600&fit=crop',
    highlights: [
      'Golden-hour timing for best light',
      'Professional photographer guide',
      'Access to restricted vantage points',
      'Tips for wildlife photography',
    ],
    itinerary: [
      { time: '0 min', stop: 'Main Entrance', description: 'Camera settings workshop and golden-hour briefing', duration: '15 min' },
      { time: '15 min', stop: 'Wonders of the Wild', description: 'Lion pride and elephant herd at the watering hole overlook', duration: '30 min' },
      { time: '45 min', stop: 'Wings of the Sky', description: 'Flamingo lagoon and aviary at peak activity time', duration: '25 min' },
      { time: '70 min', stop: 'Blue Planet Wonders', description: 'Underwater viewing gallery for unique aquatic shots', duration: '25 min' },
      { time: '95 min', stop: 'Habitats of the Earth', description: 'Red panda tree walk and polar bear pool for action shots', duration: '25 min' },
    ],
    includes: ['Professional photographer guide', 'Restricted vantage point access', 'Digital photo tips card', 'Bottled water & snack'],
    departureTimes: ['8:30 AM', '4:00 PM'],
    rating: 4.9,
    reviewCount: 128,
  },
  {
    id: 'safari-conservation',
    name: 'Conservation Deep Dive',
    description:
      'Go behind the scenes with our conservation team. Visit the veterinary hospital, meet ambassador animals, and learn about the zoo\'s global conservation projects. A portion of proceeds supports field research.',
    price: 69,
    childPrice: 45,
    duration: '150 min',
    maxGroup: 10,
    image: 'https://images.unsplash.com/photo-1564760055775-d63b17a55c44?w=800&h=600&fit=crop',
    highlights: [
      'Veterinary hospital tour',
      'Meet ambassador animals up close',
      'Conservation research briefing',
      'Certificate of participation',
    ],
    itinerary: [
      { time: '0 min', stop: 'Conservation Center', description: 'Overview of the zoo\'s 15 global conservation projects', duration: '20 min' },
      { time: '20 min', stop: 'Veterinary Hospital', description: 'Tour the state-of-the-art facility and meet the vet team', duration: '30 min' },
      { time: '50 min', stop: 'Keeper Prep Kitchen', description: 'See how 4,000 lbs of food is prepared daily for 800+ animals', duration: '20 min' },
      { time: '70 min', stop: 'Wonders of the Wild (backstage)', description: 'Meet ambassador animals and learn about species survival plans', duration: '30 min' },
      { time: '100 min', stop: 'Breeding Center', description: 'Visit the off-exhibit breeding and rehabilitation areas', duration: '25 min' },
      { time: '125 min', stop: 'Conservation Center', description: 'Q&A session, certificates, and how to support conservation at home', duration: '25 min' },
    ],
    includes: ['Expert conservationist guide', 'Backstage access', 'Ambassador animal encounter', 'Conservation certificate', 'Donation to field research', 'Bottled water & snack'],
    departureTimes: ['9:00 AM', '1:00 PM'],
    rating: 4.9,
    reviewCount: 87,
  },
];
