
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'Wellness' | 'Apparel' | 'Essentials' | 'Atmosphere';
  image: string;
  rating: number;
  isDiscrete?: boolean;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export enum Category {
  WELLNESS = 'Wellness',
  APPAREL = 'Apparel',
  ESSENTIALS = 'Essentials',
  ATMOSPHERE = 'Atmosphere'
}
