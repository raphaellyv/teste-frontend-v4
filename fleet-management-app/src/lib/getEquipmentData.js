"use server"

import getPositionData from "./getPositionData";
import getStateData from "./getStateData";

export default async function getEquipmentData() {
  const positionData = await getPositionData();
  const stateData = await getStateData();

  const equipmentData = positionData.map((position) => {
    const equipmentState = stateData.find((state) => state.equipmentId === position.equipmentId);

    return (
      {
        lastPosition: position,
        lastState: equipmentState.lastState,
        stateHistory: equipmentState.stateHistory,
      }
    )
  });

  return equipmentData;
}

