import { View, Text, Pressable, StyleSheet } from "react-native";
import React from "react";
import ExerciseSetInput from "./ExerciseSetInput";
import WorkoutMenuModal from "./WorkoutMenuModal";
import { useDispatch } from "react-redux";
import { addSet } from "../slices/workoutSlice";
import { nanoid } from "@reduxjs/toolkit";
import { Grid, Row, Col } from "react-native-easy-grid";

export default function ExerciseInput({ exercise }) {
  const dispatch = useDispatch();

  return (
    <View>
      <View className="flex flex-row justify-between items-center p-2">
        <Text className="text-bold text-lg">{exercise.name}</Text>
        <WorkoutMenuModal exercise={exercise} />
      </View>
      <Grid>
        <Col size={50}>
          <Row style={styles.cell}>
            <Text>A</Text>
          </Row>
          <Row style={styles.cell}>
            <Text>B</Text>
          </Row>
          <Row style={styles.cell}>
            <Text>C</Text>
          </Row>
          <Row style={styles.cell}>
            <Text>D</Text>
          </Row>
        </Col>
        <Col size={25}>
          <Row style={styles.cell}>
            <Text>E</Text>
          </Row>
          <Row style={styles.cell}>
            <Text>F</Text>
          </Row>
          <Row style={styles.cell}>
            <Text>G</Text>
          </Row>
          <Row style={styles.cell}>
            <Text>H</Text>
          </Row>
        </Col>
        <Col size={25}>
          <Row style={styles.cell}>
            <Text>1</Text>
          </Row>
          <Row style={styles.cell}>
            <Text>2</Text>
          </Row>
          <Row style={styles.cell}>
            <Text>3</Text>
          </Row>
          <Row style={styles.cell}>
            <Text>4</Text>
          </Row>
        </Col>
      </Grid>
      <View className="flex-row justify-between p-2">
        <Text>Set</Text>
        <Text>Previous</Text>
        <Text className="w-2/12">Reps</Text>
        <Text className="w-2/12">kg</Text>
      </View>
      {exercise.prevSets?.map((set, i) => (
        <ExerciseSetInput
          key={set.id ? set.id : nanoid()}
          exercise={exercise}
          set={set}
          idx={i}
        />
      ))}
      <Pressable
        className="rounded-full px-2 m-4 shadow-md bg-gray-400"
        onPress={() => dispatch(addSet(exercise))}
      >
        <Text className="text-bold text-sm text-center text-white">
          Add Set
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 300,
    padding: 16,
    paddingTop: 100,
    backgroundColor: "#fff",
  },
  cell: {
    borderWidth: 1,
    borderColor: "#ddd",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
