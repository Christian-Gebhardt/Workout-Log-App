import {
  View,
  Text,
  SafeAreaView,
  Image,
  StyleSheet,
  useWindowDimensions,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import Logo from "../../assets/images/logo_white.png";
import { Lock, Mail } from "react-native-feather";
import { useNavigation } from "@react-navigation/native";
import { useLoginUserMutation } from "../services/userService";
import { useDispatch } from "react-redux";
import { setIsAuthenticated } from "../slices/userSlice";
import Toast from "react-native-toast-message";

export default function LoginScreen() {
  const { height } = useWindowDimensions();
  const navigation = useNavigation();

  const dispatch = useDispatch();

  const [loginUser] = useLoginUserMutation();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const onChange = (name) => (value) => {
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onLogin = async (e) => {
    const res = await loginUser({
      email,
      password,
    });

    if (res.data) {
      dispatch(setIsAuthenticated(true));
      Toast.show({
        type: "success",
        text1: "Login successful!",
        topOffset: 80,
      });
    } else {
      dispatch(setIsAuthenticated(false));
      Toast.show({
        type: "error",
        text1: "Wrong email or password! Please try again.",
        topOffset: 80,
      });
    }

    setFormData({
      email: "",
      password: "",
    });
  };

  return (
    <SafeAreaView className="bg-white flex-1">
      <View className="flex justify-center items-center">
        <Image
          style={[styles.image, { height: height * 0.5 }]}
          source={Logo}
          resizeMode="contain"
        />
        <View className="w-full flex justify-center items-center gap-4">
          <View className="flex-row justify-evenly items-center">
            <Mail className="mr-2" color="black" />
            <TextInput
              className="flex-1 text-xl border-gray-500 rounded-lg border-2 p-2"
              placeholder="email"
              value={email}
              onChangeText={onChange("email")}
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>

          <View className="flex-row justify-evenly items-center">
            <Lock className="mr-2" color="black" />
            <TextInput
              className="flex-1 text-xl border-gray-500 rounded-lg border-2 p-2 "
              placeholder="password"
              name="password"
              secureTextEntry={true}
              value={password}
              onChangeText={onChange("password")}
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>
          <TouchableOpacity
            className="w-11/12 bg-slate-300 rounded-lg p-4 my-4"
            onPress={onLogin}
          >
            <Text className="text-2xl text-center text-bold">Login</Text>
          </TouchableOpacity>
        </View>
        <Text className="text-center text-bold text-xl my-2">
          Not registered yet?{" "}
          <Text
            className="text-blue-600 underline"
            onPress={() => navigation.navigate("Register")}
          >
            Click here
          </Text>
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 200,
  },
});
