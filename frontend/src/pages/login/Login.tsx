import React from "react";
import "./Login.css";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginValidationSchema } from "../../utils/validationSchema";
import { UserAuth } from "../../interfaces/interfaces";
import { logInWithAnonymous, logInWithEmailAndPassword } from "../../firebase";
import { Link } from "react-router-dom";
import LogInWithGoogleButton from "../../components/LogInWithGoogleButton";

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
    <div className="login-container">
      <h1>Login Form</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="form-container">
        <label htmlFor="email">email</label>
        <input type="email" id="email" {...register("email")} />
        <p>{errors.email?.message as React.ReactNode}</p>
        <label htmlFor="password">password</label>
        <input type="password" id="password" {...register("password")} />
        <p>{errors.password?.message as React.ReactNode}</p>
        <div>
          <button type="submit">ログイン</button>
          <LogInWithGoogleButton register={false} />
          <button type="button" onClick={logInWithAnonymous}>
            ゲストとしてログイン
          </button>
          <p>
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
