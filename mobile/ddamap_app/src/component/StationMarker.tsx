import React from 'react';
import { Station } from '../types/Station';
import { Marker } from 'react-native-maps';

interface StationProps {
  stations: Station[];
}

const StationMarker = ({ stations }: StationProps) => {
  return (
    <>
      {stations.map(marker => {
        return (
          <Marker
            key={marker.id}
            coordinate={{
              latitude: marker.latitude,
              longitude: marker.longitude,
            }}
            title={marker.title}
          />
        );
      })}
    </>
  );
};

export default StationMarker;
