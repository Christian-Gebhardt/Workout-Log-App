import { View, Text, SafeAreaView, ScrollView } from "react-native";
import React, { useLayoutEffect } from "react";
import { StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Divider } from "@rneui/themed";
import WorkoutCard from "../components/WorkoutCard";
import { useSelector } from "react-redux";

export default function HistoryScreen() {
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions(
      {
        headerShown: false,
      },
      []
    );
  });

  const prevWorkouts = useSelector((state) => state.workoutHistory);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView>
        <View className="m-2">
          <Text className="text-center text-bold text-2xl">History Screen</Text>
          <Divider style={styles.divider} />
        </View>
        <View className="flex justify-center items-center">
          {prevWorkouts.map((e, i) => (
            <WorkoutCard workout={e} key={i} />
          ))}
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
