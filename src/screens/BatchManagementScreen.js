
import React, { useMemo, useState } from "react";

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Pressable,
  Alert,
  useWindowDimensions,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../constants/theme";

// Demo data – later we can connect this with backend API
const INITIAL_BATCHES = [
  {
    id: 1,
    name: "Java Full Stack - Batch 01",
    course: "Java Full Stack",
    trainer: "Sathya",
    duration: "6 Months",
    startDate: "01-09-2026",
    endDate: "28-02-2027",
    students: 25,
    status: "Active",
  },
  {
    id: 2,
    name: "Python Full Stack - Batch 02",
    course: "Python Full Stack",
    trainer: "Arun",
    duration: "4 Months",
    startDate: "15-08-2026",
    endDate: "15-12-2026",
    students: 18,
    status: "Active",
  },
  {
    id: 3,
    name: "UI/UX Design - Batch 03",
    course: "UI/UX Design",
    trainer: "Meena",
    duration: "3 Months",
    startDate: "01-06-2026",
    endDate: "01-09-2026",
    students: 20,
    status: "Completed",
  },
  {
    id: 4,
    name: "Data Analytics - Batch 04",
    course: "Data Analytics",
    trainer: "Karthik",
    duration: "5 Months",
    startDate: "10-10-2026",
    endDate: "10-03-2027",
    students: 15,
    status: "Upcoming",
  },
];

function StatusBadge({ status }) {
  const statusColors = {
    Active: { backgroundColor: "#DDF8E5", color: "#16833B" },
    Completed: { backgroundColor: "#E8E5FF", color: "#5138D9" },
    Upcoming: { backgroundColor: "#FFF0D9", color: "#C47A00" },
  };

  const colors = statusColors[status] || statusColors.Active;

  return (
    <View style={[styles.statusBadge, { backgroundColor: colors.backgroundColor }]}>
      <View style={[styles.statusDot, { backgroundColor: colors.color }]} />
      <Text style={[styles.statusText, { color: colors.color }]}>
        {status}
      </Text>
    </View>
  );
}

function ActionButton({ icon, color, onPress, label }) {
  return (
    <Pressable
      onPress={onPress}
      style={styles.actionButton}
      accessibilityLabel={label}
    >
      <Ionicons name={icon} size={18} color={color} />
    </Pressable>
  );
}

function BatchActions({ batch }) {
  const showMessage = (action) => {
    Alert.alert(
      action,
      `${action} screen for "${batch.name}" will be implemented in the next steps.`
    );
  };

  return (
    <View style={styles.actions}>
      <ActionButton
        icon="eye-outline"
        color={COLORS.primaryLight}
        label="View batch"
        onPress={() => showMessage("View Batch")}
      />
      <ActionButton
        icon="person-add-outline"
        color="#16833B"
        label="Assign trainee"
        onPress={() => showMessage("Assign Trainee")}
      />
      <ActionButton
        icon="create-outline"
        color="#C47A00"
        label="Edit batch"
        onPress={() => showMessage("Edit Batch")}
      />
      <ActionButton
        icon="trash-outline"
        color={COLORS.danger}
        label="Delete batch"
        onPress={() =>
          Alert.alert(
            "Delete Batch",
            `Are you sure you want to delete "${batch.name}"?`,
            [
              { text: "Cancel", style: "cancel" },
              {
                text: "Delete",
                style: "destructive",
                onPress: () =>
                  Alert.alert("Demo Mode", "Backend delete will be connected later."),
              },
            ]
          )
        }
      />
    </View>
  );
}

function BatchCard({ batch }) {
  return (
    <View style={styles.batchCard}>
      <View style={styles.cardHeading}>
        <View style={styles.cardTitleArea}>
          <Text style={styles.batchName}>{batch.name}</Text>
          <Text style={styles.courseName}>{batch.course}</Text>
        </View>
        <StatusBadge status={batch.status} />
      </View>

      <View style={styles.cardDetails}>
        <Detail label="Trainer" value={batch.trainer} />
        <Detail label="Duration" value={batch.duration} />
        <Detail label="Start Date" value={batch.startDate} />
        <Detail label="End Date" value={batch.endDate} />
        <Detail label="Students" value={`${batch.students} Students`} />
      </View>

      <View style={styles.cardFooter}>
        <Text style={styles.actionLabel}>Actions</Text>
        <BatchActions batch={batch} />
      </View>
    </View>
  );
}

function Detail({ label, value }) {
  return (
    <View style={styles.detailItem}>
      <Text style={styles.detailLabel}>{label}</Text>
      <Text style={styles.detailValue}>{value}</Text>
    </View>
  );
}

