import { Link } from "react-router-dom";
import { auth, logOut } from "../services/firebase";
import { Avatar } from "@mui/material";
import { useAuthState } from "react-firebase-hooks/auth";

const TopBar = () => {
  const [user] = useAuthState(auth);
  const userName = user?.displayName;
  const userPhotoURL = user?.photoURL;

  return (
    <div className="bg-blue-500 p-2 flex items-center justify-between ">
      <Link to={"/"}>
        <h2 className="text-white text-xl ml-3 font-extrabold">
          FoodHealth.navi
        </h2>
      </Link>

      {user && (
        <div className="flex items-center space-x-2 font-semibold ml-auto">
          <Link
            to={userName ? "/mypage" : "/login"}
            className="flex items-center space-x-2"
          >
            {userPhotoURL ? (
              <img src={userPhotoURL} alt="" className="w-6 h-6 rounded-full" />
            ) : (
              <Avatar variant="circular" className="w-6 h-6" />
            )}
            <span className="text-white">{userName ? userName : "ゲスト"}</span>
          </Link>
          <button onClick={logOut} className=" text-white px-4 py-2 rounded">
            ログアウト
          </button>
        </div>
      )}
    </div>
  );
};

export default TopBar;
