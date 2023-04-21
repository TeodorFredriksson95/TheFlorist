 import React, { useState, useEffect } from 'react'
import { View, Text, Animated, Image } from 'react-native'
import { styles } from '../css/styles'


export const Card = ({ img, family, common_name, scientific_name, synonyms, isFlipped }: any) => {
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