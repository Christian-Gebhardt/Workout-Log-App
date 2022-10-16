import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React, { useState } from "react";
import WorkoutCard from "./WorkoutCard";
import { Plus, Delete, Repeat } from "react-native-feather";
import { useDispatch } from "react-redux";
import {
  setShowWorkoutEditModal,
  setWorkoutEditModalRoutineId,
} from "../slices/modalSlice";
import { Dimensions } from "react-native";
import MenuDropdown from "./MenuDropdown";
import { useDeleteRoutineMutation } from "../services/routineService";

export default function RoutineContainer({ routine, isActiveRoutine }) {
  const dispatch = useDispatch();

  const viewportWidth = Dimensions.get("window").width;

  const [deleteRoutine] = useDeleteRoutineMutation();

  const [visible, setVisible] = useState(false);

  // pass options to menu modal with actions
  const menuOptions = [
    {
      name: "remove",
      onPress: () =>
        deleteRoutine({
          routineId: routine._id,
        }),
      icon: (
        <Delete
          width={styles.icon.width}
          height={styles.icon.height}
          color="red"
        />
      ),
    },
    {
      name: "replace",
      icon: (
        <Repeat
          width={styles.icon.width}
          height={styles.icon.height}
          color="gray"
        />
      ),
    },
  ];

  // show empty workout model to add new workout
  const onShowEmptyWorkoutEditModal = () => {
    dispatch(setWorkoutEditModalRoutineId(routine._id));
    dispatch(setShowWorkoutEditModal(true));
  };

  return (
    <View
      className={
        !isActiveRoutine
          ? "flex items-center border-2 rounded-lg border-slate-300 m-2"
          : "flex items-center border-2 rounded-lg border-indigo-400 m-2"
      }
    >
      <View className="flex flex-row justify-between items-center gap-2 my-2">
        <Text className="text-bold text-2xl p-2">
          {routine.name ? routine.name : "undefined"}
        </Text>
        <MenuDropdown
          visible={visible}
          setVisible={setVisible}
          options={menuOptions}
        />
      </View>
      <FlatList
        columnWrapperStyle={{
          flexWrap: "wrap",
          width: viewportWidth * 0.85,
        }}
        data={routine ? routine.workouts : []}
        renderItem={({ item }) => (
          <WorkoutCard routineId={routine._id} workout={item} small={true} />
        )}
        keyExtractor={(item, i) => (item._id ? item._id : i)}
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

const styles = StyleSheet.create({
  icon: {
    width: 18,
    height: 18,
  },
});
