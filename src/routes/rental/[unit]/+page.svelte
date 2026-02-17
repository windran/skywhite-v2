<script lang="ts">
  import type { PageData } from './$types';
  import Breadcrumb from '$lib/components/Breadcrumb.svelte';
  import { cities } from '$lib/data/cities';
  import { districts } from '$lib/data/districts';
  import { units } from '$lib/data/units';

  export let data: PageData;
  const { unit } = data;

  // semua kota aktif
  const availableCities = cities;

  // semua district (flat)
  const allDistricts = districts;

  const schema = {
    "@context": "https://schema.org",
    "@type": "Car",
    name: unit.name,
    description: unit.description,
    image: unit.image || "https://skywhiterentcar.com/default-car.jpg",
    brand: {
      "@type": "Brand",
      name: unit.brand || unit.name.split(" ")[0]
    },
    vehicleTransmission: unit.transmission,
    fuelType: unit.fuel,
    seatingCapacity: unit.seats,
    provider: {
      "@type": "AutoRental",
      name: "Sky White Rent Car",
      url: "https://skywhiterentcar.com",
      telephone: "081220003546"
    },
    areaServed: availableCities.map((city) => ({
      "@type": "City",
      name: city.name
    })),
    offers: {
      "@type": "Offer",
      priceCurrency: "IDR",
      availability: "https://schema.org/InStock",
      url: `https://skywhiterentcar.com/rental/${unit.slug}/`
    }
  };
</script>


<svelte:head>
  <title>{unit.name} | Sky White Rent Car</title>
  <meta name="description" content={unit.description} />
  <script type="application/ld+json">
    {JSON.stringify(schema)}
  </script>
</svelte:head>

<Breadcrumb
  items={[
    { label: "Home", url: "/" },
    { label: "Rental Unit", url: "/rental/" },
    { label: unit.name }
  ]}
/>

<h1>Sewa {unit.name}</h1>

<p>{unit.description}</p>

<ul>
  <li>Transmisi: {unit.transmission}</li>
  <li>Bahan Bakar: {unit.fuel}</li>
  <li>Kapasitas: {unit.seats} Kursi</li>
</ul>

<!-- ========================= -->
<!-- City Reinforcement -->
<!-- ========================= -->

<h2>Tersedia di Kota Berikut</h2>

<ul>
  {#each availableCities as city}
  <h3>Sewa {unit.name} di Area {city.name}</h3>
  <ul>
    {#each allDistricts.filter(d => d.citySlug === city.slug) as district}
      <li>
        <a href={`/rental-mobil/${city.slug}/${district.slug}/`}>
          Sewa {unit.name} di {district.name}
        </a>
      </li>
    {/each}
  </ul>
{/each}
</ul>

<!-- ========================= -->
<!-- District Reinforcement -->
<!-- ========================= -->

{#each availableCities as city}
  <h3>Sewa {unit.name} di Area {city.name}</h3>
  <ul>
    {#each city.districts as district}
      <li>
        <a href={`/rental-mobil/${city.slug}/${district.slug}/`}>
          Sewa {unit.name} di {district.name}
        </a>
      </li>
    {/each}
  </ul>
{/each}
