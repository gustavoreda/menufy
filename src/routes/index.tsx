import Icon from "@expo/vector-icons/Feather";
import { Link } from "expo-router";
import {
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import useTheme from "../hooks/useTheme";

const Index = () => {
  const { backgroundColor, grey, color, inverseColor, tintColor, isDark } =
    useTheme();

  return (
    <View style={styles.root}>
      <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />
      <View style={[styles.image, { backgroundColor: grey }]} />
      <View style={[styles.content, { backgroundColor }]}>
        <Text style={[styles.text, { color }]}>Vamos começar!</Text>
        <Link href={"/userType"} asChild style={styles.button}>
          <TouchableOpacity style={{ backgroundColor: tintColor }}>
            <Text style={[styles.text, { color: inverseColor }]}>Entrar</Text>
            <Icon name="arrow-right" size={24} color={inverseColor} />
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
};

export default Index;

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  image: {
    flex: 6,
  },
  content: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
    gap: 16,
  },
  text: {
    fontSize: Platform.OS === "ios" ? 20 : 18,
    fontWeight: "bold",
  },
  button: {
    flexDirection: "row",
    gap: 8,
    justifyContent: "center",
    alignItems: "center",
    width: "80%",
    padding: 16,
    borderRadius: 8,
  },
});
