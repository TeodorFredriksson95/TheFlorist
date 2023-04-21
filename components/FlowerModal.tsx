import { Image, Text, TouchableOpacity, View } from "react-native";
import { FetchFlowers } from "../types/Flowers";


export const FlowerModal: React.FC<{ selectedFlower: FetchFlowers | null; onClose: () => void }> = ({
  selectedFlower,
  onClose,
}) => {
  if (!selectedFlower) {
    return null;
  }

  return (
    <View >
      <TouchableOpacity  onPress={onClose}>
        <Text >Close</Text>
      </TouchableOpacity>
      <Text >{selectedFlower.common_name}</Text>
      <Text >{selectedFlower.scientific_name}</Text>
      <Text >{selectedFlower.family}</Text>
      <Image source={{ uri: selectedFlower.img }}  />
    </View>
  );
};
