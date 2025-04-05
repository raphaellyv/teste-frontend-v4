"use server"

import { promises as fs } from "fs";

export default async function getPositionData() {
  const positionHistoryFile = await fs.readFile(process.cwd() + '/src/data/equipmentPositionHistory.json', 'utf8');
  const positionHistory = JSON.parse(positionHistoryFile);

  const lastPositions = positionHistory.map((history) => {
    const positions = history.positions;
    const lastPosition = positions[positions.length - 1];

    return (
      { equipmentId: history.equipmentId,
        lastLat: lastPosition.lat,
        lastLon: lastPosition.lon,
      }
    )
  });

  return lastPositions;
}
