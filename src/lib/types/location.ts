export type City = {
  name: string;
  slug: string;
  description: string;
};

export type District = {
  name: string;
  slug: string;
  citySlug: string;
  description: string;
};
