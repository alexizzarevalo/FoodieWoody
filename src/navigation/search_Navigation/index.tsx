import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {SearchStackParamList} from '../types';
import SearchScreen from '../../components/SearchScreen';

const Stack = createStackNavigator<SearchStackParamList>();

export default function SearchNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen name={'Search'} options={{headerShown: false}} component={SearchScreen} />
      {/*Agregar aqui las pantallas del carrito.
          La que está primero es la que se muestra por default*/}
    </Stack.Navigator>
  );
}