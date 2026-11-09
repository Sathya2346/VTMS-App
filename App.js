import React from "react";
import { StatusBar } from "react-native";

import DashboardScreen from "./src/screens/DashboardScreen";
import { COLORS } from "./src/constants/theme";

export default function App() {
  return (
    <>
      <StatusBar
        backgroundColor={COLORS.primary}
        barStyle="dark-content"
      />
      <DashboardScreen />
    </>
  );
}