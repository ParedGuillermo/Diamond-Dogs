import { createClient } from '@supabase/supabase-js';

// Reemplaza estas URLs con tus propias variables de entorno
const supabaseUrl = 'https://ucpsmyivlobcaayxvcjc.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVjcHNteWl2bG9iY2FheXh2Y2pjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkyMjMxNzEsImV4cCI6MjA2NDc5OTE3MX0.GDSAbpVbD9EA2o9rEdSpybJ5Wn4RlZ7k_UOaGmP79a0';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);