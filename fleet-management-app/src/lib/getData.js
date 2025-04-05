"use server"
import { promises as fs } from "fs";
import { parseISO, format } from "date-fns";

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

    const formattedStates = states.map((state) => {
      const equipmentState = equipmentStates.find((stateInfo) => stateInfo.id === state.equipmentStateId);
      const dateTime = parseISO(state.date);
      const formattedDate = format(dateTime, 'dd/MM/yyyy');
      const formattedTime = format(dateTime, 'pp');

      return (
        {
          dateTime: dateTime,
          date: formattedDate,
          time: formattedTime,
          name: equipmentState.name,
          color: equipmentState.color,
        }
      )
    })

    return(
      { 
        equipmentId: history.equipmentId,
        lastState: formattedStates[formattedStates.length - 1],
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

