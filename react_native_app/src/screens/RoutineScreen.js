import { View, Text, ScrollView, StyleSheet, Pressable } from "react-native";
import React, { useLayoutEffect, useState } from "react";
import RoutineContainer from "../components/RoutineContainer";
import { useNavigation } from "@react-navigation/native";
import { Divider } from "@rneui/themed";
import { SafeAreaView } from "react-native";

export default function RoutineScreen() {
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions(
      {
        headerShown: false,
      },
      []
    );
  });
  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView>
        <View className="flex justify-center m-2">
          <Text className="text-bold text-2xl text-center">Routines</Text>
          <Divider style={styles.divider} />
          <View className="flex justify-center">
            <RoutineContainer />
            <Divider style={styles.divider} />
          </View>
          <Pressable className="rounded-full p-2 m-6 shadow-md bg-lime-600 w-1/2 self-center">
            <Text className="text-bold text-base text-center text-white">
              Add new routine
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  divider: {
    alignSelf: "center",
    color: "#2089dc",
    width: "87%",
    margin: 10,
  },
});
