export function generateDistrictMeta({
  city,
  district
}: {
  city: { name: string; slug: string };
  district: { name: string; slug: string; description?: string };
}) {
  const baseUrl = "https://skywhiterentcar.com";

  const title = `Rental Mobil ${district.name}, ${city.name} | Sky White Rent Car`;

  const description =
    district.description ||
    `Sewa mobil di ${district.name}, ${city.name} dengan unit lengkap, harga terjangkau, dan layanan profesional. Tersedia berbagai tipe mobil untuk kebutuhan harian maupun bulanan.`;

  const canonical = `${baseUrl}/rental-mobil/${city.slug}/${district.slug}/`;

  return {
    title,
    description,
    canonical
  };
}
