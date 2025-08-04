// Utilitaire pour tester les services et détecter les erreurs

import { getClientProjects, getAllAdminProjects } from '@/services/projectsService';
import { healthApi } from '@/services/api';

export const testServices = async () => {
  console.log('🧪 Test des services...');
  
  try {
    // Test 1: Santé de l'API
    console.log('1. Test de santé de l\'API...');
    try {
      await healthApi.checkHealth();
      console.log('✅ API disponible');
    } catch (error) {
      console.log('⚠️ API indisponible, mode fallback actif');
    }

    // Test 2: Récupération des projets clients
    console.log('2. Test des projets clients...');
    const clientProjects = await getClientProjects();
    console.log(`✅ ${clientProjects.length} projets clients récupérés`);

    // Test 3: Récupération des projets admin
    console.log('3. Test des projets admin...');
    const adminProjects = await getAllAdminProjects();
    console.log(`✅ ${adminProjects.length} projets admin récupérés`);

    console.log('✅ Tous les tests passés');
    return true;
  } catch (error) {
    console.error('❌ Erreur lors des tests:', error);
    return false;
  }
};

// Auto-test au chargement en mode développement
if (import.meta.env.DEV) {
  testServices();
}
