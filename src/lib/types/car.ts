// src/lib/types/car.ts
export interface CarPrice {
  harian?: number;
  mingguan?: number;
  bulanan?: number;
  tahunan?: number;
  [key: string]: number | undefined;
}

export interface Car {
  id: string;
  slug?: string;
  name: string;
  brand?: string;
  type?: CarType;
  transmission?: Transmission; // Akan menggunakan tipe yang sudah didefinisikan
  capacity?: number;
  luggage?: number;
  year?: number;
  image?: string;
  images?: string[];
  price?: CarPrice;
  withDriver?: boolean;
  features?: string[];
  isAvailable?: boolean;
  description?: string;
  availableIn?: string[];
}

// Tipe-tipe untuk filter - gunakan huruf kecil semua untuk konsistensi
export type RentalDuration = 'harian' | 'mingguan' | 'bulanan' | 'tahunan';
export type PickupLocation = 'bandara' | 'stasiun' | 'hotel' | 'pusat_kota' | 'semua';
export type CarType = 'mpv' | 'suv' | 'hatchback' | 'sedan' | 'premium' | 'semua';

// Perbaiki di sini - gunakan nilai yang sesuai dengan data
export type Transmission = 'manual' | 'matic' | 'auto' | 'semua'; // Tambahkan 'auto'

export type DriverOption = 'dengan_supir' | 'lepas_kunci' | 'semua';

export interface RentalFilter {
  duration: RentalDuration;
  pickupLocation?: PickupLocation;
  carType: CarType;
  transmission: Transmission;
  driver: DriverOption;
}

// Label-label untuk display
export const DURATION_LABELS: Record<RentalDuration, string> = {
  harian: 'Harian (1-6 hari)',
  mingguan: 'Mingguan (7-13 hari)',
  bulanan: 'Bulanan (14-29 hari)',
  tahunan: 'Tahunan (30+ hari)'
};

export const LOCATION_LABELS: Record<PickupLocation, string> = {
  bandara: 'Bandara',
  stasiun: 'Stasiun',
  hotel: 'Hotel',
  pusat_kota: 'Pusat Kota',
  semua: 'Semua Lokasi'
};

export const CAR_TYPE_LABELS: Record<CarType, string> = {
  mpv: 'MPV (Keluarga)',
  suv: 'SUV (Offroad)',
  hatchback: 'Hatchback (Ekonomis)',
  sedan: 'Sedan (Executive)',
  premium: 'Premium (Mewah)',
  semua: 'Semua Tipe'
};

export const TRANSMISSION_LABELS: Record<Transmission, string> = {
  manual: 'Manual',
  matic: 'Matic',
  auto: 'Matic', // 'auto' juga dianggap Matic
  semua: 'Semua Transmisi'
};

export const DRIVER_LABELS: Record<DriverOption, string> = {
  dengan_supir: 'Dengan Supir',
  lepas_kunci: 'Lepas Kunci',
  semua: 'Semua Opsi'
};

export const DEFAULT_FILTER: RentalFilter = {
  duration: 'harian',
  pickupLocation: 'semua',
  carType: 'semua',
  transmission: 'semua',
  driver: 'semua'
};