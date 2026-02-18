<script lang="ts">
  // Module context tetap aman digunakan jika diperlukan di luar
  export type SortOption = 'harga-terendah' | 'harga-tertinggi' | 'kapasitas-terendah' | 'kapasitas-tertinggi';

  interface Props {
    value?: SortOption;
    onsort: (val: SortOption) => void;
  }

  let { 
    value = $bindable('harga-terendah'), 
    onsort 
  }: { 
    value?: SortOption; 
    onsort: (val: SortOption) => void 
  } = $props();

  const options: { value: SortOption; label: string; icon: string }[] = [
    { value: 'harga-terendah', label: 'Harga: Termurah', icon: 'payments' },
    { value: 'harga-tertinggi', label: 'Harga: Termahal', icon: 'diamond' },
    { value: 'kapasitas-terendah', label: 'Kursi: Sedikit', icon: 'person' },
    { value: 'kapasitas-tertinggi', label: 'Kursi: Terbanyak', icon: 'groups' }
  ];

  function handleChange(event: Event) {
    const select = event.target as HTMLSelectElement;
    onsort(select.value as SortOption);
  }
</script>

<div class="sort-container">
  <div class="sort-meta">
    <span class="material-symbols-rounded">sort</span>
    <label for="sort-select">Urutkan</label>
  </div>
  
  <div class="select-wrapper">
    <select 
      id="sort-select"
      {value}
      onchange={handleChange}
      class="sort-select"
    >
      {#each options as option}
        <option value={option.value}>
          {option.label}
        </option>
      {/each}
    </select>
    <span class="chevron material-symbols-rounded">expand_more</span>
  </div>
</div>
