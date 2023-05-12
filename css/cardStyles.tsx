
import {Dimensions, StyleSheet} from 'react-native'

const CARD_HEIGHT = 150;
const CARD_WIDTH = 100;

const TOTAL_WIDTH = Dimensions.get('window').width;
const CARD_MARGIN = 5; // Considering that you have a margin of 5 for each card from 'bouquetMargin' style.
const NUMBER_OF_CARDS_IN_ROW = 3;
const TOTAL_CARD_WIDTH = (CARD_WIDTH + 2 * CARD_MARGIN) * NUMBER_OF_CARDS_IN_ROW;

const remainingWidth = TOTAL_WIDTH - TOTAL_CARD_WIDTH;
const padding = remainingWidth / 2;

export const styles = StyleSheet.create({

  cardList: {
    marginTop: 20,
   alignItems: 'flex-start',
   paddingBottom: 40,
   justifyContent: 'flex-start',
   paddingHorizontal: padding 
  },
  cardWrapper: {
    paddingHorizontal: 5,
    marginTop: 5,
  },
  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
    backfaceVisibility: 'hidden',
    borderRadius: 10,
  },
  front: {
    position: 'absolute',
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
    backfaceVisibility: 'hidden',
    borderRadius: 10,

  },
  back: {
    position: 'absolute',
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
    backfaceVisibility: 'hidden',
    transform: [{ rotateY: '180deg' }],
    borderRadius: 10,
  },
  cardText: {
    position: 'absolute',
    textAlign: 'center',
    top: 5,
    fontSize: 20,
    fontWeight: 'bold',
    color: 'gold',
  },
  cardTextBackContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardTextBack: {
    marginTop: 15,
    fontSize: 15,
    fontWeight: 'bold',
    color: 'pink',
    fontStyle: 'italic',
  },
cardTextPadding: {
  paddingBottom: 10,
},
  imageShadow: {
    shadowColor: '#ff0000',
    shadowOffset: {
      width: 3,
      height: 1,
    },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    backgroundColor: 'rgba(0, 0, 0, 0.36)',
    borderRadius: 10,
    },
  imageSizeBackside: {
  height: CARD_HEIGHT,
  width: CARD_WIDTH,
  borderRadius: 10,
  opacity: 0.1,
  },
  imageSizeFrontside: {
  height: CARD_HEIGHT,
  width: CARD_WIDTH,
  borderRadius: 10,
  opacity: 0.7,
},
titleText: {
  textAlign: 'center',
  marginTop: 30,
  fontSize: 40,
  fontStyle:'italic',
  fontWeight: 'bold',
  color: 'gold' 
},
flatListMargin: {
  backgroundColor: '#ffe6e6'
},


})