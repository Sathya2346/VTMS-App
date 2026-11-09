
import React from "react";

import {
  View,
  Text,
  Pressable,
  StyleSheet,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../constants/theme";

const TABS = [
  {
    label: "Dashboard",
    icon: "grid-outline",
    activeIcon: "grid",
  },
  {
    label: "Trainers",
    icon: "people-outline",
    activeIcon: "people",
    menu: "Trainer Management",
  },
  {
    label: "Batches",
    icon: "book-outline",
    activeIcon: "book",
    menu: "Batch Management",
  },
  {
    label: "Trainees",
    icon: "school-outline",
    activeIcon: "school",
    menu: "Trainee Management",
  },
];

export default function BottomTabBar({
  activeMenu,
  onTabPress,
  onMorePress,
}) {
  return (
    <View style={styles.container}>

      {TABS.map((tab) => {
        const active =
          activeMenu === (tab.menu || tab.label);

        return (
          <Pressable
            key={tab.label}
            style={styles.tab}
            onPress={() =>
              onTabPress(tab.menu || tab.label)
            }
          >
            <Ionicons
              name={active ? tab.activeIcon : tab.icon}
              size={21}
              color={active ? COLORS.secondary : "#777777"}
            />

            <Text
              style={[
                styles.label,
                active && styles.activeLabel,
              ]}
              numberOfLines={1}
            >
              {tab.label}
            </Text>

            {active && <View style={styles.activeIndicator} />}
          </Pressable>
        );
      })}

      {/* MORE */}
      <Pressable
        style={styles.tab}
        onPress={onMorePress}
      >
        <Ionicons
          name="menu"
          size={21}
          color="#777777"
        />

        <Text style={styles.label}>More</Text>
      </Pressable>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 64,
    backgroundColor: COLORS.surface,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    paddingHorizontal: 4,
    paddingBottom: 3,
    elevation: 10,

    shadowColor: "#000000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.08,
    shadowRadius: 5,
  },

  tab: {
    flex: 1,
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    gap: 3,
  },

  label: {
    fontSize: 10,
    color: "#777777",
    fontWeight: "500",
  },

  activeLabel: {
    color: COLORS.primary,
    fontWeight: "700",
  },

  activeIndicator: {
    position: "absolute",
    top: 0,
    width: 24,
    height: 3,
    backgroundColor: COLORS.secondary,
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
  },
});
