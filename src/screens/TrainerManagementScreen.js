import React, { useEffect, useMemo, useState } from "react";

import {
  View,
  Text,
  TextInput,
  ScrollView,
  Pressable,
  StyleSheet,
  useWindowDimensions,
  Alert,
  Image,
  Modal,
  Linking,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import * as ImagePicker from "expo-image-picker";
import { COLORS } from "../constants/theme";

const COURSES = [
  "Python Programming",
  "Java Full Stack Development",
  "Software Testing",
  "Data Analytics",
  "UI/UX Design",
  "AI Digital Marketing",
];

const INITIAL_TRAINERS = [
  {
    id: 1,
    name: "Rajesh Kumar",
    officeMail: "rajesh@vetriitsystem.com",
    personalMail: "rajesh@gmail.com",
    phone: "+91 98765 43210",
    gender: "Male",
    courses: ["Python Full Stack"],
    status: "Active",
  },
  {
    id: 2,
    name: "Priya Sharma",
    officeMail: "priya@vetriitsystem.com",
    personalMail: "priya@gmail.com",
    phone: "+91 98765 43211",
    gender: "Female",
    courses: ["Python, Django"],
    status: "Active",
  },
  {
    id: 3,
    name: "Amir",
    officeMail: "amir@vetriitsystem.com",
    personalMail: "amir@gmail.com",
    phone: "+91 98765 43213",
    gender: "Male",
    courses: ["Java, Spring Boot"],
    status: "In-Active",
  },
  {
    id: 4,
    name: "Rithvik",
    officeMail: "rithvik@vetriitsystem.com",
    personalMail: "rithvik@gmail.com",
    phone: "+91 98765 43216",
    gender: "Male",
    courses: ["Data Analytics"],
    status: "Active",
  },
  {
    id: 5,
    name: "Sneha",
    officeMail: "sneha@vetriitsystem.com",
    personalMail: "sneha@gmail.com",
    phone: "+91 98765 43219",
    gender: "Female",
    courses: ["UI/UX Design"],
    status: "Active",
  },
  {
    id: 6,
    name: "Vikram",
    officeMail: "vikram@vetriitsystem.com",
    personalMail: "vikram@gmail.com",
    phone: "+91 98765 43214",
    gender: "Male",
    courses: ["Python Full Stack"],
    status: "Active",
  },
];

const EMPTY_FORM = {
  name: "",
  officeMail: "",
  password: "",
  personalMail: "",
  phone: "",
  gender: "",
  status: "Active",
  course: "",
  course1: "",
  course2: "",
  course3: "",
};

export default function TrainerManagementScreen() {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;

  const [trainers, setTrainers] = useState(INITIAL_TRAINERS);
  const [screen, setScreen] = useState("list");
  const [search, setSearch] = useState("");
  const [form, setForm] = useState(EMPTY_FORM);
  const [profileImage, setProfileImage] = useState(null);
  const [editingTrainerId, setEditingTrainerId] = useState(null);
  const [selectedTrainer, setSelectedTrainer] = useState(null);
  const [deleteTrainer, setDeleteTrainer] = useState(null);
  const [toast, setToast] = useState({visible: false, message: "", type: "success",});

  const filteredTrainers = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) return trainers;

    return trainers.filter((trainer) =>
      [
        trainer.name,
        trainer.officeMail,
        trainer.personalMail,
        trainer.phone,
        trainer.courses.join(" "),
        trainer.status,
      ]
        .join(" ")
        .toLowerCase()
        .includes(query)
    );
  }, [search, trainers]);

  const updateField = (field, value) => {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));
  };
  const showToast = (message, type = "success") => {
  setToast({
    visible: true,
    message,
    type,
  });
};

useEffect(() => {
  if (!toast.visible) return;

  const timer = setTimeout(() => {
    setToast((previous) => ({
        ...previous,
        visible: false,
        }));
    }, 3000);

    return () => clearTimeout(timer);
  }, [toast.visible, toast.message]);
  const openAddForm = () => {
    setForm(EMPTY_FORM);
    setProfileImage(null);
    setScreen("add");
  };
  const confirmDeleteTrainer = (trainer) => {
  setDeleteTrainer(trainer);
};

