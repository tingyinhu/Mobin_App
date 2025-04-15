import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";

const { width, height } = Dimensions.get("window");
const COLORS = { primary: "#C98B45", white: "#FDFDFC" };

const AboutScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Image
          source={require("../../assets/MobinDonut.jpg")}
          style={styles.logo}
          resizeMode="contain"
        />

        <Text style={styles.tagline}>Mobin Donut, Pure Delight.</Text>
        <Text style={styles.subTagline}>Bite by bite, Spreading Joy.</Text>
        <Text style={styles.description}>
          We are passionate about crafting the finest donuts with fresh, sustainable ingredients.
        </Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About Us</Text>
          <Text style={styles.sectionHeading}>Happiness Donut in Every Bite!</Text>
          <Text style={styles.sectionText}>
            Founded by a group of donut enthusiasts, Mobin Donut started as a small bakery and quickly became a beloved local spot. Our dedication to quality and innovation has set us apart in the Vancouver donut scene.
          </Text>
        </View>

        <TouchableOpacity
          style={styles.btn}
          onPress={() => navigation.navigate("Order")}
        >
          <Text style={styles.btnText}>View Our Donuts</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingBottom: 40,
    alignItems: "center",
  },
  logo: {
    width: width * 0.6,
    height: height * 0.2,
    marginTop: 20,
    marginBottom: 30,
  },
  tagline: {
    color: COLORS.white,
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  subTagline: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 20,
  },
  description: {
    color: COLORS.white,
    fontSize: 16,
    textAlign: "center",
    marginBottom: 30,
    lineHeight: 24,
    paddingHorizontal: 20,
  },
  section: {
    marginBottom: 30,
    alignItems: "center",
  },
  sectionTitle: {
    color: COLORS.white,
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },
  sectionHeading: {
    color: COLORS.white,
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 15,
    textAlign: "center",
  },
  sectionText: {
    color: COLORS.white,
    fontSize: 16,
    textAlign: "center",
    lineHeight: 24,
    paddingHorizontal: 10,
  },
  btn: {
    height: 50,
    width: width * 0.8,
    borderRadius: 5,
    backgroundColor: COLORS.white,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  btnText: {
    fontWeight: "bold",
    fontSize: 15,
    color: COLORS.primary,
  },
});

export default AboutScreen;