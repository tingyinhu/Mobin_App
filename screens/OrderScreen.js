import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import { Text, Icon, Button } from "@rneui/themed";

import { theme } from "../theme/theme";

export default function OrderScreen() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = async () => {
    try {
      const storedCart = await AsyncStorage.getItem("cart");
      if (storedCart) {
        setCartItems(JSON.parse(storedCart));
      }
    } catch (err) {
      console.log("Error loading cart:", err);
    }
  };

  const updateCart = async (updatedCart) => {
    setCartItems(updatedCart);
    await AsyncStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const increaseQty = (id) => {
    const updated = cartItems.map((item) =>
      item.id === id ? { ...item, qty: item.qty + 1 } : item
    );
    updateCart(updated);
  };

  const decreaseQty = (id) => {
    const updated = cartItems.map((item) =>
      item.id === id && item.qty > 1 ? { ...item, qty: item.qty - 1 } : item
    );
    updateCart(updated);
  };

  const removeItem = (id) => {
    const updated = cartItems.filter((item) => item.id !== id);
    updateCart(updated);
  };

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
  const taxes = subtotal * 0.1; // 10% tax
  const total = subtotal + taxes;

  const renderItem = ({ item }) => (
    <View style={styles.itemRow}>
      <Image source={item.image} style={styles.donutImage} />
      <Text style={styles.name}>{item.name}</Text>

      <View style={styles.qtyControl}>
        <TouchableOpacity onPress={() => decreaseQty(item.id)}>
          <Icon name="minus" type="font-awesome-5" size={14} />
        </TouchableOpacity>
        <Text style={styles.qtyText}>{item.qty.toString().padStart(2, "0")}</Text>
        <TouchableOpacity onPress={() => increaseQty(item.id)}>
          <Icon name="plus" type="font-awesome-5" size={14} />
        </TouchableOpacity>
      </View>

      <Text style={styles.price}>${item.price}</Text>

      <TouchableOpacity onPress={() => removeItem(item.id)}>
        <Icon name="trash-alt" type="font-awesome-5" color={theme.colors.primary} />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={cartItems}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ paddingBottom: 20 }}
      />

      <View style={styles.summary}>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Subtotal</Text>
          <Text style={styles.summaryAmount}>${subtotal.toFixed(0)}</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Taxes</Text>
          <Text style={styles.summaryAmount}>${taxes.toFixed(0)}</Text>
        </View>
        <View style={styles.line} />
        <View style={styles.summaryRow}>
          <Text style={[styles.summaryLabel, { color: theme.colors.primary }]}>Total</Text>
          <Text style={[styles.summaryAmount, { color: theme.colors.primary }]}>${total.toFixed(0)}</Text>
        </View>

        <Button
          title="Place the Order"
          buttonStyle={styles.orderButton}
          titleStyle={{ fontWeight: "bold", fontSize: 16 }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: theme.spacing.medium,
  },
  itemRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: theme.spacing.small,
  },
  donutImage: {
    width: 50,
    height: 50,
    marginRight: theme.spacing.small,
  },
  name: {
    flex: 1,
    fontSize: 16,
    color: theme.colors.primary,
  },
  qtyControl: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 20,
    paddingHorizontal: 10,
    marginRight: theme.spacing.small,
  },
  qtyText: {
    marginHorizontal: 10,
    fontSize: 16,
    fontWeight: "bold",
  },
  price: {
    fontSize: 16,
    backgroundColor: theme.colors.primary,
    color: "#fff",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: theme.spacing.small,
  },
  summary: {
    paddingTop: 10,
    borderTopWidth: 1,
    borderColor: "#ccc",
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 4,
  },
  summaryLabel: {
    fontSize: 16,
    fontWeight: "500",
  },
  summaryAmount: {
    fontSize: 16,
  },
  line: {
    height: 1,
    backgroundColor: "#ccc",
    marginVertical: 6,
  },
  orderButton: {
    backgroundColor: "#F46E4E",
    borderRadius: 30,
    marginTop: theme.spacing.medium,
  },
});
