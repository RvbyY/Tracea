import AppLayout from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Building2, Users, CreditCard, Upload } from "lucide-react";
import { toast } from "sonner";

const Settings = () => {
  const handleSave = () => {
    toast.success("Paramètres enregistrés !");
  };

  return (
    <AppLayout>
      <div className="p-4 lg:p-8 max-w-3xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-display font-bold text-foreground">Paramètres</h1>
          <p className="text-sm text-muted-foreground">Gérez votre profil, équipe et abonnement</p>
        </div>

        <Tabs defaultValue="profile">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="profile" className="flex items-center gap-1.5 text-xs sm:text-sm">
              <Building2 className="w-4 h-4" />
              <span className="hidden sm:inline">Profil</span>
            </TabsTrigger>
            <TabsTrigger value="team" className="flex items-center gap-1.5 text-xs sm:text-sm">
              <Users className="w-4 h-4" />
              <span className="hidden sm:inline">Équipe</span>
            </TabsTrigger>
            <TabsTrigger value="billing" className="flex items-center gap-1.5 text-xs sm:text-sm">
              <CreditCard className="w-4 h-4" />
              <span className="hidden sm:inline">Abonnement</span>
            </TabsTrigger>
          </TabsList>

          {/* Profile */}
          <TabsContent value="profile">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="text-base font-display">Profil entreprise</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-xl bg-muted border flex items-center justify-center">
                    <Upload className="w-6 h-6 text-muted-foreground" />
                  </div>
                  <Button variant="outline" size="sm">Changer le logo</Button>
                </div>
                <Separator />
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Nom de l'entreprise</Label>
                    <Input placeholder="Dupont Électricité" defaultValue="Dupont Électricité" />
                  </div>
                  <div className="space-y-2">
                    <Label>SIRET (optionnel)</Label>
                    <Input placeholder="123 456 789 00012" />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Email professionnel</Label>
                    <Input type="email" defaultValue="contact@dupont-elec.fr" />
                  </div>
                  <div className="space-y-2">
                    <Label>Téléphone</Label>
                    <Input defaultValue="06 12 34 56 78" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Adresse</Label>
                  <Input defaultValue="15 rue de la Paix, 75002 Paris" />
                </div>
                <div className="flex justify-end">
                  <Button variant="accent" onClick={handleSave}>Enregistrer</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Team */}
          <TabsContent value="team">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="text-base font-display">Gestion d'équipe</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Votre plan actuel : <span className="font-semibold text-foreground">Solo (1 utilisateur)</span>
                </p>
                <Separator />
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 rounded-lg border bg-background">
                    <div>
                      <p className="text-sm font-medium text-foreground">Jean Dupont</p>
                      <p className="text-xs text-muted-foreground">contact@dupont-elec.fr · Propriétaire</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Input placeholder="Email du collaborateur" className="flex-1" />
                  <Button variant="outline" size="sm">Inviter</Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  Passez au plan Équipe pour inviter jusqu'à 3 collaborateurs.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Billing */}
          <TabsContent value="billing">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="text-base font-display">Abonnement & Facturation</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 rounded-lg border bg-background">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-foreground">Plan Solo</span>
                    <span className="text-lg font-bold text-foreground">40€<span className="text-sm font-normal text-muted-foreground">/mois</span></span>
                  </div>
                  <p className="text-xs text-muted-foreground mb-3">Prochain renouvellement : 5 avril 2026</p>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">Changer de plan</Button>
                    <Button variant="ghost" size="sm" className="text-destructive">Annuler</Button>
                  </div>
                </div>
                <Separator />
                <div>
                  <h4 className="text-sm font-medium text-foreground mb-3">Historique des factures</h4>
                  <div className="space-y-2">
                    {["Mars 2026", "Février 2026", "Janvier 2026"].map((m) => (
                      <div key={m} className="flex items-center justify-between p-3 rounded-lg border bg-background text-sm">
                        <span className="text-foreground">{m}</span>
                        <div className="flex items-center gap-3">
                          <span className="text-muted-foreground">40,00€</span>
                          <Button variant="ghost" size="sm" className="text-accent text-xs">PDF</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default Settings;
