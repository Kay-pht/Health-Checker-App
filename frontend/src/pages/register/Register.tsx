import React from "react";
import "./Register.css";
import { useForm } from "react-hook-form";
import { registerValidationSchema } from "../../utils/validationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserAuth } from "../../interfaces/interfaces";
import { logInWithAnonymous, signUpWithEmailAndPassword } from "../../firebase";
import { Link } from "react-router-dom";
import LogInWithGoogleButton from "../../components/LogInWithGoogleButton";

interface RegisterFormValues extends UserAuth {
  name: string;
  confirm: string;
}

// アカウント新規登録
const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    mode: "onChange",
    resolver: zodResolver(registerValidationSchema),
  });

  // firebaseに入力情報を登録してログイン
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
    <div className="register-container">
      <h1>Sign Up Form</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="form-container">
        <label htmlFor="name">ニックネーム</label>
        <input type="text" id="name" {...register("name")} />
        <p>{errors.name?.message as React.ReactNode}</p>
        <label htmlFor="email">Eメール</label>
        <input type="email" id="email" {...register("email")} />
        <p>{errors.email?.message as React.ReactNode}</p>
        <label htmlFor="password">パスワード</label>
        <input type="password" id="password" {...register("password")} />
        <p>{errors.password?.message as React.ReactNode}</p>
        <label htmlFor="password">パスワード(確認用)</label>
        <input type="password" id="confirm" {...register("confirm")} />
        <p>{errors.confirm?.message as React.ReactNode}</p>
        <button type="submit">新規登録</button>
        <LogInWithGoogleButton register={true} />
        <button type="button" onClick={logInWithAnonymous}>
          ゲストとしてログイン
        </button>

        <p>
          アカウントを持っている方は
          <Link to="/login" className="text-blue-500">
            ログイン
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
