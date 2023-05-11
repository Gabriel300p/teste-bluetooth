declare module "react-native-ble-plx" {
  export default class BleManager {
    constructor(options?: BleManagerOptions);
    public startDeviceScan(
      serviceUUIDs: string[] | null,
      options: ScanOptions | null,
      callback: (error: Error | null, device: Device | null) => void
    ): void;
    public stopDeviceScan(): void;
    public connectToDevice(
      deviceIdentifier: string,
      options?: ConnectOptions
    ): Promise<Device>;
    public cancelDeviceConnection(deviceIdentifier: string): Promise<void>;
    public on(eventName: string, handler: (...args: any[]) => void): void;
    public removeListener(
      eventName: string,
      handler: (...args: any[]) => void
    ): void;
  }

  export interface BleManagerOptions {
    restoreStateIdentifier?: string;
    restoreStateFunction?: (bleManager: BleManager) => Promise<void> | void;
  }

  export interface ScanOptions {
    scanMode?: number;
    callbackType?: number;
    matchMode?: number;
  }

  export interface ConnectOptions {
    requestMTU?: number;
  }

  export interface Device {
    id: string;
    name?: string;
    connect(): Promise<void>;
    disconnect(): Promise<void>;
    discoverAllServicesAndCharacteristics(): Promise<void>;
  }
}
