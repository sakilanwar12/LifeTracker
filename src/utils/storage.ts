/**
 * AsyncStorage Helper Functions
 * Provides type-safe storage operations for persisting data locally
 */

import AsyncStorage from "@react-native-async-storage/async-storage";

/**
 * Save data to AsyncStorage
 * @param key - Storage key
 * @param value - Data to store (will be JSON stringified)
 * @returns Promise<boolean> - Success status
 */
export const saveData = async <T>(key: string, value: T): Promise<boolean> => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
    return true;
  } catch (error) {
    console.error(`Error saving data for key ${key}:`, error);
    return false;
  }
};

/**
 * Retrieve data from AsyncStorage
 * @param key - Storage key
 * @returns Promise<T | null> - Retrieved data or null if not found
 */
export const getData = async <T>(key: string): Promise<T | null> => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (error) {
    console.error(`Error retrieving data for key ${key}:`, error);
    return null;
  }
};

/**
 * Remove data from AsyncStorage
 * @param key - Storage key
 * @returns Promise<boolean> - Success status
 */
export const removeData = async (key: string): Promise<boolean> => {
  try {
    await AsyncStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error(`Error removing data for key ${key}:`, error);
    return false;
  }
};

/**
 * Clear all data from AsyncStorage
 * @returns Promise<boolean> - Success status
 */
export const clearAllData = async (): Promise<boolean> => {
  try {
    await AsyncStorage.clear();
    return true;
  } catch (error) {
    console.error("Error clearing all data:", error);
    return false;
  }
};

/**
 * Get all storage keys
 * @returns Promise<string[]> - Array of all keys
 */
export const getAllKeys = async (): Promise<string[]> => {
  try {
    const keys = await AsyncStorage.getAllKeys();
    return keys;
  } catch (error) {
    console.error("Error getting all keys:", error);
    return [];
  }
};
