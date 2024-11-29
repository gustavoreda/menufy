import { TextInput } from "@/src/components/TextInput";
import { AuthContext } from "@/src/context/auth";
import { getCommerce, getUser } from "@/src/controller";
import useTheme from "@/src/hooks/useTheme";
import { router } from "expo-router";
import { useContext, useEffect, useState } from "react";
import {
  FlatList,
  Image,
  LogBox,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);

const HomeScreen = () => {
  const { user } = useContext(AuthContext);
  const [search, setSearch] = useState("");
  const { top, bottom } = useSafeAreaInsets();
  const { backgroundColor, color, grey, inverseColor } = useTheme();

  const [commerces, setCommmerces] = useState<any>([]);
  const [userData, setUserData] = useState<any>([]);
  const lastItem = commerces[commerces.length - 1];

  useEffect(() => {
    getCommerce().then((res) => setCommmerces(res));
    getUser(Number(user?.userId)).then((res) => setUserData(res[0]));
  }, []);

  const navigationToCommerce = (id: number) => {
    router.push({
      pathname: `/user/home/commerce`,
      params: { id },
    });
  };

  const navigateToConfig = () => {
    router.push({ pathname: "/user/home/settings" });
  };

  return (
    <View style={styles.root}>
      <View
        style={[
          styles.container,
          { backgroundColor, paddingBottom: bottom, paddingTop: top },
        ]}
      >
        <TouchableOpacity style={styles.header} onPress={navigateToConfig}>
          <View style={styles.subHeader}>
            <Text style={[styles.text, { color }]}>Entrega Retirada</Text>
            <Text style={[styles.subtitle, { color }]}>
              {userData?.address?.street + ", " + userData?.address?.number}
            </Text>
          </View>
          <Image
            style={styles.image}
            source={{
              uri:
                user?.photoUrl ??
                "https://lh3.googleusercontent.com/a/ACg8ocKEvdKu3IhaY5b3xZH3amRVOKCiB6XmtNU4tf1ndtLruoJQurR92Q=s96-c",
            }}
          />
        </TouchableOpacity>
        <View style={styles.containerTextInput}>
          <TextInput
            onChangeText={setSearch}
            value={search}
            placeholder="Procurar por hamburgerias próximas"
          />
        </View>
        <ScrollView
          contentContainerStyle={{ gap: 24 }}
          showsVerticalScrollIndicator={false}
        >
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigationToCommerce(lastItem.id)}
            style={[styles.imageCarousel, { backgroundColor: grey }]}
          >
            <Image
              style={styles.imageCarousel}
              source={{
                uri:
                  lastItem?.image ??
                  "https://png.pngtree.com/png-clipart/20231005/original/pngtree-pizza-fast-food-cartoon-png-image_13125769.png",
              }}
            />
          </TouchableOpacity>
          <View>
            <FlatList
              data={commerces}
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={({ item }) => (
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => navigationToCommerce(item.id)}
                  style={[styles.imageList, { backgroundColor: grey }]}
                >
                  <Image
                    style={styles.imageList}
                    source={{
                      uri:
                        item?.image ??
                        "https://images.vexels.com/media/users/3/230823/isolated/lists/aac02a035207de9b98ead97e9642dbba-desenho-animado-de-hamburguer-feliz.png",
                    }}
                  />
                </TouchableOpacity>
              )}
            />
          </View>
          <Text style={[styles.subtitle, { color }]}>
            Restaurantes Populares
          </Text>
          <FlatList
            data={commerces
              .sort((a: any, b: any) => b?.score - a?.score)
              .slice(0, 5)}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.card}
                activeOpacity={0.8}
                onPress={() => navigationToCommerce(item.id)}
              >
                <View style={[styles.imageCard, { backgroundColor: grey }]}>
                  <Image
                    style={styles.imageCard}
                    resizeMode="contain"
                    source={{
                      uri:
                        item?.image ??
                        "https://cdn-icons-png.flaticon.com/512/1037/1037762.png",
                    }}
                  />
                </View>
                <View style={[styles.imageCard, { backgroundColor: color }]}>
                  <View style={styles.scoreCardContainer}>
                    <View
                      style={[
                        styles.scoreCardContent,
                        { backgroundColor: grey },
                      ]}
                    >
                      <Text style={[styles.scoreCard, { color }]}>
                        {item?.score}
                      </Text>
                    </View>
                    <Text style={[styles.textCard]}>Avaliações</Text>
                  </View>
                  <Text style={[styles.titleCard, { color: inverseColor }]}>
                    {item?.name.trim()}
                  </Text>
                  <Text style={[styles.textCard, { color: inverseColor }]}>
                    {item?.deliveryTime} - Entregas grátis a partir de R$
                    {Math.floor(Math.random() * (30 - 10 + 1)) + 10}
                  </Text>
                </View>
              </TouchableOpacity>
            )}
          />
        </ScrollView>
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: "row",
    padding: 20,
    marginVertical: 20,
    justifyContent: "space-between",
    alignItems: "center",
  },
  subHeader: {
    gap: 10,
  },
  text: {
    fontSize: Platform.OS === "ios" ? 16 : 14,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: Platform.OS === "ios" ? 20 : 18,
    fontWeight: "500",
  },
  image: {
    height: 64,
    width: 64,
    borderRadius: 64,
  },
  containerTextInput: {
    marginBottom: 24,
  },
  imageCarousel: {
    width: "100%",
    height: 175,
    borderRadius: 10,
  },
  imageList: {
    width: 125,
    height: 125,
    marginRight: 20,
    borderRadius: 10,
  },
  card: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    overflow: "hidden",
    marginBottom: 20,
  },
  imageCard: {
    width: "100%",
    height: 100,
    padding: 10,
  },
  scoreCardContainer: {
    alignSelf: "flex-end",
  },
  scoreCardContent: {
    borderRadius: 10,
  },
  scoreCard: {
    padding: 5,
    textAlign: "center",
  },
  titleCard: {
    fontSize: Platform.OS === "ios" ? 18 : 16,
    fontWeight: "bold",
  },
  textCard: {
    fontSize: Platform.OS === "ios" ? 14 : 12,
    fontWeight: "500",
  },
});
