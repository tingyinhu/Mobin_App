import { hookstate, useHookstate } from "@hookstate/core";
import { useEffect, useMemo, useState } from "react";
import uuid from "react-native-uuid";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useUserState } from "./UserState";

const storeCache = {}; // Cache Hookstate stores by user
const makeInitial = () => ({ cart: [], count: 0 });
const keyFor = (userId) => `CART_${userId || "guest"}`;
const toPlain = (v) => JSON.parse(JSON.stringify(v)); // remove proxies

export function useCartState() {
  const userStore = useUserState();
  const userId = userStore.getUser()?.userId ?? "guest";
  const storageKey = useMemo(() => keyFor(userId), [userId]);

  // Reuse the same Hookstate store for each user
  const rootState = useMemo(() => {
    if (!storeCache[storageKey]) storeCache[storageKey] = hookstate(makeInitial());
    return storeCache[storageKey];
  }, [storageKey]);

  const state = useHookstate(rootState);
  const [ready, setReady] = useState(false);

  // Load cart from AsyncStorage on mount / user change
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(storageKey);
        if (cancelled) return;
        if (raw) {
          const parsed = JSON.parse(raw);
          const safe =
            parsed && Array.isArray(parsed.cart)
              ? { cart: parsed.cart, count: parsed.count ?? parsed.cart.length }
              : makeInitial();
          state.set(safe);
        } else {
          state.set(makeInitial());
        }
      } catch (e) {
        console.log("Cart load error:", e);
        state.set(makeInitial());
      } finally {
        if (!cancelled) setReady(true);
      }
    })();
    return () => { cancelled = true; };
  }, [storageKey, state]);

  // Save plain JSON to AsyncStorage
  const persist = async (nextPlain) => {
    try {
      await AsyncStorage.setItem(storageKey, JSON.stringify(nextPlain));
    } catch (e) {
      console.log("Cart save error:", e);
    }
  };

  // ---- Public API ----
  const addCartItem = (product) => {
    const prevPlain = toPlain(state.get());
    const existing = prevPlain.cart.find((i) => i.product.id === product.id);

    let nextPlain;
    if (existing) {
      // Increase qty if item exists
      nextPlain = {
        ...prevPlain,
        cart: prevPlain.cart.map((i) =>
          i.product.id === product.id ? { ...i, qty: (i.qty || 1) + 1 } : i
        ),
        count: prevPlain.cart.length,
      };
    } else {
      // Add new item
      nextPlain = {
        ...prevPlain,
        cart: [...prevPlain.cart, { id: uuid.v4(), product, qty: 1 }],
        count: prevPlain.cart.length + 1,
      };
    }
    state.set(nextPlain);
    persist(nextPlain);
  };

  const updateQty = (id, qty) => {
    const prevPlain = toPlain(state.get());
    const nextPlain = {
      ...prevPlain,
      cart: prevPlain.cart.map((i) => (i.id === id ? { ...i, qty } : i)),
    };
    state.set(nextPlain);
    persist(nextPlain);
  };

  const removeCartItem = (id) => {
    const prevPlain = toPlain(state.get());
    const nextCart = prevPlain.cart.filter((i) => i.id !== id);
    const nextPlain = { ...prevPlain, cart: nextCart, count: nextCart.length };
    state.set(nextPlain);
    persist(nextPlain);
  };

  const clearCart = () => {
    const nextPlain = makeInitial();
    state.set(nextPlain);
    persist(nextPlain);
  };

  // Accessors
  const getCart  = () => state.cart.get();
  const getCount = () => state.count.get();

  return { ready, addCartItem, updateQty, removeCartItem, clearCart, getCart, getCount };
}
