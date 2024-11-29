import { supabase } from "@/src/storage/supabase";

type UpdateCommerceType = {
  commerceId: number;
  name: string;
  score: number;
  description: string;
  picture: string;
  deliveryTime: string;
  address: {
    cep: string;
    street: string;
    number: string;
    complement: string;
    neighborhood: string;
    city: string;
    state: string;
  };
};

export const updateCommerce = async ({
  commerceId,
  name,
  score,
  description,
  picture,
  deliveryTime,
  address,
}: UpdateCommerceType) => {
  const { error: commerceError } = await supabase
    .from("commerce")
    .update({
      name: name.trim(),
      score,
      description: description.trim(),
      picture: picture.trim(),
      deliveryTime: deliveryTime.trim(),
      address: address,
    })
    .eq("id", commerceId);

  if (commerceError) {
    console.error("Erro ao atualizar o comércio:", commerceError);
    return;
  }
};
