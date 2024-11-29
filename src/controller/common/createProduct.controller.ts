import { supabase } from "@/src/storage/supabase";

type Product = {
  commerceId: number;
  name: string;
  ingredients: string;
  value: number;
  type: string;
};

export const createProduct = async ({
  commerceId,
  name,
  ingredients,
  value,
  type,
}: Product) => {
  const productData = {
    name,
    ingredients,
    value,
    type,
  };

  const { data: currentData, error: fetchError } = await supabase
    .from("commerce")
    .select("products")
    .eq("id", commerceId)
    .single();

  if (fetchError) {
    console.error("Error fetching current products:", fetchError);
    return null;
  }

  const updatedProducts = [...(currentData.products || []), productData];

  const { data, error } = await supabase
    .from("commerce")
    .update({ products: updatedProducts })
    .eq("id", commerceId);

  if (error) {
    console.error("Error inserting product:", error);
    return null;
  }

  console.log("Product inserted successfully:", data);
  return data;
};
