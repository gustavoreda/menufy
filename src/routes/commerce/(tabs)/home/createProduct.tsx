import { TextInput } from "@/src/components/TextInput";
import { AuthContext } from "@/src/context/auth";
import {
  createProduct,
  getProductByName,
  updateProduct,
} from "@/src/controller";
import useTheme from "@/src/hooks/useTheme";
import { router, useLocalSearchParams } from "expo-router";
import { useContext, useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const CreateProductScreen = () => {
  const { productName } = useLocalSearchParams();
  const { user } = useContext(AuthContext);
  const { top, bottom } = useSafeAreaInsets();
  const { backgroundColor, tintColor, inverseColor } = useTheme();
  const [product, setProduct] = useState({
    name: "",
    value: "",
    ingredients: "",
    type: "",
  });

  useEffect(() => {
    if (user?.userId && productName) {
      getProductByName(user?.userId.toString(), productName.toString()).then(
        (res) => {
          console.log(res);
          setProduct((prevForm) => ({ ...prevForm, ...res }));
        },
      );
    }
  }, []);

  const create = () => {
    if (productName) {
      updateProduct(String(user?.userId), productName.toString(), product).then(
        () => router.replace({ pathname: "/commerce/home" }),
      );
      return;
    }
    createProduct({
      ...product,
      value: Number(product.value),
      commerceId: Number(user?.userId),
    }).then(() => router.replace({ pathname: "/commerce/home" }));
  };

  return (
    <View style={styles.root}>
      <View
        style={[
          styles.container,
          { backgroundColor, paddingBottom: bottom, paddingTop: top },
        ]}
      >
        <TextInput
          placeholder="Nome do Produto"
          onChangeText={(name) => setProduct({ ...product, name })}
          value={product?.name}
        />
        <TextInput
          placeholder="Valor"
          onChangeText={(value) => setProduct({ ...product, value: value })}
          value={String(product?.value)}
        />
        <TextInput
          placeholder="Ingredientes"
          onChangeText={(ingredients) =>
            setProduct({ ...product, ingredients })
          }
          value={product?.ingredients}
        />
        <TextInput
          placeholder="Tipo"
          onChangeText={(type) => setProduct({ ...product, type })}
          value={product?.type}
        />
        <View style={[styles.containerButton]}>
          <TouchableOpacity
            onPress={create}
            style={[styles.button, { backgroundColor: tintColor }]}
          >
            <Text style={[styles.text, { color: inverseColor }]}>
              Salvar Produto
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default CreateProductScreen;

const styles = StyleSheet.create({
  root: { flex: 1 },
  container: {
    flex: 1,
    padding: 20,
    gap: 20,
    alignItems: "center",
  },
  floatingButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#000",
    padding: 15,
    borderRadius: 100,
  },
  containerButton: {
    flex: 1,
    position: "absolute",
    bottom: 0,
    width: "100%",
    justifyContent: "flex-end",
    alignSelf: "center",
    padding: 20,
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    gap: 18,
    padding: 16,
    borderRadius: 8,
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
