import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {Text, View} from 'react-native';

const Drawer = createDrawerNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
      <Drawer.Navigator drawerType={'back'}>
        <Drawer.Screen name={'Iniciar sesión'} component={ExampleComponent} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

function ExampleComponent() {
  return (
    <View style={{flex: 1}}>
      <Text>Hello world</Text>
    </View>
  );
}
