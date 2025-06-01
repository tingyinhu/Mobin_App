import { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Text, Card } from "@rneui/themed";

export default function DonutScreen({ navigation }) {
  //state declarations here
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [data, setData] = useState([]);

  // useEffect with fatch here
  useEffect(() => {
    const uri = "https://flash-lemon-double.glitch.me/donuts";

    fetch(uri)
      .then((res) => res.json())
      .then(
        (result) => {
          // console.log(result);
          setData(result);
          setIsLoaded(true);
        },
        (error) => {
          setError(error);
          setIsLoaded(true);
        }
      );
  }, []);

  function displayData(error, isLoaded, data, navigation) {
    const renderItem = ({ item }) => (
      <View style={styles.donutCard}>
        <View style={styles.imageContainer}>
          <Card.Image
            source={{ uri: item.image }}
            style={styles.image}
            resizeMode="contain"
          />
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

    if (error) {
      return (
        <View>
          <Text>There was an error with your request.</Text>
        </View>
      );
    } else if (!isLoaded) {
      return (
        <View>
          <ActivityIndicator size="large"/>
          <Text>Loading...</Text>
        </View>
      );
    } else if (data.length === 0) {
      return (
        <View style={styles.container}>
          <Text>Not found.</Text>
        </View>
      );
    } else {
      return (
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          style={styles.list}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: "space-between" }}
        />
      );
    }
  }

  //return statement
  return (
    <View style={styles.container}>
      {displayData(error, isLoaded, data, navigation)}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F5DE",
    alignItems: "center",
    justifyContent: "flex-start",
    width: "100%",
    paddingTop: 25,
  },

  list: {
    width: "100%",
  },

  donutCard: {
    backgroundColor: "#fff",
    borderTopRightRadius: 24,
    borderBottomLeftRadius: 24,
    width: "45%",
    margin: 10,
  },
  imageContainer: {
    alignItems: "center",
    paddingVertical: 10,
  },
  image: {
    width: 150,
    height: 150,
  },
  infoSection: {
    backgroundColor: "#C98B45",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  name: {
    fontSize: 16,
    fontWeight: "800",
    color: "#fff",
    textAlign: "left",
    marginBottom: 8,
  },
  actionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  detailButton: {
    backgroundColor: "#fff",
    borderBottomRightRadius: 16,
    borderTopLeftRadius: 16,
    padding: 8,
  },
  detailText: {
    color: "#C98B45",
    fontWeight: "800",
  },
  priceTag: {
    backgroundColor: "#F8F5DE",
    borderRadius: 16,
    padding: 8,
  },
  price: {
    fontWeight: "800",
    color: "#C98B45",
  },
});
