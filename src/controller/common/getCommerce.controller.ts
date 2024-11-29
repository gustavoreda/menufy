import { supabase } from "@/src/storage/supabase";

export const getCommerce = async (id?: string) => {
  const { data, error } =
    id === undefined
      ? await supabase.from("commerce").select("*")
      : await supabase.from("commerce").select("*").eq("id", id);

  if (error) {
    console.error("Erro ao buscar os comércios:", error);
    return [];
  }

  return data;
};
