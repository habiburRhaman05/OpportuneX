import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="  flex w-screen min-h-screen">
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
