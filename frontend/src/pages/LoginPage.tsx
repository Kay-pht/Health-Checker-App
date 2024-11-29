import React from "react";
import { Link } from "react-router-dom";
import useFormValidation from "../hooks/useFormValidation";
import { UserAuth } from "../interfaces/interfaces";
import { loginValidationSchema } from "../utils/validationSchema";
import {
  logInWithAnonymous,
  logInWithEmailAndPassword,
} from "../services/firebase";
import TopBar from "../components/TopBar";
import { Alert, TextField } from "@mui/material";
import LogInWithGoogleButton from "../components/LogInWithGoogleButton";

// ログインページ
const LoginPage = () => {
  // フォームのバリデーションチェック
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useFormValidation<UserAuth>(loginValidationSchema);

  // 入力情報(メアド・パスワード)をfirebaseで確認
  const onSubmit = async (data: UserAuth) => {
    const userInfo = await logInWithEmailAndPassword(data.email, data.password);
    console.log(`User logged in:${userInfo}`);
  };

  return (
    <div>
      <TopBar />
      <div className="flex flex-col text-gray-700 items-center justify-center min-h-screen font-sans bg-gray-100">
        <div className="bg-white p-8 pb-5 pt-3 m-10 rounded-lg shadow-md w-full max-w-lg">
          <h1 className="text-2xl font-bold text-center ">ログインする</h1>
          <p className="text-sm text-center mt-1">
            ログインするとこれまでの診断結果がチェックできます
          </p>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3 mt-3">
              <TextField
                type="email"
                id="email"
                label="Eメール"
                {...register("email")}
                className="w-full p-2 border border-gray-300 rounded mb-1"
                autoFocus
              />

              {errors.email && (
                <Alert severity="error" className="text-red-600 text-sm mb-1">
                  {errors.email?.message as React.ReactNode}
                </Alert>
              )}
            </div>

            <div className="mb-3 mt-3">
              <TextField
                type="password"
                id="password"
                label="パスワード"
                {...register("password")}
                className="w-full p-2 border border-gray-300 rounded mb-1"
                autoComplete="current-password"
              />
              {errors.password && (
                <Alert severity="error" className="text-red-600 text-sm mb-1">
                  {errors.password?.message as React.ReactNode}
                </Alert>
              )}
            </div>
            <div className="flex flex-col  items-center">
              <button
                type="submit"
                className="w-full p-2 text-lg font-bold bg-blue-500 text-white rounded mt-2 hover:bg-blue-600 transition-colors"
              >
                ログイン
              </button>
              <LogInWithGoogleButton register={false} />
              <button
                type="button"
                onClick={logInWithAnonymous}
                className="w-full p-2 text-lg font-bold bg-gray-500 text-white rounded mt-2 hover:bg-gray-600 transition-colors"
              >
                ゲストとしてログイン
              </button>
              <p className="mt-4">
                新規登録は
                <Link to="/register" className="text-blue-500">
                  こちら
                </Link>
              </p>
              <p>
                パスワードを忘れた方は
                <Link to="/forget" className="text-blue-500">
                  こちら
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
