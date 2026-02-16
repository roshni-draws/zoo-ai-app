export const animals = [
  { id: 'lion', name: 'African Lion', individual: 'Izu', emoji: '🦁', zone: 'Africa Rocks', status: 'active', crowd: 'moderate', walkTime: '4 min', dwell: '8 min', image: 'https://images.unsplash.com/photo-1546182990-dffeafbe841d?w=400&h=300&fit=crop', fact: 'Izu weighs 420 lbs and his roar can be heard 5 miles away.', conservation: 'Vulnerable — population declined 43% in 21 years.' },
  { id: 'elephant', name: 'African Elephant', individual: 'Tembo', emoji: '🐘', zone: 'Elephant Odyssey', status: 'active', crowd: 'quiet', walkTime: '7 min', dwell: '11 min', image: 'https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?w=400&h=300&fit=crop', fact: 'Elephants can recognize themselves in mirrors — one of only a few species that can!', conservation: 'African elephants have declined 60% in the last 25 years.' },
  { id: 'penguin', name: 'African Penguin', individual: 'Pip', emoji: '🐧', zone: 'Penguin Beach', status: 'feeding', crowd: 'busy', walkTime: '12 min', dwell: '6 min', image: 'https://images.unsplash.com/photo-1551986782-d0169b3f8fa7?w=400&h=300&fit=crop', fact: 'African penguins can hold their breath for over 2 minutes underwater.', conservation: 'Endangered — only 40,000 breeding pairs remain in the wild.' },
  { id: 'giraffe', name: 'Giraffe', individual: 'Kiko', emoji: '🦒', zone: 'Urban Jungle', status: 'active', crowd: 'quiet', walkTime: '9 min', dwell: '7 min', image: 'https://images.unsplash.com/photo-1547721064-da6cfb341d50?w=400&h=300&fit=crop', fact: 'Giraffes only sleep about 30 minutes per day, mostly in short naps.', conservation: 'Vulnerable — there are fewer giraffes than elephants in Africa.' },
  { id: 'panda', name: 'Giant Panda', individual: 'Mei', emoji: '🐼', zone: 'Panda Ridge', status: 'sleeping', crowd: 'packed', walkTime: '15 min', dwell: '10 min', image: 'https://images.unsplash.com/photo-1564349683136-77e08dba1ef7?w=400&h=300&fit=crop', fact: 'Pandas spend 12 hours a day eating up to 38 kg of bamboo.', conservation: 'Vulnerable — about 1,800 remain in the wild thanks to conservation efforts.' },
  { id: 'gorilla', name: 'Western Gorilla', individual: 'Koga', emoji: '🦍', zone: 'Lost Forest', status: 'active', crowd: 'moderate', walkTime: '6 min', dwell: '9 min', image: 'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?w=400&h=300&fit=crop', fact: 'Gorillas share 98.3% of their DNA with humans.', conservation: 'Critically Endangered — fewer than 100,000 in the wild.' },
  { id: 'tiger', name: 'Sumatran Tiger', individual: 'Raya', emoji: '🐅', zone: 'Tiger Trail', status: 'quiet', crowd: 'quiet', walkTime: '11 min', dwell: '6 min', image: 'https://images.unsplash.com/photo-1561731216-c3a4d99437d5?w=400&h=300&fit=crop', fact: 'Sumatran tigers are the smallest tiger subspecies and excellent swimmers.', conservation: 'Critically Endangered — fewer than 400 remain in Sumatran forests.' },
  { id: 'flamingo', name: 'Chilean Flamingo', individual: '', emoji: '🦩', zone: 'Flamingo Lagoon', status: 'active', crowd: 'quiet', walkTime: '3 min', dwell: '4 min', image: 'https://images.unsplash.com/photo-1497206365907-f5e630693df0?w=400&h=300&fit=crop', fact: 'Flamingos get their pink color from the shrimp and algae they eat.', conservation: 'Near Threatened — wetland loss is their biggest threat.' },
  { id: 'polar-bear', name: 'Polar Bear', individual: 'Kalluk', emoji: '🐻‍❄️', zone: 'Polar Rim', status: 'active', crowd: 'moderate', walkTime: '14 min', dwell: '8 min', image: 'https://images.unsplash.com/photo-1589656966895-2f33e7653819?w=400&h=300&fit=crop', fact: 'Polar bears can smell prey from up to 20 miles away.', conservation: 'Vulnerable — Arctic sea ice loss directly threatens their survival.' },
  { id: 'sea-lion', name: 'California Sea Lion', individual: 'Clyde', emoji: '🦭', zone: 'Sea Lion Point', status: 'feeding', crowd: 'busy', walkTime: '5 min', dwell: '7 min', image: 'https://images.unsplash.com/photo-1580052614034-c55d20bfee3b?w=400&h=300&fit=crop', fact: 'Sea lions can rotate their hind flippers to walk on land.', conservation: 'Least Concern — protected under the Marine Mammal Protection Act.' },
  { id: 'koala', name: 'Koala', individual: 'Bunya', emoji: '🐨', zone: 'Australian Outback', status: 'sleeping', crowd: 'quiet', walkTime: '10 min', dwell: '5 min', image: 'https://images.unsplash.com/photo-1459262838948-3e2de6c1ec80?w=400&h=300&fit=crop', fact: 'Koalas sleep up to 22 hours a day to conserve energy from their eucalyptus diet.', conservation: 'Vulnerable — bushfires and habitat loss have caused steep decline.' },
  { id: 'hippo', name: 'Hippopotamus', individual: 'Funani', emoji: '🦛', zone: 'Hippo Trail', status: 'active', crowd: 'moderate', walkTime: '8 min', dwell: '6 min', image: 'https://images.unsplash.com/photo-1504472478235-9bc48ba4d60f?w=400&h=300&fit=crop', fact: 'Hippos can hold their breath for up to 5 minutes and run 30 km/h on land.', conservation: 'Vulnerable — poaching and habitat loss are the main threats.' },
]

