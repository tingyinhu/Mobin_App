import { useState, useEffect } from "react";

import { StyleSheet, View, ActivityIndicator, FlatList } from "react-native";
import { Text, Card } from "@rneui/themed";

export default function OrderScreen() {
  //state declarations here

  // useEffect with fatch here

  //return statement
  return (
    <View style={styles.container}>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F5DE",
    alignItems: "center",
    justifyContent: "flex-start",
    width: "100%",
    paddingTop: 25,
  },
});
