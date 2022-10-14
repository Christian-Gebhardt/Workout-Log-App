import { View, Text, Pressable, StyleSheet, TextInput } from "react-native";
import React from "react";
import ExerciseSetInput from "./ExerciseSetInput";
import WorkoutMenuModal from "./modals/WorkoutMenuModal";
import { nanoid } from "@reduxjs/toolkit";

export default function ExerciseInput({ exercise, setWorkout }) {
  // add set to exercise
  const onAddSet = () => {
    setWorkout((prevState) => ({
      ...prevState,
      exercises: prevState.exercises.map((e) =>
        e._id === exercise._id
          ? {
              ...e,
              prevSets: [
                ...e.prevSets,
                {
                  prevPerformance: "-",
                },
              ],
            }
          : e
      ),
    }));
  };

  return (
    <View>
      <View className="flex flex-row justify-between items-center p-2">
        <Text className="text-bold text-lg">{exercise.name}</Text>
        <WorkoutMenuModal exercise={exercise} setWorkout={setWorkout} />
      </View>

      <View className="flex-row">
        <Text style={styles.setCol}>Set</Text>
        <Text style={styles.prevCol}>Previous</Text>
        <Text style={styles.repCol}>Reps</Text>
        <Text style={styles.kgCol}>kg</Text>
      </View>
      {exercise.prevSets?.map((set, i) => (
        <ExerciseSetInput
          key={i}
          exercise={exercise}
          setWorkout={setWorkout}
          set={set}
          idx={i}
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
});
