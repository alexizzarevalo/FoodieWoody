import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Text, View} from 'react-native';

const Stack = createStackNavigator();

export default function CartNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen name={'Cart'} component={ExampleCart} />
      {/*Agregar aqui las pantallas del carrito.
          La que está primero es la que se muestra por default*/}
    </Stack.Navigator>
  );
}

function ExampleCart() {
  return (
    <View>
      <Text>Cart</Text>
    </View>
  );
}
