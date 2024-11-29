import Icon from "@expo/vector-icons/FontAwesome";
import {
  Platform,
  StyleSheet,
  TextInput as TextInputComponent,
  TextInputProps,
  View,
} from "react-native";
import useTheme from "../hooks/useTheme";

type Props = {
  placeholder: string;
  onChangeText: (text: string) => void;
  value: string;
  iconName?: string;
} & TextInputProps;

export const TextInput = (
  { placeholder, onChangeText, value, iconName }: Props,
  props: TextInputComponent,
) => {
  const { color } = useTheme();

  return (
    <View style={styles.container}>
      {iconName != null && (
        <Icon
          name={iconName ?? "search"}
          size={18}
          color={color}
          style={styles.icon}
        />
      )}
      <TextInputComponent
        {...props}
        style={[
          styles.textInput,
          { borderColor: color, color, paddingLeft: iconName ? 40 : 12 },
        ]}
        onChangeText={onChangeText}
        value={value}
        placeholder={placeholder}
        placeholderTextColor={"#9e9e9e"}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
  },
  icon: {
    position: "absolute",
    left: 12,
  },
  textInput: {
    flex: 1,
    padding: 12,
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 40,
    fontSize: Platform.OS === "ios" ? 16 : 14,
  },
});
