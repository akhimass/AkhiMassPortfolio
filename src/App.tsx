import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { CinematicIntro, shouldShowCinematicIntro } from "@/components/intro/CinematicIntro";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => {
  const [showIntro, setShowIntro] = useState(shouldShowCinematicIntro);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/projects" element={<Index />} />
            <Route path="/engineering" element={<Index />} />
            <Route path="/startups" element={<Index />} />
            <Route path="/about" element={<Index />} />
            <Route path="/contact" element={<Index />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
        {showIntro && <CinematicIntro key="cinematic-intro" onComplete={() => setShowIntro(false)} />}
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
