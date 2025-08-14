import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Import screens
import HomeScreen from '../screens/HomeScreen';
import DonutDetailScreen from '../screens/DonutDetailScreen';
import MainTabs from './MainTabs';

// Create a stack navigator
const Stack = createNativeStackNavigator();

const AppStack = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      
      {/* Home screen */}
      <Stack.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{ headerShown: false }} 
      />

      {/* Donut details page */}
      <Stack.Screen 
        name="DonutDetail" 
        component={DonutDetailScreen} 
      />

      {/* Bottom tab navigation */}
      <Stack.Screen 
        name="MainTabs" 
        component={MainTabs} 
        options={{ headerShown: false }} 
      />
    </Stack.Navigator>
  );
};

export default AppStack;
