<script lang="ts">
  import { units } from '$lib/data/units';
  import Breadcrumb from '$lib/components/Breadcrumb.svelte';
  import { generateDistrictSchema } from '$lib/seo/districtSchema';
  import { generateBreadcrumbSchema } from '$lib/seo/breadcrumbSchema';
  import { generateFaqSchema } from '$lib/seo/faqSchema';
  import { getRelatedDistricts } from '$lib/utils/internalLinks';

  const { data } = $props();

  const city = $derived(data.city);
  const district = $derived(data.district);
  const districtContent = $derived(data.districtContent);
  const meta = $derived(data.meta);

  const availableUnits = units;

  const relatedDistricts = $derived(
    getRelatedDistricts(city.slug, district.slug)
  );

  const serviceSchema = $derived(
    generateDistrictSchema({
      city,
      district,
      units: availableUnits
    })
  );

  const breadcrumbSchema = $derived(
    generateBreadcrumbSchema([
      { name: "Home", url: "https://skywhiterentcar.com/" },
      { name: "Rental Mobil", url: "https://skywhiterentcar.com/rental-mobil/" },
      { name: city.name, url: `https://skywhiterentcar.com/rental-mobil/${city.slug}/` },
      { name: district.name, url: `https://skywhiterentcar.com/rental-mobil/${city.slug}/${district.slug}/` }
    ])
  );

  const faqSchema = $derived(
    districtContent?.faq
      ? generateFaqSchema(districtContent.faq)
      : null
  );

  const structuredData = $derived({
    "@context": "https://schema.org",
    "@graph": [
      ...(serviceSchema?.["@graph"] || []),
      breadcrumbSchema,
      ...(faqSchema ? [faqSchema] : [])
    ]
  });
</script>

<svelte:head>
  <title>{meta.title}</title>
  <meta name="description" content={meta.description} />
  <link rel="canonical" href={meta.canonical} />

  <script type="application/ld+json">
    {@html JSON.stringify(structuredData)}
  </script>
</svelte:head>

<Breadcrumb
  items={[
    { label: "Home", url: "/" },
    { label: "Rental Mobil", url: "/rental-mobil/" },
    { label: city.name, url: `/rental-mobil/${city.slug}/` },
    { label: district.name }
  ]}
/>

<h1>Rental Mobil {district.name}, {city.name}</h1>

<p>{district.description}</p>

<h2>Unit Rental di {district.name}</h2>
<ul>
  {#each availableUnits as unit}
    <li>
      <a href={`/rental/${unit.slug}/`}>
        Sewa {unit.name} di {district.name}
      </a>
    </li>
  {/each}
</ul>

{#if districtContent?.body}
  <div class="district-content">
    {@html districtContent.body}
  </div>
{/if}

{#if districtContent?.faq}
  <h2>Pertanyaan Seputar Rental Mobil {district.name}</h2>

  {#each districtContent.faq as item}
    <h3>{item.question}</h3>
    <p>{item.answer}</p>
  {/each}
{/if}

<h2>Area Lain di {city.name}</h2>
<ul>
  {#each relatedDistricts as d}
    <li>
      <a href={`/rental-mobil/${city.slug}/${d.slug}/`}>
        Rental Mobil {d.name}, {city.name}
      </a>
    </li>
  {/each}
</ul>
