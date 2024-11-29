import { supabase } from "@/src/storage/supabase";

const checkIfEmailExists = async (email: string) => {
  try {
    const { data: usersData, error: usersError } = await supabase
      .from("users")
      .select("*")
      .eq("email", email)
      .single();

    if (usersError && usersError.code !== "PGRST116") {
      console.error("Erro ao verificar o e-mail em 'users':", usersError);
      return null;
    }

    if (usersData) {
      console.log("Usuário encontrado:", usersData);
      return { type: "user", data: usersData };
    }

    const { data: commerceData, error: commerceError } = await supabase
      .from("commerce")
      .select("*")
      .eq("email", email)
      .single();

    if (commerceError && commerceError.code !== "PGRST116") {
      console.error("Erro ao verificar o e-mail em 'commerce':", commerceError);
      return null;
    }

    if (commerceData) {
      console.log("Comércio encontrado:", commerceData);
      console.log(commerceData);
      return { type: "commerce", data: commerceData };
    }

    return null;
  } catch (error) {
    console.error("Erro geral ao verificar o e-mail:", error);
    return null;
  }
};

export const login = async (
  name: string,
  email: string,
  picture: string,
  userType: string,
) => {
  const emailExists = await checkIfEmailExists(email);
  if (emailExists) {
    console.log("E-mail já cadastrado!");
    return emailExists;
  }
  if (userType === "user") {
    const { data, error } = await supabase
      .from("users")
      .insert({ email: email, name: name, photoUrl: picture })
      .select();

    console.log("Usuário cadastrado com sucesso!");
    if (error) {
      console.error("Erro ao registrar o usuário:", error);
      return null;
    }
    return data ? data[0].id : null;
  }
  if (userType === "commerce") {
    const { data, error } = await supabase
      .from("commerce")
      .insert({ email: email })
      .select();

    if (error) {
      console.log("Erro ao registrar o comércio:", error);
      return null;
    }

    return data ? data[0].id : null;
  }
};
