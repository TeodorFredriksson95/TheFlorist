import React, { useState, useEffect, useRef } from 'react';
import { FlatList, View, Text, TouchableOpacity, SafeAreaView } from 'react-native';

import {Card} from './Card';
import {FlowerModal} from './FlowerModal';
import SearchBar from './SearchBar';

import { styles } from '../css/cardStyles';

import { FlowerProps, FetchFlowers } from '../types/Flowers';
import { GetFlowers } from '../api/getFlowers';
import { db, app } from '../firebase';
import { getFirestore, collection, doc, updateDoc, getDoc, setDoc } from 'firebase/firestore';

const FlowerItem: React.FC<FlowerProps> = React.memo(({ item }) => {
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

   const handleAddToFavorites = async () => {
  if (!selectedFlower) return;

  const dbInstance = getFirestore(app);
  const favoritesRef = collection(dbInstance, 'favorites');
  const flowerFavoritesDocRef = doc(favoritesRef, 'flowerFavorites');
  const flowerFavoritesDoc = await getDoc(flowerFavoritesDocRef);

  if (!flowerFavoritesDoc.exists()) {
    await setDoc(flowerFavoritesDocRef, {});
  }

  updateDoc(flowerFavoritesDocRef, {
    [selectedFlower.id]: selectedFlower,
  });
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
      <FlowerModal
       selectedFlower={selectedFlower} 
       onClose={handleModalClose} 
       isFavorite={true}
       onAddToFavorite={handleAddToFavorites}
       />
    </>
  );
}, (prevProps, nextProps) => prevProps.item === nextProps.item);


const renderItem = ({ item, index }: any) => {
  return <FlowerItem key={index.toString()} item={item} />
}

const keyExtractor = (item: any, index: number) => index.toString()

const LandingPage = () => {
    const [data, setData] = useState<FetchFlowers[]>([]);
    const [isLoading, setLoading] = useState(true);
    const [pageNr, setPageNr] = useState(1)
  const [selectedFlower, setSelectedFlower] = useState<FetchFlowers | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState('');

  const handleSearch = (query: any) => {
    setSearchQuery(query);
    // reset data and page number
    setData([]);
    setPageNr(1);
    setError('');
  };


  useEffect(() => {
    // modify your GetFlowers function to accept a second parameter for search query
    GetFlowers(pageNr, searchQuery)
      .then((flowers) => {
        if (flowers === undefined) {
          setError(`Could not search for "${searchQuery}"`);
        } else {
          setData((prevData) => [...prevData, ...flowers]);
        }
      })
      .catch((error) => {
        setError(`Could not search for "${searchQuery}"`);
        console.error(error);
      })
  }, [pageNr, searchQuery]);
    
  return (
    <>
  <SafeAreaView style={{ flex: 1 }}>
      <SearchBar onSearch={handleSearch} />
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
         onEndReachedThreshold={0.3}
         onEndReached={() => {
           setPageNr(pageNr +1)
           GetFlowers(pageNr);
          }}
          />
          </View>
          </SafeAreaView>
</> 
 )
  
}

export default LandingPage
