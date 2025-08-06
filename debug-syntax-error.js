#!/usr/bin/env node

console.log('🔍 Debug - Recherche erreur syntaxe...\n');

// Test basic JavaScript syntax
try {
  console.log('✅ JavaScript de base fonctionne');
} catch (error) {
  console.error('❌ Erreur JavaScript de base:', error.message);
}

// Test JSON parsing with potential problematic JSON
const testJsons = [
  '{"test": "valid"}',
  '{"test": "valid"', // Manque }
  '{"test": "valid"}}', // } supplémentaire
  '{"test": "valid",}', // Virgule supplémentaire
  '{"test": "valid" "other": "value"}', // Manque virgule
  ''
];

console.log('\n📄 Test JSON parsing:');
testJsons.forEach((jsonStr, index) => {
  try {
    JSON.parse(jsonStr);
    console.log(`✅ JSON ${index + 1}: OK`);
  } catch (error) {
    console.error(`❌ JSON ${index + 1}: ${error.message}`);
    console.error(`   Content: "${jsonStr}"`);
  }
});

// Test import statements
console.log('\n📦 Test imports basiques:');
try {
  // Test d'import simple sans fichier externe
  const testObj = { test: 'value' };
  console.log('✅ Objets JavaScript OK');
} catch (error) {
  console.error('❌ Erreur objets:', error.message);
}

// Test potential async/await issues
console.log('\n⚡ Test async/await:');
async function testAsync() {
  try {
    const result = await Promise.resolve('test');
    console.log('✅ Async/await OK:', result);
  } catch (error) {
    console.error('❌ Erreur async/await:', error.message);
  }
}

testAsync();

console.log('\n🎯 Debug terminé');
