import { Collection, MongoClient } from "mongodb";
import configEnv from "../configEnv.mjs";
import { CustomAuthRequest, Result } from "../interfaces/interfaces";
import { registerResult } from "./mongoDB.mjs";
import { jest } from "@jest/globals";

const { mongoUri } = configEnv;

if (!mongoUri) {
  throw new Error("MONGO_URI is not defined in the environment variables");
}

describe("registerResult", () => {
  let client: MongoClient;
  const { mongoUri } = configEnv;
  let resultsCollection: Collection;
  const req = {
    userId: "testUser",
  } as CustomAuthRequest;
  const result: Result = {
    userId: req.userId,
    recommendedFoods: ["testFood1", "testFood2"],
    missingNutrients: ["testNutrient1", "testNutrient2"],
    score: 90,
    createdAt: new Date(),
  };

  beforeAll(async () => {
    client = new MongoClient(mongoUri || "");
    await client.connect();
    const db = client.db("food_health_check");
    resultsCollection = db.collection("results");
  });

  afterAll(async () => {
    await client.close();
  });

  it("should register result successfully", async () => {
    await registerResult(req, result);
    const insertedResult = await resultsCollection.findOne({
      userId: req.userId,
    });
    expect(insertedResult?.recommendedFoods).toEqual(result.recommendedFoods);
  });

  it("should throw error when failed to register result", async () => {
    const insertOneSpy = jest
      .spyOn(resultsCollection, "insertOne")
      .mockRejectedValueOnce(new Error("Test error"));

    await expect(resultsCollection.insertOne(result)).rejects.toThrow(
      "Test error"
    );

    // Ensure that the spy was called
    expect(insertOneSpy).toHaveBeenCalled();

    // Reset the spy to ensure it doesn't affect other tests
    insertOneSpy.mockReset();
  });
});
