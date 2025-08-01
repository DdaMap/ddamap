import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  PermissionsAndroid,
  Platform,
  Text,
} from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import styled from 'styled-components/native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    // ...StyleSheet.absoluteFillObject,
    flex: 1,
  },
});
type LatLng = {
  latitude: number;
  longitude: number;
};

type Point = {
  x: number;
  y: number;
};

type MapEvent<T> = {
  nativeEvent: T;
};
const CoodinateBox = styled.View`
  top: 10px;
  left: 10px;
  background-color: white;
  padding: 10px;
  border-radius: 5px;
  elevation: 3; /* 안드로이드에서 그림자 효과 */
`;

const TextBox = styled.Text`
  font-size: 16px;
  color: black;
`;

async function requestLocationPermission() {
  if (Platform.OS === 'android') {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );
    return granted === PermissionsAndroid.RESULTS.GRANTED;
  }
  return true;
}

type Region = {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
};

const Map = () => {
  // Region 설정 하기.

  const [region, setRegion] = useState<Region | null>(null);
  // 대여소
  const [stations, setStations] = useState<LatLng[]>([]);

  const handleMapPress = (
    event: MapEvent<{ coordinate: LatLng; position: Point }>,
  ) => {
    const { coordinate, position } = event.nativeEvent;
    setStations([coordinate]);
  };
  async function getLocation() {
    const hasPermission = await requestLocationPermission();
    if (!hasPermission) {
      console.warn('위치 권한이 거부됨');
      return;
    }

    Geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        // 여기서 위치 정보를 사용하여 필요한 작업을 수행할 수 있습니다.

        // 예: 지도 중심 설정, 위치 표시 등
        setRegion({
          latitude,
          longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        });
      },
      error => {
        console.error('❌ 위치 에러:', error);
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 1000,
      },
    );
  }
  useEffect(() => {
    getLocation();
  }, []);

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={region}
        onPress={handleMapPress}
      >
        <Marker
          coordinate={{ latitude: 37.56825, longitude: 126.8453222222 }}
          title={'Googleplex'}
          description={'Google Headquarters'}
        />
      </MapView>
      <CoodinateBox>
        <TextBox>위도: {stations.latitude}</TextBox>
        <TextBox>경도: {region?.longitude}</TextBox>
      </CoodinateBox>
    </View>
  );
};

export default Map;
