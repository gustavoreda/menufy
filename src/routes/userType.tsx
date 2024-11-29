import { router } from "expo-router";
import { useContext } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AuthContext } from "../context/auth";
import useTheme from "../hooks/useTheme";

const UserType = () => {
  const { top, bottom } = useSafeAreaInsets();
  const { setUserTypeFn } = useContext(AuthContext);
  const { backgroundColor, color, inverseColor, tintColor } = useTheme();

  const navigateToAuth = (userType: "commerce" | "user") => {
    setUserTypeFn(userType);
    router.push("/auth");
  };

  return (
    <View style={styles.root}>
      <View
        style={[
          styles.container,
          { backgroundColor, paddingBottom: bottom, paddingTop: top },
        ]}
      >
        <Text style={[styles.text, { color }]}>Você é...</Text>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: tintColor }]}
          onPress={() => navigateToAuth("commerce")}
        >
          <Text style={[styles.text, { color: inverseColor }]}>Comércio</Text>
        </TouchableOpacity>
        <Text style={[styles.text, { color }]}>ou</Text>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: tintColor }]}
          onPress={() => navigateToAuth("user")}
        >
          <Text style={[styles.text, { color: inverseColor }]}>Consumidor</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default UserType;

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
  },
  button: {
    flexDirection: "row",
    width: "80%",
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
