import { Filters } from '../types';

export const fetchLBS = async ({ lot, block, section }: Filters) => {
  const params = new URLSearchParams({ lot, block, section });
  const res = await fetch(`/api/parcels?${params.toString()}`);

  if (!res.ok) {
    throw new Error('Failed to fetch');
  }

  return await res.json();
};
