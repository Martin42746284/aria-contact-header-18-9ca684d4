import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { adminApi } from "@/services/api";
import { useToast } from "@/hooks/use-toast";

const AdminLoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await adminApi.login(email, password);
      
      if (response.success) {
        localStorage.setItem("isAuthenticated", "true");
        
        toast({
          title: "Connexion réussie",
          description: `Bienvenue ${response.user.name}`,
        });
        
        navigate("/dashboard");
      } else {
        setError(response.message || "Erreur de connexion");
      }
    } catch (error) {
      console.error('Erreur de connexion:', error);
      
      if (error instanceof Error) {
        if (error.message.includes('Backend non disponible')) {
          setError("Serveur indisponible. Vérifiez que le backend est démarré.");
        } else if (error.message.includes('401') || error.message.includes('incorrect')) {
          setError("Email ou mot de passe incorrect");
        } else {
          setError(error.message);
        }
      } else {
        setError("Erreur de connexion. Veuillez réessayer.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleTestConnection = async () => {
    setIsLoading(true);
    try {
      // Test avec les identifiants par défaut
      const testEmail = "admin@aria-creative.com";
      const testPassword = "admin123";
      
      const response = await adminApi.login(testEmail, testPassword);
      
      if (response.success) {
        toast({
          title: "Test de connexion",
          description: "✅ Backend connecté - Identifiants par défaut valides",
        });
        setEmail(testEmail);
        setPassword(testPassword);
      }
    } catch (error) {
      toast({
        title: "Test de connexion",
        description: "❌ Problème de connexion au backend",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black p-4">
      <div className="w-full max-w-md">
        {/* Logo et titre avec animation */}
        <div className="text-center mb-8 animate-fadeInDown">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-orange-500 to-orange-400 rounded-full mb-4 shadow-2xl shadow-orange-500/50">
            <span className="text-2xl font-bold text-black">A</span>
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">
            <span className="text-orange-400">ARIA</span> Admin
          </h1>
          <p className="text-gray-400">Connexion au tableau de bord</p>
        </div>

        {/* Formulaire */}
        <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden border border-gray-800 animate-fadeInUp">
          {/* Header du formulaire */}
          <div className="bg-gradient-to-r from-orange-500 to-orange-400 py-6 px-8">
            <h2 className="text-xl font-bold text-black">Administration</h2>
            <p className="text-black/80 text-sm">Accès sécurisé</p>
          </div>

          {/* Corps du formulaire */}
          <div className="p-8">
            {/* Messages d'erreur */}
            {error && (
              <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 text-red-400 text-sm rounded-lg animate-slideIn">
                <div className="flex items-center gap-2">
                  <span>⚠️</span>
                  <span>{error}</span>
                </div>
              </div>
            )}

            {/* Bouton de test de connexion */}
            <div className="mb-6">
              <button
                type="button"
                onClick={handleTestConnection}
                disabled={isLoading}
                className="w-full py-2 px-4 bg-blue-600/20 text-blue-400 border border-blue-500/30 rounded-lg hover:bg-blue-600/30 transition duration-300 text-sm disabled:opacity-50"
              >
                🔍 Tester la connexion backend
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-orange-300 mb-2"
                >
                  Email administrateur
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-black/50 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition duration-300 hover:border-gray-500"
                  placeholder="admin@aria-creative.com"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-orange-300 mb-2"
                >
                  Mot de passe
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 bg-black/50 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition duration-300 hover:border-gray-500 pr-12"
                    placeholder="••••••••"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-orange-400 transition duration-200"
                  >
                    {showPassword ? "👁️" : "🙈"}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-orange-500 to-orange-400 hover:from-orange-400 hover:to-orange-300 text-black font-bold py-3 px-6 rounded-lg transition duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-orange-500/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin"></div>
                    <span>Connexion en cours...</span>
                  </div>
                ) : (
                  <>
                    🔑 Se connecter
                  </>
                )}
              </button>
            </form>

            {/* Informations de test */}
            <div className="mt-8 p-4 bg-gray-800/50 rounded-lg border border-gray-700">
              <h3 className="text-orange-400 font-medium mb-2 text-sm">💡 Identifiants par défaut</h3>
              <div className="text-xs text-gray-400 space-y-1">
                <p><strong>Email:</strong> admin@aria-creative.com</p>
                <p><strong>Mot de passe:</strong> admin123</p>
                <p className="text-yellow-400 mt-2">⚠️ Changez ces identifiants en production</p>
              </div>
            </div>

            {/* Statut de la connexion */}
            <div className="mt-6 flex items-center justify-center gap-2 text-xs text-gray-500">
              <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
              <span>Connexion sécurisée SSL</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-6 text-xs text-gray-500">
          <p>© 2024 Aria Creative - Tous droits réservés</p>
        </div>
      </div>

      <style>{`
        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(-10px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .animate-fadeInDown {
          animation: fadeInDown 0.6s ease-out forwards;
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.6s ease-out 0.2s both;
        }
        .animate-slideIn {
          animation: slideIn 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default AdminLoginForm;
