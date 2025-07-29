import { Marker, useMap } from 'react-leaflet';
import L from 'leaflet';
import { useEffect, useState } from 'react';
import type { CustomRoutingControlOptions, Parcel } from '../types';

const parseGeometry = (geometry: string): [number, number] | null => {
  const match = geometry.match(/POINT\((-?\d+\.?\d*) (-?\d+\.?\d*)\)/);
  if (!match) return null;
  const [, lng, lat] = match;
  return [parseFloat(lat), parseFloat(lng)];
};

const destinationIcon = L.icon({
  iconUrl: '/destination-marker.svg',
  iconSize: [24, 24],
});

const RoutingControl = ({ destination }: { destination: Parcel | null }) => {
  const map = useMap();
  const [control, setControl] = useState<L.Routing.Control | null>(null);
  const [destLatLng, setDestLatLng] = useState<L.LatLng | null>(null);

  useEffect(() => {
    if (!destination || !destination.geometry) return;

    const parsed = parseGeometry(destination.geometry);
    if (!parsed) return;

    const [lat, lng] = parsed;
    const dest = L.latLng(lat, lng);
    setDestLatLng(dest);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const userLatLng = L.latLng(
          position.coords.latitude,
          position.coords.longitude
        );

        if (control) {
          map.removeControl(control);
        }

        const newControl = L.Routing.control({
          waypoints: [userLatLng, dest],
          lineOptions: {
            addWaypoints: false,
            styles: [{ color: '#00f', weight: 2, opacity: 0.7 }],
            extendToWaypoints: true,
            missingRouteTolerance: 1,
          },
          routeWhileDragging: false,
          draggableWaypoints: false,
          createMarker: () => null, // Disable default markers
          show: true,
        } as CustomRoutingControlOptions).addTo(map);

        setControl(newControl);
      },
      (error) => console.error('Geolocation error:', error),
      { enableHighAccuracy: true }
    );
  }, [destination, map]);

  // Render the marker only after coordinates are available
  return destLatLng ? (
    <Marker position={destLatLng} icon={destinationIcon} />
  ) : null;
};

export default RoutingControl;
