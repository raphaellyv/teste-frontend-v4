"use server"

import { promises as fs } from "fs";

export default async function getStateData() {
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