import { DrawerNavigationProp } from "@react-navigation/drawer";
import { useNavigation } from "expo-router";
import MuslimLifeScreen from "../../src/screens/MuslimLifeScreen";

export default function MuslimLife() {
  const navigation = useNavigation<DrawerNavigationProp<any>>();
  const onMenuPress = () => navigation.openDrawer();

  return <MuslimLifeScreen onMenuPress={onMenuPress} />;
}
