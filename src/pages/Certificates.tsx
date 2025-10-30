import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import CertificateForm from "@/components/CertificateForm";
import CertificateTable from "@/components/CertificateTable";
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
              <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent flex items-center gap-3">
                <Shield className="w-8 h-8 text-primary" />
                Gestion des Certificats
              </h1>
              <p className="text-muted-foreground mt-2">
                Créez et gérez vos certificats RADIUS pour l'authentification réseau
              </p>
            </div>
            
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="h-12 px-6 gradient-primary hover:shadow-lg text-white font-semibold transition-smooth hover:scale-[1.02]">
                  <Plus className="w-5 h-5 mr-2" />
                  Nouveau certificat
                </Button>
              </DialogTrigger>
              <DialogContent className="glass-effect border border-border/50 shadow-elevated max-w-2xl max-h-[90vh] overflow-y-auto">
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

          {/* Tableau des certificats */}
          <CertificateTable isAdmin={true} />
        </div>
      </main>
    </div>
  );
}
