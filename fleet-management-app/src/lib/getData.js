"use server"
import { promises as fs } from "fs";

export async function getPositionData() {
  const positionHistoryFile = await fs.readFile(process.cwd() + '/src/data/equipmentPositionHistory.json', 'utf8');
  const positionHistory = JSON.parse(positionHistoryFile);

  const lastPositions = positionHistory.map((history) => {
    const positions = history.positions;
    const lastPosition = positions[positions.length - 1];

    return(
      { equipmentId: history.equipmentId,
        lastLat: lastPosition.lat,
        lastLon: lastPosition.lon,
      }
    )
  });

  return lastPositions;
}

export async function getStateData() {
  const stateHistoryFile = await fs.readFile(process.cwd() + '/src/data/equipmentStateHistory.json', 'utf8');
  const stateHistory = JSON.parse(stateHistoryFile);

  const equipmentStatesFile = await fs.readFile(process.cwd() + '/src/data/equipmentState.json', 'utf8');
  const equipmentStates = JSON.parse(equipmentStatesFile);

  const statesData = stateHistory.map((history) => {
    const states = history.states;

    const formattedStates = states.map((state) => {
      const equipmentState = equipmentStates.find((stateInfo) => stateInfo.id === state.equipmentStateId);

      return (
        {
          dateTime: state.date,
          name: equipmentState.name,
          color: equipmentState.color,
        }
      )
    })

    return (
      { 
        equipmentId: history.equipmentId,
        lastState: formattedStates[formattedStates.length - 1],
        stateHistory: formattedStates,
      }
    )
  });

  return statesData;
}

export async function getEquipmentData() {
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

