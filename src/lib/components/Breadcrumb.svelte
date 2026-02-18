<script lang="ts">
  // Definisikan tipe untuk item breadcrumb
  interface BreadcrumbItem {
    label: string;
    url: string;
  }

  // Gunakan $props() dengan tipe yang jelas
  let { items = [] }: { items: BreadcrumbItem[] } = $props();
</script>

<nav aria-label="Breadcrumb" class="breadcrumb">
  <ol class="breadcrumb-list">
    {#each items as item, index (index)}
      <li class="breadcrumb-item">
        {#if index === items.length - 1}
          <span class="breadcrumb-current">{item.label}</span>
        {:else}
          <a href={item.url} class="breadcrumb-link">{item.label}</a>
          <span class="breadcrumb-separator">/</span>
        {/if}
      </li>
    {/each}
  </ol>
</nav>
