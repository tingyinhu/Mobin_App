import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  ImageBackground,
  TouchableOpacity,
  TextInput,
  Keyboard,
} from "react-native";
import { Text } from "@rneui/themed";
import { theme } from "../theme/theme";

import { authenticate } from "../services/LoginManager";
import { useUserState } from "../services/UserState";

// form + validation
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

// Yup schema
const schema = yup.object({
  username: yup.string().trim().required("required"),
  password: yup.string().trim().required("required"),
});

export default function HomeScreen({ navigation }) {
  // global user store
  const userState = useUserState();

  // show generic login error if auth fails
  const [loginError, setLoginError] = useState(false);

  // react-hook-form
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    defaultValues: {
      username: "a01",   
      password: "p01",
    },
    resolver: yupResolver(schema),
  });

  // clear any current user when we land here
  useEffect(() => {
    userState.clearUser();
  }, []);

  // submit/login handler
  const onLogin = async (data) => {
    // data { username, password }
    setLoginError(false);
    Keyboard.dismiss();

    // LoginManager supports
    const status = authenticate(data);

    if (status !== false) {
      // store user globally
      userState.setUser(status);

      // go to app tabs
      navigation.replace("MainTabs");
    } else {
      setLoginError(true);
    }
  };

  // guest path
  const onGuest = () => {
    userState.clearUser();
    navigation.navigate("MainTabs");
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.backgroundImage}
        source={require("../assets/homeScreen.jpg")}
        resizeMode="cover"
      >
        {/* dim overlay */}
        <View style={styles.overlay} />

        {/* content */}
        <View style={styles.content}>
          <Text h3 style={styles.headingText}>
            Welcome to {"\n"}Mobin Donut
          </Text>

          {/* Username */}
          <Controller
            control={control}
            name="username"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                placeholder="User ID (e.g., a01)"
                placeholderTextColor="#777"
                style={styles.input}
                underlineColorAndroid="transparent"
                autoCapitalize="none"
                autoCorrect={false}
                returnKeyType="next"
              />
            )}
          />
          {/* inline error for username */}
          {errors.username && (
            <Text style={styles.fieldError}>User ID {errors.username.message}</Text>
          )}

          {/* Password */}
          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                placeholder="Password (e.g., p01)"
                placeholderTextColor="#777"
                style={styles.input}
                underlineColorAndroid="transparent"
                secureTextEntry
                autoCapitalize="none"
                autoCorrect={false}
                returnKeyType="done"
                onSubmitEditing={handleSubmit(onLogin)}
              />
            )}
          />
          {/* inline error for password */}
          {errors.password && (
            <Text style={styles.fieldError}>Password {errors.password.message}</Text>
          )}

          {/* generic auth error */}
          {loginError ? (
            <Text style={styles.errorText}>
              Invalid username or password. Please try again.
            </Text>
          ) : (
            <Text style={{ height: 0 }} />
          )}

          {/* Login */}
          <TouchableOpacity
            style={[
              styles.primaryButton,
              isSubmitting && styles.disabledButton,
            ]}
            onPress={handleSubmit(onLogin)}
            activeOpacity={0.85}
            disabled={isSubmitting}
          >
            <Text style={styles.primaryButtonText}>
              {isSubmitting ? "Logging in..." : "Log In"}
            </Text>
          </TouchableOpacity>

          {/* Continue as Guest */}
          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={onGuest}
            activeOpacity={0.85}
          >
            <Text style={styles.secondaryButtonText}>Continue as Guest</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
}

const CONTROL_WIDTH = "80%";
const CONTROL_HEIGHT = 50;
const CONTROL_SPACING = 20;

const styles = StyleSheet.create({
  container: { flex: 1 },
  backgroundImage: { flex: 1, justifyContent: "center" },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(255, 255, 255, 0.6)",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: theme.spacing.medium,
  },
  headingText: {
    color: theme.colors.primary,
    fontWeight: theme.typography.fontWeight.bold,
    textAlign: "center",
    marginBottom: theme.spacing.xLarge,
  },
  input: {
    width: CONTROL_WIDTH,
    height: CONTROL_HEIGHT,
    backgroundColor: theme.colors.WhiteText,
    borderRadius: 30,
    paddingHorizontal: theme.spacing.medium,
    fontSize: theme.typography.fontSize.medium,
    borderWidth: 0,
    marginBottom: 6,
  },
  fieldError: {
    width: CONTROL_WIDTH,
    color: "#B00020",
    marginBottom: CONTROL_SPACING - 6,
    textAlign: "left",
    fontSize: 13,
  },
  errorText: {
    width: CONTROL_WIDTH,
    color: "#B00020",
    marginTop: -4,
    marginBottom: CONTROL_SPACING,
    textAlign: "left",
    fontSize: 13,
  },
  primaryButton: {
    backgroundColor: theme.colors.primary,
    width: CONTROL_WIDTH,
    height: CONTROL_HEIGHT,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: CONTROL_SPACING,
  },
  primaryButtonText: {
    color: theme.colors.WhiteText,
    fontWeight: theme.typography.fontWeight.semiBold,
    fontSize: theme.typography.fontSize.large,
  },
  secondaryButton: {
    backgroundColor: theme.colors.secondary,
    width: CONTROL_WIDTH,
    height: CONTROL_HEIGHT,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  secondaryButtonText: {
    color: theme.colors.WhiteText,
    fontWeight: theme.typography.fontWeight.semiBold,
    fontSize: theme.typography.fontSize.large,
  },
  disabledButton: {
    opacity: 0.6,
  },
});
