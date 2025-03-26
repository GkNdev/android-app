import {
  BackHandler,
  Text,
  View,
  Image,
  TouchableOpacity,
  Platform,
} from "react-native";
import { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import * as WebBrowser from "expo-web-browser";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function App() {
  async function openTopluyo() {
    await WebBrowser.openBrowserAsync("https://topluyo.com/", {
      showTitle: false,
      toolbarColor: "#181818",
      showInRecents: true,
    });
  }

  function exitApp() {
    BackHandler.exitApp();
  }

  useEffect(() => {
    const openBrowserAndExit = async () => {
      try {
        await openTopluyo();
      } catch (error) {
        BackHandler.exitApp();
      }
    };

    openBrowserAndExit();
  }, []);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#141414",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Image
          style={{ width: 180, height: 180, borderRadius: 280 }}
          source={require("./assets/topluyo.png")}
        />
        <View style={{ marginTop: 24, flexDirection: "row", columnGap: 12 }}>
          {Platform.OS !== "ios" && (
            <CustomButton
              text={"Çık"}
              color={"red"}
              icon={<Ionicons name="exit-outline" size={24} color="#fff" />}
              onPress={exitApp}
            />
          )}
          <CustomButton
            text={"Topluyo'yu Aç"}
            color={"purple"}
            onPress={openTopluyo}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

function CustomButton({ text, color, icon, onPress }) {
  return (
    <TouchableOpacity
      style={{
        paddingHorizontal: 24,
        paddingVertical: 12,
        borderRadius: 8,
        backgroundColor: color,
        flexDirection: "row",
        columnGap: 4,
        alignItems: "center",
        justifyContent: "center",
      }}
      onPress={onPress}
    >
      {icon && icon}
      <Text style={{ color: "#fff", fontWeight: 600, letterSpacing: 1 }}>
        {text}
      </Text>
    </TouchableOpacity>
  );
}
