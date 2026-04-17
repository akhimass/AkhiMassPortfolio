import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#09090b] px-6 text-center">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="max-w-md"
      >
        <p className="text-xs font-semibold uppercase tracking-widest text-blue-400 mb-3">404</p>
        <h1 className="mb-3 text-4xl font-bold tracking-tight font-display">This route does not exist.</h1>
        <p className="mb-8 text-sm text-muted-foreground leading-relaxed">
          Nothing lives at <span className="font-mono text-white/80">{location.pathname}</span>. Try the main sections below.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button asChild className="rounded-full bg-gradient-to-r from-[#2563eb] to-[#3b82f6] border-0">
            <Link to="/">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to portfolio
            </Link>
          </Button>
          <Button variant="outline" asChild className="rounded-full border-white/15">
            <Link to="/projects">View projects</Link>
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default NotFound;
