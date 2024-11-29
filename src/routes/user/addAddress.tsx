import { TextInput } from "@/src/components/TextInput";
import { AuthContext } from "@/src/context/auth";
import { getUser } from "@/src/controller";
import useTheme from "@/src/hooks/useTheme";
import Icon from "@expo/vector-icons/FontAwesome";
import { Stack, router } from "expo-router";
import { useContext, useEffect, useState } from "react";
import {
    Platform,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

const AddAddressScreen = () => {
  const { user } = useContext(AuthContext);
  const { backgroundColor, color, tintColor } = useTheme();
  const [address, setAddress] = useState("");

  useEffect(() => {
    const hasAddress = getUser(Number(user?.userId)).then((res) => res[0].address)
    if(Boolean(hasAddress)) router.replace("/user/home")
  }, [])

  return (
    <View style={styles.root}>
      <Stack.Screen options={{ headerTitle: "Adicionar Endereço" }} />
      <View style={[styles.container, { backgroundColor }]}>
        <TextInput
          onChangeText={setAddress}
          value={address}
          placeholder="Procurar endereço"
        />
        <Text style={[styles.subtitle, { color }]}>Endereços Próximos</Text>
        <TouchableOpacity
          style={[styles.button, { borderColor: tintColor }]}
          onPress={() => router.push("/user/home")}
        >
          <Icon name="paper-plane" size={18} color={tintColor} />
          <Text style={[styles.text, { color: tintColor }]}>
            Usar localização atual
          </Text>
        </TouchableOpacity>
        <Text style={[styles.text, { color }]}>
          Mostraremos restaurantes e lojas próximas para pedir, entregar ou
          retirar.
        </Text>
      </View>
    </View>
  );
};

export default AddAddressScreen;

const styles = StyleSheet.create({
  root: { flex: 1 },
  container: {
    flex: 1,
    padding: 20,
    gap: 20,
  },
  subtitle: {
    fontSize: Platform.OS === "ios" ? 20 : 18,
    fontWeight: "bold",
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
