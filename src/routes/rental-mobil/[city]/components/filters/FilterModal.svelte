<script lang="ts">
  import FilterContent, { type SeatCapacity } from './FilterContent.svelte';
  import { fade, slide } from 'svelte/transition';

  interface FilterChangeData {
    minPrice: number;
    maxPrice: number;
    seatCapacity: SeatCapacity | null;
  }
  
  // Gunakan $props() dengan bindable untuk properti yang bisa di-bind
  let { 
    isOpen = $bindable(false), 
    minPrice = $bindable(0),
    maxPrice = $bindable(4000000),
    selectedSeat = $bindable(null as SeatCapacity | null),
    onChange = (data: FilterChangeData) => {},
    onClose = () => {}
  } = $props();
  
  // Gunakan $state untuk ref yang akan di-update
  let filterContent = $state<FilterContent>();
  
  function handleFilterChange(data: FilterChangeData) {
    // Update bindable props
    minPrice = data.minPrice;
    maxPrice = data.maxPrice;
    selectedSeat = data.seatCapacity;
  }
  
  function handleReset() {
    filterContent?.reset();
  }
  
  function handleClose() {
    isOpen = false;
    onClose();
  }
  
  function handleApply() {
    // Emit change only when user explicitly applies the filters
    onChange({ minPrice, maxPrice, seatCapacity: selectedSeat });
    handleClose();
  }
  
  function handleOverlayClick(e: MouseEvent) {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  }

  // Handle keyboard events untuk aksesibilitas
  function handleOverlayKeyDown(e: KeyboardEvent) {
    if (e.key === 'Escape') {
      handleClose();
    }
  }
</script>

{#if isOpen}
  <!-- Tambahkan role dan keyboard handler untuk aksesibilitas -->
  <div 
    class="modal-overlay" 
    class:open={isOpen}
    onclick={handleOverlayClick}
    onkeydown={handleOverlayKeyDown}
    role="button"
    tabindex="0"
    aria-label="Tutup modal filter"
    transition:fade={{ duration: 200 }}
  >
    <!-- Modal content tidak perlu role karena sudah di dalam overlay -->
    <div 
      class="modal-content"
      transition:slide={{ duration: 300 }}
      role="dialog"
      aria-modal="true"
      aria-label="Filter pencarian mobil"
    >
      <div class="modal-header">
        <h2 class="modal-title" id="modal-title">Filter Pencarian</h2>
        <button 
          class="close-button" 
          onclick={handleClose}
          aria-label="Tutup"
        >
          <span class="material-symbols-rounded">close</span>
        </button>
      </div>
      
      <div class="modal-body" aria-labelledby="modal-title">
        <FilterContent 
          bind:this={filterContent}
          externalMinPrice={minPrice}
          externalMaxPrice={maxPrice}
          externalSelectedSeat={selectedSeat}
          onChange={handleFilterChange}
        />
      </div>
      
      <div class="modal-footer">
        <button 
          class="reset-button" 
          onclick={handleReset}
          aria-label="Reset semua filter"
        >
          Reset
        </button>
        <button 
          class="apply-button" 
          onclick={handleApply}
          aria-label="Terapkan filter"
        >
          Terapkan
        </button>
      </div>
    </div>
  </div>
{/if}