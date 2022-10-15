import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React, { useLayoutEffect, useState } from "react";
import RoutineContainer from "../components/RoutineContainer";
import { useNavigation } from "@react-navigation/native";
import { Divider } from "@rneui/themed";
import { SafeAreaView } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { setShowRoutineEditModal } from "../slices/modalSlice";
import RoutineEditModal from "../components/modals/RoutineEditModal";
import {
  useAddRoutineMutation,
  useGetRoutinesQuery,
} from "../services/routineService";
import { useGetExercisesQuery } from "../services/exerciseService";
import { nanoid } from "@reduxjs/toolkit";

export default function RoutineScreen() {
  const navigation = useNavigation();

  const { data: routines } = useGetRoutinesQuery();
  const { data: availableExercises } = useGetExercisesQuery();

  const dispatch = useDispatch();

  useLayoutEffect(() => {
    navigation.setOptions(
      {
        headerShown: false,
      },
      []
    );
  });

  const RoutineScreenNested = () => (
    <View className="flex justify-center m-2">
      <Text className="text-bold text-2xl text-center">Routines</Text>
      <Divider style={styles.divider} />
      <View className="flex justify-center">
        <FlatList
          data={routines ? routines : []}
          renderItem={({ item }) => <RoutineContainer routine={item} />}
          keyExtractor={(item) => (item._id ? item._id : nanoid())}
        />
      </View>
      <TouchableOpacity
        className="rounded-full p-2 m-6 shadow-md bg-lime-600 w-1/2 self-center"
        onPress={() => dispatch(setShowRoutineEditModal(true))}
      >
        <Text className="text-bold text-base text-center text-white">
          Add new routine
        </Text>
      </TouchableOpacity>
      <RoutineEditModal />
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
