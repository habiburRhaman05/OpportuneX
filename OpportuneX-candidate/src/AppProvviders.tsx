import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import QueryClientWrapper from "./components/shared/QueryClientWrapper";
import { TooltipProvider } from "./components/ui/tooltip";
import { Toaster } from "./components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { ThemeProvider } from "next-themes";
import RoutesWrapper from "./RoutesWrapper";

const AppWrapper = () => {
  return (
    <ThemeProvider defaultTheme="dark">
      <QueryClientWrapper>
        <TooltipProvider>
          <AuthProvider>
            <BrowserRouter>
              <RoutesWrapper />
            </BrowserRouter>
          </AuthProvider>
          <Toaster />
          <Sonner />
        </TooltipProvider>
      </QueryClientWrapper>
    </ThemeProvider>
  );
};

export default AppWrapper;
