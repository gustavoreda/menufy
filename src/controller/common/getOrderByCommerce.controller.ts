import { supabase } from "@/src/storage/supabase";

export const getOrdersByCommerce = async (commerceId: number) => {
  const { data, error } = await supabase
    .from("orders")
    .select(
      `
      *,
      commerce (*)
    `,
    )
    .eq("commerceId", commerceId);

  if (error) {
    console.error("Erro ao buscar pedidos por commerceId:", error);
    return null;
  }
  return data;
};
