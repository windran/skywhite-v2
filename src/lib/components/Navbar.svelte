<script lang="ts">
  import { page } from '$app/state';
  import ThemeToggle from './ThemeToggle.svelte';
  import { fade } from 'svelte/transition';
  
  let isMenuOpen = $state(false);
  let isScrolled = $state(false);
  let navbarEl: HTMLElement;

  
  const navLinks = [
    { href: '/', label: 'Beranda' },
    { href: '/rental-mobil', label: 'Rental Mobil' },
    { href: '/tentang-kami', label: 'Tentang Kami' },
    { href: '/kontak', label: 'Kontak' }
  ];
  
  function isActive(href: string): boolean {
    const current = page.url.pathname;
    return href === '/'
      ? current === '/'
      : current.startsWith(href);
  }

  
  $effect(() => {
    const handleScroll = () => {
      isScrolled = window.scrollY > 50;
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  });
  
  $effect(() => {
    const handleClickOutside = (e: Event) => {
      if (!navbarEl) return;

      // Use composedPath for robust detection on mobile / shadow DOM
      const path = (e as any).composedPath ? (e as any).composedPath() : ([] as EventTarget[]);
      const clickedInside = path.includes(navbarEl) || navbarEl.contains(e.target as Node);

      if (!clickedInside) {
        isMenuOpen = false;
      }
    };

    // Listen to pointerdown so taps on mobile are detected before click
    document.addEventListener('pointerdown', handleClickOutside);

    return () => document.removeEventListener('pointerdown', handleClickOutside);
  });

</script>

<nav bind:this={navbarEl} class="navbar" class:scrolled={isScrolled}>
  <div class="navbar-container">
    <!-- Logo -->
    <a href="/" class="navbar-logo">
      <span class="logo-text">Sky White</span>
      <span class="logo-badge">Rent Car</span>
    </a>

    <!-- Desktop Navigation -->
    <div class="navbar-links">
      {#each navLinks as link}
        <a 
          href={link.href}
          class="nav-link {isActive(link.href) ? 'active' : ''}"
        >
          {link.label}
        </a>
      {/each}
    </div>

    <!-- Right Section -->
    <div class="navbar-right">
      <ThemeToggle />
      
      <!-- Mobile Menu Button -->
      <button 
          class="menu-button"
          onclick={(e) => {
            e.stopPropagation();
            isMenuOpen = !isMenuOpen;
          }}
          >
        <span class="menu-icon">{isMenuOpen ? '✕' : '☰'}</span>
      </button>
    </div>
  </div>

  <!-- Mobile Navigation -->
  {#if isMenuOpen}
    <div class="mobile-menu" transition:fade={{ duration: 200 }}>
      {#each navLinks as link}
        <a 
          href={link.href}
          class="mobile-link {isActive(link.href) ? 'active' : ''}"
          onclick={() => isMenuOpen = false}
        >
          {link.label}
        </a>
      {/each}
    </div>
  {/if}
</nav>
