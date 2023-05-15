

// import React, { useEffect, useState, useRef } from 'react';
// import { View, Text, Image, SafeAreaView, TouchableOpacity, Dimensions, Modal } from 'react-native';
// import { getFirestore, collection, getDocs } from 'firebase/firestore';
// import { styles as cardStyles } from '../css/cardStyles';
// import { withActiveState } from './withActiveState';
// import { styles } from '../css/modalStyles'
// import { FlatList } from 'react-native-gesture-handler';
// import Swiper, { SwiperProps } from 'react-native-swiper';

// const CarouselPage: React.FC<{ isActive: boolean }> = ({ isActive }) => {
//   const [bouquets, setBouquets] = useState<any[]>([]);
//   const [isModalVisible, setIsModalVisible] = useState(false);
//   const [carouselImages, setCarouselImages] = useState([]);
//     const swiperRef = useRef<SwiperProps & { scrollBy: (index: number) => void }>(null);
//   const flatListRef = useRef(null);

//   useEffect(() => {
//     const fetchBouquets = async () => {
//       const db = getFirestore();
//       const bouquetsRef = collection(db, 'Bouquets');
//       const snapshot = await getDocs(bouquetsRef);
//       const fetchedBouquets = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//       setBouquets(fetchedBouquets);
//     };

//     if (isActive) {
//       fetchBouquets();
//     }
//   }, [isActive]);

//   const handleImageClick = (images: any) => {
//     setCarouselImages(images);
//     setIsModalVisible(true);
//   };

//   const renderItem = ({ item }: any) => {
//     return (
//       <TouchableOpacity style={cardStyles.cardWrapper} onPress={() => handleImageClick(item.images)}>
//         <Image 
//           source={{ uri: item.images[0] }} 
//           style={cardStyles.card}
//         />
//         <View style={[styles.imageOverlay, cardStyles.card]}>
//           <Text style={cardStyles.cardText}>{item.id}</Text>
//         </View>
//       </TouchableOpacity>
//     );
//   }

//   const renderCarouselItem = (uri: string, index: number) => {
//     console.log(uri)
//     return (
//       <View style={styles.carouselItemContainer} key={index}>
//         <Image 
//           source={{ uri }} 
//           style={styles.carouselImage} 
//         />
//       </View>
//     );
//   }
//   const keyExtractor = (item: any, index: number) => index.toString();

//   return (
//     <>
//       <SafeAreaView style={{ flex: 1 }}>
//         <View style={{ flex: 1 }}>
//           <FlatList
//             initialNumToRender={15}
//             windowSize={10}
//             data={bouquets}
//             renderItem={renderItem}
//             keyExtractor={keyExtractor}
//             numColumns={3}
//             contentContainerStyle={cardStyles.cardList}
//             style={cardStyles.flatListMargin}
//           />
//         </View>
//         <Modal
//           visible={isModalVisible}
//           transparent={true}
//           onRequestClose={() => setIsModalVisible(false)}
//         >
//           <View style={styles.modalContainer}>
//             <TouchableOpacity style={styles.closeButtonBouqetModal} onPress={() => setIsModalVisible(false)}>
//               <Text style={styles.closeButtonBouqetModalText}>X</Text>
//             </TouchableOpacity>
//             <Swiper >
//             {carouselImages.map(renderCarouselItem)}
//             </Swiper>

//           </View>
//         </Modal>
//       </SafeAreaView>
//     </>
//   );
// };

// export default withActiveState(CarouselPage);



//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// import React, { useEffect, useState, useRef } from 'react';
// import { View, Text, Image, SafeAreaView, TouchableOpacity, Dimensions, Modal, FlatList } from 'react-native';
// import { getFirestore, collection, getDocs } from 'firebase/firestore';
// import { styles as cardStyles } from '../css/cardStyles';
// import { withActiveState } from './withActiveState';
// import { styles } from '../css/modalStyles';
// import Swiper from 'react-native-swiper';

