import { Marker, useMap } from 'react-leaflet';
import L from 'leaflet';
import { useEffect, useState } from 'react';
import type { CustomRoutingControlOptions } from '../types';
import { bounds, fallbackStart } from '../constants';
import { createORSRouter } from '../utils/createORSRouter';
import { useDestinationContext } from '../contexts/DestinationProvider';
import RoutingFormatter from '../utils/RoutingFormatter';

const destinationIcon = L.icon({
  iconUrl: '/destination-marker.svg',
  iconSize: [24, 24],
});

const RoutingControl = () => {
  const { destination, destinationTitle } = useDestinationContext();
  const map = useMap();
  const [control, setControl] = useState<L.Routing.Control | null>(null);

  useEffect(() => {
    if (!destination) {
      if (control) {
        map.removeControl(control);
        setControl(null);
      }
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const userLatLng = L.latLng(
          position.coords.latitude,
          position.coords.longitude
        );
        const inBounds = L.latLngBounds(
          bounds as [L.LatLngExpression, L.LatLngExpression]
        ).contains(userLatLng);
        const startPoint = inBounds ? userLatLng : fallbackStart;

        // cleanup existing control
        if (control) {
          map.removeControl(control);
        }

        const routingControl = L.Routing.control({
          waypoints: [startPoint, destination],
          router: createORSRouter('/api/ors-router', destinationTitle),
          lineOptions: {
            addWaypoints: false,
            styles: [{ color: '#00f', weight: 2, opacity: 0.7 }],
            extendToWaypoints: true,
            missingRouteTolerance: 1,
          },
          routeWhileDragging: false,
          draggableWaypoints: false,
          createMarker: () => null,
          formatter: new RoutingFormatter({
            units: 'imperial',
            distanceTemplate: '{value} {unit}',
          }),
          show: true,
        } as CustomRoutingControlOptions).addTo(map);

        setControl(routingControl);
      },
      (error) => console.error('Geolocation error:', error),
      { enableHighAccuracy: true }
    );
  }, [destination, map]);

  // Render the marker only after coordinates are available
  return destination ? (
    <Marker position={destination} icon={destinationIcon} />
  ) : null;
};

export default RoutingControl;
