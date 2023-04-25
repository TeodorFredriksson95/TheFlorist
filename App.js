import React, {Component} from 'react';
import {ActivityIndicator, FlatList, Text, View, StyleSheet} from 'react-native';
import FlowerComponent from './components/FlowerComponent';
import FavoritePage from './components/FavoritesComponent';
import NavigationBar from './components/NavigationComponent';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function App() {
  return (
    <>
      <FlowerComponent/>
    </>
  );
}

