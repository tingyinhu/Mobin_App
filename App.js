import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaProvider } from "react-native-safe-area-context"; // ✅ 加這行

import { Icon } from "@rneui/themed";

import HomeScreen from './screens/HomeScreen';
import DonutScreen from "./screens/DonutScreen";
import OrderScreen from "./screens/OrderScreen";
import DonutDetailScreen from "./screens/DonutDetailScreen";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Donuts"
        component={DonutScreen}
        options={{
          tabBarIcon: () => <Icon type="font-awesome-5" name="clipboard-list" />,
        }}
      />
      <Tab.Screen
        name="Orders"
        component={OrderScreen}
        options={{
          tabBarIcon: () => <Icon type="font-awesome-5" name="shopping-cart" />,
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="HomeTabs"
            component={TabNavigator}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="DonutDetail"
            component={DonutDetailScreen}
            options={{ title: "Donut Detail" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
