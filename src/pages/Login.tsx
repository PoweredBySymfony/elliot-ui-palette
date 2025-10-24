import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "@/components/Logo";
import { Mail, Lock } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic here
    console.log("Login attempt:", { email, password });
    navigate("/");
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo & Title */}
        <div className="mb-8 text-center">
          <div className="flex justify-center mb-4">
            <Logo size="lg" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Connexion à Elliot
          </h1>
          <p className="text-muted-foreground">
            Gérez vos certificats RADIUS en toute simplicité
          </p>
        </div>

        {/* Login Card */}
        <div className="rounded-2xl bg-card p-8 card-shadow">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Input */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                Adresse email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl border border-input bg-background pl-10 pr-4 py-3 text-sm transition-smooth focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  placeholder="votre@email.com"
                  required
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
                />
              </div>
            </div>

            {/* Remember & Forgot */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-input text-primary focus:ring-2 focus:ring-primary/20 transition-smooth"
                />
                <span className="text-foreground">Se souvenir de moi</span>
              </label>
              <a href="#" className="text-primary hover:text-primary-light transition-smooth font-medium">
                Mot de passe oublié ?
              </a>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full rounded-xl bg-gradient-primary py-3 text-sm font-semibold text-white transition-smooth hover:opacity-90 card-shadow"
            >
              Se connecter
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center gap-4">
            <div className="h-px flex-1 bg-border"></div>
            <span className="text-xs text-muted-foreground">OU</span>
            <div className="h-px flex-1 bg-border"></div>
          </div>

          {/* Register Link */}
          <p className="text-center text-sm text-muted-foreground">
            Pas encore de compte ?{" "}
            <a href="/register" className="text-primary hover:text-primary-light transition-smooth font-semibold">
              Créer un compte
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
