import { supabase } from "@/src/storage/supabase";

export const updateOrder = async (
  commerceId: number,
  orderId: number,
  status: string,
) => {
  const { data, error } = await supabase
    .from("orders")
    .update({ status: status })
    .eq("commerceId", commerceId)
    .eq("id", orderId);

  if (error) {
    console.error("Erro ao atualizar pedido:", error);
    return null;
  }

  return data;
};
