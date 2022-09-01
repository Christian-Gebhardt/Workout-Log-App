import {
  View,
  Text,
  Modal,
  Pressable,
  StyleSheet,
  ScrollView,
} from "react-native";
import React, { useLayoutEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import ExerciseInput from "./ExerciseInput";
import ExerciseAddModal from "./ExerciseAddModal";
import { useDispatch, useSelector } from "react-redux";
import { selectShowActiveWorkoutModal } from "../slices/modalSlice";
import {
  setShowActiveWorkoutModal,
  setShowExerciseAddModal,
} from "../slices/modalSlice";

export function ActiveWorkoutModal() {
  const showActiveWorkoutModal = useSelector(selectShowActiveWorkoutModal);
  const dispatch = useDispatch();

  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions(
      {
        headerShown: false,
      },
      []
    );
  });
  const workout = useSelector((state) => state.workout);

  return (
    <Modal
      animationType="slide"
      presentationStyle="overFullScreen"
      visible={showActiveWorkoutModal}
      statusBarTranslucent={false}
      onRequestClose={() => {
        Alert.alert("Modal has been closed.");
        dispatch(setShowActiveWorkoutModal(!showActiveWorkoutModal));
      }}
    >
      <ScrollView className="flex flex-1">
        <View className="bg-white my-4">
          <Text className="text-bold text-2xl m-4 text-center">
            {workout.name}
          </Text>
          {workout.exercises?.map((e, i) => (
            <ExerciseInput key={i} exercise={e} />
          ))}
          <Pressable className="rounded-full px-4 py-2 shadow-md bg-blue-600 w-1/2 self-center">
            <Text
              className="text-bold text-base text-center text-white"
              onPress={() => dispatch(setShowExerciseAddModal(true))}
            >
              Add Exercise
            </Text>
          </Pressable>
          <View className="flex justify-center items-center gap-2 my-8 mx-2">
            <Pressable
              className="rounded-full py-2 px-6 shadow-md bg-green-600 w-1/2"
              onPress={() =>
                dispatch(setShowActiveWorkoutModal(!showActiveWorkoutModal))
              }
            >
              <Text className="text-bold text-base text-center text-white">
                Finish
              </Text>
            </Pressable>
            <Pressable
              className="rounded-full py-2 px-6 shadow-md bg-red-600 w-1/2"
              onPress={() =>
                dispatch(setShowActiveWorkoutModal(!showActiveWorkoutModal))
              }
            >
              <Text className="text-bold text-base text-center text-white">
                Stop
              </Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
      <ExerciseAddModal />
    </Modal>
  );
}

export default ActiveWorkoutModal;
