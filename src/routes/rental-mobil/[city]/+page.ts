// +page.ts
import { error } from '@sveltejs/kit';
import { cities } from '$lib/data/cities';
import { districts } from '$lib/data/districts';
import { generateCityMeta } from '$lib/seo/cityMeta';

export async function load({ params }) {
  const city = cities.find((c) => c.slug === params.city);

  if (!city) throw error(404);

  const cityDistricts = districts.filter(
    (d) => d.citySlug === city.slug
  );

  let cityContent = null;

  // ✅ Gunakan $lib alias, bukan path relatif
  try {
    // Cara 1: Dengan try-catch
    const module = await import(`$lib/content/locations/${city.slug}/_city.ts`)
      .catch(() => null);
    
    cityContent = module?.default ?? null;
  } catch {
    // Content opsional, tidak perlu error
  }

  return {
    city,
    cityDistricts,
    cityContent,
    meta: generateCityMeta(city)
  };
}