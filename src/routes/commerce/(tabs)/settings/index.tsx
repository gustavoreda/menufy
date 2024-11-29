import { AuthContext } from "@/src/context/auth";
import useTheme from "@/src/hooks/useTheme";
import Icon from "@expo/vector-icons/FontAwesome5";
import { router } from "expo-router";
import { useContext } from "react";
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const SettingsScreen = () => {
  const { user, signOut } = useContext(AuthContext);
  const { top, bottom } = useSafeAreaInsets();
  const { backgroundColor, color, grey } = useTheme();

  const handleSignOut = () => {
    signOut();
    router.replace("/auth");
  };

  const navigationToUpdatingAddress = () => {
    router.push("/commerce/settings/updatingCommerce");
  };

  return (
    <View style={styles.root}>
      <View
        style={[
          styles.container,
          { backgroundColor, paddingBottom: bottom, paddingTop: top },
        ]}
      >
        <View style={[styles.card, { backgroundColor: grey }]}>
          <View style={styles.subContainer}>
            <Text style={[styles.subtitle, { color }]}>{user?.name}</Text>
            <Text style={[styles.text, { color }]}>{user?.email}</Text>
          </View>
          <Image
            style={styles.image}
            source={{
              uri: user?.photoUrl,
            }}
          />
        </View>
        <View style={{ gap: 10 }}>
          <TouchableOpacity onPress={navigationToUpdatingAddress}>
            <View style={styles.item}>
              <View style={styles.textIcon}>
                <Icon name="map-marker-alt" size={18} color={color} />
                <Text style={[styles.text, { color }]}>
                  Alterar informações
                </Text>
              </View>
              <Icon name="chevron-right" size={18} color={color} />
            </View>
          </TouchableOpacity>
          <View style={styles.item}>
            <View style={styles.textIcon}>
              <Icon name="list-ul" size={18} color={color} />
              <Text style={[styles.text, { color }]}>Seus pedidos</Text>
            </View>
            <Icon name="chevron-right" size={18} color={color} />
          </View>
          <View style={styles.item}>
            <View style={styles.textIcon}>
              <Icon name="calendar-alt" size={18} color={color} />
              <Text style={[styles.text, { color }]}>Seus agendamentos</Text>
            </View>
            <Icon name="chevron-right" size={18} color={color} />
          </View>
          <View style={styles.item}>
            <View style={styles.textIcon}>
              <Icon name="question-circle" size={18} color={color} />
              <Text style={[styles.text, { color }]}>Ajuda</Text>
            </View>
            <Icon name="chevron-right" size={18} color={color} />
          </View>
          <View style={styles.item}>
            <View style={styles.textIcon}>
              <Icon name="info-circle" size={18} color={color} />
              <Text style={[styles.text, { color }]}>Sobre</Text>
            </View>
            <Icon name="chevron-right" size={18} color={color} />
          </View>
          <TouchableOpacity onPress={handleSignOut} activeOpacity={0.8}>
            <View style={styles.item}>
              <View style={styles.textIcon}>
                <Icon name="sign-out-alt" size={18} color={color} />
                <Text style={[styles.text, { color }]}>Sair</Text>
              </View>
              <Icon name="chevron-right" size={18} color={color} />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 20,
  },
  subContainer: {
    gap: 5,
  },
  card: {
    width: "100%",
    flexDirection: "row",
    padding: 20,
    marginVertical: 20,
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 14,
  },
  image: {
    height: 64,
    width: 64,
    borderRadius: 64,
  },
  text: {
    fontSize: Platform.OS === "ios" ? 16 : 14,
  },
  subtitle: {
    fontSize: Platform.OS === "ios" ? 20 : 18,
    fontWeight: "500",
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 10,
    marginHorizontal: 20,
  },
  textIcon: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
});
