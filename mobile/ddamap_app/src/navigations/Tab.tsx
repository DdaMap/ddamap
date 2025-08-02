import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MapScreen from '../screens/Mapscreen'; // Adjust the import path as necessary
import { FontAwesome6 } from '@react-native-vector-icons/fontawesome6';
const Tab = createBottomTabNavigator();
const TabNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size }) => {
          return <FontAwesome6 name="map" size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Map" component={MapScreen} />
    </Tab.Navigator>
  );
};

export default TabNavigation;
