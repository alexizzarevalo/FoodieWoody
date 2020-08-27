import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {Text, View} from 'react-native';
import CartNavigation from './cart_Navigation';
import {DrawerParamList} from './types';

const Drawer = createDrawerNavigator<DrawerParamList>();

export default function Navigation() {
  return (
    <NavigationContainer>
      <Drawer.Navigator drawerType={'back'}>
        <Drawer.Screen name={'Login'} component={ExampleLogin} />
        <Drawer.Screen name={'Cart'} component={CartNavigation} />
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
