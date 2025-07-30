import L from 'leaflet';

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
            data.features &&
            Array.isArray(data.features) &&
            data.features.length > 0 &&
            data.features[0].geometry &&
            data.features[0].geometry.coordinates &&
            data.features[0].properties &&
            data.features[0].properties.segments &&
            Array.isArray(data.features[0].properties.segments) &&
            data.features[0].properties.segments.length > 0
          ) {
            const geometry = data.features[0].geometry.coordinates;
            const latLngs = geometry.map(([lng, lat]: number[]) =>
              L.latLng(lat, lng)
            );

            return callback.call(context, null, [
              {
                name: `Navigating to: ${lot}-${block}-${section}`,
                coordinates: latLngs,
                instructions: data.features[0].properties.segments[0].steps.map(
                  (step) => ({
                    road: step.name,
                    type: step.type,
                    text: step.instruction,
                    distance: step.distance,
                    time: step.duration,
                  })
                ),
                summary: {
                  totalDistance:
                    data.features[0].properties.segments[0].distance,
                  totalTime: data.features[0].properties.segments[0].duration,
                },
                inputWaypoints: waypoints,
                actualWaypoints: waypoints,
              },
            ]);
          }
        })
        .catch((err) => callback.call(context, err));
    },
  };
}
