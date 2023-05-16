
import React, { useEffect } from 'react';
import {ActivityIndicator, FlatList, Text, View, StyleSheet, SafeAreaView, StatusBar} from 'react-native';
import TabViewExample from './components/NavigationComponent';
import { Provider } from 'react-native-paper';

export default function App() {

  return (
    <Provider>

    <SafeAreaView style={{flex: 1}}>
      <StatusBar backgroundColor={'white'} barStyle={'dark-content'} />
      <TabViewExample/>
    </SafeAreaView>
    </Provider>
  );
}




