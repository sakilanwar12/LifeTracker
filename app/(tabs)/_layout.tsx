import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";
import tw from "../../src/utils/tailwind";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#3B82F6",
        tabBarInactiveTintColor: "gray",
        tabBarStyle: tw`bg-white border-t border-gray-200 h-16 pb-2`,
        tabBarLabelStyle: tw`text-xs font-medium`,
      }}
    >
      <Tabs.Screen
        name="dashboard"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <Ionicons size={size} name="home" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          title: "Routine",
          tabBarIcon: ({ color, size }) => (
            <Ionicons size={size} name="list" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="exercise"
        options={{
          title: "Exercise",
          tabBarIcon: ({ color, size }) => (
            <Ionicons size={size} name="fitness" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="notes"
        options={{
          title: "Notes",
          tabBarIcon: ({ color, size }) => (
            <Ionicons size={size} name="journal" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="muslim-life"
        options={{
          title: "Muslim Life",
          tabBarIcon: ({ color, size }) => (
            <Ionicons size={size} name="moon" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
