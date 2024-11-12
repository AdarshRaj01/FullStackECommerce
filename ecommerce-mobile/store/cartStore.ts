import {create} from 'zustand';

type CartItem = {
    id: string;
    name: string;
    price: number;
    quantity: number;
};

interface CartStore {
    items: CartItem[];
    addItem: (item: CartItem) => void;
    removeItem: (id: string) => void;
    updateQuantity: (id: string, quantity: number) => void;
    clearCart: () => void;
    totalAmount: () => number;
}



export const useCart = create((set) => ({
    items: [],
  
    addProduct: (product:any) => set((state:any) => {
      const existingItem = state.items.find((item:any) => item.id === product.id);
  
      if (existingItem) {
        // Increase quantity if product already exists in the cart
        return {
          items: state.items.map((item:any) =>
            item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
          ),
        };
      } else {
        // Add new product to the cart
        return {
          items: [...state.items, { ...product, quantity: 1 }],
        };
      }
    }),

    resetCart:()=>set({items:[]})

}))

