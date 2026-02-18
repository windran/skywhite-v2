<script lang="ts">
  import { onMount } from 'svelte';

  let isDark = $state(false);

  onMount(() => {
    const stored = localStorage.getItem('darkmode');
    // Cek preferensi sistem jika tidak ada di localStorage
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    isDark = stored === 'active' || (stored === null && prefersDark);
  });

  // Efek reaktif: Otomatis jalan setiap isDark berubah
  $effect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('darkmode', 'active');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('darkmode', 'inactive');
    }
  });

  function toggleTheme() {
    isDark = !isDark;
  }
</script>

<!-- Animated toggle: a pill with rotating sun/moon and subtle background morph -->
<button
  class="cool-toggle"
  aria-pressed={isDark}
  onclick={toggleTheme}
>
  <span class="track">
    <span class="indicator left">🌞</span>
    <span class="indicator right">🌙</span>
    
    <span 
      class="knob" 
      style:transform="translateY(-50%) translateX({isDark ? '20px' : '0px'}) rotate({isDark ? '360deg' : '0deg'})"
    >
      {#if !isDark}
        <svg class="icon sun" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <circle cx="12" cy="12" r="4" fill="currentColor" />
          <g stroke-width="2" stroke-linecap="round">
            <path d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32l1.41 1.41M2 12h2m16 0h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
          </g>
        </svg>
      {:else}
        <svg class="icon moon" viewBox="0 0 24 24" fill="currentColor">
          <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
        </svg>
      {/if}
    </span>
  </span>
</button>
