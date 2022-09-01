import {
  View,
  Text,
  TextInput,
  Animated,
  StyleSheet,
  Pressable,
  Alert,
} from "react-native";
import React, { useRef, useState } from "react";
import { Swipeable } from "react-native-gesture-handler";
import { useDispatch } from "react-redux";
import { removeSet } from "../slices/workoutSlice";
import { Delete } from "react-native-feather";
import { nanoid } from "@reduxjs/toolkit";

export default function ExerciseSetInput({ exercise, set, idx }) {
  const dispatch = useDispatch();

  const swipeableRef = useRef(null);

  const [weight, onChangeWeight] = useState(null);
  const [repCount, onChangeRepCount] = useState(null);

  const renderRightActions = (progress, dragX) => {
    const scale = dragX.interpolate({
      inputRange: [-80, 0],
      outputRange: [1, 0],
      extrapolate: "clamp",
    });

    const onPressRemove = () => {
      swipeableRef.current.close();
      dispatch(removeSet({ exercise, set }));
    };

    return (
      <Pressable onPress={() => onPressRemove()}>
        <View style={styles.rightAction}>
          <View className="flex flex-row justify-between items-center gap-1">
            <Animated.Text
              style={[styles.textAnimated, { transform: [{ scale }] }]}
            >
              Delete
            </Animated.Text>
            <Delete color="white" />
          </View>
        </View>
      </Pressable>
    );
  };

  return (
    <Swipeable ref={swipeableRef} renderRightActions={renderRightActions}>
      <View className="flex-row justify-between py-1 px-2">
        <Text>{idx + 1}</Text>
        <Text>{set.prevPerformance ? set.prevPerformance : "-"}</Text>
        <TextInput
          className="text-center w-2/12 bg-slate-200 rounded-lg"
          onChangeText={onChangeWeight}
          value={weight}
          placeholder="-"
          keyboardType="numeric"
        />
        <TextInput
          className="text-center w-2/12 bg-slate-200 rounded-lg"
          style={styles.inputField}
          onChangeText={onChangeRepCount}
          value={repCount}
          placeholder="-"
          keyboardType="numeric"
        />
      </View>
    </Swipeable>
  );
}

const styles = StyleSheet.create({
  rightAction: {
    display: "flex",
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "red",
    paddingHorizontal: 2,
    marginLeft: 16,
    borderTopLeftRadius: 25,
    borderBottomLeftRadius: 25,
  },
  textAnimated: {
    color: "white",
    fontWeight: "600",
    paddingHorizontal: 20,
  },
});
