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
    <div className="login-container">
      <h1>パスワードの再設定</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="form-container">
        <label htmlFor="email">email</label>
        <input type="email" id="email" {...register("email")} />
        <p>{errors.email?.message as React.ReactNode}</p>
        <p>{message}</p>

        <div>
          <button type="submit">送信</button>

          <p>
            Don't have an account?
            <Link to="/register" className="text-blue-500">
              Sign up
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default ForgetPassword;
