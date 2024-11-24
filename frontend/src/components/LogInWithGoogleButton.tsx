import { signInWithPopup } from "firebase/auth";
import { auth, provider, saveTokenInStorage } from "../services/firebase";
import { registerProps } from "../interfaces/interfaces";

const LogInWithGoogleButton = ({ register }: registerProps) => {
  const signInWithGoogle = async () => {
    const userCredential = await signInWithPopup(auth, provider);
    const { user } = userCredential;
    saveTokenInStorage(user);
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
