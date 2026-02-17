export interface VolunteerProgram {
  id: string;
  name: string;
  description: string;
  commitment: string;
  ageRequirement: string;
  icon: string;
  skills: string[];
  benefits: string[];
  spotsAvailable: number;
  nextStartDate: string;
  image: string;
}

export interface EducationalTalk {
  id: string;
  name: string;
  speaker: string;
  speakerRole: string;
  topic: string;
  description: string;
  duration: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  date: string;
  time: string;
  location: string;
  capacity: number;
  spotsLeft: number;
  icon: string;
  tags: string[];
}

export const volunteerPrograms: VolunteerProgram[] = [
  {
    id: 'vol-1',
    name: 'Zoo Ambassador',
    description:
      'Become the face of the zoo! Greet visitors, answer questions, and share fun animal facts at exhibit stations. Training provided on all 140+ species.',
    commitment: '4 hours/week, minimum 6 months',
    ageRequirement: '16+',
    icon: '🎓',
    skills: ['Communication', 'Animal knowledge', 'Guest services'],
    benefits: [
      'Free zoo admission on volunteer days',
      'Exclusive behind-the-scenes tours',
      'Official volunteer uniform',
      'Annual appreciation dinner',
      'Letter of recommendation',
    ],
    spotsAvailable: 12,
    nextStartDate: '2026-03-15',
    image: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800&h=600&fit=crop',
  },
  {
    id: 'vol-2',
    name: 'Conservation Corps',
    description:
      'Work alongside our conservation team on habitat restoration, species monitoring, and community outreach. Ideal for biology or environmental science students.',
    commitment: '8 hours/week, minimum 3 months',
    ageRequirement: '18+',
    icon: '🌿',
    skills: ['Field research', 'Data collection', 'Habitat management'],
    benefits: [
      'Hands-on field research experience',
      'Mentorship from conservation scientists',
      'Co-author opportunities on research papers',
      'Professional development workshops',
      'Academic credit (for eligible students)',
    ],
    spotsAvailable: 5,
    nextStartDate: '2026-04-01',
    image: 'https://images.unsplash.com/photo-1564760055775-d63b17a55c44?w=800&h=600&fit=crop',
  },
  {
    id: 'vol-3',
    name: 'Junior Zookeeper',
    description:
      'A summer program for teens who dream of working with animals. Shadow real keepers, prepare diets, and help with enrichment activities for ambassador animals.',
    commitment: '3 weeks full-time (summer only)',
    ageRequirement: '14–17',
    icon: '🐾',
    skills: ['Animal care basics', 'Diet preparation', 'Enrichment design'],
    benefits: [
      'Hands-on animal care experience',
      'Junior Zookeeper certificate',
      'Portfolio-worthy photos and journal',
      'Meet and greet with senior keepers',
      'End-of-program family event',
    ],
    spotsAvailable: 20,
    nextStartDate: '2026-06-16',
    image: 'https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?w=800&h=600&fit=crop',
  },
  {
    id: 'vol-4',
    name: 'Education Docent',
    description:
      'Lead educational programs for school groups, scout troops, and community organizations. Share your passion for wildlife through storytelling and hands-on activities.',
    commitment: '6 hours/week, minimum 12 months',
    ageRequirement: '21+',
    icon: '📖',
    skills: ['Public speaking', 'Teaching', 'Group management'],
    benefits: [
      'Comprehensive docent training program',
      'Free family membership',
      'Teaching resource library access',
      'Annual conference attendance',
      'Continuing education credits',
    ],
    spotsAvailable: 8,
    nextStartDate: '2026-03-01',
    image: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=800&h=600&fit=crop',
  },
];

export const educationalTalks: EducationalTalk[] = [
  {
    id: 'talk-1',
    name: 'The Secret Language of Elephants',
    speaker: 'Dr. Sarah Mitchell',
    speakerRole: 'Senior Elephant Researcher',
    topic: 'Elephant communication and social bonds',
    description:
      'Discover how elephants communicate through infrasound vibrations that travel through the ground, complex vocalizations, and subtle body language. Dr. Mitchell shares 15 years of field research from Kenya.',
    duration: '45 min',
    level: 'beginner',
    date: '2026-02-22',
    time: '2:00 PM',
    location: 'Conservation Auditorium',
    capacity: 100,
    spotsLeft: 34,
    icon: '🐘',
    tags: ['Elephants', 'Communication', 'Field research'],
  },
  {
    id: 'talk-2',
    name: 'Ocean Plastic: From Crisis to Solution',
    speaker: 'Dr. James Chen',
    speakerRole: 'Marine Conservation Director',
    topic: 'Marine pollution and conservation solutions',
    description:
      'An eye-opening look at how plastic pollution is affecting marine life and what cutting-edge solutions — from ocean cleanup drones to biodegradable alternatives — are turning the tide.',
    duration: '60 min',
    level: 'intermediate',
    date: '2026-02-25',
    time: '11:00 AM',
    location: 'Blue Planet Lecture Hall',
    capacity: 80,
    spotsLeft: 22,
    icon: '🌊',
    tags: ['Marine life', 'Conservation', 'Pollution'],
  },
  {
    id: 'talk-3',
    name: 'Saving the Sumatran Tiger',
    speaker: 'Dr. Rani Patel',
    speakerRole: 'Big Cat Conservation Lead',
    topic: 'Tiger conservation in Southeast Asia',
    description:
      'With fewer than 400 Sumatran tigers left, every individual matters. Learn about anti-poaching patrols, habitat corridors, and how captive breeding programs are providing a genetic safety net.',
    duration: '45 min',
    level: 'intermediate',
    date: '2026-03-01',
    time: '3:00 PM',
    location: 'Conservation Auditorium',
    capacity: 100,
    spotsLeft: 55,
    icon: '🐅',
    tags: ['Tigers', 'Endangered species', 'Poaching'],
  },
  {
    id: 'talk-4',
    name: 'Bugs Rule the World',
    speaker: 'Prof. Elena Rodriguez',
    speakerRole: 'Entomology Curator',
    topic: 'The ecological importance of insects',
    description:
      'Insects make up 80% of all known animal species and are essential to every ecosystem. This fun, interactive talk explores their incredible adaptations and why their decline should worry all of us.',
    duration: '30 min',
    level: 'beginner',
    date: '2026-02-20',
    time: '10:30 AM',
    location: 'Butterfly House Classroom',
    capacity: 40,
    spotsLeft: 18,
    icon: '🐛',
    tags: ['Insects', 'Ecology', 'Biodiversity'],
  },
  {
    id: 'talk-5',
    name: 'Genetics and Conservation Breeding',
    speaker: 'Dr. Michael Torres',
    speakerRole: 'Reproductive Sciences Director',
    topic: 'Advanced genetics in species survival',
    description:
      'How do zoos maintain healthy, genetically diverse populations? Explore the science of Species Survival Plans, genetic matchmaking, and assisted reproduction technologies that are saving species from extinction.',
    duration: '60 min',
    level: 'advanced',
    date: '2026-03-05',
    time: '1:00 PM',
    location: 'Conservation Auditorium',
    capacity: 60,
    spotsLeft: 41,
    icon: '🧬',
    tags: ['Genetics', 'Breeding', 'Science'],
  },
];
