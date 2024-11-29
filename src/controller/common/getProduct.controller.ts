import { supabase } from "@/src/storage/supabase";

export const getProductByName = async (
  commerceId: string,
  nameProduct: string,
) => {
  try {
    const { data, error: fetchError } = await supabase
      .from("commerce")
      .select("products")
      .eq("id", commerceId)
      .single();

    if (fetchError) throw fetchError;

    const products = data?.products || [];

    const product = products.find(
      (product: any) => product.name === nameProduct,
    );

    if (!product) {
      throw new Error(
        `Produto com o nome "${nameProduct}" não foi encontrado.`,
      );
    }

    return product;
  } catch (error) {
    console.error("Erro ao buscar produto:", error);
    throw error;
  }
};
