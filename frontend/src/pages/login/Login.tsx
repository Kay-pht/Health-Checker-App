import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginValidationSchema } from "../../utils/validationSchema";
import type { UserAuth } from "../../interfaces/interfaces.d.ts";
import { Link } from "react-router-dom";
import LogInWithGoogleButton from "../../components/LogInWithGoogleButton";
import { logInWithAnonymous, logInWithEmailAndPassword } from "../../firebase";

// ログインページ
const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserAuth>({
    mode: "onChange",
    resolver: zodResolver(loginValidationSchema),
  });

  // 入力情報(メアド・パスワード)をfirebaseで確認
  const onSubmit = async (data: UserAuth) => {
    const userInfo = await logInWithEmailAndPassword(data.email, data.password);
    console.log(`User logged in:${userInfo}`);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold ">ログインする</h1>
      <p className="text-sm">
        ログインするとこれまでの診断結果がチェックできます
      </p>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-8 rounded shadow-md w-full max-w-lg"
      >
        <label htmlFor="email" className="block text-lg font-medium mb-2">
          email
        </label>
        <input
          type="email"
          id="email"
          {...register("email")}
          className="w-full p-2 border border-gray-300 rounded mb-4"
        />
        <p className="text-red-500">
          {errors.email?.message as React.ReactNode}
        </p>
        <label htmlFor="password" className="block text-lg font-medium mb-2">
          password
        </label>
        <input
          type="password"
          id="password"
          {...register("password")}
          className="w-full p-2 border border-gray-300 rounded mb-4"
        />
        <p className="text-red-500">
          {errors.password?.message as React.ReactNode}
        </p>
        <div className="flex flex-col items-center">
          <button
            type="submit"
            className="w-full p-3 text-lg font-bold bg-blue-500 text-white rounded mt-2 hover:bg-blue-600 transition-colors"
          >
            ログイン
          </button>
          <LogInWithGoogleButton register={false} />
          <button
            type="button"
            onClick={logInWithAnonymous}
            className="w-full p-3 text-lg font-bold bg-gray-500 text-white rounded mt-2 hover:bg-gray-600 transition-colors"
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
  );
};

export default Login;
