import { browser } from '$app/environment';
import { writable } from 'svelte/store';

// Simple store untuk komponen yang perlu tahu theme
export const theme = writable<'light' | 'dark'>(
  browser && localStorage.getItem('darkmode') === 'active' ? 'dark' : 'light'
);

// Update store saat theme berubah
if (browser) {
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.attributeName === 'class') {
        const isDark = document.documentElement.classList.contains('dark');
        theme.set(isDark ? 'dark' : 'light');
      }
    });
  });
  
  observer.observe(document.documentElement, { attributes: true });
}