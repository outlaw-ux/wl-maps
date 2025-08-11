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

  if (!process.env.STADIA_API_KEY) {
    return res.status(500).json({
      error: 'Server configuration error: STADIA_API_KEY is not set.',
    });
  }

  try {
    const orsRes = await fetch(
      `https://api.stadiamaps.com/route/v1?api_key=${process.env.STADIA_API_KEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept:
            'application/json, application/geo+json, application/gpx+xml, img/png; charset=utf-8',
        },

        body: JSON.stringify({
          locations: [
            {
              lon: coordinates[0][0],
              lat: coordinates[0][1],
              type: 'break',
            },
            {
              lon: coordinates[coordinates.length - 1][0],
              lat: coordinates[coordinates.length - 1][1],
              type: 'break',
            },
          ],
          costing: 'auto',
          units: 'miles',
          instructions: true,
          format: 'osrm',
          steps: true,
        }),
      }
    );

    const data = await orsRes.json();
    console.log('ORS Response:', data);
    res.status(orsRes.status).json(data);
  } catch (err) {
    res.status(500).json({ error: 'ORS proxy failed', details: err });
  }
}
