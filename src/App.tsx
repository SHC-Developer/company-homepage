import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { RouteScrollManager } from "@/components/RouteScrollManager";
import Index from "./pages/Index";
import LegalBasis from "./pages/LegalBasis";
import Greeting from "./pages/Greeting";
import Portfolio from "./pages/Portfolio";
import NotFound from "./pages/NotFound";
import Recruit from "./pages/Recruit";

const queryClient = new QueryClient();

// basename은 배포 경로에 따라 달라집니다.
// - 커스텀 도메인(루트 배포): ""
// - GitHub Project Pages(서브패스 배포): 예) "/company-homepage"
const basename = import.meta.env.PROD ? (import.meta.env.VITE_BASENAME || "") : "";

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter 
        basename={basename}
        future={{
          v7_relativeSplatPath: true,
          v7_startTransition: true,
        }}
      >
        <RouteScrollManager />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/legal-basis" element={<LegalBasis />} />
          <Route path="/greeting" element={<Greeting />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/recruit" element={<Recruit />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
