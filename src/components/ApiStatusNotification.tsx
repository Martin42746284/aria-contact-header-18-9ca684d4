import { useState, useEffect } from 'react';
import { healthApi } from '@/services/api';

const ApiStatusNotification = () => {
  const [isApiAvailable, setIsApiAvailable] = useState<boolean | null>(null);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    const checkApiStatus = async () => {
      try {
        await healthApi.checkHealth();
        setIsApiAvailable(true);
        setShowNotification(false);
      } catch (error) {
        setIsApiAvailable(false);
        setShowNotification(true);
      }
    };

    // Vérifier immédiatement
    checkApiStatus();

    // Vérifier toutes les 30 secondes
    const interval = setInterval(checkApiStatus, 30000);

    return () => clearInterval(interval);
  }, []);

  // Auto-hide après 10 secondes si l'API devient disponible
  useEffect(() => {
    if (isApiAvailable && showNotification) {
      const timer = setTimeout(() => {
        setShowNotification(false);
      }, 10000);
      return () => clearTimeout(timer);
    }
  }, [isApiAvailable, showNotification]);

  if (!showNotification || isApiAvailable === null) {
    return null;
  }

  return (
    <div className="fixed top-4 right-4 z-50 animate-fade-in">
      {!isApiAvailable ? (
        <div className="bg-yellow-900/90 border border-yellow-500/50 backdrop-blur-lg rounded-lg p-4 max-w-sm shadow-lg">
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse"></div>
          
            <button
              onClick={() => setShowNotification(false)}
              className="text-yellow-400 hover:text-yellow-300 transition-colors"
              aria-label="Fermer"
            >
              ×
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-green-900/90 border border-green-500/50 backdrop-blur-lg rounded-lg p-4 max-w-sm shadow-lg">
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <div>
              <h4 className="text-green-200 font-medium text-sm">Backend Connecté</h4>
              <p className="text-green-100 text-xs">
                API disponible et fonctionnelle.
              </p>
            </div>
            <button
              onClick={() => setShowNotification(false)}
              className="text-green-400 hover:text-green-300 transition-colors"
              aria-label="Fermer"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ApiStatusNotification;
