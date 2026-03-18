import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Check, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import MarketingNav from "@/components/marketing/MarketingNav";

const plans = [
  {
    name: "Solo",
    price: "40",
    period: "/mois",
    description: "Pour l'artisan indépendant",
    features: [
      "1 utilisateur",
      "Interventions illimitées",
      "Photos avant/après",
      "Compte-rendu IA",
      "Génération PDF",
      "Envoi par email",
      "Historique complet",
    ],
    cta: "Commencer",
    popular: false,
  },
  {
    name: "Équipe",
    price: "80",
    period: "/mois",
    description: "Pour les petites équipes",
    features: [
      "Jusqu'à 3 utilisateurs",
      "Tout du plan Solo",
      "Planning partagé",
      "Gestion d'équipe",
      "Tableau de bord équipe",
    ],
    cta: "Commencer",
    popular: true,
  },
  {
    name: "Sur mesure",
    price: "Sur devis",
    period: "",
    description: "Pour les équipes de + de 3",
    features: [
      "Utilisateurs illimités",
      "Tout du plan Équipe",
      "Accès multi-comptes",
      "Support prioritaire",
      "Onboarding dédié",
    ],
    cta: "Nous contacter",
    popular: false,
  },
];

const faqs = [
  {
    q: "Puis-je tester avant de m'abonner ?",
    a: "Oui, vous bénéficiez d'un essai gratuit de 14 jours avec toutes les fonctionnalités.",
  },
  {
    q: "Comment fonctionne la génération IA ?",
    a: "Vous écrivez 1 à 2 lignes décrivant votre intervention, et l'IA génère un paragraphe professionnel adapté assurance/litige.",
  },
  {
    q: "Les données sont-elles sécurisées ?",
    a: "Oui, toutes les données sont chiffrées et hébergées en Europe. Chaque intervention a un identifiant unique.",
  },
  {
    q: "Puis-je annuler à tout moment ?",
    a: "Oui, aucun engagement. Vous pouvez annuler votre abonnement à tout moment depuis vos paramètres.",
  },
];

const Pricing = () => {
  return (
    <div className="min-h-screen bg-background">
      <MarketingNav />

      <section className="pt-28 pb-20 px-4">
        <div className="container mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4">
              Des tarifs simples et transparents
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">
              Choisissez le plan adapté à votre activité. Sans engagement.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {plans.map((plan, i) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className={`relative p-6 rounded-2xl border bg-card ${
                  plan.popular ? "border-accent shadow-elevated ring-2 ring-accent/20" : "shadow-card"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full gradient-accent text-accent-foreground text-xs font-semibold">
                    Populaire
                  </div>
                )}
                <h3 className="text-xl font-display font-bold text-foreground mb-1">{plan.name}</h3>
                <p className="text-sm text-muted-foreground mb-4">{plan.description}</p>
                <div className="mb-6">
                  <span className="text-4xl font-display font-bold text-foreground">{plan.price}</span>
                  {plan.period && <span className="text-muted-foreground">€{plan.period}</span>}
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-foreground">
                      <Check className="w-4 h-4 text-success shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Button
                  variant={plan.popular ? "accent" : "outline"}
                  className="w-full"
                  onClick={() => {
                    if (plan.name === "Sur mesure") {
                      window.open("https://docs.google.com/forms/d/e/1FAIpQLSd4rhtJs3NxEdaHmuGVaOX8Gl4wGRr0kTq5hDvs71IzwkFqHw/viewform?usp=header", "_blank");
                    } else {
                      window.location.href = "/signup";
                    }
                  }}
                >
                  {plan.cta}
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-4 bg-card">
        <div className="container mx-auto max-w-3xl">
          <h2 className="text-3xl font-display font-bold text-foreground text-center mb-12">
            Questions fréquentes
          </h2>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <div key={faq.q} className="p-5 rounded-xl border bg-background">
                <h3 className="font-semibold text-foreground mb-2">{faq.q}</h3>
                <p className="text-sm text-muted-foreground">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t py-8 px-4">
        <div className="container mx-auto max-w-6xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-sm text-muted-foreground">© 2026 TRACEA. Tous droits réservés.</span>
          <div className="flex gap-6">
            <Link to="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Accueil</Link>
            <Link to="/login" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Connexion</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Pricing;
