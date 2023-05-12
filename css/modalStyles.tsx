import { StyleSheet, Dimensions, Platform } from 'react-native'

const { width, height } = Dimensions.get('window');
const CARD_HEIGHT = 150;
const CARD_WIDTH = 100;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
    cardListModal: {
    marginTop: 20,
   alignItems: 'flex-start',
   paddingBottom: 40,
  },
  itemContainer: {
  flex: 1,
  justifyContent: 'flex-end',
  alignItems: 'center',
},
  modalCard: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
    backfaceVisibility: 'hidden',
    borderRadius: 10,
  },
  modal: {
    width: width - 25,
    height: height - 60,
    backgroundColor: '#ffe6e6',
    borderRadius: 10,
    padding: 10,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5, // increased opacity
        shadowRadius: 5, // increased radius
      },
      android: {
        elevation: 5,
      },
    }),
  },
  closeButton: {
    alignSelf: 'flex-end',
    padding: 10,
  },
  closeButtonText: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 15,
    fontWeight:'bold'
  },
  marginSubtitleTop: {
    marginTop: 20,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },

  imageBorder: {
    borderWidth: 2,
    borderColor: '#ffe6e6',
    borderRadius: 12,
  },
  textStyle: {
    fontStyle: 'italic',
  },
  iconStyle: {
    color: "#ffcc00"
  },
  addToFavoritesItems: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bouquetMargin: {
  margin: 5,
  },
  imageOverlay: {
  position: 'absolute',
  alignItems: 'center',
  justifyContent: 'center',
},

imageText: {
  color: 'white',
  fontSize: 16,
  fontWeight: 'bold',
},
});
