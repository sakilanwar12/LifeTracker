/**
 * RoutineItem Component
 * Displays a single routine item with checkbox and details
 * Used in the Routine screen list
 */

import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Routine } from "../types";
import tw from "../utils/tailwind";
import Card from "./Card";

interface RoutineItemProps {
  routine: Routine;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

const RoutineItem: React.FC<RoutineItemProps> = ({
  routine,
  onToggle,
  onDelete,
}) => {
  return (
    <Card>
      <View style={tw`flex-row items-center justify-between`}>
        {/* Left side: Checkbox and routine details */}
        <TouchableOpacity
          onPress={() => onToggle(routine.id)}
          style={tw`flex-row items-center flex-1`}
          activeOpacity={0.7}
        >
          {/* Checkbox */}
          <View
            style={[
              tw`w-6 h-6 rounded border-2 mr-3 items-center justify-center`,
              routine.completed
                ? tw`bg-success border-success`
                : tw`border-gray-400`,
            ]}
          >
            {routine.completed && (
              <Ionicons name="checkmark" size={18} color="white" />
            )}
          </View>

          {/* Routine title and description */}
          <View style={tw`flex-1`}>
            <Text
              style={[
                tw`text-base font-semibold`,
                routine.completed && tw`line-through text-gray-400`,
              ]}
            >
              {routine.title}
            </Text>
            {routine.description && (
              <Text
                style={[
                  tw`text-sm text-gray-600 mt-1`,
                  routine.completed && tw`line-through`,
                ]}
              >
                {routine.description}
              </Text>
            )}
          </View>
        </TouchableOpacity>

        {/* Right side: Delete button */}
        <TouchableOpacity
          onPress={() => onDelete(routine.id)}
          style={tw`p-2 ml-2`}
          activeOpacity={0.7}
        >
          <Ionicons name="trash-outline" size={22} color="#EF4444" />
        </TouchableOpacity>
      </View>
    </Card>
  );
};

export default RoutineItem;

/**
 * Example Usage:
 *
 * <RoutineItem
 *   routine={{
 *     id: '1',
 *     title: 'Morning Workout',
 *     description: '30 min cardio',
 *     completed: false,
 *     createdAt: new Date().toISOString(),
 *   }}
 *   onToggle={(id) => console.log('Toggle', id)}
 *   onDelete={(id) => console.log('Delete', id)}
 * />
 */
