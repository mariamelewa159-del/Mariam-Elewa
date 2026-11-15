import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import {
  CartItem,
  ConfirmedOrder,
  CustomerOrderInput,
  Dish,
  DishExtraOption,
  DishSizeOption,
} from '../types/restaurant';

const FREE_DELIVERY_THRESHOLD = 85;
const STANDARD_DELIVERY_FEE = 8;

interface AddToCartPayload {
  dish: Dish;
  selectedSize?: DishSizeOption;
  selectedExtras?: DishExtraOption[];
  quantity?: number;
  notes?: string;
}

interface CartContextValue {
  items: CartItem[];
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  openCart: () => void;
  closeCart: () => void;
  addToCart: (payload: AddToCartPayload) => void;
  updateQuantity: (cartItemId: string, delta: number) => void;
  removeFromCart: (cartItemId: string) => void;
  clearCart: () => void;
  itemCount: number;
  subtotal: number;
  deliveryFee: number;
  total: number;
  freeDeliveryRemaining: number;
  lastOrder: ConfirmedOrder | null;
  submitDemoOrder: (customer: CustomerOrderInput) => ConfirmedOrder;
  clearLastOrder: () => void;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

function buildCartItemKey(
  dishId: string,
  sizeId: string,
  extras: DishExtraOption[],
  notes?: string
): string {
  const extraIds = extras
    .map((e) => e.id)
    .sort()
    .join(',');
  const trimmedNote = (notes || '').trim().toLowerCase();
  return `${dishId}__${sizeId}__${extraIds}__${trimmedNote}`;
}

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const stored = localStorage.getItem('nova_kitchen_cart');
      return stored ? (JSON.parse(stored) as CartItem[]) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [lastOrder, setLastOrder] = useState<ConfirmedOrder | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem('nova_kitchen_cart', JSON.stringify(items));
    } catch {
      // ignore storage errors
    }
  }, [items]);

  const addToCart = ({
    dish,
    selectedSize,
    selectedExtras = [],
    quantity = 1,
    notes = '',
  }: AddToCartPayload) => {
    const size = selectedSize ?? dish.sizes[0];
    const extrasPrice = selectedExtras.reduce((acc, ext) => acc + ext.price, 0);
    const unitPrice = dish.price + size.priceDelta + extrasPrice;
    const cartItemId = buildCartItemKey(dish.id, size.id, selectedExtras, notes);

    setItems((prev) => {
      const existing = prev.find((item) => item.cartItemId === cartItemId);
      if (existing) {
        return prev.map((item) =>
          item.cartItemId === cartItemId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [
        ...prev,
        {
          cartItemId,
          dish,
          selectedSize: size,
          selectedExtras,
          quantity,
          notes: notes.trim() || undefined,
          unitPrice,
        },
      ];
    });
  };

  const updateQuantity = (cartItemId: string, delta: number) => {
    setItems((prev) =>
      prev
        .map((item) =>
          item.cartItemId === cartItemId
            ? { ...item, quantity: item.quantity + delta }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeFromCart = (cartItemId: string) => {
    setItems((prev) => prev.filter((item) => item.cartItemId !== cartItemId));
  };

  const clearCart = () => setItems([]);

  const { itemCount, subtotal, deliveryFee, total, freeDeliveryRemaining } = useMemo(() => {
    const count = items.reduce((sum, item) => sum + item.quantity, 0);
    const sub = items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
    const fee = sub === 0 || sub >= FREE_DELIVERY_THRESHOLD ? 0 : STANDARD_DELIVERY_FEE;
    const remaining = Math.max(0, FREE_DELIVERY_THRESHOLD - sub);
    return {
      itemCount: count,
      subtotal: sub,
      deliveryFee: fee,
      total: sub + fee,
      freeDeliveryRemaining: remaining,
    };
  }, [items]);

  const submitDemoOrder = (customer: CustomerOrderInput): ConfirmedOrder => {
    const randomRef = Math.floor(1000 + Math.random() * 9000);
    const confirmed: ConfirmedOrder = {
      orderNumber: `NK-${randomRef}`,
      createdAt: new Date().toISOString(),
      customer,
      items: [...items],
      subtotal,
      deliveryFee,
      total,
      estimatedMinutes: 35,
      status: 'confirmed_demo',
    };
    setLastOrder(confirmed);
    setItems([]);
    return confirmed;
  };

  const clearLastOrder = () => setLastOrder(null);

  return (
    <CartContext.Provider
      value={{
        items,
        isCartOpen,
        setIsCartOpen,
        openCart: () => setIsCartOpen(true),
        closeCart: () => setIsCartOpen(false),
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        itemCount,
        subtotal,
        deliveryFee,
        total,
        freeDeliveryRemaining,
        lastOrder,
        submitDemoOrder,
        clearLastOrder,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
