import { View, Text, FlatList, TouchableOpacity } from "react-native";
import React from "react";
import WorkoutCard from "./WorkoutCard";
import { Plus } from "react-native-feather";
import { useDispatch } from "react-redux";
import {
  setShowWorkoutEditModal,
  setWorkoutEditModalRoutineId,
} from "../slices/modalSlice";
import { Dimensions } from "react-native";
import { nanoid } from "@reduxjs/toolkit";
import { setEditWorkout } from "../slices/workoutSlice";

export default function RoutineContainer({ routine }) {
  const dispatch = useDispatch();

  const viewportWidth = Dimensions.get("window").width;

  // show empty workout model to add new workout
  const onShowEmptyWorkoutEditModal = () => {
    dispatch(setWorkoutEditModalRoutineId(routine._id));
    dispatch(setShowWorkoutEditModal(true));
  };

  return (
    <View className="flex w-full items-center">
      <Text className="text-bold text-xl">
        {routine.name ? routine.name : "undefined"}
      </Text>
      <FlatList
        columnWrapperStyle={{
          flexWrap: "wrap",
          width: viewportWidth * 0.85,
        }}
        data={routine ? routine.workouts : []}
        renderItem={({ item }) => <WorkoutCard workout={item} small={true} />}
        keyExtractor={(item) => (item._id ? item._id : nanoid())}
        scrollEnabled={false}
        numColumns={2}
      />
      <TouchableOpacity
        className="rounded-full px-4 py-2 m-4 shadow-md bg-blue-600"
        onPress={() => onShowEmptyWorkoutEditModal()}
      >
        <View className="flex flex-row justify-between items-center gap-1">
          <Text className="text-bold text-base text-center text-white">
            Add Workout
          </Text>
          <Plus color="white" />
        </View>
      </TouchableOpacity>
    </View>
  );
}
