import {
  View,
  Text,
  Modal,
  Pressable,
  StyleSheet,
  TextInput,
  ScrollView,
} from "react-native";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectShowWorkoutEditModal,
  setShowExerciseAddModal,
} from "../slices/modalSlice";
import { setShowWorkoutEditModal } from "../slices/modalSlice";
import ExerciseAddModal from "./ExerciseAddModal";
import ExerciseInput from "./ExerciseInput";

export default function WorkoutEditModal() {
  const showWorkoutEditModal = useSelector(selectShowWorkoutEditModal);
  const dispatch = useDispatch();

  const workout = useSelector((state) => state.workout);

  return (
    <Modal
      animationType="slide"
      presentationStyle="overFullScreen"
      visible={showWorkoutEditModal}
      statusBarTranslucent={false}
      onRequestClose={() => {
        Alert.alert("Modal has been closed.");
        dispatch(setShowWorkoutEditModal(!showWorkoutEditModal));
      }}
    >
      <ScrollView className="flex flex-1">
        <View className="flex-1">
          <View className="bg-white my-4">
            <TextInput
              className="text-center text-xl m-2"
              placeholder="Workout Name ..."
            />
            <TextInput className="text-base m-2" placeholder="Notes ..." />
            {workout.exercises?.map((e, i) => (
              <ExerciseInput key={i} exercise={e} />
            ))}
            <View className="flex justify-center items-center gap-4 m-2">
              <Pressable className="rounded-full px-4 py-2 shadow-md bg-blue-600">
                <Text
                  className="text-bold text-base text-center text-white"
                  onPress={() => dispatch(setShowExerciseAddModal(true))}
                >
                  Add Exercise
                </Text>
              </Pressable>
              <Pressable
                className="rounded-full px-4 py-2 shadow-md bg-lime-600"
                onPress={() =>
                  dispatch(setShowWorkoutEditModal(!showWorkoutEditModal))
                }
              >
                <Text className="text-bold text-base text-center text-white">
                  Save Changes
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </ScrollView>
      <ExerciseAddModal />
    </Modal>
  );
}
