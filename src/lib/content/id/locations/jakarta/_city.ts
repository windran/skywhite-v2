import { generateTOC } from '$lib/utils/toc-generator';

// ========== KONTEN NARASI SEO (DATA STATIS DIHAPUS) ==========
const rawContent = `
  <section class="mb-8">
    <h2>Rental Mobil Jakarta: Solusi Transportasi di Ibukota</h2>
    <p>Jakarta, sebagai pusat bisnis, pemerintahan, dan hiburan Indonesia, menuntut mobilitas yang tinggi. Menghadapi kemacetan dan sistem transportasi publik yang dinamis, <strong>SkyWhite</strong> hadir memberikan solusi rental mobil yang fleksibel, nyaman, dan terjangkau bagi warga lokal maupun pendatang.</p>
  </section>

  <section class="mb-8">
    <h2>Mengapa Memilih SkyWhite di Jakarta?</h2>
    <p class="mb-4">Kami memahami bahwa setiap perjalanan di Jakarta memiliki tantangan tersendiri, mulai dari aturan lalu lintas hingga titik kemacetan yang tak terduga. Berikut adalah keunggulan layanan kami:</p>
    <ul class="list-disc pl-5 mb-3 space-y-2">
      <li><strong>Armada Terbaru & Terawat</strong> - Unit kami rata-rata berusia di bawah 3 tahun untuk memastikan performa mesin yang optimal dan AC yang dingin.</li>
      <li><strong>Driver Profesional</strong> - Sopir kami dibekali pelatihan etika pelayanan dan sangat menguasai rute alternatif di seluruh penjuru Jakarta.</li>
      <li><strong>Layanan Darurat 24 Jam</strong> - Tidak perlu khawatir jika terjadi kendala teknis, tim lapangan kami siap meluncur ke lokasi Anda kapan saja.</li>
      <li><strong>Fleksibilitas Sewa</strong> - Tersedia paket mulai dari harian untuk wisata, hingga bulanan untuk kebutuhan korporasi dengan harga kompetitif.</li>
    </ul>
  </section>

  <section id="harga-sewa" class="mb-8">
    <h2>Harga Sewa Mobil di Jakarta Terbaru</h2>
    <p>Berikut adalah estimasi biaya sewa mobil berdasarkan unit yang tersedia saat ini. Harga bersifat transparan dan diperbarui secara real-time mengikuti ketersediaan armada kami.</p>
    <div id="dynamic-price-table"></div>
  </section>

  <section class="mb-8">
    <h2>Tips Berkendara dan Menghindari Macet di Jakarta</h2>
    
    <h3>🚦 Pahami Aturan Ganjil-Genap</h3>
    <p>Jakarta menerapkan aturan ganjil-genap di ruas jalan protokol pada jam-jam sibuk pagi dan sore hari. Saat melakukan pemesanan di SkyWhite, Anda bisa berkonsultasi dengan admin kami untuk mendapatkan unit dengan plat nomor yang sesuai dengan jadwal perjalanan Anda.</p>
    
    <h3>⏰ Waktu Terbaik untuk Melintas</h3>
    <p>Hindari jam berangkat kantor (07.00 - 09.00) dan jam pulang kantor (17.00 - 19.00) jika Anda ingin perjalanan yang lebih santai. Gunakan aplikasi navigasi seperti Waze atau Google Maps yang terhubung dengan head unit di armada kami.</p>
  </section>

  <section id="area-layanan" class="mb-8">
    <h2>Cakupan Area Layanan di Seluruh Wilayah Jakarta</h2>
    <p>SkyWhite melayani penjemputan dan pengantaran armada di berbagai titik strategis Jakarta. Mulai dari perkantoran Sudirman-Thamrin, kawasan hunian di Jakarta Selatan, hingga area industri dan pelabuhan.</p>
    <div id="dynamic-district-area"></div>
  </section>

  <section class="mb-8">
    <h2>Rute Populer dari Jakarta untuk Wisata dan Bisnis</h2>
    <p>Selain penggunaan di dalam kota, armada kami sering digunakan untuk perjalanan luar kota (long trip) dengan rute favorit seperti:</p>
    <ul class="list-none space-y-3">
      <li class="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border-l-4 border-blue-500">
        <strong>Jakarta - Bandara Soekarno Hatta:</strong> Layanan drop-off tepat waktu untuk mengejar jadwal penerbangan Anda.
      </li>
      <li class="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border-l-4 border-blue-500">
        <strong>Jakarta - Bandung/Puncak:</strong> Pilihan utama untuk liburan keluarga di akhir pekan dengan driver yang hafal rute pegunungan.
      </li>
    </ul>
  </section>
`;

