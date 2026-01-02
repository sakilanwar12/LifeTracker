import { DrawerNavigationProp } from "@react-navigation/drawer";
import { useNavigation } from "expo-router";
import ExerciseScreen from "../../src/screens/ExerciseScreen";

export default function Exercise() {
  const navigation = useNavigation<DrawerNavigationProp<any>>();
  const onMenuPress = () => navigation.openDrawer();

  return <ExerciseScreen onMenuPress={onMenuPress} />;
}
