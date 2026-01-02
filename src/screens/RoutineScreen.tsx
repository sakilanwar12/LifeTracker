/**
 * Routine Screen
 * Allows users to add, list, and mark routines as done
 * Data persists in AsyncStorage
 */

import React, { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "../components/Button";
import Header from "../components/Header";
import RoutineItem from "../components/RoutineItem";
import { Routine, StorageKeys } from "../types";
import { getData, saveData } from "../utils/storage";
import tw from "../utils/tailwind";

interface RoutineScreenProps {
  onMenuPress: () => void;
}

const RoutineScreen: React.FC<RoutineScreenProps> = ({ onMenuPress }) => {
  const [routines, setRoutines] = useState<Routine[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  // Load routines from storage on mount
  useEffect(() => {
    loadRoutines();
  }, []);

  // Save routines to storage whenever they change
  useEffect(() => {
    if (routines.length > 0) {
      saveRoutines();
    }
  }, [routines]);

  const loadRoutines = async () => {
    const storedRoutines = await getData<Routine[]>(StorageKeys.ROUTINES);
    if (storedRoutines) {
      setRoutines(storedRoutines);
    }
  };

  const saveRoutines = async () => {
    await saveData(StorageKeys.ROUTINES, routines);
  };

  const addRoutine = () => {
    if (!title.trim()) {
      Alert.alert("Error", "Please enter a routine title");
      return;
    }

    const newRoutine: Routine = {
      id: Date.now().toString(),
      title: title.trim(),
      description: description.trim() || undefined,
      completed: false,
      createdAt: new Date().toISOString(),
    };

    setRoutines([newRoutine, ...routines]);
    setTitle("");
    setDescription("");
  };

  const toggleRoutine = (id: string) => {
    setRoutines(
      routines.map((routine) =>
        routine.id === id
          ? { ...routine, completed: !routine.completed }
          : routine
      )
    );
  };

  const deleteRoutine = (id: string) => {
    Alert.alert(
      "Delete Routine",
      "Are you sure you want to delete this routine?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            setRoutines(routines.filter((routine) => routine.id !== id));
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={tw`flex-1 bg-light`} edges={["top"]}>
      <Header title="Routines" onMenuPress={onMenuPress} />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={tw`flex-1`}
      >
        <View style={tw`flex-1 px-4`}>
          {/* Add Routine Form */}
          <View style={tw`bg-white rounded-lg p-4 mt-4 shadow-md`}>
            <Text style={tw`text-lg font-bold mb-3`}>Add New Routine</Text>

            <TextInput
              style={tw`border border-gray-300 rounded-lg px-3 py-2 mb-3`}
              placeholder="Routine title *"
              value={title}
              onChangeText={setTitle}
            />

            <TextInput
              style={tw`border border-gray-300 rounded-lg px-3 py-2 mb-3`}
              placeholder="Description (optional)"
              value={description}
              onChangeText={setDescription}
              multiline
              numberOfLines={2}
            />

            <Button
              title="Add Routine"
              onPress={addRoutine}
              variant="success"
              loading={loading}
            />
          </View>

          {/* Routines List */}
          <View style={tw`mt-4 flex-1`}>
            <Text style={tw`text-lg font-bold mb-2`}>
              My Routines ({routines.length})
            </Text>

            {routines.length === 0 ? (
              <View style={tw`items-center mt-10`}>
                <Text style={tw`text-gray-400 text-center`}>
                  No routines yet. Add your first routine above!
                </Text>
              </View>
            ) : (
              <FlatList
                data={routines}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <RoutineItem
                    routine={item}
                    onToggle={toggleRoutine}
                    onDelete={deleteRoutine}
                  />
                )}
                showsVerticalScrollIndicator={false}
              />
            )}
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default RoutineScreen;
