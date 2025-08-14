import React from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { Text, Button } from "@rneui/themed";
import { useCartState } from "../services/CartManager";
import { theme } from "../theme/theme";
import CartItem from "../components/CartItem";

export default function OrderScreen() {
  // Access cart state via Hookstate manager
  const cart = useCartState();

  // Get raw Hookstate data from cart store
  const raw = cart.getCart();

  const cartItems = React.useMemo(() => {
    try {
      return Array.isArray(raw) ? JSON.parse(JSON.stringify(raw)) : [];
    } catch {
      return [];
    }
  }, [raw]);

  // Image map for each donut type (used by CartItem component)
  const imageMap = {
    "Chocolate Glaze": require("../assets/donuts/ChocolateDonut.jpg"),
    "Strawberry Sprinkle": require("../assets/donuts/StrawberryDonut.jpg"),
    "Vanilla Dream": require("../assets/donuts/VanillaDonut.jpg"),
    "Oreo Cookie": require("../assets/donuts/OreoDonut.jpg"),
    "Birthday Cake": require("../assets/donuts/BirthdayCakeDonut.jpg"),
    "Cheesy Ring": require("../assets/donuts/CheesyRingDonut.jpg"),
    "Choco Pop": require("../assets/donuts/ChocoPopDonut.jpg"),
    "Choco Spark": require("../assets/donuts/ChocoSparkDonut.jpg"),
    "Crunchy Nut": require("../assets/donuts/CrunchyNutDonut.jpg"),
    "Golden Honey": require("../assets/donuts/GoldenHoneyDonut.jpg"),
    "Mint Choco Cloud": require("../assets/donuts/MintChocoCupcake.jpg"),
    "Donut Box": require("../assets/donuts/DonutBox.jpg"),
  };

  // --- Calculate totals (on plain JS array) ---
  // Sum of (price * quantity) for each item
  const subtotal = cartItems.reduce(
    (acc, item) => acc + (item?.product?.price || 0) * (item?.qty || 1),
    0
  );
  // Tax = 15% of subtotal (rounded)
  const tax = Math.round(subtotal * 0.15);
  // Final total
  const total = subtotal + tax;

  /**
   * Adjust quantity of a given item
   * @param {number|string} id - Item ID
   * @param {"inc"|"dec"} type - Whether to increase or decrease qty
   */
  const adjustQty = (id, type) => {
    const target = cartItems.find((i) => i.id === id);
    if (!target) return;

    const currentQty = target.qty || 1;
    const newQty = type === "inc" ? currentQty + 1 : currentQty - 1;

    if (newQty <= 0) {
      // Remove item if qty is 0 or negative
      cart.removeCartItem(id);
    } else {
      // Update qty in cart
      cart.updateQty(id, newQty);
    }
  };

  // Renders each cart row
  const renderRow = ({ item }) => (
    <CartItem
      item={item}
      imageMap={imageMap}
      onQtyChange={adjustQty}
      onRemove={cart.removeCartItem}
    />
  );

  return (
    <View style={styles.container}>
      {/* Cart item list */}
      <FlatList
        data={cartItems}
        renderItem={renderRow}
        keyExtractor={(item) => String(item.id)}
        ListEmptyComponent={
          <Text style={{ textAlign: "center", marginTop: 24, color: theme.colors.text }}>
            Your cart is empty.
          </Text>
        }
      />

      {/* Summary section */}
      <View style={styles.summary}>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Subtotal</Text>
          <Text style={styles.summaryAmount}>${subtotal}</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Tax</Text>
          <Text style={styles.summaryAmount}>${tax}</Text>
        </View>
        <View style={styles.line} />
        <View style={styles.summaryRow}>
          <Text style={[styles.summaryLabel, { color: theme.colors.primary }]}>
            Total
          </Text>
          <Text style={[styles.summaryAmount, { color: theme.colors.primary }]}>
            ${total}
          </Text>
        </View>
        {/* Actions */}
        <Button title="Place Order" buttonStyle={styles.orderButton} />
        <Button title="Clear Cart" type="clear" onPress={cart.clearCart} />
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
  summary: {
    paddingTop: theme.spacing.medium,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: theme.spacing.xs || 4,
  },
  summaryLabel: {
    fontSize: theme.typography.fontSize.medium,
    fontWeight: theme.typography.fontWeight.bold,
  },
  summaryAmount: {
    fontSize: theme.typography.fontSize.medium,
  },
  line: {
    borderTopWidth: 1,
    borderColor: theme.colors.primary,
    marginVertical: theme.spacing.xs || 6,
  },
  orderButton: {
    backgroundColor: theme.colors.primary,
    borderRadius: 30,
    marginTop: theme.spacing.medium,
    paddingHorizontal: 20,
  },
});
