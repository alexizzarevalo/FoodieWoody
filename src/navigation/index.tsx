import React from 'react';
import { NavigationContainer, useFocusEffect, useIsFocused } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import CartNavigation from './cart_Navigation';
import LoginScreen from "../components/loginScreen";
import useUser from '../hooks/useUser';
import SearchNavigation from './search_Navigation';
import myRecipesNavigation from './myRecipesNavigation';
import RegisterN from '../components/register';
import RegistroNegocio from '../components/registroNegocio';
import { DrawerParamList } from './types';
import { View, ActivityIndicator, Text } from 'react-native';
import auth from "@react-native-firebase/auth";

const Drawer = createDrawerNavigator<DrawerParamList>();

export default function Navigation() {
  const { userData, isLogged } = useUser();

  return (
    <NavigationContainer>
      <Drawer.Navigator drawerType={'back'}>
        {
          !isLogged ?
            <>
              <Drawer.Screen options={{ title: 'Iniciar sesión' }} name={'Login'} component={LoginScreen} />
              <Drawer.Screen options={{ title: 'Registrarse' }} name={'Register'} component={RegisterN} />
              <Drawer.Screen options={{ title: 'Registrar Negocio' }} name={'RegistroNegocio'} component={RegistroNegocio} />
            </>
            :
            <>
              {userData?.rol == 'negocio' ?
                <>
                  <Drawer.Screen options={{ title: 'Mis recetas' }} name={'ListOfRecipes'} component={myRecipesNavigation} />
                </> :
                <>
                  <Drawer.Screen options={{ title: 'Inicio - Recetas' }} name={'Search'} component={SearchNavigation} />
                </>
              }
              <Drawer.Screen options={{ title: 'Cerrar sesión' }} name={'Logout'} component={Logout} />
            </>
        }
        <Drawer.Screen options={{ title: 'Acerca de Foodie Woody' }} name={'AcercaDe'} component={About} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

function Logout() {
  const useFocused = useIsFocused();

  React.useEffect(() => {
    useFocused && auth().signOut();
  }, [useFocused]);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator color="orange" size={30}></ActivityIndicator>
    </View>
  )
}

function About() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#f87c09' }}>
      <View>
        <Text style={{ fontSize: 40, color: 'white' }}>Foodie Woody</Text>
      </View>
      <View>
        <Text style={{ color: 'white' }}>v1.0.0</Text>
      </View>
      <View>
        <Text style={{ color: 'white' }}>Aplicacion donde puedes compartir tus recetas</Text>
      </View>
    </View>
  )
}
