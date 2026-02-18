<script lang="ts">
  interface Props {
    sections: { id: string; title: string; }[];
  }

  let { sections = [] }: Props = $props();
  
  let activeId = $state('');
  
  function scrollToSection(id: string) {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      history.pushState(null, '', `#${id}`);
    }
  }
  
  $effect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            activeId = entry.target.id;
          }
        });
      },
      { rootMargin: '-80px 0px -70% 0px' }
    );
    
    sections.forEach((section) => {
      const el = document.getElementById(section.id);
      if (el) observer.observe(el);
    });
    
    return () => observer.disconnect();
  });
</script>

{#if sections.length > 0}
  <div class="toc-card">
    <div class="toc-header">
      <span class="toc-icon">📋</span>
      <h3 class="toc-title">Daftar Isi</h3>
      <span class="toc-count">{sections.length} bagian</span>
    </div>
    
    <nav class="toc-nav">
      <ul class="toc-list">
        {#each sections as section}
          <li>
            <button
              onclick={() => scrollToSection(section.id)}
              class="toc-item {activeId === section.id ? 'active' : ''}"
            >
              <span class="toc-dot"></span>
              <span class="toc-text">{section.title}</span>
            </button>
          </li>
        {/each}
      </ul>
    </nav>
  </div>
{/if}
