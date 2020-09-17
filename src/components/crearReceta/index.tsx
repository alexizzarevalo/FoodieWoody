import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  StatusBar,
} from 'react-native';


declare const global: {HermesInternal: null | {}};

const CrearReceta = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <Text> Crea una receta </Text>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({

});

export default CrearReceta;
