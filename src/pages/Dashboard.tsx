import AppLayout from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, Calendar, TrendingUp, Clock, Filter } from "lucide-react";
import { Link } from "react-router-dom";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "@/lib/logout";
import useSessionGuard from "@/hooks/useSessionGuard";

// Mock data
const chartData = [
  { name: "Lun", count: 3 },
  { name: "Mar", count: 5 },
  { name: "Mer", count: 2 },
  { name: "Jeu", count: 7 },
  { name: "Ven", count: 4 },
  { name: "Sam", count: 1 },
  { name: "Dim", count: 0 },
];

const upcomingInterventions = [
  { id: "1", client: "M. Dupont", address: "12 rue des Lilas, Paris", date: "Aujourd'hui, 14h00", status: "à venir" },
  { id: "2", client: "Mme. Martin", address: "5 av. République, Lyon", date: "Demain, 9h30", status: "à venir" },
  { id: "3", client: "SCI Voltaire", address: "88 bd Voltaire, Paris", date: "Jeu. 7 mars, 11h00", status: "à venir" },
];

const pastInterventions = [
  { id: "4", client: "M. Bernard", address: "3 rue du Port, Nantes", date: "3 mars 2026", status: "terminée", payment: "payé", price: "450€" },
  { id: "5", client: "Mme. Leroy", address: "21 rue Pasteur, Marseille", date: "1 mars 2026", status: "terminée", payment: "non payé", price: "280€" },
  { id: "6", client: "M. Petit", address: "7 place Bellecour, Lyon", date: "27 fév 2026", status: "terminée", payment: "payé", price: "620€" },
  { id: "7", client: "SCI Haussmann", address: "15 bd Haussmann, Paris", date: "25 fév 2026", status: "terminée", payment: "partiel", price: "1 200€" },
  { id: "8", client: "M. Moreau", address: "9 rue Foch, Bordeaux", date: "20 fév 2026", status: "terminée", payment: "payé", price: "350€" },
];

const paymentBadge = (status: string) => {
  const styles: Record<string, string> = {
    "payé": "bg-success/10 text-success",
    "non payé": "bg-destructive/10 text-destructive",
    "partiel": "bg-warning/10 text-warning",
  };
  return (
    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${styles[status] || ""}`}>
      {status}
    </span>
  );
};

const Dashboard = () => {
  useSessionGuard();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const filtered = pastInterventions.filter(
    (i) =>
      i.client.toLowerCase().includes(search.toLowerCase()) ||
      i.address.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AppLayout>
      <div className="p-4 lg:p-8 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-display font-bold text-foreground">Tableau de bord</h1>
            <p className="text-sm text-muted-foreground">Bonjour, Jean 👋</p>
          </div>
          <Link to="/interventions/new">
            <Button variant="accent">
              <Plus className="w-4 h-4 mr-1" />
              Nouvelle intervention
            </Button>
          </Link>
        </div>

        {/* Top row: Chart + Upcoming */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Chart */}
          <Card className="shadow-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-display flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-accent" />
                Activité de la semaine
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData}>
                    <XAxis dataKey="name" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                    <YAxis hide />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                        fontSize: "12px",
                      }}
                    />
                    <Bar dataKey="count" fill="hsl(30 90% 52%)" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Upcoming */}
          <Card className="shadow-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-display flex items-center gap-2">
                <Calendar className="w-4 h-4 text-accent" />
                Prochaines interventions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {upcomingInterventions.map((i) => (
                  <Link
                    key={i.id}
                    to={`/interventions/${i.id}`}
                    className="flex items-center justify-between p-3 rounded-lg bg-background hover:bg-muted transition-colors border"
                  >
                    <div>
                      <p className="text-sm font-medium text-foreground">{i.client}</p>
                      <p className="text-xs text-muted-foreground">{i.address}</p>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Clock className="w-3.5 h-3.5" />
                      {i.date}
                    </div>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* History */}
        <Card className="shadow-card">
          <CardHeader className="pb-2">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <CardTitle className="text-base font-display">Historique des interventions</CardTitle>
              <div className="relative max-w-xs w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Rechercher client, adresse..."
                  className="pl-9 h-9 text-sm"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-muted-foreground border-b">
                    <th className="pb-2 font-medium">Client</th>
                    <th className="pb-2 font-medium hidden sm:table-cell">Adresse</th>
                    <th className="pb-2 font-medium">Date</th>
                    <th className="pb-2 font-medium">Prix</th>
                    <th className="pb-2 font-medium">Paiement</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((i) => (
                    <tr key={i.id} className="border-b last:border-0 hover:bg-muted/50 transition-colors">
                      <td className="py-3">
                        <Link to={`/interventions/${i.id}`} className="text-foreground hover:text-accent font-medium">
                          {i.client}
                        </Link>
                      </td>
                      <td className="py-3 text-muted-foreground hidden sm:table-cell">{i.address}</td>
                      <td className="py-3 text-muted-foreground">{i.date}</td>
                      <td className="py-3 font-medium text-foreground">{i.price}</td>
                      <td className="py-3">{paymentBadge(i.payment)}</td>
                    </tr>
                  ))}
                  {filtered.length === 0 && (
                    <tr>
                      <td colSpan={5} className="py-8 text-center text-muted-foreground">
                        Aucune intervention trouvée.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
      <button onClick={() => logout(navigate)}>
        Se déconnecter
      </button>
    </AppLayout>
  );
};

export default Dashboard;
