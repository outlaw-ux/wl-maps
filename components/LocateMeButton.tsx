import { useMap } from 'react-leaflet';
import { useEffect } from 'react';
import L from 'leaflet';

const LocateButton = () => {
  const map = useMap();

  useEffect(() => {
    const LocateControl = L.Control.extend({
      onAdd: function () {
        const button = L.DomUtil.create(
          'button',
          'leaflet-bar leaflet-control leaflet-control-custom'
        );
        button.innerHTML = '📍';
        button.title = 'Locate Me';
        button.style.width = '34px';
        button.style.height = '34px';
        button.style.cursor = 'pointer';
        button.style.fontSize = '20px';
        button.style.lineHeight = '30px';
        button.style.textAlign = 'center';
        button.style.backgroundColor = 'white';
        button.style.border = 'none';
        button.style.boxShadow = '0 0 5px rgba(0,0,0,0.3)';

        L.DomEvent.on(button, 'click', (e) => {
          e.stopPropagation();
          navigator.geolocation.getCurrentPosition(
            (pos) => {
              const lat = pos.coords.latitude;
              const lng = pos.coords.longitude;
              map.setView([lat, lng], map.getZoom(), { animate: true });
            },
            (err) => {
              console.error('Failed to locate:', err);
              alert('Could not retrieve your location.');
            },
            { enableHighAccuracy: true }
          );
        });

        return button;
      },
    });

    const control = new LocateControl({ position: 'bottomright' });
    control.addTo(map);

    return () => {
      control.remove();
    };
  }, [map]);

  return null;
};

export default LocateButton;
