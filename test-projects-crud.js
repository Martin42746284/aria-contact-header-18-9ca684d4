#!/usr/bin/env node

// Script de test pour vérifier le CRUD des projets
const API_BASE = 'http://localhost:3001/api';

// Simuler une authentification simple (dans un vrai cas, on récupérerait le token)
const testAuth = 'Bearer fake-token'; // Pour les tests

const testProject = {
  title: "Test Project CRUD",
  description: "Projet de test pour vérifier le système CRUD des projets admin",
  technologies: ["JavaScript", "Node.js", "Test"],
  client: "Test Client",
  duration: "1 semaine",
  status: "EN_ATTENTE",
  url: "https://example.com",
  imageUrl: ""
};

async function makeRequest(endpoint, options = {}) {
  const url = `${API_BASE}${endpoint}`;
  
  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': testAuth,
      ...options.headers
    }
  };

  try {
    console.log(`🔗 ${options.method || 'GET'} ${url}`);
    
    const response = await fetch(url, { ...defaultOptions, ...options });
    const data = await response.json();
    
    console.log(`📊 Status: ${response.status}`);
    console.log(`📄 Response:`, JSON.stringify(data, null, 2));
    
    return { response, data };
  } catch (error) {
    console.error(`❌ Erreur:`, error.message);
    return { error };
  }
}

async function testProjectCRUD() {
  console.log('\n🚀 === TEST CRUD PROJETS ===\n');

  // 1. Test GET health
  console.log('1️⃣ Test santé du serveur');
  await makeRequest('/health');

  // 2. Test GET projets publics
  console.log('\n2️⃣ Test récupération projets publics');
  await makeRequest('/projects');

  // 3. Test GET projets admin (sans auth - devrait échouer)
  console.log('\n3️⃣ Test récupération projets admin (sans auth)');
  await makeRequest('/projects/admin');

  // 4. Test POST création projet (sans auth - devrait échouer)
  console.log('\n4️⃣ Test création projet (sans auth)');
  await makeRequest('/projects', {
    method: 'POST',
    body: JSON.stringify(testProject)
  });

  console.log('\n✅ Tests terminés\n');
}

// Exécuter les tests
testProjectCRUD().catch(console.error);
