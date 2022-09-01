import { View, Text, Pressable, TouchableHighlight } from "react-native";
import { Info } from "react-native-feather";
import React from "react";

export default function ExerciseItem({ exercise }) {
  return (
    <View
      className={
        exercise.isSelected
          ? "flex-row justify-between bg-indigo-100"
          : "flex-row justify-between"
      }
    >
      <View>
        <Text className="text-bold text-lg">{exercise.name}</Text>
        <Text className="text-sm">{exercise.targetMuscle}</Text>
      </View>
      <TouchableHighlight
        className="mx-2 mt-1"
        activeOpacity={0.6}
        underlayColor="#DDDDDD"
        onPress={() => alert("Pressed!")}
      >
        <Info />
      </TouchableHighlight>
    </View>
  );
}
