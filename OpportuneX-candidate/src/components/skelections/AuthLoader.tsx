import { Loader } from "lucide-react";

const AuthLoading = () => {
  return (
    <div className="w-screen h-screen flex items-center justify-center overflow-hidden">
      <Loader className="animate-spin text-xl text-blue-800" />
    </div>
  );
};

export default AuthLoading;
