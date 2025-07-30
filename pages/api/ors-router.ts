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

  const params = new URLSearchParams({
    api_key: process.env.HEIGIT_ORS_ACCESS_KEY!,
    start: coordinates[0].join(','),
    end: coordinates[coordinates.length - 1].join(','),
    waypoints: coordinates
      .slice(1, -1)
      .map((coord: [number, number]) => coord.join(','))
      .join('|'),
  });

  try {
    const orsRes = await fetch(
      `https://api.openrouteservice.org/v2/directions/driving-car?${params}`,
      {
        method: 'GET',
        headers: {
          Authorization: process.env.HEIGIT_ORS_ACCESS_KEY!,
          'Content-Type': 'application/json',
        },
      }
    );

    const data = await orsRes.json();
    res.status(orsRes.status).json(data);
  } catch (err) {
    res.status(500).json({ error: 'ORS proxy failed', details: err });
  }
}
