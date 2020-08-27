import React from 'react';
import {createStackNavigator, StackHeaderProps} from '@react-navigation/stack';
import {Button, Text, View} from 'react-native';
import {CartStackParamList} from '../types';
import {CheckoutScreen} from '../../components/CheckoutScreen/index'

import OrderConfirmation from '../../components/orderConfirmation';
import AddAddress from '../../components/orderConfirmation/addAddress';
const Stack = createStackNavigator<CartStackParamList>();

export default function CartNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen name={'Cart'} component={ExampleCart} />
      <Stack.Screen name={'CheckOut'} component={OrderCheckOut} />
      <Stack.Screen name={'OrderConfirmation'} component={OrderConfirmation} />
      <Stack.Screen name={'Cart3'} component={CheckoutScreen} />
      {/*Agregar aqui las pantallas del carrito.
          La que está primero es la que se muestra por default*/}
      <Stack.Screen name={'AddAddress'} component={AddAddress} />
    </Stack.Navigator>
  );
}
function ExampleCart({navigation}:StackHeaderProps) {
  const pressHandler = () =>{ navigation.navigate('CheckOut') }
  return (
    <View>
      <Text>Cart with all the products</Text>
        <Button title={'Carrito de compras'} onPress={pressHandler}/>
    </View>
  );
}

function OrderCheckOut({navigation}:StackHeaderProps) {
  const pressHandler = () =>{ navigation.navigate('OrderConfirmation', {total:100}) }
  return (
    <View>
      <Text>Shopping cart</Text>
      <Button title={'Confirmar pedido'} onPress={pressHandler}/>
    </View>
  );
}
