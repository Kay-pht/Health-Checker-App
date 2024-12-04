import { MongoClient } from "mongodb";
import { connectToDatabase, resultsCollection } from "./connectDB.mjs";
import configEnv from "../configEnv.mjs";

const { mongoUri } = configEnv;

describe("connectToDatabase", () => {
  let clientTest: MongoClient;

  afterEach(async () => {
    if (clientTest) {
      await clientTest.close();
    }
  });

  it("should connect to MongoDB successfully", async () => {
    clientTest = new MongoClient(mongoUri || "");
    await connectToDatabase();
    expect(resultsCollection.collectionName).toBe("results");
  });
  it("should log an error if unable to connect to MongoDB", async () => {
    const invalidUri = "mongodb://invalid_uri";
    clientTest = new MongoClient(invalidUri);

    try {
      await clientTest.connect();
    } catch (error) {
      const err = error as Error;
      expect(err).toBeDefined();
      expect(err.message).toContain("failed to connect");
    } finally {
      if (clientTest) {
        await clientTest.close();
      }
    }
  });
});
