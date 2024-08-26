import { useSelector } from "react-redux";
import {
  selectCurrentToken,
  selectCurrentUser,
} from "../../app/auth/authSlice";
import { decryptData } from "../../libs/crypto";

export default function useAuth() {
  const user = useSelector(selectCurrentUser);
  const token = useSelector(selectCurrentToken);
  return {
    user: user ? decryptData(user) : null,
    token: token ? decryptData(token) : null,
  };
}
