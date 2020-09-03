import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { CartStackParamList } from '../types';
import OrderCheckout from '../../components/orderCheckout'
import OrderConfirmation from '../../components/orderConfirmation';

const Stack = createStackNavigator<CartStackParamList>();

export default function CartNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen name={'OrderCheckout'} component={OrderCheckout} />
      <Stack.Screen name={'OrderConfirmation'} component={OrderConfirmation} />
    </Stack.Navigator>
  );
}
