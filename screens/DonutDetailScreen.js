import { useEffect, useState } from "react";

import { StyleSheet, View, Image, ScrollView, ActivityIndicator } from "react-native";
import { Text, Icon } from "@rneui/themed";

import { theme } from "../theme/theme";
import donutsData from "../data/donuts.json";

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

export default function DonutDetailScreen({ route }) {
  const { donutId } = route.params;
  const [donut, setDonut] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDonut = async () => {
      try {
        const foundDonut = donutsData.donuts.find((d) => d.id === donutId);
        if (!foundDonut) throw new Error("Donut not found");
        setDonut(foundDonut);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoaded(true);
      }
    };

    fetchDonut();
  }, [donutId]);

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>There was an error with your request.</Text>
      </View>
    );
  }

  if (!isLoaded) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  if (!donut) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>No donut data available.</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={imageMap[donut.name]} style={styles.image} />

      <View style={styles.header}>
        <Text h4 style={styles.name}>{donut.name}</Text>
        <View style={styles.priceBadge}>
          <Text style={styles.price}>${donut.price}</Text>
        </View>
      </View>

      <Text style={styles.description}>{donut.modalDescription}</Text>

      <View style={styles.section}>
        <View style={styles.iconRow}>
          <Icon name="list" type="font-awesome-5" color={theme.colors.primary} size={18} />
          <Text style={styles.sectionTitle}>Ingredients</Text>
        </View>
        <Text style={styles.body}>{donut.ingredients}</Text>
      </View>

      <View style={styles.section}>
        <View style={styles.iconRow}>
          <Icon name="info-circle" type="font-awesome-5" color={theme.colors.secondary} size={18} />
          <Text style={styles.sectionTitle}>Details</Text>
        </View>
        <Text style={styles.body}>{donut.practicalInfo}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: theme.colors.background,
    alignItems: "center",
    justifyContent: "flex-start",
    padding: theme.spacing.medium,
  },
  image: {
    width: 250,
    height: 250,
    borderTopRightRadius: 24,
    borderBottomLeftRadius: 24,
    marginBottom: theme.spacing.large,
    resizeMode: "contain",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginBottom: theme.spacing.small,
  },
  name: {
    color: theme.colors.primary,
    fontSize: theme.typography.fontSize.large,
  },
  priceBadge: {
    backgroundColor: theme.colors.primary,
    paddingHorizontal: theme.spacing.small,
    paddingVertical: theme.spacing.small,
    borderRadius: 16,
  },
  price: {
    color: theme.colors.WhiteText,
    fontWeight: theme.typography.fontWeight.bold,
    fontSize: theme.typography.fontSize.medium,
  },
  description: {
    fontSize: theme.typography.fontSize.medium,
    textAlign: "left",
    width: "100%",
    lineHeight: 24,
    color: theme.colors.text,
  },
  section: {
    width: "100%",
    marginTop: theme.spacing.large,
  },
  iconRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: theme.spacing.small,
  },
  sectionTitle: {
    fontSize: theme.typography.fontSize.large,
    fontWeight: theme.typography.fontWeight.bold,
    marginLeft: theme.spacing.small,
    color: theme.colors.primary,
  },
  body: {
    fontSize: theme.typography.fontSize.medium,
    textAlign: "left",
    width: "100%",
    lineHeight: 24,
    color: theme.colors.text,
  },
  errorText: {
    fontSize: theme.typography.fontSize.medium,
    color: theme.colors.secondary,
  },
  loadingText: {
    fontSize: theme.typography.fontSize.medium,
    color: theme.colors.text,
  },
});
