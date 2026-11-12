import React, { useMemo, useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  Pressable,
  StyleSheet,
  Alert,
  useWindowDimensions,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../constants/theme";

const COURSES = [
  "Java Full Stack",
  "Python Full Stack",
  "UI/UX Design",
  "Data Analytics",
];

const ROLES = [
  "Junior Developer",
  "Software Developer Intern",
  "Business Analyst Intern",
  "QA Testing Intern",
  "UI/UX Design Intern",
  "Junior Designer",
];

const COURSE_DURATIONS = [
  "1 Month",
  "2 Month",
  "3 Month",
  "4 Month",
  "5 Month",
  "6 Month",
];

const TRAINERS = [
  { email: "rajesh@vetriitsystems.com", name: "Rajesh Sharma", experience: "2 years", batches: 3 },
  { email: "priya@vetriitsystems.com", name: "Priya Sharma", experience: "2 years", batches: 3 },
  { email: "sneha@vetriitsystems.com", name: "Sneha", experience: "1 year", batches: 2 },
  { email: "amir@vetriitsystems.com", name: "Amir", experience: "2 years", batches: 2 },
  { email: "arun@vetriitsystems.com", name: "Arun", experience: "1 year", batches: 1 },
];

const TRAINEES = [
  "Arun Kumar",
  "Karthick",
  "Shalini",
  "Sharmila",
  "Lillisa",
  "Bharathi",
  "Gayathri",
];

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const ADMIN_EMAIL = "admin@vetriitsystems.com";

function parseDate(value) {
  if (!value || !/^\d{2}\/\d{2}\/\d{4}$/.test(value.trim())) {
    return null;
  }

  const [day, month, year] = value.split("/").map(Number);
  const date = new Date(year, month - 1, day);

  if (
    date.getFullYear() !== year ||
    date.getMonth() !== month - 1 ||
    date.getDate() !== day
  ) {
    return null;
  }

  return date;
}

function SectionTitle({ icon, title }) {
  return (
    <View style={styles.sectionTitleRow}>
      <View style={styles.sectionIcon}>
        <Ionicons name={icon} size={16} color="#FFFFFF" />
      </View>
      <Text style={styles.sectionTitle}>{title}</Text>
    </View>
  );
}

function FormSection({ icon, title, children, style }) {
  return (
    <View style={[styles.sectionCard, style]}>
      <SectionTitle icon={icon} title={title} />
      {children}
    </View>
  );
}

function Field({ label, required, children, style }) {
  return (
    <View style={[styles.field, style]}>
      <Text style={styles.fieldLabel}>
        {label}{required ? "*" : ""}
      </Text>
      {children}
    </View>
  );
}

function Input({
  value,
  onChangeText,
  placeholder,
  editable = true,
  multiline = false,
  numberOfLines = 4,
  keyboardType = "default",
  style,
}) {
  return (
    <TextInput
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      placeholderTextColor="#888888"
      editable={editable}
      multiline={multiline}
      numberOfLines={multiline ? numberOfLines : 1}
      keyboardType={keyboardType}
      textAlignVertical={multiline ? "top" : "center"}
      style={[
        styles.input,
        multiline && styles.textArea,
        !editable && styles.readOnlyInput,
        style,
      ]}
    />
  );
}

function Dropdown({ value, onValueChange, options, placeholder }) {
  return (
    <View style={styles.pickerContainer}>
      <Picker
        selectedValue={value}
        onValueChange={onValueChange}
        style={styles.picker}
        dropdownIconColor="#222222"
      >
        <Picker.Item label={placeholder} value="" />
        {options.map((option) => (
          <Picker.Item key={option} label={option} value={option} />
        ))}
      </Picker>
    </View>
  );
}

function CheckBox({ checked }) {
  return (
    <View style={[styles.checkbox, checked && styles.checkboxChecked]}>
      {checked ? (
        <Ionicons name="checkmark" size={14} color="#FFFFFF" />
      ) : null}
    </View>
  );
}

export default function CreateBatchScreen({
  onBack,
  onCreate,
  initialData = null,
  isEdit = false,
}) {
  const { width } = useWindowDimensions();

  // Layout breakpoints
  const isMobile = width < 600;
  const isTablet = width >= 600 && width < 1024;
  const isWideScreen = width >= 1024;

  const fieldWidth = isMobile ? "100%" : "48%";

  const [batchName, setBatchName] = useState("");
  const [course, setCourse] = useState("");
  const [role, setRole] = useState("");
  const [description, setDescription] = useState("");
  const [courseDuration, setCourseDuration] = useState("");

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [startTime, setStartTime] = useState("10:00 AM");
  const [endTime, setEndTime] = useState("11:30 AM");

  const [selectedDays, setSelectedDays] = useState([
    "Mon", "Tue", "Wed", "Thu", "Fri",
  ]);

  const [trainer, setTrainer] = useState("");
  const [traineeSearch, setTraineeSearch] = useState("");
  const [selectedTrainees, setSelectedTrainees] = useState([]);

  const [sendEmail, setSendEmail] = useState(true);
  const [emailTo, setEmailTo] = useState("");
  const [emailSubject, setEmailSubject] = useState("New Batch Assigned");
  const [emailPreview, setEmailPreview] = useState("");

  const [attachment, setAttachment] = useState(null);
  const [status, setStatus] = useState("Upcoming");

    useEffect(() => {
    if (!initialData) return;

    const normalizeDate = (value) => {
      if (!value) return "";
      const parts = value.replaceAll("-", "/").split("/");
      if (parts.length !== 3) return value;

      // Existing list format: DD-MM-YYYY
      return parts.join("/");
    };

    setBatchName(initialData.name || "");
    setCourse(initialData.course || "");
    setRole(initialData.role || "");
    setDescription(initialData.description || "");
    setCourseDuration(initialData.courseDuration || initialData.duration || "");

    setStartDate(normalizeDate(initialData.startDate));
    setEndDate(normalizeDate(initialData.endDate));

    setStartTime(initialData.startTime || "10:00 AM");
    setEndTime(initialData.endTime || "11:30 AM");

    setSelectedDays(
      Array.isArray(initialData.days)
        ? initialData.days
        : ["Mon", "Tue", "Wed", "Thu", "Fri"]
    );

    const trainerValue = initialData.trainer || "";
    const matchedTrainer = TRAINERS.find(
      (item) =>
        item.email === trainerValue ||
        item.name.toLowerCase() === trainerValue.toLowerCase()
    );

    setTrainer(matchedTrainer ? matchedTrainer.email : "");

    setSelectedTrainees(
      Array.isArray(initialData.trainees) ? initialData.trainees : []
    );

    setSendEmail(initialData.sendEmail ?? true);
    setEmailTo(initialData.emailTo || "");
    setEmailSubject(initialData.emailSubject || "New Batch Assigned");
    setEmailPreview(initialData.emailPreview || "");
    setAttachment(
      initialData.attachment
        ? { uri: initialData.attachment, fileName: "Existing attachment" }
        : null
    );
    setStatus(initialData.status || "Upcoming");
  }, [initialData]);

  const calculatedDuration = useMemo(() => {
    const start = parseDate(startDate);
    const end = parseDate(endDate);

    if (!start || !end || end < start) return "";

    const totalDays =
      Math.floor((end.getTime() - start.getTime()) / 86400000) + 1;

    return `${totalDays} Days`;
  }, [startDate, endDate]);

  const selectedTrainer = TRAINERS.find(
    (item) => item.email === trainer
  );

  const filteredTrainees = TRAINEES.filter((name) =>
    name.toLowerCase().includes(traineeSearch.trim().toLowerCase())
  );

  const toggleDay = (day) => {
    setSelectedDays((current) =>
      current.includes(day)
        ? current.filter((item) => item !== day)
        : [...current, day]
    );
  };

  const toggleTrainee = (name) => {
    setSelectedTrainees((current) =>
      current.includes(name)
        ? current.filter((item) => item !== name)
        : [...current, name]
    );
  };

  const pickAttachment = async () => {
    try {
      const permission =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (!permission.granted) {
        Alert.alert(
          "Permission Required",
          "Please allow photo library access to attach an image."
        );
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        allowsEditing: false,
        quality: 1,
      });

      if (!result.canceled && result.assets?.length) {
        setAttachment(result.assets[0]);
      }
    } catch (error) {
      Alert.alert(
        "Attachment Error",
        "Unable to open the image picker on this device."
      );
    }
  };

  const resetForm = () => {
    Alert.alert("Reset Form", "Clear all entered batch details?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Reset",
        style: "destructive",
        onPress: () => {
          setBatchName("");
          setCourse("");
          setRole("");
          setDescription("");
          setCourseDuration("");
          setStartDate("");
          setEndDate("");
          setStartTime("10:00 AM");
          setEndTime("11:30 AM");
          setSelectedDays(["Mon", "Tue", "Wed", "Thu", "Fri"]);
          setTrainer("");
          setTraineeSearch("");
          setSelectedTrainees([]);
          setSendEmail(true);
          setEmailTo("");
          setEmailSubject("New Batch Assigned");
          setEmailPreview("");
          setAttachment(null);
          setStatus("Upcoming");
        },
      },
    ]);
  };

  const handleCreate = () => {
    const start = parseDate(startDate);
    const end = parseDate(endDate);

    if (!batchName.trim() || !course || !startDate || !endDate || !trainer) {
     Alert.alert(
      isEdit ? "Update Batch" : "Create Batch",
      isEdit
        ? "Are you sure you want to save these changes?"
        : "Form validation successful. Backend save and email delivery are not connected yet.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: isEdit ? "Save Changes" : "Continue",
          onPress: () => onCreate?.({
            ...initialData,
            ...batchData,
          }),
        },
      ]
    );
      return;
    }

    if (!start || !end) {
      Alert.alert("Invalid Date", "Enter valid dates in DD/MM/YYYY format.");
      return;
    }

    if (end < start) {
      Alert.alert(
        "Invalid Schedule",
        "End Date must be on or after Start Date."
      );
      return;
    }

    if (!selectedDays.length) {
      Alert.alert("Training Days", "Select at least one training day.");
      return;
    }

    const batchData = {
      name: batchName.trim(),
      course,
      role,
      description: description.trim(),
      courseDuration,
      startDate,
      endDate,
      duration: calculatedDuration,
      startTime,
      endTime,
      days: selectedDays,
      trainer,
      trainees: selectedTrainees,
      sendEmail,
      emailFrom: ADMIN_EMAIL,
      emailTo: emailTo.trim() || trainer,
      emailSubject,
      emailPreview,
      attachment: attachment?.uri || null,
      status,
    };

    Alert.alert(
      "Batch Details Ready",
      "Form validation successful. Backend save and email delivery are not connected yet.",
      [
        {
          text: "OK",
          onPress: () => onCreate?.(batchData),
        },
      ]
    );
  };

  const defaultEmailPreview =
    `Hello ${selectedTrainer?.name || "Trainer"},\n` +
    `You have been assigned as trainer for ${batchName || "the new batch"}.\n` +
    `Start Date: ${startDate || "-"} | Time: ${startTime} - ${endTime}`;

  const renderFieldWidth = { width: fieldWidth };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.pageHeading}>
        <Text style={styles.pageTitle}>
        {isEdit ? "Edit Batch" : "Create New Batch"}
        </Text>

        <Text style={styles.pageSubtitle}>
        {isEdit
            ? "Update and manage existing batch details"
            : "Create and configure a new training batch"}
        </Text>
      </View>

      {/* BASIC DETAILS */}
      <FormSection icon="document-text-outline" title="Basic Details">
        <View style={styles.fieldsWrap}>
          <Field label="Batch Name" required style={renderFieldWidth}>
            <Input
              value={batchName}
              onChangeText={setBatchName}
              placeholder="Batch Name"
            />
          </Field>

          <Field label="Course" required style={renderFieldWidth}>
            <Dropdown
              value={course}
              onValueChange={setCourse}
              options={COURSES}
              placeholder="Select Course"
            />
          </Field>

          <Field label="Role" style={renderFieldWidth}>
            <Dropdown
              value={role}
              onValueChange={setRole}
              options={ROLES}
              placeholder="Select Role"
            />
          </Field>

          <Field label="Description" style={renderFieldWidth}>
            <Input
              value={description}
              onChangeText={setDescription}
              placeholder="Description"
            />
          </Field>
        </View>
      </FormSection>

      {/* SCHEDULE AND TIMING */}
      <View
        style={[
          styles.scheduleLayout,
          isWideScreen && styles.scheduleLayoutWide,
        ]}
      >
        <FormSection
          icon="calendar-outline"
          title="Schedule"
          style={[
            styles.scheduleCard,
            isWideScreen && styles.scheduleCardWide,
          ]}
        >
          <View style={styles.fieldsWrap}>
            <Field label="Start Date" required style={renderFieldWidth}>
              <Input
                value={startDate}
                onChangeText={setStartDate}
                placeholder="DD/MM/YYYY"
              />
            </Field>

            <Field label="End Date" required style={renderFieldWidth}>
              <Input
                value={endDate}
                onChangeText={setEndDate}
                placeholder="DD/MM/YYYY"
              />
            </Field>

            <Field label="Duration" style={{ width: "100%" }}>
              <Input
                value={calculatedDuration}
                placeholder="Auto Calculated"
                editable={false}
              />
            </Field>

            <Field label="Course Duration" style={{ width: "100%" }}>
              <Dropdown
                value={courseDuration}
                onValueChange={setCourseDuration}
                options={COURSE_DURATIONS}
                placeholder="Please Select"
              />
            </Field>
          </View>
        </FormSection>

        <FormSection
          icon="time-outline"
          title="Timing"
          style={[
            styles.scheduleCard,
            isWideScreen && styles.scheduleCardWide,
          ]}
        >
          <View style={styles.fieldsWrap}>
            <Field label="Start Time" required style={renderFieldWidth}>
              <Input
                value={startTime}
                onChangeText={setStartTime}
                placeholder="10:00 AM"
              />
            </Field>

            <Field label="End Time" required style={renderFieldWidth}>
              <Input
                value={endTime}
                onChangeText={setEndTime}
                placeholder="11:30 AM"
              />
            </Field>
          </View>

          <View style={styles.daysBlock}>
            <Text style={styles.fieldLabel}>Days</Text>

            <View style={styles.daysContainer}>
              {DAYS.map((day) => {
                const checked = selectedDays.includes(day);

                return (
                  <Pressable
                    key={day}
                    style={styles.dayOption}
                    onPress={() => toggleDay(day)}
                  >
                    <CheckBox checked={checked} />
                    <Text style={styles.dayText}>{day}</Text>
                  </Pressable>
                );
              })}
            </View>
          </View>
        </FormSection>
      </View>

      {/* TRAINER AND TRAINEE ALLOCATION */}
      <FormSection
        icon="people-outline"
        title="Assign Trainer & Trainee Allocation"
      >
        <View
          style={[
            styles.allocationLayout,
            isWideScreen && styles.allocationLayoutWide,
          ]}
        >
          <View
            style={[
              styles.allocationColumn,
              isWideScreen && styles.allocationColumnWide,
            ]}
          >
            <Field label="Select Trainer" required style={styles.fullWidth}>
              <Dropdown
                value={trainer}
                onValueChange={setTrainer}
                options={TRAINERS.map((item) => item.email)}
                placeholder="Select Trainer"
              />
            </Field>

            {selectedTrainer ? (
              <View style={styles.trainerInfo}>
                <View style={styles.trainerAvatar}>
                  <Ionicons
                    name="person"
                    size={22}
                    color={COLORS.primary}
                  />
                </View>

                <View style={styles.trainerInfoText}>
                  <Text style={styles.trainerName}>
                    {selectedTrainer.name}
                  </Text>
                  <Text style={styles.trainerEmail}>
                    {selectedTrainer.email}
                  </Text>
                  <Text style={styles.trainerMeta}>
                    Experience: {selectedTrainer.experience}
                  </Text>
                </View>

                <Text style={styles.assignedLabel}>
                  {selectedTrainer.batches} Batches
                </Text>
              </View>
            ) : null}
          </View>

          <View
            style={[
              styles.allocationColumn,
              isWideScreen && styles.allocationColumnWide,
            ]}
          >
            <Text style={styles.subSectionTitle}>Select Trainee</Text>

            <View style={styles.searchBox}>
              <Ionicons
                name="search-outline"
                size={18}
                color="#777777"
              />
              <TextInput
                style={styles.searchInput}
                placeholder="Search Trainee"
                placeholderTextColor="#888888"
                value={traineeSearch}
                onChangeText={setTraineeSearch}
              />
            </View>

            <View style={styles.traineeList}>
              {filteredTrainees.map((name) => {
                const checked = selectedTrainees.includes(name);

                return (
                  <Pressable
                    key={name}
                    style={styles.traineeRow}
                    onPress={() => toggleTrainee(name)}
                  >
                    <CheckBox checked={checked} />
                    <Text style={styles.traineeName}>{name}</Text>
                  </Pressable>
                );
              })}

              {filteredTrainees.length === 0 ? (
                <Text style={styles.noResults}>No trainees found</Text>
              ) : null}
            </View>

            <Text style={styles.selectedCount}>
              Selected Trainees: {selectedTrainees.length}
            </Text>

            <View style={styles.selectedChips}>
              {selectedTrainees.map((name) => (
                <Pressable
                  key={name}
                  style={styles.chip}
                  onPress={() => toggleTrainee(name)}
                >
                  <Text style={styles.chipText}>{name}</Text>
                  <Ionicons name="close" size={13} color="#666666" />
                </Pressable>
              ))}
            </View>
          </View>
        </View>
      </FormSection>

      {/* SEND EMAIL */}
      <FormSection icon="mail-outline" title="Send Email">
        <Pressable
          style={styles.emailToggle}
          onPress={() => setSendEmail((current) => !current)}
        >
          <CheckBox checked={sendEmail} />

          <View style={styles.emailToggleText}>
            <Text style={styles.emailTitle}>Send Email</Text>
            <Text style={styles.helperText}>
              Trainer will receive an email notification
            </Text>
          </View>
        </Pressable>

        {sendEmail ? (
          <View style={styles.emailFields}>
            <Field label="From" style={styles.fullWidth}>
              <Input value={ADMIN_EMAIL} editable={false} />
            </Field>

            <Field label="To" style={styles.fullWidth}>
              <Input
                value={emailTo}
                onChangeText={setEmailTo}
                placeholder={trainer || "Enter Recipient name or email"}
                keyboardType="email-address"
              />
            </Field>

            <Field label="Subject" style={styles.fullWidth}>
              <Input
                value={emailSubject}
                onChangeText={setEmailSubject}
                placeholder="New Batch Assigned"
              />
            </Field>

            <Field label="Preview" style={styles.fullWidth}>
              <Input
                value={emailPreview}
                onChangeText={setEmailPreview}
                placeholder={defaultEmailPreview}
                multiline
                numberOfLines={5}
                style={styles.emailPreviewInput}
              />
            </Field>

            <View style={styles.emailBottom}>
              <View style={styles.selectedEmailTrainees}>
                <Text style={styles.helperText}>Trainees:</Text>

                {selectedTrainees.length ? (
                  selectedTrainees.map((name) => (
                    <Text key={name} style={styles.emailChip}>
                      {name}
                    </Text>
                  ))
                ) : (
                  <Text style={styles.helperText}>
                    No trainees selected
                  </Text>
                )}
              </View>

              <View style={styles.attachmentRow}>
                <Pressable
                  style={styles.attachButton}
                  onPress={pickAttachment}
                >
                  <Ionicons
                    name="attach-outline"
                    size={17}
                    color={COLORS.text}
                  />
                  <Text style={styles.attachText}>Attach File</Text>
                </Pressable>

                {attachment ? (
                  <View style={styles.attachmentInfo}>
                    <Text
                      style={styles.attachmentName}
                      numberOfLines={1}
                    >
                      {attachment.fileName ||
                        attachment.uri?.split("/").pop() ||
                        "Attached image"}
                    </Text>

                    <Pressable onPress={() => setAttachment(null)}>
                      <Ionicons
                        name="close-circle"
                        size={18}
                        color="#777777"
                      />
                    </Pressable>
                  </View>
                ) : null}
              </View>
            </View>
          </View>
        ) : null}
      </FormSection>

      {/* BATCH STATUS */}
      <FormSection icon="settings-outline" title="Batch Status">
        <Field label="Status" style={styles.fullWidth}>
          <Dropdown
            value={status}
            onValueChange={setStatus}
            options={["Upcoming", "Active", "Completed"]}
            placeholder="Select Status"
          />
        </Field>
      </FormSection>

      {/* ACTIONS */}
      <View
        style={[
          styles.footerActions,
          isMobile && styles.footerActionsMobile,
        ]}
      >
        <Pressable
          style={[styles.actionButton, styles.outlineButton]}
          onPress={resetForm}
        >
          <Ionicons
            name="refresh-outline"
            size={17}
            color={COLORS.text}
          />
          <Text style={styles.outlineButtonText}>Reset</Text>
        </Pressable>

        <Pressable
          style={[styles.actionButton, styles.outlineButton]}
          onPress={onBack}
        >
          <Text style={styles.outlineButtonText}>Back</Text>
        </Pressable>

        <Pressable
            style={[styles.actionButton, styles.primaryButton]}
            onPress={handleCreate}
            >
            <Ionicons
                name={isEdit ? "save-outline" : "add"}
                size={18}
                color="#FFFFFF"
            />
            <Text style={styles.primaryButtonText}>
                {isEdit ? "Save Changes" : "Create Batch"}
            </Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    minWidth: 0,
    backgroundColor: COLORS.background,
  },

  content: {
    width: "100%",
    alignSelf: "stretch",
    flexGrow: 1,
    padding: 16,
    paddingBottom: 30,
    gap: 14,
  },

  pageHeading: {
    width: "100%",
    marginBottom: 2,
  },

  pageTitle: {
    fontSize: 22,
    lineHeight: 29,
    fontWeight: "700",
    color: COLORS.text,
  },

  pageSubtitle: {
    fontSize: 12,
    lineHeight: 18,
    color: COLORS.textSecondary,
    marginTop: 3,
  },

  sectionCard: {
    width: "100%",
    alignSelf: "stretch",
    minWidth: 0,
    backgroundColor: COLORS.surface,
    borderRadius: 11,
    padding: 15,
    gap: 15,
    elevation: 3,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
  },

  sectionTitleRow: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    gap: 9,
    minWidth: 0,
  },

  sectionIcon: {
    width: 25,
    height: 25,
    borderRadius: 5,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },

  sectionTitle: {
    flex: 1,
    minWidth: 0,
    fontSize: 15,
    lineHeight: 20,
    fontWeight: "700",
    color: COLORS.text,
  },

  fieldsWrap: {
    width: "100%",
    minWidth: 0,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "flex-start",
    gap: 12,
  },

  field: {
    minWidth: 0,
    flexShrink: 1,
    gap: 6,
  },

  fullWidth: {
    width: "100%",
    minWidth: 0,
    flexGrow: 0,
    flexShrink: 1,
  },

  fieldLabel: {
    fontSize: 12,
    lineHeight: 17,
    fontWeight: "500",
    color: COLORS.text,
  },

  input: {
    width: "100%",
    minWidth: 0,
    height: 44,
    borderRadius: 5,
    backgroundColor: "#E9E9E9",
    paddingHorizontal: 11,
    paddingVertical: 9,
    color: COLORS.text,
    fontSize: 13,
    borderWidth: 1,
    borderColor: "transparent",
  },

  textArea: {
    height: 112,
    minHeight: 112,
    paddingTop: 11,
    paddingBottom: 11,
  },

  emailPreviewInput: {
    height: 130,
    minHeight: 130,
  },

  readOnlyInput: {
    color: "#666666",
  },

  pickerContainer: {
    width: "100%",
    minWidth: 0,
    height: 46,
    backgroundColor: "#E9E9E9",
    borderRadius: 5,
    justifyContent: "center",
    overflow: "hidden",
  },

  picker: {
    width: "100%",
    height: 46,
    color: COLORS.text,
    fontSize: 13,
  },

  // SCHEDULE AND TIMING
  scheduleLayout: {
    width: "100%",
    minWidth: 0,
    flexDirection: "column",
    gap: 14,
  },

  scheduleLayoutWide: {
    flexDirection: "row",
    flexWrap: "nowrap",
    alignItems: "stretch",
  },

  scheduleCard: {
    width: "100%",
    minWidth: 0,
    flexGrow: 0,
    flexShrink: 1,
  },

  scheduleCardWide: {
    width: "48%",
    maxWidth: "48%",
    flexGrow: 1,
    flexShrink: 1,
  },

  daysBlock: {
    width: "100%",
    minWidth: 0,
    gap: 8,
  },

  daysContainer: {
    width: "100%",
    minWidth: 0,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    gap: 11,
  },

  dayOption: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    minHeight: 28,
  },

  dayText: {
    fontSize: 12,
    color: COLORS.text,
  },

  checkbox: {
    width: 19,
    height: 19,
    borderRadius: 3,
    borderWidth: 1,
    borderColor: "#CCCCCC",
    backgroundColor: "#E5E5E5",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },

  checkboxChecked: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },

  // TRAINER AND TRAINEE ALLOCATION
  allocationLayout: {
    width: "100%",
    minWidth: 0,
    flexDirection: "column",
    gap: 24,
  },

  allocationLayoutWide: {
    flexDirection: "row",
    flexWrap: "nowrap",
    alignItems: "flex-start",
    gap: 20,
  },

  allocationColumn: {
    width: "100%",
    minWidth: 0,
    flexGrow: 0,
    flexShrink: 1,
    gap: 11,
  },

  allocationColumnWide: {
    width: "48%",
    maxWidth: "48%",
    flexBasis: "48%",
    flexGrow: 1,
    flexShrink: 1,
  },

  subSectionTitle: {
    fontSize: 13,
    lineHeight: 18,
    fontWeight: "600",
    color: COLORS.text,
  },

  trainerInfo: {
    width: "100%",
    minWidth: 0,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    borderRadius: 8,
    padding: 10,
    gap: 9,
    borderWidth: 1,
    borderColor: COLORS.border,
  },

  trainerAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#EAE7FF",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },

  trainerInfoText: {
    flex: 1,
    minWidth: 0,
  },

  trainerName: {
    fontSize: 12,
    fontWeight: "700",
    color: COLORS.text,
  },

  trainerEmail: {
    fontSize: 10,
    color: COLORS.textSecondary,
    marginTop: 3,
    flexWrap: "wrap",
  },

  trainerMeta: {
    fontSize: 10,
    color: COLORS.textSecondary,
    marginTop: 3,
  },

  assignedLabel: {
    fontSize: 10,
    color: "#C47A00",
    backgroundColor: "#FFF0D9",
    paddingHorizontal: 7,
    paddingVertical: 6,
    borderRadius: 5,
    flexShrink: 0,
  },

  searchBox: {
    width: "100%",
    minWidth: 0,
    height: 44,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 6,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    gap: 8,
  },

  searchInput: {
    flex: 1,
    minWidth: 0,
    height: 42,
    fontSize: 13,
    color: COLORS.text,
  },

  traineeList: {
    width: "100%",
    minWidth: 0,
    height: 190,
    borderWidth: 1,
    borderColor: "#CCCCCC",
    borderRadius: 7,
    padding: 8,
    overflow: "scroll",
  },

  traineeRow: {
    width: "100%",
    minWidth: 0,
    minHeight: 38,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingHorizontal: 5,
  },

  traineeName: {
    flex: 1,
    minWidth: 0,
    fontSize: 13,
    color: COLORS.text,
  },

  noResults: {
    fontSize: 12,
    color: COLORS.textSecondary,
    padding: 10,
  },

  selectedCount: {
    fontSize: 11,
    color: COLORS.textSecondary,
  },

  selectedChips: {
    width: "100%",
    minWidth: 0,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
  },

  chip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "#EEEEEE",
    borderRadius: 5,
    paddingHorizontal: 8,
    paddingVertical: 5,
  },

  chipText: {
    fontSize: 10,
    color: COLORS.textSecondary,
  },

  // EMAIL
  emailToggle: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  emailToggleText: {
    flex: 1,
    minWidth: 0,
  },

  emailTitle: {
    fontSize: 13,
    fontWeight: "600",
    color: COLORS.text,
  },

  helperText: {
    fontSize: 10,
    lineHeight: 15,
    color: COLORS.textSecondary,
  },

  emailFields: {
    width: "100%",
    alignSelf: "stretch",
    minWidth: 0,
    borderWidth: 1,
    borderColor: "#36B65A",
    borderRadius: 8,
    padding: 12,
    gap: 14,
  },

  emailBottom: {
    width: "100%",
    minWidth: 0,
    marginTop: 2,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#EEEEEE",
    gap: 12,
  },

  selectedEmailTrainees: {
    width: "100%",
    minWidth: 0,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    gap: 6,
  },

  emailChip: {
    fontSize: 10,
    color: COLORS.textSecondary,
    backgroundColor: "#EEEEEE",
    paddingHorizontal: 7,
    paddingVertical: 4,
    borderRadius: 4,
  },

  attachmentRow: {
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    gap: 10,
  },

  attachButton: {
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    borderWidth: 1,
    borderColor: COLORS.secondary,
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 9,
  },

  attachText: {
    fontSize: 11,
    color: COLORS.text,
  },

  attachmentInfo: {
    flex: 1,
    minWidth: 100,
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
  },

  attachmentName: {
    flex: 1,
    minWidth: 0,
    fontSize: 11,
    color: COLORS.success,
  },

  // FOOTER BUTTONS
  footerActions: {
    width: "100%",
    minWidth: 0,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-end",
    alignItems: "center",
    gap: 10,
    paddingTop: 3,
  },

  footerActionsMobile: {
    justifyContent: "flex-start",
  },

  actionButton: {
    minWidth: 100,
    minHeight: 42,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    borderRadius: 6,
    paddingHorizontal: 13,
  },

  outlineButton: {
    borderWidth: 1,
    borderColor: COLORS.secondary,
    backgroundColor: COLORS.surface,
  },

  outlineButtonText: {
    color: COLORS.text,
    fontSize: 12,
    fontWeight: "500",
  },

  primaryButton: {
    backgroundColor: COLORS.secondary,
  },

  primaryButtonText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "600",
  },
});
