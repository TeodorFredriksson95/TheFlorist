import React, { useState, useEffect, useRef } from 'react';
import { FlatList, View, Text, TouchableOpacity, SafeAreaView } from 'react-native';

import {Card} from './Card';
import {FlowerModal} from './FlowerModal';
import SearchBar from './SearchBar';
import { Filters } from '../types/Filters';
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
  const [error, setError] = useState('');
  const [pageNr, setPageNr] = useState(1);
  const [isLoading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [data, setData] = useState<FetchFlowers[]>([]);
  const [selectedFlower, setSelectedFlower] = useState<FetchFlowers | null>(null);
  const [filters, setFilters] = useState<Filters>({ red: false, green: false, blue: false, yellow: false, purple: false, white: false, edible: false });
  const [resetData, setResetData] = useState(false);

  const handleFiltersChange = (newFilters: typeof filters) => {
    setFilters(newFilters);
    setPageNr(1);
    setError('');
    setResetData(true);
  };

  const handleSearch = (query: any) => {
    setSearchQuery(query);
    setPageNr(1);
    setError('');
    setResetData(true);
  };

  useEffect(() => {
    if (isLoading) return; // Avoid fetching if already loading

    setLoading(true);
    
    GetFlowers(pageNr, searchQuery, filters)
      .then((flowers) => {
        if (!flowers || flowers.length === 0) {
          const selectedFilters = Object.entries(filters)
            .filter(([key, value]) => value)
            .map(([key]) => key)
            .join(', ');
          setData([]);
          setError(`Could not find flowers matching "${searchQuery}" with filters: ${selectedFilters}`);
        } else {
          if (resetData) {
            setData(flowers);
          } else {
            setData((prevData) => [...prevData, ...flowers]);
          }
        }
        setResetData(false);
      })
      .catch((error) => {
        setError(error.message);
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [pageNr, searchQuery, filters, resetData]);


  return (
    <>
  <SafeAreaView style={{ flex: 1 }}>
  <SearchBar onSearch={handleSearch} onFiltersChange={handleFiltersChange} />
    <View style={{ flex: 1, backgroundColor: '#ffe6e6' }}>
      {error ? (
      <Text style={{ textAlign: 'center', marginTop: 50 }}>{error}</Text> ):
        (        
        <FlatList
        initialNumToRender={15}
        windowSize={10}
        data={data}
        numColumns={3}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        contentContainerStyle={styles.cardList}
        style={styles.flatListMargin}
        onEndReachedThreshold={0.9}
        onEndReached={() => {
          if (!isLoading) {
            setPageNr((prevPageNr) => prevPageNr + 1)
          }
        }} 
       />
        )}
          </View>
          </SafeAreaView>
</> 
 )
  
}

export default LandingPage
