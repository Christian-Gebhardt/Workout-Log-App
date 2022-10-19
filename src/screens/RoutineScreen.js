import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React, { useLayoutEffect } from "react";
import RoutineContainer from "../components/RoutineContainer";
import { useNavigation } from "@react-navigation/native";
import { Divider } from "@rneui/themed";
import { SafeAreaView } from "react-native";
import { useDispatch } from "react-redux";
import { setShowRoutineEditModal } from "../slices/modalSlice";
import { useGetRoutinesQuery } from "../services/routineService";
import { useGetUserQuery } from "../services/userService";

export default function RoutineScreen() {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    navigation.setOptions(
      {
        headerShown: false,
      },
      []
    );
  });

  const { data: routines } = useGetRoutinesQuery();
  // fetch active routine from cached user / api request
  const { activeRoutineId } = useGetUserQuery(undefined, {
    selectFromResult: ({ data }) => ({
      activeRoutineId: data?.state.activeRoutine,
    }),
  });

  const RoutineScreenNested = () => (
    <View className="flex justify-center m-2">
      <Text className="text-bold text-2xl text-center">Routines</Text>
      <Divider style={styles.divider} />

      <FlatList
        data={routines ? routines : []}
        renderItem={({ item }) => (
          <RoutineContainer
            routine={item}
            isActiveRoutine={item._id === activeRoutineId}
          />
        )}
        keyExtractor={(item, i) => (item._id ? item._id : i)}
      />
      <TouchableOpacity
        className="rounded-full p-2 m-6 shadow-md bg-lime-600 w-1/2 self-center"
        onPress={() => dispatch(setShowRoutineEditModal(true))}
      >
        <Text className="text-bold text-base text-center text-white">
          Add new routine
        </Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-white">
      <FlatList
        data={[]}
        scrollEnabled={true}
        ListEmptyComponent={RoutineScreenNested}
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
