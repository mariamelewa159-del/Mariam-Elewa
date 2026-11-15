export type Language = 'en' | 'ar';

export type PageId = 'home' | 'menu' | 'dish' | 'checkout' | 'about' | 'contact';

export type TransitionStyle = 'curtain' | 'slide' | 'zoom' | 'circular';

export interface RouteState {
  page: PageId;
  dishId?: string;
  category?: DishCategory | 'all';
}

export type DishCategory = 'starters' | 'mains' | 'desserts' | 'elixirs';

export interface LocalizedText {
  en: string;
  ar: string;
}

export interface DishSizeOption {
  id: string;
  label: LocalizedText;
  priceDelta: number;
}

export interface DishExtraOption {
  id: string;
  label: LocalizedText;
  price: number;
}

export interface Dish {
  id: string;
  category: DishCategory;
  name: LocalizedText;
  subtitle: LocalizedText;
  description: LocalizedText;
  ingredients: {
    en: string[];
    ar: string[];
  };
  price: number;
  prepMinutes: number;
  calories: number;
  image: string;
  isHot: boolean;
  isSignature: boolean;
  sizes: DishSizeOption[];
  extras: DishExtraOption[];
}

export interface CartItem {
  cartItemId: string;
  dish: Dish;
  selectedSize: DishSizeOption;
  selectedExtras: DishExtraOption[];
  quantity: number;
  notes?: string;
  unitPrice: number;
}

export interface CustomerOrderInput {
  fullName: string;
  phone: string;
  address: string;
  notes: string;
  paymentMethod: 'cash_on_delivery';
}

export interface ConfirmedOrder {
  orderNumber: string;
  createdAt: string;
  customer: CustomerOrderInput;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  estimatedMinutes: number;
  status: 'confirmed_demo';
}

export interface ReviewItem {
  id: string;
  author: LocalizedText;
  role: LocalizedText;
  dishOrdered: LocalizedText;
  quote: LocalizedText;
  rating: number;
}
