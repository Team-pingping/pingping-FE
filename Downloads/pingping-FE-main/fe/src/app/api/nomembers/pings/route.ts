// pages/api/nonmembers/pings.ts
import { NextRequest, NextResponse } from "next/server";

const BASE_API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const uuid = searchParams.get("uuid");

  if (!uuid) {
    return NextResponse.json({ error: "UUID is required" }, { status: 400 });
  }

  try {
    const response = await fetch(
      `${BASE_API_URL}/nonmembers/pings?uuid=${uuid}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch pings data: ${response.statusText}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching pings data:", error);
    return NextResponse.json(
      { message: "Failed to fetch pings data" },
      { status: 500 }
    );
  }
}
