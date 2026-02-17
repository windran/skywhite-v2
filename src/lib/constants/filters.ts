import type { 
  RentalDuration, 
  PickupLocation, 
  CarType, 
  Transmission, 
  DriverOption 
} from '$lib/types/rental-filters';

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
  matik: 'Matic',
  semua: 'Semua Transmisi'
};

export const DRIVER_LABELS: Record<DriverOption, string> = {
  dengan_supir: 'Dengan Supir',
  lepas_kunci: 'Lepas Kunci',
  semua: 'Semua Opsi'
};

export const DEFAULT_FILTER = {
  duration: 'harian' as RentalDuration,
  pickupLocation: 'semua' as PickupLocation,
  carType: 'semua' as CarType,
  transmission: 'semua' as Transmission,
  driver: 'semua' as DriverOption
};