import { supabase } from "@/src/storage/supabase";

export const cancelOrder = async (userId: number, orderId: number) => {
  const { data, error } = await supabase
    .from("orders")
    .update({ status: "cancelado" })
    .eq("userId", userId)
    .eq("id", orderId);

  if (error) {
    console.error("Erro ao cancelar pedido:", error);
    return null;
  }

  return data;
};
