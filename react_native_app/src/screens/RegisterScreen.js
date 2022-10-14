import {
  View,
  Text,
  SafeAreaView,
  Image,
  StyleSheet,
  useWindowDimensions,
  TextInput,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import Logo from "../../assets/images/logo_white.png";
import { Lock, Mail } from "react-native-feather";
import { useNavigation } from "@react-navigation/native";
import { useCreateUserMutation } from "../services/userService";
import { useDispatch } from "react-redux";
import { setIsAuthenticated } from "../slices/userSlice";
import Toast from "react-native-toast-message";

export default function RegisterScreen() {
  const { height } = useWindowDimensions();
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [registerUser] = useCreateUserMutation();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    password2: "",
  });

  const { email, password, password2 } = formData;

  const passwordsMatch = password === password2;

  const onChange = (name) => (value) => {
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onRegister = async (e) => {
    e.preventDefault();

    const res = await registerUser({
      email,
      password,
    });
    if (res.data) {
      dispatch(setIsAuthenticated(true));
      Toast.show({
        type: "success",
        text1: "Registration successful!",
        topOffset: 80,
      });
    } else {
      dispatch(setIsAuthenticated(false));
      Toast.show({
        type: "error",
        text1: res.error
          ? res.error
          : "Error! Recheck your email and password.",
        topOffset: 80,
      });
    }

    setFormData({
      email: "",
      password: "",
      password2: "",
    });
  };

  return (
    <SafeAreaView className="bg-white flex-1">
      <View className="flex justify-center items-center">
        <Image
          style={[styles.image, { height: height * 0.45 }]}
          source={Logo}
          resizeMode="contain"
        />
        <View className="w-full flex justify-center items-center gap-4">
          <View className="flex-row justify-evenly items-center">
            <Mail className="mr-2" color="black" />
            <TextInput
              className="flex-1 text-xl border-gray-500 rounded-lg border-2 p-2"
              name="email"
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
              className="flex-1 text-xl border-gray-500 rounded-lg border-2 p-2"
              name="password"
              value={password}
              placeholder="password"
              secureTextEntry={true}
              onChangeText={onChange("password")}
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>
          <View className="flex-row justify-evenly items-center">
            <Lock className="mr-2" color={passwordsMatch ? "green" : "red"} />
            <TextInput
              className={
                passwordsMatch
                  ? "flex-1 text-xl border-gray-500 rounded-lg border-2 p-2"
                  : "flex-1 text-xl border-red-500 rounded-lg border-2 p-2"
              }
              name="password2"
              value={password2}
              placeholder="confirm password"
              secureTextEntry={true}
              onChangeText={onChange("password2")}
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>
          <Pressable
            className={
              passwordsMatch
                ? "w-11/12 bg-indigo-600 rounded-lg p-4 my-4"
                : "w-11/12 bg-slate-400 rounded-lg p-4 my-4"
            }
            onPress={onRegister}
            disabled={!passwordsMatch}
          >
            <Text className="text-2xl text-white text-center text-bold">
              Register
            </Text>
          </Pressable>
        </View>
        <Text className="text-center text-bold text-xl my-2">
          Already have an account?{" "}
          <Text
            className="text-blue-600 underline"
            onPress={() => navigation.navigate("Login")}
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
