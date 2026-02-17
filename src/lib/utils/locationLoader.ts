export async function loadDistrictContent(city: string, district: string) {
  try {
    const module = await import(
      `$lib/content/locations/${city}/${district}.ts`
    );

    return module[Object.keys(module)[0]];
  } catch (err) {
    return null;
  }
}

export async function loadCityContent(city: string) {
  try {
    const module = await import(
      `$lib/content/locations/${city}/_city.ts`
    );

    return module[Object.keys(module)[0]];
  } catch (err) {
    return null;
  }
}
