import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
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

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGE_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

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

// メアド&パスワードでアカ新規作成
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
    await getToken(user);
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

// メアド&パスワードでログイン
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
    await getToken(user);

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
// ゲスト(匿名)でログイン(サインアップ)
export const logInWithAnonymous = async () => {
  try {
    const userCredential = await signInAnonymously(auth);
    const user = userCredential.user;
    await getToken(user);
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
// ログアウト
export const logOut = async () => {
  try {
    console.log("Signing out...");
    await signOut(auth);
    console.log("User logged out successfully!");
  } catch (error) {
    if (error instanceof Error) {
      alert(`Error creating user: ${error.message}`);
    } else {
      alert("An unknown error occurred.");
    }
  }
};

// パスワード忘れた場合の再設定
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
