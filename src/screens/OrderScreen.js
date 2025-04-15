import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

const donuts = [
  {
    id: 1,
    name: "Chocolate Glaze",
    price: 5,
    description: "Rich chocolate coating.",
    image: require("../../assets/donuts/ChocolateDonut.jpg"),
  },
  {
    id: 2,
    name: "Strawberry Sprinkle",
    price: 6,
    description: "Sweet strawberry glaze with sprinkles.",
    image: require("../../assets/donuts/StrawberryDonut.jpg"),
  },
  {
    id: 3,
    name: "Vanilla Dream",
    price: 7,
    description: "Soft vanilla with a sugar dusting.",
    image: require("../../assets/donuts/VanillaDonut.jpg"),
  },
  {
    id: 4,
    name: "Oreo Cookie",
    price: 8,
    description: "Double-stuffed delight in each bite.",
    image: require("../../assets/donuts/OreoDonut.jpg"),
  },
  {
    id: 5,
    name: "Birthday Cake",
    price: 9,
    description: "Celebrate with birthday cake bliss.",
    image: require("../../assets/donuts/BirthdayCakeDonut.jpg"),
  },
  {
    id: 6,
    name: "Cheesy Ring",
    price: 5,
    description: "Salty cream cheese punch.",
    image: require("../../assets/donuts/CheesyRingDonut.jpg"),
  },
  {
    id: 7,
    name: "Choco Pop",
    price: 8,
    description: "Fun-shaped donut with a shiny glaze.",
    image: require("../../assets/donuts/ChocoPopDonut.jpg"),
  },
  {
    id: 8,
    name: "Choco Spark",
    price: 6,
    description: "Glossy chocolate donut with glitter.",
    image: require("../../assets/donuts/ChocoSparkDonut.jpg"),
  },
  {
    id: 9,
    name: "Crunchy Nut",
    price: 7,
    description: "Crispy donut packed with crunchy nuts.",
    image: require("../../assets/donuts/CrunchyNutDonut.jpg"),
  },
  {
    id: 10,
    name: "Golden Honey",
    price: 5,
    description: "Soft donut glazed in sweet honey.",
    image: require("../../assets/donuts/GoldenHoneyDonut.jpg"),
  },
  {
    id: 11,
    name: "Mint Choco Cloud (Seasonal)",
    price: 4,
    description: "Chocolate cupcake with a mint cream burst.",
    image: require("../../assets/donuts/MintChocoCupcake.jpg"),
  },
  {
    id: 12,
    name: "Donut Box",
    price: 1,
    description: "Compact box for 12 Mobin donuts.",
    image: require("../../assets/donuts/DonutBox.jpg"),
  },
];

const { width } = Dimensions.get("window");
const COLORS = { primary: "#C98B45", white: "#FDFDFC" };

const OrderScreen = ({ navigation }) => {
  const [likedDonuts, setLikedDonuts] = useState({});

  const toggleLike = (id) => {
    setLikedDonuts((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={donuts}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.imageContainer}>
              <Image
                source={item.image}
                style={styles.image}
                resizeMode="cover"
              />
            </View>

            <View style={styles.infoContainer}>
              <View style={styles.infoTextContainer}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.price}>${item.price.toFixed(2)}</Text>
                <Text style={styles.description}>{item.description}</Text>
              </View>
              <TouchableOpacity onPress={() => toggleLike(item.id)}>
                <FontAwesomeIcon
                  icon={faHeart}
                  size={24}
                  color={likedDonuts[item.id] ? "#E97451" : "#C98B45"}
                />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
      
      <View style={styles.buttonWrapper}>
        <TouchableOpacity 
          style={styles.btn} 
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.btnText}>Back to Onboarding</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FDFDFC",
    padding: 10,
  },
  listContainer: {
    paddingBottom: 80,
  },
  columnWrapper: {
    justifyContent: "space-between",
  },
  card: {
    width: Dimensions.get("window").width / 2 - 20,
    marginBottom: 15,
    overflow: "hidden",
    backgroundColor: "#F8F5DE",
    borderRadius: 16,
  },
  imageContainer: {
    borderTopRightRadius: 16,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: 150,
  },
  infoContainer: {
    flexDirection: "row",
    padding: 12,
    borderBottomLeftRadius: 16,
  },
  infoTextContainer: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#C98B45",
    marginBottom: 5,
  },
  price: {
    color: "#C98B45",
    fontWeight: "bold",
    fontSize: 14,
  },
  description: {
    fontSize: 12,
    color: "#5C4033",
    marginBottom: 5,
  },
  btn: {
    height: 50,
    width: width * 0.8,
    borderRadius: 5,
    backgroundColor: COLORS.white,
    justifyContent: "center",
    alignItems: "center",
  },
  btnText: {
    fontWeight: "bold",
    fontSize: 15,
    color: COLORS.primary,
  },
  buttonWrapper: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    alignItems: 'center'
  }
});

export default OrderScreen;