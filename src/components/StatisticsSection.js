
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  useWindowDimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../constants/theme";

const DATA = [
  {
    title: "Total Trainers",
    value: "25",
    icon: "people-outline",
    color: "#6650D9",
    light: "#E5DEFF",
  },
  {
    title: "Total Trainees",
    value: "60",
    icon: "people",
    color: "#FFA51F",
    light: "#FFE9C9",
  },
  {
    title: "Active Batches",
    value: "12",
    icon: "checkmark-circle-outline",
    color: "#20C65A",
    light: "#D9FFE2",
  },
  {
    title: "Pending Reports",
    value: "8",
    icon: "alert-circle-outline",
    color: "#E53935",
    light: "#FFE0E0",
  },
];

export default function StatisticsSection() {
  const { width } = useWindowDimensions();

  const columns = width >= 1200 ? 4 : 2;

  return (
    <View style={styles.container}>
      <View style={styles.grid}>
        {DATA.map((item) => (
          <View
            key={item.title}
            style={[
              styles.card,
              { width: columns === 4 ? "23.5%" : "48.5%" },
              width < 360 && { width: "100%" },
              { borderColor: item.color },
            ]}
          >
            <View style={styles.topRow}>
              <Text style={styles.title}>
                {item.title}
              </Text>

              <View
                style={[
                  styles.iconBox,
                  { backgroundColor: item.light },
                ]}
              >
                <Ionicons
                  name={item.icon}
                  size={23}
                  color={item.color}
                />
              </View>
            </View>

            <Text style={styles.value}>
              {item.value}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 25,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    rowGap: 13,
  },
  card: {
    minHeight: 106,
    backgroundColor: "#FFFFFF",
    borderWidth: 1.5,
    borderRadius: 4,
    padding: 13,
    justifyContent: "space-between",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 7,
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 5,
  },
  title: {
    flex: 1,
    fontSize: 14,
    color: COLORS.text,
  },
  iconBox: {
    width: 38,
    height: 38,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  value: {
    fontSize: 24,
    color: COLORS.primary,
    fontWeight: "500",
  },
});