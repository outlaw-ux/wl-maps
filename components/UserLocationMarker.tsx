import { useEffect, useState } from 'react';
import { Marker, useMap } from 'react-leaflet';
import L from 'leaflet';

// Optional: Custom blue dot icon to look like a location marker
const userIcon = L.icon({
  iconUrl: '/property-marker.svg', // or use your own
  iconSize: [25, 24],
});

const UserLocationMarker = () => {
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

  return position ? <Marker position={position} icon={userIcon} /> : null;
};

export default UserLocationMarker;
