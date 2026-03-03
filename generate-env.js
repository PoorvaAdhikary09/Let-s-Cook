const fs = require('fs');
const path = require('path');

const envDir = path.join(__dirname, 'src', 'environments');

// Ensure the directory exists
if (!fs.existsSync(envDir)) {
  fs.mkdirSync(envDir, { recursive: true });
}

const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    'WARNING: SUPABASE_URL or SUPABASE_ANON_KEY environment variables are not set. ' +
    'The build will proceed but Supabase will not be configured.'
  );
}

// environment.ts (used for development builds)
const envContent = `export const environment = {
  production: false,
  supabaseUrl: '${supabaseUrl}',
  supabaseAnonKey: '${supabaseAnonKey}'
};
`;

// environment.prod.ts (used for production builds on Vercel)
const envProdContent = `export const environment = {
  production: true,
  supabaseUrl: '${supabaseUrl}',
  supabaseAnonKey: '${supabaseAnonKey}'
};
`;

fs.writeFileSync(path.join(envDir, 'environment.ts'), envContent);
fs.writeFileSync(path.join(envDir, 'environment.prod.ts'), envProdContent);

console.log('✅ Environment files generated successfully from environment variables.');
