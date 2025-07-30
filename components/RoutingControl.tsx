import { Marker, useMap } from 'react-leaflet';
import L from 'leaflet';
import { useEffect, useState } from 'react';
import type { CustomRoutingControlOptions, Parcel } from '../types';
import { bounds, fallbackStart } from '../constants';
import { createORSRouter } from '../utils/createORSRouter';

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

  const detour = L.latLng(38.10640828782876, -91.06830100257955); // known detour to force reroute
  const parsedDestination = destination
    ? parseGeometry(destination.geometry)
    : null;
  const [lat, lng] = parsedDestination ? parsedDestination : [];
  const destLatLng = lat && lng ? L.latLng(lat, lng) : null;

  useEffect(() => {
    if (!parsedDestination) {
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

        const restrictedBounds = L.latLngBounds([
          [38.111228, -91.050621],
          [38.105008, -91.051716],
        ]);

        // cleanup existing control
        if (control) {
          map.removeControl(control);
        }

        let rerouted = false;

        const routingControl = L.Routing.control({
          waypoints: [startPoint, destLatLng],
          router: createORSRouter('/api/ors-router', {
            lot: destination?.lots?.join(', ') || '',
            block: destination?.block,
            section: destination?.section,
          }),
          lineOptions: {
            addWaypoints: false,
            styles: [{ color: '#00f', weight: 2, opacity: 0.7 }],
            extendToWaypoints: true,
            missingRouteTolerance: 1,
          },
          routeWhileDragging: false,
          draggableWaypoints: false,
          createMarker: () => null,
          formatter: new L.Routing.Formatter({
            units: 'imperial',
            distanceTemplate: '{value} {unit}',
          }),
          show: true,
        } as CustomRoutingControlOptions)
          .on('routesfound', (e) => {
            if (rerouted) return; // prevent infinite loop
            const crossesRestricted = e.routes[0].coordinates.some((coord) =>
              restrictedBounds.contains([coord.lat, coord.lng])
            );

            if (crossesRestricted) {
              rerouted = true;

              const waypoints = [
                L.Routing.waypoint(startPoint),
                L.Routing.waypoint(detour),
                L.Routing.waypoint(destLatLng),
              ];

              // Replace waypoints with detour included
              routingControl.setWaypoints(waypoints);
            }
          })
          .addTo(map);

        setControl(routingControl);
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
