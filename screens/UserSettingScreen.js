import { StyleSheet, View } from 'react-native';
import { Text, Button, Input } from '@rneui/themed';
import { useUserState } from '../services/UserState';
import { theme } from '../theme/theme';

export default function UserSettingScreen({ navigation }) {
  const userStore = useUserState();               // Access global user state
  const currUser = userStore.getUser();           // Get current logged-in user

  // Fallback to default values if no user is logged in
  const userId = currUser?.userId ?? 'guest';
  const first  = currUser?.first  ?? 'Guest';
  const last   = currUser?.last   ?? 'User';

  // Handle logout and reset navigation so user can’t go back to previous screens
  const onLogout = () => {
    userStore.clearUser();
    navigation.reset({
      index: 0,
      routes: [{ name: 'Home' }],
    });
  };

  return (
    <View style={styles.container}>
      <Text h3 style={styles.heading}>User Settings</Text>

      {/* Display user ID */}
      <View style={styles.fieldContainer}>
        <Text style={styles.fieldLabel}>User ID</Text>
        <Input
          value={userId}
          disabled
          inputStyle={styles.inputText}
          inputContainerStyle={styles.inputContainer}
          containerStyle={styles.inputOuter}
          disabledInputStyle={styles.disabledInputText}
        />
      </View>

      {/* Display first name */}
      <View style={styles.fieldContainer}>
        <Text style={styles.fieldLabel}>First Name</Text>
        <Input
          value={first}
          disabled
          inputStyle={styles.inputText}
          inputContainerStyle={styles.inputContainer}
          containerStyle={styles.inputOuter}
          disabledInputStyle={styles.disabledInputText}
        />
      </View>

      {/* Display last name */}
      <View style={styles.fieldContainer}>
        <Text style={styles.fieldLabel}>Last Name</Text>
        <Input
          value={last}
          disabled
          inputStyle={styles.inputText}
          inputContainerStyle={styles.inputContainer}
          containerStyle={styles.inputOuter}
          disabledInputStyle={styles.disabledInputText}
        />
      </View>

      {/* Logout or back to login button */}
      <View style={styles.logoutContainer}>
        <Button
          title={currUser ? 'Logout' : 'Back to Login'}
          buttonStyle={styles.logoutBtn}
          titleStyle={styles.logoutTitle}
          onPress={onLogout}
        />
      </View>
    </View>
  );
}

// ----- Styles -----
const FIELD_WIDTH = '90%';
const CONTROL_HEIGHT = 50;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    alignItems: 'center',
    paddingTop: theme.spacing.large,
  },
  heading: {
    color: theme.colors.primary,
    fontWeight: theme.typography.fontWeight.bold,
    marginBottom: theme.spacing.large,
    textAlign: 'center',
  },
  fieldContainer: {
    width: FIELD_WIDTH,
    marginBottom: theme.spacing.small,
  },
  fieldLabel: {
    marginLeft: 6,
    marginBottom: 2,
    color: theme.colors.text,
    fontWeight: theme.typography.fontWeight.semiBold,
  },
  inputOuter: {
    paddingHorizontal: 0,
  },
  inputContainer: {
    borderBottomWidth: 0,                    
    backgroundColor: theme.colors.WhiteText,
    borderRadius: 14,
    height: CONTROL_HEIGHT,
    paddingHorizontal: theme.spacing.medium,
    justifyContent: 'center',
  },
  inputText: {
    fontSize: theme.typography.fontSize.medium,
    color: theme.colors.text,
  },
  disabledInputText: {
    color: '#888',
    opacity: 0.9,
  },
  logoutContainer: {
    width: FIELD_WIDTH,
    marginTop: theme.spacing.xLarge,
  },
  logoutBtn: {
    backgroundColor: theme.colors.secondary,
    borderRadius: 30,
    height: CONTROL_HEIGHT,
  },
  logoutTitle: {
    color: theme.colors.WhiteText,
    fontWeight: theme.typography.fontWeight.semiBold,
    fontSize: theme.typography.fontSize.medium,
  },
});
