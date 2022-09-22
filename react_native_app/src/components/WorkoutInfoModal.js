import { View, Text, StyleSheet, Modal, Pressable } from "react-native";
import React from "react";
import ExerciseItem from "./ExerciseItem";
import { useDispatch, useSelector } from "react-redux";
import { selectShowWorkoutInfoModal } from "../slices/modalSlice";

import {
  setShowWorkoutInfoModal,
  setShowActiveWorkoutModal,
} from "../slices/modalSlice";

export function WorkoutInfoModal({ exercises }) {
  const showWorkoutInfoModal = useSelector(selectShowWorkoutInfoModal);
  const dispatch = useDispatch();

  const onStartPress = () => {
    dispatch(setShowWorkoutInfoModal(!showWorkoutInfoModal));
    dispatch(setShowActiveWorkoutModal(true));
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={showWorkoutInfoModal}
      onRequestClose={() => {
        Alert.alert("Modal has been closed.");
        dispatch(setShowWorkoutInfoModal(!showWorkoutInfoModal));
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text className="text-bold text-xl mb-4 text-center">
            Workout Name
          </Text>
          <View className="flex flex-col justify-between">
            {exercises?.map((e, i) => (
              <ExerciseItem key={i} exercise={e} />
            ))}
          </View>
          <View className="flex gap-2 mx-2 mt-2">
            <Pressable
              className="rounded-full p-2 m-6 shadow-md bg-red-600"
              onPress={() =>
                dispatch(setShowWorkoutInfoModal(!showWorkoutInfoModal))
              }
            >
              <Text className="text-bold text-base text-center text-white">
                Cancel
              </Text>
            </Pressable>
            <Pressable
              className="rounded-full p-2 m-6 shadow-md bg-blue-600"
              onPress={onStartPress}
            >
              <Text className="text-bold text-base text-center text-white">
                Start Workout
              </Text>
            </Pressable>
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
