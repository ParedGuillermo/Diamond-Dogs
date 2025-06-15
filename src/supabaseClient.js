import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://yszrlfwlnyikfntzscsg.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlzenJsZndsbnlpa2ZudHpzY3NnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk4NTY3NzIsImV4cCI6MjA2NTQzMjc3Mn0.NItMPcI6f5WgZqERPaYfiX24f0P6uMzRsRuimnxWvGQ";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
