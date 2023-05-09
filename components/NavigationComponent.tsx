import React, { useState } from 'react';
import { View, useWindowDimensions } from 'react-native';
import { TabView, SceneMap, TabBar  } from 'react-native-tab-view';
import LandingPage from './FlowerComponent';
import FavoritePage from './FavoritesComponent';
import { color } from 'react-native-reanimated';

const renderScene = SceneMap({
  first: LandingPage,
  second: FavoritePage,
  third: FavoritePage,
});

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

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
      renderTabBar={renderTabBar}
    />
  );
};

export default TabViewExample;