import React, { useLayoutEffect } from "react";
import { SafeAreaView, View, Text, FlatList, Dimensions } from "react-native";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Divider } from "@rneui/themed";
import { useDispatch } from "react-redux";
import {
  setShowWorkoutInfoModal,
  setWorkoutInfoModalWorkout,
} from "../slices/modalSlice";
import { useNavigation } from "@react-navigation/native";

import { useGetRoutinesQuery } from "../services/routineService";
import { useGetUserQuery } from "../services/userService";
import WorkoutCard from "../components/WorkoutCard";

export default function StartWorkoutScreen() {
  const dispatch = useDispatch();

  // fetch active routine from cached user / api request
  const { activeRoutineId } = useGetUserQuery(undefined, {
    selectFromResult: ({ data }) => ({
      activeRoutineId: data?.state.activeRoutine,
    }),
  });

  const { activeRoutine } = useGetRoutinesQuery(undefined, {
    selectFromResult: ({ data }) => ({
      activeRoutine: data?.find((e) => e._id === activeRoutineId),
    }),
  });

  const nextWorkout = activeRoutine.workouts.find(
    (e) => e._id === activeRoutine.nextWorkout
  );

  const viewportWidth = Dimensions.get("window").width;

  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions(
      {
        headerShown: false,
      },
      []
    );
  });

  // show workout info modal with worked that was clicked on
  const onShowWorkoutInfo = (workout) => {
    console.log("clicked ", workout._id);
    dispatch(setWorkoutInfoModalWorkout(workout));
    dispatch(setShowWorkoutInfoModal(true));
  };

  const StartWorkoutScreenNested = () => (
    <View className="m-2">
      <Text className="text-bold text-2xl text-center">Start New Workout</Text>
      <Divider style={styles.divider} />
      <Text className="text-bold text-xl p-2 text-center">
        Next for your plan:
      </Text>
      <View className="flex justify-center items-center">
        <TouchableOpacity
          className="w-1/2"
          onPress={() => onShowWorkoutInfo(nextWorkout ? nextWorkout : null)}
        >
          <WorkoutCard
            routineId={activeRoutineId}
            workout={nextWorkout ? nextWorkout : null}
            fullWidth
          />
        </TouchableOpacity>
      </View>

      <Divider style={styles.divider} />

      <Text className="text-bold text-lg text-center p-2">
        Workouts in your routine...
      </Text>
      <View className="flex justify-center items-center">
        <FlatList
          data={activeRoutine ? activeRoutine.workouts : []}
          renderItem={({ item }) => (
            <TouchableOpacity
              className="w-1/2"
              onPress={() => onShowWorkoutInfo(item)}
            >
              <WorkoutCard
                routineId={activeRoutineId}
                workout={item}
                small={true}
                fullWidth
              />
            </TouchableOpacity>
          )}
          keyExtractor={(item, i) => (item._id ? item._id : i)}
          scrollEnabled={false}
          numColumns={2}
          columnWrapperStyle={{
            flexWrap: "wrap",
            width: viewportWidth * 0.85,
          }}
        />
      </View>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-white">
      <FlatList
        data={[]}
        scrollEnabled={true}
        ListEmptyComponent={StartWorkoutScreenNested}
      ></FlatList>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  divider: {
    alignSelf: "center",
    color: "#2089dc",
    width: "87%",
    margin: 10,
  },
});
