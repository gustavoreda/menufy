import { supabase } from "@/src/storage/supabase";

export const getOrdersByUser = async (userId: number) => {
  const { data, error } = await supabase
    .from("orders")
    .select(
      `
      *,
      commerce (*)
    `,
    )
    .eq("userId", userId ?? 4);

  if (error) {
    console.error("Erro ao buscar pedidos:", error);
    return null;
  }
  return data;
};
