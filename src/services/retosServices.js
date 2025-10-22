import { supabase } from "../supabaseClient";

export async function cargarRetos(mode, difficulty) {
    
  const { data, error } = await supabase
    .from("retos")
    .select("*")
    .eq("categoria_id", mode)
    .eq("nivel_id", difficulty);

  if (error) console.error(error);
  if (data) {

   
    return data;
  }
}
