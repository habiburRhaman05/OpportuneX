import React from "react";
import { Button } from "./ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const BackButton = ({
  className,
  title,
}: {
  className?: string;
  title: string;
}) => {
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1); // 1 step back in history
  };
  return (
    <Button
      variant="default"
      className={className || "bg-zinc-800"}
      onClick={() => goBack()}
    >
      <ArrowLeft className="h-4 w-4 mr-2" />
      {title}
    </Button>
  );
};

export default BackButton;
