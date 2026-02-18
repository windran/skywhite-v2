<script lang="ts">
  import { fade, fly } from 'svelte/transition';
  
  let { isOpen, title, onclose, children } = $props();

  // Fungsi untuk menangani tombol Escape
  function handleKeydown(event: KeyboardEvent) {
    if (event.key === 'Escape') onclose();
  }
</script>

{#if isOpen}
  <div 
    class="fixed inset-0 bg-black/50 z-[100] backdrop-blur-sm" 
    onclick={onclose}
    onkeydown={handleKeydown}
    role="button"
    tabindex="0"
    aria-label="Close bottom sheet"
    transition:fade={{ duration: 200 }}
  ></div>
  
  <div 
    class="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 z-[101] rounded-t-[2rem] p-6 pb-10 shadow-2xl"
    transition:fly={{ y: 400, duration: 300 }}
  >
    <div class="w-12 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full mx-auto mb-6"></div>
    </div>
{/if}