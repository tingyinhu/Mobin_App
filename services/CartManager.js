// services/CartManager.js
import { hookstate, useHookstate } from "@hookstate/core";
import uuid from "react-native-uuid";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Key for AsyncStorage
const CART_STORAGE_KEY = "APP_CART_STATE";

// Global reactive state for cart
const cartState = hookstate({
  cart: [],   // array of items: { id, product, qty }
  count: 0,   // total unique items
});

// Save cart to AsyncStorage whenever it changes
async function saveCartToStorage(cart) {
  try {
    await AsyncStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  } catch (error) {
    console.error("Failed to save cart to storage:", error);
  }
}

// Load cart from AsyncStorage when the app starts
async function loadCartFromStorage() {
  try {
    const savedCart = await AsyncStorage.getItem(CART_STORAGE_KEY);
    if (savedCart) {
      const parsedCart = JSON.parse(savedCart);
      cartState.set(parsedCart);
    }
  } catch (error) {
    console.error("Failed to load cart from storage:", error);
  }
}

// Initialize by loading cart from storage
loadCartFromStorage();

// Custom hook for accessing cart functions
export function useCartState() {
  const state = useHookstate(cartState);

  // Helper function to update state and storage
  const updateStateAndStorage = (updater) => {
    state.set(updater);
    saveCartToStorage(state.get());
  };

  return {
    // Add item to cart or increase qty if it already exists
    addCartItem(item) {
      updateStateAndStorage(prev => {
        const existing = prev.cart.find(i => i.product.id === item.id);
        if (existing) {
          return {
            ...prev,
            cart: prev.cart.map(i =>
              i.product.id === item.id ? { ...i, qty: i.qty + 1 } : i
            ),
            count: prev.cart.length
          };
        } else {
          const id = uuid.v4();
          return {
            ...prev,
            cart: [...prev.cart, { id, product: item, qty: 1 }],
            count: prev.cart.length + 1
          };
        }
      });
    },

    // Manually update quantity of an item
    updateQty(id, qty) {
      updateStateAndStorage(prev => ({
        ...prev,
        cart: prev.cart.map(i => (i.id === id ? { ...i, qty } : i))
      }));
    },

    // Remove item from cart by ID
    removeCartItem(id) {
      updateStateAndStorage(prev => ({
        ...prev,
        cart: prev.cart.filter(i => i.id !== id),
        count: prev.cart.length - 1
      }));
    },

    // Clear the entire cart
    clearCart() {
      updateStateAndStorage(() => ({
        cart: [],
        count: 0
      }));
    },

    // Get current cart items
    getCart() {
      return state.cart.get();
    },

    // Get total number of unique items
    getCount() {
      return state.count.get();
    },

    // Optional: Force sync with storage
    async syncWithStorage() {
      await loadCartFromStorage();
    }
  };
}