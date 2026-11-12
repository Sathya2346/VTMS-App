
import React, { useState } from "react";

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  useWindowDimensions,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import BottomTabBar from "../components/BottomTabBar";
import StatisticsSection from "../components/StatisticsSection";

import { COLORS } from "../constants/theme";

import TrainerManagementScreen from "./TrainerManagementScreen";
import BatchManagementScreen from "./BatchManagementScreen";
import CreateBatchScreen from "./CreateBatchScreen";

// ORIGINAL VTMS DATA

const BATCHES = [
  {
    name: "UI/UX Design",
    trainees: "30 Trainees",
    trainer: "Meena",
  },
  {
    name: "Full Stack Development",
    trainees: "45 Trainees",
    trainer: "Rahul",
  },
  {
    name: "Data Analytics",
    trainees: "25 Trainees",
    trainer: "Karthik",
  },
];

const ACTIVITIES = [
  {
    title: "New trainee enrolled",
    description: "Rahul Kumar",
    time: "2 hours ago",
  },
  {
    title: "Batch completed",
    description: "React Batch 5",
    time: "5 hours ago",
  },
  {
    title: "Payment received",
    description: "₹15,000 from Priya Sharma",
    time: "1 days ago",
  },
  {
    title: "New trainer added",
    description: "Anjali Singh",
    time: "2 days ago",
  },
  {
    title: "Report submitted",
    description: "Priya submitted Weekly Report - Week 12",
    time: "3 days ago",
  },
];

const NOTIFICATIONS = [
  "3 pending trainer reports need approval",
  "New batch starting on March 28, 2026",
  "Payment reminder: 5 installments due this week",
  "System backup completed successfully",
];

const REPORTS = [
  "Daily Reports Pending: 5",
  "Weekly Reports Pending: 2",
  "Monthly Reports Pending: 1",
];

// REUSABLE SECTION CARD

function SectionCard({ title, children, action }) {
  return (
    <View style={styles.sectionCard}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>{title}</Text>
        {action}
      </View>
      {children}
    </View>
  );
}

// REUSABLE BULLET

function Bullet({ color = COLORS.primaryLight }) {
  return <View style={[styles.bullet, { backgroundColor: color }]} />;
}

// DASHBOARD SCREEN

export default function DashboardScreen() {
  const { width } = useWindowDimensions();

  const isDesktop = width >= 1024;
  const isMobile = width < 1024;

  const [activeMenu, setActiveMenu] = useState("Dashboard");
  const [showCreateBatch, setShowCreateBatch] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);

  const contentColumns = width >= 1100 ? 2 : 1;

  const handleMenuSelect = (menu) => {
    setActiveMenu(menu);
    setDrawerVisible(false);
  };

  const reportButton = (
    <Pressable
      style={styles.viewButton}
      onPress={() => handleMenuSelect("Reports & Approvals")}
    >
      <Text style={styles.viewButtonText}>View Report</Text>
    </Pressable>
  );

  return (
    <View style={styles.container}>

      {/* HEADER */}
      <Header
        isDesktop={isDesktop}
        onMenuPress={() => setDrawerVisible(true)}
        title={activeMenu}
      />

      <View style={styles.mainLayout}>

        {/* DESKTOP SIDEBAR */}
        {isDesktop && (
          <Sidebar
            isMobile={false}
            visible={true}
            activeMenu={activeMenu}
            onMenuSelect={handleMenuSelect}
          />
        )}

        {/* MAIN DASHBOARD */}
        {activeMenu === "Batch Management" && showCreateBatch ? (
          <CreateBatchScreen
            onBack={() => setShowCreateBatch(false)}
            onCreate={(batchData) => {
              console.log("New Batch:", batchData);
              setShowCreateBatch(false);
            }}
          />
        ) : activeMenu === "Trainer Management" ? (
          <TrainerManagementScreen />
        ) : activeMenu === "Batch Management" ? (
          <BatchManagementScreen
            onCreateBatch={() => setShowCreateBatch(true)}
          />
        ) : (
        <ScrollView
            style={styles.content}
            contentContainerStyle={styles.contentInner}
            showsVerticalScrollIndicator={false}
        >

          {/* WELCOME */}
          <Text style={styles.welcome}>
            Welcome back! Here's what's happening today
          </Text>

          {/* STATISTICS */}
          <StatisticsSection />

          {/* FIRST ROW */}
          <View
            style={[
              styles.sectionGrid,
              contentColumns === 2 && styles.desktopGrid,
            ]}
          >

            {/* ACTIVE BATCHES */}
            <View
              style={[
                styles.sectionWrapper,
                contentColumns === 2 && styles.desktopColumn,
              ]}
            >
              <SectionCard title="Active Batches">

                {BATCHES.map((batch) => (
                  <View
                    key={batch.name}
                    style={styles.batchItem}
                  >
                    <Bullet color={COLORS.secondary} />

                    <View style={styles.batchContent}>
                      <View style={styles.batchTop}>
                        <Text style={styles.itemTitle}>
                          {batch.name}
                        </Text>

                        {isDesktop && (
                          <Text style={styles.trainer}>
                            Trainer: {batch.trainer}
                          </Text>
                        )}
                      </View>

                      <Text style={styles.secondaryText}>
                        {batch.trainees}
                      </Text>

                      {!isDesktop && (
                        <Text style={styles.secondaryText}>
                          Trainer: {batch.trainer}
                        </Text>
                      )}
                    </View>
                  </View>
                ))}

                <Text style={styles.completedHeading}>
                  Completed
                </Text>

                <View style={styles.batchItem}>
                  <Bullet color={COLORS.primaryLight} />

                  <View style={styles.batchContent}>
                    <View style={styles.batchTop}>
                      <Text style={styles.itemTitle}>
                        Web Development
                      </Text>

                      {isDesktop && (
                        <Text style={styles.trainer}>
                          Trainer: Karthik
                        </Text>
                      )}
                    </View>

                    <Text style={styles.secondaryText}>
                      Completed
                    </Text>
                  </View>
                </View>

              </SectionCard>
            </View>

            {/* REPORT REVIEW */}
            <View
              style={[
                styles.sectionWrapper,
                contentColumns === 2 && styles.desktopColumn,
              ]}
            >
              <SectionCard
                title="Report Review"
                action={reportButton}
              >

                {REPORTS.map((report) => (
                  <View
                    key={report}
                    style={styles.listItem}
                  >
                    <Bullet />

                    <Text style={styles.itemTitle}>
                      {report}
                    </Text>
                  </View>
                ))}

              </SectionCard>
            </View>

          </View>

          {/* SECOND ROW */}
          <View
            style={[
              styles.sectionGrid,
              contentColumns === 2 && styles.desktopGrid,
            ]}
          >

            {/* RECENT ACTIVITIES */}
            <View
              style={[
                styles.sectionWrapper,
                contentColumns === 2 && styles.desktopColumn,
              ]}
            >
              <SectionCard title="Recent Activities">

                {ACTIVITIES.map((activity) => (
                  <View
                    key={activity.title}
                    style={styles.activityItem}
                  >
                    <Bullet />

                    <View style={styles.activityContent}>
                      <View style={styles.activityTop}>
                        <Text style={styles.itemTitle}>
                          {activity.title}
                        </Text>

                        <Text style={styles.activityTime}>
                          {activity.time}
                        </Text>
                      </View>

                      <Text style={styles.secondaryText}>
                        {activity.description}
                      </Text>
                    </View>
                  </View>
                ))}

              </SectionCard>
            </View>

            {/* NOTIFICATIONS */}
            <View
              style={[
                styles.sectionWrapper,
                contentColumns === 2 && styles.desktopColumn,
              ]}
            >
              <SectionCard
                title="Notifications"
                action={reportButton}
              >

                {NOTIFICATIONS.map((notification) => (
                  <View
                    key={notification}
                    style={styles.listItem}
                  >
                    <Bullet />

                    <Text style={styles.itemTitle}>
                      {notification}
                    </Text>
                  </View>
                ))}

              </SectionCard>
            </View>

          </View>

        </ScrollView>
        )}
      </View>
      {/* MOBILE BOTTOM NAVIGATION */}
      {isMobile && (
        <BottomTabBar
          activeMenu={activeMenu}
          onTabPress={handleMenuSelect}
          onMorePress={() => setDrawerVisible(true)}
        />
      )}

      {/* MOBILE DRAWER */}
      {isMobile && (
        <Sidebar
          isMobile={true}
          visible={drawerVisible}
          activeMenu={activeMenu}
          onMenuSelect={handleMenuSelect}
          onClose={() => setDrawerVisible(false)}
        />
      )}

    </View>
  );
}

