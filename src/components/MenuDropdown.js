import {
  View,
  Modal,
  Text,
  Pressable,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import React, { useState, useRef } from "react";
import { List } from "react-native-feather";

export default function MenuDropdown({ options, visible, setVisible }) {
  const buttonRef = useRef();

  const width = Dimensions.get("window").width;
  const [menuPosition, setMenuPosition] = useState({
    top: 0,
    left: 0,
  });

  // calculate menu position
  const openMenu = () => {
    buttonRef.current.measure((_fx, _fy, w, h, px, py) => {
      if (px >= w / 4) {
        // button is on the right of the screen => make modal appear on the left of the button
        setMenuPosition(
          {
            top: py + h,
            right: width - (px + w),
          },
          setVisible(true)
        );
      } else {
        // button is on the left of the screen => make modal appear on the right of the button
        setMenuPosition(
          {
            top: py + h,
            left: px,
          },
          setVisible(true)
        );
      }
    });
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
            style={
              menuPosition.right
                ? { top: menuPosition.top, right: menuPosition.right }
                : { top: menuPosition.top, left: menuPosition.left }
            }
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
