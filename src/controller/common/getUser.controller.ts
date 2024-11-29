import { supabase } from "@/src/storage/supabase";

export const getUser = async (id: number) => {
  const { data, error } = await supabase.from("users").select("*").eq("id", id);

  if (error) {
    console.error("Erro ao buscar usuários/comércios:", error);
    return [];
  }

  return data;
};
