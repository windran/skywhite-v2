<script>
  export let items = [];

  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      item: item.url
        ? `https://skywhiterentcar.com${item.url}`
        : undefined
    }))
  };
</script>

<nav aria-label="Breadcrumb">
  <ul style="display:flex; gap:8px; list-style:none; padding:0;">
    {#each items as item, index}
      <li>
        {#if item.url}
          <a href={item.url}>{item.label}</a>
        {:else}
          <span>{item.label}</span>
        {/if}

        {#if index < items.length - 1}
          <span> / </span>
        {/if}
      </li>
    {/each}
  </ul>
</nav>

<svelte:head>
  <script type="application/ld+json">
    {JSON.stringify(schema)}
  </script>
</svelte:head>
