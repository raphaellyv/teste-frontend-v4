"use server"
import { promises as fs } from "fs";

export async function getData() {
  const positionHistoryFile = await fs.readFile(process.cwd() + '/src/data/equipmentPositionHistory.json', 'utf8');
  const positionHistory = JSON.parse(positionHistoryFile);

  const lastPositions = positionHistory.map((history) => {
    const lastPosition = history.positions.pop();

    return(
      { equipmentId: history.equipmentId,
        lastLat: lastPosition.lat,
        lastLon: lastPosition.lon,
      }
    )
  });

  return lastPositions;
}