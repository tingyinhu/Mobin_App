import { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Text, Card, Icon } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";

import donutsData from "../data/donuts.json";
import { theme } from "../theme/theme";
import { addToCart } from "../services/CartManager";

export default function DonutScreen() {
  const navigation = useNavigation();
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    try {
      setTimeout(() => {
        setData(donutsData.donuts);
        setIsLoaded(true);
      }, 500);
    } catch (err) {
      setError(err);
      setIsLoaded(true);
    }
  }, []);

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

  const handleAddToCart = async (item) => {
    await addToCart(item);
    console.log("Added to cart:", item.name);
  };

  const renderItem = ({ item }) => (
    <View style={styles.donutCard}>
      <View style={styles.imageContainer}>
        <Card.Image
          source={imageMap[item.name]}
          style={styles.image}
          resizeMode="contain"
        />
        <TouchableOpacity style={styles.cartIcon} onPress={() => handleAddToCart(item)}>
          <Icon name="shopping-bag" type="feather" color={theme.colors.secondary} size={20} />
        </TouchableOpacity>
      </View>

      <View style={styles.infoSection}>
        <Text style={styles.name}>{item.name}</Text>
        <View style={styles.actionRow}>
          <TouchableOpacity
            style={styles.detailButton}
            onPress={() =>
              navigation.navigate("DonutDetail", { donutId: item.id })
            }
          >
            <Text style={styles.detailText}>View Detail</Text>
          </TouchableOpacity>

          <View style={styles.priceTag}>
            <Text style={styles.price}>${item.price}</Text>
          </View>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {error ? (
        <Text style={styles.errorText}>There was an error with your request.</Text>
      ) : !isLoaded ? (
        <>
          <ActivityIndicator size="large" />
          <Text style={styles.loadingText}>Loading...</Text>
        </>
      ) : data.length === 0 ? (
        <Text style={styles.errorText}>Not found.</Text>
      ) : (
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          style={styles.list}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: "space-between" }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    alignItems: "center",
    justifyContent: "flex-start",
    width: "100%",
    paddingTop: theme.spacing.medium,
  },
  list: {
    width: "100%",
  },
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
    elevation: 1,
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
  errorText: {
    color: theme.colors.secondary,
    fontSize: theme.typography.fontSize.medium,
    marginTop: theme.spacing.medium,
  },
  loadingText: {
    fontSize: theme.typography.fontSize.medium,
    marginTop: theme.spacing.small,
  },
});
