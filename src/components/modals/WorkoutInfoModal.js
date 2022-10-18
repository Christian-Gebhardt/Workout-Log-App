import { View, Text, StyleSheet, Modal, TouchableOpacity } from "react-native";
import React from "react";
import ExerciseItem from "../ExerciseItem";
import { useDispatch, useSelector } from "react-redux";
import {
  setShowWorkoutInfoModal,
  setShowActiveWorkoutModal,
  selectWorkoutInfoModalWorkout,
} from "../../slices/modalSlice";
import { selectShowWorkoutInfoModal } from "../../slices/modalSlice";
import { setActiveWorkout } from "../../slices/workoutSlice";

export function WorkoutInfoModal() {
  const showWorkoutInfoModal = useSelector(selectShowWorkoutInfoModal);
  const dispatch = useDispatch();

  // select workout that was clicked on
  const workout = useSelector(selectWorkoutInfoModalWorkout);

  const onStartPress = (workout) => {
    dispatch(setActiveWorkout(workout));
    dispatch(setShowWorkoutInfoModal(!showWorkoutInfoModal));
    dispatch(setShowActiveWorkoutModal(true));
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={showWorkoutInfoModal}
      onRequestClose={() => {
        dispatch(setShowWorkoutInfoModal(!showWorkoutInfoModal));
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text className="text-bold text-2xl mb-4 text-center">
            {workout ? workout.name : "Workout"}
          </Text>
          <View className="flex flex-col justify-between">
            {workout?.exercises.map((e, i) => (
              <ExerciseItem key={i} exerciseInstance={e} />
            ))}
          </View>
          <View className="flex gap-2 mx-2 mt-2">
            <TouchableOpacity
              className="rounded-full p-2 m-6 shadow-md bg-red-600"
              onPress={() =>
                dispatch(setShowWorkoutInfoModal(!showWorkoutInfoModal))
              }
            >
              <Text className="text-bold text-base text-center text-white">
                Cancel
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="rounded-full p-2 m-6 shadow-md bg-blue-600"
              onPress={() => onStartPress(workout)}
            >
              <Text className="text-bold text-base text-center text-white">
                Start Workout
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});

export default WorkoutInfoModal;
