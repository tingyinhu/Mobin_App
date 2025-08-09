import { View } from "react-native";
import { Text, Image, Button } from "@rneui/themed";
import { theme } from "../theme/theme"; 

export default function OnboardingBetaScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.imageSection}>
        <Image
          source={require("../assets/OnboardingBeta.png")}
          style={styles.featImage}
        />
      </View>
      <View style={styles.textSection}>
        <Text h2 style={styles.heading}>
          About Us
        </Text>
        <Text style={styles.text}>
          Our dedication to quality and innovation has set us apart in the Vancouver donuts scene.
        </Text>
      </View>
      <View style={styles.btnSection}>
        <Button
          title="Previous"
          icon={{
            name: "arrow-back-outline",
            type: "ionicon",
            size: 25,
            color: "white",
          }}
          iconPosition="left"
          buttonStyle={styles.button}
          onPress={() => navigation.navigate("OnboardingAlpha")}
        />
        <Button
          title="Next"
          icon={{
            name: "arrow-forward-outline",
            type: "ionicon",
            size: 25,
            color: "white",
          }}
          iconPosition="right"
          buttonStyle={styles.button}
          onPress={() => navigation.navigate("OnboardingGamma")}
        />
      </View>
    </View>
  );
}

const styles = {
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.colors.background,
    padding: theme.spacing.medium,
  },
  imageSection: {
    flex: 3,
    justifyContent: "center",
    alignItems: "center",
  },
  featImage: {
    width: 150,
    height: 100,
    resizeMode: "contain",
  },
  textSection: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
    padding: theme.spacing.medium,
    marginBottom: theme.spacing.large,
  },
  heading: {
    fontSize: theme.typography.fontSize.large,
    fontWeight: theme.typography.fontWeight.semiBold,
    color: theme.colors.primary,
    textAlign: "center",
  },
  text: {
    fontSize: theme.typography.fontSize.medium,
    fontWeight: theme.typography.fontWeight.regular,
    color: theme.colors.text,
    textAlign: "center",
    marginTop: theme.spacing.small,
  },
  btnSection: {
    flex: 1,
    justifyContent: 'flex-end',
    width: "80%",
  },
  button: {
    backgroundColor: theme.colors.primary,
    borderRadius: 30,
    marginVertical: theme.spacing.small,
  },
};
