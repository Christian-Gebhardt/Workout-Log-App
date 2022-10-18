import { View, Text, TouchableHighlight } from "react-native";
import { Info } from "react-native-feather";
import React from "react";
import { getExerciseInstanceInfo } from "../util/helpers/exerciseHelper";

export default function ExerciseItem({ exerciseInstance }) {
  const exercise = exerciseInstance.name
    ? exerciseInstance
    : getExerciseInstanceInfo(exerciseInstance);

  return (
    <View
      className={
        exercise?.isSelected
          ? "flex-row justify-between bg-indigo-100"
          : "flex-row justify-between"
      }
    >
      <View>
        <Text className="text-bold text-lg">
          {exercise ? exercise.name : "Exercise"}
        </Text>
      </View>
      <TouchableHighlight
        className="mx-2 mt-1"
        activeOpacity={0.6}
        underlayColor="#DDDDDD"
      >
        <Info />
      </TouchableHighlight>
    </View>
  );
}
