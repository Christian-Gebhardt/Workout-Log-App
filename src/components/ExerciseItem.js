import { View, Text, TouchableHighlight } from "react-native";
import { Info } from "react-native-feather";
import React from "react";
import { useGetExercisesQuery } from "../services/exerciseService";

export default function ExerciseItem({ exerciseInstance }) {
  const { exerciseInfo } = useGetExercisesQuery(undefined, {
    selectFromResult: ({ data }) => ({
      exerciseInfo: data.find((e) => e._id === exerciseInstance.exercise),
    }),
  });

  return (
    <View
      className={
        exerciseInfo?.isSelected
          ? "flex-row justify-between bg-indigo-100"
          : "flex-row justify-between"
      }
    >
      <View>
        <Text className="text-bold text-lg">
          {exerciseInfo ? exerciseInfo.name : "Exercise"}
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
