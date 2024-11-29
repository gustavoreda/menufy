import { TextInput } from "@/src/components/TextInput";
import { AuthContext } from "@/src/context/auth";
import { getUser, updateAddress } from "@/src/controller";
import useTheme from "@/src/hooks/useTheme";
import Icon from "@expo/vector-icons/FontAwesome";
import { Stack, router } from "expo-router";
import { useContext, useEffect, useState } from "react";
import {
  Alert,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const updatingAddress = () => {
  const { user } = useContext(AuthContext);
  const { backgroundColor, color } = useTheme();
  const [form, setForm] = useState({
    userId: Number(user?.userId),
    address: {
      cep: "",
      street: "",
      number: "",
      complement: "",
      neighborhood: "",
      city: "",
      state: "",
    },
  });

  useEffect(() => {
    if (user?.userId) {
      getUser(Number(user.userId)).then((res) => {
        const address = res[0]?.address || "";
        setForm((prevForm) => ({ ...prevForm, address }));
      });
    }
  }, [user]);

  const createCommerce = async () => {
    await updateAddress(form);
    Alert.alert("Endereço atualizado com sucesso!");
    router.push("/user/home");
  };

  return (
    <View style={styles.root}>
      <Stack.Screen options={{ headerTitle: "Adicionar dados" }} />
      <ScrollView
        contentContainerStyle={[styles.container, { backgroundColor }]}
      >
        <Text style={[styles.subtitle, { color: color }]}>
          Endereço para entrega
        </Text>
        <TextInput
          onChangeText={(cep) =>
            setForm({ ...form, address: { ...form.address, cep } })
          }
          value={form.address.cep}
          placeholder="CEP"
          keyboardType="numeric"
        />
        <TextInput
          onChangeText={(street) =>
            setForm({ ...form, address: { ...form.address, street } })
          }
          value={form.address.street}
          placeholder="Rua"
        />
        <TextInput
          onChangeText={(number) =>
            setForm({ ...form, address: { ...form.address, number } })
          }
          value={form.address.number}
          placeholder="Número"
        />
        <TextInput
          onChangeText={(complement) =>
            setForm({ ...form, address: { ...form.address, complement } })
          }
          value={form.address.complement}
          placeholder="Complemento"
        />
        <TextInput
          onChangeText={(neighborhood) =>
            setForm({ ...form, address: { ...form.address, neighborhood } })
          }
          value={form.address.neighborhood}
          placeholder="Bairro"
        />
        <TextInput
          onChangeText={(city) =>
            setForm({ ...form, address: { ...form.address, city } })
          }
          value={form.address.city}
          placeholder="Cidade"
        />
        <TextInput
          onChangeText={(state) =>
            setForm({ ...form, address: { ...form.address, state } })
          }
          value={form.address.state}
          placeholder="Estado"
        />
      </ScrollView>
      <View style={[styles.containerButton, { backgroundColor }]}>
        <TouchableOpacity
          style={[styles.button, { borderColor: color }]}
          onPress={createCommerce}
        >
          <Icon name="save" size={18} color={color} />
          <Text style={[styles.text, { color: color }]}>Salvar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default updatingAddress;

const styles = StyleSheet.create({
  root: { flex: 1 },
  container: {
    padding: 20,
    gap: 20,
    justifyContent: "center",
  },
  subtitle: {
    fontSize: Platform.OS === "ios" ? 20 : 18,
    fontWeight: "bold",
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
    flexDirection: "row",
    gap: 8,
    width: "100%",
    justifyContent: "center",
    borderWidth: 1,
    padding: 12,
    borderRadius: 8,
  },
  text: {
    fontSize: Platform.OS === "ios" ? 16 : 14,
    fontWeight: "500",
  },
});