export const events = [
  { id: 'e1', name: 'Elephant Keeper Talk', time: '10:15 AM', location: 'Elephant Odyssey', type: 'talk', icon: '🎤', duration: '20 min' },
  { id: 'e2', name: 'Sea Lion Feeding', time: '11:00 AM', location: 'Sea Lion Point', type: 'feeding', icon: '🐟', duration: '15 min' },
  { id: 'e3', name: 'Birds of Prey Show', time: '1:30 PM', location: 'Wegeforth Bowl', type: 'show', icon: '🦅', duration: '30 min' },
  { id: 'e4', name: 'Penguin Feeding', time: '2:00 PM', location: 'Penguin Beach', type: 'feeding', icon: '🐟', duration: '15 min' },
  { id: 'e5', name: 'Gorilla Keeper Talk', time: '3:00 PM', location: 'Lost Forest', type: 'talk', icon: '🎤', duration: '20 min' },
]

export const zones = [
  { id: 'z1', name: 'Africa Rocks', animals: 8, image: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=400&h=200&fit=crop', crowd: 'quiet' },
  { id: 'z2', name: 'Elephant Odyssey', animals: 5, image: 'https://images.unsplash.com/photo-1564760055775-d63b17a55c44?w=400&h=200&fit=crop', crowd: 'moderate' },
  { id: 'z3', name: 'Lost Forest', animals: 12, image: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=400&h=200&fit=crop', crowd: 'moderate' },
  { id: 'z4', name: 'Polar Rim', animals: 6, image: 'https://images.unsplash.com/photo-1454391304352-2bf4678b1a7a?w=400&h=200&fit=crop', crowd: 'quiet' },
  { id: 'z5', name: 'Urban Jungle', animals: 9, image: 'https://images.unsplash.com/photo-1474511320723-9a56873571b7?w=400&h=200&fit=crop', crowd: 'busy' },
  { id: 'z6', name: 'Australian Outback', animals: 7, image: 'https://images.unsplash.com/photo-1462275646964-a0e3c11f18a6?w=400&h=200&fit=crop', crowd: 'quiet' },
]

export const curatedPlans = [
  { id: 'cp1', title: 'Best for Families', icon: '👨‍👩‍👧‍👦', exhibits: 8, duration: '4 hrs', distance: '2.8 mi', tags: ['Stroller-friendly', 'Shaded', 'Interactive'], rating: 4.8, visitors: 2340, desc: 'Designed for families with young kids. Stroller-accessible paths, plenty of shade, and interactive exhibits that keep little ones engaged.' },
  { id: 'cp2', title: "Couples' Day Out", icon: '💑', exhibits: 10, duration: '5 hrs', distance: '3.2 mi', tags: ['Photo spots', 'Dining included', 'Scenic'], rating: 4.7, visitors: 1890, desc: 'A romantic route through the most photogenic exhibits with a lunch reservation at Albert\'s Restaurant.' },
  { id: 'cp3', title: 'Senior-Friendly Route', icon: '🧓', exhibits: 6, duration: '3 hrs', distance: '1.5 mi', tags: ['Minimal walking', 'Buggy-compatible', 'Bench stops'], rating: 4.9, visitors: 1240, desc: 'Gentle pace with frequent rest stops, all on accessible paths. Mobility buggy compatible throughout.' },
  { id: 'cp4', title: 'Kids Under 5', icon: '👶', exhibits: 6, duration: '2.5 hrs', distance: '1.2 mi', tags: ['Petting zoo', 'Playground', 'Short'], rating: 4.6, visitors: 1560, desc: 'Short, sweet, and packed with hands-on fun for the littlest explorers.' },
]

export const stamps = [
  { zone: 'Africa Rocks', earned: 4, total: 7 },
  { zone: 'Elephant Odyssey', earned: 3, total: 5 },
  { zone: 'Lost Forest', earned: 5, total: 8 },
  { zone: 'Polar Rim', earned: 2, total: 6 },
  { zone: 'Urban Jungle', earned: 3, total: 6 },
  { zone: 'Australian Outback', earned: 1, total: 5 },
]

export const badges = [
  { id: 'b1', title: 'Polar Explorer', desc: 'Completed all Polar exhibits', icon: '🏔️', earned: true, date: 'Jan 14, 2025' },
  { id: 'b2', title: 'Early Bird', desc: 'Arrived before 9:30am', icon: '🌅', earned: true, date: 'Jan 14, 2025' },
  { id: 'b3', title: 'Challenge Accepted', desc: 'Found Harold the tortoise', icon: '🐢', earned: true, date: 'Dec 8, 2024' },
  { id: 'b4', title: 'Full Explorer', desc: 'Visit all 6 zones', icon: '🗺️', earned: false, progress: 5, total: 6 },
  { id: 'b5', title: 'Animal Whisperer', desc: 'Scan 30 different animals', icon: '🔍', earned: false, progress: 18, total: 30 },
  { id: 'b6', title: 'Repeat Visitor', desc: 'Visit 3 times in one year', icon: '🔄', earned: false, progress: 2, total: 3 },
]

export const defaultPlanStops = [
  { id: 's1', name: 'African Lion', emoji: '🦁', time: '9:15 AM', duration: '15 min', insight: 'Best viewing window — lions most active in morning', completed: true },
  { id: 's2', name: 'Giraffe Feeding', emoji: '🦒', time: '9:40 AM', duration: '20 min', insight: 'Ella will love hand-feeding the giraffes!', completed: true },
  { id: 's3', name: 'Lunch at Albert\'s', emoji: '🍽️', time: '10:10 AM', duration: '45 min', insight: 'Beat the rush — kid-friendly menu with outdoor seating', completed: false },
  { id: 's4', name: 'Elephant Odyssey', emoji: '🐘', time: '11:05 AM', duration: '25 min', insight: 'Keeper talk at 10:15 — perfect timing', completed: false },
  { id: 's5', name: 'Penguin Beach', emoji: '🐧', time: '11:40 AM', duration: '20 min', insight: 'Feeding at 2pm — arrive early for front row', completed: false },
  { id: 's6', name: 'Gorilla Forest', emoji: '🦍', time: '12:10 PM', duration: '20 min', insight: 'Koga has been social this morning', completed: false },
  { id: 's7', name: 'Polar Rim', emoji: '🐻‍❄️', time: '12:40 PM', duration: '15 min', insight: 'Shaded viewing area — good for afternoon', completed: false },
]

export const facilities = [
  { id: 'f1', name: 'Main Restroom', type: 'restroom', icon: '🚻', distance: '2 min', zone: 'Africa Rocks' },
  { id: 'f2', name: "Albert's Restaurant", type: 'food', icon: '🍽️', distance: '5 min', zone: 'Treehouse', wait: '10 min' },
  { id: 'f3', name: 'Kettle Corn Cart', type: 'food', icon: '🍿', distance: '1 min', zone: 'Africa Rocks' },
  { id: 'f4', name: 'Water Fountain', type: 'water', icon: '💧', distance: '1 min', zone: 'Elephant Odyssey' },
  { id: 'f5', name: 'First Aid Station', type: 'medical', icon: '🏥', distance: '4 min', zone: 'Front Plaza' },
  { id: 'f6', name: 'Stroller Parking', type: 'stroller', icon: '👶', distance: '3 min', zone: 'Lost Forest' },
  { id: 'f7', name: 'Nursing Room', type: 'nursing', icon: '🤱', distance: '6 min', zone: 'Front Plaza' },
  { id: 'f8', name: 'Family Restroom', type: 'restroom', icon: '🚻', distance: '3 min', zone: 'Penguin Beach' },
]

export const newsItems = [
  { id: 'n1', title: 'Two Lion Cubs Born!', subtitle: 'Izu and Nala welcome twins', date: 'Feb 10', image: 'https://images.unsplash.com/photo-1614027164847-1b28cfe1df60?w=400&h=200&fit=crop' },
  { id: 'n2', title: 'New Penguin Beach Opens', subtitle: 'Triple the swimming space', date: 'Feb 3', image: 'https://images.unsplash.com/photo-1462888210965-bddf7ba7f5e5?w=400&h=200&fit=crop' },
  { id: 'n3', title: 'Spring Safari Nights', subtitle: 'Extended hours every Friday', date: 'Jan 28', image: 'https://images.unsplash.com/photo-1504173010664-32509aeebb62?w=400&h=200&fit=crop' },
]

export const interests = [
  'Big Cats', 'Marine Life', 'Elephants', 'Primates',
  'Birds', 'Reptiles', 'Conservation', 'Photography',
  'Shows & Talks', 'Kids Activities'
]

export const zooList = [
  { name: 'San Diego Zoo', city: 'San Diego, CA', distance: '2.4 mi', image: '🦁' },
  { name: 'Bronx Zoo', city: 'New York, NY', distance: '2,800 mi', image: '🦍' },
  { name: 'Smithsonian Zoo', city: 'Washington, DC', distance: '2,600 mi', image: '🐼' },
  { name: 'Lincoln Park Zoo', city: 'Chicago, IL', distance: '1,800 mi', image: '🐘' },
  { name: 'Houston Zoo', city: 'Houston, TX', distance: '1,400 mi', image: '🦒' },
]
