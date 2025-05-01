
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppWalletProvider from "./components/AppWalletProvider";
import Index from "./pages/Index";
import MapPage from "./pages/MapPage";
import RegisterPage from "./pages/RegisterPage";
import TokenomicsPage from "./pages/TokenomicsPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AppWalletProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/map" element={<MapPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/tokenomics" element={<TokenomicsPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AppWalletProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
