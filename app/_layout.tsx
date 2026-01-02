import { Ionicons } from "@expo/vector-icons";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { Drawer } from "expo-router/drawer";
import { Text, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import tw from "../src/utils/tailwind";

function CustomDrawerContent(props: any) {
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

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        drawerContent={(props) => <CustomDrawerContent {...props} />}
        screenOptions={{
          headerShown: false,
          drawerActiveTintColor: "#3B82F6",
          drawerLabelStyle: tw`ml--2 font-semibold`,
        }}
      >
        <Drawer.Screen
          name="(tabs)/index"
          options={{
            drawerLabel: "Routine",
            drawerIcon: ({ color, size }) => (
              <Ionicons name="list-outline" size={size} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="(tabs)/exercise"
          options={{
            drawerLabel: "Exercise",
            drawerIcon: ({ color, size }) => (
              <Ionicons name="fitness-outline" size={size} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="(tabs)/notes"
          options={{
            drawerLabel: "Notes",
            drawerIcon: ({ color, size }) => (
              <Ionicons name="journal-outline" size={size} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="(tabs)/muslim-life"
          options={{
            drawerLabel: "Muslim Life",
            drawerIcon: ({ color, size }) => (
              <Ionicons name="moon-outline" size={size} color={color} />
            ),
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}
