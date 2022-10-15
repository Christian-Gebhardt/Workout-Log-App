import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  TextInput,
  ScrollView,
  SafeAreaView,
} from "react-native";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectShowWorkoutEditModal,
  selectWorkoutEditModalRoutineId,
  setShowExerciseAddModal,
} from "../../slices/modalSlice";
import { setShowWorkoutEditModal } from "../../slices/modalSlice";
import ExerciseInput from "../ExerciseInput";
import { useAddWorkoutToRoutineMutation } from "../../services/routineService";
import {
  resetEditWorkout,
  selectEditWorkout,
  setEditWorkoutName,
  setEditWorkoutNotes,
} from "../../slices/workoutSlice";
import ExerciseAddModal from "./ExerciseAddModal";

export default function WorkoutEditModal() {
  const showWorkoutEditModal = useSelector(selectShowWorkoutEditModal);

  const workout = useSelector(selectEditWorkout);
  const dispatch = useDispatch();

  const [addWorkoutToRoutine] = useAddWorkoutToRoutineMutation();

  const routineId = useSelector(selectWorkoutEditModalRoutineId);

  const { name, notes, exercises } = workout;

  const onChange = (name) => (value) => {
    if (name === "name") dispatch(setEditWorkoutName(value));
    if (name === "notes") dispatch(setEditWorkoutNotes(value));
  };

  const onSaveWorkout = () => {
    addWorkoutToRoutine({
      id: routineId,
      workout,
    });
    dispatch(setShowWorkoutEditModal(false));
  };

  // reset editWorkout in global state
  const onCancel = () => {
    dispatch(resetEditWorkout);
    dispatch(setShowWorkoutEditModal(!showWorkoutEditModal));
  };

  return (
    <Modal
      animationType="slide"
      presentationStyle="overFullScreen"
      visible={showWorkoutEditModal}
      statusBarTranslucent={false}
      onRequestClose={() => {
        dispatch(setShowWorkoutEditModal(!showWorkoutEditModal));
      }}
    >
      <ExerciseAddModal />
      <SafeAreaView>
        <ScrollView className="flex flex-1">
          <View className="flex-1">
            <View className="bg-white my-4">
              <TextInput
                className="text-center text-xl m-2"
                placeholder="Workout Name ..."
                value={name}
                onChangeText={onChange("name")}
                autoCapitalize="none"
              />
              <TextInput
                className="text-base m-2"
                placeholder="Notes ..."
                value={notes}
                onChangeText={onChange("notes")}
                autoCapitalize="none"
                multiline={true}
              />
              {exercises?.map((e, i) => (
                <ExerciseInput key={i} exercise={e} indexExercise={i} />
              ))}
              <View className="flex justify-center items-center gap-4 m-2">
                <TouchableOpacity
                  className="w-8/12 rounded-full px-4 py-3 shadow-md bg-blue-600"
                  onPress={() => dispatch(setShowExerciseAddModal(true))}
                >
                  <Text className="text-bold text-base text-center text-white">
                    Add Exercise
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  className="w-8/12 rounded-full px-4 py-3 shadow-md bg-red-600"
                  onPress={onCancel}
                >
                  <Text className="text-bold text-base text-center text-white">
                    Cancel
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  className="w-8/12 rounded-full px-4 py-3 shadow-md bg-lime-600"
                  onPress={onSaveWorkout}
                >
                  <Text className="text-bold text-base text-center text-white">
                    Save Changes
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
}
