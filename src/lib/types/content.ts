export interface FAQItem {
  question: string;
  answer: string;
}

export interface DistrictContent {
  intro?: string;
  body: string;
  faq?: FAQItem[];
}

export interface CityContent {
  intro?: string;
  body: string;
  faq?: FAQItem[];
}
