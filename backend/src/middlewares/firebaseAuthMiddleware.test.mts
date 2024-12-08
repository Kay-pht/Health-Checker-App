import { CustomAuthRequest } from "../interfaces/interfaces";
import { firebaseAuthMiddleware } from "./firebaseAuthMiddleware.mjs";
import { Response, NextFunction } from "express";
import { jest } from "@jest/globals";
import { DecodedIdToken } from "firebase-admin/auth";
import admin from "firebase-admin";

// Error case tests
describe("firebaseAuthMiddleware for error cases", () => {
  let req: CustomAuthRequest;
  let res: Response;
  let next: NextFunction;
  // initialize arguments for each test
  beforeEach(() => {
    req = { headers: {} } as CustomAuthRequest;
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;
    next = jest.fn();
  });
  afterEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  });

  it("should throw an error due to the lack of token in request", async () => {
    req.headers.authorization = "";
    await firebaseAuthMiddleware(req, res, next);
    expect(res.status).toHaveBeenCalledWith(403);
    expect(next).not.toHaveBeenCalled();
  });

  it("should throw an error due to the invalid token", async () => {
    req.headers.authorization = "Bearer:invalidToken";
    await firebaseAuthMiddleware(req, res, next);
    expect(res.status).toHaveBeenCalledWith(403);
    expect(next).not.toHaveBeenCalled();
  });

  it("should verify token successfully", async () => {});
});

// TODO: write test case
// Success case test
// 修正箇所: verifyIdTokenの型を関数のシグネチャに変更
// jest.mock("firebase-admin", () => ({
//   auth: () => ({
//     verifyIdToken: jest.fn().mockResolvedValue({
//       uid: "test-uid",
//     } as DecodedIdToken),
//   }),
// }));

// describe("firebaseAuthMiddleware", () => {
//   it("should add userId to request and call next function for valid token", async () => {
//     const mockUid = "test-uid";
//     const mockToken = "Bearer:valid-token";
//     const req = {
//       headers: {
//         authorization: mockToken,
//       },
//     } as CustomAuthRequest;
//     const res = {} as Response;
//     const next = jest.fn() as NextFunction;

//     await firebaseAuthMiddleware(req, res, next);

//     expect(req.userId).toBe(mockUid);
//     expect(next).toHaveBeenCalled();
//   });
// });

// describe("firebaseAuthMiddleware for success case", () => {
//   let req: CustomAuthRequest;
//   let res: Response;
//   let next: NextFunction;

//   jest.mock("firebase-admin/auth", () => ({
//     getAuth: () => ({
//       verifyIdToken: jest.fn().mockResolvedValue({
//         uid: "testUser",
//         aud: "testAudience",
//         auth_time: 1673315837,
//         iat: 1673312237,
//         exp: 1673319037,
//         iss: "https://securetoken.google.com/testProject",
//         sub: "testUserSub",
//       } as DecodedIdToken), // 修正箇所: 型アサーションを追加
//     }),
//   }));

//   beforeEach(() => {});
// });
