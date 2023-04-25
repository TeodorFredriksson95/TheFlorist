 import React, { useState, useEffect, useRef } from 'react'
import { FlatList } from 'react-native';
import { Text, TouchableOpacity, FlatList as VirtualizedList} from 'react-native'
import { Card } from './Card'
import { styles } from '../css/cardStyles'
import { FlowerProps, FetchFlowers } from '../types/Flowers'
import { GetFlowers } from '../api/getFlowers';
import { FlowerModal } from './FlowerModal';

const FavoritePage = () => {
    return (
        <Text>favorite page</Text>
    )
}

export default FavoritePage