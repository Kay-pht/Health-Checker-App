import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase";

const SignInButton = () => {
  const signInWithGoogle = () => {
    // Implement Google Sign-In
    signInWithPopup(auth, provider);
  };
  return <button onClick={signInWithGoogle}>Sign In with Google</button>;
};

export default SignInButton;
