import 'leaflet/dist/leaflet.css';

import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';

export default function Map() {
  return (
    <MapContainer className="h-screen w-full" center={[51.505, -0.09]} zoom={13} scrollWheelZoom={true}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <CircleMarker
        center={[51.505, -0.09]}
        color="red"
        fillColor="#f03"
        radius={20}
      >
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </CircleMarker>
    </MapContainer>
  )
}
