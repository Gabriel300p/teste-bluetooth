import React, { useState, useLayoutEffect } from "react";
import { Text, Button, View } from "react-native";
import * as Permissions from "expo-permissions";
import { BleManager } from "react-native-ble-plx";

const BluetoothScanner: React.FC = () => {
  const [scanning, setScanning] = useState(false);
  const [devices, setDevices] = useState<any[]>([]);
  const [error, setError] = useState("");
  const manager = new BleManager(); // Declare a variável manager aqui

  useLayoutEffect(() => {
    Permissions.askAsync(Permissions.LOCATION).then(({ status }) => {
      if (status !== "granted") {
        setError("Permissão de localização negada.");
      }
    });
  }, []);

  const scanDevices = () => {
    setScanning(true);
    setDevices([]);

    manager.startDeviceScan(null, null, (error, device) => {
      if (error) {
        setError(error.message);
        setScanning(false);
        // manager.destroy();
        return;
      }

      if (device && device.name) {
        setDevices((prevDevices) => {
          if (prevDevices.some((d) => d.id === device.id)) {
            return prevDevices;
          }

          return [...prevDevices, device];
        });
      }
    });
  };

  const stopScan = () => {
    setScanning(false);
    manager.destroy();
  };

  return (
    <View className="flex-1 justify-center items-center">
      {error ? <Text>{error}</Text> : null}
      {scanning ? (
        <>
          <Text>Scaneando...</Text>
          <Button title="Parar" onPress={stopScan} />
        </>
      ) : (
        <Button title="Escanear" onPress={scanDevices} />
      )}
      {devices.map((device) => (
        <Text key={device.id}>{device.name}</Text>
      ))}
    </View>
  );
};

export default BluetoothScanner;
