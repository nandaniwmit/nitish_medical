export interface Testimonial {
  id: string;
  name: string;
  role: string;
  rating: number;
  comment: string;
  date: string;
  avatar: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
  features?: string[];
}

export interface MedicineCategory {
  id: string;
  name: string;
  description: string;
  iconName: string;
  popularItems: string[];
  imageUrl: string;
}

export interface HealthTip {
  id: string;
  title: string;
  category: string;
  summary: string;
  content: string;
  date: string;
  readTime: string;
  imageUrl: string;
}

export interface Offer {
  id: string;
  title: string;
  description: string;
  code: string;
  discount: string;
  expiry: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'store' | 'medicines' | 'equipment' | 'products';
  imageUrl: string;
  description: string;
}
