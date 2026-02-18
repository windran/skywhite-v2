<script lang="ts">
  import type { CarType } from '$lib/types/car';
  import { CAR_TYPE_LABELS } from '$lib/types/car';

  let { 
    value = $bindable('semua' as CarType),
    onChange = (selectedValue: string) => {}
  } = $props();
  
  let selectElement: HTMLSelectElement;
  
  function handleChange(event: Event) {
    const select = event.target as HTMLSelectElement;
    value = select.value as CarType;
    onChange(select.value);
  }
</script>

<div>
  <label for="car-type-filter" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
    Tipe Mobil
  </label>
  <select 
    id="car-type-filter"
    bind:this={selectElement}
    {value}
    onchange={handleChange}
    class="w-full p-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
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