import React from "react";
import "./Login.css";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginValidationSchema } from "../../utils/validationSchema";
import { UserAuth } from "../../interface/userAuth";
import SignInButton from "../../component/SignInButton";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, logInWithEmailAndPassword, logOut } from "../../firebase";
// import SignOutButton from "../../component/SignOutButton";
import UserInfo from "../../component/UserInfo";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [user] = useAuthState(auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserAuth>({
    mode: "onChange",
    resolver: zodResolver(loginValidationSchema),
  });

  if (user) {
    navigate("/");
  }
  const onSubmit = async (data: UserAuth) => {
    // Handle form submission
    const userInfo = await logInWithEmailAndPassword(data.email, data.password);
    console.log(`User logged in:${userInfo}`);
  };

  return (
    <div className="form-container">
      <h1>Login Form</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="email">email</label>
        <input type="email" id="email" {...register("email")} />
        <p>{errors.email?.message as React.ReactNode}</p>
        <label htmlFor="password">password</label>
        <input type="password" id="password" {...register("password")} />
        <p>{errors.password?.message as React.ReactNode}</p>
        <div>
          {user ? (
            <>
              <button type="button" onClick={logOut}>
                Log out
              </button>
              <UserInfo />
              {/* <SignOutButton /> */}
            </>
          ) : (
            <>
              <button type="submit">Log in</button>
              <SignInButton />
              <p>
                Don't have an account?
                <Link to="/register">Sign up</Link>
              </p>
            </>
          )}
        </div>
      </form>
    </div>
  );
};

export default Login;
