<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import type { CarType } from '$lib/types/rental-filters';
  import { CAR_TYPE_LABELS } from '$lib/constants/filters';

  export let value: CarType = 'semua';
  
  const dispatch = createEventDispatcher<{
    change: string
  }>();
  
  let selectElement: HTMLSelectElement;
  
  function handleChange(event: Event) {
    const select = event.target as HTMLSelectElement;
    dispatch('change', select.value);
  }
</script>

<div>
  <!-- Cara 1: Pakai id dan for -->
  <label for="car-type-filter" class="block text-sm font-medium text-gray-700 mb-1">
    Tipe Mobil
  </label>
  <select 
    id="car-type-filter"
    bind:this={selectElement}
    {value}
    onchange={handleChange}
    class="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
  >
    {#each Object.entries(CAR_TYPE_LABELS) as [type, label]}
      <option value={type}>{label}</option>
    {/each}
  </select>
</div>

<!-- Atau Cara 2: Label membungkus select (lebih simple) -->
<!--
<div>
  <label class="block text-sm font-medium text-gray-700 mb-1">
    Tipe Mobil
    <select 
      {value}
      onchange={handleChange}
      class="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 mt-1"
    >
      {#each Object.entries(CAR_TYPE_LABELS) as [type, label]}
        <option value={type}>{label}</option>
      {/each}
    </select>
  </label>
</div>
-->