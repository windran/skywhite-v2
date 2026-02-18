<script lang="ts">
  // Import types agar konsisten dengan file types yang sudah kita buat
  import type { Car, RentalDuration } from '$lib/types/car';

  interface Props {
    car: Car;
    duration: RentalDuration;
    city: string;
  }

  let { car, duration, city }: Props = $props();

  // Logic Harga & Label
  const price = $derived(car.price?.[duration] ?? car.price?.harian ?? 0);
  const unitLabel = $derived(
    duration === 'harian' ? '/ hari' :
    duration === 'mingguan' ? '/ minggu' :
    duration === 'bulanan' ? '/ bulan' : '/ tahun'
  );

  // Logic Penamaan & Tipe (Menggabungkan Brand + Name)
  const fullName = $derived(`${car.brand} ${car.name}`.toUpperCase());
  const carType = $derived(car.type?.toUpperCase() ?? 'UNIT KENDARAAN');
  const carImage = $derived(car.image ?? car.images?.[0] ?? 'https://via.placeholder.com/300x200');
  
  // Perbaikan Transmisi
  const transmissionDisplay = $derived(() => {
    const t = car.transmission?.toLowerCase() || '';
    if (t.includes('auto') || t.includes('matic')) return 'AUTOMATIC';
    if (t.includes('manual')) return 'MANUAL';
    return t.toUpperCase() || 'AUTOMATIC';
  });
</script>

<div class="card-container">
  <div class="main-grid">
    
    <div class="visual-box">
      <div class="img-glow"></div>
      <img src={carImage} alt={fullName} class="car-render" />
    </div>

    <div class="info-box">
      <div class="meta-header">
        <span class="category-tag">{carType}</span>
        {#if car.year}
          <span class="year-label">{car.year}</span>
        {/if}
      </div>
      
      <h3 class="car-model">{fullName}</h3>
      
      <div class="specs-grid">
        <div class="spec-item">
          <span class="material-symbols-rounded">settings</span>
          <span>{transmissionDisplay()}</span>
        </div>
        <div class="spec-item">
          <span class="material-symbols-rounded">group</span>
          <span>{car.capacity ?? 4} Kursi</span>
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

      <div class="trust-footer">
        <div class="trust-pill">
          <span class="material-symbols-rounded">verified_user</span>
          Asuransi Tercover
        </div>
        <div class="trust-pill">
          <span class="material-symbols-rounded">health_and_safety</span>
          Unit Higienis
        </div>
      </div>
    </div>

    <div class="price-box">
      <div class="pricing-info">
        <p class="price-label">Harga Sewa {duration}</p>
        <div class="price-display">
          <span class="currency">Rp</span>
          <span class="amount">{price.toLocaleString('id-ID')}</span>
          <span class="unit">{unitLabel}</span>
        </div>
        <div class="location-tag">
          <span class="material-symbols-rounded">location_on</span>
          Tersedia di {city}
        </div>
      </div>
      
      <button class="booking-btn" onclick={() => console.log('Open Booking Popup for:', car.id)}>
        <span>Pilih Unit</span>
        <div class="btn-icon">
          <span class="material-symbols-rounded">arrow_forward</span>
        </div>
      </button>
    </div>

  </div>
</div>