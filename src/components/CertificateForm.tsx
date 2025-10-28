import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Shield, User, Network, Calendar, FileCheck, Check, ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const formSchema = z.object({
  certificateType: z.string({
    required_error: "Le type de certificat est requis",
  }),
  beneficiary: z.string({
    required_error: "Le bénéficiaire est requis",
  }).min(1, "Le bénéficiaire est requis"),
  vlan: z.string({
    required_error: "Le VLAN est requis",
  }),
  expirationDate: z.string().optional(),
});

interface CertificateFormProps {
  onSubmit?: (data: z.infer<typeof formSchema>) => void;
}

export default function CertificateForm({ onSubmit }: CertificateFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [openBeneficiary, setOpenBeneficiary] = useState(false);
  const [openVlan, setOpenVlan] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      certificateType: "RADIUS",
      beneficiary: "",
      vlan: "",
      expirationDate: "",
    },
  });

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    // Simuler l'appel API
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log(values);
    if (onSubmit) {
      onSubmit(values);
    }
    setIsSubmitting(false);
  };

  // Données mockées pour la démo
  const vlans = [
    { id: "10", name: "VLAN 10 - Administratif" },
    { id: "20", name: "VLAN 20 - Technique" },
    { id: "30", name: "VLAN 30 - Invités" },
    { id: "40", name: "VLAN 40 - IoT" },
  ];

  const beneficiaries = [
    { id: "user1", name: "Jean Dupont", type: "user" },
    { id: "user2", name: "Marie Martin", type: "user" },
    { id: "pc1", name: "PC-LAB-001", type: "equipment" },
    { id: "pc2", name: "PC-PROD-042", type: "equipment" },
  ];

  return (
    <Card className="glass-card border-0 shadow-soft">
      <CardHeader className="space-y-1 pb-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-gradient-primary shadow-primary-glow">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <div>
            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-accent-600 bg-clip-text text-transparent">
              Nouveau Certificat RADIUS
            </CardTitle>
            <CardDescription className="text-base mt-1">
              Générez un certificat pour authentifier un utilisateur ou équipement
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            {/* Type de Certificat */}
            <FormField
              control={form.control}
              name="certificateType"
              render={({ field }) => (
                <FormItem className="group">
                  <FormLabel className="flex items-center gap-2 text-sm font-semibold text-primary">
                    <FileCheck className="w-4 h-4" />
                    Type de certificat
                  </FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="glass-input h-12 border-primary/20 hover:border-primary/40 hover:shadow-soft transition-all duration-300">
                        <SelectValue placeholder="Sélectionnez le type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="glass-card border-primary/20">
                      <SelectItem value="RADIUS" className="hover:bg-primary/5">
                        <div className="flex items-center gap-2">
                          <Shield className="w-4 h-4 text-primary" />
                          <span>RADIUS (802.1X)</span>
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription className="text-xs text-muted-foreground">
                    Certificat pour l'authentification réseau RADIUS
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Bénéficiaire avec autocomplétion */}
            <FormField
              control={form.control}
              name="beneficiary"
              render={({ field }) => (
                <FormItem className="group flex flex-col">
                  <FormLabel className="flex items-center gap-2 text-sm font-semibold text-primary">
                    <User className="w-4 h-4" />
                    Bénéficiaire
                  </FormLabel>
                  <Popover open={openBeneficiary} onOpenChange={setOpenBeneficiary}>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          aria-expanded={openBeneficiary}
                          className={cn(
                            "w-full h-12 justify-between glass-input border-primary/20 hover:border-primary/40 hover:shadow-soft transition-all duration-300",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value
                            ? beneficiaries.find((b) => b.id === field.value)?.name
                            : "Rechercher un utilisateur ou équipement..."}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-[--radix-popover-trigger-width] p-0 glass-card border-primary/20" align="start">
                      <Command>
                        <CommandInput placeholder="Rechercher..." className="h-10" />
                        <CommandList>
                          <CommandEmpty>Aucun résultat trouvé.</CommandEmpty>
                          <CommandGroup heading="Utilisateurs">
                            {beneficiaries
                              .filter(b => b.type === "user")
                              .map((beneficiary) => (
                                <CommandItem
                                  key={beneficiary.id}
                                  value={beneficiary.name}
                                  onSelect={() => {
                                    form.setValue("beneficiary", beneficiary.id);
                                    setOpenBeneficiary(false);
                                  }}
                                  className="hover:bg-primary/5"
                                >
                                  <div className="flex items-center gap-2 flex-1">
                                    <div className="w-2 h-2 rounded-full bg-accent"></div>
                                    <span>{beneficiary.name}</span>
                                  </div>
                                  <Check
                                    className={cn(
                                      "ml-auto h-4 w-4",
                                      beneficiary.id === field.value
                                        ? "opacity-100 text-primary"
                                        : "opacity-0"
                                    )}
                                  />
                                </CommandItem>
                              ))}
                          </CommandGroup>
                          <CommandGroup heading="Équipements">
                            {beneficiaries
                              .filter(b => b.type === "equipment")
                              .map((beneficiary) => (
                                <CommandItem
                                  key={beneficiary.id}
                                  value={beneficiary.name}
                                  onSelect={() => {
                                    form.setValue("beneficiary", beneficiary.id);
                                    setOpenBeneficiary(false);
                                  }}
                                  className="hover:bg-primary/5"
                                >
                                  <div className="flex items-center gap-2 flex-1">
                                    <div className="w-2 h-2 rounded-full bg-primary"></div>
                                    <span>{beneficiary.name}</span>
                                  </div>
                                  <Check
                                    className={cn(
                                      "ml-auto h-4 w-4",
                                      beneficiary.id === field.value
                                        ? "opacity-100 text-primary"
                                        : "opacity-0"
                                    )}
                                  />
                                </CommandItem>
                              ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormDescription className="text-xs text-muted-foreground">
                    Utilisateur ou équipement qui recevra le certificat
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* VLAN avec autocomplétion */}
            <FormField
              control={form.control}
              name="vlan"
              render={({ field }) => (
                <FormItem className="group flex flex-col">
                  <FormLabel className="flex items-center gap-2 text-sm font-semibold text-primary">
                    <Network className="w-4 h-4" />
                    VLAN
                  </FormLabel>
                  <Popover open={openVlan} onOpenChange={setOpenVlan}>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          aria-expanded={openVlan}
                          className={cn(
                            "w-full h-12 justify-between glass-input border-primary/20 hover:border-primary/40 hover:shadow-soft transition-all duration-300",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            <div className="flex items-center gap-2">
                              <div className="px-2 py-0.5 rounded bg-primary/10 text-primary text-xs font-mono font-semibold">
                                {field.value}
                              </div>
                              <span>{vlans.find((v) => v.id === field.value)?.name}</span>
                            </div>
                          ) : (
                            "Rechercher un VLAN..."
                          )}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-[--radix-popover-trigger-width] p-0 glass-card border-primary/20" align="start">
                      <Command>
                        <CommandInput placeholder="Rechercher un VLAN..." className="h-10" />
                        <CommandList>
                          <CommandEmpty>Aucun VLAN trouvé.</CommandEmpty>
                          <CommandGroup>
                            {vlans.map((vlan) => (
                              <CommandItem
                                key={vlan.id}
                                value={`${vlan.id} ${vlan.name}`}
                                onSelect={() => {
                                  form.setValue("vlan", vlan.id);
                                  setOpenVlan(false);
                                }}
                                className="hover:bg-primary/5"
                              >
                                <div className="flex items-center gap-2 flex-1">
                                  <div className="px-2 py-0.5 rounded bg-primary/10 text-primary text-xs font-mono font-semibold">
                                    {vlan.id}
                                  </div>
                                  <span>{vlan.name}</span>
                                </div>
                                <Check
                                  className={cn(
                                    "ml-auto h-4 w-4",
                                    vlan.id === field.value
                                      ? "opacity-100 text-primary"
                                      : "opacity-0"
                                  )}
                                />
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormDescription className="text-xs text-muted-foreground">
                    Réseau VLAN auquel le certificat donnera accès
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Date d'expiration (optionnelle) */}
            <FormField
              control={form.control}
              name="expirationDate"
              render={({ field }) => (
                <FormItem className="group">
                  <FormLabel className="flex items-center gap-2 text-sm font-semibold text-primary">
                    <Calendar className="w-4 h-4" />
                    Date d'expiration <span className="text-xs text-muted-foreground font-normal">(optionnel)</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="date"
                      className="glass-input h-12 border-primary/20 hover:border-primary/40 hover:shadow-soft transition-all duration-300"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription className="text-xs text-muted-foreground">
                    Laisser vide pour utiliser la durée par défaut de l'autorité de certification
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Boutons d'action */}
            <div className="flex gap-3 pt-4">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 h-12 bg-gradient-primary hover:shadow-primary-glow text-white font-semibold transition-all duration-300 hover:scale-[1.02]"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                    Génération en cours...
                  </>
                ) : (
                  <>
                    <Shield className="w-4 h-4 mr-2" />
                    Générer le certificat
                  </>
                )}
              </Button>
              <Button
                type="button"
                variant="outline"
                className="h-12 px-6 border-primary/20 hover:bg-primary/5 hover:border-primary/40 transition-all duration-300"
                onClick={() => form.reset()}
              >
                Réinitialiser
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
