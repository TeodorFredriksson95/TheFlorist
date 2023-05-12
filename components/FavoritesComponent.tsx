 import React, { useState, useEffect, useRef } from 'react'
import { Alert, Text, TouchableOpacity, FlatList as VirtualizedList} from 'react-native'
import { GetFavoriteFlowers } from '../api/getFavoriteFlowers';
import { FlowerProps, FetchFlowers } from '../types/Flowers'
import { styles } from '../css/cardStyles'
import { Card } from './Card'
import { FlowerModal } from './FlowerModal';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FlatList, View } from 'react-native';
import { withActiveState } from './withActiveState';
import { collection, getDocs, getFirestore } from 'firebase/firestore';
import { app } from '../firebase'

const Item: React.FC<FlowerProps> = React.memo(({ item }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [selectedFlower, setSelectedFlower] = useState<FetchFlowers | null>(null);
  const lastTapRef = useRef(0);

  const handlePress = () => {
    const now = Date.now();
    const DOUBLE_PRESS_DELAY = 300;
    if (now - lastTapRef.current < DOUBLE_PRESS_DELAY) {
      setSelectedFlower(item);
    } else {
      setIsFlipped(!isFlipped);
    }
    lastTapRef.current = now;
  };

  const handleModalClose = () => {
    setSelectedFlower(null);
  };

  const handleAddToBouquets = async (bouquetName: string) => {
    if (!selectedFlower) return;
  }

  return (
    <>
      <TouchableOpacity style={styles.cardWrapper} onPress={handlePress}>
        <Card
          img={item.img}
          family={item.family}
          common_name={item.common_name}
          scientific_name={item.scientific_name}
          synonyms={item.synonyms}
          isFlipped={isFlipped}
        />
      </TouchableOpacity>
      <FlowerModal
       selectedFlower={selectedFlower} 
       onClose={handleModalClose} 
       isFavorite={false}
       onAddToBouquet={handleAddToBouquets}
       />
    </>
  );
}, (prevProps, nextProps) => prevProps.item === nextProps.item);


const FavoritePage = ({ isActive }: any) => {
  const [data, setFlowers] = useState<any[]>([]);

  useEffect(() => {
    if (!isActive) return;

    const fetchData = async () => {
      const data = await GetFavoriteFlowers();
      console.log(data)
      setFlowers(data);
    };
    fetchData();
  }, [isActive]);
  
const renderItem = ({ item, index }: any) => {
  return <Item key={index.toString()} item={item} />
}
  
 const keyExtractor = (item: any, index: number) => index.toString()

  return (
    <>
  <SafeAreaView style={{ flex: 1 }}>
    <View style={{ flex: 1 }}>
      <FlatList
         initialNumToRender={15}
         windowSize={10}
         data={data}
         numColumns={3}
         renderItem={renderItem}
         keyExtractor={keyExtractor}
         contentContainerStyle={styles.cardList}
         style={styles.flatListMargin}
          />
          </View>       
          </SafeAreaView>
</> 
  );
};

export default withActiveState(FavoritePage);
