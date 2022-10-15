import { View, Text } from "react-native";
import React from "react";

export default function ConfirmationDialog({ action }) {
  const [visible, setVisible] = useState(false);

  const onCancel = () => {
    setVisible(false);
  };
  const onConfirm = () => {
    action.executeFunction();
    setVisible(false);
  };
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={showWorkoutInfoModal}
      onRequestClose={() => {
        setVisible(!visible);
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text className="text-bold text-xl mb-4 text-center">
            {action.header}
          </Text>
          <View className="flex gap-2 mx-2 mt-2">
            <Pressable
              className="rounded-full p-2 m-6 shadow-md bg-red-600"
              onPress={onCancel}
            >
              <Text className="text-bold text-base text-center text-white">
                {action.cancelText ? action.cancelText : "Cancel"}
              </Text>
            </Pressable>
            <Pressable
              className="rounded-full p-2 m-6 shadow-md bg-blue-600"
              onPress={onConfirm}
            >
              <Text className="text-bold text-base text-center text-white">
                {action.confirmText ? action.confirmText : "Confirm"}
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}
