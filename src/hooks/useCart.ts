import { useState, useCallback } from 'react';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  notes?: string;
}

export interface Cart {
  items: CartItem[];
  total: number;
  subtotal: number;
  deliveryFee: number;
}

export const useCart = () => {
  const [cart, setCart] = useState<Cart>({
    items: [],
    total: 0,
    subtotal: 0,
    deliveryFee: 5.90
  });

  const addItem = useCallback((item: Omit<CartItem, 'quantity'>) => {
    setCart(prev => {
      const existingItem = prev.items.find(i => i.id === item.id);
      
      let newItems;
      if (existingItem) {
        newItems = prev.items.map(i => 
          i.id === item.id 
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      } else {
        newItems = [...prev.items, { ...item, quantity: 1 }];
      }

      const subtotal = newItems.reduce((sum, i) => sum + (i.price * i.quantity), 0);
      const total = subtotal + prev.deliveryFee;

      return {
        ...prev,
        items: newItems,
        subtotal,
        total
      };
    });
  }, []);

  const removeItem = useCallback((itemId: string) => {
    setCart(prev => {
      const newItems = prev.items.filter(i => i.id !== itemId);
      const subtotal = newItems.reduce((sum, i) => sum + (i.price * i.quantity), 0);
      const total = subtotal + (newItems.length > 0 ? prev.deliveryFee : 0);

      return {
        ...prev,
        items: newItems,
        subtotal,
        total
      };
    });
  }, []);

  const updateQuantity = useCallback((itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(itemId);
      return;
    }

    setCart(prev => {
      const newItems = prev.items.map(i => 
        i.id === itemId 
          ? { ...i, quantity }
          : i
      );

      const subtotal = newItems.reduce((sum, i) => sum + (i.price * i.quantity), 0);
      const total = subtotal + prev.deliveryFee;

      return {
        ...prev,
        items: newItems,
        subtotal,
        total
      };
    });
  }, [removeItem]);

  const clearCart = useCallback(() => {
    setCart({
      items: [],
      total: 0,
      subtotal: 0,
      deliveryFee: 5.90
    });
  }, []);

  const getItemCount = useCallback(() => {
    return cart.items.reduce((sum, item) => sum + item.quantity, 0);
  }, [cart.items]);

  return {
    cart,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    getItemCount
  };
};