import { getToken, logOut, saveTokenInStorage } from "../services/firebase";
import { useEffect } from "react";
import { User } from "firebase/auth";
import { verifyToken } from "../api/api";

interface useUserIsLoggedinProps {
  user: User | null | undefined;
  loading: boolean;
}

export const useUserIsLoggedin = ({
  user,
  loading,
}: useUserIsLoggedinProps) => {
  useEffect(() => {
    if (loading) return;
    if (user) {
      verifyUser(user);
    }
    //pathとrouterを依存配列から除外
  }, [user, loading]);

  const verifyUser = async (user: User) => {
    try {
      await getToken(user);
      await saveTokenInStorage(user);
      await verifyToken();
    } catch (error) {
      alert("Error verifying user, please log in again.");
      console.error("Error verifying user:", error);
      await logOut();
      return;
    }
  };
};
