export interface DistrictContent {
  body: string;
  faq: {
    question: string;
    answer: string;
  }[];
}

export const districtContent: Record<string, DistrictContent> = {
  "cilincing": {
    body: "...600-900 kata...",
    faq: [
      {
        question: "Apakah tersedia sewa mobil lepas kunci di Babakan Madang?",
        answer: "Ya, tersedia layanan lepas kunci dengan syarat dokumen lengkap."
      },
      {
        question: "Apakah bisa antar jemput ke perumahan sekitar?",
        answer: "Tim kami melayani pengantaran ke seluruh area Babakan Madang."
      }
    ]
  }
};
