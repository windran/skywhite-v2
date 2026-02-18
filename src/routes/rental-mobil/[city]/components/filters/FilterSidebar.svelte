<script lang="ts">
  import FilterContent, { type SeatCapacity } from './FilterContent.svelte';
  
  interface FilterChangeData {
    minPrice: number;
    maxPrice: number;
    seatCapacity: SeatCapacity | null;
  }
  
  let { 
    minPrice = $bindable(0),
    maxPrice = $bindable(4000000),
    selectedSeat = $bindable(null as SeatCapacity | null),
    onChange = (data: FilterChangeData) => {}
  } = $props();
  
  let filterContent: FilterContent;
  
  function handleFilterChange(data: FilterChangeData) {
    minPrice = data.minPrice;
    maxPrice = data.maxPrice;
    selectedSeat = data.seatCapacity;
    
    onChange({
      minPrice: data.minPrice,
      maxPrice: data.maxPrice,
      seatCapacity: data.seatCapacity
    });
  }
  
  function handleReset() {
    filterContent?.reset();
  }
</script>

<div class="filter-sidebar">
  <div class="filter-header">
    <div class="title-group">
      <span class="material-symbols-rounded">tune</span>
      <h2 class="filter-title">Filter Pencarian</h2>
    </div>
    <button class="reset-button" onclick={handleReset}>Reset</button>
  </div>

  <FilterContent 
    bind:this={filterContent}
    externalMinPrice={minPrice}
    externalMaxPrice={maxPrice}
    externalSelectedSeat={selectedSeat}
    onChange={handleFilterChange}
  />
</div>