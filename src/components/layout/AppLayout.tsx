import { Link, useLocation, useNavigate } from "react-router-dom";
import { LayoutDashboard, Plus, Settings, LogOut, Wrench } from "lucide-react";
import { cn } from "@/lib/utils";
import { logout } from "@/lib/logout";

const navItems = [
  { to: "/dashboard", icon: LayoutDashboard, label: "Tableau de bord" },
  { to: "/interventions/new", icon: Plus, label: "Nouvelle intervention" },
  { to: "/settings", icon: Settings, label: "Paramètres" },
];

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout(navigate);
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar desktop */}
      <aside className="hidden lg:flex flex-col w-64 gradient-hero border-r border-sidebar-border">
        <div className="p-5 flex items-center gap-2">
          <div className="w-9 h-9 rounded-lg gradient-accent flex items-center justify-center">
            <Wrench className="w-5 h-5 text-accent-foreground" />
          </div>
          <span className="text-xl font-display font-bold text-sidebar-foreground">TRACEA</span>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1">
          {navItems.map((item) => {
            const active = location.pathname === item.to || (item.to !== "/dashboard" && location.pathname.startsWith(item.to));
            return (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                  active
                    ? "bg-sidebar-accent text-sidebar-accent-foreground"
                    : "text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent/50"
                )}
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Logout button — calls our logout() function */}
        <div className="p-3">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-sidebar-foreground/60 hover:text-sidebar-foreground hover:bg-sidebar-accent/50 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            Déconnexion
          </button>
        </div>
      </aside>

      {/* Mobile bottom nav */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-card border-t flex justify-around py-2">
        {navItems.map((item) => {
          const active = location.pathname === item.to || (item.to !== "/dashboard" && location.pathname.startsWith(item.to));
          return (
            <Link
              key={item.to}
              to={item.to}
              className={cn(
                "flex flex-col items-center gap-1 px-3 py-1 text-xs transition-colors",
                active ? "text-accent" : "text-muted-foreground"
              )}
            >
              <item.icon className="w-5 h-5" />
              <span>{item.label.split(" ").slice(0, 2).join(" ")}</span>
            </Link>
          );
        })}

        {/* Logout for mobile */}
        <button
          onClick={handleLogout}
          className="flex flex-col items-center gap-1 px-3 py-1 text-xs text-muted-foreground transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span>Déconnexion</span>
        </button>
      </div>

      {/* Main content */}
      <main className="flex-1 overflow-auto pb-20 lg:pb-0">
        {children}
      </main>
    </div>
  );
};

export default AppLayout;