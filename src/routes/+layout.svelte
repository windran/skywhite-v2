<script lang="ts">
  import '../app.css';
  import Navbar from '$lib/components/Navbar.svelte';
  
  let { children } = $props();
</script>

<!-- PAKAI KOMPONEN NAVBAR, BUKAN MANUAL -->
<Navbar />

<main class="main-content">
  {@render children()}
</main>


<!-- Footer -->
<footer class="footer w-full bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-12 py-8">
  <div class="container mx-auto px-4 text-center text-gray-600 dark:text-gray-400">
    <p>© 2024 SkyWhite Rental Mobil. All rights reserved.</p>
  </div>
</footer>