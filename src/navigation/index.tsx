import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {Text, View} from 'react-native';
import CartNavigation from './cart_Navigation';

const Drawer = createDrawerNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
      <Drawer.Navigator drawerType={'back'}>
        <Drawer.Screen name={'Login'} component={ExampleLogin} />
        <Drawer.Screen name={'Cart'} component={CartNavigation} />
        {/*Agregar aqui las demas pantallas*/}
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

function ExampleLogin() {
  return (
    <View style={{flex: 1}}>
      <Text>Hello world</Text>
    </View>
  );
}
