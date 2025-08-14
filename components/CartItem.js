import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Icon } from "@rneui/themed";
import { theme } from "../theme/theme";

export default function CartItem({ item, imageMap, onQtyChange, onRemove }) {
  return (
    <View style={styles.itemRow}>
      <Image source={imageMap[item.product.name]} style={styles.donutImage} />
      <Text style={styles.name}>{item.product.name}</Text>

      {/* Quantity Control */}
      <View style={styles.qtyControl}>
        <TouchableOpacity onPress={() => onQtyChange(item.id, "dec")}>
          <Icon name="minus" type="feather" size={20} color={theme.colors.primary} />
        </TouchableOpacity>
        <Text style={styles.qtyText}>{item.qty || 1}</Text>
        <TouchableOpacity onPress={() => onQtyChange(item.id, "inc")}>
          <Icon name="plus" type="feather" size={20} color={theme.colors.primary} />
        </TouchableOpacity>
      </View>

      <Text style={styles.price}>${item.product.price}</Text>
      <TouchableOpacity onPress={() => onRemove(item.id)}>
        <Icon name="trash" type="feather" color={theme.colors.secondary} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  itemRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: theme.spacing.small,
  },
  donutImage: {
    width: 50,
    height: 50,
    borderRadius: 20,
    marginRight: theme.spacing.small,
  },
  name: {
    flex: 1,
    fontSize: theme.typography.fontSize.medium,
    color: theme.colors.primary,
  },
  qtyControl: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 20,
    paddingHorizontal: theme.spacing.small,
    paddingVertical: theme.spacing.small,
    marginRight: theme.spacing.medium,
  },
  qtyText: {
    marginHorizontal: theme.spacing.xs || 8,
    fontSize: theme.typography.fontSize.medium,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.primary,
  },
  price: {
    fontSize: theme.typography.fontSize.medium,
    backgroundColor: theme.colors.primary,
    color: "#fff",
    paddingHorizontal: theme.spacing.small,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: theme.spacing.medium,
  },
});