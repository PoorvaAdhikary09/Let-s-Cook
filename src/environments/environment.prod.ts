export const environment = {
  production: true,
  supabaseUrl: (window as any).__env?.supabaseUrl || '',
  supabaseAnonKey: (window as any).__env?.supabaseAnonKey || ''
};