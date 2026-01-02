/**
 * Header Component
 * Displays app logo on the left and menu button on the right
 * Menu button toggles the sidebar navigation panel
 */

import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import tw from "../utils/tailwind";

interface HeaderProps {
  title: string;
  onMenuPress: () => void;
}

const Header: React.FC<HeaderProps> = ({ title, onMenuPress }) => {
  return (
    <View
      style={tw`bg-primary px-4 py-4 flex-row items-center justify-between shadow-lg`}
    >
      {/* Logo/Title on the left */}
      <View style={tw`flex-row items-center`}>
        <Ionicons name="fitness" size={28} color="white" />
        <Text style={tw`text-white text-xl font-bold ml-2`}>{title}</Text>
      </View>

      {/* Menu button on the right */}
      <TouchableOpacity
        onPress={onMenuPress}
        style={tw`p-2`}
        activeOpacity={0.7}
      >
        <Ionicons name="menu" size={28} color="white" />
      </TouchableOpacity>
    </View>
  );
};

export default Header;

/**
 * Example Usage:
 *
 * <Header
 *   title="LifeTracker"
 *   onMenuPress={() => console.log('Menu pressed')}
 * />
 */
