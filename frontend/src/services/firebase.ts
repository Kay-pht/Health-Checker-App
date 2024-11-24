import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signOut,
  signInAnonymously,
  User,
  sendPasswordResetEmail,
} from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { firebaseConfig } from "../config/config";

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };

// JWTを取得
export const getToken = async (user: User) => {
  try {
    const token = await user.getIdToken();
    return token;
  } catch (error) {
    console.error("Error getting token:", error);
  }
};

//トークンを取得して、sessionStorageに保存する用の関数
export const saveTokenInStorage = async (user: User) => {
  const token = await getToken(user);
  if (token) {
    sessionStorage.setItem("authToken", token);
  } else {
    throw new Error("User is not authenticated");
  }
};

// sessionStorageからトークンを取得
export const getStoredToken = () => {
  const token = sessionStorage.getItem("authToken");
  if (!token) {
    throw new Error("User is not authenticated");
  }
  return token;
};

// メアド&パスワードでアカウント新規作成する用の関数
export const signUpWithEmailAndPassword = async (
  email: string,
  password: string,
  name: string
) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    await updateProfile(user, {
      displayName: name,
    });
    await saveTokenInStorage(user);
    await sendEmailVerification(user);

    console.log("User signed up successfully with name!");
    return user;
  } catch (error) {
    if (error instanceof Error) {
      alert(`Error creating user: ${error.message}`);
    } else {
      alert("An unknown error occurred.");
    }
  }
};

// メアド&パスワードでログインする用の関数
export const logInWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    const user = userCredential.user;
    saveTokenInStorage(user);

    console.log("User logged in successfully!");
    return user;
  } catch (error) {
    if (error instanceof Error) {
      alert(`Error creating user: ${error.message}`);
    } else {
      alert("An unknown error occurred.");
    }
  }
};
// ゲスト(匿名)でログイン(サインアップ)する用の関数
export const logInWithAnonymous = async () => {
  try {
    const userCredential = await signInAnonymously(auth);
    const user = userCredential.user;
    await saveTokenInStorage(user);
    console.log("Anonymous user logged in successfully!");

    return user;
  } catch (error) {
    if (error instanceof Error) {
      alert(`Error logging in anonymously: ${error.message}`);
    } else {
      alert("An unknown error occurred.");
    }
  }
};
// ログアウト用の関数
export const logOut = async () => {
  try {
    console.log("Signing out...");
    await signOut(auth);
    // Navigate()
    console.log("User logged out successfully!");
  } catch (error) {
    if (error instanceof Error) {
      alert(`Error creating user: ${error.message}`);
    } else {
      alert("An unknown error occurred.");
    }
  }
};

// パスワード忘れた場合の再設定用の関数
export const submitPasswordResetEmail = async (email: string) => {
  try {
    await sendPasswordResetEmail(auth, email);
    console.log("Password reset email sent successfully!");
  } catch (error) {
    if (error instanceof Error) {
      alert(`Error creating user: ${error.message}`);
    } else {
      alert("An unknown error occurred.");
    }
  }
};
