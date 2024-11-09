import { auth } from "../firebase";

const UserInfo = () => {
  return (
    <div>
      <img
        src={auth.currentUser ? auth.currentUser.photoURL! : "kkks"}
        alt=""
      />
      <p>{auth.currentUser?.displayName}</p>
    </div>
  );
};

export default UserInfo;
