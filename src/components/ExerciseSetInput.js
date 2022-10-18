import {
  View,
  Text,
  TextInput,
  Animated,
  StyleSheet,
  Pressable,
  TouchableOpacity,
} from "react-native";
import React, { useRef, useState, useEffect } from "react";
import { Swipeable } from "react-native-gesture-handler";
import { CheckSquare, Delete } from "react-native-feather";
import { useDispatch } from "react-redux";
import {
  removeActiveWorkoutSet,
  removeEditWorkoutSet,
  updateActiveWorkoutSet,
} from "../slices/workoutSlice";

export default function ExerciseSetInput({
  set,
  indexExercise,
  indexSet,
  isActiveWorkout,
}) {
  const swipeableRef = useRef(null);

  const dispatch = useDispatch();

  const [isChecked, setIsChecked] = useState(false);

  const [exerciseSetInput, setExerciseSetInput] = useState({
    ...set,
    weight: null,
    reps: null,
  });

  const { weight, reps } = exerciseSetInput;

  useEffect(() => {
    dispatch(
      updateActiveWorkoutSet({
        indexExercise,
        indexSet,
        updateSet: {
          ...exerciseSetInput,
          isChecked,
        },
      })
    );
  }, [isChecked]);

  const onCheck = () => {
    setIsChecked(!isChecked);
  };

  const onChange = (name) => (value) => {
    switch (name) {
      case "weight":
        setExerciseSetInput((prevState) => ({
          ...prevState,
          weight: Number(value),
        }));
        break;
      case "reps":
        setExerciseSetInput((prevState) => ({
          ...prevState,
          reps: Number(value),
        }));
        break;
      case "type":
        setExerciseSetInput((prevState) => ({
          ...prevState,
          type: value,
        }));
    }
  };

  const onRemoveSet = () => {
    swipeableRef.current.close();
    if (isActiveWorkout) {
      dispatch(
        removeActiveWorkoutSet({
          indexExercise,
          indexSet,
        })
      );
    } else {
      dispatch(
        removeEditWorkoutSet({
          indexExercise,
          indexSet,
        })
      );
    }
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
      <View
        className={!isChecked ? "flex-row py-1" : "flex-row py-1 bg-green-500"}
      >
        <Text style={styles.setCell}>{indexSet + 1}</Text>
        <Text style={styles.prevCell}>
          {set.prevPerformance ? set.prevPerformance : "-"}
        </Text>
        <View style={styles.kgCell}>
          <TextInput
            className="text-center w-8/12 bg-slate-200 rounded-lg self-center"
            onChangeText={onChange("weight")}
            value={weight}
            placeholder="-"
            keyboardType="numeric"
          />
        </View>
        <View style={styles.repCell}>
          <TextInput
            className="text-center w-8/12 bg-slate-200 rounded-lg self-center"
            onChangeText={onChange("reps")}
            value={reps}
            placeholder="-"
            keyboardType="numeric"
          />
        </View>
        <View style={styles.checkCell}>
          <TouchableOpacity onPress={onCheck}>
            <CheckSquare color="black" width={18} height={18} />
          </TouchableOpacity>
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
    flex: "32.5%",
    textAlign: "center",
  },
  repCell: {
    flex: "21.25%",
    textAlign: "center",
  },
  kgCell: {
    flex: "21.25%",
    textAlign: "center",
  },
  checkCell: {
    flex: "10%",
    flexDirection: "row",
    justifyContent: "center",
    textAlign: "center",
  },
  icon: {
    width: 12,
    height: 12,
  },
});
