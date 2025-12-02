import { Home, Shield, Key, Users, Settings, LogOut, FileText, Menu, X } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import Logo from "./Logo";
import { useAuth } from "@/contexts/AuthContext";

const Sidebar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const navigationItems = [
    { name: "Tableau de bord", path: "/", icon: Home },
    { name: "Certificats", path: "/certificates", icon: Shield },
    { name: "Clés RADIUS", path: "/keys", icon: Key },
    { name: "Utilisateurs", path: "/users", icon: Users },
    { name: "Rapports", path: "/reports", icon: FileText },
    { name: "Paramètres", path: "/settings", icon: Settings },
  ];

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <>
      {/* Bouton hamburger mobile */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="lg:hidden fixed top-4 left-4 z-[60] p-2 glass-effect rounded-xl soft-shadow border border-primary/10 hover:card-shadow transition-smooth"
        aria-label="Toggle menu"
      >
        {isMobileMenuOpen ? (
          <X className="w-6 h-6 text-primary" />
        ) : (
          <Menu className="w-6 h-6 text-primary" />
        )}
      </button>

      {/* Overlay mobile */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
          onClick={closeMobileMenu}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed left-0 top-0 h-screen w-64 glass-effect border-r border-sidebar-border soft-shadow z-50
        transition-transform duration-300 ease-in-out
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="flex h-full flex-col">
          {/* Header with Logo */}
          <div className="flex items-center gap-3 border-b border-sidebar-border p-6">
            <Logo size="md" className="flex-shrink-0" />
            <div>
              <h1 className="text-xl font-bold text-primary">Elliot</h1>
              <p className="text-xs text-muted-foreground">Gestion RADIUS</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-4">
            <ul className="space-y-1">
              {navigationItems.map((item) => (
                <li key={item.path}>
                  <NavLink
                    to={item.path}
                    end={item.path === "/"}
                    onClick={closeMobileMenu}
                    className={({ isActive }) =>
                      `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-smooth group ${
                        isActive
                          ? "bg-primary text-primary-foreground card-shadow"
                          : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <item.icon 
                          className={`h-5 w-5 transition-smooth ${
                            isActive 
                              ? "text-primary-foreground" 
                              : "text-muted-foreground group-hover:text-sidebar-accent-foreground"
                          }`}
                        />
                        <span>{item.name}</span>
                      </>
                    )}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          {/* User Section & Logout */}
          <div className="border-t border-sidebar-border p-4">
            {isAuthenticated && user ? (
              <>
                <div className="mb-3 rounded-xl bg-sidebar-accent p-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full gradient-accent text-accent-foreground font-semibold">
                      {user.username.slice(0, 2).toUpperCase()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-sidebar-foreground truncate capitalize">
                        {user.username}
                      </p>
                      <p className="text-xs text-muted-foreground truncate">
                        {user.email}
                      </p>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => {
                    closeMobileMenu();
                    handleLogout();
                  }}
                  className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-destructive hover:bg-destructive/10 transition-smooth group"
                >
                  <LogOut className="h-5 w-5" />
                  <span>Déconnexion</span>
                </button>
              </>
            ) : (
              <div className="space-y-2">
                <NavLink
                  to="/login"
                  onClick={closeMobileMenu}
                  className="flex w-full items-center justify-center gap-2 rounded-xl gradient-primary px-4 py-3 text-sm font-semibold text-primary-foreground transition-smooth hover:opacity-90 card-shadow"
                >
                  Connexion
                </NavLink>
              </div>
            )}
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
