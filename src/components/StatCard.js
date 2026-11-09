
import React from "react";

import {
  View,
  Text,
  StyleSheet,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import { COLORS, SIZES } from "../constants/theme";

export default function StatCard({
  title,
  value,
  icon,
  color,
  lightColor,
}) {
  return (
    <View
      style={[
        styles.card,
        {
          borderColor: color,
        },
      ]}
    >
      <View style={styles.topRow}>
        <Text
          style={styles.cardTitle}
          numberOfLines={2}
        >
          {title}
        </Text>

        <View
          style={[
            styles.iconContainer,
            { backgroundColor: lightColor },
          ]}
        >
          <Ionicons
            name={icon}
            size={23}
            color={color}
          />
        </View>
      </View>

      <Text style={styles.value}>
        {value}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    minHeight: 106,
    backgroundColor: COLORS.surface,
    borderWidth: 1.5,
    borderRadius: 4,
    padding: 13,

    justifyContent: "space-between",

    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.10,
    shadowRadius: 7,
    elevation: 3,
  },

  topRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 5,
  },

  cardTitle: {
    flex: 1,
    minWidth: 0,
    fontSize: 14,
    fontWeight: "500",
    color: COLORS.text,
  },

  iconContainer: {
    width: 38,
    height: 38,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },

  value: {
    fontSize: 24,
    fontWeight: "500",
    color: COLORS.primary,
    marginTop: 5,
  },
});
