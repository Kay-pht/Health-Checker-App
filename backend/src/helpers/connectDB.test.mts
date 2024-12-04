import { MongoClient } from "mongodb";
import { connectToDatabase, resultsCollection } from "./connectDB.mjs";
import configEnv from "../configEnv.mjs";

const { mongoUri } = configEnv;

describe("connectToDatabase", () => {
  let client: MongoClient;

  afterEach(async () => {
    if (client) {
      await client.close();
    }
  });

  it("should connect to MongoDB successfully", async () => {
    client = new MongoClient(mongoUri || "");
    await connectToDatabase();
    expect(resultsCollection.collectionName).toBe("results");
  });
  // it("should log an error if unable to connect to MongoDB", async () => {
  //   const invalidUri = "mongodb://invalid_uri";
  //   client = new MongoClient(invalidUri);

  //   try {
  //     await client.connect();
  //   } catch (error) {
  //     const err = error as Error;
  //     expect(err).toBeDefined();
  //     expect(err.message).toContain("failed to connect");
  //   } finally {
  //     if (client) {
  //       await client.close();
  //     }
  //   }
  // }, 20000);
});
