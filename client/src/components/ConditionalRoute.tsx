import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../types/storeType";

const ConditionalRoute = ({ isProtected }: {isProtected: boolean}) => {
  const {userInfo} = useAppSelector((state) => state.Authentication);

  if (isProtected) {
    return userInfo ? <Outlet /> : <Navigate to="/" replace />;
  } else {
    return !userInfo ? <Outlet /> : <Navigate to="/" replace />;
  }
};

export default ConditionalRoute;
