import { useEffect, useState } from 'react';
import { Marker, useMap } from 'react-leaflet';
import L from 'leaflet';
import { generateUserIcon } from './Icons';
import { useDestinationContext } from '../contexts/DestinationProvider';
import { bounds, fallbackStart } from '../constants';

const UserLocationMarker = () => {
  const { destination, setStartAtGate } = useDestinationContext();
  const navigating = !!destination;
  const [position, setPosition] = useState<L.LatLng | null>(null);
  const map = useMap();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        let latlng = L.latLng(latitude, longitude);
        if (!bounds.contains(latlng)) {
          latlng = fallbackStart;
          setStartAtGate(true);
        }
        setPosition(latlng);

        map.setView(latlng, map.getZoom());
      },
      (err) => console.error('Geolocation error:', err),
      { enableHighAccuracy: true }
    );
  }, [map]);

  const userIcon = generateUserIcon(navigating);

  // <Dialog
  //   open={open}
  //   onClose={handleClose}
  //   aria-labelledby="alert-dialog-title"
  //   aria-describedby="alert-dialog-description"
  // >
  //   <DialogTitle id="alert-dialog-title">
  //     {"Use Google's location service?"}
  //   </DialogTitle>
  //   <DialogContent>
  //     <DialogContentText id="alert-dialog-description">
  //       Let Google help apps determine location. This means sending anonymous
  //       location data to Google, even when no apps are running.
  //     </DialogContentText>
  //   </DialogContent>
  //   <DialogActions>
  //     <Button onClick={handleClose}>Disagree</Button>
  //     <Button onClick={handleClose} autoFocus>
  //       Agree
  //     </Button>
  //   </DialogActions>
  // </Dialog>

  return position ? <Marker position={position} icon={userIcon} /> : null;
};

export default UserLocationMarker;
