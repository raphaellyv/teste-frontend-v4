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

  const lastStates = stateHistory.map((history) => {
    const states = history.states;
    const lastStateId = states[states.length - 1].equipmentStateId;
    const lastState = equipmentStates.find((state) => state.id === lastStateId);

    const formattedStates = states.map((state) => {
      const equipmentState = equipmentStates.find((stateInfo) => stateInfo.id === state.equipmentStateId);
      
      return (
        {
          date: state.date,
          name: equipmentState.name,
        }
      )
    })

    return(
      { 
        equipmentId: history.equipmentId,
        lastState: {
         stateId: lastState.id,
        name: lastState.name,
        color: lastState.color, 
        },
        states: formattedStates,
      }
    )
  });

  return lastStates;
}

export async function getEquipmentData() {
  const positionData = await getPositionData();
  const stateData = await getStateData();

  const equipmentData = positionData.map((position) => {
    const equipmentState = stateData.find((state) => state.equipmentId === position.equipmentId);

    return(
      {
        lastPosition: position,
        lastState: equipmentState.lastState,
        stateHistory: equipmentState.states,
      }
    )
  });

  return equipmentData;
}

