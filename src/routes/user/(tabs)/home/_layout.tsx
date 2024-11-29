import useTheme from "@/src/hooks/useTheme";
import { Stack } from "expo-router";
import { Platform } from "react-native";

export default function HomeLayout() {
  const { backgroundColor, color } = useTheme();

  const options = {
    headerStyle: {
      backgroundColor: backgroundColor,
    },
    headerShadowVisible: false,
    headerTitleStyle: {
      fontSize: Platform.OS === "ios" ? 20 : 18,
      color: color,
    },
    headerBackTitleVisible: false,
    headerTintColor: color,
  };

  return (
    <Stack screenOptions={{ headerShown: false, ...options }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="commerce" />
      <Stack.Screen
        name="order"
        options={{ headerShown: true, title: "Seu Pedido" }}
      />
      <Stack.Screen
        name="checkout"
        options={{ headerShown: true, title: "Checkout" }}
      />
      <Stack.Screen
        name="payment"
        options={{ headerShown: true, title: "Método de pagamento" }}
      />
      <Stack.Screen
        name="settings"
        options={{ headerShown: true, title: "" }}
      />
      <Stack.Screen
        name="updatingAddress"
        options={{ headerShown: true, title: "Endereço de entrega" }}
      />
    </Stack>
  );
}
