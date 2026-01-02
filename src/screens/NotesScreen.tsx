/**
 * Notes Screen
 * Allows users to add, edit, and delete notes
 * Data persists in AsyncStorage
 */

import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  KeyboardAvoidingView,
  Modal,
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
import { Note, StorageKeys } from "../types";
import { getData, saveData } from "../utils/storage";
import tw from "../utils/tailwind";

interface NotesScreenProps {
  onMenuPress: () => void;
}

const NotesScreen: React.FC<NotesScreenProps> = ({ onMenuPress }) => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    loadNotes();
  }, []);

  useEffect(() => {
    if (notes.length > 0) {
      saveNotes();
    }
  }, [notes]);

  const loadNotes = async () => {
    const storedNotes = await getData<Note[]>(StorageKeys.NOTES);
    if (storedNotes) {
      setNotes(storedNotes);
    }
  };

  const saveNotes = async () => {
    await saveData(StorageKeys.NOTES, notes);
  };

  const addNote = () => {
    if (!title.trim()) {
      Alert.alert("Error", "Please enter a note title");
      return;
    }

    if (editingNote) {
      // Update existing note
      setNotes(
        notes.map((note) =>
          note.id === editingNote.id
            ? {
                ...note,
                title: title.trim(),
                content: content.trim(),
                updatedAt: new Date().toISOString(),
              }
            : note
        )
      );
      setEditingNote(null);
    } else {
      // Add new note
      const newNote: Note = {
        id: Date.now().toString(),
        title: title.trim(),
        content: content.trim(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      setNotes([newNote, ...notes]);
    }

    setTitle("");
    setContent("");
    setModalVisible(false);
  };

  const editNote = (note: Note) => {
    setEditingNote(note);
    setTitle(note.title);
    setContent(note.content);
    setModalVisible(true);
  };

  const deleteNote = (id: string) => {
    Alert.alert("Delete Note", "Are you sure you want to delete this note?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => {
          setNotes(notes.filter((note) => note.id !== id));
        },
      },
    ]);
  };

  const openAddModal = () => {
    setEditingNote(null);
    setTitle("");
    setContent("");
    setModalVisible(true);
  };

  const renderNote = ({ item }: { item: Note }) => (
    <Card>
      <TouchableOpacity onPress={() => editNote(item)}>
        <View style={tw`flex-row items-start justify-between`}>
          <View style={tw`flex-1`}>
            <Text style={tw`text-base font-semibold mb-1`}>{item.title}</Text>
            {item.content && (
              <Text style={tw`text-sm text-gray-600`} numberOfLines={2}>
                {item.content}
              </Text>
            )}
            <Text style={tw`text-xs text-gray-400 mt-2`}>
              {new Date(item.updatedAt).toLocaleDateString()}
            </Text>
          </View>

          <TouchableOpacity onPress={() => deleteNote(item.id)} style={tw`p-2`}>
            <Ionicons name="trash-outline" size={22} color="#EF4444" />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Card>
  );

  return (
    <SafeAreaView style={tw`flex-1 bg-light`} edges={["top"]}>
      <Header title="Notes" onMenuPress={onMenuPress} />

      <View style={tw`flex-1 px-4`}>
        {/* Add Note Button */}
        <View style={tw`mt-4`}>
          <Button
            title="+ Add New Note"
            onPress={openAddModal}
            variant="primary"
          />
        </View>

        {/* Notes List */}
        <View style={tw`mt-4 flex-1`}>
          <Text style={tw`text-lg font-bold mb-2`}>
            My Notes ({notes.length})
          </Text>

          {notes.length === 0 ? (
            <View style={tw`items-center mt-10`}>
              <Text style={tw`text-gray-400 text-center`}>
                No notes yet. Tap the button above to add your first note!
              </Text>
            </View>
          ) : (
            <FlatList
              data={notes}
              keyExtractor={(item) => item.id}
              renderItem={renderNote}
              showsVerticalScrollIndicator={false}
            />
          )}
        </View>
      </View>

      {/* Add/Edit Note Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={tw`flex-1`}
        >
          <View style={tw`flex-1 justify-end bg-black bg-opacity-50`}>
            <View style={tw`bg-white rounded-t-3xl p-6 h-4/5`}>
              <View style={tw`flex-row items-center justify-between mb-4`}>
                <Text style={tw`text-xl font-bold`}>
                  {editingNote ? "Edit Note" : "Add Note"}
                </Text>
                <TouchableOpacity onPress={() => setModalVisible(false)}>
                  <Ionicons name="close" size={28} color="#000" />
                </TouchableOpacity>
              </View>

              <TextInput
                style={tw`border border-gray-300 rounded-lg px-3 py-2 mb-3 text-base`}
                placeholder="Note title *"
                value={title}
                onChangeText={setTitle}
              />

              <TextInput
                style={tw`border border-gray-300 rounded-lg px-3 py-2 mb-4 flex-1 text-base`}
                placeholder="Note content"
                value={content}
                onChangeText={setContent}
                multiline
                textAlignVertical="top"
              />

              <Button
                title={editingNote ? "Update Note" : "Add Note"}
                onPress={addNote}
                variant="success"
              />
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </SafeAreaView>
  );
};

export default NotesScreen;
