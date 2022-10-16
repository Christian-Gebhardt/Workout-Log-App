import { View, Text } from "react-native";
import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { Delete, Repeat } from "react-native-feather";
import { Divider } from "@rneui/themed";
import MenuDropdown from "./MenuDropdown";
import { useDeleteWorkoutFromRoutineMutation } from "../services/routineService";

export default function WorkoutCard({ routineId, workout, fullwidth, small }) {
  // for dropdown
  const [visible, setVisible] = useState(false);

  const [deleteWorkoutFromRoutine] = useDeleteWorkoutFromRoutineMutation();

  // pass options to menu modal with actions
  const menuOptions = [
    {
      name: "remove",
      onPress: () =>
        deleteWorkoutFromRoutine({ routineId, workoutId: workout._id }),
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
    <View
      className="flex-1 border-2 border-stone-300 rounded-xl m-2 p-2"
      style={{
        maxWidth: !fullwidth ? "42.5%" : "100%",
      }}
    >
      <View className="flex flex-row justify-between items-center gap-2 my-2">
        <Text className={small ? "text-bold text-sm" : "text-bold text-xl"}>
          {workout ? workout.name : "Workout Name"}
        </Text>
        <MenuDropdown
          visible={visible}
          setVisible={setVisible}
          options={menuOptions}
        />
      </View>
      <Divider />
      <View class={styles.container}>
        {workout && workout.exercises?.length > 2 ? (
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
