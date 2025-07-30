import L from 'leaflet';

export function createORSRouter(apiRouteUrl: string): L.Routing.IRouter {
  return {
    route(waypoints, callback, context) {
      const coordinates = waypoints.map((wp) => [wp.latLng.lng, wp.latLng.lat]);
      console.log({ waypoints, context, coordinates });

      fetch(apiRouteUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ coordinates }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log('ORS response:', data);
          const geometry = data.features[0].geometry.coordinates;
          const latLngs = geometry.map(([lng, lat]: number[]) =>
            L.latLng(lat, lng)
          );

          callback.call(context, null, [
            {
              name: 'ORS Route',
              coordinates: latLngs,
              instructions: [],
              summary: {
                totalDistance: data.features[0].properties.segments[0].distance,
                totalTime: data.features[0].properties.segments[0].duration,
              },
              inputWaypoints: waypoints,
              actualWaypoints: waypoints,
            },
          ]);
        })
        .catch((err) => callback.call(context, err));
    },
  };
}
