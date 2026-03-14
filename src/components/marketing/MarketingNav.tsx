import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Wrench, Menu, X } from "lucide-react";
import { useState } from "react";

const MarketingNav = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-md border-b">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-lg gradient-accent flex items-center justify-center">
            <Wrench className="w-5 h-5 text-accent-foreground" />
          </div>
          <span className="text-xl font-display font-bold text-foreground">TRACEA</span>
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-6">
          <Link to="/pricing" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Tarifs</Link>
          <Button variant="ghost" size="sm" asChild>
            <Link to="/login">Se connecter</Link>
          </Button>
          <Button variant="accent" size="sm" asChild>
            <Link to="/signup">Créer un compte</Link>
          </Button>
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden p-2" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t bg-card px-4 pb-4 pt-2 space-y-2">
          <Link to="/pricing" className="block py-2 text-sm font-medium text-muted-foreground" onClick={() => setMobileOpen(false)}>Tarifs</Link>
          <Button variant="ghost" className="w-full justify-start" asChild>
            <Link to="/login" onClick={() => setMobileOpen(false)}>Se connecter</Link>
          </Button>
          <Button variant="accent" className="w-full" asChild>
            <Link to="/signup" onClick={() => setMobileOpen(false)}>Créer un compte</Link>
          </Button>
        </div>
      )}
    </nav>
  );
};

export default MarketingNav;
