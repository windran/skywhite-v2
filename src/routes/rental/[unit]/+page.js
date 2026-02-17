import { error } from '@sveltejs/kit';
import { units } from '$lib/data/units';

export function entries() {
  return units.map((unit) => ({
    unit: unit.slug
  }));
}

export function load({ params }) {
  const unit = units.find((u) => u.slug === params.unit);

  if (!unit) {
    throw error(404, 'Unit not found');
  }

  return {
    unit
  };
}