// STYLES

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  mainLayout: {
    flex: 1,
    flexDirection: "row",
    minHeight: 0,
  },

  content: {
    flex: 1,
    minWidth: 0,
  },

  contentInner: {
    padding: 20,
    paddingBottom: 25,
  },

  welcome: {
    fontSize: 17,
    fontWeight: "500",
    color: COLORS.text,
    marginBottom: 27,
  },

  // SECTION GRID

  sectionGrid: {
    width: "100%",
    gap: 20,
    marginBottom: 24,
  },

  desktopGrid: {
    flexDirection: "row",
    alignItems: "stretch",
    gap: 16,
  },

  sectionWrapper: {
    width: "100%",
  },

  desktopColumn: {
    flex: 1,
    width: 0,
    minWidth: 0,
  },

  // SECTION CARD

  sectionCard: {
    flex: 1,
    minHeight: 250,
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    padding: 17,

    elevation: 5,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.13,
    shadowRadius: 9,
  },

  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
    marginBottom: 19,
  },

  sectionTitle: {
    fontSize: 19,
    fontWeight: "600",
    color: COLORS.text,
    flexShrink: 1,
  },

  // VIEW REPORT BUTTON

  viewButton: {
    backgroundColor: COLORS.secondary,
    paddingHorizontal: 14,
    paddingVertical: 11,
    borderRadius: 8,
  },

  viewButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "500",
  },

  // BATCHES

  batchItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 15,
    marginBottom: 15,
  },

  batchContent: {
    flex: 1,
    minWidth: 0,
  },

  batchTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    flexWrap: "wrap",
    gap: 5,
  },

  itemTitle: {
    flex: 1,
    fontSize: 14,
    lineHeight: 21,
    color: COLORS.text,
    fontWeight: "500",
  },

  trainer: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },

  secondaryText: {
    fontSize: 12,
    lineHeight: 20,
    color: COLORS.textSecondary,
    marginTop: 5,
  },

  completedHeading: {
    fontSize: 19,
    fontWeight: "600",
    color: COLORS.text,
    marginTop: 7,
    marginBottom: 19,
  },

  // REPORTS / NOTIFICATIONS

  listItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 15,
    marginBottom: 22,
  },

  bullet: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginTop: 6,
    flexShrink: 0,
  },

  // RECENT ACTIVITIES

  activityItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 15,
    marginBottom: 13,
  },

  activityContent: {
    flex: 1,
    minWidth: 0,
  },

  activityTop: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: 5,
  },

  activityTime: {
    fontSize: 11,
    color: COLORS.textSecondary,
  },

});