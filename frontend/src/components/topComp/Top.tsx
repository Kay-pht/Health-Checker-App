import { Link } from "react-router-dom";
import { auth, logOut } from "../../firebase";
import { Avatar } from "@mui/material";

const Top = () => {
  const userName = auth.currentUser?.displayName;
  const userPhotoURL = auth.currentUser?.photoURL;
  //   const PUBLIC_FOLDER = import.meta.env.VITE_PUBLIC_FOLDER;

  return (
    <div className="bg-blue-500 p-3 flex items-center justify-between rounded">
      <Link to={"/"}>
        <h2 className="text-white text-xl font-bold">title</h2>
      </Link>
      <div className="flex items-center space-x-2 ml-auto">
        <Link to={"/mypage"} className="flex items-center space-x-2">
          {userPhotoURL ? (
            <img src={userPhotoURL} alt="" className="w-8 h-8 rounded-full" />
          ) : (
            <Avatar variant="circular" className="w-8 h-8" />
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
