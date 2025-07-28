import * as React from "react";
import { MapContainer, TileLayer, ZoomControl } from "react-leaflet";
import { Box } from "@mui/material";

export default function RealMap() {
  return (
    <Box sx={{ height: "100%", width: "100%" }}>
      <MapContainer
        attributionControl={false}
        center={[38.11288, -91.06786]}
        zoom={14}
        scrollWheelZoom={true}
        minZoom={14}
        maxZoom={19}
        zoomControl={false}
        style={{ height: "100%", width: "100%" }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <ZoomControl position="bottomright" />
      </MapContainer>
    </Box>
  );
}
