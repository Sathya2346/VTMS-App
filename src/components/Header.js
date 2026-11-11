
import React from "react";

import {
  View,
  Text,
  StyleSheet,
  Pressable,
  useWindowDimensions,
} from "react-native";

import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

import { COLORS } from "../constants/theme";

export default function Header({ isDesktop, onMenuPress, title = "Dashboard" })  {
  const { width } = useWindowDimensions();

  const isCompact = width < 480;

  return (
    <View style={styles.container}>

      {/* BRAND */}
      <View
        style={[
          styles.brand,
          !isDesktop && styles.mobileBrand,
        ]}
      >

        {!isDesktop && (
          <Pressable
            onPress={onMenuPress}
            style={styles.menuButton}
          >
            <Ionicons
              name="menu"
              size={21}
              color={COLORS.primary}
            />
          </Pressable>
        )}

        <View style={styles.logoCircle}>
          <MaterialCommunityIcons
            name="book-education"
            size={27}
            color={COLORS.primaryLight}
          />
        </View>

        <View>
          <Text style={styles.logoText}>VTMS</Text>

          {isDesktop && (
            <Text style={styles.logoSubtitle}>
              Vetri Training{"\n"}
              Management Software
            </Text>
          )}
        </View>

      </View>

      {/* PAGE TITLE */}
      <View style={styles.titleContainer}>
        {(isDesktop || !isCompact) && (
          <Text
            style={[
              styles.pageTitle,
              !isDesktop && styles.mobileTitle,
            ]}
            numberOfLines={1}
          >
            {title}
          </Text>
        )}
      </View>

      {/* HEADER ACTIONS */}
      <View style={styles.actions}>

        {/* NOTIFICATION */}
        <Pressable style={styles.notificationButton}>
          <Ionicons
            name="notifications"
            size={18}
            color={COLORS.warning}
          />
        </Pressable>

        {/* ADMIN PROFILE */}
        <Pressable style={styles.adminButton}>

          <View style={styles.avatar}>
            <Ionicons
              name="person"
              size={19}
              color={COLORS.primary}
            />
          </View>

          {isDesktop && (
            <Text style={styles.adminText}>
              Admin
            </Text>
          )}

        </Pressable>

      </View>

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    height: 70,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.surface,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    elevation: 3,
    zIndex: 2,
  },

  brand: {
    width: 258,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 25,
    gap: 8,
  },

  mobileBrand: {
    width: "auto",
    paddingHorizontal: 0,
    gap: 5,
  },

  menuButton: {
    width: 28,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
  },

  logoCircle: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "#E9E5FF",
    alignItems: "center",
    justifyContent: "center",
  },

  logoText: {
    fontSize: 21,
    fontWeight: "bold",
    color: "#5543C9",
    letterSpacing: 0.5,
  },

  logoSubtitle: {
    fontSize: 9,
    color: COLORS.textSecondary,
    lineHeight: 11,
  },

  titleContainer: {
    flex: 1,
    minWidth: 0,
    paddingLeft: 10,
  },

  pageTitle: {
    fontSize: 23,
    fontWeight: "600",
    color: COLORS.text,
  },

  mobileTitle: {
    fontSize: 16,
  },

  actions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },

  notificationButton: {
    width: 34,
    height: 36,
    borderRadius: 6,
    backgroundColor: COLORS.warningLight,
    alignItems: "center",
    justifyContent: "center",
  },

  adminButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.secondaryLight,
    paddingHorizontal: 5,
    paddingVertical: 4,
    borderRadius: 6,
  },

  avatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#F5D7DC",
    justifyContent: "center",
    alignItems: "center",
  },

  adminText: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.primary,
    marginLeft: 7,
  },

});
