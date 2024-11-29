import { AuthContext } from "@/src/context/auth";
import { getUser, updateOrder } from "@/src/controller";
import { getOrdersByCommerce } from "@/src/controller/common/getOrderByCommerce.controller";
import useTheme from "@/src/hooks/useTheme";
import { Entypo, FontAwesome } from "@expo/vector-icons";
import { useContext, useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const Orders = () => {
  const { user } = useContext(AuthContext);
  const { backgroundColor, color, grey, inverseColor } = useTheme();
  const { bottom, top } = useSafeAreaInsets();
  const [orders, setOrders] = useState<any>([]);
  const [orderUser, setOrderUser] = useState<any>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      getOrdersByCommerce(user?.userId as number).then((res) => setOrders(res));
    };
    fetchOrders();
    const intervalId = setInterval(fetchOrders, 5000);
    return () => clearInterval(intervalId);
  }, [user?.userId]);

  useEffect(() => {
    getUser(Number(orders[0]?.userId)).then((res) => setOrderUser(res));
  }, [orders]);

  const update = async (id: string, value: string) => {
    await updateOrder(Number(user?.userId), Number(id), value).then((res) =>
      console.log(res),
    );
  };

  const renderItem = ({ item }: any) => (
    <RNPickerSelect
      placeholder={{}}
      onValueChange={(value) => update(item.id, value)}
      items={[
        { label: "Confirmado", value: "confirmado" },
        { label: "Preparação", value: "preparação" },
        { label: "Pronto", value: "pronto" },
        { label: "Despachado", value: "indo até você" },
        { label: "Entregue", value: "entregue" },
        { label: "Cancelar Pedido", value: "cancelado" },
      ]}
    >
      <TouchableOpacity
        style={[styles.orderContainer, { backgroundColor: grey }]}
      >
        <View style={[styles.row, { justifyContent: "space-between" }]}>
          <Text style={[styles.commerceName, { color }]}>
            Pedido de {orderUser[0]?.name}
          </Text>
          <Entypo name="chevron-right" color={color} size={24} />
        </View>
        <View style={styles.row}>
          <FontAwesome name="hourglass" color={color} style={{ padding: 6 }} />
          <Text style={[{ color }]}>Pedido {item.status}</Text>
        </View>
        <FlatList
          data={item.items}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.row}>
              <Text
                style={[
                  {
                    color,
                    backgroundColor: inverseColor,
                    padding: 6,
                    borderRadius: 10,
                  },
                ]}
              >
                {item.amount}
              </Text>
              <Text style={[{ color }]}>{item.name}</Text>
            </View>
          )}
        />
      </TouchableOpacity>
    </RNPickerSelect>
  );
  return (
    <View style={styles.root}>
      <View
        style={[
          styles.container,
          { backgroundColor, paddingBottom: bottom, paddingTop: top },
        ]}
      >
        <Text style={[styles.title, { color }]}>Seus pedidos</Text>
        <FlatList
          data={orders}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
        />
      </View>
    </View>
  );
};

export default Orders;

const styles = StyleSheet.create({
  root: { flex: 1 },
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    paddingTop: 40,
    paddingBottom: 20,
    fontSize: 24,
  },
  iconClose: { position: "absolute", top: 0, right: 0, padding: 12 },
  row: {
    gap: 10,
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 4,
  },
  orderContainer: {
    marginVertical: 10,
    padding: 10,
    borderRadius: 10,
  },
  commerceName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
  },
  modalView: {
    gap: 10,
    margin: 20,
    borderRadius: 20,
    padding: 35,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    flex: 1,
    padding: 12,
    alignItems: "center",
    borderRadius: 10,
  },
});
