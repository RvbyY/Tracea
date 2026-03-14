import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Wrench } from "lucide-react";
import { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: integrate with auth
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-10 h-10 rounded-lg gradient-accent flex items-center justify-center">
              <Wrench className="w-5 h-5 text-accent-foreground" />
            </div>
            <span className="text-2xl font-display font-bold text-foreground">TRACEA</span>
          </Link>
          <h1 className="text-2xl font-display font-bold text-foreground">Connexion</h1>
          <p className="text-sm text-muted-foreground mt-1">Accédez à votre espace artisan</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="artisan@email.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Mot de passe</Label>
              <Link to="/forgot-password" className="text-xs text-accent hover:underline">Mot de passe oublié ?</Link>
            </div>
            <Input id="password" type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <Button type="submit" variant="accent" className="w-full">Se connecter</Button>
        </form>

        <p className="text-center text-sm text-muted-foreground mt-6">
          Pas encore de compte ?{" "}
          <Link to="/signup" className="text-accent hover:underline font-medium">Créer un compte</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
