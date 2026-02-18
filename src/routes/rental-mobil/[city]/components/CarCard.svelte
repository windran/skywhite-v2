<script lang="ts">
  interface CarPrice {
    harian?: number;
    mingguan?: number;
    bulanan?: number;
    tahunan?: number;
    [key: string]: number | undefined;
  }

  interface Car {
    id: string;
    slug?: string;
    name: string;
    brand?: string;
    type?: string;
    transmission?: string;
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
  }

  type RentalDuration = 'harian' | 'mingguan' | 'bulanan' | 'tahunan';

  interface Props {
    car: Car;
    duration: RentalDuration;
    city: string;
    // Gunakan onSelect sebagai callback
    onSelect?: () => void;
  }

  let { car, duration, city, onSelect }: Props = $props();

  const transmissionDisplay = $derived(() => {
    const t = car.transmission?.toLowerCase() || '';
    if (t.includes('auto')) return 'AUTOMATIC';
    if (t.includes('manual')) return 'MANUAL';
    return 'AUTOMATIC';
  });

  const brandDisplay = $derived(car.brand?.toUpperCase() ?? 'UNIT');
  const carNameDisplay = $derived(car.name.toUpperCase());

  const priceValue = $derived(car.price?.[duration] ?? car.price?.harian ?? 0);
  const durationLabel = $derived(
    duration === 'harian' ? 'hari' :
    duration === 'mingguan' ? 'minggu' :
    duration === 'bulanan' ? 'bulan' : 'tahun'
  );

  function formatPrice(p: number) {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(p).replace('Rp', 'Rp ');
  }
</script>

<button class="mobile-premium-card" onclick={onSelect} type="button">
  <div class="top-meta">
    <span class="category-text">{car.type?.toUpperCase() || 'PASSENGER'}</span>
    <span class="city-text">
      <span class="material-symbols-rounded">location_on</span> {city}
    </span>
  </div>

  <div class="main-visual">
    <div class="img-container">
      <img src={car.image || car.images?.[0]} alt={car.name} class="car-img" />
    </div>
    <div class="title-container">
      <span class="brand-label">{brandDisplay}</span>
      <h3 class="car-name">{carNameDisplay}</h3>
      <div class="service-tag">
      </div>
    </div>
  </div>

  <div class="specs-grid">
    <div class="spec-item">
      <span class="material-symbols-rounded">settings</span>
      <span>{transmissionDisplay()}</span>
    </div>
    <div class="spec-item">
      <span class="material-symbols-rounded">group</span>
      <span>{car.capacity ?? 7} Kursi</span>
    </div>
    <div class="spec-item">
      <span class="material-symbols-rounded">luggage</span>
      <span>{car.luggage ?? 2} Bagasi</span>
    </div>
    <div class="spec-item">
      <span class="material-symbols-rounded">ac_unit</span>
      <span>A/C Dingin</span>
    </div>
  </div>

  <div class="divider"></div>

<div class="card-footer">
    <span class="footer-label">Harga Sewa</span>
    <div class="price-container">
      <div class="price-value">
        <span class="amount">{formatPrice(priceValue)}</span>
        <span class="unit">/{durationLabel}</span>
      </div>
    </div>
  </div>
</button>