import { Text, View } from 'react-native';
import React from 'react';
import Map from './component/Map';
import { SafeAreaView } from 'react-native-safe-area-context';

const Mapscreen = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Text>Map Screen</Text>
      <Map />
    </SafeAreaView>
  );
};

export default Mapscreen;
