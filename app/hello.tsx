import React, { useState, useLayoutEffect, useRef } from "react";
import { Text, View } from "react-native";
import { BleManager } from "react-native-ble-plx";
import * as Permissions from "expo-permissions";

export default function App() {
  const [devices, setDevices] = useState([]);
  const bleManagerRef = useRef<BleManager>();

  useLayoutEffect(() => {
    const startScan = async () => {
      const { status } = await Permissions.askAsync(Permissions.LOCATION);
      if (status !== "granted") {
        console.error("Location permission not granted");
        return;
      }

      bleManagerRef.current = new BleManager();

      bleManagerRef.current.startDeviceScan(null, null, (error, device) => {
        if (error) {
          console.error(error);
          return;
        }
        if (device && !devices.find((d) => d.id === device.id)) {
          setDevices((devices) => [...devices, device]);
        }
      });
    };

    startScan();

    return () => {
      bleManagerRef.current?.stopDeviceScan();
    };
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Dispositivos Bluetooth:</Text>
      {devices.map((device) => (
        <Text key={device.id}>{device.name || device.id}</Text>
      ))}
    </View>
  );
}
