import { StyleSheet, View, Image, ScrollView, ActivityIndicator } from "react-native";
import { Text, Icon } from "@rneui/themed";
import { useEffect, useState } from "react";

export default function DonutDetailScreen({ route }) {
  const { donutId } = route.params; // passed from list screen
  const [donut, setDonut] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDonut = async () => {
      try {
        const response = await fetch(`https://flash-lemon-double.glitch.me/donuts/${donutId}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setDonut(data);
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
        <View>
          <Text>There was an error with your request.</Text>
        </View>
    );
  }

  if (!isLoaded) {
    return (
        <View>
          <ActivityIndicator size="large"/>
          <Text>Loading...</Text>
        </View>
    );
  }

  if (!donut) {
    return (
      <View style={styles.container}>
        <Text>No donut data available.</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={{ uri: donut.image }} style={styles.image} />

      <View style={styles.header}>
        <Text h4 style={styles.name}>{donut.name}</Text>
        <View style={styles.priceBadge}>
          <Text style={styles.price}>${donut.price}</Text>
        </View>
      </View>

      <Text style={styles.description}>{donut.modalDescription}</Text>

      <View style={styles.section}>
        <View style={styles.iconRow}>
          <Icon name="list" type="font-awesome-5" color="#EC6852" size={18} />
          <Text style={styles.sectionTitle}> Ingredients</Text>
        </View>
        <Text style={styles.body}>{donut.ingredients}</Text>
      </View>

      <View style={styles.section}>
        <View style={styles.iconRow}>
          <Icon name="info-circle" type="font-awesome-5" color="#F46E4E" size={18} />
          <Text style={styles.sectionTitle}> Details</Text>
        </View>
        <Text style={styles.body}>{donut.practicalInfo}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#F8F5DE",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 25,
  },
  image: {
    width: 250,
    height: 250,
    borderTopRightRadius: 24,
    borderBottomLeftRadius: 24,
    marginBottom: 24,
    resizeMode: "contain",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginBottom: 10,
  },
  name: {
    color: "#EC6852",
  },
  priceBadge: {
    backgroundColor: "#EC6852",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 16,
  },
  price: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  description: {
    fontSize: 16,
    textAlign: "left",
    width: "100%",
    lineHeight: 24,
    color: "#333",
  },
  section: {
    width: "100%",
    marginTop: 20,
  },
  iconRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "800",
    marginLeft: 8,
  },
  body: {
    fontSize: 16,
    textAlign: "left",
    width: "100%",
    lineHeight: 24,
    color: "#333",
  },
});
