
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

// DEMO DATA
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

// STATUS BADGE
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

// ACTION BUTTON
function ActionButton({ icon, color, onPress, label }) {
  return (
    <Pressable
      onPress={onPress}
      style={styles.actionButton}
      accessibilityLabel={label}
    >
      <Ionicons name={icon} size={17} color={color} />
    </Pressable>
  );
}

// BATCH ACTIONS
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

// DETAIL
function Detail({ label, value }) {
  return (
    <View style={styles.detailItem}>
      <Text style={styles.detailLabel}>{label}</Text>
      <Text style={styles.detailValue}>{value}</Text>
    </View>
  );
}

// MOBILE BATCH CARD
function BatchCard({ batch }) {
  const { width } = useWindowDimensions();
  const isNarrowMobile = width < 380;

  return (
    <View style={styles.batchCard}>
      <View
        style={[
          styles.cardHeading,
          isNarrowMobile && styles.cardHeadingMobile,
        ]}
      >
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

// SUMMARY CARD
function SummaryCard({ label, value, icon, color }) {
  return (
    <View style={styles.summaryCard}>
      <View style={[styles.summaryIcon, { backgroundColor: `${color}18` }]}>
        <Ionicons name={icon} size={21} color={color} />
      </View>

      <View style={styles.summaryInfo}>
        <Text style={styles.summaryValue}>{value}</Text>
        <Text style={styles.summaryLabel}>{label}</Text>
      </View>
    </View>
  );
}

// TABLE CELL
function TableCell({ children, style }) {
  return (
    <View style={[styles.tableCell, style]}>
      {children}
    </View>
  );
}

// MAIN SCREEN
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
          <Ionicons name="add" size={19} color="#FFFFFF" />
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

      {/* ALL BATCHES */}
      <View style={styles.listContainer}>
        {/* LIST HEADER */}
        <View style={styles.listHeader}>
          <View style={styles.listHeaderText}>
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
          <Ionicons name="search-outline" size={19} color="#888888" />

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

        {/* DESKTOP TABLE - NO HORIZONTAL SCROLL */}
        {isDesktop ? (
          <View style={styles.table}>
            {/* TABLE HEADER */}
            <View style={styles.tableHeader}>
              <TableCell style={styles.batchColumn}>
                <Text style={styles.tableHeading}>Batch Name</Text>
              </TableCell>

              <TableCell style={styles.courseColumn}>
                <Text style={styles.tableHeading}>Course</Text>
              </TableCell>

              <TableCell style={styles.trainerColumn}>
                <Text style={styles.tableHeading}>Trainer</Text>
              </TableCell>

              <TableCell style={styles.durationColumn}>
                <Text style={styles.tableHeading}>Duration</Text>
              </TableCell>

              <TableCell style={styles.dateColumn}>
                <Text style={styles.tableHeading}>Start On</Text>
              </TableCell>

              <TableCell style={styles.dateColumn}>
                <Text style={styles.tableHeading}>End</Text>
              </TableCell>

              <TableCell style={styles.studentsColumn}>
                <Text style={styles.tableHeading}>Students</Text>
              </TableCell>

              <TableCell style={styles.statusColumn}>
                <Text style={styles.tableHeading}>Status</Text>
              </TableCell>

              <TableCell style={styles.actionsColumn}>
                <Text style={styles.tableHeading}>Action</Text>
              </TableCell>
            </View>

            {/* TABLE ROWS */}
            {filteredBatches.map((batch) => (
              <View key={batch.id} style={styles.tableRow}>
                <TableCell style={styles.batchColumn}>
                  <Text style={styles.tableText} numberOfLines={2}>
                    {batch.name}
                  </Text>
                </TableCell>

                <TableCell style={styles.courseColumn}>
                  <Text style={styles.tableText} numberOfLines={2}>
                    {batch.course}
                  </Text>
                </TableCell>

                <TableCell style={styles.trainerColumn}>
                  <Text style={styles.tableText}>{batch.trainer}</Text>
                </TableCell>

                <TableCell style={styles.durationColumn}>
                  <Text style={styles.tableText}>{batch.duration}</Text>
                </TableCell>

                <TableCell style={styles.dateColumn}>
                  <Text style={styles.tableText}>{batch.startDate}</Text>
                </TableCell>

                <TableCell style={styles.dateColumn}>
                  <Text style={styles.tableText}>{batch.endDate}</Text>
                </TableCell>

                <TableCell style={styles.studentsColumn}>
                  <Text style={styles.tableText}>{batch.students}</Text>
                </TableCell>

                <TableCell style={styles.statusColumn}>
                  <StatusBadge status={batch.status} />
                </TableCell>

                <TableCell style={styles.actionsColumn}>
                  <BatchActions batch={batch} />
                </TableCell>
              </View>
            ))}

            {filteredBatches.length === 0 && (
              <Text style={styles.emptyText}>No batches found.</Text>
            )}
          </View>
        ) : (
          /* MOBILE / TABLET */
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

// STYLES
const styles = StyleSheet.create({
  container: {
    flex: 1,
    minWidth: 0,
    backgroundColor: COLORS.background,
  },

  content: {
    padding: 16,
    paddingBottom: 20,
  },

  pageHeading: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: 12,
    marginBottom: 16,
  },

  headingText: {
    flex: 1,
    minWidth: 180,
  },

  pageTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: COLORS.text,
  },

  pageSubtitle: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginTop: 4,
  },

  createButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    backgroundColor: COLORS.primary,
    paddingHorizontal: 13,
    paddingVertical: 10,
    borderRadius: 8,
  },

  createButtonText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "600",
  },

  // SUMMARY
  summaryRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    marginBottom: 16,
  },

  summaryCard: {
    flex: 1,
    minWidth: 145,
    backgroundColor: COLORS.surface,
    borderRadius: 10,
    padding: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    elevation: 2,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
  },

  summaryIcon: {
    width: 38,
    height: 38,
    borderRadius: 9,
    justifyContent: "center",
    alignItems: "center",
  },

  summaryInfo: {
    flex: 1,
    minWidth: 0,
  },

  summaryValue: {
    fontSize: 19,
    fontWeight: "700",
    color: COLORS.text,
  },

  summaryLabel: {
    fontSize: 10,
    color: COLORS.textSecondary,
    marginTop: 3,
  },

  // LIST CONTAINER
  listContainer: {
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    padding: 14,
    minWidth: 0,
    elevation: 2,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 5,
  },

  listHeader: {
    width: "100%",
    minWidth: 0,
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: 8,
    marginBottom: 14,
  },

  listHeaderText: {
    flex: 1,
    minWidth: 0,
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
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 20,
    flexShrink: 0,
    alignSelf: "flex-start",
  },

  countText: {
    color: COLORS.primary,
    fontSize: 11,
    fontWeight: "600",
  },

  // SEARCH
  searchContainer: {
    minHeight: 42,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 11,
    gap: 8,
    marginBottom: 14,
    minWidth: 0,
  },

  searchInput: {
    flex: 1,
    minWidth: 0,
    fontSize: 12,
    color: COLORS.text,
    paddingVertical: 8,
    outlineStyle: "none",
  },

  // DESKTOP TABLE
  table: {
    width: "100%",
    minWidth: 0,
  },

  tableHeader: {
    width: "100%",
    minHeight: 42,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F3FC",
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    paddingHorizontal: 5,
  },

  tableRow: {
    width: "100%",
    minHeight: 58,
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE",
    paddingHorizontal: 5,
  },

  tableCell: {
    minWidth: 0,
    justifyContent: "center",
    paddingHorizontal: 4,
    flexShrink: 1,
  },

  tableHeading: {
    fontSize: 10,
    fontWeight: "700",
    color: COLORS.textSecondary,
  },

  tableText: {
    fontSize: 10,
    color: COLORS.text,
    flexShrink: 1,
  },

  // FLEX COLUMN WIDTHS
  batchColumn: { flex: 1.45 },
  courseColumn: { flex: 1.05 },
  trainerColumn: { flex: 0.72 },
  durationColumn: { flex: 0.82 },
  dateColumn: { flex: 0.95 },
  studentsColumn: { flex: 0.55 },
  statusColumn: { flex: 0.9 },
  actionsColumn: { flex: 1.15 },

  // STATUS
  statusBadge: {
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    borderRadius: 20,
    paddingHorizontal: 7,
    paddingVertical: 5,
  },

  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },

  statusText: {
    fontSize: 9,
    fontWeight: "600",
  },

  // ACTIONS
  actions: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "nowrap",
    gap: 4,
  },

  actionButton: {
    width: 27,
    height: 28,
    borderRadius: 6,
    backgroundColor: "#F5F5F5",
    justifyContent: "center",
    alignItems: "center",
  },

  // MOBILE CARDS
  mobileList: {
    gap: 12,
    minWidth: 0,
  },

  batchCard: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 9,
    padding: 13,
    gap: 13,
    minWidth: 0,
  },

  cardHeading: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: 10,
  },

  cardHeadingMobile: {
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 10,
  },

  cardTitleArea: {
    flex: 1,
    minWidth: 0,
    width: "100%",
  },

  batchName: {
    fontSize: 14,
    fontWeight: "700",
    color: COLORS.text,
    flexShrink: 1,
    lineHeight: 21,
  },

  courseName: {
    fontSize: 11,
    color: COLORS.textSecondary,
    marginTop: 4,
  },

  cardDetails: {
    flexDirection: "row",
    flexWrap: "wrap",
    columnGap: 8,
    rowGap: 14,
  },

  detailItem: {
    width: "47%",
    minWidth: 0,
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
    flexShrink: 1,
  },

  cardFooter: {
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    paddingTop: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: 10,
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
    padding: 20,
  },
});
