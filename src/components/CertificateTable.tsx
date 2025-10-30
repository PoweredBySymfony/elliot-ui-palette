import { useState, useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Eye,
  Download,
  Ban,
  XCircle,
  Search,
  ChevronLeft,
  ChevronRight,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

type CertificateStatus = "Actif" | "Désactivé" | "Révoqué";

interface Certificate {
  id: string;
  ressource: string;
  dateCreation: string;
  dateExpiration: string;
  vlan: string;
  statut: CertificateStatus;
  contenu?: string;
}

// Données de démonstration
const mockCertificates: Certificate[] = [
  {
    id: "1",
    ressource: "PC-001 (Jean Dupont)",
    dateCreation: "2024-01-15",
    dateExpiration: "2025-01-15",
    vlan: "VLAN-100",
    statut: "Actif",
    contenu: "-----BEGIN CERTIFICATE-----\nMIIDXTCCAkWgAwIBAgIJAKZ...\n-----END CERTIFICATE-----",
  },
  {
    id: "2",
    ressource: "Marie Martin",
    dateCreation: "2024-02-20",
    dateExpiration: "2025-02-20",
    vlan: "VLAN-200",
    statut: "Actif",
    contenu: "-----BEGIN CERTIFICATE-----\nMIIDXTCCAkWgAwIBAgIJAKZ...\n-----END CERTIFICATE-----",
  },
  {
    id: "3",
    ressource: "PC-045 (Sophie Bernard)",
    dateCreation: "2023-12-10",
    dateExpiration: "2024-12-10",
    vlan: "VLAN-100",
    statut: "Révoqué",
    contenu: "-----BEGIN CERTIFICATE-----\nMIIDXTCCAkWgAwIBAgIJAKZ...\n-----END CERTIFICATE-----",
  },
  {
    id: "4",
    ressource: "Pierre Leroy",
    dateCreation: "2024-03-05",
    dateExpiration: "2025-03-05",
    vlan: "VLAN-300",
    statut: "Désactivé",
    contenu: "-----BEGIN CERTIFICATE-----\nMIIDXTCCAkWgAwIBAgIJAKZ...\n-----END CERTIFICATE-----",
  },
  {
    id: "5",
    ressource: "PC-078 (Alice Petit)",
    dateCreation: "2024-01-28",
    dateExpiration: "2025-01-28",
    vlan: "VLAN-200",
    statut: "Actif",
    contenu: "-----BEGIN CERTIFICATE-----\nMIIDXTCCAkWgAwIBAgIJAKZ...\n-----END CERTIFICATE-----",
  },
];

type SortField = keyof Certificate | null;
type SortDirection = "asc" | "desc" | null;

interface CertificateTableProps {
  isAdmin?: boolean;
}

export default function CertificateTable({ isAdmin = true }: CertificateTableProps) {
  const [certificates] = useState<Certificate[]>(mockCertificates);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [vlanFilter, setVlanFilter] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [sortField, setSortField] = useState<SortField>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>(null);
  const [viewCertificate, setViewCertificate] = useState<Certificate | null>(null);

  // Tri
  const handleSort = (field: SortField) => {
    if (sortField === field) {
      if (sortDirection === "asc") {
        setSortDirection("desc");
      } else if (sortDirection === "desc") {
        setSortField(null);
        setSortDirection(null);
      }
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  // Filtrage et tri
  const filteredAndSortedCertificates = useMemo(() => {
    let filtered = certificates.filter((cert) => {
      const matchesSearch =
        cert.ressource.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cert.vlan.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === "all" || cert.statut === statusFilter;
      const matchesVlan = vlanFilter === "all" || cert.vlan === vlanFilter;
      return matchesSearch && matchesStatus && matchesVlan;
    });

    if (sortField && sortDirection) {
      filtered = [...filtered].sort((a, b) => {
        const aValue = a[sortField];
        const bValue = b[sortField];
        
        if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
        if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
        return 0;
      });
    }

    return filtered;
  }, [certificates, searchTerm, statusFilter, vlanFilter, sortField, sortDirection]);

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedCertificates.length / itemsPerPage);
  const paginatedCertificates = filteredAndSortedCertificates.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Actions
  const handleExport = (certificate: Certificate) => {
    const blob = new Blob([certificate.contenu || ""], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `certificate-${certificate.id}.pem`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleDisable = (id: string) => {
    console.log("Désactivation du certificat:", id);
    // TODO: Appel API Smallstep CA
  };

  const handleRevoke = (id: string) => {
    console.log("Révocation du certificat:", id);
    // TODO: Appel API Smallstep CA
  };

  const getStatusBadge = (status: CertificateStatus) => {
    switch (status) {
      case "Actif":
        return (
          <Badge className="bg-green-100 text-green-800 border-green-200 hover:bg-green-100">
            Actif
          </Badge>
        );
      case "Désactivé":
        return (
          <Badge className="bg-orange-100 text-orange-800 border-orange-200 hover:bg-orange-100">
            Désactivé
          </Badge>
        );
      case "Révoqué":
        return (
          <Badge className="bg-red-100 text-red-800 border-red-200 hover:bg-red-100">
            Révoqué
          </Badge>
        );
    }
  };

  const getSortIcon = (field: SortField) => {
    if (sortField !== field) {
      return <ArrowUpDown className="w-4 h-4 ml-1 text-muted-foreground" />;
    }
    return sortDirection === "asc" ? (
      <ArrowUp className="w-4 h-4 ml-1 text-primary" />
    ) : (
      <ArrowDown className="w-4 h-4 ml-1 text-primary" />
    );
  };

  const uniqueVlans = Array.from(new Set(certificates.map((c) => c.vlan)));

  return (
    <div className="space-y-6">
      {/* Filtres et recherche */}
      <div className="glass-effect rounded-xl p-6 border border-border/50 card-shadow">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Rechercher par ressource ou VLAN..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="pl-10 h-11 bg-background/80 border-border/50 focus:border-primary transition-smooth"
            />
          </div>

          <Select value={statusFilter} onValueChange={(value) => {
            setStatusFilter(value);
            setCurrentPage(1);
          }}>
            <SelectTrigger className="w-full lg:w-48 h-11 bg-background/80 border-border/50">
              <SelectValue placeholder="Statut" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les statuts</SelectItem>
              <SelectItem value="Actif">Actif</SelectItem>
              <SelectItem value="Désactivé">Désactivé</SelectItem>
              <SelectItem value="Révoqué">Révoqué</SelectItem>
            </SelectContent>
          </Select>

          <Select value={vlanFilter} onValueChange={(value) => {
            setVlanFilter(value);
            setCurrentPage(1);
          }}>
            <SelectTrigger className="w-full lg:w-48 h-11 bg-background/80 border-border/50">
              <SelectValue placeholder="VLAN" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les VLANs</SelectItem>
              {uniqueVlans.map((vlan) => (
                <SelectItem key={vlan} value={vlan}>
                  {vlan}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Tableau */}
      <div className="glass-effect rounded-xl border border-border/50 card-shadow overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="border-b border-border/50 bg-muted/30">
              <TableHead>
                <Button
                  variant="ghost"
                  onClick={() => handleSort("ressource")}
                  className="font-semibold hover:bg-transparent p-0 h-auto"
                >
                  Ressource concernée
                  {getSortIcon("ressource")}
                </Button>
              </TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  onClick={() => handleSort("dateCreation")}
                  className="font-semibold hover:bg-transparent p-0 h-auto"
                >
                  Date de création
                  {getSortIcon("dateCreation")}
                </Button>
              </TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  onClick={() => handleSort("dateExpiration")}
                  className="font-semibold hover:bg-transparent p-0 h-auto"
                >
                  Date d'expiration
                  {getSortIcon("dateExpiration")}
                </Button>
              </TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  onClick={() => handleSort("vlan")}
                  className="font-semibold hover:bg-transparent p-0 h-auto"
                >
                  VLAN
                  {getSortIcon("vlan")}
                </Button>
              </TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  onClick={() => handleSort("statut")}
                  className="font-semibold hover:bg-transparent p-0 h-auto"
                >
                  Statut
                  {getSortIcon("statut")}
                </Button>
              </TableHead>
              <TableHead className="font-semibold">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedCertificates.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-12 text-muted-foreground">
                  Aucun certificat trouvé
                </TableCell>
              </TableRow>
            ) : (
              paginatedCertificates.map((certificate) => (
                <TableRow
                  key={certificate.id}
                  className="border-b border-border/30 hover:bg-muted/20 transition-smooth"
                >
                  <TableCell className="font-medium">{certificate.ressource}</TableCell>
                  <TableCell>{new Date(certificate.dateCreation).toLocaleDateString("fr-FR")}</TableCell>
                  <TableCell>{new Date(certificate.dateExpiration).toLocaleDateString("fr-FR")}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20">
                      {certificate.vlan}
                    </Badge>
                  </TableCell>
                  <TableCell>{getStatusBadge(certificate.statut)}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setViewCertificate(certificate)}
                        className="h-9 w-9 p-0 hover:bg-primary/10 hover:text-primary transition-smooth"
                        title="Visualiser"
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleExport(certificate)}
                        className="h-9 w-9 p-0 hover:bg-accent/10 hover:text-accent transition-smooth"
                        title="Exporter"
                      >
                        <Download className="w-4 h-4" />
                      </Button>
                      {isAdmin && certificate.statut === "Actif" && (
                        <>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDisable(certificate.id)}
                            className="h-9 w-9 p-0 hover:bg-orange-100 hover:text-orange-600 transition-smooth"
                            title="Désactiver"
                          >
                            <Ban className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRevoke(certificate.id)}
                            className="h-9 w-9 p-0 hover:bg-red-100 hover:text-red-600 transition-smooth"
                            title="Révoquer"
                          >
                            <XCircle className="w-4 h-4" />
                          </Button>
                        </>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="glass-effect rounded-xl p-4 border border-border/50 card-shadow flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Afficher</span>
          <Select
            value={itemsPerPage.toString()}
            onValueChange={(value) => {
              setItemsPerPage(Number(value));
              setCurrentPage(1);
            }}
          >
            <SelectTrigger className="w-20 h-9 bg-background/80">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="5">5</SelectItem>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="20">20</SelectItem>
              <SelectItem value="50">50</SelectItem>
            </SelectContent>
          </Select>
          <span className="text-sm text-muted-foreground">
            sur {filteredAndSortedCertificates.length} résultat(s)
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="h-9 px-3 bg-background/80 hover:bg-primary/10 hover:text-primary transition-smooth disabled:opacity-50"
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Précédent
          </Button>
          <span className="text-sm font-medium px-2">
            Page {currentPage} sur {totalPages || 1}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages || totalPages === 0}
            className="h-9 px-3 bg-background/80 hover:bg-primary/10 hover:text-primary transition-smooth disabled:opacity-50"
          >
            Suivant
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
      </div>

      {/* Dialog de visualisation */}
      <Dialog open={!!viewCertificate} onOpenChange={() => setViewCertificate(null)}>
        <DialogContent className="glass-effect border border-border/50 shadow-elevated max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-primary">
              Contenu du certificat
            </DialogTitle>
            <DialogDescription>
              Ressource: {viewCertificate?.ressource}
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4">
            <pre className="bg-muted/30 p-4 rounded-lg text-xs overflow-x-auto border border-border/50">
              {viewCertificate?.contenu}
            </pre>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
