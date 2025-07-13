import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Text, Card, Icon } from "@rneui/themed";

import { theme } from "../theme/theme";

export default function DonutCard({ item, image, onAddToCart, onViewDetail }) {
  return (
    <View style={styles.donutCard}>
      <View style={styles.imageContainer}>
        <Card.Image
          source={image}
          style={styles.image}
          resizeMode="contain"
        />
        <TouchableOpacity style={styles.cartIcon} onPress={onAddToCart}>
          <Icon
            name="shopping-bag"
            type="feather"
            color={theme.colors.secondary}
            size={20}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.infoSection}>
        <Text style={styles.name}>{item.name}</Text>
        <View style={styles.actionRow}>
          <TouchableOpacity style={styles.detailButton} onPress={onViewDetail}>
            <Text style={styles.detailText}>View Detail</Text>
          </TouchableOpacity>

          <View style={styles.priceTag}>
            <Text style={styles.price}>${item.price}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  donutCard: {
    backgroundColor: "#fff",
    borderTopRightRadius: 24,
    borderBottomLeftRadius: 24,
    width: "45%",
    margin: theme.spacing.small,
  },
  imageContainer: {
    alignItems: "center",
    paddingVertical: theme.spacing.small,
    position: "relative",
  },
  cartIcon: {
    position: "absolute",
    bottom: 10,
    right: 10,
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 4,
    elevation: 2,
  },
  image: {
    width: 150,
    height: 150,
  },
  infoSection: {
    backgroundColor: theme.colors.primary,
    paddingVertical: theme.spacing.small,
    paddingHorizontal: theme.spacing.medium,
    borderBottomLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  name: {
    fontSize: theme.typography.fontSize.medium,
    fontWeight: theme.typography.fontWeight.bold,
    color: "#fff",
    textAlign: "left",
    marginBottom: theme.spacing.small,
  },
  actionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  detailButton: {
    backgroundColor: "#fff",
    borderBottomRightRadius: 16,
    borderTopLeftRadius: 16,
    padding: theme.spacing.small,
  },
  detailText: {
    color: theme.colors.primary,
    fontWeight: theme.typography.fontWeight.bold,
  },
  priceTag: {
    backgroundColor: theme.colors.background,
    borderRadius: 16,
    padding: theme.spacing.small,
  },
  price: {
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.primary,
  },
});