export default function BatchManagementScreen() {
  const { width } = useWindowDimensions();
  const isDesktop = width >= 900;

  const [search, setSearch] = useState("");

  const filteredBatches = useMemo(() => {
    const keyword = search.trim().toLowerCase();

    if (!keyword) return INITIAL_BATCHES;

    return INITIAL_BATCHES.filter((batch) =>
      [
        batch.name,
        batch.course,
        batch.trainer,
        batch.duration,
        batch.status,
      ].some((value) => value.toLowerCase().includes(keyword))
    );
  }, [search]);

  const handleCreateBatch = () => {
    Alert.alert(
      "Create New Batch",
      "The Create New Batch form will be implemented in the next step."
    );
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {/* PAGE HEADING */}
      <View style={styles.pageHeading}>
        <View style={styles.headingText}>
          <Text style={styles.pageTitle}>Batch Management</Text>
          <Text style={styles.pageSubtitle}>
            Manage and monitor all training batches
          </Text>
        </View>

        <Pressable
          style={styles.createButton}
          onPress={handleCreateBatch}
        >
          <Ionicons name="add" size={20} color="#FFFFFF" />
          <Text style={styles.createButtonText}>Create New Batch</Text>
        </Pressable>
      </View>

      {/* SUMMARY */}
      <View style={styles.summaryRow}>
        <SummaryCard
          label="Total Batches"
          value={INITIAL_BATCHES.length}
          icon="albums-outline"
          color={COLORS.primaryLight}
        />
        <SummaryCard
          label="Active Batches"
          value={INITIAL_BATCHES.filter((b) => b.status === "Active").length}
          icon="checkmark-circle-outline"
          color="#16833B"
        />
        <SummaryCard
          label="Total Students"
          value={INITIAL_BATCHES.reduce((sum, b) => sum + b.students, 0)}
          icon="people-outline"
          color="#C47A00"
        />
      </View>

      {/* BATCH LIST */}
      <View style={styles.listContainer}>
        <View style={styles.listHeader}>
          <View>
            <Text style={styles.sectionTitle}>All Batches</Text>
            <Text style={styles.sectionSubtitle}>
              View and manage your training batches
            </Text>
          </View>

          <View style={styles.countBadge}>
            <Text style={styles.countText}>
              {filteredBatches.length} Batches
            </Text>
          </View>
        </View>

        {/* SEARCH */}
        <View style={styles.searchContainer}>
          <Ionicons name="search-outline" size={20} color="#888888" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search by batch, course, trainer or status..."
            placeholderTextColor="#999999"
            value={search}
            onChangeText={setSearch}
          />
          {search.length > 0 && (
            <Pressable onPress={() => setSearch("")}>
              <Ionicons name="close-circle" size={19} color="#888888" />
            </Pressable>
          )}
        </View>

        {/* DESKTOP TABLE */}
        {isDesktop ? (
          <ScrollView horizontal showsHorizontalScrollIndicator>
            <View style={styles.table}>
              <View style={styles.tableHeader}>
                <Text style={[styles.tableHeading, styles.colBatch]}>Batch Name</Text>
                <Text style={[styles.tableHeading, styles.colCourse]}>Course</Text>
                <Text style={[styles.tableHeading, styles.colTrainer]}>Trainer</Text>
                <Text style={[styles.tableHeading, styles.colDuration]}>Duration</Text>
                <Text style={[styles.tableHeading, styles.colDate]}>Start On</Text>
                <Text style={[styles.tableHeading, styles.colDate]}>End</Text>
                <Text style={[styles.tableHeading, styles.colStudents]}>Students</Text>
                <Text style={[styles.tableHeading, styles.colStatus]}>Status</Text>
                <Text style={[styles.tableHeading, styles.colActions]}>Action</Text>
              </View>

              {filteredBatches.map((batch) => (
                <View key={batch.id} style={styles.tableRow}>
                  <Text style={[styles.tableText, styles.colBatch]} numberOfLines={2}>
                    {batch.name}
                  </Text>
                  <Text style={[styles.tableText, styles.colCourse]}>{batch.course}</Text>
                  <Text style={[styles.tableText, styles.colTrainer]}>{batch.trainer}</Text>
                  <Text style={[styles.tableText, styles.colDuration]}>{batch.duration}</Text>
                  <Text style={[styles.tableText, styles.colDate]}>{batch.startDate}</Text>
                  <Text style={[styles.tableText, styles.colDate]}>{batch.endDate}</Text>
                  <Text style={[styles.tableText, styles.colStudents]}>{batch.students}</Text>
                  <View style={styles.colStatus}>
                    <StatusBadge status={batch.status} />
                  </View>
                  <View style={styles.colActions}>
                    <BatchActions batch={batch} />
                  </View>
                </View>
              ))}

              {filteredBatches.length === 0 && (
                <Text style={styles.emptyText}>No batches found.</Text>
              )}
            </View>
          </ScrollView>
        ) : (
          /* MOBILE / TABLET CARDS */
          <View style={styles.mobileList}>
            {filteredBatches.map((batch) => (
              <BatchCard key={batch.id} batch={batch} />
            ))}

            {filteredBatches.length === 0 && (
              <Text style={styles.emptyText}>No batches found.</Text>
            )}
          </View>
        )}
      </View>
    </ScrollView>
  );
}

