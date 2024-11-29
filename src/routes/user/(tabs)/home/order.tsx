import useTheme from "@/src/hooks/useTheme";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  FlatList,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const OrderScreen = () => {
  const { cart: cartParam, id } = useLocalSearchParams();
  const { top, bottom } = useSafeAreaInsets();
  const { backgroundColor, color, grey, inverseColor } = useTheme();
  const [cart, setCart] = useState<
    { name: string; value: number; amount: number }[]
  >([]);
  const [observations, setObservations] = useState<string>("");

  const totalValue = cart.reduce(
    (acc, item) => acc + item.value * item.amount,
    0,
  );

  useEffect(() => {
    const parsedCart = JSON.parse(cartParam as string);
    const uniqueItems = parsedCart.reduce((acc: any, item: any) => {
      const existingItem = acc.find((i: any) => i.name === item.name);
      if (existingItem) {
        existingItem.amount += 1;
      } else {
        acc.push({ ...item, amount: 1 });
      }
      return acc;
    }, []);

    setCart(uniqueItems);
  }, [cartParam]);

  const addItem = (itemName: string, itemValue: number) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.name === itemName);

      if (existingItem) {
        return prevCart.map((item) =>
          item.name === itemName ? { ...item, amount: item.amount + 1 } : item,
        );
      } else {
        return [...prevCart, { name: itemName, value: itemValue, amount: 1 }];
      }
    });
  };

  const incrementAmount = (itemName: string) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.name === itemName ? { ...item, amount: item.amount + 1 } : item,
      ),
    );
  };

  const decrementAmount = (itemName: string) => {
    setCart((prevCart) =>
      prevCart
        .map((item) => {
          if (item.name === itemName) {
            if (item.name === "Talheres" && item.amount > 0) {
              return { ...item, amount: item.amount - 1 };
            } else if (item.amount > 1) {
              return { ...item, amount: item.amount - 1 };
            }
          }
          return item;
        })
        .filter((item) => item.name === "Talheres" || item.amount > 0),
    );
  };

  const navigateToCheckout = () => {
    const cartData = {
      items: cart,
      observations,
    };
    router.push({
      pathname: "/user/home/checkout",
      params: {
        cart: JSON.stringify(cartData),
        id: id,
      },
    });
  };

  return (
    <View style={styles.root}>
      <View
        style={[
          styles.container,
          {
            backgroundColor,
            paddingBottom: bottom,
            paddingTop: top,
          },
        ]}
      >
        <View style={[styles.row, { marginBottom: 10 }]}>
          <Text style={[styles.text, { color }]}>Itens</Text>
          <Text style={[styles.text, { color }]}>Preço</Text>
        </View>
        <FlatList
          data={cart.filter((item) => item.name !== "Talheres")}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            flexGrow: 0,
          }}
          renderItem={({ item }) => (
            <View style={[styles.containerItem, { backgroundColor: grey }]}>
              <View style={[styles.row]}>
                <Text style={[{ color, width: "60%" }]} numberOfLines={2}>
                  {item.name}
                </Text>
                <Text style={{ color }}>R${item.value.toFixed(2)}</Text>
              </View>
              <View style={styles.rowButtons}>
                <TouchableOpacity
                  style={[
                    styles.smallButton,
                    { backgroundColor: inverseColor },
                  ]}
                  onPress={() => decrementAmount(item.name)}
                >
                  <Text
                    style={[
                      styles.text,
                      {
                        color,
                        fontWeight: "400",
                      },
                    ]}
                  >
                    -
                  </Text>
                </TouchableOpacity>
                <Text style={{ color }}>{item.amount}</Text>
                <TouchableOpacity
                  style={[
                    styles.smallButton,
                    { backgroundColor: inverseColor },
                  ]}
                  onPress={() => incrementAmount(item.name)}
                >
                  <Text
                    style={[
                      styles.text,
                      {
                        color,
                        fontWeight: "400",
                      },
                    ]}
                  >
                    +
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
        <View
          style={{
            gap: 10,
            paddingTop: 10,
          }}
        >
          <View style={styles.row}>
            <Text style={{ color }}>Adc. Talheres</Text>
            <View style={[styles.rowButtons, { paddingHorizontal: 0 }]}>
              <TouchableOpacity
                style={[styles.smallButton, { backgroundColor: inverseColor }]}
                onPress={() => decrementAmount("Talheres")}
              >
                <Text
                  style={[
                    styles.text,
                    {
                      color,
                      fontWeight: "400",
                    },
                  ]}
                >
                  -
                </Text>
              </TouchableOpacity>
              <Text style={{ color }}>
                {cart.find((item) => item.name === "Talheres")?.amount || 0}
              </Text>
              <TouchableOpacity
                style={[styles.smallButton, { backgroundColor: inverseColor }]}
                onPress={() => addItem("Talheres", 0)}
              >
                <Text
                  style={[
                    styles.text,
                    {
                      color,
                      fontWeight: "400",
                    },
                  ]}
                >
                  +
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <TextInput
            placeholder="Observações..."
            placeholderTextColor={color}
            style={{
              backgroundColor: grey,
              color,
              padding: 10,
              opacity: 0.8,
              borderRadius: 10,
              marginTop: 20,
            }}
            value={observations}
            onChangeText={setObservations}
          />
        </View>
        <View style={[styles.row, { marginTop: 10 }]}>
          <Text style={[styles.text, { color, fontWeight: "bold" }]}>
            Subtotal
          </Text>
          <Text style={[styles.text, { color, fontWeight: "bold" }]}>
            R${totalValue}
          </Text>
        </View>
        <TouchableOpacity
          onPress={navigateToCheckout}
          style={[styles.button, { backgroundColor: grey }]}
        >
          <Text style={[styles.text, { color, fontWeight: "bold" }]}>
            Confirmar
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default OrderScreen;

const styles = StyleSheet.create({
  root: { flex: 1 },
  container: {
    flex: 1,
    padding: 20,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
    paddingHorizontal: 10,
  },
  text: {
    fontSize: Platform.OS === "ios" ? 18 : 16,
    fontWeight: "bold",
  },
  containerItem: {
    marginVertical: 10,
    paddingVertical: 10,
    borderRadius: 10,
  },
  smallButton: {
    borderRadius: 5,
    paddingHorizontal: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  rowButtons: {
    gap: 10,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  button: {
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
    padding: 16,
    margin: 12,
    alignSelf: "center",
    borderRadius: 10,
  },
});
