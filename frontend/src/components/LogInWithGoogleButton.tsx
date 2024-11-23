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
    <button
      onClick={signInWithGoogle}
      className="w-full p-2 text-lg font-bold bg-red-500 text-white rounded mt-2 hover:bg-red-600 transition-colors"
    >
      {register ? "Googleで登録" : "Googleでログイン"}
    </button>
  );
};

export default LogInWithGoogleButton;
