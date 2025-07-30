import L from 'leaflet';

export function createORSRouter(apiRouteUrl: string): L.Routing.IRouter {
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
          const geometry = data.features[0].geometry.coordinates;
          const latLngs = geometry.map(([lng, lat]: number[]) =>
            L.latLng(lat, lng)
          );
          if (
            !data.features ||
            !Array.isArray(data.features) ||
            data.features.length === 0 ||
            !data.features[0].geometry ||
            !data.features[0].geometry.coordinates ||
            !data.features[0].properties ||
            !data.features[0].properties.segments ||
            !Array.isArray(data.features[0].properties.segments) ||
            data.features[0].properties.segments.length === 0
          ) {
            return callback.call(context, null, [
              {
                name: 'ORS Route',
                coordinates: latLngs,
                instructions: [],
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
