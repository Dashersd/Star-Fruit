export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  packSize: string;
  stockStatus: 'In Stock' | 'Low Stock' | 'Available Tomorrow' | 'Out of Stock';
  description: string;
  image: string;
}

export const mockProducts: Product[] = [
  {
    id: 'p-001',
    name: 'Fresh Hass Avocados',
    category: 'Produce',
    price: 34.50,
    packSize: 'Case Pack (48 ct)',
    stockStatus: 'In Stock',
    description: 'Premium quality Hass avocados, perfect for guacamole, salads, and garnishes.',
    image: 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?q=80&w=600&auto=format&fit=crop',
  },
  {
    id: 'p-002',
    name: 'Organic Roma Tomatoes',
    category: 'Produce',
    price: 22.00,
    packSize: 'Case Pack (25 lb)',
    stockStatus: 'Low Stock',
    description: 'Fresh organic Roma tomatoes, ideal for sauces, salsas, and slicing.',
    image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?q=80&w=600&auto=format&fit=crop',
  },
  {
    id: 'p-003',
    name: 'Jumbo Yellow Onions',
    category: 'Produce',
    price: 18.75,
    packSize: 'Bag (50 lb)',
    stockStatus: 'In Stock',
    description: 'Large, firm yellow onions with a mild, sweet flavor.',
    image: 'https://images.unsplash.com/photo-1620574387735-3624d75b2dbc?q=80&w=600&auto=format&fit=crop',
  },
  {
    id: 'p-004',
    name: 'Fresh Cilantro',
    category: 'Herbs',
    price: 12.00,
    packSize: 'Box (30 bunches)',
    stockStatus: 'Available Tomorrow',
    description: 'Vibrant, aromatic fresh cilantro bunches.',
    image: '/celentro.png',
  },
  {
    id: 'p-005',
    name: 'Boneless Skinless Chicken Breast',
    category: 'Meat & Poultry',
    price: 75.00,
    packSize: 'Case (40 lb)',
    stockStatus: 'In Stock',
    description: 'High-quality boneless, skinless chicken breasts. Ice packed.',
    image: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?q=80&w=600&auto=format&fit=crop',
  },
  {
    id: 'p-006',
    name: 'Extra Virgin Olive Oil',
    category: 'Pantry',
    price: 45.00,
    packSize: 'Jug (10 L)',
    stockStatus: 'In Stock',
    description: 'First cold-pressed extra virgin olive oil for cooking and dressings.',
    image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?q=80&w=600&auto=format&fit=crop',
  },
  {
    id: 'p-007',
    name: 'Premium Wagyu Beef Ribeye',
    category: 'Meat & Poultry',
    price: 450.00,
    packSize: 'Case (15 lb)',
    stockStatus: 'Low Stock',
    description: 'A5 grade Wagyu ribeye cuts with exceptional marbling for premium steaks.',
    image: 'https://images.unsplash.com/photo-1603360946369-dc9bb6258143?q=80&w=600&auto=format&fit=crop',
  },
  {
    id: 'p-008',
    name: 'White Truffle Oil',
    category: 'Pantry',
    price: 120.00,
    packSize: 'Case (6 x 500ml)',
    stockStatus: 'In Stock',
    description: 'Artisan olive oil infused with the earthy, rich essence of Italian white truffles.',
    image: '/truffle.png',
  },
  {
    id: 'p-009',
    name: 'Organic Baby Spinach',
    category: 'Produce',
    price: 28.00,
    packSize: 'Box (3 lb)',
    stockStatus: 'In Stock',
    description: 'Triple-washed organic baby spinach leaves, perfect for fresh salads and wilting.',
    image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?q=80&w=600&auto=format&fit=crop',
  },
  {
    id: 'p-010',
    name: 'Spanish Saffron Threads',
    category: 'Spices',
    price: 85.00,
    packSize: 'Tin (1 oz)',
    stockStatus: 'Out of Stock',
    description: 'Premium Coupe grade Spanish saffron threads for paellas, risottos, and seafood.',
    image: '/saffron.png',
  },
  {
    id: 'p-011',
    name: 'Wild Alaskan King Salmon',
    category: 'Seafood',
    price: 195.00,
    packSize: 'Case (20 lb)',
    stockStatus: 'Available Tomorrow',
    description: 'Fresh-caught, sustainably sourced Wild Alaskan King Salmon sides.',
    image: '/salmon.png',
  },
  {
    id: 'p-012',
    name: 'Artisan Sourdough Boules',
    category: 'Bakery',
    price: 48.00,
    packSize: 'Case (12 loaves)',
    stockStatus: 'In Stock',
    description: 'Freshly baked naturally leavened sourdough bread with a blistered crust.',
    image: '/sourdough.png',
  }
];
