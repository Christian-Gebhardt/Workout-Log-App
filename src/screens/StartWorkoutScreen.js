import { SafeAreaView, View, Text, FlatList, Dimensions } from "react-native";
import React, { useLayoutEffect } from "react";
import { StyleSheet, Pressable } from "react-native";
import WorkoutCard from "../components/WorkoutCard";
import { Divider } from "@rneui/themed";
import { useDispatch } from "react-redux";
import { setShowWorkoutInfoModal } from "../slices/modalSlice";
import { useNavigation } from "@react-navigation/native";

import { useGetRoutinesQuery } from "../services/routineService";
import { useGetUserQuery } from "../services/userService";

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

  const StartWorkoutScreenNested = () => (
    <View className="m-2">
      <Text className="text-bold text-2xl text-center">Start New Workout</Text>
      <Divider style={styles.divider} />
      <Text className="text-bold text-lg p-2 text-center">
        Next for your plan:
      </Text>
      <View className="flex-row justify-center">
        <Pressable
          className="flex-1 items-center"
          onPress={() => dispatch(setShowWorkoutInfoModal(true))}
        >
          <WorkoutCard
            routineId={activeRoutineId}
            workout={nextWorkout ? nextWorkout : null}
          />
        </Pressable>
      </View>

      <Divider style={styles.divider} />

      <Text className="text-bold text-lg text-center p-2">
        Workouts in your routine...
      </Text>
      <View className="flex justify-center items-center">
        <FlatList
          data={activeRoutine ? activeRoutine.workouts : []}
          renderItem={({ item }) => (
            <Pressable
              className="w-1/2"
              onPress={() => dispatch(setShowWorkoutInfoModal(true))}
            >
              <WorkoutCard
                routineId={activeRoutineId}
                workout={item}
                small={true}
                fullwidth
              />
            </Pressable>
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
