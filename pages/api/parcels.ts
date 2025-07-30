import { createClient } from '@supabase/supabase-js';
import type { NextApiRequest, NextApiResponse } from 'next';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { lot, block, section } = req.query;

  if (!lot || !block || !section) {
    return res
      .status(400)
      .json({ error: 'Missing lot, block, or section query params' });
  }

  const lotsString = String(Array.isArray(lot) ? lot[0] : lot).toUpperCase();

  const { data, error } = await supabase
    .from('parcels')
    .select('*')
    .contains('lots', [lotsString])
    .eq('block', block)
    .eq('section', section);

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  return res.status(200).json(data);
}
