import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Text, View} from 'react-native';
import {CartStackParamList} from '../types';
import {CheckoutScreen} from '../../components/CheckoutScreen/index'

const Stack = createStackNavigator<CartStackParamList>();

export default function CartNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen name={'Cart'} component={ExampleCart} />
      <Stack.Screen name={'Cart3'} component={CheckoutScreen} />
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
