/**
 * Card Component
 * Reusable card container with shadow and padding
 * Used for displaying list items and content blocks
 */

import React from "react";
import { View, ViewStyle } from "react-native";
import tw from "../utils/tailwind";

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

const Card: React.FC<CardProps> = ({ children, style }) => {
  return (
    <View style={[tw`bg-white rounded-lg p-4 mb-3 shadow-md`, style]}>
      {children}
    </View>
  );
};

export default Card;

/**
 * Example Usage:
 *
 * <Card>
 *   <Text>Card Content Here</Text>
 * </Card>
 *
 * <Card style={tw`bg-blue-100`}>
 *   <Text>Custom styled card</Text>
 * </Card>
 */
