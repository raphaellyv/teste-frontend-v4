import { format } from "date-fns";

export default function StateHistoryTable({ stateHistory }) {
  const formatDate = (dateTime) => format(dateTime, 'dd/MM/yyyy');
  const formatTime = (dateTime) => format(dateTime, 'pp');

  return (
    <table className="w-full">
      <thead>
        <tr>
          <th>Data</th>
          <th>Hora</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        { stateHistory.map((state) => (
          <tr key={state.dateTime}>
            <td>{formatDate(state.dateTime)}</td>
            <td>{formatTime(state.dateTime)}</td>
            <td>{state.name}</td>
          </tr>
          ))
        }
      </tbody>
    </table> 
  )
}