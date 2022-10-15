import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import StartWorkoutScreen from "../screens/StartWorkoutScreen";
import HistoryScreen from "../screens/HistoryScreen";
import RoutineScreen from "../screens/RoutineScreen";
import { useGetUserByIdQuery } from "../services/userService";
import { getValue } from "../util/localStorage";
import { ActivityIndicator, View } from "react-native";
import { Activity, Play, Star, User } from "react-native-feather";
import ProfileScreen from "../screens/ProfileScreen";
import { useDispatch, useSelector } from "react-redux";
import {
  selectIsAuthenticated,
  selectUser,
  setIsAuthenticated,
  setUser,
} from "../slices/userSlice";
import WorkoutEditModal from "./modals/WorkoutEditModal";
import WorkoutInfoModal from "./modals/WorkoutInfoModal";
import ActiveWorkoutModal from "./modals/ActiveWorkoutModal";
import RoutineEditModal from "./modals/RoutineEditModal";
import ExerciseAddModal from "./modals/ExerciseAddModal";

const Tabs = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export default function Navigation() {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const dispatch = useDispatch();

  const user = useSelector(selectUser);
  const skip = user ? false : true;
  const { data, isError, isLoading } = useGetUserByIdQuery({
    skip,
  });

  // try to set user from initial local storage when root component mounts
  useEffect(() => {
    const setUserFromLocalStorage = async () => {
      try {
        const user = JSON.parse(await getValue("user"));
        if (user && user.token) {
          dispatch(setUser(user));
          console.log("user in local storage!");
        }
      } catch {}
    };
    setUserFromLocalStorage();
  }, []);

  // set authentication to true, when token valid and query succeeds
  useEffect(() => {
    if (data && !isError) {
      dispatch(setIsAuthenticated(true));
    } else {
      dispatch(setIsAuthenticated(false));
    }
  }, [data, isError]);

  return (
    <React.Fragment>
      <NavigationContainer>
        {!isLoading ? (
          isAuthenticated ? (
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
              <Tabs.Screen
                name="Profile"
                component={ProfileScreen}
                options={{
                  tabBarIcon: ({ color, size }) => (
                    <User color={color} size={size} />
                  ),
                }}
              />
            </Tabs.Navigator>
          ) : (
            <Stack.Navigator>
              <Stack.Screen name="Login" component={LoginScreen} />
              <Stack.Screen name="Register" component={RegisterScreen} />
            </Stack.Navigator>
          )
        ) : (
          <View className="flex-1 justify-center">
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        )}
      </NavigationContainer>
      <React.Fragment>
        <WorkoutEditModal />
        <WorkoutInfoModal />
        <ActiveWorkoutModal />
        <RoutineEditModal />
      </React.Fragment>
    </React.Fragment>
  );
}
