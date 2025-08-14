import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

// Import each onboarding step screen
import OnboardingAlphaScreen from "../screens/OnboardingAlphaScreen";
import OnboardingBetaScreen from "../screens/OnboardingBetaScreen";
import OnboardingGammaScreen from "../screens/OnboardingGammaScreen";

// Create the top tab navigator (but tabs will be hidden in this case)
const OnboardingTab = createMaterialTopTabNavigator();

const OnboardingNavigation = ({ navigation, onComplete }) => {
  return (
    <OnboardingTab.Navigator
      screenOptions={{
        // Hide tab bar visuals (labels & icons)
        tabBarShowLabel: false,
        tabBarShowIcon: false,
        tabBarStyle: { display: 'none' },
        // Disable swipe gesture to control navigation flow
        swipeEnabled: false,
      }}
    >
      {/* First onboarding screen */}
      <OnboardingTab.Screen 
        name="OnboardingAlpha" 
        component={OnboardingAlphaScreen} 
      />
      
      {/* Second onboarding screen */}
      <OnboardingTab.Screen 
        name="OnboardingBeta" 
        component={OnboardingBetaScreen} 
      />
      
      {/* Last onboarding screen, triggers completion callback */}
      <OnboardingTab.Screen name="OnboardingGamma">
        {(props) => <OnboardingGammaScreen {...props} onComplete={onComplete} />}
      </OnboardingTab.Screen>
    </OnboardingTab.Navigator>
  );
};

export default OnboardingNavigation;
