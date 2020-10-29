import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { MyRecipesStackParamList } from '../types';
import ListOfRecipesScreen from '../../components/ListOfRecipesScreen';
import CreateAndUpdateRecipe from '../../components/CreateAndUpdateRecipe';

const Stack = createStackNavigator<MyRecipesStackParamList>();

export default function SearchNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen name={'ListOfRecipes'} options={{ headerShown: false }} component={ListOfRecipesScreen} />
      <Stack.Screen name={'CreateAndUpdateRecipe'} options={{ headerShown: false }} initialParams={{ id: '' }} component={CreateAndUpdateRecipe} />
    </Stack.Navigator>
  );
}