<script lang="ts">
  import type { Car, RentalDuration } from '$lib/types/rental-filters';
  
  export let car: Car;
  export let duration: RentalDuration;
  export let city: string;
  
  const durationLabels = {
    harian: 'per hari',
    mingguan: 'per minggu',
    bulanan: 'per bulan',
    tahunan: 'per tahun'
  };
  
  function formatPrice(price: number): string {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(price);
  }

  // Ambil harga, kasih default 0 kalau undefined
  $: currentPrice = car.price?.[duration] || 0;
</script>

<a 
  href={`/rental-mobil/${city}/${car.id}`}
  class="block bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden"
>
  <div class="aspect-w-16 aspect-h-9 bg-gray-200">
    <img 
      src={car.image} 
      alt={car.name}
      class="w-full h-48 object-cover"
      loading="lazy"
    />
  </div>
  
  <div class="p-4">
    <div class="flex justify-between items-start mb-2">
      <h3 class="font-semibold text-lg">{car.name}</h3>
      <span class="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
        {car.type.toUpperCase()}
      </span>
    </div>
    
    <div class="flex items-center text-sm text-gray-600 mb-2">
      <span class="mr-3">👥 {car.capacity} org</span>
      <span>🧳 {car.baggage} bagasi</span>
    </div>
    
    <div class="flex items-center justify-between">
      <div>
        {#if currentPrice > 0}
          <span class="text-xl font-bold text-blue-600">
            {formatPrice(currentPrice)}
          </span>
          <span class="text-sm text-gray-500">
            /{durationLabels[duration]}
          </span>
        {:else}
          <span class="text-sm text-gray-500">
            Hubungi untuk harga
          </span>
        {/if}
      </div>
      <span class="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
        {car.transmission === 'matik' ? '⚡ Matic' : '⚙️ Manual'}
      </span>
    </div>
    
    {#if car.features?.length > 0}
      <div class="mt-3 flex flex-wrap gap-1">
        {#each car.features.slice(0, 3) as feature}
          <span class="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
            {feature}
          </span>
        {/each}
        {#if car.features.length > 3}
          <span class="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
            +{car.features.length - 3}
          </span>
        {/if}
      </div>
    {/if}
  </div>
</a>