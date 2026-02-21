<script lang="ts">
  import { fade, fly } from 'svelte/transition';
  import type { Car, RentalDuration } from '$lib/types/car';
  import { onMount } from 'svelte';

  interface Props {
    isOpen: boolean;
    car: Car | null;
    duration: RentalDuration;
    city: string;
    onClose: () => void;
  }

  let { isOpen, car, duration, city, onClose }: Props = $props();
  
  // Gunakan $state untuk reactive variables
  let backdropRef: HTMLButtonElement | undefined = $state();
  let dialogRef: HTMLDivElement | undefined = $state();

  const formatPrice = (price: number) => 
    new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(price);

  const handleBackdropKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClose();
    }
  };

  const handleDialogKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      e.preventDefault();
      onClose();
    }
  };

  const handleWhatsAppClick = () => {
    if (!car) return;
    const message = encodeURIComponent(
      `Halo, saya ingin booking ${car.name} (${duration}) di ${city}`
    );
    window.open(`https://wa.me/628123456789?text=${message}`, '_blank');
  };

  // Focus management dan body scroll
  $effect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      // Small delay to ensure dialog is rendered
      setTimeout(() => {
        dialogRef?.focus();
      }, 50);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  });

  // Cleanup on unmount
  onMount(() => {
    return () => {
      document.body.style.overflow = '';
    };
  });
</script>

{#if isOpen && car}
  <!-- Backdrop dengan proper keyboard handling -->
  <button
    bind:this={backdropRef}
    class="fixed inset-0 z-[999] backdrop-blur-md bg-black/40 w-full h-full cursor-default transition-all"
    transition:fade={{ duration: 300 }}
    onclick={onClose}
    onkeydown={handleBackdropKeyDown}
    aria-label="Tutup modal"
    tabindex="-1"
    type="button"
  ></button>

  <!-- Modal container -->
  <div 
    class="fixed inset-0 z-[1000] flex items-end lg:items-center justify-center p-0 lg:p-4"
    role="presentation"
    aria-hidden="false"
  >
    <!-- Modal dialog -->
    <div
      bind:this={dialogRef}
      class="modal-card bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl w-full lg:max-w-3xl rounded-t-[3rem] lg:rounded-[3rem] overflow-hidden shadow-[0_32px_64px_-15px_rgba(0,0,0,0.3)] relative border border-white/20"
      transition:fly={{ y: 100, duration: 500, opacity: 0 }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
      tabindex="-1"
      onkeydown={handleDialogKeyDown}
    >
      <!-- Decorative top bar -->
      <div 
        class="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-600"
        aria-hidden="true"
      ></div>

      <div class="p-8 lg:p-14">
        <div class="flex flex-col lg:flex-row gap-12">
          
          <!-- Left column - Car details -->
          <div class="flex-1">
            <div class="flex items-center gap-3 mb-6">
              <span class="px-4 py-1.5 bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-full text-xs font-black uppercase tracking-[0.2em]">
                Confirm Booking
              </span>
            </div>
            
            <h2 id="modal-title" class="text-4xl lg:text-5xl font-black text-gray-900 dark:text-white mb-2 tracking-tighter leading-[0.9]">
              {car.name}
            </h2>
            <p id="modal-description" class="text-xl text-gray-400 font-medium mb-8 uppercase tracking-widest">
              {car.transmission} Transmission
            </p>
            
            <div class="grid grid-cols-2 gap-4">
              <!-- Location card -->
              <div class="group p-5 bg-gray-50/50 dark:bg-white/5 rounded-[2rem] border border-gray-100 dark:border-white/10 hover:border-blue-500/50 transition-all">
                <span class="material-symbols-rounded text-blue-500 mb-2 block" aria-hidden="true">location_on</span>
                <p class="text-[10px] text-gray-400 uppercase font-black">City</p>
                <p class="text-lg font-bold dark:text-gray-100 leading-tight">{city}</p>
              </div>
              
              <!-- Duration card -->
              <div class="group p-5 bg-gray-50/50 dark:bg-white/5 rounded-[2rem] border border-gray-100 dark:border-white/10 hover:border-blue-500/50 transition-all">
                <span class="material-symbols-rounded text-blue-500 mb-2 block" aria-hidden="true">schedule</span>
                <p class="text-[10px] text-gray-400 uppercase font-black">Duration</p>
                <p class="text-lg font-bold dark:text-gray-100 leading-tight">{duration.toUpperCase()}</p>
              </div>
            </div>

            <!-- Price section -->
            <div class="mt-8 relative group">
              <div class="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-[2.5rem] blur opacity-20 group-hover:opacity-40 transition duration-1000" aria-hidden="true"></div>
              <div class="relative p-7 bg-white dark:bg-gray-800 rounded-[2.5rem] border border-blue-100 dark:border-blue-900 flex justify-between items-center">
                <div>
                  <p class="text-xs font-bold text-blue-600/60 uppercase tracking-widest mb-1">Total Payment</p>
                  <p class="text-4xl font-black text-gray-900 dark:text-white tracking-tighter">
                    {formatPrice(car.price?.[duration] || 0)}
                  </p>
                </div>
                <div class="p-4 bg-blue-50 dark:bg-blue-900/50 rounded-2xl" aria-hidden="true">
                  <span class="material-symbols-rounded text-blue-600 dark:text-blue-300 text-3xl">payments</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Right column - Actions -->
          <div class="flex flex-col gap-4 w-full lg:w-72 justify-center pt-4 lg:pt-0">
            <button 
              class="group relative w-full py-6 bg-green-600 hover:bg-green-500 text-white rounded-[2rem] font-black text-xl flex items-center justify-center gap-3 transition-all active:scale-95 shadow-2xl shadow-green-500/30 overflow-hidden"
              onclick={handleWhatsAppClick}
              aria-label={`Booking ${car.name} via WhatsApp`}
              type="button"
            >
              <div class="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden="true"></div>
              <span class="material-symbols-rounded text-2xl group-hover:rotate-12 transition-transform" aria-hidden="true">chat</span>
              <span>Booking via WA</span>
            </button>
            
            <button 
              class="w-full py-5 bg-transparent text-gray-400 hover:text-gray-900 dark:hover:text-white rounded-[2rem] font-bold transition-all text-sm uppercase tracking-[0.3em]"
              onclick={onClose}
              aria-label="Cancel and close modal"
              type="button"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
{/if}

<style>
  /* Focus styles untuk aksesibilitas */
  div[role="dialog"]:focus-visible {
    outline: 2px solid #3b82f6;
    outline-offset: 2px;
  }

  button:focus-visible {
    outline: 2px solid #3b82f6;
    outline-offset: 2px;
  }

  /* Prevent body scroll when modal is open */
  body:has(.modal-card) {
    overflow: hidden;
  }

  /* Smooth animations */
  .modal-card {
    will-change: transform, opacity;
  }
</style>