function SummaryCard({ label, value, icon, color }) {
  return (
    <View style={styles.summaryCard}>
      <View style={[styles.summaryIcon, { backgroundColor: `${color}18` }]}>
        <Ionicons name={icon} size={22} color={color} />
      </View>
      <View style={styles.summaryInfo}>
        <Text style={styles.summaryValue}>{value}</Text>
        <Text style={styles.summaryLabel}>{label}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    padding: 20,
    paddingBottom: 35,
  },
  pageHeading: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: 15,
    marginBottom: 22,
  },
  headingText: {
    flex: 1,
    minWidth: 180,
  },
  pageTitle: {
    fontSize: 23,
    fontWeight: "700",
    color: COLORS.text,
  },
  pageSubtitle: {
    fontSize: 13,
    color: COLORS.textSecondary,
    marginTop: 5,
  },
  createButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 7,
    backgroundColor: COLORS.primary,
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 8,
  },
  createButtonText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "600",
  },
  summaryRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 14,
    marginBottom: 22,
  },
  summaryCard: {
    flex: 1,
    minWidth: 145,
    backgroundColor: COLORS.surface,
    borderRadius: 11,
    padding: 15,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    elevation: 2,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 5,
  },
  summaryIcon: {
    width: 42,
    height: 42,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  summaryInfo: {
    flex: 1,
  },
  summaryValue: {
    fontSize: 21,
    fontWeight: "700",
    color: COLORS.text,
  },
  summaryLabel: {
    fontSize: 11,
    color: COLORS.textSecondary,
    marginTop: 3,
  },
  listContainer: {
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    padding: 17,
    elevation: 3,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 7,
  },
  listHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
    marginBottom: 17,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.text,
  },
  sectionSubtitle: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginTop: 4,
  },
  countBadge: {
    backgroundColor: "#EAE7FF",
    paddingHorizontal: 11,
    paddingVertical: 7,
    borderRadius: 20,
  },
  countText: {
    color: COLORS.primary,
    fontSize: 11,
    fontWeight: "600",
  },
  searchContainer: {
    minHeight: 44,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    gap: 9,
    marginBottom: 18,
  },
  searchInput: {
    flex: 1,
    minWidth: 0,
    fontSize: 13,
    color: COLORS.text,
    paddingVertical: 9,
    outlineStyle: "none",
  },
  table: {
    minWidth: 1100,
  },
  tableHeader: {
    minHeight: 48,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F3FC",
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    paddingHorizontal: 10,
  },
  tableHeading: {
    fontSize: 11,
    fontWeight: "700",
    color: COLORS.textSecondary,
    paddingHorizontal: 6,
  },
  tableRow: {
    minHeight: 66,
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE",
    paddingHorizontal: 10,
  },
  tableText: {
    fontSize: 11,
    color: COLORS.text,
    paddingHorizontal: 6,
  },
  colBatch: { width: 175 },
  colCourse: { width: 125 },
  colTrainer: { width: 85 },
  colDuration: { width: 75 },
  colDate: { width: 90 },
  colStudents: { width: 65 },
  colStatus: { width: 100, justifyContent: "center" },
  colActions: { width: 150, justifyContent: "center" },
  statusBadge: {
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    borderRadius: 20,
    paddingHorizontal: 9,
    paddingVertical: 6,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  statusText: {
    fontSize: 10,
    fontWeight: "600",
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  actionButton: {
    width: 29,
    height: 29,
    borderRadius: 6,
    backgroundColor: "#F5F5F5",
    justifyContent: "center",
    alignItems: "center",
  },
  mobileList: {
    gap: 12,
  },
  batchCard: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 9,
    padding: 13,
    gap: 13,
  },
  cardHeading: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: 8,
  },
  cardTitleArea: {
    flex: 1,
    minWidth: 0,
  },
  batchName: {
    fontSize: 14,
    fontWeight: "700",
    color: COLORS.text,
  },
  courseName: {
    fontSize: 11,
    color: COLORS.textSecondary,
    marginTop: 4,
  },
  cardDetails: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 13,
  },
  detailItem: {
    width: "46%",
    gap: 4,
  },
  detailLabel: {
    fontSize: 10,
    color: COLORS.textSecondary,
  },
  detailValue: {
    fontSize: 12,
    fontWeight: "600",
    color: COLORS.text,
  },
  cardFooter: {
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    paddingTop: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: 8,
  },
  actionLabel: {
    fontSize: 11,
    color: COLORS.textSecondary,
    fontWeight: "600",
  },
  emptyText: {
    textAlign: "center",
    color: COLORS.textSecondary,
    fontSize: 13,
    padding: 25,
  },
});
