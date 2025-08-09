//OnboardingNavigation.js
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import OnboardingAlphaScreen from "../screens/OnboardingAlphaScreen";
import OnboardingBetaScreen from "../screens/OnboardingBetaScreen";
import OnboardingGammaScreen from "../screens/OnboardingGammaScreen";

const OnboardingTab = createMaterialTopTabNavigator();

const OnboardingNavigation = ({ navigation, onComplete }) => {
  return (
    <OnboardingTab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarShowIcon: false,
        tabBarStyle: { display: 'none' },
        swipeEnabled: false,
      }}
    >
      <OnboardingTab.Screen 
        name="OnboardingAlpha" 
        component={OnboardingAlphaScreen} 
      />
      <OnboardingTab.Screen 
        name="OnboardingBeta" 
        component={OnboardingBetaScreen} 
      />
      <OnboardingTab.Screen name="OnboardingGamma">
        {(props) => <OnboardingGammaScreen {...props} onComplete={onComplete} />}
      </OnboardingTab.Screen>
    </OnboardingTab.Navigator>
  );
};

export default OnboardingNavigation;