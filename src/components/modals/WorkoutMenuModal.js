import {
  View,
  Modal,
  Text,
  StyleSheet,
  Pressable,
  TouchableOpacity,
} from "react-native";
import React, { useState, useRef } from "react";
import { Delete, List, Repeat } from "react-native-feather";

export default function WorkoutMenuModal({ setWorkout, idx }) {
  const [visible, setVisible] = useState(false);

  const buttonRef = useRef();

  const [menuPosition, setMenuPosition] = useState({
    top: 0,
    left: 0,
  });

  const options = [
    {
      name: "remove",
      onPress: () => onRemoveExercise(),
      icon: (
        <Delete
          width={styles.icon.width}
          height={styles.icon.height}
          color="red"
        />
      ),
    },
    {
      name: "replace",
      icon: (
        <Repeat
          width={styles.icon.width}
          height={styles.icon.height}
          color="gray"
        />
      ),
    },
  ];

  const onRemoveExercise = () => {
    setWorkout((prevState) => ({
      ...prevState,
      exercises: prevState.exercises.filter((e, i) => i !== idx),
    }));
    setVisible(false);
  };

  const openMenu = () => {
    buttonRef.current.measure((_fx, _fy, w, h, px, py) => {
      setMenuPosition({
        top: py + h,
        right: w,
      });
    });
    setVisible(true);
  };

  return (
    <TouchableOpacity
      className="flex-row items-center"
      ref={buttonRef}
      onPress={openMenu}
    >
      <List />
      <Modal
        transparent
        visible={visible}
        onRequestClose={() => {
          setVisible(!visible);
        }}
      >
        <TouchableOpacity
          className="w-full h-full"
          onPress={() => setVisible(false)}
        >
          <View
            className="absolute shadow-xl rounded-lg bg-gray-100"
            style={{ top: menuPosition.top, right: menuPosition.right }}
          >
            <View className="p-2">
              {options?.map((e, i) => (
                <Pressable
                  key={i}
                  className="p-1"
                  onPress={() => (e.onPress ? e.onPress() : () => {})}
                >
                  <View className="flex-row space-between items-center gap-2">
                    <Text className="text-bold text-base">{e.name}</Text>
                    {e.icon}
                  </View>
                </Pressable>
              ))}
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  icon: {
    width: 16,
    height: 16,
  },
});
