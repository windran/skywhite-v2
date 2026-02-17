<script lang="ts">
  import Breadcrumb from '$lib/components/Breadcrumb.svelte';
  import { generateCityService } from '$lib/seo/cityService';
  import FilterBar from './components/FilterBar.svelte';
  import CarCard from './components/CarCard.svelte';
  import type { RentalFilter } from '$lib/types/rental-filters';
  import { DEFAULT_FILTER } from '$lib/constants/filters';

  const { data } = $props();

  const city = $derived(data.city);
  const meta = $derived(data.meta);
  const cityContent = $derived(data.cityContent);
  const cityDistricts = $derived(data.cityDistricts);
  
  const availableCars = $derived(data.availableCars || []);

  let filter = $state<RentalFilter>(DEFAULT_FILTER);
  let filteredCars = $state<any[]>([]);

  $effect(() => {
    filteredCars = availableCars.filter((car: any) => {
      if (!car.price?.[filter.duration]) return false;
      if (filter.carType !== 'semua' && car.type !== filter.carType) return false;
      if (filter.transmission !== 'semua' && car.transmission !== filter.transmission) return false;
      if (filter.driver === 'dengan_supir' && !car.withDriver) return false;
      if (filter.driver === 'lepas_kunci' && car.withDriver) return false;
      return true;
    });
  });

  function handleFilterChange(event: CustomEvent<RentalFilter>) {
    filter = event.detail;
  }

  const schema = $derived(
    generateCityService({
      ...city,
      units: availableCars
    })
  );

  const pageTitle = $derived(
    `Rental Mobil ${city.name} - ${
      filter.duration === 'harian' ? 'Sewa Harian' : 
      filter.duration === 'mingguan' ? 'Sewa Mingguan' : 
      filter.duration === 'bulanan' ? 'Sewa Bulanan' : 
      'Sewa Tahunan'
    } | SkyWhite`
  );
</script>

<svelte:head>
  <title>{pageTitle}</title>
  <meta name="description" content={meta.description} />
  <link rel="canonical" href={meta.canonical} />

  {#if schema}
    <script type="application/ld+json">
      {@html JSON.stringify(schema)}
    </script>
  {/if}
</svelte:head>

<div class="container mx-auto px-4 py-8">
  <!-- Breadcrumb -->
  <Breadcrumb
    items={[
      { label: "Home", url: "/" },
      { label: "Rental Mobil", url: "/rental-mobil/" },
      { label: city.name }
    ]}
  />

  <!-- Header -->
  <h1 class="text-3xl font-bold mb-2">Rental Mobil {city.name}</h1>
  
  {#if cityContent?.body}
    <div class="prose max-w-none mb-6">{@html cityContent.body}</div>
  {:else}
    <p class="text-gray-600 mb-6">{city.description}</p>
  {/if}

  <!-- Filter Bar -->
  <FilterBar {filter} on:change={handleFilterChange} />

  <!-- Stats -->
  <div class="flex justify-between items-center mb-4">
    <p class="text-sm text-gray-600">
      Menampilkan <span class="font-semibold">{filteredCars.length}</span> dari 
      <span class="font-semibold">{availableCars.length}</span> unit
    </p>
  </div>

  <!-- Car Grid -->
  {#if filteredCars.length > 0}
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
      {#each filteredCars as car (car.id)}
        <CarCard {car} duration={filter.duration} city={city.slug} />
      {/each}
    </div>
  {:else}
    <div class="text-center py-12 bg-gray-50 rounded-lg mb-12">
      <p class="text-gray-500 mb-2">Tidak ada unit yang sesuai dengan filter Anda</p>
      <button 
        onclick={() => filter = DEFAULT_FILTER}
        class="text-blue-600 hover:text-blue-800 font-medium"
        aria-label="Reset filter untuk melihat semua unit"
      >
        Reset Filter
      </button>
    </div>
  {/if}

  <!-- Districts Section -->
  {#if cityDistricts?.length > 0}
    <section class="mb-12" aria-labelledby="districts-heading">
      <h2 id="districts-heading" class="text-2xl font-semibold mb-4">Area Layanan di {city.name}</h2>
      <ul class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {#each cityDistricts as district}
          <li>
            <a 
              href={`/rental-mobil/${city.slug}/${district.slug}/`}
              class="block p-3 bg-gray-50 hover:bg-blue-50 rounded-lg transition-colors"
              aria-label={`Lihat rental mobil di ${district.name}`}
            >
              Rental Mobil {district.name}
            </a>
          </li>
        {/each}
      </ul>
    </section>
  {/if}
</div>

<style>
  .prose {
    color: #374151;
    line-height: 1.6;
  }
</style>