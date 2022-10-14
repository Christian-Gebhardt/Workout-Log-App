import React from "react";
import { registerRootComponent } from "expo";
import { TailwindProvider } from "tailwindcss-react-native";
import { Provider as StoreProvider } from "react-redux";
import { store } from "./store";
import Navigation from "./src/components/Navigation";
import Toast from "react-native-toast-message";

export default function App() {
  return (
    <StoreProvider store={store}>
      <TailwindProvider>
        <Navigation />
        <Toast />
      </TailwindProvider>
    </StoreProvider>
  );
}

registerRootComponent(App);
