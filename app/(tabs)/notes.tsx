import { DrawerNavigationProp } from "@react-navigation/drawer";
import { useNavigation } from "expo-router";
import NotesScreen from "../../src/screens/NotesScreen";

export default function Notes() {
  const navigation = useNavigation<DrawerNavigationProp<any>>();
  const onMenuPress = () => navigation.openDrawer();

  return <NotesScreen onMenuPress={onMenuPress} />;
}