// ========== GENERATE TOC OTOMATIS ==========
const { items: tocItems, html: processedContent } = generateTOC(rawContent);

export default {
  // ... (meta tetap sama seperti milikmu)
  meta: {
    title: 'Rental Mobil Jakarta - SkyWhite',
    description: 'Sewa mobil di Jakarta dengan harga mulai Rp300rb/hari. Unit terbaru Avanza, Innova Zenix, hingga Fortuner. Lepas kunci atau dengan driver.',
    keywords: 'rental mobil jakarta, sewa mobil jakarta, sewa innova zenix jakarta, sewa mobil murah jakarta',
    publishedAt: '2024-02-17',
    updatedAt: '2024-02-17',
    version: '1.1.0',
    wordCount: 1500
  },

  // ========== DATA UNTUK FILTER & CARD ==========
  recommendations: {
    bestSeller: ['avanza-2023', 'innova-zenix-2024'],
    forFamily: ['avanza-2023', 'innova-zenix-2024', 'pajero-2023'],
    forBusiness: ['innova-zenix-2024', 'fortuner-2023', 'alphard-2023'],
    forTour: ['brio-2023', 'avanza-2023', 'hiace-premio'],
    withDriver: ['avanza-2023', 'innova-zenix-2024', 'pajero-2023', 'fortuner-2023'],
    withoutDriver: ['brio-2023', 'avanza-2023']
  },

  sections: tocItems.map(item => ({
    id: item.id,
    title: item.title
  })),

  body: processedContent,

  // FAQ LENGKAP
  faq: [
    {
      question: "Apa saja syarat sewa mobil lepas kunci di Jakarta?",
      answer: "Syarat utama adalah KTP, SIM A aktif, kartu identitas pegawai/kartu nama, dan bersedia diverifikasi akun media sosial atau dokumen pendukung lainnya."
    },
    {
      question: "Apakah bisa sewa mobil mendadak di Jakarta?",
      answer: "Bisa, namun ketersediaan unit tidak dijamin. Kami menyarankan booking minimal H-1 untuk memastikan unit pilihan Anda tersedia."
    },
    {
      question: "Apakah harga sudah termasuk biaya tol dan parkir?",
      answer: "Untuk paket sewa mobil saja (lepas kunci), tol dan parkir ditanggung penyewa. Untuk paket dengan driver, tol dan parkir biasanya dibayarkan langsung oleh penyewa (Reimburse)."
    },
    {
      question: "Bagaimana jika terjadi kerusakan pada mobil saat disewa?",
      answer: "Setiap unit kami sudah tercover asuransi. Penyewa hanya dikenakan biaya risiko sendiri (own risk) sesuai dengan ketentuan yang disepakati di awal."
    }
  ],

  quickTips: [
    "Pesan H-3 untuk akhir pekan (weekend)",
    "Pastikan mengecek plat nomor Ganjil/Genap sebelum berangkat",
    "Gunakan Google Maps atau Waze untuk memantau titik kemacetan real-time",
    "Sediakan uang elektronik (E-Toll) dengan saldo cukup untuk tol Jakarta",
    "Selalu kunci kendaraan saat parkir di tempat umum"
  ],

  schema: {
    openingHours: "08:00 - 22:00 (Unit Support 24 Jam)",
    priceRange: "Rp300.000 - Rp2.500.000",
    paymentMethods: ["Cash", "Transfer Bank", "OVO", "GoPay", "QRIS", "Credit Card"],
    areaServed: ["Jakarta Pusat", "Jakarta Selatan", "Jakarta Barat", "Jakarta Timur", "Jakarta Utara", "Bandara Soekarno-Hatta"]
  }
};