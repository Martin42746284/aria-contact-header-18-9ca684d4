import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const backendPath = path.join(__dirname, '..', 'backend');

console.log('🚀 Starting backend server...');

const backend = spawn('npm', ['start'], {
  cwd: backendPath,
  stdio: 'inherit',
  shell: true
});

backend.on('error', (err) => {
  console.error('❌ Failed to start backend:', err);
});

backend.on('close', (code) => {
  console.log(`🔴 Backend process exited with code ${code}`);
});

// Gérer l'arrêt propre
process.on('SIGINT', () => {
  console.log('\n🛑 Stopping backend...');
  backend.kill('SIGINT');
  process.exit(0);
});

process.on('SIGTERM', () => {
  backend.kill('SIGTERM');
  process.exit(0);
});
