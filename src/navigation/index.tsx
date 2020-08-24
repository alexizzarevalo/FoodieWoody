import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import CartNavigation from './cart_Navigation';
import {DrawerParamList} from './types';
import LoginScreen from "../components/loginScreen";

const Drawer = createDrawerNavigator<DrawerParamList>();

export default function Navigation() {
  return (
    <NavigationContainer>
      <Drawer.Navigator drawerType={'back'}>
        <Drawer.Screen name={'Login'} component={LoginScreen} />
        <Drawer.Screen name={'Cart'} component={CartNavigation} />
        {/*Agregar aqui las demas pantallas*/}
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
