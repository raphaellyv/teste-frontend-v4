import getData from "./getDataFromFile";

const getStateData = async function (stateHistoryFile) {
  const stateHistory = await getData(stateHistoryFile);
  const equipmentStates = await getData('/src/data/equipmentState.json');

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

export default getStateData;