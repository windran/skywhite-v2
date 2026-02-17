import { districts } from '$lib/data/districts';

export function getRelatedDistricts(citySlug: string, currentSlug: string) {
  return districts.filter(
    (d) =>
      d.citySlug === citySlug &&
      d.slug !== currentSlug
  );
}
