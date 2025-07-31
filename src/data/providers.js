/**
 * Mock data for service providers used to populate the home
 * screen.  When connecting to Firebase you can replace this
 * static array with a call to Firestore to fetch provider
 * documents.  Each provider has a unique id, category, price,
 * image and rating.
 */
export const providers = [
  {
    id: '1',
    name: 'Zen Wellness Spa',
    category: 'Aesthetics',
    rating: 4.8,
    price: 60,
    bio: 'Unwind and rejuvenate with our relaxing spa treatments in the heart of London.',
    image:
      'https://images.unsplash.com/photo-1555992336-c1732eda09d5?auto=format&fit=crop&w=800&q=60',
  },
  {
    id: '2',
    name: 'FitLife Personal Training',
    category: 'Fitness',
    rating: 4.9,
    price: 50,
    bio: 'Achieve your fitness goals with bespoke training sessions from certified professionals.',
    image:
      'https://images.unsplash.com/photo-1558611848-73f7eb4001e3?auto=format&fit=crop&w=800&q=60',
  },
  {
    id: '3',
    name: 'Mind Balance Therapy',
    category: 'Therapy',
    rating: 4.7,
    price: 70,
    bio: 'Holistic counselling and mindfulness sessions to help you find balance and clarity.',
    image:
      'https://images.unsplash.com/photo-1556741533-f6acd6479512?auto=format&fit=crop&w=800&q=60',
  },
  {
    id: '4',
    name: 'Glow Aesthetics Clinic',
    category: 'Botox',
    rating: 4.6,
    price: 150,
    bio: 'State‑of‑the‑art aesthetic treatments including Botox and fillers performed by experts.',
    image:
      'https://images.unsplash.com/photo-1591452016009-de0062297984?auto=format&fit=crop&w=800&q=60',
  },
];