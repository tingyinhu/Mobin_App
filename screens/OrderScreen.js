import React, { useState } from "react";
import { useFocusEffect } from "@react-navigation/native";

import {
  View,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import { Text, Icon, Button } from "@rneui/themed";
import { theme } from "../theme/theme";

import {
  getCart,
  updateQuantity,
  removeFromCart,
  saveCart,
} from "../services/CartManager";

export default function OrderScreen() {
  const [cartItems, setCartItems] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      loadCart();
    }, [])
  );

  const loadCart = async () => {
    const cart = await getCart();
    setCartItems(cart);
  };

  const handleUpdateQty = async (id, change) => {
    const updatedCart = await updateQuantity(id, change);
    setCartItems(updatedCart);
  };

  const handleRemove = async (id) => {
    const updatedCart = await removeFromCart(id);
    setCartItems(updatedCart);
  };

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
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const taxes = Math.round(subtotal * 0.1);
  const total = subtotal + taxes;

  const renderItem = ({ item }) => (
    <View style={styles.itemRow}>
      <Image source={imageMap[item.name]} style={styles.donutImage} />
      <Text style={styles.name}>{item.name}</Text>

      <View style={styles.qtyControl}>
        <TouchableOpacity onPress={() => handleUpdateQty(item.id, -1)}>
          <Icon name="minus" type="font-awesome-5" size={14} />
        </TouchableOpacity>
        <Text style={styles.qtyText}>
          {item.quantity.toString().padStart(2, "0")}
        </Text>
        <TouchableOpacity onPress={() => handleUpdateQty(item.id, 1)}>
          <Icon name="plus" type="font-awesome-5" size={14} />
        </TouchableOpacity>
      </View>

      <Text style={styles.price}>${item.price}</Text>

      <TouchableOpacity onPress={() => handleRemove(item.id)}>
        <Icon
          name="trash-alt"
          type="font-awesome-5"
          color={theme.colors.primary}
        />
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
          <Text style={[styles.summaryLabel, { color: theme.colors.primary }]}>
            Total
          </Text>
          <Text style={[styles.summaryAmount, { color: theme.colors.primary }]}>
            ${total.toFixed(0)}
          </Text>
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
