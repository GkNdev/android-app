import { StatusBar } from "expo-status-bar";
import { BackHandler, View } from "react-native";
import { Camera } from "expo-camera";
import { useEffect, useRef } from "react";
import WebView from "react-native-webview";
import { SafeAreaView } from "react-native-safe-area-context";

export default function App() {
  const webViewRef = useRef(null);

  useEffect(() => {
    (async () => {
      const backAction = () => {
        if (webViewRef.current) {
          webViewRef.current.goBack();
          return true;
        }
        return false;
      };
      BackHandler.addEventListener("hardwareBackPress", backAction);

      const cameraStatus = await Camera.getCameraPermissionsAsync();
      const cameraMicStatus = await Camera.getMicrophonePermissionsAsync();

      if (cameraStatus.status !== "grainted") {
        await Camera.requestCameraPermissionsAsync();
      }
      if (cameraMicStatus.status !== "granted") {
        await Camera.requestMicrophonePermissionsAsync();
      }
    })();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#181A1B" }}>
      <View style={{ flex: 1 }}>
        <WebView ref={webViewRef} source={{ uri: "https://topluyo.com/" }} />
        <StatusBar style="light" />
      </View>
    </SafeAreaView>
  );
}
