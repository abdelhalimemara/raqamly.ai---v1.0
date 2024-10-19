import { supabase } from '../lib/supabaseClient';

async function testSupabaseConnection() {
  try {
    console.log("Testing Supabase connection...");
    const { data, error } = await supabase.from('products').select('*').limit(5);
    
    if (error) {
      throw error;
    }
    
    console.log("Supabase connection successful. Sample data:", data);
  } catch (error) {
    console.error("Error connecting to Supabase:", error);
  }
}

testSupabaseConnection();