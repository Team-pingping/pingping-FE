import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const uuid = searchParams.get("uuid");

  if (!uuid) {
    return NextResponse.json(
      { error: "UUID parameter is missing" },
      { status: 400 }
    );
  }

  try {
    // 외부 API 요청 보내기
    const externalResponse = await fetch(`/api/nonmembers/pings?uuid=${uuid}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    // 외부 API 요청 실패 처리
    if (!externalResponse.ok) {
      return NextResponse.json(
        { error: "Failed to fetch data from external API" },
        { status: externalResponse.status }
      );
    }

    // JSON 데이터로 변환
    const data = await externalResponse.json();

    // 외부 API에서 받은 데이터를 클라이언트로 반환
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    // 오류 처리
    console.error("Error fetching data:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
