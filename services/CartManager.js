import AsyncStorage from "@react-native-async-storage/async-storage";

const CART_KEY = "cart";

export const getCart = async () => {
  try {
    const stored = await AsyncStorage.getItem(CART_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error("Failed to get cart:", error);
    return [];
  }
};

export const saveCart = async (cart) => {
  try {
    await AsyncStorage.setItem(CART_KEY, JSON.stringify(cart));
  } catch (error) {
    console.error("Failed to save cart:", error);
  }
};

export const addToCart = async (item) => {
  try {
    const cart = await getCart();
    const index = cart.findIndex((d) => d.id === item.id);
    if (index > -1) {
      cart[index].quantity += 1;
    } else {
      cart.push({ ...item, quantity: 1 });
    }
    await saveCart(cart);
    return cart;
  } catch (error) {
    console.error("Failed to add to cart:", error);
    return [];
  }
};

export const updateQuantity = async (id, change) => {
  try {
    const cart = await getCart();
    const updated = cart.map((item) =>
      item.id === id ? { ...item, quantity: Math.max(1, item.quantity + change) } : item
    );
    await saveCart(updated);
    return updated;
  } catch (error) {
    console.error("Failed to update quantity:", error);
    return [];
  }
};

export const removeFromCart = async (id) => {
  try {
    const cart = await getCart();
    const updated = cart.filter((item) => item.id !== id);
    await saveCart(updated);
    return updated;
  } catch (error) {
    console.error("Failed to remove item:", error);
    return [];
  }
};
