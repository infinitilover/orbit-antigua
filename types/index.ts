export type BusinessCategory = "Real Estate" | "Car Rentals" | "Health & Wellness" | "Business Listings";
export type CategoryFilter = BusinessCategory | "All";

export interface Business {
  id: string;
  name: string;
  category: BusinessCategory;
  description: string;
  longDescription: string;
  imageUrl: string;
  gallery: string[];
  location: string;
  phone: string;
  website: string;
  featured?: boolean;
}
