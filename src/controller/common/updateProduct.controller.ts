import { supabase } from "@/src/storage/supabase";

export const updateProduct = async (
  commerceId: string,
  nameProduct: string,
  newProductData: Record<string, any>,
) => {
  try {
    const { data, error: fetchError } = await supabase
      .from("commerce")
      .select("products")
      .eq("id", commerceId)
      .single();

    if (fetchError) throw fetchError;

    const products = data?.products || [];

    const updatedProducts = products.map((product: any) => {
      if (product.name === nameProduct) {
        return { ...product, ...newProductData };
      }
      return product;
    });

    const { error: updateError } = await supabase
      .from("commerce")
      .update({ products: updatedProducts })
      .eq("id", commerceId);

    if (updateError) throw updateError;

    console.log("Produto atualizado com sucesso!");
  } catch (error) {
    console.error("Erro ao atualizar o produto:", error);
  }
};
