export async function fetchPings(uuid: string) {
  try {
    const response = await fetch(`/api/nonmembers/pings?uuid=${uuid}`);

    if (!response.ok) {
      throw new Error(`Failed to fetch pings: ${response.status}`);
    }

    const data = await response.json();
    return data; // { eventName, px, py, nonMembers, pings }
  } catch (error) {
    console.error("Error loading pings:", error);
    throw error;
  }
}
