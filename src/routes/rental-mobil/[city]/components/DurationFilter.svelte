<script lang="ts">
  import type { RentalDuration } from '$lib/types/car';
  import { DURATION_LABELS } from '$lib/types/car';

  let { 
    value = $bindable('harian' as RentalDuration),
    onChange = (selectedValue: string) => {}
  } = $props();
  
  function handleChange(event: Event) {
    const select = event.target as HTMLSelectElement;
    value = select.value as RentalDuration;
    onChange(select.value);
  }
</script>

<div>
  <label for="duration-filter" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
    Durasi Sewa
  </label>
  <select 
    id="duration-filter"
    {value}
    onchange={handleChange}
    class="w-full p-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
  >
    {#each Object.entries(DURATION_LABELS) as [duration, label]}
      <option value={duration}>{label}</option>
    {/each}
  </select>
</div>