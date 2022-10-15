import {
  View,
  Text,
  TextInput,
  Animated,
  StyleSheet,
  Pressable,
} from "react-native";
import React, { useRef, useState } from "react";
import { Swipeable } from "react-native-gesture-handler";
import { Delete } from "react-native-feather";
import { useDispatch } from "react-redux";
import { removeEditWorkoutSet } from "../slices/workoutSlice";

export default function ExerciseSetInput({
  exercise,
  set,
  indexExercise,
  indexSet,
}) {
  const swipeableRef = useRef(null);

  const dispatch = useDispatch();

  const [weight, onChangeWeight] = useState(null);
  const [repCount, onChangeRepCount] = useState(null);

  const onRemoveSet = () => {
    swipeableRef.current.close();
    dispatch(
      removeEditWorkoutSet({
        indexExercise,
        indexSet,
      })
    );
  };

  // drag component to remove set
  const renderRightActions = (progress, dragX) => {
    const scale = dragX.interpolate({
      inputRange: [-80, 0],
      outputRange: [1, 0],
      extrapolate: "clamp",
    });

    return (
      <Pressable onPress={() => onRemoveSet()}>
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
      <View className="flex-row py-1">
        <Text style={styles.setCell}>{indexSet + 1}</Text>
        <Text style={styles.prevCell}>
          {set.prevPerformance ? set.prevPerformance : "-"}
        </Text>
        <View style={styles.kgCell}>
          <TextInput
            className="text-center w-8/12 bg-slate-200 rounded-lg self-center"
            onChangeText={onChangeWeight}
            value={weight}
            placeholder="-"
            keyboardType="numeric"
          />
        </View>
        <View style={styles.repCell}>
          <TextInput
            className="text-center w-8/12 bg-slate-200 rounded-lg self-center"
            onChangeText={onChangeRepCount}
            value={repCount}
            placeholder="-"
            keyboardType="numeric"
          />
        </View>
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
  setCell: {
    flex: "15%",
    textAlign: "center",
  },
  prevCell: {
    flex: "35%",
    textAlign: "center",
  },
  repCell: {
    flex: "25%",
    textAlign: "center",
  },
  kgCell: {
    flex: "25%",
    textAlign: "center",
  },
});
