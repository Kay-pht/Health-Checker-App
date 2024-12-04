import { MongoClient } from "mongodb";
import configEnv from "../configEnv.mjs";

describe("registerResult", () => {});

describe("getResultsByUserId", () => {
  let client: MongoClient;
  const { mongoUri } = configEnv;

  beforeAll(async () => {
    client = new MongoClient(mongoUri || "");
    await client.connect();
  });

  afterAll(async () => {
    await client.close();
  });
});
