import L from 'leaflet';

const createLatLng = (lat: number, lng: number): L.LatLng => {
  return L.latLng(lat, lng);
};

export default createLatLng;
