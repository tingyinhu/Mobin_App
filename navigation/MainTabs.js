import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon } from '@rneui/themed';

// Import main tab screens
import DonutScreen from '../screens/DonutScreen';
import OrderScreen from '../screens/OrderScreen';
import UserSettingScreen from '../screens/UserSettingScreen';

// Create the bottom tab navigator
const Tab = createBottomTabNavigator();

const MainTabs = () => {
  return (
    <Tab.Navigator>
      
      {/* Donuts tab */}
      <Tab.Screen
        name="Donuts"
        component={DonutScreen}
        options={{
          tabBarIcon: () => <Icon name="donut-small" type="material" />,
        }}
      />

      {/* Orders tab */}
      <Tab.Screen
        name="Orders"
        component={OrderScreen}
        options={{
          tabBarIcon: () => <Icon name="shopping-cart" type="font-awesome-5" />,
        }}
      />

      {/* Profile tab */}
      <Tab.Screen
        name="Profile"
        component={UserSettingScreen}
        options={{
          tabBarIcon: () => <Icon name="user" type="font-awesome-5" />,
        }}
      />
    </Tab.Navigator>
  );
};

export default MainTabs;
