/**
 * Home Screen / Dashboard
 * Provides quick access to all features and a daily overview
 */

import { Ionicons } from "@expo/vector-icons";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { useNavigation, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Card from "../../src/components/Card";
import Header from "../../src/components/Header";
import {
  Exercise,
  MuslimLifeData,
  Note,
  Routine,
  StorageKeys,
} from "../../src/types";
import { getData } from "../../src/utils/storage";
import tw from "../../src/utils/tailwind";

export default function HomeDashboard() {
  const router = useRouter();
  const navigation = useNavigation<DrawerNavigationProp<any>>();
  const [stats, setStats] = useState({
    routines: 0,
    exercises: 0,
    notes: 0,
    prayers: 0,
  });

  const onMenuPress = () => navigation.openDrawer();

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    const routines = await getData<Routine[]>(StorageKeys.ROUTINES);
    const exercises = await getData<Exercise[]>(StorageKeys.EXERCISES);
    const notes = await getData<Note[]>(StorageKeys.NOTES);
    const muslimLife = await getData<MuslimLifeData[]>(StorageKeys.MUSLIM_LIFE);

    const today = new Date().toDateString();
    const todayMuslim = muslimLife?.find((d) => d.date === today);
    const prayersDone =
      todayMuslim?.prayers.filter((p) => p.completed).length || 0;

    setStats({
      routines: routines?.length || 0,
      exercises: exercises?.length || 0,
      notes: notes?.length || 0,
      prayers: prayersDone,
    });
  };

  const NavCard = ({ title, icon, count, route, color }: any) => (
    <TouchableOpacity
      onPress={() => router.push(route)}
      style={tw`w-[47%] mb-4`}
    >
      <Card style={tw`items-center py-6 h-40 justify-center`}>
        <View style={tw`bg-${color}-100 p-3 rounded-full mb-3`}>
          <Ionicons
            name={icon}
            size={30}
            color={tw.color(
              color === "primary"
                ? "blue-600"
                : color === "success"
                ? "green-600"
                : "purple-600"
            )}
          />
        </View>
        <Text style={tw`text-lg font-bold`}>{title}</Text>
        <Text style={tw`text-gray-500 text-sm`}>{count} Items</Text>
      </Card>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={tw`flex-1 bg-light`} edges={["top"]}>
      <Header title="LifeTracker" onMenuPress={onMenuPress} />

      <ScrollView style={tw`flex-1 px-4`} showsVerticalScrollIndicator={false}>
        <View style={tw`mt-6 mb-2`}>
          <Text style={tw`text-2xl font-bold`}>Assalamu Alaikum 🙏</Text>
          <Text style={tw`text-gray-600`}>Here is your day at a glance</Text>
        </View>

        <Card style={tw`bg-primary mt-4 mb-6`}>
          <View style={tw`flex-row justify-between items-center`}>
            <View>
              <Text style={tw`text-white text-lg font-semibold`}>
                Today&apos;s Prayers
              </Text>
              <Text style={tw`text-blue-100`}>
                {stats.prayers} of 5 completed
              </Text>
            </View>
            <Ionicons name="moon" size={40} color="white" opacity={0.8} />
          </View>
        </Card>

        <View style={tw`flex-row flex-wrap justify-between`}>
          <NavCard
            title="Routines"
            icon="list"
            count={stats.routines}
            route="/(tabs)/index"
            color="primary"
          />
          <NavCard
            title="Exercise"
            icon="fitness"
            count={stats.exercises}
            route="/(tabs)/exercise"
            color="success"
          />
          <NavCard
            title="Notes"
            icon="journal"
            count={stats.notes}
            route="/(tabs)/notes"
            color="secondary"
          />
          <NavCard
            title="Muslim Life"
            icon="moon"
            count={5}
            route="/(tabs)/muslim-life"
            color="warning"
          />
        </View>

        <View style={tw`mt-4 mb-10`}>
          <Text style={tw`text-xl font-bold mb-3`}>Quick Actions</Text>
          <TouchableOpacity
            onPress={() => router.push("/(tabs)/notes")}
            style={tw`bg-white p-4 rounded-xl flex-row items-center shadow-sm mb-3`}
          >
            <Ionicons name="add-circle" size={24} color="#3B82F6" />
            <Text style={tw`ml-3 text-base font-medium`}>
              Create a new note
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
