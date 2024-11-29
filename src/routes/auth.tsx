import { AuthContext } from "@/src/context/auth";
import useTheme from "@/src/hooks/useTheme";
import Icon from "@expo/vector-icons/FontAwesome5";
import { Link, Stack, router, useNavigation } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import { useContext, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  BackHandler,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

WebBrowser.maybeCompleteAuthSession();

const LoginScreen = () => {
  const { signInWithGoogle, signed, userType, user, setUser, loading } =
    useContext(AuthContext);
  const { backgroundColor, grey, color, inverseColor, tintColor } = useTheme();
  const navigation = useNavigation();
  const [previousRoute, setPreviousRoute] = useState<string | null>();

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      const previous =
        navigation.getState().routes[navigation.getState().index - 1];

      setPreviousRoute(previous ? previous.name : null);
    });

    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    const backAction = () => {
      if (previousRoute?.toString() === "userType") {
        return false;
      }
      return true;
    };
    BackHandler.addEventListener("hardwareBackPress", backAction);
    return () => {
      BackHandler.removeEventListener("hardwareBackPress", backAction);
    };
  }, [previousRoute]);

  useEffect(() => {
    if (signed) {
      if (userType === "user") {
        if (user?.userType === "user") {
          router.push("/user/addAddress");
          return;
        }
        Alert.alert(
          "Houve um problema",
          "Este email já foi cadastrado como um comércio",
        );
        setUser(undefined);
      }
      if (userType === "commerce") {
        if (user?.userType === "commerce") {
          router.push("/commerce/addAddress");
          return;
        }
        Alert.alert(
          "Houve um problema",
          "Este email já foi cadastrado como um usuário",
        );
        setUser(undefined);
      }
    }
  }, [signed]);

  if (loading)
    return (
      <View style={[styles.content, { backgroundColor }]}>
        <ActivityIndicator size="large" color={tintColor} />
      </View>
    );

  return (
    <View style={styles.root}>
      <Stack.Screen options={{ headerTitle: "Entrar" }} />
      <View style={[styles.image, { backgroundColor: grey }]} />
      <View style={[styles.content, { backgroundColor }]}>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: tintColor }]}
          onPress={signInWithGoogle}
        >
          <Icon name="google" size={24} color={inverseColor} />
          <Text style={[styles.text, { color: inverseColor }]}>
            Entrar com Google
          </Text>
        </TouchableOpacity>
        {userType === "user" && (
          <>
            <Text style={[styles.text, { color }]}>ou</Text>
            <Link href={"/user/addAddress"} asChild style={styles.button}>
              <TouchableOpacity style={{ backgroundColor: tintColor }}>
                <Text style={[styles.text, { color: inverseColor }]}>
                  Continuar como convidado
                </Text>
              </TouchableOpacity>
            </Link>
          </>
        )}
      </View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  image: {
    flex: 2,
  },
  content: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
    gap: 24,
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
