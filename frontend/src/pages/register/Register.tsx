import React from "react";
import "./Register.css";
import { useForm } from "react-hook-form";
import { registerValidationSchema } from "../../utils/validationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import type { RegisterFormValues } from "../../interfaces/interfaces.d.ts";
import { logInWithAnonymous, signUpWithEmailAndPassword } from "../../firebase";
import { Link } from "react-router-dom";
import LogInWithGoogleButton from "../../components/LogInWithGoogleButton";
import { Alert } from "@mui/material";

// アカウント新規登録ページ
const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    mode: "onChange",
    resolver: zodResolver(registerValidationSchema),
  });

  // firebaseに入力情報を新規登録する
  const onSubmit = async (data: RegisterFormValues) => {
    console.log(data);
    const user = await signUpWithEmailAndPassword(
      data.email,
      data.password,
      data.name
    );
    console.log(user);
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-200 ">
      <div className="bg-white p-8 pb-5 pt-3 m-10 rounded shadow-md w-full max-w-lg">
        <h1 className="text-2xl font-bold mb-1 text-center">Sign Up Form</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="name" className="block text-lg mb-0">
            ニックネーム
          </label>
          <input
            type="text"
            id="name"
            {...register("name")}
            className="w-full p-2 text-lg border border-gray-300 rounded mb-1"
            autoFocus
          />
          {errors.name && (
            <Alert severity="error" className="text-red-600 text-sm mb-2">
              {errors.name?.message as React.ReactNode}
            </Alert>
          )}

          <label htmlFor="email" className="block text-lg mb-0">
            Eメール
          </label>
          <input
            type="email"
            id="email"
            {...register("email")}
            className="w-full p-2 text-lg border border-gray-300 rounded mb-1"
          />
          {errors.email && (
            <Alert severity="error" className="text-red-600 text-sm mb-2">
              {errors.email?.message as React.ReactNode}
            </Alert>
          )}

          <label htmlFor="password" className="block text-lg mb-0">
            パスワード
          </label>
          <input
            type="password"
            id="password"
            {...register("password")}
            className="w-full p-2 text-lg border border-gray-300 rounded mb-1"
          />
          {errors.password && (
            <Alert severity="error" className="text-red-600 text-sm mb-2">
              {errors.password?.message as React.ReactNode}
            </Alert>
          )}

          <label htmlFor="confirm" className="block text-lg mb-0">
            パスワード(確認用)
          </label>
          <input
            type="password"
            id="confirm"
            {...register("confirm")}
            className="w-full p-2 text-lg border border-gray-300 rounded mb-1"
          />
          {errors.confirm && (
            <Alert severity="error" className="text-red-600 text-sm mb-2">
              {errors.confirm?.message as React.ReactNode}
            </Alert>
          )}

          <button
            type="submit"
            className="w-full p-2 text-lg font-bold bg-blue-500 text-white rounded mt-2 hover:bg-blue-600 transition-colors"
          >
            新規登録
          </button>
          <LogInWithGoogleButton register={true} />
          <button
            type="button"
            onClick={logInWithAnonymous}
            className="w-full p-2 text-lg font-bold bg-gray-500 text-white rounded mt-2 hover:bg-gray-600 transition-colors"
          >
            ゲストとしてログイン
          </button>

          <p className="mt-4">
            アカウントを持っている方は
            <Link to="/login" className="text-blue-500">
              ログイン
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
