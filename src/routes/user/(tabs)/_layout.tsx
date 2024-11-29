import useTheme from "@/src/hooks/useTheme";
import { Ionicons } from "@expo/vector-icons/";
import { Tabs, useSegments } from "expo-router";

const TabLayout = () => {
  const { backgroundColor, tintColor } = useTheme();
  const segments = useSegments();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor,
          elevation: 0,
          borderTopWidth: 0,
        },
        tabBarActiveTintColor: tintColor,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Início",
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
          tabBarStyle:
            segments[3] === "commerce" ||
            segments[3] === "order" ||
            segments[3] === "checkout" ||
            segments[3] === "payment" ||
            segments[3] === "settings" ||
            segments[3] === "updatingAddress"
              ? { display: "none" }
              : {
                  backgroundColor,
                  elevation: 0,
                  borderTopWidth: 0,
                },
          tabBarActiveTintColor: tintColor,
        }}
      />
      <Tabs.Screen
        name="orders"
        options={{
          title: "Pedido",
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="menu" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabLayout;
