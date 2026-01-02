/**
 * Muslim Life Screen
 * Track daily prayers and Islamic habits
 * Data persists in AsyncStorage
 */

import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Card from "../components/Card";
import Header from "../components/Header";
import { MuslimLifeData, Prayer, StorageKeys } from "../types";
import { getData, saveData } from "../utils/storage";
import tw from "../utils/tailwind";

interface MuslimLifeScreenProps {
  onMenuPress: () => void;
}

const MuslimLifeScreen: React.FC<MuslimLifeScreenProps> = ({ onMenuPress }) => {
  const [todayData, setTodayData] = useState<MuslimLifeData>({
    date: new Date().toDateString(),
    prayers: [
      { name: "Fajr", completed: false },
      { name: "Dhuhr", completed: false },
      { name: "Asr", completed: false },
      { name: "Maghrib", completed: false },
      { name: "Isha", completed: false },
    ],
    quranPages: 0,
    dhikr: false,
    sadaqah: false,
    habits: [],
  });

  useEffect(() => {
    loadTodayData();
  }, []);

  useEffect(() => {
    saveTodayData();
  }, [todayData]);

  const loadTodayData = async () => {
    const storedData = await getData<MuslimLifeData[]>(StorageKeys.MUSLIM_LIFE);
    if (storedData) {
      const today = new Date().toDateString();
      const todayRecord = storedData.find((data) => data.date === today);
      if (todayRecord) {
        setTodayData(todayRecord);
      }
    }
  };

  const saveTodayData = async () => {
    const storedData = await getData<MuslimLifeData[]>(StorageKeys.MUSLIM_LIFE);
    const allData = storedData || [];
    const today = new Date().toDateString();

    const updatedData = allData.filter((data) => data.date !== today);
    updatedData.push(todayData);

    await saveData(StorageKeys.MUSLIM_LIFE, updatedData);
  };

  const togglePrayer = (prayerName: Prayer["name"]) => {
    setTodayData({
      ...todayData,
      prayers: todayData.prayers.map((prayer) =>
        prayer.name === prayerName
          ? { ...prayer, completed: !prayer.completed }
          : prayer
      ),
    });
  };

  const updateQuranPages = (value: string) => {
    const pages = parseInt(value) || 0;
    setTodayData({ ...todayData, quranPages: pages });
  };

  const toggleDhikr = () => {
    setTodayData({ ...todayData, dhikr: !todayData.dhikr });
  };

  const toggleSadaqah = () => {
    setTodayData({ ...todayData, sadaqah: !todayData.sadaqah });
  };

  const getPrayersCompleted = () => {
    return todayData.prayers.filter((p) => p.completed).length;
  };

  return (
    <SafeAreaView style={tw`flex-1 bg-light`} edges={["top"]}>
      <Header title="Muslim Life" onMenuPress={onMenuPress} />

      <ScrollView style={tw`flex-1 px-4`} showsVerticalScrollIndicator={false}>
        {/* Daily Summary */}
        <Card style={tw`mt-4 bg-primary`}>
          <View style={tw`items-center`}>
            <Text style={tw`text-white text-lg font-bold mb-2`}>
              Today's Progress
            </Text>
            <View style={tw`flex-row items-center justify-around w-full`}>
              <View style={tw`items-center`}>
                <Text style={tw`text-white text-3xl font-bold`}>
                  {getPrayersCompleted()}/5
                </Text>
                <Text style={tw`text-white text-sm`}>Prayers</Text>
              </View>
              <View style={tw`items-center`}>
                <Text style={tw`text-white text-3xl font-bold`}>
                  {todayData.quranPages || 0}
                </Text>
                <Text style={tw`text-white text-sm`}>Quran Pages</Text>
              </View>
            </View>
          </View>
        </Card>

        {/* Prayers Tracker */}
        <View style={tw`mt-4`}>
          <Text style={tw`text-lg font-bold mb-2`}>Daily Prayers</Text>
          {todayData.prayers.map((prayer) => (
            <Card key={prayer.name}>
              <TouchableOpacity
                onPress={() => togglePrayer(prayer.name)}
                style={tw`flex-row items-center justify-between`}
              >
                <View style={tw`flex-row items-center`}>
                  <View
                    style={[
                      tw`w-6 h-6 rounded border-2 mr-3 items-center justify-center`,
                      prayer.completed
                        ? tw`bg-success border-success`
                        : tw`border-gray-400`,
                    ]}
                  >
                    {prayer.completed && (
                      <Ionicons name="checkmark" size={18} color="white" />
                    )}
                  </View>
                  <Text style={tw`text-base font-semibold`}>{prayer.name}</Text>
                </View>
                <Ionicons
                  name="moon"
                  size={20}
                  color={prayer.completed ? "#10B981" : "#D1D5DB"}
                />
              </TouchableOpacity>
            </Card>
          ))}
        </View>

        {/* Quran Reading */}
        <View style={tw`mt-4`}>
          <Text style={tw`text-lg font-bold mb-2`}>Quran Reading</Text>
          <Card>
            <View style={tw`flex-row items-center justify-between`}>
              <Text style={tw`text-base`}>Pages read today:</Text>
              <TextInput
                style={tw`border border-gray-300 rounded-lg px-3 py-2 w-20 text-center`}
                value={todayData.quranPages?.toString() || "0"}
                onChangeText={updateQuranPages}
                keyboardType="numeric"
              />
            </View>
          </Card>
        </View>

        {/* Other Habits */}
        <View style={tw`mt-4 mb-6`}>
          <Text style={tw`text-lg font-bold mb-2`}>Other Practices</Text>

          <Card>
            <TouchableOpacity
              onPress={toggleDhikr}
              style={tw`flex-row items-center justify-between mb-3`}
            >
              <View style={tw`flex-row items-center`}>
                <View
                  style={[
                    tw`w-6 h-6 rounded border-2 mr-3 items-center justify-center`,
                    todayData.dhikr
                      ? tw`bg-success border-success`
                      : tw`border-gray-400`,
                  ]}
                >
                  {todayData.dhikr && (
                    <Ionicons name="checkmark" size={18} color="white" />
                  )}
                </View>
                <Text style={tw`text-base`}>Dhikr / Remembrance</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={toggleSadaqah}
              style={tw`flex-row items-center justify-between`}
            >
              <View style={tw`flex-row items-center`}>
                <View
                  style={[
                    tw`w-6 h-6 rounded border-2 mr-3 items-center justify-center`,
                    todayData.sadaqah
                      ? tw`bg-success border-success`
                      : tw`border-gray-400`,
                  ]}
                >
                  {todayData.sadaqah && (
                    <Ionicons name="checkmark" size={18} color="white" />
                  )}
                </View>
                <Text style={tw`text-base`}>Sadaqah / Charity</Text>
              </View>
            </TouchableOpacity>
          </Card>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default MuslimLifeScreen;
