export const parseGeometry = (geometry: string): [number, number] | null => {
  const match = geometry.match(/POINT\((-?\d+\.?\d*) (-?\d+\.?\d*)\)/);
  if (!match) return null;
  const [, lng, lat] = match;
  return [parseFloat(lat), parseFloat(lng)];
};
