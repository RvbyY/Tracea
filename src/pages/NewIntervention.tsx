import AppLayout from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Upload, Zap, Camera } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import useSessionGuard from "@/hooks/useSessionGuard";

const NewIntervention = () => {
  useSessionGuard();
  const navigate = useNavigate();
  const [notes, setNotes] = useState("");
  const [aiSummary, setAiSummary] = useState("");
  const [generating, setGenerating] = useState(false);
  const [beforePhotos, setBeforePhotos] = useState<File[]>([]);
  const [afterPhotos, setAfterPhotos] = useState<File[]>([]);

  const handleGenerateAI = () => {
    if (!notes.trim()) {
      toast.error("Ajoutez des notes avant de générer le compte-rendu.");
      return;
    }
    setGenerating(true);
    // Simulate AI generation
    setTimeout(() => {
      setAiSummary(
        `Suite à notre intervention, nous avons procédé à ${notes.trim()}. Les travaux ont été réalisés dans les règles de l'art et conformément aux normes en vigueur. L'ensemble de l'installation a été vérifié et testé. Le client a été informé des recommandations d'entretien et des précautions à prendre. Des photographies avant et après intervention sont jointes au présent compte-rendu pour documentation.`
      );
      setGenerating(false);
      toast.success("Compte-rendu généré !");
    }, 1500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Intervention créée !");
    navigate("/dashboard");
  };

  return (
    <AppLayout>
      <div className="p-4 lg:p-8 max-w-3xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-display font-bold text-foreground">Nouvelle intervention</h1>
          <p className="text-sm text-muted-foreground">Renseignez les informations de l'intervention</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Client info */}
          <Card className="shadow-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-display">Informations client</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Nom du client</Label>
                  <Input placeholder="M. Dupont" required />
                </div>
                <div className="space-y-2">
                  <Label>Téléphone</Label>
                  <Input placeholder="06 12 34 56 78" />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Email</Label>
                <Input type="email" placeholder="client@email.com" />
              </div>
              <div className="space-y-2">
                <Label>Adresse</Label>
                <Input placeholder="12 rue des Lilas, 75011 Paris" required />
              </div>
            </CardContent>
          </Card>

          {/* Intervention info */}
          <Card className="shadow-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-display">Détails intervention</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Date et heure</Label>
                  <Input type="datetime-local" required />
                </div>
                <div className="space-y-2">
                  <Label>Statut</Label>
                  <Select defaultValue="upcoming">
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="upcoming">À venir</SelectItem>
                      <SelectItem value="in_progress">En cours</SelectItem>
                      <SelectItem value="done">Terminée</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Prix (€)</Label>
                  <Input type="number" placeholder="450" />
                </div>
                <div className="space-y-2">
                  <Label>Paiement</Label>
                  <Select defaultValue="unpaid">
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="paid">Payé</SelectItem>
                      <SelectItem value="unpaid">Non payé</SelectItem>
                      <SelectItem value="partial">Partiel</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Photos */}
          <Card className="shadow-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-display flex items-center gap-2">
                <Camera className="w-4 h-4 text-accent" />
                Photos
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <Label className="mb-2 block">Photos avant</Label>
                  <label className="flex flex-col items-center justify-center h-32 border-2 border-dashed rounded-lg cursor-pointer hover:bg-muted/50 transition-colors">
                    <Upload className="w-6 h-6 text-muted-foreground mb-1" />
                    <span className="text-xs text-muted-foreground">
                      {beforePhotos.length > 0 ? `${beforePhotos.length} fichier(s)` : "Glisser ou cliquer"}
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      className="hidden"
                      onChange={(e) => setBeforePhotos(Array.from(e.target.files || []))}
                    />
                  </label>
                </div>
                <div>
                  <Label className="mb-2 block">Photos après</Label>
                  <label className="flex flex-col items-center justify-center h-32 border-2 border-dashed rounded-lg cursor-pointer hover:bg-muted/50 transition-colors">
                    <Upload className="w-6 h-6 text-muted-foreground mb-1" />
                    <span className="text-xs text-muted-foreground">
                      {afterPhotos.length > 0 ? `${afterPhotos.length} fichier(s)` : "Glisser ou cliquer"}
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      className="hidden"
                      onChange={(e) => setAfterPhotos(Array.from(e.target.files || []))}
                    />
                  </label>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Notes + AI */}
          <Card className="shadow-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-display flex items-center gap-2">
                <Zap className="w-4 h-4 text-accent" />
                Notes & Compte-rendu IA
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Vos notes (1–2 lignes)</Label>
                <Textarea
                  placeholder="Ex : Remplacement du tableau électrique, mise aux normes..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={2}
                />
              </div>
              <Button
                type="button"
                variant="outline"
                onClick={handleGenerateAI}
                disabled={generating}
                className="w-full sm:w-auto"
              >
                <Zap className="w-4 h-4 mr-1" />
                {generating ? "Génération en cours..." : "Générer le compte-rendu IA"}
              </Button>
              {aiSummary && (
                <div className="space-y-2">
                  <Label>Compte-rendu (modifiable)</Label>
                  <Textarea
                    value={aiSummary}
                    onChange={(e) => setAiSummary(e.target.value)}
                    rows={5}
                    className="text-sm"
                  />
                </div>
              )}
            </CardContent>
          </Card>

          <div className="flex justify-end gap-3">
            <Button type="button" variant="outline" onClick={() => navigate("/dashboard")}>
              Annuler
            </Button>
            <Button type="submit" variant="accent">
              Créer l'intervention
            </Button>
          </div>
        </form>
      </div>
    </AppLayout>
  );
};

export default NewIntervention;
