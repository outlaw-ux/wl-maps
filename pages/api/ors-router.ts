import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { coordinates } = req.body;

  if (
    !Array.isArray(coordinates) ||
    !coordinates.every(
      (coord) =>
        Array.isArray(coord) &&
        coord.length === 2 &&
        coord.every((num) => typeof num === 'number')
    )
  ) {
    return res.status(400).json({
      error: 'Invalid coordinates. Must be an array of [number, number] pairs.',
    });
  }

  if (!process.env.HEIGIT_ORS_ACCESS_KEY) {
    return res.status(500).json({
      error: 'Server configuration error: HEIGIT_ORS_ACCESS_KEY is not set.',
    });
  }

  try {
    const orsRes = await fetch(
      'https://api.openrouteservice.org/v2/directions/driving-car/geojson',
      {
        method: 'POST',
        headers: {
          Authorization: process.env.HEIGIT_ORS_ACCESS_KEY,
          'Content-Type': 'application/json',
          Accept:
            'application/json, application/geo+json, application/gpx+xml, img/png; charset=utf-8',
        },

        body: JSON.stringify({
          coordinates,
        }),
      }
    );

    const data = await orsRes.json();
    res.status(orsRes.status).json(data);
  } catch (err) {
    res.status(500).json({ error: 'ORS proxy failed', details: err });
  }
}
