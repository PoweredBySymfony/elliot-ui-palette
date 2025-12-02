import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "@/components/Logo";
import { Mail, Lock, User, Loader2 } from "lucide-react";
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
    <div className="flex min-h-screen w-full items-center justify-center p-4 bg-gradient-to-br from-primary/5 via-background to-accent/5">
      {/* Background decorative elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent/10 rounded-full blur-3xl" />
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Logo & Title */}
        <div className="mb-8 text-center">
          <div className="flex justify-center mb-6">
            <div className="p-4 rounded-2xl bg-card card-shadow">
              <Logo size="lg" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Connexion à <span className="text-primary">Elliot</span>
          </h1>
          <p className="text-muted-foreground">
            Gérez vos certificats RADIUS en toute simplicité
          </p>
        </div>

        {/* Login Card */}
        <div className="rounded-2xl bg-card p-8 card-shadow border border-border/50">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Username Input */}
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-foreground mb-2">
                Nom d'utilisateur
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full rounded-xl border border-input bg-background pl-10 pr-4 py-3 text-sm transition-smooth focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
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
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-xl border border-input bg-background pl-10 pr-4 py-3 text-sm transition-smooth focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  placeholder="••••••••"
                  required
                  disabled={isLoading}
                />
              </div>
            </div>

            {/* Remember & Forgot */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-input text-primary focus:ring-2 focus:ring-primary/20 transition-smooth accent-primary"
                />
                <span className="text-foreground">Se souvenir de moi</span>
              </label>
              <a href="#" className="text-accent hover:text-accent-light transition-smooth font-medium">
                Mot de passe oublié ?
              </a>
            </div>

            {/* Submit Button - Primary Blue */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full rounded-xl gradient-primary py-3 text-sm font-semibold text-primary-foreground transition-smooth hover:opacity-90 card-shadow disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Connexion en cours...
                </>
              ) : (
                "Se connecter"
              )}
            </button>

            {/* Alternative - Accent Orange Button */}
            <button
              type="button"
              className="w-full rounded-xl gradient-accent py-3 text-sm font-semibold text-accent-foreground transition-smooth hover:opacity-90 glow-accent"
              onClick={() => {
                setUsername("xavier");
                setPassword("123456");
              }}
            >
              Remplir avec compte démo
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center gap-4">
            <div className="h-px flex-1 bg-border"></div>
            <span className="text-xs text-muted-foreground uppercase tracking-wider">Info</span>
            <div className="h-px flex-1 bg-border"></div>
          </div>

          {/* Demo credentials */}
          <div className="rounded-xl bg-secondary/50 p-4 border border-border/50">
            <p className="text-sm text-muted-foreground text-center">
              <span className="font-medium text-foreground">Compte démo :</span>{" "}
              <span className="text-primary font-mono">xavier</span> / <span className="text-accent font-mono">123456</span>
            </p>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-sm text-muted-foreground mt-6">
          © 2024 Elliot - Gestion des certificats RADIUS
        </p>
      </div>
    </div>
  );
};

export default Login;
