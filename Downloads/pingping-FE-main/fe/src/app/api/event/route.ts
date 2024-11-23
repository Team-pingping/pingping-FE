// pages/api/event.ts
import { NextResponse } from "next/server";

const BASE_API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function POST(req: Request) {
  try {
    const { neighborhood, px, py, eventName } = await req.json();

    const response = await fetch(`${BASE_API_URL}/event`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ neighborhood, px, py, eventName }),
    });

    if (!response.ok) {
      throw new Error(`Failed to create event: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { message: "Error creating event" },
      { status: 500 }
    );
  }
}
