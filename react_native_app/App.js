import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import StartWorkoutScreen from "./src/screens/StartWorkoutScreen";
import { registerRootComponent } from "expo";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HistoryScreen from "./src/screens/HistoryScreen";
import RoutineScreen from "./src/screens/RoutineScreen";
import { Play, Activity, Star } from "react-native-feather";
import { TailwindProvider } from "tailwindcss-react-native";
import { Provider as StoreProvider } from "react-redux";
import { store } from "./store";

const Tabs = createBottomTabNavigator();

export default function App() {
  return (
    <StoreProvider store={store}>
      <TailwindProvider>
        <NavigationContainer>
          <Tabs.Navigator>
            <Tabs.Screen
              name="Routines"
              component={RoutineScreen}
              options={{
                tabBarIcon: ({ color, size }) => (
                  <Star color={color} size={size} />
                ),
              }}
            />
            <Tabs.Screen
              name="History"
              component={HistoryScreen}
              options={{
                tabBarIcon: ({ color, size }) => (
                  <Activity color={color} size={size} />
                ),
              }}
            />
            <Tabs.Screen
              name="Workout"
              component={StartWorkoutScreen}
              options={{
                tabBarIcon: ({ color, size }) => (
                  <Play color={color} size={size} />
                ),
              }}
            />
          </Tabs.Navigator>
        </NavigationContainer>
      </TailwindProvider>
    </StoreProvider>
  );
}

registerRootComponent(App);
