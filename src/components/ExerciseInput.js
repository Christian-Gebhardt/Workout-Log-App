import { View, Text, Pressable, StyleSheet } from "react-native";
import React from "react";
import ExerciseSetInput from "./ExerciseSetInput";
import MenuDropdown from "./MenuDropdown";
import {
  addActiveWorkoutSet,
  addEditWorkoutSet,
  removeActiveWorkoutExercise,
} from "../slices/workoutSlice";
import { useDispatch } from "react-redux";
import { removeEditWorkoutExercise } from "../slices/workoutSlice";
import { Delete, Repeat } from "react-native-feather";
import { useState } from "react";
import { getExerciseInstanceInfo } from "../util/helpers/exerciseHelper";

export default function ExerciseInput({
  exercise,
  indexExercise,
  isActiveWorkout,
}) {
  const dispatch = useDispatch();

  const exerciseInfo = getExerciseInstanceInfo(exercise);
  // for dropdown
  const [visible, setVisible] = useState(false);

  // add set to exercise
  const onAddSet = (isActiveWorkout, indexExercise) => {
    if (isActiveWorkout) {
      dispatch(addActiveWorkoutSet(indexExercise));
    } else {
      dispatch(addEditWorkoutSet(indexExercise));
    }
  };

  const onRemoveExercise = (index) => {
    if (isActiveWorkout) {
      dispatch(removeEditWorkoutExercise(index));
    } else {
      dispatch(removeActiveWorkoutExercise(index));
    }
    setVisible(false);
  };

  // pass options to menu modal with actions
  const menuOptions = [
    {
      name: "remove",
      onPress: () => onRemoveExercise(indexExercise),
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

  return (
    <View>
      <View className="flex flex-row justify-between items-center p-2">
        <Text className="text-bold text-lg">{exerciseInfo.name}</Text>
        <MenuDropdown
          visible={visible}
          setVisible={setVisible}
          options={menuOptions}
        />
      </View>

      <View className="flex-row">
        <Text style={styles.setCol}>Set</Text>
        <Text style={styles.prevCol}>Previous</Text>
        <Text style={styles.repCol}>Reps</Text>
        <Text style={styles.kgCol}>kg</Text>
        <Text style={styles.checkCol}></Text>
      </View>
      {exercise.sets?.map((set, i) => (
        <ExerciseSetInput
          key={i}
          set={set}
          indexExercise={indexExercise}
          indexSet={i}
          isActiveWorkout={isActiveWorkout}
        />
      ))}
      <Pressable
        className="rounded-full px-2 m-4 shadow-md bg-gray-400"
        onPress={() => onAddSet(isActiveWorkout, indexExercise)}
      >
        <Text className="text-bold text-sm text-center text-white">
          Add Set
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 300,
    padding: 16,
    paddingTop: 100,
    backgroundColor: "#fff",
  },
  cell: {
    borderWidth: 1,
    borderColor: "#ddd",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  setCol: {
    flex: "15%",
    textAlign: "center",
  },
  prevCol: {
    flex: "32.5%",
    textAlign: "center",
  },
  repCol: {
    flex: "21.25%",
    textAlign: "center",
  },
  kgCol: {
    flex: "21.25%",
    textAlign: "center",
  },
  checkCol: {
    flex: "10%",
    textAlign: "center",
  },
  icon: {
    width: 16,
    height: 16,
  },
});
