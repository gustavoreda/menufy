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
          title: "Seus produtos",
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="bag" size={size} color={color} />
          ),
          tabBarStyle:
            segments[3] === "createProduct" ||
            segments[3] === "updatingCommerce"
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
      <Tabs.Screen
        name="settings"
        options={{
          title: "Configurações",
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="cog" size={size} color={color} />
          ),
          tabBarStyle:
            segments[3] === "updatingCommerce"
              ? { display: "none" }
              : {
                  backgroundColor,
                  elevation: 0,
                  borderTopWidth: 0,
                },
          tabBarActiveTintColor: tintColor,
        }}
      />
    </Tabs>
  );
};

export default TabLayout;
