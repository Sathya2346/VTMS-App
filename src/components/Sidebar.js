
import React from "react";

import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  useWindowDimensions,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../constants/theme";

const MENU_ITEMS = [
  { label: "Dashboard", icon: "grid-outline" },
  { label: "Trainer Management", icon: "people-outline" },
  { label: "Batch Management", icon: "book-outline" },
  { label: "Trainee Management", icon: "school-outline" },
  { label: "Intern Management", icon: "people-circle-outline" },
  { label: "Reports & Approvals", icon: "document-text-outline" },
  { label: "Business Monitoring", icon: "trending-up-outline" },
  { label: "Payment & Revenue", icon: "card-outline" },
  { label: "Communication", icon: "chatbox-outline" },
  { label: "Setting", icon: "settings-outline" },
  { label: "Logout", icon: "log-out-outline" },
];

export default function Sidebar({
  isMobile,
  visible,
  activeMenu,
  onMenuSelect,
  onClose,
}) {
  const { width } = useWindowDimensions();

  const drawerWidth = Math.min(270, width * 0.82);

  if (isMobile && !visible) {
    return null;
  }

  const menuContent = (
    <ScrollView
      style={styles.scrollArea}
      contentContainerStyle={styles.menuContainer}
      showsVerticalScrollIndicator={true}
      nestedScrollEnabled={true}
      keyboardShouldPersistTaps="handled"
    >
      {MENU_ITEMS.map((item) => {
        const active = activeMenu === item.label;

        return (
          <Pressable
            key={item.label}
            onPress={() => onMenuSelect(item.label)}
            style={[
              styles.menuItem,
              active && styles.activeMenu,
            ]}
          >
            <Ionicons
              name={item.icon}
              size={23}
              color="#FFFFFF"
            />

            <Text
              style={styles.menuText}
              numberOfLines={1}
            >
              {item.label}
            </Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );

  // DESKTOP SIDEBAR
  if (!isMobile) {
    return (
      <View style={styles.desktopSidebar}>
        {menuContent}
      </View>
    );
  }

  // MOBILE OVERLAY DRAWER
  return (
    <View style={styles.mobileOverlay}>

      {/* BACKDROP - BEHIND SIDEBAR */}
      <Pressable
        style={[
          styles.backdrop,
          { left: drawerWidth },
        ]}
        onPress={onClose}
      />

      {/* SIDEBAR - ALWAYS ON TOP */}
      <View
        style={[
          styles.mobileSidebar,
          { width: drawerWidth },
        ]}
      >
        {/* DRAWER HEADER */}
        <View style={styles.drawerHeader}>
          <Text style={styles.drawerTitle}>
            VTMS MENU
          </Text>

          <Pressable
            onPress={onClose}
            style={styles.closeButton}
            hitSlop={10}
          >
            <Ionicons
              name="close"
              size={25}
              color="#FFFFFF"
            />
          </Pressable>
        </View>

        {/* SCROLLABLE MENU */}
        {menuContent}

      </View>
    </View>
  );
}

const styles = StyleSheet.create({

  // DESKTOP
  desktopSidebar: {
    width: 258,
    flexShrink: 0,
    backgroundColor: COLORS.primary,
  },

  // MOBILE OVERLAY
  mobileOverlay: {
    position: "absolute",
    top: 70,
    left: 0,
    right: 0,
    bottom: 64,
    zIndex: 1000,
    elevation: 20,
  },

  // BACKDROP
  backdrop: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.12)",
    zIndex: 1,
  },

  // SIDEBAR
  mobileSidebar: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    backgroundColor: COLORS.primary,
    zIndex: 2,
    elevation: 15,
    display: "flex",
    flexDirection: "column",
  },

  // DRAWER HEADER
  drawerHeader: {
    height: 65,
    flexShrink: 0,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.2)",
  },

  drawerTitle: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "bold",
  },

  closeButton: {
    width: 36,
    height: 36,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.15)",
  },

  // SCROLL
  scrollArea: {
    flex: 1,
    minHeight: 0,
  },

  menuContainer: {
    paddingTop: 15,
    paddingHorizontal: 7,
    paddingBottom: 30,
  },

  // MENU ITEM
  menuItem: {
    minHeight: 48,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    marginBottom: 4,
    borderRadius: 8,
    gap: 15,
  },

  activeMenu: {
    backgroundColor: COLORS.secondary,
  },

  menuText: {
    flex: 1,
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "500",
  },

});
