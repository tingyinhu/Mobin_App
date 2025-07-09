import { StyleSheet, View, ImageBackground, TouchableOpacity } from "react-native";
import { Text } from "@rneui/themed";

import { theme } from '../theme/theme';  

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
    backgroundColor: "rgba(255, 255, 255, 0.6)",
  },

  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  headingText: {
    color: theme.colors.primary, 
    fontWeight: theme.typography.fontWeight.bold, 
    textAlign: "center",
    marginBottom: theme.spacing.xLarge, 
  },

  button: {
    backgroundColor: theme.colors.primary, 
    paddingHorizontal: theme.spacing.large,
    borderRadius: 30,
  },

  buttonText: {
    fontWeight: theme.typography.fontWeight.semiBold, 
    color: theme.colors.WhiteText, 
    fontSize: theme.typography.fontSize.large, 
    paddingVertical: theme.spacing.small,
    paddingHorizontal: theme.spacing.medium,
  },
});
