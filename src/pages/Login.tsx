import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "@/components/Logo";
import { User, Lock, Loader2, LogIn } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

const Login = () => {
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();
  const { toast } = useToast();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Redirect if already authenticated
  if (isAuthenticated) {
    navigate("/");
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const result = await login(username, password);

    if (result.success) {
      toast({
        title: "Connexion réussie",
        description: "Bienvenue sur Elliot !",
      });
      navigate("/");
    } else {
      toast({
        title: "Erreur de connexion",
        description: result.error,
        variant: "destructive",
      });
    }

    setIsLoading(false);
  };

  return (
    <div className="flex min-h-screen w-full">
      {/* Left Panel - Gradient Background with interactive elements */}
      <div className="hidden lg:flex lg:w-1/2 xl:w-3/5 relative overflow-hidden bg-gradient-to-br from-[hsl(205,100%,25%)] via-[hsl(205,80%,35%)] to-[hsl(25,85%,53%)]">
        {/* Floating particles */}
        <div className="absolute inset-0">
          {/* Animated floating dots */}
          <div className="absolute top-[15%] right-[20%] w-3 h-3 bg-white/30 rounded-full animate-float-slow" />
          <div className="absolute top-[25%] right-[35%] w-2 h-2 bg-white/20 rounded-full animate-float-medium" />
          <div className="absolute top-[45%] right-[15%] w-2.5 h-2.5 bg-white/25 rounded-full animate-float-fast" />
          <div className="absolute top-[60%] left-[15%] w-2 h-2 bg-white/20 rounded-full animate-float-medium" />
          <div className="absolute top-[75%] right-[40%] w-3 h-3 bg-white/15 rounded-full animate-float-slow" />
          <div className="absolute top-[85%] left-[25%] w-1.5 h-1.5 bg-white/30 rounded-full animate-float-fast" />
          <div className="absolute top-[35%] left-[30%] w-2 h-2 bg-white/20 rounded-full animate-float-slow" />
          <div className="absolute top-[55%] left-[45%] w-2.5 h-2.5 bg-white/15 rounded-full animate-float-medium" />
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-between p-12 w-full">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-white/10 backdrop-blur-sm">
              <Logo size="md" />
            </div>
            <span className="text-2xl font-bold text-white">Elliot</span>
          </div>

          {/* Welcome Text */}
          <div className="max-w-md">
            <h1 className="text-5xl font-bold text-white mb-4 leading-tight">
              Ravi de vous revoir.
            </h1>
            <p className="text-lg text-white/80">
              Logiciel de gestion de certificats RADIUS au sein de votre réseau.
            </p>
          </div>

          {/* Footer */}
          <p className="text-sm text-white/60">
            © 2025 Elliot. Tous droits réservés.
          </p>
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="w-full lg:w-1/2 xl:w-2/5 flex items-center justify-center p-6 sm:p-12 bg-background">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center gap-3 mb-8">
            <div className="p-2 rounded-xl bg-primary/10">
              <Logo size="md" />
            </div>
            <span className="text-2xl font-bold text-primary">Elliot</span>
          </div>

          {/* Form Header */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-foreground mb-2">Connexion</h2>
            <p className="text-muted-foreground">
              Veuillez entrer vos identifiants.
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Username Input */}
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-foreground mb-2">
                Login
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full rounded-xl border border-input bg-background pl-12 pr-4 py-3.5 text-sm transition-smooth focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  placeholder="Votre nom d'utilisateur"
                  required
                  disabled={isLoading}
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-foreground mb-2">
                Mot de passe
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-xl border border-input bg-background pl-12 pr-4 py-3.5 text-sm transition-smooth focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  placeholder="••••••••"
                  required
                  disabled={isLoading}
                />
              </div>
            </div>

            {/* Remember me */}
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                className="h-4 w-4 rounded border-input text-primary focus:ring-2 focus:ring-primary/20 transition-smooth accent-primary"
              />
              <span className="text-sm text-foreground">Se souvenir de moi</span>
            </label>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full rounded-xl gradient-accent py-4 text-sm font-semibold text-accent-foreground transition-smooth hover:opacity-90 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Connexion en cours...
                </>
              ) : (
                <>
                  <LogIn className="h-5 w-5" />
                  Se connecter
                </>
              )}
            </button>
          </form>

          {/* Demo info */}
          <div className="mt-8 pt-6 border-t border-border">
            <p className="text-sm text-muted-foreground text-center mb-3">
              Compte de démonstration
            </p>
            <button
              type="button"
              onClick={() => {
                setUsername("xavier");
                setPassword("123456");
              }}
              className="w-full rounded-xl border-2 border-dashed border-border py-3 text-sm font-medium text-muted-foreground hover:border-primary hover:text-primary transition-smooth"
            >
              <span className="font-mono">xavier</span> / <span className="font-mono">123456</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
