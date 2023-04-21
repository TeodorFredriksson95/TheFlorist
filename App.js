import React, {Component} from 'react';
import {ActivityIndicator, FlatList, Text, View, StyleSheet} from 'react-native';
import FlowerComponent from './components/FlowerComponent';

export default function App() {
  return (
    <FlowerComponent/>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
