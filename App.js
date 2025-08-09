import { useState, useEffect } from 'react';
import { ActivityIndicator, View, StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { getOnboardingFlag, setOnboardingFlag } from './services/OnboardingManager';
import OnboardingNavigation from './navigation/OnboardingNavigation';
import AppStack from './navigation/AppStack';

const RootStack = createNativeStackNavigator();

// Add LoadingScreen component
const LoadingScreen = () => (
  <View style={styles.loadingContainer}>
    <ActivityIndicator size="large" color="#EC6852" />
  </View>
);

export default function App() {
  const [showOnboarding, setShowOnboarding] = useState(null);
  const [fontsLoaded] = useState(true); // In a real app, replace with actual font loading

  useEffect(() => {
    getOnboardingFlag()
      .then((res) => {
        setShowOnboarding(res === true || res === null);
      })
      .catch((error) => {
        console.error('Error checking onboarding:', error);
        setShowOnboarding(false);
      });
  }, []);

  if (!fontsLoaded || showOnboarding === null) {
    return <LoadingScreen />;
  }

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <RootStack.Navigator screenOptions={{ headerShown: false }}>
          {showOnboarding ? (
            <RootStack.Screen name="OnboardingFlow">
              {(props) => (
                <OnboardingNavigation 
                  {...props} 
                  onComplete={() => {
                    setShowOnboarding(false);
                    setOnboardingFlag(false);
                  }}
                />
              )}
            </RootStack.Screen>
          ) : (
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