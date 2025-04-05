// import { CircleMarker, Popup, Tooltip } from 'react-leaflet';
import { useState, useEffect } from "react";
import { getEquipmentData } from '@/lib/getData';
import CustomMarker from "./CustomMarker";

export default function MarkersList() {
  const [equipmentData, setEquipmentData] = useState(null);

  useEffect(() => {
    getEquipmentData()
      .then((result) => {
        setEquipmentData(result);
        console.log(result);
      });
  }, [])

  return (
    equipmentData && (
      equipmentData.map(({lastPosition, lastState, stateHistory}) => (
        <div key={lastPosition.equipmentId}>
          <CustomMarker
            lastPosition={lastPosition}
            lastState={lastState}
            stateHistory={stateHistory}
          />
        </div>
      ))
      )
  )
}