const handleDeleteTrainer = () => {
  if (!deleteTrainer) return;

  const trainerName = deleteTrainer.name;

  setTrainers((previous) =>
    previous.filter((item) => item.id !== deleteTrainer.id)
  );

  setDeleteTrainer(null);

  showToast(`${trainerName} Deleted Successfully`, "error");
};

  const chooseProfileImage = async () => {
    const permission =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      Alert.alert(
        "Permission required",
        "Please allow photo library access to upload a profile image."
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  const createTrainer = () => {
    if (
      !form.name.trim() ||
      !form.officeMail.trim() ||
      !form.password.trim() ||
      !form.phone.trim() ||
      !form.gender ||
      !form.course
    ) {
      Alert.alert("Required fields", "Please fill all required fields.");
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(form.officeMail.trim())) {
      Alert.alert("Invalid email", "Please enter a valid office email.");
      return;
    }

    if (
      form.personalMail.trim() &&
      !emailPattern.test(form.personalMail.trim())
    ) {
      Alert.alert("Invalid email", "Please enter a valid personal email.");
      return;
    }

    if (!/^[0-9+\-\s]{10,18}$/.test(form.phone.trim())) {
      Alert.alert("Invalid phone", "Please enter a valid phone number.");
      return;
    }

    const newTrainer = {
      id: Date.now(),
      name: form.name.trim(),
      officeMail: form.officeMail.trim(),
      personalMail: form.personalMail.trim() || "-",
      phone: form.phone.trim(),
      gender: form.gender,
      courses: [form.course],
      status: "Active",
      profileImage,
    };

    setTrainers((previous) => [...previous, newTrainer]);
    setScreen("list");
    setSearch("");

    showToast("New Trainer Added Successfully", "success");
  };

  const cancelForm = () => {
    setScreen("list");
    setForm(EMPTY_FORM);
    setProfileImage(null);
  };

  const renderField = (
    label,
    placeholder,
    field,
    options = {}
  ) => (
    <View style={[styles.field, isMobile && styles.mobileField]}>
      <Text style={styles.fieldLabel}>
        {label}
        {options.required ? "*" : ""}
      </Text>

      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="#777777"
        value={form[field]}
        onChangeText={(value) => updateField(field, value)}
        secureTextEntry={options.secure || false}
        keyboardType={options.keyboardType || "default"}
        autoCapitalize={options.autoCapitalize || "none"}
      />
    </View>
  );
  const openViewTrainer = (trainer) => {
    setSelectedTrainer(trainer);
    setScreen("view");
    };
  const openEditForm = (trainer) => {
  const normalizeCourse = (course) => {
    if (COURSES.includes(course)) return course;

    if (course?.toLowerCase().includes("python")) {
      return "Python Programming";
    }

    if (course?.toLowerCase().includes("java")) {
      return "Java Full Stack Development";
    }

    return COURSES.includes(course) ? course : "";
  };

  const selectedCourses = trainer.courses || [];

  setEditingTrainerId(trainer.id);

  setForm({
    name: trainer.name,
    officeMail: trainer.officeMail,
    password: "",
    personalMail:
      trainer.personalMail === "-" ? "" : trainer.personalMail,
    phone: trainer.phone,
    gender: trainer.gender || "",
    status: trainer.status || "Active",
    course1: normalizeCourse(selectedCourses[0]),
    course2: normalizeCourse(selectedCourses[1]),
    course3: normalizeCourse(selectedCourses[2]),
  });

  setProfileImage(trainer.profileImage || null);
  setScreen("edit");
};

const saveTrainerChanges = () => {
  if (
    !form.name.trim() ||
    !form.officeMail.trim() ||
    !form.phone.trim() ||
    !form.gender ||
    !form.status ||
    !form.course1
  ) {
    Alert.alert(
      "Required fields",
      "Please fill all required fields."
    );
    return;
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailPattern.test(form.officeMail.trim())) {
    Alert.alert("Invalid email", "Please enter a valid office email.");
    return;
  }

  if (
    form.personalMail.trim() &&
    !emailPattern.test(form.personalMail.trim())
  ) {
    Alert.alert("Invalid email", "Please enter a valid personal email.");
    return;
  }

  if (!/^[0-9+\-\s]{10,18}$/.test(form.phone.trim())) {
    Alert.alert("Invalid phone", "Please enter a valid phone number.");
    return;
  }

  const updatedCourses = [
    form.course1,
    form.course2,
    form.course3,
  ].filter(Boolean);

  setTrainers((previous) =>
    previous.map((trainer) =>
      trainer.id === editingTrainerId
        ? {
            ...trainer,
            name: form.name.trim(),
            officeMail: form.officeMail.trim(),
            personalMail: form.personalMail.trim() || "-",
            phone: form.phone.trim(),
            gender: form.gender,
            status: form.status,
            courses: updatedCourses,
            profileImage,
          }
        : trainer
    )
  );

  setScreen("list");
  setEditingTrainerId(null);
  setForm(EMPTY_FORM);
  setProfileImage(null);

  showToast("Changes Saved Successfully", "success");
};
  const renderPicker = (label, field, items, placeholder) => (
    <View style={[styles.field, isMobile && styles.mobileField]}>
      <Text style={styles.fieldLabel}>{label}*</Text>

      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={form[field]}
          onValueChange={(value) => updateField(field, value)}
          style={styles.picker}
        >
          <Picker.Item label={placeholder} value="" />
          {items.map((item) => (
            <Picker.Item key={item} label={item} value={item} />
          ))}
        </Picker>
      </View>
    </View>
  );

  if (screen === "add") {
    return (
      <ScrollView
        style={styles.page}
        contentContainerStyle={styles.formPage}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.formCard}>
          <Text style={styles.formTitle}>Add New Trainer</Text>

          <View style={styles.formGrid}>
            {renderField("Full Name", "Full Name", "name", {
              required: true,
              autoCapitalize: "words",
            })}

            {renderField(
              "Office Mail",
              "Enter office email",
              "officeMail",
              { required: true }
            )}

            {renderField(
              "Password",
              "Enter phone number",
              "password",
              { required: true, secure: true }
            )}

            {renderField(
              "Personal Mail",
              "Enter Personal Mail",
              "personalMail",
              { keyboardType: "email-address" }
            )}

            {renderField(
              "Phone No",
              "Enter phone number",
              "phone",
              { required: true, keyboardType: "phone-pad" }
            )}

            {renderPicker(
              "Gender",
              "gender",
              ["Female", "Male"],
              "Select"
            )}

            {renderPicker(
              "Course",
              "course",
              COURSES,
              "Select Course"
            )}
          </View>

          <View style={styles.uploadSection}>
            <Pressable
              style={styles.imageBox}
              onPress={chooseProfileImage}
            >
              {profileImage ? (
                <Image
                  source={{ uri: profileImage }}
                  style={styles.profilePreview}
                />
              ) : (
                <Ionicons
                  name="image-outline"
                  size={42}
                  color={COLORS.primary}
                />
              )}
            </Pressable>

            <View style={styles.uploadInfo}>
              <Text style={styles.uploadTitle}>Add Profile Image</Text>
              <Text style={styles.uploadHint}>File size: max 50mb</Text>

              <Pressable
                style={styles.uploadButton}
                onPress={chooseProfileImage}
              >
                <Ionicons name="add" size={25} color="#FFFFFF" />
                <Text style={styles.uploadButtonText}>Upload</Text>
              </Pressable>
            </View>
          </View>

          <View style={styles.formActions}>
            <Pressable
              style={styles.cancelButton}
              onPress={cancelForm}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </Pressable>

            <Pressable
              style={styles.primaryButton}
              onPress={createTrainer}
            >
              <Text style={styles.primaryButtonText}>
                Create Trainer
              </Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    );
  }

  if (screen === "edit") {
  return (
    <ScrollView
      style={styles.page}
      contentContainerStyle={styles.formPage}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.formCard}>
        <Text style={styles.formTitle}>Edit Trainer</Text>

        <View style={styles.formGrid}>
          {renderField("Full Name", "Full Name", "name", {
            required: true,
            autoCapitalize: "words",
          })}

          {renderField(
            "Office Mail",
            "Enter office email",
            "officeMail",
            { required: true }
          )}

          {renderField(
            "Personal Mail",
            "Enter Personal Mail",
            "personalMail",
            { keyboardType: "email-address" }
          )}

          {renderField(
            "Phone No",
            "Enter phone number",
            "phone",
            { required: true, keyboardType: "phone-pad" }
          )}

          {renderPicker(
            "Gender",
            "gender",
            ["Male", "Female"],
            "Select"
          )}

          {renderPicker(
            "Status",
            "status",
            ["Active", "In-Active"],
            "Select Status"
          )}

          {renderPicker(
            "Course 1",
            "course1",
            COURSES,
            "Select Course"
          )}

          {renderPicker(
            "Course 2",
            "course2",
            COURSES,
            "Select Course"
          )}

          {renderPicker(
            "Course 3",
            "course3",
            COURSES,
            "Select Course"
          )}
        </View>

        <View style={styles.uploadSection}>
          <Pressable
            style={styles.imageBox}
            onPress={chooseProfileImage}
          >
            {profileImage ? (
              <Image
                source={{ uri: profileImage }}
                style={styles.profilePreview}
              />
            ) : (
              <Ionicons
                name="image-outline"
                size={42}
                color={COLORS.primary}
              />
            )}
          </Pressable>

          <View style={styles.uploadInfo}>
            <Text style={styles.uploadTitle}>Add Profile Image</Text>
            <Text style={styles.uploadHint}>
              File size: max 50mb
            </Text>

            <Pressable
              style={styles.uploadButton}
              onPress={chooseProfileImage}
            >
              <Ionicons name="add" size={25} color="#FFFFFF" />
              <Text style={styles.uploadButtonText}>Upload</Text>
            </Pressable>
          </View>
        </View>

        <View style={styles.formActions}>
          <Pressable
            style={styles.cancelButton}
            onPress={cancelForm}
          >
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </Pressable>

          <Pressable
            style={styles.primaryButton}
            onPress={saveTrainerChanges}
          >
            <Text style={styles.primaryButtonText}>
              Save Changes
            </Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
}
if (screen === "view" && selectedTrainer) {
  const trainer = selectedTrainer;

  const details = [
    ["Full Name", trainer.name],
    ["Office Mail", trainer.officeMail],
    ["Personal Mail", trainer.personalMail],
    ["Phone Number", trainer.phone],
    ["Gender", trainer.gender || "-"],
    ["Status", trainer.status],
    ["Course", trainer.courses?.join(", ") || "-"],
  ];

  return (
    <ScrollView
      style={styles.page}
      contentContainerStyle={styles.viewPage}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.viewCard}>
        <View style={styles.viewHeader}>
          <Text style={styles.viewTitle}>Trainer Details</Text>

          <Pressable
            style={styles.closeButton}
            onPress={() => {
              setSelectedTrainer(null);
              setScreen("list");
            }}
          >
            <Ionicons name="close" size={24} color="#555555" />
          </Pressable>
        </View>

        <View style={styles.profileSection}>
          <View style={styles.viewImageBox}>
            {trainer.profileImage ? (
              <Image
                source={{ uri: trainer.profileImage }}
                style={styles.viewProfileImage}
              />
            ) : (
              <Ionicons
                name="person"
                size={55}
                color={COLORS.primary}
              />
            )}
          </View>

          <Text style={styles.viewTrainerName}>
            {trainer.name}
          </Text>

          <View
            style={[
              styles.statusBadge,
              trainer.status === "Active"
                ? styles.activeBadge
                : styles.inactiveBadge,
            ]}
          >
            <Text
              style={[
                styles.statusText,
                trainer.status === "Active"
                  ? styles.activeText
                  : styles.inactiveText,
              ]}
            >
              {trainer.status}
            </Text>
          </View>
        </View>

        <View style={styles.detailsGrid}>
          {details.map(([label, value]) => (
            <View key={label} style={styles.detailItem}>
              <Text style={styles.detailLabel}>{label}</Text>
              <Text style={styles.detailValue}>{value || "-"}</Text>
            </View>
          ))}
        </View>

        <View style={styles.viewActions}>
          <Pressable
            style={styles.cancelButton}
            onPress={() => {
              setSelectedTrainer(null);
              setScreen("list");
            }}
          >
            <Text style={styles.cancelButtonText}>
              Back to List
            </Text>
          </Pressable>

          <Pressable
            style={styles.primaryButton}
            onPress={() => openEditForm(trainer)}
          >
            <Ionicons
              name="create-outline"
              size={20}
              color="#FFFFFF"
            />
            <Text style={styles.primaryButtonText}>
              Edit Trainer
            </Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
}
  return (
    <>
    <ScrollView
      style={styles.page}
      contentContainerStyle={styles.listPage}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.pageHeading}>
        <Text style={styles.pageSubtitle}>
          Manage and monitor all trainers
        </Text>

        <Pressable
          style={styles.addButton}
          onPress={openAddForm}
        >
          <Ionicons name="add" size={25} color="#FFFFFF" />
          <Text style={styles.addButtonText}>Add Trainer</Text>
        </Pressable>
      </View>

      <View style={styles.tableCard}>
        <View style={styles.tableHeader}>
          <Text style={styles.tableTitle}>All Trainers</Text>

          <View style={styles.searchBox}>
            <Ionicons
              name="search-outline"
              size={23}
              color="#777777"
            />
            <TextInput
              style={styles.searchInput}
              placeholder="Search trainer"
              placeholderTextColor="#777777"
              value={search}
              onChangeText={setSearch}
            />
          </View>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator>
          <View style={styles.table}>
            <View style={styles.tableRow}>
              {[
                ["Name", 180],
                ["Office Mail", 280],
                ["Personal Mail", 215],
                ["Phone", 210],
                ["Course", 185],
                ["Status", 145],
                ["Action", 150],
              ].map(([heading, cellWidth]) => (
                <View
                  key={heading}
                  style={[styles.tableCell, { width: cellWidth }]}
                >
                  <Text style={styles.columnHeading}>{heading}</Text>
                </View>
              ))}
            </View>

            {filteredTrainers.map((trainer) => (
              <View key={trainer.id} style={styles.tableRow}>
                <View style={[styles.tableCell, { width: 180 }]}>
                  <Text style={styles.cellText}>{trainer.name}</Text>
                </View>

                <View style={[styles.tableCell, { width: 280 }]}>
                  <Text style={styles.cellText}>{trainer.officeMail}</Text>
                </View>

                <View style={[styles.tableCell, { width: 215 }]}>
                  <Text style={styles.cellText}>
                    {trainer.personalMail}
                  </Text>
                </View>

                <View style={[styles.tableCell, { width: 210 }]}>
                  <Text style={styles.cellText}>{trainer.phone}</Text>
                </View>

                <View style={[styles.tableCell, { width: 185 }]}>
                  <Text style={styles.cellText}>
                    {trainer.courses.join(", ")}
                  </Text>
                </View>

                <View style={[styles.tableCell, { width: 145 }]}>
                  <View
                    style={[
                      styles.statusBadge,
                      trainer.status === "Active"
                        ? styles.activeBadge
                        : styles.inactiveBadge,
                    ]}
                  >
                    <Text
                      style={[
                        styles.statusText,
                        trainer.status === "Active"
                          ? styles.activeText
                          : styles.inactiveText,
                      ]}
                    >
                      {trainer.status}
                    </Text>
                  </View>
                </View>

                <View style={[styles.tableCell, styles.actionCell, { width: 150 }]}>
                  <Pressable onPress={() => openViewTrainer(trainer)}>
                    <Ionicons
                        name="eye-outline"
                        size={21}
                        color="#666666"
                    />
                  </Pressable>
                  <Pressable onPress={() => openEditForm(trainer)}>
                    <Ionicons
                        name="create-outline"
                        size={21}
                        color="#666666"
                    />
                  </Pressable>
                  <Pressable
                    onPress={async () => {
                        const email = trainer.officeMail?.trim();

                        if (!email) {
                        Alert.alert(
                            "Email Not Available",
                            "Trainer email address is missing."
                        );
                        return;
                        }

                        const gmailUrl =
                        `https://mail.google.com/mail/u/0/?view=cm&fs=1&to=${encodeURIComponent(email)}`;

                        try {
                        await Linking.openURL(gmailUrl);
                        } catch (error) {
                        Alert.alert("Error", "Unable to open Gmail.");
                        console.log("Gmail Error:", error);
                        }
                    }}
                    >
                    <Ionicons name="mail-outline" size={21} color="#3E307F" />
                    </Pressable>
                 <Pressable onPress={() => confirmDeleteTrainer(trainer)}>
                    <Ionicons name="trash-outline" size={20} color="#E53935" />
                </Pressable>
                </View>
              </View>
            ))}

            {filteredTrainers.length === 0 && (
              <View style={styles.emptyState}>
                <Text style={styles.emptyText}>No trainers found</Text>
              </View>
            )}
          </View>
        </ScrollView>
      </View>
    </ScrollView>
    {/* DELETE CONFIRMATION MODAL */}
<Modal
  visible={!!deleteTrainer}
  transparent
  animationType="fade"
  onRequestClose={() => setDeleteTrainer(null)}
>
  <View style={styles.modalOverlay}>
    <View style={styles.confirmCard}>
      <View style={styles.deleteIconCircle}>
        <Ionicons
          name="trash-outline"
          size={30}
          color="#E53935"
        />
      </View>

      <Text style={styles.confirmTitle}>Delete Trainer?</Text>

      <Text style={styles.confirmMessage}>
        Are you sure you want to delete{" "}
        {deleteTrainer?.name}?
        {"\n"}This action cannot be undone.
      </Text>

      <View style={styles.confirmActions}>
        <Pressable
          style={styles.confirmCancel}
          onPress={() => setDeleteTrainer(null)}
        >
          <Text style={styles.confirmCancelText}>Cancel</Text>
        </Pressable>

        <Pressable
          style={styles.confirmDelete}
          onPress={handleDeleteTrainer}
        >
          <Text style={styles.confirmDeleteText}>Delete</Text>
        </Pressable>
      </View>
    </View>
  </View>
</Modal>

{/* TOAST NOTIFICATION */}
{toast.visible && (
  <View
    style={[
      styles.toastContainer,
      toast.type === "success"
        ? styles.successToast
        : styles.errorToast,
    ]}
  >
    <Ionicons
      name={
        toast.type === "success"
          ? "checkmark-circle"
          : "alert-circle"
      }
      size={23}
      color="#FFFFFF"
    />

    <Text style={styles.toastText}>{toast.message}</Text>

    <Pressable
      onPress={() =>
        setToast((previous) => ({
          ...previous,
          visible: false,
        }))
      }
    >
      <Ionicons name="close" size={20} color="#FFFFFF" />
    </Pressable>
  </View>
)}
  </>
);
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  listPage: {
    padding: 20,
    paddingBottom: 30,
  },
  pageHeading: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: 15,
    marginBottom: 32,
  },
  pageSubtitle: {
    fontSize: 22,
    fontWeight: "600",
    color: COLORS.text,
  },
  addButton: {
    minHeight: 55,
    paddingHorizontal: 25,
    borderRadius: 10,
    backgroundColor: COLORS.secondary,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
  },
  addButtonText: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "500",
  },
  tableCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    padding: 20,
    elevation: 6,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.13,
    shadowRadius: 10,
  },
  tableHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 18,
    marginBottom: 15,
  },
  tableTitle: {
    fontSize: 21,
    fontWeight: "600",
    color: "#111111",
  },
  searchBox: {
    width: 350,
    maxWidth: "100%",
    height: 55,
    borderRadius: 8,
    backgroundColor: "#E7E7E7",
    paddingHorizontal: 15,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  searchInput: {
    flex: 1,
    minWidth: 0,
    fontSize: 16,
    color: COLORS.text,
    outlineStyle: "none",
  },
  table: {
    minWidth: 1285,
  },
  tableRow: {
    flexDirection: "row",
    alignItems: "center",
    minHeight: 72,
  },
  tableCell: {
    paddingHorizontal: 8,
    justifyContent: "center",
  },
  columnHeading: {
    fontSize: 17,
    color: "#777777",
    fontWeight: "500",
  },
  cellText: {
    fontSize: 15,
    color: "#333333",
  },
  statusBadge: {
    alignSelf: "flex-start",
    minWidth: 95,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  activeBadge: {
    backgroundColor: "#C9FFD1",
  },
  inactiveBadge: {
    backgroundColor: "#FFDCDC",
  },
  statusText: {
    fontSize: 14,
  },
  activeText: {
    color: "#079B27",
  },
  inactiveText: {
    color: "#E53935",
  },
  actionCell: {
    flexDirection: "row",
    alignItems: "center",
    gap: 13,
  },
  emptyState: {
    padding: 30,
    alignItems: "center",
  },
  emptyText: {
    color: COLORS.textSecondary,
    fontSize: 16,
  },

  // ADD TRAINER FORM
  formPage: {
    padding: 12,
    paddingBottom: 30,
    },
    formTitle: {
    fontSize: 24,
    fontWeight: "600",
    color: "#111111",
    marginBottom: 25,
    },

    formCard: {
        width: "100%",
        backgroundColor: "#FFFFFF",
        borderRadius: 18,
        padding: 18,
    },

    formGrid: {
        width: "100%",
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 18,
    },

    field: {
        width: "31.5%",
        minWidth: 220,
        flexGrow: 1,
        gap: 10,
    },

    mobileField: {
        width: "100%",
        minWidth: 0,
        flexBasis: "100%",
        flexGrow: 0,
    },
  fieldLabel: {
    fontSize: 18,
    color: "#111111",
    fontWeight: "500",
  },
  input: {
    width: "100%",
    height: 65,
    backgroundColor: "#E7E7E7",
    borderRadius: 8,
    paddingHorizontal: 18,
    fontSize: 16,
    color: "#333333",
    outlineStyle: "none",
  },
  pickerContainer: {
    height: 65,
    backgroundColor: "#E7E7E7",
    borderRadius: 8,
    justifyContent: "center",
    overflow: "hidden",
  },
  picker: {
    width: "100%",
    height: 65,
    color: "#555555",
  },
  uploadSection: {
  flexDirection: "row",
  alignItems: "center",
  flexWrap: "wrap",
  gap: 22,
  marginTop: 35,
},

imageBox: {
  width: 150,
  height: 150,
  borderWidth: 1.5,
  borderStyle: "dashed",
  borderColor: COLORS.primary,
  borderRadius: 8,
  alignItems: "center",
  justifyContent: "center",
  overflow: "hidden",
},
  profilePreview: {
    width: "100%",
    height: "100%",
  },
  uploadInfo: {
    gap: 10,
  },
  uploadTitle: {
    fontSize: 20,
    color: "#333333",
    fontWeight: "500",
  },
  uploadHint: {
    fontSize: 16,
    color: "#777777",
  },
  uploadButton: {
    marginTop: 12,
    width: 180,
    height: 58,
    borderRadius: 10,
    backgroundColor: COLORS.secondary,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
  },
  uploadButtonText: {
    fontSize: 18,
    color: "#FFFFFF",
  },
  formActions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    flexWrap: "wrap",
    gap: 12,
    marginTop: 35,
    },

    cancelButton: {
    flex: 1,
    minWidth: 120,
    height: 55,
    borderWidth: 1.5,
    borderColor: "#888888",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    },

    primaryButton: {
    flex: 1,
    minWidth: 150,
    height: 55,
    borderRadius: 10,
    backgroundColor: COLORS.secondary,
    alignItems: "center",
    justifyContent: "center",
    },
  cancelButtonText: {
    fontSize: 18,
    color: "#666666",
  },
  primaryButtonText: {
    fontSize: 18,
    color: "#FFFFFF",
    fontWeight: "500",
  },
  // VIEW TRAINER

viewPage: {
  padding: 20,
  paddingBottom: 30,
},

viewCard: {
  width: "100%",
  backgroundColor: "#FFFFFF",
  borderRadius: 16,
  padding: 25,
  elevation: 5,
  shadowColor: "#000000",
  shadowOffset: { width: 0, height: 3 },
  shadowOpacity: 0.12,
  shadowRadius: 8,
},

viewHeader: {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  marginBottom: 25,
},

viewTitle: {
  fontSize: 25,
  fontWeight: "600",
  color: "#111111",
},

closeButton: {
  width: 40,
  height: 40,
  borderRadius: 20,
  backgroundColor: "#EEEEEE",
  alignItems: "center",
  justifyContent: "center",
},

profileSection: {
  alignItems: "center",
  gap: 12,
  marginBottom: 35,
},

viewImageBox: {
  width: 110,
  height: 110,
  borderRadius: 55,
  backgroundColor: "#F0EDFF",
  alignItems: "center",
  justifyContent: "center",
  overflow: "hidden",
},

viewProfileImage: {
  width: "100%",
  height: "100%",
},

viewTrainerName: {
  fontSize: 22,
  fontWeight: "600",
  color: "#292929",
},

detailsGrid: {
  flexDirection: "row",
  flexWrap: "wrap",
  gap: 20,
},

detailItem: {
  width: "31%",
  minWidth: 200,
  flexGrow: 1,
  backgroundColor: "#F5F5F5",
  padding: 16,
  borderRadius: 8,
  gap: 8,
},

detailLabel: {
  fontSize: 14,
  color: "#777777",
},

detailValue: {
  fontSize: 16,
  color: "#292929",
  fontWeight: "500",
},

viewActions: {
  flexDirection: "row",
  justifyContent: "flex-end",
  flexWrap: "wrap",
  gap: 15,
  marginTop: 35,
},
// DELETE CONFIRMATION

modalOverlay: {
  flex: 1,
  backgroundColor: "rgba(0,0,0,0.45)",
  justifyContent: "center",
  alignItems: "center",
  padding: 20,
},

confirmCard: {
  width: "100%",
  maxWidth: 430,
  backgroundColor: "#FFFFFF",
  borderRadius: 16,
  padding: 25,
  alignItems: "center",
},

deleteIconCircle: {
  width: 65,
  height: 65,
  borderRadius: 35,
  backgroundColor: "#FFE8E8",
  alignItems: "center",
  justifyContent: "center",
  marginBottom: 18,
},

confirmTitle: {
  fontSize: 22,
  fontWeight: "600",
  color: "#222222",
  marginBottom: 12,
},

confirmMessage: {
  fontSize: 15,
  lineHeight: 23,
  color: "#777777",
  textAlign: "center",
  marginBottom: 25,
},

confirmActions: {
  width: "100%",
  flexDirection: "row",
  gap: 12,
},

confirmCancel: {
  flex: 1,
  height: 48,
  borderWidth: 1,
  borderColor: "#CCCCCC",
  borderRadius: 8,
  alignItems: "center",
  justifyContent: "center",
},

confirmCancelText: {
  color: "#555555",
  fontSize: 15,
  fontWeight: "500",
},

confirmDelete: {
  flex: 1,
  height: 48,
  backgroundColor: "#E53935",
  borderRadius: 8,
  alignItems: "center",
  justifyContent: "center",
},

confirmDeleteText: {
  color: "#FFFFFF",
  fontSize: 15,
  fontWeight: "600",
},

// TOAST

toastContainer: {
  position: "absolute",
  top: 15,
  left: 15,
  right: 15,
  minHeight: 58,
  borderRadius: 9,
  paddingHorizontal: 15,
  paddingVertical: 12,
  flexDirection: "row",
  alignItems: "center",
  gap: 12,
  elevation: 12,
  zIndex: 9999,
},

successToast: {
  backgroundColor: "#20A957",
},

errorToast: {
  backgroundColor: "#D93636",
},

toastText: {
  flex: 1,
  color: "#FFFFFF",
  fontSize: 14,
  fontWeight: "500",
},
});
