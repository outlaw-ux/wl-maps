import { Icon } from 'leaflet';

export const generateUserIcon = (isNavigating: boolean = false) =>
  new Icon({
    iconUrl: isNavigating
      ? '/property-marker-navigating.svg'
      : '/property-marker.svg', // URL to the icon image
    iconSize: [24, 24], // size of the icon
  });

export const userIcon = generateUserIcon();
