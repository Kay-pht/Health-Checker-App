import { Link } from "react-router-dom";
import { auth, logOut } from "../firebase";
import { Avatar } from "@mui/material";

const Top = () => {
  const userName = auth.currentUser?.displayName;
  const userPhotoURL = auth.currentUser?.photoURL;

  return (
    <div className="bg-blue-500 p-2 flex items-center justify-between ">
      <Link to={"/"}>
        <h2 className="text-white text-xl font-bold">title</h2>
      </Link>
      <div className="flex items-center space-x-2 ml-auto">
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
    </div>
  );
};

export default Top;