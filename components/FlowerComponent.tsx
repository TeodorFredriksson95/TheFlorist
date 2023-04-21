 import React, { useState, useEffect } from 'react'
import { FlatList } from 'react-native';
import { View, Text, TouchableOpacity, FlatList as VirtualizedList, StyleSheet, Animated, Image, ActivityIndicator, Button, Pressable } from 'react-native'
import Loader from './Loader';

const CARD_HEIGHT = 150;
const CARD_WIDTH = 100;
type FlowerProps = {
  item: FetchFlowers
}

type FetchFlowers = {
    img: string;
    family: string;
    common_name: string;
    scientific_name: string;
    synonyms: string;
    id: string;
}
 const Card = ({ img, family, common_name, scientific_name, synonyms, isFlipped }: any) => {
  const [rotation] = useState(new Animated.Value(isFlipped ? 180 : 0))

  useEffect(() => {

    Animated.timing(rotation, {
      toValue: isFlipped ? 180 : 0,
      duration: 500,
      useNativeDriver: true,
    }).start()

  }, [isFlipped, rotation])

  const frontInterpolate = rotation.interpolate({
    inputRange: [0, 180],
    outputRange: ['0deg', '180deg'],
  })

  const backInterpolate = rotation.interpolate({
    inputRange: [0, 180],
    outputRange: ['180deg', '360deg'],
  })

  const frontAnimatedStyle = {
    transform: [{ rotateY: frontInterpolate }],
  }

  const backAnimatedStyle = {
    transform: [{ rotateY: backInterpolate }],
  }


  return (
    <View style={[styles.card]}>
      <Animated.View style={[styles.front, styles.imageShadow, frontAnimatedStyle]}>
        <Image source={{uri: img}} style={styles.imageSizeFrontside}/>
        <Text style={styles.cardText}>{common_name}</Text>
      </Animated.View>
      <Animated.View style={[styles.back, styles.imageShadow, backAnimatedStyle]}>
        <Image source={{uri: img}} style={styles.imageSizeBackside}/>
        <View  style={styles.cardTextBackContainer}>
          <Text style={styles.cardTextBack}>{family}</Text>
          <Text style={styles.cardTextBack}>{scientific_name}</Text>
          <Text style={styles.cardTextBack}>{synonyms}</Text>
        </View>
      </Animated.View>
    </View>
  )
}

const Item: React.FC<FlowerProps> = React.memo(({ item }) => {
  const [isFlipped, setIsFlipped] = useState(false)
  const handlePress = () => {
    setIsFlipped(!isFlipped)
  }

  return (
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
  )
}, (prevProps, nextProps) => prevProps.item === nextProps.item);


const renderItem = ({ item, index }: any) => {
  return <Item key={item.key} item={item} />
}

const keyExtractor = (item:any) => item.id

let scrollYPos = 0;

const DeveloperScreen = () => {
    const [data, setData] = useState<FetchFlowers[]>([]);
    const [isLoading, setLoading] = useState(true);
    const [pageNr, setPageNr] = useState(1)
    const [toggle, setToggle] = useState(true)
    const [button, setButton] = useState(false);


    const getFlowers = async () => {

        await fetch('https://trefle.io/api/v1/plants?token=d0f6EsLJkdG_57a5-6m_BvO0E4jX401WIZUV9ARHQ9k&page=' + pageNr)
        .then((response) => response.json())
        .then((responseJson) => {
          
            const flowers = responseJson.data.map((data:any) => {
              return {
                img: data.image_url,
                family: data.family,
                common_name: data.common_name,
                scientific_name: data.scientific_name,
                synonyms: data.synonyms[0],
                id: data.id
              }
            })           
               setPageNr(pageNr + 1)
                setData([...data, ...flowers]);
                setLoading(false);
                console.log('fetching ' + pageNr);
              })
            .catch((error) => {
              console.error(error);
            })
    };

    useEffect(() => {
        getFlowers();
    }, []);
    
  return (
    <>
   <Loader isLoading={isLoading} />
    <Text style={{ 
      textAlign: 'center',
      marginTop: 30,
      fontSize: 40,
      fontStyle:'italic',
      fontWeight: 'bold',
      color: 'gold' }}>
      CARROS APP
    </Text>
      <FlatList
         initialNumToRender={15}
         windowSize={10}
         data={data}
         numColumns={3}
         renderItem={renderItem}
         keyExtractor={keyExtractor}
         contentContainerStyle={styles.cardList}
         style={{marginTop:50, backgroundColor: '#ffe6e6'}}
         onEndReachedThreshold={0.1}
         onEndReached={() => {
          //  if(pageNr === 3
          //    ){
          //    setButton(true)
          //    return
          //   }
            setLoading(true) 
            getFlowers();
            console.log(pageNr)
          }}
          />
        {/* {button ? <Pressable style={{backgroundColor: '#ffe6e6'}}>
          <View style={{flexDirection: 'row', height: 35, display:'flex', justifyContent:'space-between'}}>
            <View style={{width:80, justifyContent:'center', alignItems:'center', backgroundColor:'pink', borderRadius:5}}>
              <Text style={{fontStyle: 'italic'}}>Back</Text>
            </View>
            <View style={{width:80, justifyContent:'center', alignItems:'center', backgroundColor:'pink', borderRadius: 5}}>
              <Text style={{fontStyle: 'italic'}}>Next</Text>
            </View>
          </View>
        </Pressable> : <View></View>} */}
</> 
 )
  
}

 const styles = StyleSheet.create({
  cardList: {
   alignItems: 'center',
   paddingBottom: 40,
  },
  cardWrapper: {
    paddingHorizontal: 5,
    marginTop: 5,
  },
  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
    backfaceVisibility: 'hidden',
    borderRadius: 10,
  },
  front: {
    position: 'absolute',
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
    backfaceVisibility: 'hidden',
    borderRadius: 10,

  },
  back: {
    position: 'absolute',
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
    backfaceVisibility: 'hidden',
    transform: [{ rotateY: '180deg' }],
    borderRadius: 10,
  },
  cardText: {
    position: 'absolute',
    textAlign: 'center',
    top: 5,
    fontSize: 20,
    fontWeight: 'bold',
    color: 'gold',
  },
  cardTextBackContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardTextBack: {
    marginTop: 15,
    fontSize: 15,
    fontWeight: 'bold',
    color: 'pink',
    fontStyle: 'italic',
  },
  imageShadow: {
    shadowColor: '#ff0000',
    shadowOffset: {
      width: 3,
      height: 1,
    },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    backgroundColor: 'rgba(0, 0, 0, 0.36)',
    borderRadius: 10,
    },
  imageSizeBackside: {
  height: CARD_HEIGHT,
  width: CARD_WIDTH,
  borderRadius: 10,
  opacity: 0.1,
  },
  imageSizeFrontside: {
  height: CARD_HEIGHT,
  width: CARD_WIDTH,
  borderRadius: 10,
  opacity: 0.7,
}

})
export default DeveloperScreen
