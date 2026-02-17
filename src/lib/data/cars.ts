import type { Car } from '$lib/types/rental-filters';

export const cars: Car[] = [
  {
    id: 'avanza-2023',
    name: 'Toyota Avanza 2023',
    brand: 'Toyota',
    type: 'mpv',
    transmission: 'matik',
    capacity: 7,
    baggage: 3,
    price: {
      harian: 350000,
      mingguan: 2100000,
      bulanan: 8400000,
      tahunan: 0 // atau undefined kalau tidak tersedia
    },
    withDriver: true,
    image: '/images/cars/avanza.jpg',
    features: ['AC', 'Central Lock', 'Audio', 'USB Port'],
    availableIn: ['jakarta', 'bogor', 'depok', 'tangerang', 'bekasi']
  },
  {
    id: 'innova-2023',
    name: 'Toyota Innova Reborn',
    brand: 'Toyota',
    type: 'mpv',
    transmission: 'matik',
    capacity: 7,
    baggage: 4,
    price: {
      harian: 550000,
      mingguan: 3300000,
      bulanan: 13200000,
      tahunan: 0
    },
    withDriver: true,
    image: '/images/cars/innova.jpg',
    features: ['AC', 'Leather Seat', 'Audio', 'USB Port', 'Power Window'],
    availableIn: ['jakarta', 'bogor', 'bandung', 'surabaya']
  },
  {
    id: 'pajero-2023',
    name: 'Mitsubishi Pajero Sport',
    brand: 'Mitsubishi',
    type: 'suv',
    transmission: 'matik',
    capacity: 7,
    baggage: 3,
    price: {
      harian: 850000,
      mingguan: 5100000,
      bulanan: 20400000,
      tahunan: 0
    },
    withDriver: true,
    image: '/images/cars/pajero.jpg',
    features: ['AC', 'Leather Seat', 'Sunroof', '360 Camera', 'Premium Audio'],
    availableIn: ['jakarta', 'bandung', 'surabaya', 'bali']
  },
  {
    id: 'brio-2023',
    name: 'Honda Brio',
    brand: 'Honda',
    type: 'hatchback',
    transmission: 'manual',
    capacity: 5,
    baggage: 2,
    price: {
      harian: 250000,
      mingguan: 1500000,
      bulanan: 6000000,
      tahunan: 0
    },
    withDriver: false,
    image: '/images/cars/brio.jpg',
    features: ['AC', 'Audio', 'Efisien BBM'],
    availableIn: ['jakarta', 'bogor', 'depok', 'tangerang', 'bekasi', 'bandung']
  },
  {
    id: 'fortuner-2023',
    name: 'Toyota Fortuner',
    brand: 'Toyota',
    type: 'suv',
    transmission: 'matik',
    capacity: 7,
    baggage: 3,
    price: {
      harian: 950000,
      mingguan: 5700000,
      bulanan: 22800000,
      tahunan: 0
    },
    withDriver: true,
    image: '/images/cars/fortuner.jpg',
    features: ['AC', 'Leather Seat', '4x4', 'Sunroof', 'Premium Audio'],
    availableIn: ['jakarta', 'bandung', 'surabaya', 'bali', 'medan']
  }
];