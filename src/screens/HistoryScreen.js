import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  FlatList,
  Dimensions,
} from "react-native";
import React, { useLayoutEffect } from "react";
import { StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Divider } from "@rneui/themed";
import WorkoutCard from "../components/WorkoutCard";
import { useGetCompletedWorkoutsFromHistoryQuery } from "../services/historyService";

export default function HistoryScreen() {
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

  const { data: completedWorkouts } = useGetCompletedWorkoutsFromHistoryQuery();

  const HistoryScreenNested = () => (
    <View>
      <View className="m-2">
        <Text className="text-center text-bold text-2xl">History Screen</Text>
        <Divider style={styles.divider} />
      </View>

      <FlatList
        data={completedWorkouts ? completedWorkouts : []}
        renderItem={({ item }) => <WorkoutCard workout={item} />}
        keyExtractor={(item, i) => (item._id ? item._id : i)}
      />
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-white">
      <FlatList
        data={[]}
        scrollEnabled={true}
        ListEmptyComponent={HistoryScreenNested}
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
