
import React, { useEffect } from 'react';
import {ActivityIndicator, FlatList, Text, View, StyleSheet, SafeAreaView, StatusBar} from 'react-native';
import TabViewExample from './components/NavigationComponent';

export default function App() {

  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar backgroundColor={'white'} barStyle={'dark-content'} />
      <TabViewExample/>
    </SafeAreaView>
  );
}




