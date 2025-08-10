import { Text, View } from 'react-native';
import React, { useState } from 'react';
import Map from '../component/Map';
import { Station } from '../types/Station';
import StationMarker from '../component/StationMarker';
import styled from 'styled-components/native';
import { SafeAreaView } from 'react-native-safe-area-context';
const StyledButton = styled.TouchableOpacity`
  position: absolute;
  bottom: 90px;
  right: 20px;
  background-color: #007bff;
  padding: 12px 20px;
  border-radius: 8px;
`;

const data = [
  { id: 1, latitude: 37.56825, longitude: 126.8453222222, title: 'station1' }, // 예시 좌표
  { id: 2, latitude: 37.57025, longitude: 126.8453222222, title: 'station2' }, // 예시 좌표
];
const Mapscreen = () => {
  const [stations, setStations] = useState<Station[]>([]);
  const [showStations, setShowStations] = useState(false);
  const _getStations = () => {
    // 대여소 가져오기 api 호출
    // 기존의 좌표를 지우고 넣어야 되는데.
    setStations([...data]);
    setShowStations(showStations => !showStations);
  };
  return (
    <View style={{ flex: 1 }}>
      <Map>{showStations && <StationMarker stations={stations} />}</Map>
      <StyledButton onPress={() => _getStations()}>
        <Text style={{ color: 'black', fontSize: 16, fontWeight: 'bold' }}>
          대여소 불러오기
        </Text>
      </StyledButton>
    </View>
  );
};

export default Mapscreen;
