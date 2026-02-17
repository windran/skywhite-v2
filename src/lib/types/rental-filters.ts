// src/lib/types/rental-filters.ts
export type RentalDuration = 'harian' | 'mingguan' | 'bulanan' | 'tahunan';
export type PickupLocation = 'bandara' | 'stasiun' | 'hotel' | 'pusat_kota' | 'semua';
export type CarType = 'mpv' | 'suv' | 'hatchback' | 'sedan' | 'premium' | 'semua';
export type Transmission = 'manual' | 'matik' | 'semua';
export type DriverOption = 'dengan_supir' | 'lepas_kunci' | 'semua';

export interface RentalFilter {
  duration: RentalDuration;
  pickupLocation: PickupLocation;
  carType: CarType;
  transmission: Transmission;
  driver: DriverOption;
  minPrice?: number;
  maxPrice?: number;
}

export interface Car {
  id: string;
  name: string;
  brand: string;
  type: CarType;
  transmission: Transmission;
  capacity: number;
  baggage: number;
  price: {
    harian: number;
    mingguan: number;
    bulanan: number;
    tahunan?: number;
  };
  withDriver: boolean;
  image: string;
  features: string[];
  availableIn: string[];
}