import { configStore } from "../../stores/configStore";
import type { ConfigStore } from "../../stores/types";

export function updateConfig(key: keyof ConfigStore, value: string | number): void {
  configStore.update(config => {
    const newConfig = { ...config, [key]: value };
    return newConfig;
  });
}