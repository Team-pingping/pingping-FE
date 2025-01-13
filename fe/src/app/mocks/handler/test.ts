import { HttpResponse, http } from "msw";

// 간단한 GET 테스트
export const testGetHandler = http.get("/api/test", () => {
  return HttpResponse.json(
    { message: "Test successful!" },
    { status: 200, headers: { "Content-Type": "application/json" } }
  );
});

// 간단한 POST 테스트
export const testPostHandler = http.post("/api/test", async ({ request }) => {
  const data = await request.json();
  return HttpResponse.json(
    { receivedData: data },
    { status: 200, headers: { "Content-Type": "application/json" } }
  );
});

// 테스트용 다른 GET 요청
export const usersHandler = http.get("/users", () => {
  return HttpResponse.json(
    { users: [{ id: 1, name: "seohee" }] },
    { status: 200, headers: { "Content-Type": "application/json" } }
  );
});
