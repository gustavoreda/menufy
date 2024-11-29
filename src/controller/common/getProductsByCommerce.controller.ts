import { supabase } from "@/src/storage/supabase";

export const getProductsByCommerce = async (commerceId: number) => {
  const { data, error } = await supabase
    .from("commerce")
    .select("products")
    .eq("id", commerceId);

  if (error) {
    console.error("Erro ao buscar produtos:", error.message);
    return null;
  }

  return data;
};
