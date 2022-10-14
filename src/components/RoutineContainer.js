import { View, Text, FlatList, Pressable } from "react-native";
import React from "react";
import WorkoutCard from "./WorkoutCard";
import { Plus } from "react-native-feather";
import { useDispatch, useSelector } from "react-redux";
import { setShowWorkoutEditModal } from "../slices/modalSlice";
import WorkoutEditModal from "./modals/WorkoutEditModal";

export default function RoutineContainer(item) {
  const dispatch = useDispatch();

  const { routine } = item;

  return (
    <View className="flex items-center">
      <Text className="text-bold text-xl">
        {routine.name ? routine.name : "undefined"}
      </Text>
      <FlatList
        data={routine ? routine.workouts : []}
        renderItem={({ item }) => <WorkoutCard workout={item} small={true} />}
        keyExtractor={(item) => item.id}
        numColumns={2}
        scrollEnabled={false}
      />
      <Pressable
        className="rounded-full px-4 py-2 m-4 shadow-md bg-blue-600"
        onPress={() => dispatch(setShowWorkoutEditModal(true))}
      >
        <View className="flex flex-row justify-between items-center gap-1">
          <Text className="text-bold text-base text-center text-white">
            Add Workout
          </Text>
          <Plus color="white" />
        </View>
      </Pressable>
      <WorkoutEditModal routineId={routine._id} />
    </View>
  );
}