// ═══════════════════════════════════════════════════════
// MVGN Labs — Post-build: Protect /support/ with StatiCrypt
// ═══════════════════════════════════════════════════════
// Reads password from STATICRYPT_PASSWORD env var.
// Encrypts all HTML files in dist/support/ recursively.
// ═══════════════════════════════════════════════════════

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// ── Load .env manually (no dotenv dependency needed) ──
const envPath = path.resolve(__dirname, '..', '.env');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf-8');
  for (const line of envContent.split('\n')) {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#') && trimmed.includes('=')) {
      const eqIdx = trimmed.indexOf('=');
      const key = trimmed.slice(0, eqIdx).trim();
      const value = trimmed.slice(eqIdx + 1).trim();
      // Only set if not already defined (env vars take precedence)
      if (!process.env[key]) {
        process.env[key] = value;
      }
    }
  }
}

const DIST = path.resolve(__dirname, '..', 'dist', 'support');
const PASSWORD = process.env.STATICRYPT_PASSWORD;

if (!PASSWORD) {
  console.error('❌ STATICRYPT_PASSWORD environment variable not set. Skipping encryption.');
  process.exit(0);
}

if (!fs.existsSync(DIST)) {
  console.log('📁 No dist/support/ directory found. Skipping encryption.');
  process.exit(0);
}

// Find all index.html files in support subdirectories
const findHtmlFiles = (dir) => {
  const files = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...findHtmlFiles(fullPath));
    } else if (entry.name.endsWith('.html')) {
      files.push(fullPath);
    }
  }
  return files;
};

const htmlFiles = findHtmlFiles(DIST);

if (htmlFiles.length === 0) {
  console.log('📁 No HTML files found in dist/support/. Skipping encryption.');
  process.exit(0);
}

console.log(`🔒 Encrypting ${htmlFiles.length} support page(s) with StatiCrypt...`);

let successCount = 0;
let failCount = 0;

for (const file of htmlFiles) {
  const dir = path.dirname(file);
  const templatePath = path.resolve(__dirname, '..', 'src', 'staticrypt-template.html');
  const cmd = `npx staticrypt "${file}" -p "${PASSWORD}" -d "${dir}" -t "${templatePath}" --config false` +
    ` --template-instructions "Ingresa tu contraseña de acceso para continuar."` +
    ` --template-placeholder "••••••••"` +
    ` --template-button "Desbloquear acceso"` +
    ` --template-error "Contraseña incorrecta. Intenta de nuevo."` +
    ` --template-remember "Recordar acceso en este dispositivo"` +
    ` --template-color-primary "#DC2626"` +
    ` --template-toggle-show "Mostrar contraseña"` +
    ` --template-toggle-hide "Ocultar contraseña"`;
  const relativePath = path.relative(DIST, file);
  try {
    console.log(`   → ${relativePath}`);
    execSync(cmd, { stdio: 'ignore', cwd: path.resolve(__dirname, '..') });
    successCount++;
  } catch (err) {
    console.error(`   ✗ ${relativePath} — encryption failed: ${err.message}`);
    failCount++;
  }
}

if (failCount === 0) {
  console.log(`✅ ${successCount} support page(s) encrypted successfully.`);
} else {
  console.error(`⚠️ ${successCount} encrypted, ${failCount} failed.`);
}

