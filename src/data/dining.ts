export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  dietary: ('vegetarian' | 'vegan' | 'gluten-free' | 'kid-friendly' | 'halal')[];
  popular?: boolean;
}

export interface Restaurant {
  id: string;
  name: string;
  zone: string;
  cuisine: string;
  description: string;
  image: string;
  rating: number;
  reviewCount: number;
  priceRange: '$' | '$$' | '$$$';
  hours: string;
  seating: 'indoor' | 'outdoor' | 'both';
  waitTime: string;
  menu: MenuItem[];
}

export interface CuisineCategory {
  id: string;
  name: string;
  icon: string;
  count: number;
}

export const cuisineCategories: CuisineCategory[] = [
  { id: 'all', name: 'All', icon: '🍽️', count: 8 },
  { id: 'american', name: 'American', icon: '🍔', count: 2 },
  { id: 'asian', name: 'Asian', icon: '🍜', count: 2 },
  { id: 'healthy', name: 'Healthy', icon: '🥗', count: 2 },
  { id: 'snacks', name: 'Snacks & Treats', icon: '🍦', count: 3 },
  { id: 'cafe', name: 'Coffee & Drinks', icon: '☕', count: 2 },
];

export const restaurants: Restaurant[] = [
  {
    id: 'r1',
    name: 'Savanna Grill',
    zone: 'Wonders of the Wild',
    cuisine: 'american',
    description:
      'Our signature restaurant with panoramic views of the savanna exhibit. Enjoy gourmet burgers, grilled meats, and craft beers while watching giraffes graze just yards away.',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=600&fit=crop',
    rating: 4.7,
    reviewCount: 342,
    priceRange: '$$$',
    hours: '10:00 AM - 7:00 PM',
    seating: 'both',
    waitTime: '15 min',
    menu: [
      {
        id: 'm1',
        name: 'Safari Burger',
        description: 'Wagyu beef patty with caramelized onions, smoked gouda, and house-made pickles on a brioche bun',
        price: 18.99,
        image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop',
        dietary: [],
        popular: true,
      },
      {
        id: 'm2',
        name: 'Grilled Chicken Wrap',
        description: 'Herb-marinated chicken, avocado, mixed greens, and chipotle aioli in a spinach tortilla',
        price: 14.99,
        image: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=400&h=300&fit=crop',
        dietary: ['halal'],
      },
      {
        id: 'm3',
        name: 'Beyond Savanna Burger',
        description: 'Plant-based patty with vegan cheese, lettuce, tomato, and special sauce',
        price: 16.99,
        image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=400&h=300&fit=crop',
        dietary: ['vegan'],
      },
      {
        id: 'm4',
        name: 'Kids Safari Bites',
        description: 'Chicken tenders shaped like animals with fries and apple slices',
        price: 8.99,
        image: 'https://images.unsplash.com/photo-1562967914-608f82629710?w=400&h=300&fit=crop',
        dietary: ['kid-friendly'],
      },
    ],
  },
  {
    id: 'r2',
    name: 'Bamboo Kitchen',
    zone: 'Habitats of the Earth',
    cuisine: 'asian',
    description:
      'Authentic Asian cuisine inspired by the habitats of our pandas and red pandas. Fresh noodles, dim sum, and wok-fried dishes made to order.',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&h=600&fit=crop',
    rating: 4.5,
    reviewCount: 218,
    priceRange: '$$',
    hours: '10:30 AM - 6:30 PM',
    seating: 'both',
    waitTime: '10 min',
    menu: [
      {
        id: 'm5',
        name: 'Panda Ramen Bowl',
        description: 'Rich tonkotsu broth with chashu pork, soft egg, bamboo shoots, and nori',
        price: 15.99,
        image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&h=300&fit=crop',
        dietary: [],
        popular: true,
      },
      {
        id: 'm6',
        name: 'Veggie Dim Sum Platter',
        description: 'Assortment of 8 handmade dumplings with dipping sauces',
        price: 12.99,
        image: 'https://images.unsplash.com/photo-1496116218417-1a781b1c416c?w=400&h=300&fit=crop',
        dietary: ['vegetarian'],
      },
      {
        id: 'm7',
        name: 'Teriyaki Chicken Rice Bowl',
        description: 'Glazed chicken thigh over jasmine rice with edamame and pickled ginger',
        price: 13.99,
        image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=400&h=300&fit=crop',
        dietary: ['gluten-free'],
      },
      {
        id: 'm8',
        name: 'Kids Noodle Bowl',
        description: 'Simple udon noodles with chicken and vegetables in mild broth',
        price: 7.99,
        image: 'https://images.unsplash.com/photo-1552611052-33e04de1b100?w=400&h=300&fit=crop',
        dietary: ['kid-friendly'],
      },
    ],
  },
  {
    id: 'r3',
    name: 'Canopy Cafe',
    zone: 'Wings of the Sky',
    cuisine: 'cafe',
    description:
      'A relaxing treehouse-style cafe nestled among the aviaries. Specialty coffees, fresh pastries, and light bites with birdsong as your soundtrack.',
    image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&h=600&fit=crop',
    rating: 4.6,
    reviewCount: 189,
    priceRange: '$',
    hours: '8:30 AM - 5:00 PM',
    seating: 'outdoor',
    waitTime: '5 min',
    menu: [
      {
        id: 'm9',
        name: 'Canopy Latte',
        description: 'House espresso with your choice of milk and a custom latte art bird design',
        price: 5.99,
        image: 'https://images.unsplash.com/photo-1541167760496-9af0ab7f0130?w=400&h=300&fit=crop',
        dietary: [],
        popular: true,
      },
      {
        id: 'm10',
        name: 'Avocado Toast',
        description: 'Smashed avocado on sourdough with cherry tomatoes, microgreens, and everything seasoning',
        price: 10.99,
        image: 'https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?w=400&h=300&fit=crop',
        dietary: ['vegan'],
      },
      {
        id: 'm11',
        name: 'Fruit & Granola Parfait',
        description: 'Layers of Greek yogurt, house-made granola, and seasonal berries',
        price: 8.99,
        image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&h=300&fit=crop',
        dietary: ['vegetarian', 'gluten-free'],
      },
    ],
  },
  {
    id: 'r4',
    name: 'Tide Pool Tacos',
    zone: 'Blue Planet Wonders',
    cuisine: 'american',
    description:
      'Fresh seafood tacos and coastal favorites steps from the penguin exhibit. Fish tacos, poke bowls, and tropical smoothies with ocean views.',
    image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=800&h=600&fit=crop',
    rating: 4.4,
    reviewCount: 156,
    priceRange: '$$',
    hours: '11:00 AM - 6:00 PM',
    seating: 'outdoor',
    waitTime: '8 min',
    menu: [
      {
        id: 'm12',
        name: 'Baja Fish Tacos',
        description: 'Beer-battered mahi-mahi with cabbage slaw, pico de gallo, and lime crema on corn tortillas',
        price: 14.99,
        image: 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=400&h=300&fit=crop',
        dietary: [],
        popular: true,
      },
      {
        id: 'm13',
        name: 'Poke Bowl',
        description: 'Fresh ahi tuna over sushi rice with mango, avocado, edamame, and spicy mayo',
        price: 16.99,
        image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop',
        dietary: ['gluten-free'],
      },
      {
        id: 'm14',
        name: 'Cauliflower Tacos',
        description: 'Crispy cauliflower with chipotle crema, pickled onion, and cilantro',
        price: 12.99,
        image: 'https://images.unsplash.com/photo-1599974579688-8dbdd335c77f?w=400&h=300&fit=crop',
        dietary: ['vegan', 'gluten-free'],
      },
    ],
  },
  {
    id: 'r5',
    name: 'The Watering Hole',
    zone: 'Wonders of the Wild',
    cuisine: 'snacks',
    description:
      'Quick-service snack bar with refreshing drinks, ice cream, and grab-and-go options. Perfect for a midday pick-me-up without missing the action.',
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&h=600&fit=crop',
    rating: 4.2,
    reviewCount: 278,
    priceRange: '$',
    hours: '9:00 AM - 7:30 PM',
    seating: 'outdoor',
    waitTime: '3 min',
    menu: [
      {
        id: 'm15',
        name: 'Jungle Swirl Ice Cream',
        description: 'Soft serve with your choice of animal cracker, sprinkle, or chocolate drizzle topping',
        price: 6.99,
        image: 'https://images.unsplash.com/photo-1567206563064-6f60f40a2b57?w=400&h=300&fit=crop',
        dietary: ['vegetarian'],
        popular: true,
      },
      {
        id: 'm16',
        name: 'Safari Pretzel',
        description: 'Jumbo soft pretzel shaped like a snake with cheese dipping sauce',
        price: 7.99,
        image: 'https://images.unsplash.com/photo-1524280025657-461e56ef61b7?w=400&h=300&fit=crop',
        dietary: ['vegetarian', 'kid-friendly'],
      },
      {
        id: 'm17',
        name: 'Tropical Smoothie',
        description: 'Mango, pineapple, banana, and coconut milk blended with ice',
        price: 7.99,
        image: 'https://images.unsplash.com/photo-1505252585461-04db1eb84625?w=400&h=300&fit=crop',
        dietary: ['vegan', 'gluten-free'],
      },
    ],
  },
  {
    id: 'r6',
    name: 'Green Leaf Garden',
    zone: 'Secret Life of Small Things',
    cuisine: 'healthy',
    description:
      'Farm-to-table salads, grain bowls, and plant-based entrees sourced from our on-site garden. Every meal supports pollinator conservation.',
    image: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=800&h=600&fit=crop',
    rating: 4.6,
    reviewCount: 134,
    priceRange: '$$',
    hours: '10:00 AM - 5:00 PM',
    seating: 'both',
    waitTime: '7 min',
    menu: [
      {
        id: 'm18',
        name: 'Garden Harvest Bowl',
        description: 'Quinoa, roasted sweet potato, kale, chickpeas, tahini dressing, and hemp seeds',
        price: 14.99,
        image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop',
        dietary: ['vegan', 'gluten-free'],
        popular: true,
      },
      {
        id: 'm19',
        name: 'Mediterranean Wrap',
        description: 'Hummus, falafel, cucumber, tomato, and pickled turnip in a whole wheat wrap',
        price: 12.99,
        image: 'https://images.unsplash.com/photo-1540914124281-342587941389?w=400&h=300&fit=crop',
        dietary: ['vegan'],
      },
      {
        id: 'm20',
        name: 'Superfood Smoothie Bowl',
        description: 'Acai, banana, spinach, topped with granola, coconut, and fresh berries',
        price: 11.99,
        image: 'https://images.unsplash.com/photo-1590301157890-4810ed352733?w=400&h=300&fit=crop',
        dietary: ['vegan', 'gluten-free'],
      },
    ],
  },
  {
    id: 'r7',
    name: 'Outback BBQ',
    zone: 'Habitats of the Earth',
    cuisine: 'american',
    description:
      'Smoky Australian-inspired barbecue with slow-cooked ribs, pulled pork, and grilled corn. Outdoor picnic tables overlook the koala habitat.',
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&h=600&fit=crop',
    rating: 4.3,
    reviewCount: 201,
    priceRange: '$$',
    hours: '11:00 AM - 7:00 PM',
    seating: 'outdoor',
    waitTime: '12 min',
    menu: [
      {
        id: 'm21',
        name: 'Smoked Brisket Plate',
        description: 'Slow-smoked beef brisket with coleslaw, baked beans, and cornbread',
        price: 17.99,
        image: 'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?w=400&h=300&fit=crop',
        dietary: [],
        popular: true,
      },
      {
        id: 'm22',
        name: 'Pulled Jackfruit Sandwich',
        description: 'BBQ jackfruit with pickled slaw on a toasted bun',
        price: 13.99,
        image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=400&h=300&fit=crop',
        dietary: ['vegan'],
      },
      {
        id: 'm23',
        name: 'Kids BBQ Plate',
        description: 'Mini pulled pork sliders with mac & cheese and fruit cup',
        price: 8.99,
        image: 'https://images.unsplash.com/photo-1562967914-608f82629710?w=400&h=300&fit=crop',
        dietary: ['kid-friendly'],
      },
    ],
  },
  {
    id: 'r8',
    name: 'Kettle Corn & Lemonade Stand',
    zone: 'Realm of Reptiles',
    cuisine: 'snacks',
    description:
      'Classic zoo snack stand with fresh kettle corn, hand-squeezed lemonade, cotton candy, and roasted nuts. A sweet stop between exhibits.',
    image: 'https://images.unsplash.com/photo-1504173010664-32509aeebb62?w=800&h=600&fit=crop',
    rating: 4.1,
    reviewCount: 312,
    priceRange: '$',
    hours: '9:30 AM - 6:30 PM',
    seating: 'outdoor',
    waitTime: '2 min',
    menu: [
      {
        id: 'm24',
        name: 'Fresh Kettle Corn',
        description: 'Sweet and salty kettle corn popped fresh throughout the day',
        price: 5.99,
        image: 'https://images.unsplash.com/photo-1578849278619-e73505e9610f?w=400&h=300&fit=crop',
        dietary: ['vegan', 'gluten-free'],
        popular: true,
      },
      {
        id: 'm25',
        name: 'Fresh-Squeezed Lemonade',
        description: 'Hand-squeezed lemonade with your choice of strawberry, peach, or classic',
        price: 4.99,
        image: 'https://images.unsplash.com/photo-1523677011781-c91d1bbe2f9e?w=400&h=300&fit=crop',
        dietary: ['vegan', 'gluten-free'],
      },
      {
        id: 'm26',
        name: 'Cotton Candy',
        description: 'Fluffy cotton candy in zoo-themed animal colors (blue lion, pink flamingo, green croc)',
        price: 4.99,
        image: 'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=400&h=300&fit=crop',
        dietary: ['gluten-free', 'kid-friendly'],
      },
    ],
  },
];
