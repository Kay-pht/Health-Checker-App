import { jest } from "@jest/globals";
import admin from "firebase-admin";

// 環境変数を差し替えてテストするために、環境変数を設定してから関数をインポートする必要があるので、動的インポートを採用
describe("initializeFirebaseAdmin", () => {
  const originalEnv = process.env;

  beforeEach(() => {
    // 環境変数のキャッシュをクリア
    jest.resetModules();

    process.env = {
      ...originalEnv,
    };

    jest.spyOn(process, "exit").mockImplementation((code) => {
      throw new Error(`process.exit: ${code}`);
    }); // process.exitをモック
  });

  afterEach(() => {
    process.env = originalEnv; // テスト後に環境変数を元に戻す
  });
  it("should log an error if the service account key is not provided", async () => {
    process.env.SERVICE_ACCOUNT_KEY = "";
    const { initializeFirebaseAdmin } = await import("./firebase.mjs");
    await expect(initializeFirebaseAdmin()).rejects.toThrow("process.exit: 1");
  });

  it("should log an error if the service account key is invalid", async () => {
    process.env.SERVICE_ACCOUNT_KEY = "invalid_service_account_key";
    const { initializeFirebaseAdmin } = await import("./firebase.mjs");
    await expect(initializeFirebaseAdmin()).rejects.toThrow("process.exit: 1");
  });

  it("should initialize Firebase Admin successfully", async () => {
    process.env = originalEnv;
    const consoleLogSpy = jest
      .spyOn(console, "log")
      .mockImplementation(() => {});

    const { initializeFirebaseAdmin } = await import("./firebase.mjs");
    await initializeFirebaseAdmin();
    expect(consoleLogSpy).toHaveBeenCalledWith(
      "Firebase Admin initialized successfully."
    );
    consoleLogSpy.mockRestore();
    // const mockedInitializeApp = jest.mocked(
    //   admin.initializeApp as jest.MockedFunction<typeof admin.initializeApp> // 修正: admin.initializeApp を使用
    // );
    // expect(admin.initializeApp).toHaveBeenCalled(); // モック関数が呼ばれたことを確認
  });
});
