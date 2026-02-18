import { error } from '@sveltejs/kit';
import { cities } from '$lib/data/cities';
import { districts } from '$lib/data/districts';
import { cars } from '$lib/data/cars';
import { generateCityMeta } from '$lib/seo/cityMeta';
import type { Car } from '$lib/types/rental-filters';

export async function load({ params }) {
  const city = cities.find((c) => c.slug === params.city);

  if (!city) throw error(404);

  const cityDistricts = districts.filter(
    (d) => d.citySlug === city.slug
  );

  const availableCars: Car[] = cars.filter(car => 
    car.availableIn.includes(city.slug)
  );

  let cityContent = null;
  try {
    // PATH DIUBAH: tambah /id/
    const module = await import(`$lib/content/id/locations/${city.slug}/_city.ts`);
    cityContent = module?.default ?? null;
  } catch {
    // Fallback kalau file tidak ditemukan
    console.log(`Konten untuk ${city.slug} tidak ditemukan`);
  }

  return {
    city,
    cityDistricts,
    cityContent,
    availableCars,
    meta: generateCityMeta(city)
  };
}