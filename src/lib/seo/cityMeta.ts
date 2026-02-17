// src/lib/seo/cityMeta.ts

// Definisikan tipe City sederhana (sesuaikan dengan struktur data cities.ts Anda)
interface City {
  slug: string;
  name: string;
  description?: string;
  [key: string]: any; // untuk properti tambahan
}

/**
 * Generate meta tags untuk halaman city
 */
export function generateCityMeta(city: City) {
  // Meta dasar
  const title = `Rental Mobil di ${city.name} | SkyWhite`;
  const description = city.description || 
    `Sewa mobil di ${city.name} dengan harga terbaik. Pilihan mobil lengkap untuk perjalanan Anda.`;
  const canonical = `https://skywhite.com/rental-mobil/${city.slug}`;
  
  return {
    // Basic meta
    title,
    description,
    
    // Open Graph (untuk Facebook, LinkedIn, dll)
    og: {
      title,
      description,
      type: 'website',
      url: canonical,
      image: city.ogImage || '/images/og-default.jpg',
      siteName: 'SkyWhite Rental Mobil'
    },
    
    // Twitter Card
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      image: city.ogImage || '/images/og-default.jpg'
    },
    
    // Canonical URL
    canonical,
    
    // Keywords (opsional)
    keywords: `rental mobil ${city.name}, sewa mobil ${city.name}, ${city.name} car rental, skywhite ${city.name}`
  };
}