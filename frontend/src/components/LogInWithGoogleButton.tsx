import { signInWithPopup } from "firebase/auth";
import { auth, getToken, provider } from "../firebase";

interface registerProps {
  register: boolean; // registerはboolean型のプロパティ
}
const LogInWithGoogleButton = ({ register }: registerProps) => {
  const signInWithGoogle = async () => {
    const userCredential = await signInWithPopup(auth, provider);
    const { user } = userCredential;
    getToken(user);
  };
  return (
    <button onClick={signInWithGoogle}>
      {register ? "Googleで登録" : "Googleでログイン"}
    </button>
  );
};

export default LogInWithGoogleButton;
