/**
 * Button Component
 * Reusable button with consistent styling
 * Supports different variants (primary, secondary, success, danger)
 */

import React from "react";
import {
  ActivityIndicator,
  Text,
  TouchableOpacity,
  ViewStyle,
} from "react-native";
import tw from "../utils/tailwind";

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: "primary" | "secondary" | "success" | "danger";
  loading?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
}

const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = "primary",
  loading = false,
  disabled = false,
  style,
}) => {
  // Determine button background color based on variant
  const getVariantStyle = () => {
    switch (variant) {
      case "primary":
        return tw`bg-primary`;
      case "secondary":
        return tw`bg-secondary`;
      case "success":
        return tw`bg-success`;
      case "danger":
        return tw`bg-danger`;
      default:
        return tw`bg-primary`;
    }
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
      style={[
        tw`py-3 px-6 rounded-lg items-center justify-center`,
        getVariantStyle(),
        disabled && tw`opacity-50`,
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color="white" />
      ) : (
        <Text style={tw`text-white font-semibold text-base`}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

export default Button;

/**
 * Example Usage:
 *
 * <Button title="Save" onPress={() => console.log('Save pressed')} />
 *
 * <Button
 *   title="Delete"
 *   onPress={() => console.log('Delete pressed')}
 *   variant="danger"
 * />
 *
 * <Button
 *   title="Loading..."
 *   onPress={() => {}}
 *   loading={true}
 * />
 */
