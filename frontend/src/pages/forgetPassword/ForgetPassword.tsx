import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { forgetValidationSchema } from "../../utils/validationSchema";
import type { UserAuth } from "../../interfaces/interfaces.d.ts";
import { submitPasswordResetEmail } from "../../firebase";
// import SignOutButton from "../../component/SignOutButton";
import { Link } from "react-router-dom";
import { Alert, TextField } from "@mui/material";

const ForgetPassword = () => {
  // ログインしていれば回答フォームへ接続
  const [message, setMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserAuth>({
    mode: "onChange",
    resolver: zodResolver(forgetValidationSchema),
  });
  // パスワードリセットメールを送信
  const onSubmit = async (data: UserAuth) => {
    await submitPasswordResetEmail(data.email);
    setMessage("パスワードリセットメールを送信しました。");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">
          パスワードの再設定
        </h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3 mt-3">
            <TextField
              type="email"
              id="email"
              label="email"
              {...register("email")}
              className="w-full p-2 border border-gray-300 rounded mb-1"
              autoFocus
            />
            {errors.email && (
              <Alert severity="error" className="text-red-600 text-sm mb-2">
                {errors.email?.message as React.ReactNode}
              </Alert>
            )}
            <p className="text-green-500">{message}</p>
          </div>

          <div className="flex flex-col items-center">
            <button
              type="submit"
              className="w-full p-2 text-lg font-bold bg-blue-500 text-white rounded mt-2 hover:bg-blue-600 transition-colors"
            >
              送信
            </button>
            <p className="mt-4">
              アカウントをお持ちでない場合は
              <Link to="/register" className="text-blue-500">
                新規登録
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgetPassword;
