import {
  View,
  Text,
  StyleSheet,
  Modal,
  Pressable,
  TextInput,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectShowExerciseAddModal,
  setShowExerciseAddModal,
} from "../../slices/modalSlice";
import ExerciseItem from "../ExerciseItem";
import { Divider } from "@rneui/themed";
import { Search } from "react-native-feather";
import { useGetExercisesQuery } from "../../services/exerciseService";
import { addEditWorkoutExercises } from "../../slices/workoutSlice";

export default function ExerciseAddModal() {
  const showExerciseAddModal = useSelector(selectShowExerciseAddModal);
  const dispatch = useDispatch();

  const { data: exercises } = useGetExercisesQuery();

  const [searchInput, setSearchInput] = useState("");
  const [selectableExercises, setSelectableExercises] = useState([]);

  // init selectable Exercises once available exercises are fetched from the api
  useEffect(() => {
    setSelectableExercises(
      exercises ? exercises?.map((e) => ({ ...e, isSelected: false })) : []
    );
  }, [exercises]);

  // reset/unselect all exercises
  const resetSelectableExercises = () => {
    setSelectableExercises(
      selectableExercises.map((e) => ({ ...e, isSelected: false }))
    );
  };

  // add exercise that was selected to selectableExercises
  const updateSelectableExercises = (exercise) => {
    const updatedSelectableExercises = [...selectableExercises].map((e) =>
      exercise._id === e._id ? { ...e, isSelected: !e.isSelected } : e
    );
    setSelectableExercises(updatedSelectableExercises);
  };

  // add all selected exercises to workout, reselect exercises and close modal
  const addExercises = () => {
    const newExercises = [...selectableExercises].reduce((arr, e) => {
      if (e.isSelected)
        arr.push({
          name: e.name,
          exercise: e._id,
          sets: [],
        });
      return arr;
    }, []);
    dispatch(addEditWorkoutExercises(newExercises));
    resetSelectableExercises();
    dispatch(setShowExerciseAddModal(!showExerciseAddModal));
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={showExerciseAddModal}
      onRequestClose={() => {
        dispatch(setShowExerciseAddModal(!showExerciseAddModal));
      }}
    >
      <View className="flex flex-1 justify-center items-center">
        <View style={styles.modalView}>
          <Text className="text-bold text-xl m-2 text-center">
            Add Exercises...
          </Text>
          <View className="flex flex-row justify-between items-center self-left">
            <TextInput
              className="text-base self-left m-2 rounded-full border-solid border-2 py-1 border-gray-200 px-6"
              placeholder="search..."
              value={searchInput}
              onChangeText={(text) => {
                setSearchInput(text);
              }}
            />
            <Search />
          </View>

          <View className="flex flex-col justify-between my-4">
            <Divider />
            {selectableExercises.map((e, i) => (
              <Pressable key={i} onPress={() => updateSelectableExercises(e)}>
                <View>
                  <ExerciseItem exerciseInstance={e} />
                  <Divider />
                </View>
              </Pressable>
            ))}
          </View>
          <View className="flex gap-2 m-2">
            <Pressable
              className="rounded-full p-2 m-6 shadow-md bg-red-600"
              onPress={() => {
                dispatch(setShowExerciseAddModal(!showExerciseAddModal));
                resetSelectableExercises();
              }}
            >
              <Text className="text-bold text-base text-center text-white">
                Cancel
              </Text>
            </Pressable>
            <Pressable
              className="rounded-full p-2 m-6 shadow-md bg-blue-600"
              onPress={addExercises}
            >
              <Text className="text-bold text-base text-center text-white">
                Add Exercises
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
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 24,
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
