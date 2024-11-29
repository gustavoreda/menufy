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
      <Stack.Screen
        name="createProduct"
        options={{ headerShown: true, title: "Adicionar Produto" }}
      />
      {/* <Stack.Screen
        name="updateProduct"
        options={{ headerShown: true, title: "Atualizar Produto" }}
      /> */}
    </Stack>
  );
}
