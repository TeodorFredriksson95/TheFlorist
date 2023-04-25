import React from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { FontAwesome5 } from '@expo/vector-icons';
import LandingPage from './FlowerComponent';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const CustomDrawerContent = (props: any) => {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem
        label="Close menu"
        onPress={() => props.navigation.closeDrawer()}
      />
    </DrawerContentScrollView>
  );
};

const HeaderLeft = ({ navigation }: any) => {
  return (
    <TouchableOpacity onPress={() => navigation.openDrawer()}>
      <FontAwesome5 name="bars" size={20} color="black" />
    </TouchableOpacity>
  );
};

const LandingPageStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="LandingPage"
        component={LandingPage}
        options={({ navigation }) => ({
          title: 'Flowers',
          headerLeft: () => <HeaderLeft navigation={navigation} />,
        })}
      />
    </Stack.Navigator>
  );
};

const navbar = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator drawerContent={(props: any) => <CustomDrawerContent {...props} />}>
        <Drawer.Screen name="LandingPageStack" component={LandingPageStack} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default navbar;
