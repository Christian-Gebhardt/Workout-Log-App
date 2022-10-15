import { View, Text, TouchableHighlight } from "react-native";
import React from "react";
import { StyleSheet } from "react-native";
import { AlignJustify } from "react-native-feather";
import { Divider } from "@rneui/themed";

export default function WorkoutCard({ workout, small }) {
  return (
    <View
      className="flex-1 border-2 border-stone-300 rounded-xl m-2 p-2"
      style={{
        maxWidth: "42.5%",
      }}
    >
      <View className="flex flex-row justify-between items-center gap-2 my-2">
        <Text className={small ? "text-bold text-sm" : "text-bold text-xl"}>
          {workout ? workout.name : "Workout Name"}
        </Text>
        <TouchableHighlight
          activeOpacity={0.6}
          underlayColor="#DDDDDD"
          onPress={() => alert("Pressed!")}
        >
          <AlignJustify
            style={styles.icon}
            width={styles.icon.width}
            height={styles.icon.height}
          />
        </TouchableHighlight>
      </View>
      <Divider />
      <View class={styles.container}>
        {workout && workout.exercises.length > 2 ? (
          workout.exercises.slice(0, 2).map((e, i) => (
            <View key={i}>
              <Text>{e.name}</Text>
            </View>
          ))
        ) : (
          <View>
            <Text>Exercise</Text>
            <Text>Exercise</Text>
            <Text>Exercise</Text>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  icon: {
    width: 18,
    height: 18,
  },
});
