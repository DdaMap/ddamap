import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Mapscreen from '../screens/Mapscreen';

const Stack = createNativeStackNavigator()

const StackNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Map" component={Mapscreen} />
    </Stack.Navigator>
  )
}

export default StackNavigation