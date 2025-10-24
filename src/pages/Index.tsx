import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import DashboardCard from "@/components/DashboardCard";
import { Shield, Key, Users, Activity, TrendingUp, CheckCircle2 } from "lucide-react";

const Index = () => {
  // Simulate authentication state - in real app, use proper auth context
  const [isAuthenticated] = useState(true);

  const handleLogout = () => {
    console.log("Logout clicked");
    // Handle logout logic here
  };

  return (
    <div className="flex min-h-screen w-full">
      <Sidebar isAuthenticated={isAuthenticated} onLogout={handleLogout} />
      
      <main className="ml-64 flex-1 p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">
            Tableau de bord
          </h1>
          <p className="text-muted-foreground">
            Vue d'ensemble de votre infrastructure RADIUS
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
          <DashboardCard
            title="Certificats Actifs"
            value="156"
            icon={Shield}
            description="Certificats valides"
            trend={{ value: "+12%", isPositive: true }}
            variant="primary"
          />
          <DashboardCard
            title="Clés RADIUS"
            value="42"
            icon={Key}
            description="Clés configurées"
            trend={{ value: "+5%", isPositive: true }}
            variant="accent"
          />
          <DashboardCard
            title="Utilisateurs"
            value="1,248"
            icon={Users}
            description="Utilisateurs actifs"
            trend={{ value: "+18%", isPositive: true }}
          />
        </div>

        {/* Secondary Stats */}
        <div className="grid gap-6 md:grid-cols-3 mb-8">
          <DashboardCard
            title="Taux de disponibilité"
            value="99.9%"
            icon={Activity}
            description="Uptime ce mois"
          />
          <DashboardCard
            title="Authentifications"
            value="45.2K"
            icon={TrendingUp}
            description="Ce mois"
          />
          <DashboardCard
            title="Certificats OK"
            value="98%"
            icon={CheckCircle2}
            description="État de santé"
          />
        </div>

        {/* Recent Activity Section */}
        <div className="rounded-2xl bg-card p-6 card-shadow">
          <h2 className="text-xl font-bold text-foreground mb-4">
            Activité récente
          </h2>
          <div className="space-y-4">
            {[
              { action: "Nouveau certificat créé", user: "admin@elliot.app", time: "Il y a 5 minutes", type: "success" },
              { action: "Clé RADIUS mise à jour", user: "tech@elliot.app", time: "Il y a 1 heure", type: "info" },
              { action: "Utilisateur ajouté", user: "admin@elliot.app", time: "Il y a 2 heures", type: "success" },
              { action: "Certificat expiré détecté", user: "system", time: "Il y a 3 heures", type: "warning" },
            ].map((activity, index) => (
              <div key={index} className="flex items-start gap-4 rounded-xl bg-secondary p-4 transition-smooth hover:bg-secondary/70">
                <div className={`mt-1 h-2 w-2 rounded-full ${
                  activity.type === 'success' ? 'bg-green-500' : 
                  activity.type === 'warning' ? 'bg-yellow-500' : 
                  'bg-primary'
                }`} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground">{activity.action}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Par {activity.user} • {activity.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
