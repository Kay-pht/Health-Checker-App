/** @type {import('ts-jest').JestConfigWithTsJest} */
export default {
  preset: "ts-jest/presets/default-esm",
  testEnvironment: "node",
  moduleFileExtensions: [
    "js",
    "mjs",
    "cjs",
    "jsx",
    "ts",
    "mts",
    "tsx",
    "json",
    "node",
  ],
  testMatch: [
    "**/__tests__/**/*.?(m)[jt]s?(x)",
    "**/?(*.)+(spec|test).?(m)[tj]s?(x)",
  ],
  resolver:
    "/home/kei/.local/Portfolio/Health-Checker-App/backend/mjs-resolver.cjs", // 絶対パスを使用
  transform: {
    "^.+\\.m?tsx?$": [
      "ts-jest",
      {
        useESM: true,
      },
    ],
  },
};
