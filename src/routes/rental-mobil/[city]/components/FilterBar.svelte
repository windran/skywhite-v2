<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import DurationFilter from './DurationFilter.svelte';
  import CarTypeFilter from './CarTypeFilter.svelte';
  import type { RentalFilter} from '$lib/types/rental-filters';
  import { DEFAULT_FILTER } from '$lib/constants/filters';

  export let filter: RentalFilter = DEFAULT_FILTER;
  
  const dispatch = createEventDispatcher<{
    change: RentalFilter
  }>();
  
  function handleDurationChange(event: CustomEvent<string>) {
    const newFilter = { ...filter, duration: event.detail as RentalFilter['duration'] };
    dispatch('change', newFilter);
  }
  
  function handleCarTypeChange(event: CustomEvent<string>) {
    const newFilter = { ...filter, carType: event.detail as RentalFilter['carType'] };
    dispatch('change', newFilter);
  }
  
  function resetFilters() {
    dispatch('change', DEFAULT_FILTER);
  }
</script>

<div class="bg-white rounded-lg shadow-md p-4 mb-6">
  <div class="flex justify-between items-center mb-4">
    <h3 id="filter-heading" class="font-semibold text-lg">Filter Pencarian</h3>
    <button 
      onclick={resetFilters}
      class="text-sm text-blue-600 hover:text-blue-800"
      aria-label="Reset semua filter"
    >
      Reset Filter
    </button>
  </div>
  
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4" role="group" aria-labelledby="filter-heading">
    <DurationFilter 
      value={filter.duration}
      on:change={handleDurationChange}
    />
    
    <CarTypeFilter
      value={filter.carType}
      on:change={handleCarTypeChange}
    />
  </div>
</div>