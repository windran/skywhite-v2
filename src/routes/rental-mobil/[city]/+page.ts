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
  
  // Debug log
  console.log('🔍 Mencari konten untuk:', city.slug);
  
  try {
    // Coba import konten dari folder id
    const module = await import(`$lib/content/id/locations/${city.slug}/_city.ts`);
    cityContent = module?.default ?? null;
    console.log('✅ Konten ditemukan untuk:', city.slug);
  } catch (err) {
    // FIX: kasih tipe unknown, tapi kita handle dengan aman
    const error = err as Error; // Type assertion
    console.log('❌ Error load konten:', error.message);
    
    // Fallback konten sementara
    cityContent = {
      body: `
        <section class="mb-8">
          <h2 class="text-2xl font-bold mb-4">Rental Mobil ${city.name}</h2>
          <p class="mb-3">Selamat datang di SkyWhite Rental Mobil ${city.name}. Kami menyediakan berbagai pilihan mobil untuk kebutuhan bisnis, liburan keluarga, atau acara khusus Anda.</p>
          <p class="mb-3">Saat ini halaman ${city.name} sedang dalam pengembangan. Untuk informasi lebih lanjut tentang rental mobil di ${city.name}, silakan hubungi customer service kami.</p>
          <div class="bg-blue-50 p-4 rounded-lg mt-4">
            <h3 class="font-semibold mb-2">📞 Hubungi Kami</h3>
            <p>WhatsApp: 0812-3456-7890</p>
            <p>Email: cs@skywhite.com</p>
          </div>
        </section>
      `,
      // Fallback FAQ minimal
      faq: [
        {
          question: `Berapa biaya sewa mobil di ${city.name}?`,
          answer: `Mulai dari Rp250.000 untuk mobil ekonomis. Hubungi kami untuk info lengkap.`
        },
        {
          question: `Apakah bisa sewa lepas kunci di ${city.name}?`,
          answer: `Ya, dengan syarat KTP dan SIM asli.`
        }
      ],
      quickTips: [
        "Booking minimal H-1",
        "Siapkan KTP dan SIM",
        "Cek kondisi mobil sebelum berangkat"
      ]
    };
  }

  return {
    city,
    cityDistricts,
    cityContent,
    availableCars,
    meta: generateCityMeta(city)
  };
}