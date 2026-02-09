// Helper function to generate route history for a truck
export function generateRouteHistory(
  startLat: number,
  startLng: number,
  currentLat: number,
  currentLng: number,
  points: number = 20,
) {
  const route = [];
  const now = new Date();

  for (let i = 0; i < points; i++) {
    // Linear interpolation from start to current position with some randomness
    const ratio = i / (points - 1);
    const lat =
      startLat +
      (currentLat - startLat) * ratio +
      (Math.random() - 0.5) * 0.002;
    const lng =
      startLng +
      (currentLng - startLng) * ratio +
      (Math.random() - 0.5) * 0.002;

    // Distribute timestamps throughout the day
    const timeOffset = 8 * 60 * 60 * 1000 * ratio; // 8 hours spread
    const timestamp = new Date(
      now.getTime() - (8 * 60 * 60 * 1000 - timeOffset),
    );

    route.push({
      latitude: lat,
      longitude: lng,
      timestamp: timestamp,
    });
  }

  return route;
}
