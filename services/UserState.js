import { hookstate, useHookstate } from "@hookstate/core";

// Create the userState object to hold the user data
const userState = hookstate({
  user: null,
});

// Use this hook to interact with the user state
export function useUserState() {
  const state = useHookstate(userState);

  return {
    setUser(cUser) {
      state.user.set(cUser);
      return true;
    },

    clearUser() {
      state.user.set(null);
      return true;
    },

    getUser() {
      return state.user.get();
    },
  };
}
