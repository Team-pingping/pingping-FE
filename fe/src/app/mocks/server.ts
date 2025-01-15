import { setupServer } from "msw/node";
import { handlers } from "./handlers";

// 서버 초기화
export const server = setupServer(...handlers);
