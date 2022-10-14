import { View, Text, SafeAreaView, TouchableOpacity } from "react-native";
import React from "react";
import { deleteItem } from "../util/localStorage";
import { useDispatch } from "react-redux";
import { setIsAuthenticated } from "../slices/userSlice";
import Toast from "react-native-toast-message";

export default function ProfileScreen() {
  const dispatch = useDispatch();

  const onLogout = async () => {
    deleteItem("user");
    dispatch(setIsAuthenticated(false));
    Toast.show({
      type: "info",
      text1: "Logout successful! Please reauthenticate.",
      topOffset: 80,
    });
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex justify-center items-center">
        <TouchableOpacity
          className="w-11/12 bg-slate-300 rounded-lg p-4 my-4"
          onPress={onLogout}
        >
          <Text className="text-2xl text-center text-bold">Logout</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
