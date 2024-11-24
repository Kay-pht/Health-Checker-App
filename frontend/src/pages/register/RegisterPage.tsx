import { zodResolver } from "@hookform/resolvers/zod";
import {
  logInWithAnonymous,
  signUpWithEmailAndPassword,
} from "../../firebase.ts";
import LogInWithGoogleButton from "../../components/LogInWithGoogleButton.tsx";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { registerValidationSchema } from "../../utils/validationSchema.ts";
import React from "react";
import { Alert, TextField } from "@mui/material";
import TopBar from "../../components/TopBar.tsx";
import { RegisterFormValues } from "../../interfaces/interfaces";

const RegisterPage = () => {
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
    <div>
      <TopBar />
      <div className="flex flex-col items-center justify-center min-h-screen font-sans bg-gray-100">
        <div className="bg-white p-8 pb-5 pt-3 m-10 rounded-lg shadow-md w-full max-w-lg">
          <h1 className="text-2xl font-bold mb-1 text-center">Sign Up Form</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3 mt-3">
              <TextField
                type="text"
                id="name"
                label="ニックネーム"
                {...register("name")}
                className="w-full p-2 border border-gray-300 rounded mb-1"
                autoFocus
              />
              {errors.name && (
                <Alert severity="error" className="text-red-600 text-sm mb-2">
                  {errors.name?.message as React.ReactNode}
                </Alert>
              )}
            </div>

            <div className="mb-3 mt-3">
              <TextField
                type="email"
                id="email"
                label="Eメール"
                {...register("email")}
                className="w-full p-2 border border-gray-300 rounded mb-1"
              />
              {errors.email && (
                <Alert severity="error" className="text-red-600 text-sm mb-2">
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
              />
              {errors.password && (
                <Alert severity="error" className="text-red-600 text-sm mb-2">
                  {errors.password?.message as React.ReactNode}
                </Alert>
              )}
            </div>

            <div className="mb-3 mt-3">
              <TextField
                type="password"
                id="confirm"
                label="パスワード(確認用)"
                {...register("confirm")}
                className="w-full p-2 border border-gray-300 rounded mb-1"
              />
              {errors.confirm && (
                <Alert severity="error" className="text-red-600 text-sm mb-2">
                  {errors.confirm?.message as React.ReactNode}
                </Alert>
              )}
            </div>

            <div className="flex flex-col items-center">
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
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
