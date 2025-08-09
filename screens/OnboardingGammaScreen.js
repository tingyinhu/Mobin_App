import { View } from "react-native";
import { useNavigation } from "@react-navigation/native"; 
import { Text, Image, Button } from "@rneui/themed";
import { theme } from "../theme/theme"; // Import your theme
import { setOnboardingFlag } from "../services/OnboardingManager"; // Import to set onboarding flag

export default function OnboardingGammaScreen({ onComplete }) {
  const navigation = useNavigation();  // Hook to get navigation object

  const handleFinish = async () => {
    try {
      // Set the onboarding flag to false (since onboarding is completed)
      await setOnboardingFlag(false);
      
      // Navigate to the Home screen or main app screen (MainTabs)
      onComplete(); // Call the function to trigger App.js rerender
    } catch (error) {
      console.error("Error completing onboarding:", error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageSection}>
        <Image
          source={require("../assets/OnboardingGamma.png")}
          style={styles.featImage}
        />
      </View>

      <View style={styles.textSection}>
        <Text h2 style={styles.heading}>
          Pick Your Perfect Donuts
        </Text>
        <Text style={styles.text}>
          We've got the perfect treat to satisfy your sweet tooth.
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
          onPress={() => navigation.navigate("OnboardingBeta")}  // Navigate to previous screen
        />
        <Button
          title="Grab donuts"
          icon={{
            name: "arrow-forward-outline",
            type: "ionicon",
            size: 25,
            color: "white",
          }}
          iconPosition="right"
          buttonStyle={styles.button}
          onPress={handleFinish}  // Complete onboarding and navigate
        />
      </View>
    </View>
  );
}

const styles = {
  container: {
    flex: 1,
    justifyContent: "space-between",
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
    width: 300,
    height: 200,
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
    fontWeight: theme.typography.fontWeight.semibold,
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
    justifyContent: "flex-end",
    width: "80%",
  },
  button: {
    backgroundColor: theme.colors.primary,
    borderRadius: 30,
    marginVertical: theme.spacing.small,
  },
};
