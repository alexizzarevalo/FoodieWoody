import React from 'react';
import {createStackNavigator, StackHeaderProps, StackScreenProps} from '@react-navigation/stack';
import {Button, Text, View} from 'react-native';
import {CartStackParamList} from '../types';
import OrderCheckout from '../../components/orderCheckout'
import OrderConfirmation from '../../components/orderConfirmation';
import Cart from '../../components/cart';
const Stack = createStackNavigator<CartStackParamList>();

export default function CartNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen name={'Cart'} component={Cart}/>
      <Stack.Screen name={'OrderCheckout'} component={OrderCheckout} />
      <Stack.Screen name={'OrderConfirmation'} component={OrderConfirmation} />
    </Stack.Navigator>
  );
}
