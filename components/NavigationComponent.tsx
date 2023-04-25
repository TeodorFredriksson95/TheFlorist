import { Text, TouchableOpacity, FlatList as VirtualizedList, View} from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
import LandingPage from './FlowerComponent';
import FavoritesPage from './FavoritesComponent';

const Stack = createStackNavigator();

const NavigationBar = () => {
  return (
    <View style={{ height: 50, backgroundColor: '#ccc', alignItems: 'center', justifyContent: 'center' }}>
      <Text>Navigation Bar</Text>
    </View>
  )
}

export default NavigationBar