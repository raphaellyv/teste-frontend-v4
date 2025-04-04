import { CircleMarker, Popup } from 'react-leaflet';
import { useState, useEffect } from "react";
import { getData } from '@/lib/getData';

export default function MarkersList() {
  const [lastPositions, setLastPositions] = useState(null);

  useEffect(() => {
    getData()
      .then((result) => {
        setLastPositions(result);
      });
  }, [])

  return (
    lastPositions && (
      lastPositions.map((position) => (
        <CircleMarker
          key={position.equipmentId}
          center={[position.lastLat, position.lastLon]}
          color="red"
          fillColor="#f03"
          radius={20}
        >
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </CircleMarker>
      ))
      )
  )
}