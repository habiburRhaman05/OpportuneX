import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className=" container mx-auto flex w-screen min-h-screen">
      <div className="hidden bg-zinc-950 md:flex  flex-1">contennt</div>
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
