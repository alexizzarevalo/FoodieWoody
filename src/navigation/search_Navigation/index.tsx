import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {SearchStackParamList} from '../types';
import SearchScreen from '../../components/SearchScreen';
import DetalleReceta from '../../components/DetalleReceta/DetalleReceta';
import CartNavigation from '../cart_Navigation';

const Stack = createStackNavigator<SearchStackParamList>();

export default function SearchNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen name={'Search'} options={{headerShown: false}} component={SearchScreen} />
      <Stack.Screen name={'DetalleReceta'} options={{headerShown: true}} component={DetalleReceta} />
      <Stack.Screen name={'Checkout'} component={CartNavigation} />
      {/*Agregar aqui las pantallas del carrito.
          La que está primero es la que se muestra por default*/}
    </Stack.Navigator>
  );
}