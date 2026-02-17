export function generateCityService(city: any) {
  const baseUrl = "https://skywhiterentcar.com";

  return {
    "@context": "https://schema.org",
    "@type": "AutoRental",
    "@id": `${baseUrl}/rental-mobil/${city.slug}/#autorental`,
    "name": `Sky White Rent Car ${city.name}`,
    "url": `${baseUrl}/rental-mobil/${city.slug}/`,
    "description": city.description,
    "priceRange": "$$",
    "areaServed": {
      "@type": "City",
      "name": city.name
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": `Daftar Unit Rental Mobil ${city.name}`,
      "itemListElement": (city.units || []).map((unit: any) => ({
        "@type": "Offer",
        "itemOffered": {
          "@type": "Car",
          "name": unit.name
        }
      }))
    },
    "provider": {
      "@type": "LocalBusiness",
      "name": "Sky White Rent Car",
      "url": baseUrl
    }
  };
}
