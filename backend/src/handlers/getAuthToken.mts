import { Request, Response } from "express";
import { getTokenFromRequest } from "../middlewares/firebaseAuthMiddleware.mjs";

const getAuthToken = async (req: Request, res: Response) => {
  try {
    // トークンの取得
    const authHeader = req.headers.authorization;
    const token = getTokenFromRequest(authHeader);

    // クッキーの設定
    res.cookie("authToken", token, {
      httpOnly: true,
      secure: true,
      path: "/",
      maxAge: 3600000,
      sameSite: "none",
    });

    res
      .status(200)
      .json({ success: true, message: "Auth token set in cookie" });
  } catch (error) {
    console.error("Error in getAuthToken:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export default getAuthToken;
