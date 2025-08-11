import { Marker, useMap } from 'react-leaflet';
import L from 'leaflet';
import { useEffect, useState } from 'react';
import type { CustomRoutingControlOptions, Parcel } from '../types';
import { bounds, fallbackStart } from '../constants';
import { createORSRouter } from '../utils/createORSRouter';

class RoutingFormatter extends L.Routing.Formatter {
  constructor(options: L.Routing.FormatterOptions) {
    super(options);
  }

  getIconName(
    instr: L.Routing.IInstruction,
    i?: number
  ):
    | 'depart'
    | 'via'
    | 'enter-roundabout'
    | 'arrive'
    | 'continue'
    | 'bear-right'
    | 'turn-right'
    | 'sharp-right'
    | 'u-turn'
    | 'sharp-left'
    | 'turn-left'
    | 'bear-left' {
    switch (instr.type) {
      case 'StartAt':
        return 'depart';
      case 'DestinationReached':
        return 'arrive';
      case 'SlightLeft':
        return 'bear-left';
      case 'SharpLeft':
        return 'sharp-left';
      case 'Left':
        return 'turn-left';
      case 'SlightRight':
        return 'bear-right';
      case 'SharpRight':
        return 'sharp-right';
      case 'Right':
        return 'turn-right';
      case 'TurnAround':
        return 'u-turn';
      case 'Straight':
        return 'continue';
      case 'EnterAgainstAllowedDirection':
        return 'enter-roundabout';
      case 'LeaveAgainstAllowedDirection':
        return 'bear-right';
      case 'Roundabout':
        return 'enter-roundabout';
      default:
        // fall back to the default icons if you don't have a custom one
        return 'continue';
    }
  }
}

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

  // const detour = L.latLng(38.10640828782876, -91.06830100257955); // known detour to force reroute
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

        // cleanup existing control
        if (control) {
          map.removeControl(control);
        }

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
  return destLatLng ? (
    <Marker position={destLatLng} icon={destinationIcon} />
  ) : null;
};

export default RoutingControl;
