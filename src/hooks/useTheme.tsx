import { useColorScheme } from "react-native";
import Colors from "../constants/Colors";

const useTheme = () => {
  const colorScheme = useColorScheme() === "dark";

  const isDark = colorScheme;
  const backgroundColor = colorScheme
    ? Colors.dark.background
    : Colors.light.background;
  const grey = colorScheme ? Colors.dark.grey : Colors.light.grey;
  const color = colorScheme ? Colors.dark.text : Colors.light.text;
  const inverseColor = colorScheme ? Colors.light.text : Colors.dark.text;
  const tintColor = colorScheme
    ? Colors.dark.tintColor
    : Colors.light.tintColor;

  return {
    isDark,
    backgroundColor,
    grey,
    color,
    inverseColor,
    tintColor,
  };
};

export default useTheme;
