import { View, Text, Pressable, StyleSheet } from "react-native";
import React from "react";
import ExerciseSetInput from "./ExerciseSetInput";
import MenuDropdown from "./MenuDropdown";
import { addEditWorkoutSet } from "../slices/workoutSlice";
import { useDispatch } from "react-redux";
import { removeEditWorkoutExercise } from "../slices/workoutSlice";
import { Delete, Repeat } from "react-native-feather";
import { useState } from "react";

export default function ExerciseInput({ exercise, indexExercise }) {
  const dispatch = useDispatch();

  // for dropdown
  const [visible, setVisible] = useState(false);
  // add set to exercise
  const onAddSet = () => {
    dispatch(addEditWorkoutSet(indexExercise));
  };

  const onRemoveExercise = (indexExercise) => {
    dispatch(removeEditWorkoutExercise(indexExercise));
    setVisible(false);
  };

  // pass options to menu modal with actions
  const options = [
    {
      name: "remove",
      onPress: onRemoveExercise.bind(this, indexExercise),
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
        <Text className="text-bold text-lg">{exercise.name}</Text>
        <MenuDropdown
          visible={visible}
          setVisible={setVisible}
          options={options}
        />
      </View>

      <View className="flex-row">
        <Text style={styles.setCol}>Set</Text>
        <Text style={styles.prevCol}>Previous</Text>
        <Text style={styles.repCol}>Reps</Text>
        <Text style={styles.kgCol}>kg</Text>
      </View>
      {exercise.sets?.map((set, i) => (
        <ExerciseSetInput
          key={i}
          exercise={exercise}
          set={set}
          indexExercise={indexExercise}
          indexSet={i}
        />
      ))}
      <Pressable
        className="rounded-full px-2 m-4 shadow-md bg-gray-400"
        onPress={() => onAddSet()}
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
    flex: "35%",
    textAlign: "center",
  },
  repCol: {
    flex: "25%",
    textAlign: "center",
  },
  kgCol: {
    flex: "25%",
    textAlign: "center",
  },
  icon: {
    width: 16,
    height: 16,
  },
});
