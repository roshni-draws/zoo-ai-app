export interface Shop {
  id: string;
  name: string;
  zone: string;
  description: string;
  image: string;
  hours: string;
  specialties: string[];
  priceRange: '$' | '$$' | '$$$';
  featured: { name: string; price: number; image: string }[];
}

export const shops: Shop[] = [
  {
    id: 'shop-1',
    name: 'Safari Outfitters',
    zone: 'Wonders of the Wild',
    description:
      'The zoo\'s flagship store with the widest selection of plush animals, apparel, and safari gear. Find everything from lion plushies to conservation-themed jewelry.',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop',
    hours: '9:00 AM - 7:30 PM',
    specialties: ['Plush animals', 'Safari apparel', 'Conservation jewelry', 'Kids costumes'],
    priceRange: '$$',
    featured: [
      { name: 'Giant Lion Plush (24")', price: 34.99, image: 'https://images.unsplash.com/photo-1559715541-5daf8a0296d0?w=300&h=300&fit=crop' },
      { name: 'Safari Explorer Hat', price: 22.99, image: 'https://images.unsplash.com/photo-1521369909029-2afed882baee?w=300&h=300&fit=crop' },
      { name: 'Conservation Charm Bracelet', price: 18.99, image: 'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=300&h=300&fit=crop' },
    ],
  },
  {
    id: 'shop-2',
    name: 'Feather & Flight',
    zone: 'Wings of the Sky',
    description:
      'Bird-themed gifts, binoculars, field guides, and hand-painted ornaments. A birdwatcher\'s paradise with items sourced from conservation artisans.',
    image: 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=800&h=600&fit=crop',
    hours: '9:30 AM - 6:00 PM',
    specialties: ['Binoculars', 'Field guides', 'Bird ornaments', 'Birdhouse kits'],
    priceRange: '$$',
    featured: [
      { name: 'Compact Birding Binoculars', price: 49.99, image: 'https://images.unsplash.com/photo-1509460913899-515f1df34fea?w=300&h=300&fit=crop' },
      { name: 'Illustrated Bird Field Guide', price: 24.99, image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=300&fit=crop' },
      { name: 'Hand-Painted Macaw Ornament', price: 15.99, image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=300&h=300&fit=crop' },
    ],
  },
  {
    id: 'shop-3',
    name: 'Scales & Tales',
    zone: 'Realm of Reptiles',
    description:
      'Reptile-themed merchandise, educational toys, and fossils. From realistic dinosaur figures to shed snake skin displays, this shop is a hit with curious kids.',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800&h=600&fit=crop',
    hours: '9:30 AM - 6:00 PM',
    specialties: ['Dinosaur figures', 'Fossil kits', 'Reptile books', 'Educational toys'],
    priceRange: '$',
    featured: [
      { name: 'Fossil Dig Kit', price: 19.99, image: 'https://images.unsplash.com/photo-1530587191325-3db32d826c18?w=300&h=300&fit=crop' },
      { name: 'Realistic Komodo Dragon Figure', price: 12.99, image: 'https://images.unsplash.com/photo-1504450874802-0ba2bcd659e0?w=300&h=300&fit=crop' },
      { name: 'Reptile Encyclopedia for Kids', price: 16.99, image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=300&fit=crop' },
    ],
  },
  {
    id: 'shop-4',
    name: 'Ocean Treasures',
    zone: 'Blue Planet Wonders',
    description:
      'Marine-themed gifts, jewelry made from recycled ocean plastic, and plush sea creatures. Every purchase supports ocean conservation efforts.',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=600&fit=crop',
    hours: '9:30 AM - 6:30 PM',
    specialties: ['Recycled ocean jewelry', 'Sea creature plush', 'Marine books', 'Reef-safe sunscreen'],
    priceRange: '$$',
    featured: [
      { name: 'Recycled Ocean Plastic Bracelet', price: 14.99, image: 'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=300&h=300&fit=crop' },
      { name: 'Emperor Penguin Plush (18")', price: 28.99, image: 'https://images.unsplash.com/photo-1559715541-5daf8a0296d0?w=300&h=300&fit=crop' },
      { name: 'Reef-Safe Sunscreen Set', price: 19.99, image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=300&h=300&fit=crop' },
    ],
  },
  {
    id: 'shop-5',
    name: 'Tiny Wonders Curiosity Shop',
    zone: 'Secret Life of Small Things',
    description:
      'Insect terrariums, butterfly growing kits, magnifying glasses, and nature journals. Spark curiosity in young scientists with hands-on nature kits.',
    image: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=800&h=600&fit=crop',
    hours: '10:00 AM - 5:30 PM',
    specialties: ['Bug kits', 'Butterfly growing kits', 'Magnifying glasses', 'Nature journals'],
    priceRange: '$',
    featured: [
      { name: 'Butterfly Growing Kit', price: 24.99, image: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=300&h=300&fit=crop' },
      { name: 'LED Magnifying Glass', price: 9.99, image: 'https://images.unsplash.com/photo-1530587191325-3db32d826c18?w=300&h=300&fit=crop' },
      { name: 'Nature Explorer Journal', price: 12.99, image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=300&fit=crop' },
    ],
  },
  {
    id: 'shop-6',
    name: 'Global Habitats Gift Shop',
    zone: 'Habitats of the Earth',
    description:
      'Gifts inspired by ecosystems around the world. Australian boomerangs, Himalayan prayer flags, Arctic snow globes, and bamboo-themed panda merchandise.',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop',
    hours: '9:30 AM - 6:30 PM',
    specialties: ['Global artisan crafts', 'Panda merchandise', 'Eco-friendly products', 'Snow globes'],
    priceRange: '$$',
    featured: [
      { name: 'Panda & Bamboo Snow Globe', price: 21.99, image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=300&h=300&fit=crop' },
      { name: 'Bamboo Fiber Travel Mug', price: 16.99, image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=300&h=300&fit=crop' },
      { name: 'Red Panda Plush (12")', price: 22.99, image: 'https://images.unsplash.com/photo-1559715541-5daf8a0296d0?w=300&h=300&fit=crop' },
    ],
  },
];
