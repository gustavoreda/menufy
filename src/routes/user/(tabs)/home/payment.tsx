import { AuthContext } from "@/src/context/auth";
import { createOrder } from "@/src/controller";
import useTheme from "@/src/hooks/useTheme";
import Icon from "@expo/vector-icons/FontAwesome";
import { router, useLocalSearchParams, useNavigation } from "expo-router";
import { useContext, useEffect, useState } from "react";
import {
  Alert,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type Cart = {
  items: [];
  observations: string;
  deliveryObservations: string;
  optionDelivery: string;
};

const PaymentScreen = () => {
  const { user } = useContext(AuthContext);
  const { top, bottom } = useSafeAreaInsets();
  const { cart: cartParam, id: commerceId } = useLocalSearchParams();
  const [cart, setCart] = useState<Cart>({
    items: [],
    observations: "",
    deliveryObservations: "",
    optionDelivery: "",
  });
  const { backgroundColor, color, grey } = useTheme();
  const [paymentMethod, setPaymentMethod] = useState<"money" | "card">("money");

  useEffect(() => {
    const parsedCart = JSON.parse(cartParam as string);
    setCart(parsedCart);
  }, [cartParam]);

  const handlePaymentMethod = (payment: "money" | "card") => {
    setPaymentMethod(payment);
  };

  const create = () => {
    const { items, observations, deliveryObservations, optionDelivery } = cart;
    createOrder(
      user?.userId as number,
      Number(commerceId),
      items,
      observations,
      deliveryObservations,
      optionDelivery,
      paymentMethod
    );
    Alert.alert(
      "Pedido realizado com sucesso!",
      "Aguarde a confirmação do estabelecimento.",
      [
        {
          text: "Ok",
          onPress: () => {
            router.replace("/user/home");
            router.replace("/user/orders");
          },
        },
      ]
    );
  };

  return (
    <View style={styles.root}>
      <View
        style={[
          styles.container,
          { backgroundColor, paddingBottom: bottom, paddingTop: top },
        ]}
      >
        <TouchableOpacity
          style={styles.containerItems}
          activeOpacity={0.8}
          onPress={() => handlePaymentMethod("money")}
        >
          <View style={styles.row}>
            <Icon
              name='money'
              color={color}
              size={Platform.OS === "ios" ? 18 : 16}
            />
            <Text style={[styles.text, { color }]}>Dinheiro</Text>
          </View>
          <Icon
            name={paymentMethod === "money" ? "dot-circle-o" : "circle-o"}
            color={color}
            size={Platform.OS === "ios" ? 18 : 16}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.containerItems}
          activeOpacity={0.8}
          onPress={() => handlePaymentMethod("card")}
        >
          <View style={styles.row}>
            <Icon
              name='credit-card'
              color={color}
              size={Platform.OS === "ios" ? 18 : 16}
            />
            <Text style={[styles.text, { color }]}>Cartão</Text>
          </View>
          <Icon
            name={paymentMethod === "card" ? "dot-circle-o" : "circle-o"}
            color={color}
            size={Platform.OS === "ios" ? 18 : 16}
          />
        </TouchableOpacity>
        <View style={styles.flexJustifyContent}>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: grey }]}
            onPress={create}
          >
            <Text style={[styles.textBold, { color, fontWeight: "bold" }]}>
              Confirmar e Pagar
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default PaymentScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 20,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },
  containerItems: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    marginVertical: 10,
  },
  text: {
    fontSize: Platform.OS === "ios" ? 18 : 16,
    fontWeight: "bold",
  },
  textBold: {
    fontSize: Platform.OS === "ios" ? 18 : 16,
    fontWeight: "bold",
  },
  flexJustifyContent: {
    flex: 1,
    justifyContent: "flex-end",
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
});
