import { SafeAreaView, ScrollView, View, Text } from "react-native";
import React from "react";
import { StyleSheet, Pressable } from "react-native";
import WorkoutCard from "../components/WorkoutCard";
import WorkoutInfoModal from "../components/modals/WorkoutInfoModal";
import { Divider } from "@rneui/themed";
import ActiveWorkoutModal from "../components/modals/ActiveWorkoutModal";
import { useDispatch, useSelector } from "react-redux";
import { setShowWorkoutInfoModal } from "../slices/modalSlice";

export default function StartWorkoutScreen() {
  const dispatch = useDispatch();

  const exercises = useSelector((state) => state.availableExercises);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView>
        <View className="m-2">
          <Text className="text-bold text-2xl text-center">
            Start New Workout
          </Text>
          <Divider style={styles.divider} />
          <View className="p-2">
            <Text className="text-bold text-lg p-2 text-center">
              Next for your plan:
            </Text>
            <Pressable onPress={() => dispatch(setShowWorkoutInfoModal(true))}>
              <WorkoutCard />
            </Pressable>
          </View>
          <Divider style={styles.divider} />
          <View className="p-2 text-center">
            <Text className="text-bold text-lg text-center p-2">
              Workouts in your routine...
            </Text>
            <Pressable onPress={() => dispatch(setShowWorkoutInfoModal(true))}>
              <WorkoutCard />
            </Pressable>
            <Pressable onPress={() => dispatch(setShowWorkoutInfoModal(true))}>
              <WorkoutCard />
            </Pressable>
          </View>
        </View>
        <WorkoutInfoModal exercises={exercises} />
        <ActiveWorkoutModal />
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
