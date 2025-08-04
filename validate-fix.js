#!/usr/bin/env node

// Script de validation des corrections API
console.log('🔍 Validation des corrections API...\n');

const tests = [
  {
    name: 'Frontend accessible',
    cmd: 'curl -s -o /dev/null -w "%{http_code}" http://localhost:8080',
    expected: '200'
  },
  {
    name: 'API Health via proxy',
    cmd: 'curl -s -o /dev/null -w "%{http_code}" http://localhost:8080/api/health',
    expected: '200'
  },
  {
    name: 'API Projects via proxy',
    cmd: 'curl -s -o /dev/null -w "%{http_code}" http://localhost:8080/api/projects',
    expected: '200'
  },
  {
    name: 'Backend direct',
    cmd: 'curl -s -o /dev/null -w "%{http_code}" http://localhost:3001/api/health',
    expected: '200'
  }
];

async function runTests() {
  let passed = 0;
  
  for (const test of tests) {
    try {
      const { execSync } = require('child_process');
      const result = execSync(test.cmd, { encoding: 'utf8' }).trim();
      
      if (result === test.expected) {
        console.log(`✅ ${test.name}: OK (${result})`);
        passed++;
      } else {
        console.log(`❌ ${test.name}: ÉCHEC (${result}, attendu: ${test.expected})`);
      }
    } catch (error) {
      console.log(`❌ ${test.name}: ERREUR (${error.message})`);
    }
  }
  
  console.log(`\n📊 Résultats: ${passed}/${tests.length} tests réussis`);
  
  if (passed === tests.length) {
    console.log('🎉 Toutes les corrections sont validées !');
    console.log('\n🔧 Corrections appliquées:');
    console.log('- URL API adaptée à l\'environnement cloud');
    console.log('- Proxy Vite configuré pour /api -> localhost:3001');
    console.log('- Détection automatique de l\'environnement');
    console.log('- Fallback vers les données par défaut si backend indisponible');
  } else {
    console.log('⚠️ Certains tests ont échoué');
  }
}

runTests();
