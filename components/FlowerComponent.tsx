 import React, { useState, useEffect } from 'react'
import { FlatList } from 'react-native';
import { View, Text, TouchableOpacity, FlatList as VirtualizedList, Pressable } from 'react-native'
import Loader from './Loader';
import { Card } from './Card'
import { styles } from '../css/styles'

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


const Item: React.FC<FlowerProps> = ({ item }) => {
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
}

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
         data={data}
         numColumns={3}
         renderItem={renderItem}
         keyExtractor={keyExtractor}
         contentContainerStyle={styles.cardList}
         style={{marginTop:50, backgroundColor: '#ffe6e6'}}
         onEndReachedThreshold={0.1}
         onEndReached={() => {
           if(pageNr === 3
             ){
             setButton(true)
             return
            }
            setLoading(true) 
            getFlowers();
            console.log(pageNr)
          }}
          />
        {button ? <Pressable style={{backgroundColor: '#ffe6e6'}}>
          <View style={{flexDirection: 'row', height: 35, display:'flex', justifyContent:'space-between'}}>
            <View style={{width:80, justifyContent:'center', alignItems:'center', backgroundColor:'pink', borderRadius:5}}>
              <Text style={{fontStyle: 'italic'}}>Back</Text>
            </View>
            <View style={{width:80, justifyContent:'center', alignItems:'center', backgroundColor:'pink', borderRadius: 5}}>
              <Text style={{fontStyle: 'italic'}}>Next</Text>
            </View>
          </View>
        </Pressable> : <View></View>}
</> 
 )
  
}


export default DeveloperScreen
