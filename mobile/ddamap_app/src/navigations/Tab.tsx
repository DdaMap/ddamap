import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome6 } from '@react-native-vector-icons/fontawesome6';
import Homescreen from '../screens/Homescreen'; // Adjust the import path as necessary
import Mapscreen from '../screens/Mapscreen';
const Tab = createBottomTabNavigator();
const TabNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: true,
        tabBarIcon: ({ color, size }) => {
          let name = '';
          let classic = '';
          if (route.name === 'Home') {
            name = 'house';
            classic = 'solid';
          } else if (route.name === 'Map') {
            name = 'map';
            classic = 'solid';
          } else {
            name = 'question';
            classic = 'solid';
          }
          return (
            <FontAwesome6
              name={name}
              size={size}
              color={color}
              iconStyle={classic}
            />
          );
        },
      })}
    >
      <Tab.Screen name="Home" component={Homescreen} />
      <Tab.Screen name="Map" component={Mapscreen} options={{ title: 'Map' }} />
    </Tab.Navigator>
  );
};

export default TabNavigation;
