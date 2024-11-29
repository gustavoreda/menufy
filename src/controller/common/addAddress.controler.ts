import { supabase } from "@/src/storage/supabase";

type UpdateAddressType = {
  userId: number;
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

export const updateAddress = async ({ userId, address }: UpdateAddressType) => {
  const { error } = await supabase
    .from("users")
    .update({
      address: address,
    })
    .eq("id", userId);

  if (error) {
    console.error("Erro ao atualizar o endereç:", error);
    return;
  }
};
