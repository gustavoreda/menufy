import { AuthContext } from "@/src/context/auth";
import { getOrdersByUser } from "@/src/controller";
import { cancelOrder } from "@/src/controller/common/cancelOrder.controller";
import useTheme from "@/src/hooks/useTheme";
import { AntDesign, Entypo, FontAwesome } from "@expo/vector-icons";
import { useContext, useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const Orders = () => {
  const { user } = useContext(AuthContext);
  const [modalVisible, setModalVisible] = useState(false);
  const { backgroundColor, color, grey, inverseColor } = useTheme();
  const { bottom, top } = useSafeAreaInsets();
  const [orders, setOrders] = useState<any>([]);

  const [selectedOrder, setSelectedOrder] = useState<any>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      const res = await getOrdersByUser(user?.userId as number);
      setOrders(res);
    };
    fetchOrders();
    const intervalId = setInterval(fetchOrders, 5000);
    return () => clearInterval(intervalId);
  }, [user?.userId]);

  const renderStatus = (
    label: string,
    text: string,
    status: string,
    currentStatus: any,
  ) => {
    const color =
      status === currentStatus && status !== "cancelado"
        ? "green"
        : status === "cancelado"
          ? "red"
          : "grey";

    return (
      <View>
        <View style={styles.row}>
          <AntDesign name="checkcircleo" color={color} size={16} />
          <Text style={{ color }}>{label}</Text>
        </View>
        <Text style={{ fontSize: 12, color, opacity: 0.5 }}>{text}</Text>
      </View>
    );
  };

  const cancelOrderAlert = () => {
    Alert.alert(
      "Cancelar Pedido",
      "Tem certeza que deseja cancelar o pedido?",
      [
        {
          text: "Sim",
          onPress: () => cancelOrder(user?.userId as number, selectedOrder.id),
        },
        {
          text: "Não",
          onPress: () => {},
          style: "cancel",
        },
      ],
      { cancelable: false },
    );
  };

  const renderItem = ({ item }: any) => (
    <TouchableOpacity
      style={[styles.orderContainer, { backgroundColor: grey }]}
      onPress={() => {
        setSelectedOrder(item);
        setModalVisible(true);
      }}
    >
      <View style={[styles.row, { justifyContent: "space-between" }]}>
        <Text style={[styles.commerceName, { color }]}>
          {item.commerce.name.trim()}
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
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
          setSelectedOrder(null); // Reseta o pedido selecionado ao fechar
        }}
      >
        <View style={styles.centeredView}>
          <View style={[styles.modalView, { backgroundColor: grey }]}>
            <Pressable
              onPress={() => {
                setModalVisible(false);
                setSelectedOrder(null);
              }}
              style={styles.iconClose}
            >
              <AntDesign name="close" color={"red"} size={18} />
            </Pressable>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "bold",
                color,
                alignSelf: "center",
              }}
            >
              ACOMPANHE SEU PEDIDO
            </Text>
            {selectedOrder && (
              <>
                {renderStatus(
                  "Pedido confirmado",
                  "Seu pedido já foi confirmado.",
                  "confirmado",
                  selectedOrder.status,
                )}
                {renderStatus(
                  "Seu pedido está sendo preparado",
                  "Já começamos a produzir seu pedido.",
                  "preparação",
                  selectedOrder.status,
                )}
                {renderStatus(
                  "Pedido pronto",
                  "Seu pedido está aguardando para ser entregue",
                  "pronto",
                  selectedOrder.status,
                )}
                {renderStatus(
                  "Indo até você",
                  "Aguente ai, seu pedido já saiu.",
                  "indo até você",
                  selectedOrder.status,
                )}
                {renderStatus(
                  "Entrega feita com sucesso",
                  "Aproveite sua comida",
                  "entregue",
                  selectedOrder.status,
                )}
                {selectedOrder.status === "cancelado" &&
                  renderStatus(
                    "Pedido cancelado",
                    "Seu pedido foi cancelado.",
                    "cancelado",
                    selectedOrder.status,
                  )}
              </>
            )}
            <View style={[styles.row, { alignItems: "stretch" }]}>
              <TouchableOpacity
                onPress={cancelOrderAlert}
                style={[styles.button, { backgroundColor: inverseColor }]}
              >
                <Text style={{ color }}>Cancelar Pedido</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