// const CarouselPage: React.FC<{ isActive: boolean }> = ({ isActive }) => {
//   const [bouquets, setBouquets] = useState<any[]>([]);
//   const [isModalVisible, setIsModalVisible] = useState(false);
//   const [carouselImages, setCarouselImages] = useState<any[]>([]);
// const swiperRef = useRef<Swiper>(null);
// const [activeIndex, setActiveIndex] = useState(0);

//   // Fetch bouquets from Firestore
//   useEffect(() => {
//     const fetchBouquets = async () => {
//       const db = getFirestore();
//       const bouquetsRef = collection(db, 'Bouquets');
//       const snapshot = await getDocs(bouquetsRef);
//       const fetchedBouquets = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//       setBouquets(fetchedBouquets);
//     };

//     if (isActive) {
//       fetchBouquets();
//     }
//   }, [isActive]);

//   // Handler for when an image is clicked
//   const handleImageClick = (images: any) => {
//     setCarouselImages(images);
//     setIsModalVisible(true);
//   };

//   // Function to render each item in the FlatList
//   const renderItem = ({ item }: any) => (
//     <TouchableOpacity style={cardStyles.cardWrapper} onPress={() => handleImageClick(item.images)}>
//       <Image source={{ uri: item.images[0] }} style={cardStyles.card} />
//       <View style={[styles.imageOverlay, cardStyles.card]}>
//         <Text style={cardStyles.cardText}>{item.id}</Text>
//       </View>
//     </TouchableOpacity>
//   );

//   // Function to render each item in the Swiper
//   const renderCarouselItem = (uri: string, index: number) => (
//     <View style={styles.carouselItemContainer} key={index}>
//       <Image source={{ uri }} style={styles.carouselImage} />
//     </View>
//   );

//   // Function to render each thumbnail in the FlatList
// const renderThumbnailItem = ({ item, index }: { item: string, index: number }) => (
//   <TouchableOpacity
//     style={styles.thumbnailContainer}
//     onPress={() => {
//       swiperRef.current?.scrollBy(index - activeIndex);
//       setActiveIndex(index);
//     }}
//   >
//     <Image source={{ uri: item }} style={styles.thumbnail} />
//   </TouchableOpacity>
// );

//   const keyExtractor = (item: any, index: number) => index.toString();

//   return (
//     <>
//       <SafeAreaView style={{ flex: 1 }}>
//         <View style={{ flex: 1 }}>
//           <FlatList
//             initialNumToRender={15}
//             windowSize={10}
//             data={bouquets}
//             renderItem={renderItem}
//             keyExtractor={keyExtractor}
//             numColumns={3}
//             contentContainerStyle={cardStyles.cardList}
//             style={cardStyles.flatListMargin}
//           />
//         </View>
//     <Modal
//     visible={isModalVisible}
//     transparent={true}
//     onRequestClose={() => setIsModalVisible(false)}
//     >
//   <View style={styles.carouselSwiperContainer}>
//     <TouchableOpacity style={styles.closeButton} onPress={() => setIsModalVisible(false)}>
//       <Text style={styles.closeButtonText}>X</Text>
//     </TouchableOpacity>
//     <View style={styles.swiperAndThumbnailsContainer}>
//       <View style={styles.swiperContainer}>
//         <Swiper ref={swiperRef}>
//         {carouselImages.map(renderCarouselItem)}
//         </Swiper>
//       </View>
//       <View style={styles.flatListContainer}>
//         <FlatList 
//           horizontal
//           data={carouselImages}
//           renderItem={renderThumbnailItem}
//           keyExtractor={keyExtractor}
//           style={{ marginTop: 10 }} // adjust as needed
//           showsHorizontalScrollIndicator={false}
//         />
//       </View>
//     </View>
//   </View>
// </Modal>
//       </SafeAreaView>
//     </>
//   );
// };

// export default withActiveState(CarouselPage);



