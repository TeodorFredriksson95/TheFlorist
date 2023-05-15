import React, { useState } from 'react';
import { View, useWindowDimensions } from 'react-native';
import { TabView, SceneMap, TabBar  } from 'react-native-tab-view';
import LandingPage from './LandingPageComponent';
import FavoritePage from './FavoritesComponent';
import { color } from 'react-native-reanimated';
import CarouselPage from './CarouselPage';


const renderTabBar = (props: any) => (
  <TabBar
    {...props}
    style={{ backgroundColor: '#ff0066' }}
    indicatorStyle={{ backgroundColor: '#ffcc00' }}
  />
);

const TabViewExample = () => {
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'first', title: 'Flowers' },
    { key: 'second', title: 'Favorites' },
    { key: 'third', title: 'Bouquetes' },
  ]);
  
const renderScene = ({ route }: any) => {
  switch (route.key) {
    case 'first':
      return <LandingPage />;
    case 'second':
      return <FavoritePage isActive={index === 1} />;
    case 'third':
      return <CarouselPage isActive={index === 2} />;
    default:
      return null;
  }
};
  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
      renderTabBar={renderTabBar}
      lazy
    />
  );
};

export default TabViewExample;