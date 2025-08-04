#!/usr/bin/env node

// Script de test pour vérifier l'intégration frontend-backend avec Neon
import fetch from 'node-fetch';

const BACKEND_URL = 'http://localhost:3001/api';
const FRONTEND_URL = 'http://localhost:8080';

const tests = [
  {
    name: '🏥 Backend Health Check',
    url: `${BACKEND_URL}/health`,
    method: 'GET'
  },
  {
    name: '📄 Projets publics',
    url: `${BACKEND_URL}/projects`,
    method: 'GET'
  },
  {
    name: '📱 Frontend disponible',
    url: FRONTEND_URL,
    method: 'GET',
    expectHtml: true
  }
];

async function runTest(test) {
  try {
    const response = await fetch(test.url, {
      method: test.method,
      headers: {
        'Origin': FRONTEND_URL,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    let data;
    if (test.expectHtml) {
      data = await response.text();
      if (!data.includes('<div id="root">')) {
        throw new Error('Frontend ne contient pas le div root');
      }
    } else {
      data = await response.json();
    }

    console.log(`✅ ${test.name}: OK`);
    
    if (!test.expectHtml && data) {
      if (data.success !== undefined) {
        console.log(`   - Success: ${data.success}`);
      }
      if (data.projects) {
        console.log(`   - Projets trouvés: ${data.projects.length}`);
      }
      if (data.status) {
        console.log(`   - Status: ${data.status}`);
      }
    }
    
    return true;
  } catch (error) {
    console.log(`❌ ${test.name}: ÉCHEC`);
    console.log(`   - Erreur: ${error.message}`);
    return false;
  }
}

async function main() {
  console.log('🧪 Tests d\'intégration Aria Creative\n');
  console.log('📍 Backend:', BACKEND_URL);
  console.log('📍 Frontend:', FRONTEND_URL);
  console.log('🗄️ Base de données: Neon PostgreSQL\n');

  let passedTests = 0;
  
  for (const test of tests) {
    const result = await runTest(test);
    if (result) passedTests++;
    console.log('');
  }

  console.log(`📊 Résultats: ${passedTests}/${tests.length} tests réussis`);
  
  if (passedTests === tests.length) {
    console.log('🎉 Tous les tests passent ! L\'application est fonctionnelle.');
    
    console.log('\n🔗 Liens utiles:');
    console.log(`   - Frontend: ${FRONTEND_URL}`);
    console.log(`   - API Backend: ${BACKEND_URL}`);
    console.log(`   - API Health: ${BACKEND_URL}/health`);
    console.log(`   - API Projets: ${BACKEND_URL}/projects`);
    console.log(`   - Admin Login: ${FRONTEND_URL}/admin`);
    
  } else {
    console.log('⚠️ Certains tests ont échoué. Vérifiez la configuration.');
    process.exit(1);
  }
}

main().catch(console.error);
