//MainTabs.js
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon } from '@rneui/themed';
import DonutScreen from '../screens/DonutScreen';
import OrderScreen from '../screens/OrderScreen';

const Tab = createBottomTabNavigator();

const MainTabs = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Donuts"
        component={DonutScreen}
        options={{
          tabBarIcon: () => <Icon name="donut-small" type="material" />,
        }}
      />
      <Tab.Screen
        name="Orders"
        component={OrderScreen}
        options={{
          tabBarIcon: () => <Icon name="shopping-cart" type="font-awesome-5" />,
        }}
      />
    </Tab.Navigator>
  );
};

export default MainTabs;