import React, { useEffect, useState, useRef } from 'react';
import { View, Text, Image, SafeAreaView, TouchableOpacity, Dimensions, Modal, FlatList, TouchableWithoutFeedback  } from 'react-native';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { styles as cardStyles } from '../css/cardStyles';
import { withActiveState } from './withActiveState';
import { styles } from '../css/modalStyles';
import Carousel from 'react-native-snap-carousel'; 

const CarouselPage: React.FC<{ isActive: boolean }> = ({ isActive }) => {
  const [bouquets, setBouquets] = useState<any[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [carouselImages, setCarouselImages] = useState<any[]>([]);
const [activeIndex, setActiveIndex] = useState(0);
const carouselRef = useRef<any>(null);

  // Fetch bouquets from Firestore
  useEffect(() => {
    const fetchBouquets = async () => {
      const db = getFirestore();
      const bouquetsRef = collection(db, 'Bouquets');
      const snapshot = await getDocs(bouquetsRef);
      const fetchedBouquets = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setBouquets(fetchedBouquets);
    };

    if (isActive) {
      fetchBouquets();
    }
  }, [isActive]);

  // Handler for when an image is clicked
  const handleImageClick = (images: any, index: number) => {
    setCarouselImages(images);
    setActiveIndex(index);  // Set initial index when image is clicked
    setIsModalVisible(true);
  };
  // Function to render each item in the FlatList
  const renderItem = ({ item, index }: any) => (
    <TouchableOpacity style={cardStyles.cardWrapper} onPress={() => handleImageClick(item.images, index)}>
      <Image source={{ uri: item.images[0] }} style={cardStyles.card} />
      <View style={[styles.imageOverlay, cardStyles.card]}>
        <Text style={cardStyles.cardText}>{item.id}</Text>
      </View>
    </TouchableOpacity>
  );

  // Function to render each item in the Swiper
const renderCarouselItem = ({ item, index }: { item: any, index: number }) => (
  <View style={styles.carouselItemContainer} key={index}>
    <Image source={{ uri: item }} style={styles.carouselImage} />
  </View>
);
  // Function to render each thumbnail in the FlatList
const renderThumbnailItem = ({ item, index }: { item: string, index: number }) => (
  <TouchableWithoutFeedback
    onPress={() => {
      carouselRef.current?.snapToItem(index);
    }}
  >
    <View
      style={[
        styles.thumbnailContainer,
        index === activeIndex ? styles.activeThumbnail : null,
      ]}
    >
      <Image source={{ uri: item }} style={styles.thumbnail} />
    </View>
  </TouchableWithoutFeedback>
);
  const keyExtractor = (item: any, index: number) => index.toString();

  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <FlatList
            initialNumToRender={15}
            windowSize={10}
            data={bouquets}
            renderItem={renderItem}
            keyExtractor={keyExtractor}
            numColumns={3}
            contentContainerStyle={cardStyles.cardList}
            style={cardStyles.flatListMargin}
          />
        </View>
            <Modal
          visible={isModalVisible}
          transparent={true}
          onRequestClose={() => setIsModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <TouchableOpacity style={styles.closeButtonBouqetModal} onPress={() => setIsModalVisible(false)}>
              <Text style={styles.closeButtonBouqetModalText}>X</Text>
            </TouchableOpacity>
               <Carousel
               vertical={false}
              ref={carouselRef}
              data={carouselImages}
              renderItem={renderCarouselItem}
               sliderWidth={Dimensions.get('window').width}
                itemWidth={Dimensions.get('window').width * 0.8} 
              onSnapToItem={(index: any) => setActiveIndex(index)}
              firstItem={activeIndex}
            />
            <FlatList 
              horizontal
              data={carouselImages}
              renderItem={renderThumbnailItem}
              keyExtractor={keyExtractor}
              style={styles.thumbnailList}
              showsHorizontalScrollIndicator={false}
            />
          </View>
        </Modal>
      </SafeAreaView>
    </>
  );
};

export default withActiveState(CarouselPage);