import { useState, useEffect } from "react";
import { StyleSheet, View, ActivityIndicator, FlatList } from "react-native";
import { Text } from "@rneui/themed";

import { theme } from "../theme/theme";
import donutsData from "../data/donuts.json"; 
import DonutCard from "../components/DonutCard"; 
import { useCartState } from "../services/CartManager"; 

export default function DonutScreen({ navigation }) {
  const [error, setError] = useState(null);       
  const [isLoaded, setIsLoaded] = useState(false); 
  const [data, setData] = useState([]);           
  const cart = useCartState();                 

  useEffect(() => {
    // Simulate async data loading
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

  // Map donut names to their images
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

  // Render each donut card 
  const renderItem = ({ item }) => (
    <DonutCard
      item={item}
      image={imageMap[item.name]}
      onAddToCart={() => cart.addCartItem({ ...item })}
      onViewDetail={() =>
        navigation.navigate("DonutDetail", { donutId: item.id })
      }
    />
  );

  return (
    <View style={styles.container}>
      {error ? (
        // Failed to load
        <Text style={styles.errorText}>
          There was an error with your request.
        </Text>
      ) : !isLoaded ? (
        // loading
        <>
          <ActivityIndicator size="large" />
          <Text style={styles.loadingText}>Loading...</Text>
        </>
      ) : data.length === 0 ? (
        // No data
        <Text style={styles.errorText}>Not found.</Text>
      ) : (
        // Render donut list in 2-column layout
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
