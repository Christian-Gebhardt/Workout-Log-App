import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  TextInput,
  ScrollView,
  SafeAreaView,
} from "react-native";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectShowWorkoutEditModal,
  setShowExerciseAddModal,
} from "../../slices/modalSlice";
import { setShowWorkoutEditModal } from "../../slices/modalSlice";
import ExerciseAddModal from "./ExerciseAddModal";
import ExerciseInput from "../ExerciseInput";
import { useAddWorkoutToRoutineMutation } from "../../services/routineService";

export default function WorkoutEditModal({ existingWorkout }) {
  const showWorkoutEditModal = useSelector(selectShowWorkoutEditModal);
  const dispatch = useDispatch();

  const [addWorkoutToRoutine] = useAddWorkoutToRoutineMutation();

  const [workout, setWorkout] = useState(
    existingWorkout
      ? existingWorkout
      : {
          name: "",
          notes: "",
          exercises: [],
        }
  );

  const { name, notes, exercises } = workout;

  const onChange = (name) => (value) => {
    setWorkout((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onSaveWorkout = async () => {
    const res = await addWorkoutToRoutine({
      id: routineId,
      workout,
    });
    console.log(res);
    dispatch(setShowWorkoutEditModal(false));
  };

  const onCancel = () => {
    dispatch(setShowWorkoutEditModal(!showWorkoutEditModal));
    setWorkout({
      name: "",
      notes: "",
      exercises: [],
    });
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
                <ExerciseInput
                  key={i}
                  exercise={e}
                  idx={i}
                  setWorkout={setWorkout}
                />
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
      <ExerciseAddModal setWorkout={setWorkout} />
    </Modal>
  );
}
