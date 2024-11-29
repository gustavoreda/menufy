import { getCommerce } from "@/src/controller";
import useTheme from "@/src/hooks/useTheme";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const CommerceScreen = () => {
  const { id }: { id: string } = useLocalSearchParams();
  const { top, bottom } = useSafeAreaInsets();
  const { backgroundColor, color, grey } = useTheme();
  const [commerce, setCommerce] = useState<{
    name: string;
    picture?: string;
    score: number;
    deliveryTime: string;
    address: {
      cep: string;
      street: string;
      number: string;
      complement: string;
      neighborhood: string;
      city: string;
      state: string;
    };
    products: [];
  }>({
    name: "",
    score: 0,
    deliveryTime: "",
    address: {
      cep: "",
      street: "",
      number: "",
      complement: "",
      neighborhood: "",
      city: "",
      state: "",
    },
    picture: "",
    products: [],
  });
  const [cart, setCart] = useState<{ name: string; value: number }[]>([]);

  useEffect(() => {
    getCommerce(id).then((res) => setCommerce(res[0]));
  }, [id]);

  const navigationToCheckout = () => {
    router.push({
      pathname: "/user/home/order",
      params: {
        cart: JSON.stringify(cart),
        id: id,
      },
    });
  };

  const updateTotal = (name: string, value: number) => {
    setCart([...cart, { name, value }]);
  };

  const groupedProducts = commerce.products
    ? Object.entries(
        commerce?.products.reduce((acc: any, item: any) => {
          if (!acc[item.type]) acc[item.type] = [];
          acc[item.type].push(item);
          return acc;
        }, {}),
      )
    : [];

  return (
    <View style={styles.root}>
      <View
        style={[
          styles.container,
          { backgroundColor, paddingBottom: bottom, paddingTop: top },
        ]}
      >
        <Image
          style={styles.image}
          resizeMode="contain"
          source={{
            uri: commerce?.picture ?? "https://via.placeholder.com/150",
          }}
        />
        <View style={styles.containerCard}>
          <View style={styles.row}>
            <View style={styles.contentCard}>
              <Text style={[styles.subtitle, { color }]}>{commerce?.name}</Text>
              <Text style={[styles.text, { color }]}>
                {commerce?.address.street + ", " + commerce?.address.number}
              </Text>
            </View>
            <View style={styles.scoreCardContainer}>
              <View
                style={[styles.scoreCardContent, { backgroundColor: grey }]}
              >
                <Text style={[styles.scoreCard, { color }]}>
                  {commerce?.score}
                </Text>
              </View>
              <Text style={[styles.text, { color }]}>Avaliações</Text>
            </View>
          </View>
          <Text style={[styles.text, { color }]}>
            Tempo de entrega: {commerce.deliveryTime}
          </Text>
        </View>
        <FlatList
          data={groupedProducts}
          keyExtractor={(item) => item[0]}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => <View style={styles.groupSeparator} />}
          renderItem={({ item }) => (
            <View>
              <Text style={[styles.subtitle, { color }]}>
                {item[0].toUpperCase()}
              </Text>
              <FlatList
                data={item[1] as any}
                keyExtractor={(product) => product.id}
                ItemSeparatorComponent={() => <View style={styles.separator} />}
                renderItem={({ item: product }) => (
                  <TouchableOpacity
                    onPress={() => updateTotal(product.name, product.value)}
                  >
                    <View style={{ paddingVertical: 10 }}>
                      <View>
                        <Text
                          style={[styles.text, { color, fontWeight: "bold" }]}
                        >
                          {product.name} - R${product.value.toFixed(2)}
                        </Text>
                        <Text
                          style={[styles.text, { color, width: "80%" }]}
                          numberOfLines={2}
                        >
                          {product.ingredients}
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                )}
              />
            </View>
          )}
        />
        <TouchableOpacity
          onPress={navigationToCheckout}
          style={[styles.button, { backgroundColor: grey }]}
        >
          <Text style={[styles.text, { color, fontWeight: "bold" }]}>
            Ver Pedido
          </Text>
          <Text style={[styles.text, { color, fontWeight: "bold" }]}>
            R${cart.reduce((acc, item) => acc + item.value, 0).toFixed(2)}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CommerceScreen;

const styles = StyleSheet.create({
  root: { flex: 1 },
  container: {
    flex: 1,
    padding: 20,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  subtitle: {
    fontSize: Platform.OS === "ios" ? 20 : 18,
    fontWeight: "500",
  },
  text: {
    fontSize: Platform.OS === "ios" ? 16 : 14,
    fontWeight: "300",
  },
  image: {
    width: "100%",
    height: "20%",
    padding: 10,
  },
  groupSeparator: {
    backgroundColor: "transparent",
  },
  separator: {
    height: 1,
    backgroundColor: "#ccc",
  },
  containerCard: {
    paddingVertical: 20,
  },
  scoreCardContainer: {
    alignSelf: "flex-end",
  },
  contentCard: {
    marginBottom: 16,
  },
  scoreCardContent: {
    borderRadius: 10,
  },
  scoreCard: {
    padding: 5,
    textAlign: "center",
  },
  textCard: {
    fontSize: Platform.OS === "ios" ? 14 : 12,
    fontWeight: "500",
  },
  containerItem: {
    width: "100%",
    flexDirection: "row",
  },
  button: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    padding: 16,
    margin: 12,
    alignSelf: "center",
    borderRadius: 10,
  },
});
