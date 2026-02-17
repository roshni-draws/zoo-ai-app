export interface ZoneDetail {
  id: string;
  name: string;
  animals: number;
  distance: string;
  image: string;
  description: string;
  activities: { name: string; icon: string; time?: string }[];
  speciesIds: string[];
  nearbyZones: string[];
}

export const zonesExtended: ZoneDetail[] = [
  {
    id: 'wonders-wild',
    name: 'Wonders of the Wild',
    animals: 14,
    distance: '0.6 mi',
    image: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=800&h=400&fit=crop',
    description:
      'Home to Africa and Asia\'s most iconic mega-fauna. Walk through immersive savannas and dense forests where lions, elephants, gorillas, and tigers roam in naturalistic habitats designed to mirror their wild homes.',
    activities: [
      { name: 'Giraffe Feeding Platform', icon: '🦒', time: '9:30 AM – 11:00 AM' },
      { name: 'Elephant Keeper Talk', icon: '🎤', time: '10:15 AM' },
      { name: 'Lion Enrichment Demo', icon: '🦁', time: '2:00 PM' },
      { name: 'Gorilla Observation Deck', icon: '🦍' },
      { name: 'Conservation Photo Wall', icon: '📸' },
    ],
    speciesIds: ['lion', 'elephant', 'giraffe', 'gorilla', 'tiger', 'hippo'],
    nearbyZones: ['wings-sky', 'habitats-earth'],
  },
  {
    id: 'wings-sky',
    name: 'Wings of the Sky',
    animals: 22,
    distance: '0.4 mi',
    image: 'https://images.unsplash.com/photo-1444464666168-49d633b86797?w=800&h=400&fit=crop',
    description:
      'A paradise for bird lovers featuring free-flight aviaries, flamingo lagoons, and raptor perches. Step inside the walk-through tropical aviary where over 100 exotic birds fly freely around you.',
    activities: [
      { name: 'Birds of Prey Show', icon: '🦅', time: '1:30 PM' },
      { name: 'Walk-Through Aviary', icon: '🦜' },
      { name: 'Flamingo Feeding', icon: '🦩', time: '11:30 AM' },
      { name: 'Birdwatching Trail', icon: '🔭' },
    ],
    speciesIds: ['flamingo', 'macaw', 'eagle'],
    nearbyZones: ['wonders-wild', 'secret-small'],
  },
  {
    id: 'realm-reptiles',
    name: 'Realm of Reptiles',
    animals: 18,
    distance: '0.3 mi',
    image: 'https://images.unsplash.com/photo-1504450874802-0ba2bcd659e0?w=800&h=400&fit=crop',
    description:
      'Enter the ancient world of reptiles in climate-controlled habitats. From massive Komodo dragons to delicate geckos, discover creatures whose ancestors walked alongside dinosaurs.',
    activities: [
      { name: 'Komodo Dragon Talk', icon: '🦎', time: '11:00 AM' },
      { name: 'Snake Handling Demo', icon: '🐍', time: '3:00 PM' },
      { name: 'Reptile Touch Station', icon: '🤲' },
      { name: 'Nocturnal Reptile House', icon: '🌙' },
    ],
    speciesIds: ['komodo', 'python'],
    nearbyZones: ['secret-small', 'blue-planet'],
  },
  {
    id: 'blue-planet',
    name: 'Blue Planet Wonders',
    animals: 30,
    distance: '0.5 mi',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=400&fit=crop',
    description:
      'Dive into the aquatic world with underwater viewing tunnels, touch pools, and penguin beaches. Watch sea lions perform, stingrays glide, and penguins waddle across rocky shores.',
    activities: [
      { name: 'Sea Lion Show', icon: '🦭', time: '11:00 AM & 3:00 PM' },
      { name: 'Penguin Feeding', icon: '🐧', time: '2:00 PM' },
      { name: 'Touch Pool', icon: '🌊' },
      { name: 'Underwater Viewing Tunnel', icon: '🔵' },
      { name: 'Ocean Conservation Lab', icon: '🔬' },
    ],
    speciesIds: ['penguin', 'sea-lion', 'sea-turtle'],
    nearbyZones: ['realm-reptiles', 'habitats-earth'],
  },
  {
    id: 'secret-small',
    name: 'Secret Life of Small Things',
    animals: 40,
    distance: '0.25 mi',
    image: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=800&h=400&fit=crop',
    description:
      'Discover the incredible world of insects, amphibians, and tiny creatures. The butterfly house, frog terrariums, and live ant colonies reveal nature\'s smallest wonders up close.',
    activities: [
      { name: 'Butterfly House Walk-Through', icon: '🦋' },
      { name: 'Bug Encounter', icon: '🐛', time: '10:30 AM' },
      { name: 'Frog Feeding Demo', icon: '🐸', time: '1:00 PM' },
      { name: 'Microscope Lab', icon: '🔬' },
      { name: 'Leaf-Cutter Ant Trail', icon: '🐜' },
    ],
    speciesIds: ['poison-frog', 'butterfly'],
    nearbyZones: ['wings-sky', 'realm-reptiles'],
  },
  {
    id: 'habitats-earth',
    name: 'Habitats of the Earth',
    animals: 16,
    distance: '0.5 mi',
    image: 'https://images.unsplash.com/photo-1474511320723-9a56873571b7?w=800&h=400&fit=crop',
    description:
      'Travel the globe through recreated biomes — from Arctic tundra to Australian bushland to Himalayan cloud forests. Meet polar bears, koalas, red pandas, and giant pandas in their adapted habitats.',
    activities: [
      { name: 'Polar Bear Plunge Viewing', icon: '🐻‍❄️' },
      { name: 'Koala Photo Encounter', icon: '🐨', time: '10:00 AM – 12:00 PM' },
      { name: 'Panda Cam Live', icon: '🐼' },
      { name: 'Climate Change Exhibit', icon: '🌍' },
      { name: 'Red Panda Tree Walk', icon: '🌳' },
    ],
    speciesIds: ['polar-bear', 'koala', 'panda', 'red-panda'],
    nearbyZones: ['wonders-wild', 'blue-planet'],
  },
];
