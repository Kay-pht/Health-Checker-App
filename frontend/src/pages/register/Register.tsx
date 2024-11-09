import React from "react";
import "./Register.css";
import { useForm } from "react-hook-form";
import { registerValidationSchema } from "../../utils/validationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserAuth } from "../../interface/userAuth";
import { auth, signUpWithEmailAndPassword } from "../../firebase";
import { Link, useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import SignInButton from "../../component/SignInButton";

interface RegisterFormValues extends UserAuth {
  name: string;
  confirm: string;
}

const Register = () => {
  const navigate = useNavigate();
  const [user] = useAuthState(auth);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    mode: "onChange",
    resolver: zodResolver(registerValidationSchema),
  });

  if (user) {
    navigate("/");
  }
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
    <div className="form-container">
      <h1>Sign Up Form</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="name">name</label>
        <input type="text" id="name" {...register("name")} />
        <p>{errors.name?.message as React.ReactNode}</p>
        <label htmlFor="email">email</label>
        <input type="email" id="email" {...register("email")} />
        <p>{errors.email?.message as React.ReactNode}</p>
        <label htmlFor="password">password</label>
        <input type="password" id="password" {...register("password")} />
        <p>{errors.password?.message as React.ReactNode}</p>
        <label htmlFor="password">Re-enter password</label>
        <input type="password" id="confirm" {...register("confirm")} />
        <p>{errors.confirm?.message as React.ReactNode}</p>
        <button type="submit">Sign up</button>
        <SignInButton />

        <p>
          Already have an account?
          <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
