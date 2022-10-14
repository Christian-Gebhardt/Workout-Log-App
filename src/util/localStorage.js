import * as SecureStore from "expo-secure-store";

export async function save(key, value) {
  await SecureStore.setItemAsync(key, value);
}

export async function getValue(key) {
  return await SecureStore.getItemAsync(key);
}

export async function deleteItem(key) {
  return await SecureStore.deleteItemAsync(key);
}
