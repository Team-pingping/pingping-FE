import { testGetHandler, testPostHandler, usersHandler } from "./handler/test";

/**
 * 핸들러 목록
 * - `testGetHandler`: 간단한 GET 요청 핸들러
 * - `testPostHandler`: 간단한 POST 요청 핸들러
 * - `usersHandler`: 사용자 정보를 반환하는 핸들러
 */

export const handlers = [testGetHandler, testPostHandler, usersHandler];
