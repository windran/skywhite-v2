<script lang="ts">
  import Breadcrumb from '$lib/components/Breadcrumb.svelte';
  import FilterSidebar from './components/FilterSidebar.svelte';
  import SortDropdown, { type SortOption } from './components/SortDropdown.svelte';
  import TableOfContents from '$lib/components/TableOfContents.svelte';
  import { generateCityService } from '$lib/seo/cityService';
  import type { Car, RentalDuration } from '$lib/types/car';
  import { DEFAULT_FILTER } from '$lib/types/car';
  import CarCard from './components/CarCard.svelte';
  import CarCardDesktop from './components/CarCardDesktop.svelte';

  interface RentalFilter {
    duration: RentalDuration;
    carType: string;
    transmission: string;
    driver: 'semua' | 'dengan_supir' | 'lepas_kunci';
  }

  interface FAQItem {
    question: string;
    answer: string;
  }

  interface CityContent {
    body?: string;
    sections?: { id: string; title: string; }[];
    faq?: FAQItem[];
    quickTips?: string[];
  }

  const { data } = $props();

  // State untuk mobile drawer
  let isFilterDrawerOpen = $state(false);
  let isSortDrawerOpen = $state(false);  

  const city = $derived(data.city);
  const meta = $derived(data.meta);
  const cityContent = $derived<CityContent>(data.cityContent || {});
  const cityDistricts = $derived(data.cityDistricts || []);
  const availableCars = $derived<Car[]>(data.availableCars || []);
  const sections = $derived(cityContent.sections || []);

  let districtListText = $state('');
  let filter = $state<RentalFilter>(DEFAULT_FILTER);
  let priceRange = $state({ min: 0, max: 4000000 });
  let seatCapacity = $state<string | null>(null);
  let sortBy = $state<SortOption>('harga-terendah');
  
  let filteredCars = $state<Car[]>([]);
  let priceTableData = $state<{ name: string; capacity?: number; price: number }[]>([]);
  let cheapestCar = $state<Car | null>(null);
  
  // Mouse tracking for TOC
  let mouseX = $state(0);
  let mouseY = $state(0);

  $effect(() => {
    filteredCars = availableCars.filter((car: Car) => {
      const currentDuration = filter.duration as RentalDuration;
      if (!car.price?.[currentDuration]) return false;
      if (filter.carType !== 'semua' && car.type !== filter.carType) return false;
      if (filter.transmission !== 'semua' && car.transmission !== filter.transmission) return false;
      if (filter.driver === 'dengan_supir' && !car.withDriver) return false;
      if (filter.driver === 'lepas_kunci' && car.withDriver) return false;
      
      const carPrice = car.price?.[currentDuration] || 0;
      if (carPrice < priceRange.min || carPrice > priceRange.max) return false;
      
      if (seatCapacity) {
        const capacity = car.capacity ?? 0;
        if (seatCapacity === '4' && capacity > 4) return false;
        if (seatCapacity === '5-6' && (capacity < 5 || capacity > 6)) return false;
        if (seatCapacity === '>6' && capacity <= 6) return false;
      }
      return true;
    });
  });

  function sortCars(cars: Car[]): Car[] {
    return [...cars].sort((a, b) => {
      const currentDuration = filter.duration as RentalDuration;
      switch(sortBy) {
        case 'harga-terendah': return (a.price?.[currentDuration] || 0) - (b.price?.[currentDuration] || 0);
        case 'harga-tertinggi': return (b.price?.[currentDuration] || 0) - (a.price?.[currentDuration] || 0);
        case 'kapasitas-terendah': return (a.capacity || 0) - (b.capacity || 0);
        case 'kapasitas-tertinggi': return (b.capacity || 0) - (a.capacity || 0);
        default: return 0;
      }
    });
  }

  function handleSidebarFilter(event: CustomEvent) {
    priceRange = { min: event.detail.minPrice, max: event.detail.maxPrice };
    seatCapacity = event.detail.seatCapacity;
  }

  let schema = $state<any>(null);
  let pageTitle = $state('');

  $effect(() => {
    districtListText = cityDistricts.map((d: any) => d.name).join(', ');

    priceTableData = availableCars
      .slice(0, 6)
      .map((car: any) => ({
        name: car.name,
        capacity: car.capacity,
        price: car.price?.[filter.duration] || 0
      }));

    cheapestCar = [...availableCars].sort((a: any, b: any) =>
      (a.price?.[filter.duration] || 0) - (b.price?.[filter.duration] || 0)
    )[0] || null;

    schema = generateCityService({ ...city, units: availableCars });
    pageTitle = `Rental Mobil ${city.name} - ${(filter?.duration ?? '').toUpperCase()} | SkyWhite`;
  });

  // Track mouse position for TOC follow effect (clamped)
  let tocStyle = $state('');

  $effect(() => {
    let scrollTimer: any = null;
    let isScrolling = false;

    function handleMouseMove(e: MouseEvent) {
      mouseX = e.clientX;
      mouseY = e.clientY;

      // While user is actively scrolling, don't apply mouse-follow transforms.
      if (isScrolling) return;

      // Smooth small offset based on mouse Y, clamped so it stays inside the section
      const centerY = window.innerHeight / 2;
      let offset = Math.round((mouseY - centerY) * 0.12);
      if (offset > 100) offset = 100;
      if (offset < -100) offset = -100;
      tocStyle = `will-change: transform; transform: translateY(${offset}px);`;
    }

    function handleScroll() {
      isScrolling = true;
      tocStyle = ''; // let sticky positioning handle vertical movement while scrolling
      if (scrollTimer) clearTimeout(scrollTimer);
      scrollTimer = setTimeout(() => {
        isScrolling = false;
      }, 120);
    }

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimer) clearTimeout(scrollTimer);
    };
  });
