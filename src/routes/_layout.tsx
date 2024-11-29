import { Stack } from "expo-router";
import { Platform } from "react-native";
import { AuthProvider } from "../context/auth";
import useTheme from "../hooks/useTheme";

export default function Layout() {
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
    <AuthProvider>
      <Stack screenOptions={options}>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="userType" options={{ headerShown: false }} />
        <Stack.Screen name="auth" />
        <Stack.Screen name="user/addAddress" />
        <Stack.Screen name="commerce/addAddress" />
        <Stack.Screen name="user/(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="commerce/(tabs)" options={{ headerShown: false }} />
      </Stack>
    </AuthProvider>
  );
}
