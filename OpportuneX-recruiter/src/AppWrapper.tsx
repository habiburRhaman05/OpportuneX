import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import QueryClientWrapper from "./components/QueryClientWrapper";
import { TooltipProvider } from "./components/ui/tooltip";
import { Toaster } from "./components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { ThemeProvider } from "./components/theme-provider";

const AppWrapper = ({ children }) => {
  return (
    <ThemeProvider defaultTheme="dark">
      <QueryClientWrapper>
        <TooltipProvider>
          <AuthProvider>
            <BrowserRouter>{children}</BrowserRouter>
          </AuthProvider>
          <Toaster />
          <Sonner />
        </TooltipProvider>
      </QueryClientWrapper>
    </ThemeProvider>
  );
};

export default AppWrapper;
