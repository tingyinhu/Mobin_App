import { useState, useEffect } from 'react';
import { ActivityIndicator, View, StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Local storage functions for onboarding state
import { getOnboardingFlag, setOnboardingFlag } from './services/OnboardingManager';

// Navigation flows
import OnboardingNavigation from './navigation/OnboardingNavigation';
import AppStack from './navigation/AppStack';

const RootStack = createNativeStackNavigator();

// Simple loading screen while app is initializing
const LoadingScreen = () => (
  <View style={styles.loadingContainer}>
    <ActivityIndicator size="large" color="#EC6852" />
  </View>
);

export default function App() {
  // State to control whether onboarding should be shown
  const [showOnboarding, setShowOnboarding] = useState(null);
  
  // Example placeholder for font loading state
  const [fontsLoaded] = useState(true); 
  
  // Check onboarding flag from storage when app starts
  useEffect(() => {
    getOnboardingFlag()
      .then((res) => {
        // Show onboarding if no flag found or explicitly set to true
        setShowOnboarding(res === true || res === null);
      })
      .catch((error) => {
        console.error('Error checking onboarding:', error);
        setShowOnboarding(false);
      });
  }, []);

  // Show loading screen until we know onboarding state & fonts are ready
  if (!fontsLoaded || showOnboarding === null) {
    return <LoadingScreen />;
  }

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <RootStack.Navigator screenOptions={{ headerShown: false }}>
          {showOnboarding ? (
            // Onboarding flow
            <RootStack.Screen name="OnboardingFlow">
              {(props) => (
                <OnboardingNavigation 
                  {...props} 
                  onComplete={() => {
                    // When onboarding is done, hide it and update the flag
                    setShowOnboarding(false);
                    setOnboardingFlag(false);
                  }}
                />
              )}
            </RootStack.Screen>
          ) : (
            // Main app flow after onboarding
            <RootStack.Screen name="App" component={AppStack} />
          )}
        </RootStack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
});
