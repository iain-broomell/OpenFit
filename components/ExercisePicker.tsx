import { View, Text, StyleSheet, Modal, TextInput, SectionList, Pressable } from "react-native";
import { useState, useMemo } from "react";
import { Ionicons } from "@expo/vector-icons";

// This would typically come from your backend/database
const PRESET_EXERCISES = [
  {
    category: "Chest",
    data: [
      { id: "bench-press", name: "Bench Press" },
      { id: "incline-press", name: "Incline Press" },
      { id: "dumbbell-press", name: "Dumbbell Press" },
      { id: "chest-fly", name: "Chest Fly" },
    ]
  },
  {
    category: "Back",
    data: [
      { id: "deadlift", name: "Deadlift" },
      { id: "barbell-row", name: "Barbell Row" },
      { id: "pull-up", name: "Pull Up" },
      { id: "lat-pulldown", name: "Lat Pulldown" },
    ]
  },
  {
    category: "Legs",
    data: [
      { id: "squat", name: "Squat" },
      { id: "leg-press", name: "Leg Press" },
      { id: "romanian-deadlift", name: "Romanian Deadlift" },
      { id: "leg-extension", name: "Leg Extension" },
    ]
  },
  {
    category: "Shoulders",
    data: [
      { id: "overhead-press", name: "Overhead Press" },
      { id: "lateral-raise", name: "Lateral Raise" },
      { id: "front-raise", name: "Front Raise" },
      { id: "face-pull", name: "Face Pull" },
    ]
  },
  {
    category: "Arms",
    data: [
      { id: "bicep-curl", name: "Bicep Curl" },
      { id: "tricep-extension", name: "Tricep Extension" },
      { id: "hammer-curl", name: "Hammer Curl" },
      { id: "skull-crusher", name: "Skull Crusher" },
    ]
  },
];

interface Props {
  isVisible: boolean;
  onClose: () => void;
  onSelect: (exerciseName: string) => void;
}

export default function ExercisePicker({ isVisible, onClose, onSelect }: Props) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredSections = useMemo(() => {
    if (!searchQuery) return PRESET_EXERCISES;

    return PRESET_EXERCISES.map(section => ({
      category: section.category,
      data: section.data.filter(exercise =>
        exercise.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    })).filter(section => section.data.length > 0);
  }, [searchQuery]);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Select Exercise</Text>
            <Pressable onPress={onClose} style={styles.closeButton}>
              <Ionicons name="close" size={24} color="#666" />
            </Pressable>
          </View>

          <View style={styles.searchContainer}>
            <Ionicons name="search" size={20} color="#666" />
            <TextInput
              style={styles.searchInput}
              placeholder="Search exercises..."
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholderTextColor="#999"
            />
          </View>

          <SectionList
            sections={filteredSections}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <Pressable 
                style={styles.exerciseItem}
                onPress={() => {
                  onSelect(item.name);
                  onClose();
                }}
              >
                <Text style={styles.exerciseName}>{item.name}</Text>
                <Ionicons name="chevron-forward" size={20} color="#666" />
              </Pressable>
            )}
            renderSectionHeader={({ section: { category } }) => (
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>{category}</Text>
              </View>
            )}
            stickySectionHeadersEnabled={true}
          />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    marginTop: 50,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#333",
  },
  closeButton: {
    padding: 4,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    margin: 16,
    padding: 12,
    borderRadius: 8,
    gap: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#333",
  },
  sectionHeader: {
    backgroundColor: "#f0f0f0",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#666",
  },
  exerciseItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  exerciseName: {
    fontSize: 16,
    color: "#333",
  },
}); 