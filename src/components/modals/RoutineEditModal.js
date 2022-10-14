import {
  View,
  Text,
  Modal,
  Pressable,
  StyleSheet,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectShowRoutineEditModal,
  setShowRoutineEditModal,
} from "../../slices/modalSlice";
import { useAddRoutineMutation } from "../../services/routineService";

export default function RoutineEditModal() {
  const showRoutineEditModal = useSelector(selectShowRoutineEditModal);
  const dispatch = useDispatch();

  const [addRoutine] = useAddRoutineMutation();

  const [newRoutine, setNewRoutine] = useState({
    name: "",
    notes: "",
  });

  const { name, notes } = newRoutine;

  const onChange = (name) => (value) => {
    setNewRoutine((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onAddNewRoutine = async (e) => {
    e.preventDefault();
    const res = await addRoutine(newRoutine);

    setNewRoutine({
      name: "",
      notes: "",
    });
    dispatch(setShowRoutineEditModal(false));
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={showRoutineEditModal}
      onRequestClose={() => {
        dispatch(setShowRoutineEditModal(!showRoutineEditModal));
      }}
    >
      <View className="flex flex-1 justify-center items-center">
        <View style={styles.modalView}>
          <View className="w-full justify-center items-center gap-2">
            <TextInput
              className="flex-1 text-xl border-gray-300 rounded-lg border-2 p-2 "
              placeholder="Routine Name..."
              value={name}
              onChangeText={onChange("name")}
            />
            <TextInput
              className="flex-1 text-lg w-full border-gray-300 rounded-lg border-2 p-2 max-w-fit "
              placeholder="Notes..."
              value={notes}
              onChangeText={onChange("notes")}
              multiline={true}
            />
          </View>
          <View className="flex gap-2 m-2">
            <Pressable
              className="rounded-full p-2 m-6 shadow-md bg-red-600"
              onPress={() => {
                dispatch(setShowRoutineEditModal(!showRoutineEditModal));
              }}
            >
              <Text className="text-bold text-base text-center text-white">
                Cancel
              </Text>
            </Pressable>
            <Pressable
              className="rounded-full p-2 m-6 shadow-md bg-blue-600"
              onPress={onAddNewRoutine}
            >
              <Text className="text-bold text-base text-center text-white">
                Add Routine
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
