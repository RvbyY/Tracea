import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Clock, FileText, Camera, Search, Zap } from "lucide-react";
import { motion } from "framer-motion";
import heroImage from "@/assets/hero-image.jpg";
import MarketingNav from "@/components/marketing/MarketingNav";

const features = [
  {
    icon: Camera,
    title: "Photos avant / après",
    description: "Documentez chaque intervention avec des photos horodatées pour une traçabilité complète.",
  },
  {
    icon: Zap,
    title: "Compte-rendu IA",
    description: "Écrivez 2 lignes, l'IA génère un compte-rendu professionnel prêt pour l'assurance.",
  },
  {
    icon: FileText,
    title: "PDF automatique",
    description: "Générez et envoyez un PDF complet au client et à vous-même en un clic.",
  },
  {
    icon: Search,
    title: "Recherche instantanée",
    description: "Retrouvez n'importe quelle intervention en quelques secondes, même 6 mois après.",
  },
  {
    icon: Shield,
    title: "Preuve en cas de litige",
    description: "Chaque intervention est documentée avec un identifiant unique et un PDF archivé.",
  },
  {
    icon: Clock,
    title: "Gain de temps",
    description: "Fini le carnet et les tableurs. Tout est centralisé en une seule application.",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5 },
  }),
};

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <MarketingNav />

      {/* Hero */}
      <section className="pt-28 pb-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-medium mb-6">
                <Zap className="w-4 h-4" />
                Pour les artisans modernes
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold tex  t-foreground leading-tight mb-6">
                Vos interventions,{" "}
                <span className="text-accent">documentées et protégées</span>
              </h1>
              <p className="text-lg text-muted-foreground mb-8 max-w-lg">
                Planifiez, documentez et générez des preuves PDF pour chaque intervention. 
                En cas de litige, retrouvez tout en 30 secondes.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button variant="hero" size="lg" className="w-full sm:w-auto" asChild>
                  <Link to="/signup">
                    Commencer gratuitement
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Link>
                </Button>
                <Button variant="hero-outline" size="lg" className="w-full sm:w-auto" asChild>
                  <Link to="/pricing">
                    Voir les tarifs
                  </Link>
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="rounded-2xl overflow-hidden shadow-elevated border">
                <img src={heroImage} alt="Interface TRACEA - gestion d'interventions pour artisans" className="w-full h-auto" />
              </div>
              <div className="absolute -bottom-4 -left-4 w-24 h-24 rounded-2xl gradient-accent opacity-20 blur-2xl" />
              <div className="absolute -top-4 -right-4 w-32 h-32 rounded-full gradient-hero opacity-10 blur-3xl" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4 bg-card">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
              Tout ce dont vous avez besoin
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Un outil conçu par et pour les artisans. Simple, rapide, efficace.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="group p-6 rounded-xl border bg-background hover:shadow-elevated transition-shadow duration-300"
              >
                <div className="w-11 h-11 rounded-lg bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                  <f.icon className="w-5 h-5 text-accent" />
                </div>
                <h3 className="text-lg font-display font-semibold text-foreground mb-2">{f.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{f.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
              Prêt à simplifier votre quotidien ?
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              Rejoignez les artisans qui gagnent du temps et se protègent avec TRACEA.
            </p>
            <Button variant="accent" size="lg" asChild>
              <Link to="/signup">
                Créer mon compte
                <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8 px-4">
        <div className="container mx-auto max-w-6xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-sm text-muted-foreground">© 2026 TRACEA. Tous droits réservés.</span>
          <div className="flex gap-6">
            <Link to="/pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Tarifs</Link>
            <Link to="/login" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Connexion</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
