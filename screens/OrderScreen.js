import React from "react";
import {
  View,
  StyleSheet,
  FlatList,
} from "react-native";
import { Text, Button } from "@rneui/themed";
import { useCartState } from "../services/CartManager";
import { theme } from "../theme/theme";
import CartItem from "../components/CartItem"; // 👈 import

export default function OrderScreen() {
  const cart = useCartState();
  const cartItems = cart.getCart();

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

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.product.price * (item.qty || 1),
    0
  );
  const tax = Math.round(subtotal * 0.1);
  const total = subtotal + tax;

  // quantity handler
  const adjustQty = (id, type) => {
    const target = cartItems.find((i) => i.id === id);
    if (!target) return;
    const newQty = type === "inc" ? target.qty + 1 : target.qty - 1;
    if (newQty <= 0) {
      cart.removeCartItem(id);
    } else {
      cart.updateQty(id, newQty);
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={cartItems}
        renderItem={({ item }) => (
          <CartItem
            item={item}
            imageMap={imageMap}
            onQtyChange={adjustQty}
            onRemove={cart.removeCartItem}
          />
        )}
        keyExtractor={(item) => item.id.toString()}
      />

      {/* Summary */}
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
  },
});
