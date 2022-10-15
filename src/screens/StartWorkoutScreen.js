import { SafeAreaView, View, Text, FlatList, Dimensions } from "react-native";
import React, { useLayoutEffect } from "react";
import { StyleSheet, Pressable } from "react-native";
import WorkoutCard from "../components/WorkoutCard";
import { Divider } from "@rneui/themed";
import { useDispatch } from "react-redux";
import { setShowWorkoutInfoModal } from "../slices/modalSlice";
import { useNavigation } from "@react-navigation/native";

export default function StartWorkoutScreen() {
  const dispatch = useDispatch();

  const routine = null;

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
        <Pressable onPress={() => dispatch(setShowWorkoutInfoModal(true))}>
          <WorkoutCard fullwidth={true} />
        </Pressable>
      </View>

      <Divider style={styles.divider} />
      <View className="p-2 text-center">
        <Text className="text-bold text-lg text-center p-2">
          Workouts in your routine...
        </Text>
        <FlatList
          columnWrapperStyle={{
            flexWrap: "wrap",
            width: viewportWidth * 0.85,
          }}
          data={routine ? routine.workouts : []}
          renderItem={({ item }) => (
            <Pressable onPress={() => dispatch(setShowWorkoutInfoModal(true))}>
              <WorkoutCard workout={item} small={true} />
            </Pressable>
          )}
          keyExtractor={(item) => (item._id ? item._id : nanoid())}
          scrollEnabled={false}
          numColumns={2}
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
