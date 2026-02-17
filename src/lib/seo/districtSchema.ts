export function generateDistrictSchema({
  city,
  district,
  units
}: {
  city: { name: string; slug: string };
  district: { name: string; slug: string };
  units: { name: string; slug: string }[];
}) {
  const baseUrl = "https://skywhiterentcar.com";
  const pageUrl = `${baseUrl}/rental-mobil/${city.slug}/${district.slug}/`;

  const organization = {
    "@type": "Organization",
    "@id": `${baseUrl}/#organization`,
    name: "Sky White Rent Car",
    url: baseUrl,
    telephone: "081220003546"
  };

  const autoRental = {
    "@type": "AutoRental",
    "@id": `${pageUrl}#autorental`,
    name: `Rental Mobil ${district.name}, ${city.name}`,
    url: pageUrl,
    areaServed: {
      "@type": "AdministrativeArea",
      name: `${district.name}, ${city.name}`
    },
    provider: {
      "@id": `${baseUrl}/#organization`
    }
  };

  const offerCatalog = {
    "@type": "OfferCatalog",
    "@id": `${pageUrl}#catalog`,
    name: `Unit Rental di ${district.name}`,
    itemListElement: units.map((unit, index) => ({
      "@type": "Offer",
      position: index + 1,
      itemOffered: {
        "@type": "Car",
        name: unit.name,
        url: `${baseUrl}/rental/${unit.slug}/`
      }
    }))
  };

  return {
    "@context": "https://schema.org",
    "@graph": [
      organization,
      autoRental,
      offerCatalog
    ]
  };
}
