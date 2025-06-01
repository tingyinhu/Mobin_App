import {
  StyleSheet,
  View,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { Text } from "@rneui/themed";

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.backgroundImage}
        source={require("../assets/homeScreen.jpg")}
        resizeMode="cover"
      >
        {/* Overlay for opacity effect */}
        <View style={styles.overlay} />

        {/* Foreground content */}
        <View style={styles.content}>
          <Text h3 style={styles.headingText}>
            Welcome to {"\n"}Mobin Donut
          </Text>

          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("HomeTabs")}
          >
            <Text style={styles.buttonText}>Grab donuts</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  backgroundImage: {
    flex: 1,
    justifyContent: "center",
  },

  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(255, 255, 255, 0.6)", // white with opacity
  },

  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  headingText: {
    color: "#EC6852",
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 200,
  },

  button: {
    backgroundColor: "#EC6852",
    paddingHorizontal: 30,
    borderRadius: 30,
  },

  buttonText: {
    fontWeight: "600",
    color: "#fff",
    fontSize: 20,
    paddingVertical:8,
    paddingHorizontal:20,
  },
});
