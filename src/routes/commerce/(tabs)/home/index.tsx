import { AuthContext } from "@/src/context/auth";
import { getProductsByCommerce } from "@/src/controller";
import useTheme from "@/src/hooks/useTheme";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useContext, useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const HomeScreen = () => {
  const { user } = useContext(AuthContext);
  const { top, bottom } = useSafeAreaInsets();
  const { backgroundColor, color, grey, tintColor } = useTheme();
  const [products, setProducts] = useState<any>([]);

  useEffect(() => {
    getProductsByCommerce(Number(user?.userId)).then((res) =>
      setProducts(res ? res[0].products : []),
    );
  }, []);

  const navigateToCreateProduct = () => {
    router.push("/commerce/home/createProduct");
  };

  const navigateToProduct = (productName: string) => {
    router.push({
      pathname: "/commerce/home/createProduct",
      params: { productName },
    });
  };

  const groupedProducts = products
    ? Object.entries(
        products.reduce((acc: any, item: any) => {
          if (!acc[item.type]) acc[item.type] = [];
          acc[item.type].push(item);
          return acc;
        }, {}),
      )
    : [];

  const renderProduct = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={[styles.productCard, { backgroundColor: grey }]}
      onPress={() => navigateToProduct(item.name)}
    >
      <Text style={[styles.productName, { color }]}>
        {item.name} - R${item.value.toFixed(2)}
      </Text>
      <Text style={[styles.productPrice, { color: tintColor }]}>
        {item.ingredients}
      </Text>
    </TouchableOpacity>
  );

  const renderGroupedProducts = ({ item }: { item: any }) => (
    <View>
      <Text style={[styles.subtitle, { color }]}>{item[0].toUpperCase()}</Text>
      <FlatList
        data={item[1]}
        keyExtractor={(product) => product.id}
        renderItem={renderProduct}
      />
    </View>
  );

  return (
    <View style={styles.root}>
      <View
        style={[
          styles.container,
          { backgroundColor, paddingBottom: bottom, paddingTop: top },
        ]}
      >
        <Text style={[styles.title, { color }]}>Seus produtos</Text>
        <FlatList
          data={groupedProducts}
          keyExtractor={(item) => item[0]}
          renderItem={renderGroupedProducts}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={
            <Text style={[styles.emptyText, { color }]}>
              Você não possui produtos cadastrados
            </Text>
          }
        />
        <TouchableOpacity
          style={[styles.floatingButton, { backgroundColor: grey }]}
          onPress={navigateToCreateProduct}
        >
          <Ionicons name="add-circle-outline" size={24} color={tintColor} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  root: { flex: 1 },
  container: {
    flex: 1,
    padding: 20,
  },
  floatingButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#000",
    padding: 15,
    borderRadius: 100,
  },
  listContent: {
    paddingBottom: 100,
  },
  productCard: {
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
  },
  productName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  productPrice: {
    fontSize: 14,
    marginTop: 5,
  },
  emptyText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "500",

    marginBottom: 10,
  },
  title: {
    paddingTop: 40,
    paddingBottom: 20,
    fontSize: 24,
  },
});
