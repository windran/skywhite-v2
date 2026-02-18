/**
 * Generate Table of Contents dari konten HTML
 * Otomatis extract semua heading (h2, h3) dan buat ID
 */

export interface TOCItem {
  id: string;
  title: string;
  level: number; // 2 untuk h2, 3 untuk h3
  children?: TOCItem[];
}

export function generateTOC(html: string): {
  items: TOCItem[];
  html: string; // HTML dengan ID yang sudah ditambahkan
} {
  // Regex untuk mencari heading - PERBAIKAN: lebih akurat
  const headingRegex = /<h([2-3])([^>]*)>(.*?)<\/h\1>/gis;
  const matches = [...html.matchAll(headingRegex)];
  
  const items: TOCItem[] = [];
  let processedHtml = html;
  
  // Process each heading
  matches.forEach((match, index) => {
    const fullTag = match[0];
    const level = parseInt(match[1]);
    const attributes = match[2] || '';
    const titleWithTags = match[3];
    
    // Bersihkan title dari tag HTML di dalamnya
    const title = titleWithTags.replace(/<[^>]*>/g, '').trim();
    
    // Buat ID dari title
    const id = generateId(title, index);
    
    // Cek apakah sudah punya ID
    if (!attributes.includes('id=')) {
      // Tambah ID ke tag heading
      const newTag = `<h${level} id="${id}"${attributes}>${titleWithTags}</h${level}>`;
      processedHtml = processedHtml.replace(fullTag, newTag);
    }
    
    items.push({
      id,
      title,
      level
    });
  });
  
  // Build hierarki (h2 sebagai parent, h3 sebagai child)
  const hierarchicalItems = buildHierarchy(items);
  
  return {
    items: hierarchicalItems,
    html: processedHtml
  };
}

/**
 * Generate ID dari string
 * Contoh: "Harga Sewa Mobil" → "harga-sewa-mobil"
 */
function generateId(title: string, index: number): string {
  return title
    .toLowerCase()
    .replace(/[^\w\s]/g, '') // Hapus karakter spesial
    .replace(/\s+/g, '-') // Ganti spasi dengan -
    .replace(/-+/g, '-') // Ganti multiple - dengan single -
    .replace(/^[0-9-]+/, '') // Hapus angka/dash di awal
    .substring(0, 50) // Maksimal 50 karakter
    + (index > 0 ? `-${index}` : ''); // Tambah index untuk unique
}

/**
 * Build hierarki TOC (h2 → parent, h3 → child)
 */
function buildHierarchy(items: TOCItem[]): TOCItem[] {
  const result: TOCItem[] = [];
  let currentParent: TOCItem | null = null;
  
  items.forEach(item => {
    if (item.level === 2) {
      // h2 → parent baru
      currentParent = { ...item, children: [] };
      result.push(currentParent);
    } else if (item.level === 3 && currentParent) {
      // h3 → child dari parent terakhir
      currentParent.children?.push(item);
    } else if (item.level === 3 && !currentParent) {
      // h3 tanpa parent → tetap jadi item sendiri
      result.push(item);
    }
  });
  
  return result;
}

/**
 * Debug function untuk melihat hasil generate
 */
export function debugTOC(html: string) {
  const headingRegex = /<h([2-3])([^>]*)>(.*?)<\/h\1>/gis;
  const matches = [...html.matchAll(headingRegex)];
  
  console.log('=== DEBUG TOC ===');
  console.log('Total headings:', matches.length);
  
  matches.forEach((match, i) => {
    console.log(`\nHeading ${i + 1}:`);
    console.log('  Level:', match[1]);
    console.log('  Attrs:', match[2] || '(none)');
    console.log('  Title:', match[3].replace(/<[^>]*>/g, '').trim());
  });
}