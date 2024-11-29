import { supabase } from "@/src/storage/supabase";

export const createOrder = async (
  userId: number,
  commerceId: number,
  cart: [],
  observations: string,
  deliveryObservations: string,
  optionDelivery: string,
  paymentMethod: string,
) => {
  const { data, error } = await supabase.from("orders").insert([
    {
      userId: userId ?? 4,
      commerceId,
      items: cart,
      status: "pendente",
      observations,
      deliveryObservations,
      optionDelivery,
      paymentMethod,
    },
  ]);
  if (error) {
    console.error("Erro ao criar pedido:", error);
    return null;
  }

  console.log("Pedido criado com sucesso:", data);
  return data;
};