</script>

<svelte:head>
  <title>{pageTitle}</title>
  <meta name="description" content={meta.description} />
  <link rel="canonical" href={meta.canonical} />
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,100..700,0,1" />
  {#if schema}
    <script type="application/ld+json">
      {@html JSON.stringify(schema)}
    </script>
  {/if}
</svelte:head>

<div class="hidden lg:block w-full bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
  <div class="container mx-auto px-4 py-3">
    <Breadcrumb items={[{ label: "Home", url: "/" }, { label: "Rental Mobil", url: "/rental-mobil/" }, { label: city.name, url: `/rental-mobil/${city.slug}` }]} />
  </div>
</div>

<div class="container mx-auto px-4 py-8 pb-32">
  <div class="mb-8 hidden lg:block">
    <h1 class="text-4xl font-black mb-3 text-gray-900 dark:text-white">Rental Mobil {city.name}</h1>
  </div>

  <div class="flex flex-col lg:flex-row gap-6">
    <aside class="hidden lg:block lg:w-80 flex-shrink-0">
      <div class="lg:sticky lg:top-24 glass-card p-6 rounded-2xl">
        <FilterSidebar on:change={handleSidebarFilter} />
      </div>
    </aside>
    
    <main class="flex-1">
      <div class="hidden lg:flex justify-end mb-4">
        <SortDropdown bind:value={sortBy} onsort={() => isSortDrawerOpen = false} />
      </div>

      <div class="flex justify-between items-center mb-6 px-1">
        <p class="text-sm text-gray-500 dark:text-gray-400 font-medium">
          Ditemukan <span class="text-blue-600 font-bold">{filteredCars.length}</span> armada terbaik
        </p>
      </div>

      <div class="grid grid-cols-1 gap-4">
        {#each sortCars(filteredCars) as car (car.id)}
          <div class="lg:hidden">
            <CarCard {car} duration={filter.duration} city={city.name} />
          </div>
          <div class="hidden lg:block">
            <CarCardDesktop {car} duration={filter.duration} city={city.name} />
          </div>
        {/each}
      </div>

      {#if filteredCars.length === 0}
        <div class="text-center py-20 bg-gray-50 dark:bg-gray-800/50 rounded-3xl border-2 border-dashed border-gray-200 dark:border-gray-700">
          <span class="material-symbols-rounded text-5xl text-gray-300 mb-4">no_accounts</span>
          <p class="text-gray-500 dark:text-gray-400">Ups! Unit tidak ditemukan dengan filter ini.</p>
        </div>
      {/if}
    </main>
  </div>
  <div class="mt-20 border-t border-gray-100 dark:border-gray-800 pt-12">
    <div class="flex flex-col lg:flex-row items-start gap-12 relative h-full">
      
      <div class="flex-1 min-w-0"> 
        <div class="prose dark:prose-invert max-w-none">
          <div class="max-h-[calc(100vh-200px)] overflow-y-auto custom-scrollbar pr-2">
                <TableOfContents {sections} />
              </div>
          {#if cityContent?.body}
            <div class="city-body-content">{@html cityContent.body}</div>

            <div class="not-prose my-10 p-7 bg-blue-50/40 dark:bg-blue-900/10 rounded-3xl border border-blue-100/50 dark:border-blue-900/30">
              <div class="flex items-center gap-3 mb-3 text-blue-900 dark:text-blue-200">
                <span class="material-symbols-rounded">distance</span>
                <h4 class="font-bold m-0 text-inherit">Cakupan Pengantaran & Penjemputan</h4>
              </div>
              <p class="text-sm text-blue-800/80 dark:text-blue-300/80 leading-relaxed font-medium">
                Kami melayani seluruh wilayah <strong>{city.name}</strong> dan sekitarnya, termasuk: {districtListText}.
              </p>
            </div>
          {/if}

          {#if cityContent.faq?.length}
            <section id="faq" class="mt-16 pb-20">
              <h2 class="text-2xl font-bold mb-8 text-gray-900 dark:text-white">❓ FAQ {city.name}</h2>
              <div class="grid gap-4">
                {#each cityContent.faq as item}
                  <div class="p-6 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl shadow-sm not-prose">
                    <h3 class="font-bold text-lg mb-2 text-blue-600 dark:text-blue-400">{item.question}</h3>
                    <p class="text-gray-600 dark:text-gray-400 leading-relaxed text-sm">{item.answer}</p>
                  </div>
                {/each}
              </div>
            </section>
          {/if}
        </div>
      </div>

    </div> </div>
</div>
