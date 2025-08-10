import React, { useState, useRef, useCallback, useEffect } from 'react';
import { View, StyleSheet, PermissionsAndroid, Platform } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import styled from 'styled-components/native';
import { Region } from '../types/map';
import { useFocusEffect } from '@react-navigation/native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});

const CoodinateBox = styled.View`
  position: absolute;
  top: 10px;
  left: 10px;
  background-color: white;
  padding: 10px;
  border-radius: 5px;
  elevation: 3;
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

interface MapProps {
  children?: React.ReactNode;
}

const Map = ({ children }: MapProps) => {
  const [region, setRegion] = useState<Region>();
  const mapRef = useRef<MapView>(null);
  const [isMapReady, setIsMapReady] = useState(false); // 맵 준비 상태

  function getLocation() {
    const hasPermission = requestLocationPermission();
    if (!hasPermission) {
      console.warn('위치 권한이 거부됨');
      return;
    }

    Geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        const newRegion = {
          latitude,
          longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        };
        setRegion(newRegion);
        console.log('현재 위치 갱신');
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
    // console.log('useEffect 실행');
    setIsMapReady(true);
    mapRef.current?.animateToRegion(region, 500);
  }, [region]);
  // 탭 포커스 시 지도를 TARGET_REGION으로 이동

  useFocusEffect(
    useCallback(() => {
      console.log('=== 탭 포커스됨 ===');
      getLocation();
      setIsMapReady(false);
    }, []),
  );

  return (
    <View style={styles.container}>
      {isMapReady && (
        <MapView
          ref={mapRef}
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          initialRegion={region}
          showsUserLocation
        >
          {children}
        </MapView>
      )}
      <CoodinateBox>
        <TextBox>위도: {region?.latitude}</TextBox>
        <TextBox>경도: {region?.longitude}</TextBox>
        <TextBox>맵 상태: {isMapReady ? '준비됨' : '로딩중'}</TextBox>
      </CoodinateBox>
    </View>
  );
};

export default Map;
