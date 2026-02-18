<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  type SeatCapacity = '4' | '5-6' | '>6' | null;
  
  let minPrice = $state(0);
  let maxPrice = $state(4000000);
  let selectedSeat: SeatCapacity = $state(null);
  
  const dispatch = createEventDispatcher<{
    change: { minPrice: number; maxPrice: number; seatCapacity: SeatCapacity }
  }>();
  
  // Logic Slider: Mencegah thumb saling tumpang tindih
  function handleMinPrice(e: Event) {
    const value = parseInt((e.target as HTMLInputElement).value);
    minPrice = Math.min(value, maxPrice - 200000); // Jarak minimal 200rb
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
    dispatch('change', { minPrice, maxPrice, seatCapacity: selectedSeat });
  }
  
  function formatPrice(price: number): string {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency', currency: 'IDR', maximumFractionDigits: 0
    }).format(price);
  }
  
  const minPercent = $derived((minPrice / 4000000) * 100);
  const maxPercent = $derived((maxPrice / 4000000) * 100);
  
  export function reset() {
    minPrice = 0;
    maxPrice = 4000000;
    selectedSeat = null;
    dispatchChange();
  }
</script>

<div class="filter-sidebar">
  <div class="filter-header">
    <div class="title-group">
      <span class="material-symbols-rounded">tune</span>
      <h2 class="filter-title">Filter Pencarian</h2>
    </div>
    <button class="reset-button" onclick={reset}>Reset</button>
  </div>

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
