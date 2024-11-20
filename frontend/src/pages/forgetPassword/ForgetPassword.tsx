import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { forgetValidationSchema } from "../../utils/validationSchema";
import { UserAuth } from "../../interfaces/interfaces";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, submitPasswordResetEmail } from "../../firebase";
// import SignOutButton from "../../component/SignOutButton";
import { Link, useNavigate } from "react-router-dom";

const ForgetPassword = () => {
  // ログインしていれば回答フォームへ接続
  const navigate = useNavigate();
  const [user] = useAuthState(auth);
  useEffect(() => {
    if (user) {
      navigate("/questionnaire");
    }
  }, [user, navigate]);

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
      <h1 className="text-2xl font-bold mb-6">パスワードの再設定</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-8 rounded shadow-md w-full max-w-md"
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
        <p className="text-green-500">{message}</p>

        <div className="flex flex-col items-center">
          <button
            type="submit"
            className="w-full p-3 text-lg font-bold bg-blue-500 text-white rounded mt-2 hover:bg-blue-600 transition-colors"
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
  );
};

export default ForgetPassword;
