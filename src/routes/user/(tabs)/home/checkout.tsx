import { getCommerce } from "@/src/controller";
import useTheme from "@/src/hooks/useTheme";
import { Stack, router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const CheckoutScreen = () => {
  const { top, bottom } = useSafeAreaInsets();
  const { cart: cartParam, id } = useLocalSearchParams();
  const { backgroundColor, color, grey } = useTheme();
  const [commerce, setCommmerce] = useState<any>([]);
  const [cart, setCart] = useState<
    { name: string; value: number; amount: number }[]
  >([]);
  const [observations, setObservations] = useState("");
  const [deliveryObservations, setDeliveryObservations] = useState("");
  const [optionDelivery, setOptionDelivery] = useState<
    "Entregar em mãos" | "Deixar na porta"
  >("Entregar em mãos");

  const totalValue = cart.reduce(
    (acc, item) => acc + item.value * item.amount,
    0,
  );

  useEffect(() => {
    const loadData = async () => {
      try {
        await getCommerce(id as string).then((res) => setCommmerce(res[0]));
        const parsedCart = JSON.parse(cartParam as string);
        console.log(parsedCart);
        setCart(parsedCart.items);
        setObservations(parsedCart.observations);
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
      }
    };
    loadData();
  }, []);

  const handleOptionDelivery = (
    option: "Entregar em mãos" | "Deixar na porta",
  ) => {
    setOptionDelivery(option);
  };

  const navigateToPayment = () => {
    const orderData = {
      items: cart,
      observations,
      optionDelivery,
      deliveryObservations,
    };
    router.push({
      pathname: "/user/home/payment",
      params: {
        cart: JSON.stringify(orderData),
        id: id,
      },
    });
  };

  return (
    <View style={styles.root}>
      <Stack
        screenOptions={{
          headerTitle: "Checkout",
        }}
      />
      <View
        style={[
          styles.container,
          { backgroundColor, paddingBottom: bottom, paddingTop: top },
        ]}
      >
        <View
          style={[
            styles.containerItens,
            {
              borderColor: grey,
            },
          ]}
        >
          <Text style={[styles.textBold, { color }]}>Entrega</Text>
          <Text style={[{ color }]}>
            {commerce?.address?.street + ", " + commerce?.address?.number}
          </Text>
          <View style={[styles.row, { gap: 20 }]}>
            <Text style={[{ color }]}>{commerce?.deliveryTime ?? "30min"}</Text>
            <Text style={[{ color }]}>Agendar</Text>
          </View>
        </View>
        <View
          style={[
            styles.containerItens,
            {
              borderColor: grey,
            },
          ]}
        >
          <Text style={[styles.textBold, { color }]}>Opções de entrega</Text>
          <View style={styles.rowSpaceBetween}>
            <TouchableOpacity
              style={[
                styles.buttonOption,
                {
                  backgroundColor:
                    optionDelivery === "Entregar em mãos"
                      ? grey
                      : "transparent",
                },
              ]}
              onPress={() => handleOptionDelivery("Entregar em mãos")}
            >
              <Text style={[{ color }]}>Entregar em mãos</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.buttonOption,
                {
                  backgroundColor:
                    optionDelivery === "Deixar na porta" ? grey : "transparent",
                },
              ]}
              onPress={() => handleOptionDelivery("Deixar na porta")}
            >
              <Text style={[{ color }]}>Deixar na porta</Text>
            </TouchableOpacity>
          </View>
          <TextInput
            placeholder="Observações..."
            placeholderTextColor={color}
            style={[
              styles.textInput,
              {
                backgroundColor: grey,
                color,
              },
            ]}
            value={deliveryObservations}
            onChangeText={setDeliveryObservations}
          />
        </View>
        <View
          style={[
            styles.containerItens,
            {
              borderColor: grey,
            },
          ]}
        >
          <Text style={[styles.textBold, { color }]}>Detalhes</Text>
          <View style={styles.rowSpaceBetween}>
            <Text style={[styles.text, { color }]}>Subtotal</Text>
            <Text style={[styles.text, { color }]}>R${totalValue}</Text>
          </View>
          <View style={styles.rowSpaceBetween}>
            <Text style={[styles.text, { color }]}>Taxa de entrega</Text>
            <Text style={[styles.text, { color }]}>GRATIS</Text>
          </View>
        </View>
        <View style={styles.flexJustifyContent}>
          <View style={styles.rowSpaceBetween}>
            <Text style={[styles.textBold, { color }]}>Total</Text>
            <Text style={[styles.textBold, { color }]}>R${totalValue}</Text>
          </View>
          <TouchableOpacity
            onPress={navigateToPayment}
            style={[styles.button, { backgroundColor: grey }]}
          >
            <Text style={[styles.textBold, { color, fontWeight: "bold" }]}>
              Ir para pagamento
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default CheckoutScreen;

const styles = StyleSheet.create({
  root: { flex: 1 },
  container: {
    flex: 1,
    padding: 20,
  },
  textBold: {
    fontSize: Platform.OS === "ios" ? 18 : 16,
    fontWeight: "bold",
  },
  text: {
    fontSize: Platform.OS === "ios" ? 16 : 14,
  },
  row: {
    flexDirection: "row",
  },
  rowSpaceBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  containerItens: {
    gap: 10,
    paddingBottom: 12,
    marginBottom: 12,
    borderBottomWidth: 1,
  },
  textInput: {
    padding: 10,
    opacity: 0.8,
    borderRadius: 10,
  },
  buttonOption: {
    padding: 10,
    borderRadius: 10,
  },
  button: {
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
    padding: 16,
    margin: 12,
    alignSelf: "center",
    borderRadius: 10,
  },
  flexJustifyContent: {
    flex: 1,
    justifyContent: "flex-end",
  },
});
