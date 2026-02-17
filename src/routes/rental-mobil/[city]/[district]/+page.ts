import { error } from '@sveltejs/kit';
import { cities } from '$lib/data/cities';
import { districts } from '$lib/data/districts';
import { generateDistrictMeta } from '$lib/seo/districtMeta';

export async function load({ params }) {
  const city = cities.find((c) => c.slug === params.city);
  if (!city) throw error(404);

  const district = districts.find(
    (d) =>
      d.slug === params.district &&
      d.citySlug === city.slug
  );

  if (!district) throw error(404);

  let districtContent = null;

  try {
    const module = await import(
      `$lib/content/locations/${city.slug}/${district.slug}.ts`
    );
    districtContent = module.default;
  } catch {}

  return {
    city,
    district,
    districtContent,
    meta: generateDistrictMeta({ city, district })
  };
}
