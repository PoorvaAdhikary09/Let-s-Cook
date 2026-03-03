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
    'Supabase will not be configured correctly.'
  );
}

// Single environment.ts — works for both dev and prod builds.
// The generate-env.js script is only run during CI/Vercel builds.
const envContent = `export const environment = {
  production: true,
  supabaseUrl: '${supabaseUrl}',
  supabaseAnonKey: '${supabaseAnonKey}'
};
`;

fs.writeFileSync(path.join(envDir, 'environment.ts'), envContent);

console.log('✅ environment.ts generated successfully from environment variables.');
