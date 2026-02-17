<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import type { RentalDuration } from '$lib/types/rental-filters';
  import { DURATION_LABELS } from '$lib/constants/filters';

  export let value: RentalDuration = 'harian';
  
  const dispatch = createEventDispatcher<{
    change: string
  }>();
  
  function handleChange(event: Event) {
    const select = event.target as HTMLSelectElement;
    dispatch('change', select.value);
  }
</script>

<div>
  <label for="duration-filter" class="block text-sm font-medium text-gray-700 mb-1">
    Durasi Sewa
  </label>
  <select 
    id="duration-filter"
    {value}
    onchange={handleChange}
    class="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
  >
    {#each Object.entries(DURATION_LABELS) as [duration, label]}
      <option value={duration}>{label}</option>
    {/each}
  </select>
</div>