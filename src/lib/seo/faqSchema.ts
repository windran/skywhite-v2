export interface FaqItem {
  question: string;
  answer: string;
}

export function generateFaqSchema(faq: FaqItem[]) {
  if (!faq || faq.length === 0) return null;

  return {
    "@type": "FAQPage",
    mainEntity: faq.map((item: FaqItem) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer
      }
    }))
  };
}
