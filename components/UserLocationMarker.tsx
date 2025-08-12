import { useEffect, useState } from 'react';
import { Marker, useMap } from 'react-leaflet';
import L from 'leaflet';
import { generateUserIcon } from './Icons';
import { useDestinationContext } from '../contexts/DestinationProvider';

const UserLocationMarker = () => {
  const { destination } = useDestinationContext();
  const navigating = !!destination;
  const [position, setPosition] = useState<L.LatLng | null>(null);
  const map = useMap();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        const latlng = L.latLng(latitude, longitude);
        setPosition(latlng);
        map.setView(latlng, map.getZoom());
      },
      (err) => console.error('Geolocation error:', err),
      { enableHighAccuracy: true }
    );
  }, [map]);

  const userIcon = generateUserIcon(navigating);

  return position ? <Marker position={position} icon={userIcon} /> : null;
};

export default UserLocationMarker;
