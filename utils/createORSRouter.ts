import polyline from '@mapbox/polyline';
import L from 'leaflet';

const getIconName = (
  maneuverType: string,
  maneuverModifier: string
): string => {
  if (maneuverType === 'depart') {
    return 'StartAt';
  }
  if (maneuverType === 'arrive') {
    return 'DestinationReached';
  }
  if (maneuverType === 'turn') {
    switch (maneuverModifier) {
      case 'slight left':
        return 'SlightLeft';
      case 'sharp left':
        return 'SharpLeft';
      case 'left':
        return 'Left';
      case 'sharp right':
        return 'SharpRight';
      case 'slight right':
        return 'SlightRight';
      case 'right':
        return 'Right';
      case 'uturn':
        return 'TurnAround';
      case 'straight':
      default:
        return 'Straight';
    }
  }
  // #1"new name"
  if (
    maneuverType === 'new name' ||
    maneuverType === 'continue' ||
    maneuverType === 'use lane'
  ) {
    return 'Straight';
  }
  // #4"merge"
  if (
    maneuverType === 'merge' ||
    maneuverType === 'ramp' ||
    maneuverType === 'on ramp'
  ) {
    return 'EnterAgainstAllowedDirection';
  }
  if (maneuverType === 'off ramp' || maneuverType === 'fork') {
    return 'LeaveAgainstAllowedDirection';
  }
  if (
    maneuverType === 'roundabout' ||
    maneuverType === 'rotary' ||
    maneuverType === 'roundabout turn' ||
    maneuverType === 'exit rotary' ||
    maneuverType === 'exit roundabout'
  ) {
    return 'Roundabout';
  }

  // #9"end of road"
  // #15"notification"
  return 'Straight';
};

export function createORSRouter(
  apiRouteUrl: string,
  {
    lot,
    block,
    section,
  }: { readonly lot: string; readonly block: string; readonly section: string }
): L.Routing.IRouter {
  return {
    route(waypoints, callback, context) {
      const coordinates = waypoints.map((wp) => [wp.latLng.lng, wp.latLng.lat]);

      fetch(apiRouteUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ coordinates }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (
            data &&
            data.routes.length > 0 &&
            data.routes[0].geometry &&
            data.routes[0].legs &&
            data.routes[0].legs.length > 0 &&
            data.routes[0].legs[0].steps &&
            Array.isArray(data.routes[0].legs[0].steps) &&
            data.routes[0].legs[0].steps.length > 0
          ) {
            const geometry = polyline.toGeoJSON(data.routes[0].geometry, 6);

            const coordinates = geometry.coordinates.map(
              (coord) => [coord[1], coord[0]] // Convert to [lat, lng]
            );

            callback.call(context, null, [
              {
                name: `Navigating to: ${lot}-${block}-${section}`,
                coordinates,
                instructions: data.routes[0].legs[0].steps.map((step) => {
                  const icon = getIconName(
                    step.maneuver.type,
                    step.maneuver.modifier
                  );
                  console.log('type', icon);
                  return {
                    road: step.name,
                    type: icon,
                    direction: 'E',
                    exit: undefined,
                    text: step.maneuver.instruction,
                    distance: step.distance,
                    time: step.duration,
                  };
                }),
                summary: {
                  totalDistance: data.routes[0].distance,
                  totalTime: data.routes[0].duration,
                },
                inputWaypoints: waypoints,
                actualWaypoints: waypoints,
              },
            ]);
          } else {
            callback.call(context, new Error('Invalid API response structure'));
          }
        })
        .catch((err) => callback.call(context, err));
    },
  };
}
