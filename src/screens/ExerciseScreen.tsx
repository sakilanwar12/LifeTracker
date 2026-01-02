/**
 * Exercise Screen
 * Allows users to add and list exercises
 * Data persists in AsyncStorage
 */

import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "../components/Button";
import Card from "../components/Card";
import Header from "../components/Header";
import { Exercise, StorageKeys } from "../types";
import { getData, saveData } from "../utils/storage";
import tw from "../utils/tailwind";

interface ExerciseScreenProps {
  onMenuPress: () => void;
}

const ExerciseScreen: React.FC<ExerciseScreenProps> = ({ onMenuPress }) => {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [name, setName] = useState("");
  const [sets, setSets] = useState("");
  const [reps, setReps] = useState("");
  const [duration, setDuration] = useState("");

  useEffect(() => {
    loadExercises();
  }, []);

  useEffect(() => {
    if (exercises.length > 0) {
      saveExercises();
    }
  }, [exercises]);

  const loadExercises = async () => {
    const storedExercises = await getData<Exercise[]>(StorageKeys.EXERCISES);
    if (storedExercises) {
      setExercises(storedExercises);
    }
  };

  const saveExercises = async () => {
    await saveData(StorageKeys.EXERCISES, exercises);
  };

  const addExercise = () => {
    if (!name.trim()) {
      Alert.alert("Error", "Please enter exercise name");
      return;
    }

    const newExercise: Exercise = {
      id: Date.now().toString(),
      name: name.trim(),
      sets: sets ? parseInt(sets) : undefined,
      reps: reps ? parseInt(reps) : undefined,
      duration: duration ? parseInt(duration) : undefined,
      createdAt: new Date().toISOString(),
    };

    setExercises([newExercise, ...exercises]);
    setName("");
    setSets("");
    setReps("");
    setDuration("");
  };

  const deleteExercise = (id: string) => {
    Alert.alert(
      "Delete Exercise",
      "Are you sure you want to delete this exercise?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            setExercises(exercises.filter((ex) => ex.id !== id));
          },
        },
      ]
    );
  };

  const renderExercise = ({ item }: { item: Exercise }) => (
    <Card>
      <View style={tw`flex-row items-center justify-between`}>
        <View style={tw`flex-1`}>
          <Text style={tw`text-base font-semibold mb-1`}>{item.name}</Text>
          <View style={tw`flex-row flex-wrap`}>
            {item.sets && (
              <Text style={tw`text-sm text-gray-600 mr-3`}>
                Sets: {item.sets}
              </Text>
            )}
            {item.reps && (
              <Text style={tw`text-sm text-gray-600 mr-3`}>
                Reps: {item.reps}
              </Text>
            )}
            {item.duration && (
              <Text style={tw`text-sm text-gray-600`}>{item.duration} min</Text>
            )}
          </View>
        </View>

        <TouchableOpacity
          onPress={() => deleteExercise(item.id)}
          style={tw`p-2`}
        >
          <Ionicons name="trash-outline" size={22} color="#EF4444" />
        </TouchableOpacity>
      </View>
    </Card>
  );

  return (
    <SafeAreaView style={tw`flex-1 bg-light`} edges={["top"]}>
      <Header title="Exercises" onMenuPress={onMenuPress} />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={tw`flex-1`}
      >
        <View style={tw`flex-1 px-4`}>
          {/* Add Exercise Form */}
          <View style={tw`bg-white rounded-lg p-4 mt-4 shadow-md`}>
            <Text style={tw`text-lg font-bold mb-3`}>Add New Exercise</Text>

            <TextInput
              style={tw`border border-gray-300 rounded-lg px-3 py-2 mb-3`}
              placeholder="Exercise name *"
              value={name}
              onChangeText={setName}
            />

            <View style={tw`flex-row gap-2 mb-3`}>
              <TextInput
                style={tw`border border-gray-300 rounded-lg px-3 py-2 flex-1`}
                placeholder="Sets"
                value={sets}
                onChangeText={setSets}
                keyboardType="numeric"
              />
              <TextInput
                style={tw`border border-gray-300 rounded-lg px-3 py-2 flex-1`}
                placeholder="Reps"
                value={reps}
                onChangeText={setReps}
                keyboardType="numeric"
              />
              <TextInput
                style={tw`border border-gray-300 rounded-lg px-3 py-2 flex-1`}
                placeholder="Min"
                value={duration}
                onChangeText={setDuration}
                keyboardType="numeric"
              />
            </View>

            <Button
              title="Add Exercise"
              onPress={addExercise}
              variant="success"
            />
          </View>

          {/* Exercises List */}
          <View style={tw`mt-4 flex-1`}>
            <Text style={tw`text-lg font-bold mb-2`}>
              My Exercises ({exercises.length})
            </Text>

            {exercises.length === 0 ? (
              <View style={tw`items-center mt-10`}>
                <Text style={tw`text-gray-400 text-center`}>
                  No exercises yet. Add your first exercise above!
                </Text>
              </View>
            ) : (
              <FlatList
                data={exercises}
                keyExtractor={(item) => item.id}
                renderItem={renderExercise}
                showsVerticalScrollIndicator={false}
              />
            )}
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ExerciseScreen;
