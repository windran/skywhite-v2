<script lang="ts">
  export type SeatCapacity = '4' | '5-6' | '>6' | null;

  interface FilterChangeData {
    minPrice: number;
    maxPrice: number;
    seatCapacity: SeatCapacity;
  }
  
  // Props dengan nilai default
  let { 
    externalMinPrice = null,
    externalMaxPrice = null,
    externalSelectedSeat = null,
    onChange = (data: FilterChangeData) => {}
  }: {
    externalMinPrice?: number | null;
    externalMaxPrice?: number | null;
    externalSelectedSeat?: SeatCapacity | null;
    onChange?: (data: FilterChangeData) => void;
  } = $props();
  
  // Internal state
  let minPrice = $state(0);
  let maxPrice = $state(4000000);
  let selectedSeat: SeatCapacity = $state(null);
  
  // Gunakan $effect untuk merespon perubahan props
  $effect(() => {
    if (externalMinPrice !== null && externalMinPrice !== undefined) {
      minPrice = externalMinPrice;
    }
  });

  $effect(() => {
    if (externalMaxPrice !== null && externalMaxPrice !== undefined) {
      maxPrice = externalMaxPrice;
    }
  });

  $effect(() => {
    if (externalSelectedSeat !== null && externalSelectedSeat !== undefined) {
      selectedSeat = externalSelectedSeat;
    }
  });
  
  function handleMinPrice(e: Event) {
    const value = parseInt((e.target as HTMLInputElement).value);
    minPrice = Math.min(value, maxPrice - 200000);
    dispatchChange();
  }
  
  function handleMaxPrice(e: Event) {
    const value = parseInt((e.target as HTMLInputElement).value);
    maxPrice = Math.max(value, minPrice + 200000);
    dispatchChange();
  }

  function selectSeat(seat: SeatCapacity) {
    selectedSeat = selectedSeat === seat ? null : seat;
    dispatchChange();
  }

  function dispatchChange() {
    onChange({ minPrice, maxPrice, seatCapacity: selectedSeat });
  }
  
  function formatPrice(price: number): string {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency', currency: 'IDR', maximumFractionDigits: 0
    }).format(price);
  }
  
  const minPercent = $derived((minPrice / 4000000) * 100);
  const maxPercent = $derived((maxPrice / 4000000) * 100);
  
  // Fungsi untuk reset dari parent
  export function reset() {
    minPrice = 0;
    maxPrice = 4000000;
    selectedSeat = null;
    dispatchChange();
  }
</script>

<!-- Konten filter - tetap sama -->
<div class="filter-content">
  <!-- Rentang Harga -->
  <div class="filter-section">
    <h3 class="section-label">Rentang Harga</h3>
    
    <div class="price-bubble-grid">
      <div class="price-bubble">
        <span>Min</span>
        <strong>{formatPrice(minPrice)}</strong>
      </div>
      <div class="price-bubble">
        <span>Max</span>
        <strong>{formatPrice(maxPrice)}</strong>
      </div>
    </div>
    
    <div class="range-container">
      <div class="range-track-base"></div>
      <div 
        class="range-track-fill"
        style="left: {minPercent}%; right: {100 - maxPercent}%;"
      ></div>
      
      <input 
        type="range" min="0" max="4000000" step="50000"
        bind:value={minPrice} oninput={handleMinPrice}
        class="range-input"
      />
      <input 
        type="range" min="0" max="4000000" step="50000"
        bind:value={maxPrice} oninput={handleMaxPrice}
        class="range-input"
      />
    </div>
    
    <div class="range-labels">
      <span>IDR 0</span>
      <span>IDR 4jt+</span>
    </div>
  </div>

  <!-- Kapasitas Kursi -->
  <div class="filter-section">
    <h3 class="section-label">Kapasitas Kursi</h3>
    <div class="seat-grid">
      {#each ['4', '5-6', '>6'] as seat}
        <button 
          class="seat-pill" 
          class:active={selectedSeat === seat}
          onclick={() => selectSeat(seat as SeatCapacity)}
        >
          <span class="material-symbols-rounded">chair</span>
          {seat === '>6' ? '6+ Kursi' : `${seat} Kursi`}
        </button>
      {/each}
    </div>
  </div>
</div>