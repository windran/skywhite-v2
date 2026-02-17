<script lang="ts">
  import { units } from '$lib/data/units';
  import Breadcrumb from '$lib/components/Breadcrumb.svelte';
  import { generateCityService } from '$lib/seo/cityService';

  const { data } = $props();

  const city = $derived(data.city);
  const meta = $derived(data.meta);
  const cityContent = $derived(data.cityContent);
  const cityDistricts = $derived(data.cityDistricts);

  const availableUnits = units;
  const featuredUnits = availableUnits.slice(0, 8);

  const schema = $derived(
    generateCityService({
      ...city,
      units: availableUnits
    })
  );
</script>

<svelte:head>
  <title>{meta.title}</title>
  <meta name="description" content={meta.description} />
  <link rel="canonical" href={meta.canonical} />

  {#if schema}
    <script type="application/ld+json">
      {@html JSON.stringify(schema)}
    </script>
  {/if}
</svelte:head>

<Breadcrumb
  items={[
    { label: "Home", url: "/" },
    { label: "Rental Mobil", url: "/rental-mobil/" },
    { label: city.name }
  ]}
/>

<h1>Rental Mobil {city.name}</h1>

{#if cityContent?.body}
  <div>{@html cityContent.body}</div>
{:else}
  <p>{city.description}</p>
{/if}

<h2>Area Layanan di {city.name}</h2>
<ul>
  {#each cityDistricts as district}
    <li>
      <a href={`/rental-mobil/${city.slug}/${district.slug}/`}>
        Rental Mobil {district.name}
      </a>
    </li>
  {/each}
</ul>

<h2>Unit Rental di {city.name}</h2>
<ul>
  {#each featuredUnits as unit}
    <li>
      <a href={`/rental/${unit.slug}/`}>
        {unit.name}
      </a>
    </li>
  {/each}
</ul>
