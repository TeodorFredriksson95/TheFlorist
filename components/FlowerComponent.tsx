 import React, { useState, useEffect, useRef } from 'react'
import { FlatList } from 'react-native';
import { Text, TouchableOpacity, FlatList as VirtualizedList} from 'react-native'
import { Card } from './Card'
import { styles } from '../css/cardStyles'
import { FlowerProps, FetchFlowers } from '../types/Flowers'
import { GetFlowers } from '../api/getFlowers';
import { FlowerModal } from './FlowerModal';


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
      <FlowerModal selectedFlower={selectedFlower} onClose={handleModalClose} />
    </>
  );
}, (prevProps, nextProps) => prevProps.item === nextProps.item);


const renderItem = ({ item, index }: any) => {
  return <Item key={item.key} item={item} />
}

const keyExtractor = (item:any) => item.id

const LandingPage = () => {
    const [data, setData] = useState<FetchFlowers[]>([]);
    const [isLoading, setLoading] = useState(true);
    const [pageNr, setPageNr] = useState(1)
  const [selectedFlower, setSelectedFlower] = useState<FetchFlowers | null>(null);

  useEffect(() => {
  GetFlowers(pageNr)
    .then((flowers) => {
      setData(prevData => [...prevData, ...flowers]);
    })
    .catch((error) => {
      console.error(error);
    });
}, [pageNr]);
    
  return (
    <>
      <FlatList
         initialNumToRender={15}
         windowSize={10}
         data={data}
         numColumns={3}
         renderItem={renderItem}
         keyExtractor={keyExtractor}
         contentContainerStyle={styles.cardList}
         style={styles.flatListMargin}
         onEndReachedThreshold={0.3}
         onEndReached={() => {
            setPageNr(pageNr +1)
            GetFlowers(pageNr);
          }}
          />
</> 
 )
  
}

export default LandingPage
