import AppLayout from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, FileText, Mail, Download, MapPin, Phone, Mail as MailIcon, Calendar, DollarSign, User } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { toast } from "sonner";
import useSessionGuard from "@/hooks/useSessionGuard";

// Mock detail data
const mockIntervention = {
  id: "4",
  client: "M. Bernard",
  email: "bernard@email.com",
  phone: "06 12 34 56 78",
  address: "3 rue du Port, 44000 Nantes",
  date: "3 mars 2026, 10h00",
  status: "terminée",
  payment: "payé",
  price: "450€",
  notesRaw: "Remplacement chauffe-eau 200L, mise en conformité raccordement",
  notesAI:
    "Suite à notre intervention du 3 mars 2026, nous avons procédé au remplacement complet du chauffe-eau (capacité 200L) ainsi qu'à la mise en conformité de l'ensemble des raccordements. Les travaux ont été réalisés dans les règles de l'art et conformément aux normes en vigueur. L'installation a été vérifiée et testée. Le client a été informé des recommandations d'entretien. Des photographies avant et après intervention sont jointes au présent compte-rendu.",
  photosBefore: ["/placeholder.svg"],
  photosAfter: ["/placeholder.svg"],
  pdfUrl: null as string | null,
};

const statusLabel: Record<string, string> = {
  "à venir": "À venir",
  "en cours": "En cours",
  "terminée": "Terminée",
};

const paymentStyles: Record<string, string> = {
  "payé": "bg-success/10 text-success border-success/20",
  "non payé": "bg-destructive/10 text-destructive border-destructive/20",
  "partiel": "bg-warning/10 text-warning border-warning/20",
};

const InterventionDetail = () => {
  useSessionGuard();
  const { id } = useParams();
  const intervention = mockIntervention; // In real app, fetch by id

  const handleGeneratePDF = () => {
    toast.success("PDF généré avec succès !");
  };

  const handleSendEmail = () => {
    toast.success("PDF envoyé par email au client et à vous-même !");
  };

  return (
    <AppLayout>
      <div className="p-4 lg:p-8 max-w-3xl mx-auto space-y-6">
        {/* Back + Header */}
        <div className="flex items-center gap-3">
          <Link to="/dashboard">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <div className="flex-1">
            <h1 className="text-2xl font-display font-bold text-foreground">
              Intervention #{id}
            </h1>
            <p className="text-sm text-muted-foreground">{intervention.client}</p>
          </div>
          <Badge variant="outline" className={paymentStyles[intervention.payment]}>
            {intervention.payment}
          </Badge>
        </div>

        {/* Client info */}
        <Card className="shadow-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-display flex items-center gap-2">
              <User className="w-4 h-4 text-accent" />
              Client
            </CardTitle>
          </CardHeader>
          <CardContent className="grid sm:grid-cols-2 gap-3 text-sm">
            <div className="flex items-center gap-2 text-foreground">
              <User className="w-4 h-4 text-muted-foreground" />
              {intervention.client}
            </div>
            <div className="flex items-center gap-2 text-foreground">
              <MailIcon className="w-4 h-4 text-muted-foreground" />
              {intervention.email}
            </div>
            <div className="flex items-center gap-2 text-foreground">
              <Phone className="w-4 h-4 text-muted-foreground" />
              {intervention.phone}
            </div>
            <div className="flex items-center gap-2 text-foreground">
              <MapPin className="w-4 h-4 text-muted-foreground" />
              {intervention.address}
            </div>
          </CardContent>
        </Card>

        {/* Details */}
        <Card className="shadow-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-display flex items-center gap-2">
              <Calendar className="w-4 h-4 text-accent" />
              Détails
            </CardTitle>
          </CardHeader>
          <CardContent className="grid sm:grid-cols-3 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground block mb-1">Date</span>
              <span className="font-medium text-foreground">{intervention.date}</span>
            </div>
            <div>
              <span className="text-muted-foreground block mb-1">Statut</span>
              <span className="font-medium text-foreground">{statusLabel[intervention.status]}</span>
            </div>
            <div>
              <span className="text-muted-foreground block mb-1">Prix</span>
              <span className="font-medium text-foreground">{intervention.price}</span>
            </div>
          </CardContent>
        </Card>

        {/* Photos */}
        <Card className="shadow-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-display">Photos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-muted-foreground font-medium mb-2">AVANT</p>
                <div className="grid grid-cols-2 gap-2">
                  {intervention.photosBefore.map((p, i) => (
                    <div key={i} className="aspect-square bg-muted rounded-lg border flex items-center justify-center">
                      <img src={p} alt={`Avant ${i + 1}`} className="w-full h-full object-cover rounded-lg" />
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs text-muted-foreground font-medium mb-2">APRÈS</p>
                <div className="grid grid-cols-2 gap-2">
                  {intervention.photosAfter.map((p, i) => (
                    <div key={i} className="aspect-square bg-muted rounded-lg border flex items-center justify-center">
                      <img src={p} alt={`Après ${i + 1}`} className="w-full h-full object-cover rounded-lg" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Notes & AI */}
        <Card className="shadow-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-display">Compte-rendu</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-xs text-muted-foreground font-medium mb-1">NOTES ARTISAN</p>
              <p className="text-sm text-foreground">{intervention.notesRaw}</p>
            </div>
            <div className="border-t pt-4">
              <p className="text-xs text-muted-foreground font-medium mb-1">COMPTE-RENDU PROFESSIONNEL (IA)</p>
              <p className="text-sm text-foreground leading-relaxed">{intervention.notesAI}</p>
            </div>
          </CardContent>
        </Card>

        {/* PDF Actions */}
        <Card className="shadow-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-display flex items-center gap-2">
              <FileText className="w-4 h-4 text-accent" />
              Document PDF
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-3">
              <Button variant="accent" onClick={handleGeneratePDF}>
                <FileText className="w-4 h-4 mr-1" />
                Générer PDF
              </Button>
              <Button variant="outline" onClick={handleSendEmail}>
                <Mail className="w-4 h-4 mr-1" />
                Envoyer par email
              </Button>
              <Button variant="outline">
                <Download className="w-4 h-4 mr-1" />
                Télécharger PDF
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default InterventionDetail;
