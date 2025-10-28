import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import CertificateForm from "@/components/CertificateForm";
import { Shield, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function Certificates() {
  const [isAuthenticated] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleFormSubmit = (data: any) => {
    console.log("Certificat créé:", data);
    // Ici vous appellerez votre API Symfony
    setIsDialogOpen(false);
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-orange-50/20">
      <Sidebar isAuthenticated={isAuthenticated} />
      
      <main className="flex-1 lg:ml-64 p-4 sm:p-6 lg:p-8 pt-16 lg:pt-8">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* En-tête */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-primary to-accent-600 bg-clip-text text-transparent flex items-center gap-3">
                <Shield className="w-8 h-8 text-primary" />
                Gestion des Certificats
              </h1>
              <p className="text-muted-foreground mt-2">
                Créez et gérez vos certificats RADIUS pour l'authentification réseau
              </p>
            </div>
            
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="h-12 px-6 bg-gradient-primary hover:shadow-primary-glow text-white font-semibold transition-all duration-300 hover:scale-[1.02]">
                  <Plus className="w-5 h-5 mr-2" />
                  Nouveau certificat
                </Button>
              </DialogTrigger>
              <DialogContent className="glass-card border-0 shadow-elegant max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader className="sr-only">
                  <DialogTitle>Créer un nouveau certificat</DialogTitle>
                  <DialogDescription>
                    Remplissez les informations pour générer un nouveau certificat RADIUS
                  </DialogDescription>
                </DialogHeader>
                <CertificateForm onSubmit={handleFormSubmit} />
              </DialogContent>
            </Dialog>
          </div>

          {/* Formulaire principal (version page complète) */}
          <div className="max-w-3xl">
            <CertificateForm onSubmit={handleFormSubmit} />
          </div>

          {/* Section informative */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mt-8">
            <div className="glass-card p-6 border-0 shadow-soft hover:shadow-primary-glow/50 transition-all duration-300">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Shield className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-semibold text-primary">Sécurité renforcée</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Authentification basée sur des certificats X.509 pour une sécurité maximale
              </p>
            </div>

            <div className="glass-card p-6 border-0 shadow-soft hover:shadow-accent-glow/50 transition-all duration-300">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-lg bg-accent/10">
                  <Plus className="w-5 h-5 text-accent" />
                </div>
                <h3 className="font-semibold text-primary">Génération rapide</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Création automatique via l'API Smallstep CA en quelques secondes
              </p>
            </div>

            <div className="glass-card p-6 border-0 shadow-soft hover:shadow-primary-glow/50 transition-all duration-300 sm:col-span-2 lg:col-span-1">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Shield className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-semibold text-primary">Gestion centralisée</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Tous vos certificats et métadonnées accessibles depuis une interface unique
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
