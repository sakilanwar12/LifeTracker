/**
 * LifeTracker Main Application Entry Point
 * Sets up Bottom Tab Navigation nested within a Drawer (Sidebar) Navigation
 */

import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  createDrawerNavigator,
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import React from "react";
import { Text, View } from "react-native";

// Import Screens
import ExerciseScreen from "./src/screens/ExerciseScreen";
import MuslimLifeScreen from "./src/screens/MuslimLifeScreen";
import NotesScreen from "./src/screens/NotesScreen";
import RoutineScreen from "./src/screens/RoutineScreen";

// Import Types and Utils
import { RootTabParamList } from "./src/types";
import tw from "./src/utils/tailwind";

// Navigation instances
const Tab = createBottomTabNavigator<RootTabParamList>();
const Drawer = createDrawerNavigator();

/**
 * Custom Drawer Content
 * Extends the default drawer to add custom styling or items
 */
function CustomDrawerContent(props: DrawerContentComponentProps) {
  return (
    <DrawerContentScrollView {...props} contentContainerStyle={tw`flex-1`}>
      <View style={tw`px-4 py-8 bg-primary items-center`}>
        <Ionicons name="fitness" size={60} color="white" />
        <Text style={tw`text-white text-2xl font-bold mt-2`}>LifeTracker</Text>
        <Text style={tw`text-blue-100 text-sm`}>Track your life, your way</Text>
      </View>

      <View style={tw`mt-4 flex-1`}>
        <DrawerItemList {...props} />
      </View>

      <View style={tw`p-4 border-t border-gray-200`}>
        <Text style={tw`text-gray-400 text-xs text-center`}>v1.0.0</Text>
      </View>
    </DrawerContentScrollView>
  );
}

/**
 * Bottom Tab Navigator
 * Defines the 4 main app screens
 */
function BottomTabs({ navigation }: any) {
  const onMenuPress = () => navigation.openDrawer();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#3B82F6",
        tabBarInactiveTintColor: "gray",
        tabBarStyle: tw`bg-white border-t border-gray-200 h-16 pb-2`,
        tabBarLabelStyle: tw`text-xs font-medium`,
      }}
    >
      <Tab.Screen
        name="Routine"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="list" size={size} color={color} />
          ),
        }}
      >
        {(props) => <RoutineScreen {...props} onMenuPress={onMenuPress} />}
      </Tab.Screen>
      <Tab.Screen
        name="Exercise"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="fitness" size={size} color={color} />
          ),
        }}
      >
        {(props) => <ExerciseScreen {...props} onMenuPress={onMenuPress} />}
      </Tab.Screen>
      <Tab.Screen
        name="Notes"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="journal" size={size} color={color} />
          ),
        }}
      >
        {(props) => <NotesScreen {...props} onMenuPress={onMenuPress} />}
      </Tab.Screen>
      <Tab.Screen
        name="MuslimLife"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="moon" size={size} color={color} />
          ),
          tabBarLabel: "Muslim Life",
        }}
      >
        {(props) => <MuslimLifeScreen {...props} onMenuPress={onMenuPress} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
}

const SettingsPlaceholder = ({ navigation }: any) => (
  <RoutineScreen onMenuPress={() => navigation.openDrawer()} />
);

/**
 * Main App Component
 */
export default function App() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
        drawerActiveTintColor: "#3B82F6",
        drawerLabelStyle: tw`ml--2 font-semibold`,
      }}
    >
      <Drawer.Screen
        name="MainTabs"
        component={BottomTabs}
        options={{
          drawerLabel: "Home",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />
      {/* We can add more drawer-only screens here later (e.g. Settings, Profile) */}
      <Drawer.Screen
        name="Settings"
        component={SettingsPlaceholder}
        options={{
          drawerLabel: "Settings",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="settings-outline" size={size} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}
