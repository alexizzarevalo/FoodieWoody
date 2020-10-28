import { DrawerScreenProps } from '@react-navigation/drawer';
import React from 'react';
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
  Image,
  ScrollView, ActivityIndicator
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { DrawerParamList } from '../../navigation/types';
import useCreateAndUpdateRecipeState from "./state";
import MultipleData from "./MultipleData";

export default function CreateAndUpdateRecipe(props: DrawerScreenProps<DrawerParamList, 'CrearReceta'>) {
  const { recipe, actions, update, loading } = useCreateAndUpdateRecipeState(props);

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={{
          backgroundColor: '#f87c09',
          flex: 1,
          flexDirection: 'row',
          justifyContent: update ? 'space-between' : 'flex-start',
          alignItems: 'center',
          paddingHorizontal: 20
        }}>
          <Icon testID="searchIcon" name={'back'} color="black" size={40} onPress={actions.goBack} ></Icon>
          <Text style={{ paddingLeft: update ? 0 : 15, fontSize: 25, fontWeight: 'bold', color: 'white' }}>{update ? 'Actualizar receta' : 'Crear receta'}</Text>
          {
            update ?
              <Icon testID="deleteIcon" name={'delete'} color="black" size={30} onPress={actions.deleteRecipe} ></Icon> : null
          }
        </View>
      </View>
      <View style={styles.container}>
        <View style={{ flex: 1, overflow: 'hidden', borderTopRightRadius: 30, borderTopLeftRadius: 30, backgroundColor: 'white' }}>
          {
            loading ?
              <View style={{ flex: 1, justifyContent: 'center' }}>
                <ActivityIndicator size={50} color="orange" />
              </View> :
              <ScrollView>
                <View style={{ height: 200, borderBottomLeftRadius: 30, borderBottomRightRadius: 30, overflow: 'hidden' }}>
                  {
                    recipe.image.value.length === 0 ?
                      <View style={{ flex: 1, backgroundColor: '#f2f2f2' }}>
                        <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%' }}>
                          <Text style={{ color: 'black' }}>Toca para agregar una imagen</Text>
                        </TouchableOpacity>
                      </View>
                      : <Image
                        style={{ flex: 1, width: '100%', height: '100%' }}
                        resizeMode="cover"
                        source={{ uri: recipe.image.value }} />
                  }
                </View>
                <Text style={styles.textos}> Nombre: </Text>
                <TextInput
                  testID={"nombre"}
                  style={styles.input}
                  underlineColorAndroid="transparent"
                  placeholder="Escribe un nombre para la receta"
                  value={recipe.name.value}
                  onChangeText={recipe.name.onChange}
                />
                <Text style={styles.textos}> Descripción: </Text>
                <TextInput
                  style={styles.input}
                  testID={"desc"}
                  underlineColorAndroid="transparent"
                  placeholder="Agrega una descripcion a tu receta"
                  multiline
                  value={recipe.description.value}
                  onChangeText={recipe.description.onChange}
                />
                <MultipleData key={0} provider={recipe.ingredients} title="Ingredientes:" placeholder="Agrega un ingrediente..."></MultipleData>
                <MultipleData key={1} provider={recipe.steps} title="Pasos para la preparacion:" placeholder="Agrega un paso..."></MultipleData>
                <Text style={styles.textos}> Tiempo de preparación: </Text>
                <TextInput
                  style={styles.input}
                  testID={"preparacion"}
                  underlineColorAndroid="transparent"
                  placeholder=""
                  keyboardType="numeric"
                  value={String(recipe.time.value)}
                  onChangeText={recipe.time.onChange}
                />
                <Text style={styles.textos}> Costo total: </Text>
                <TextInput
                  style={styles.input}
                  testID={"total"}
                  underlineColorAndroid="transparent"
                  placeholder=""
                  keyboardType="numeric"
                  value={recipe.price.value.toString()}
                  onChangeText={recipe.price.onChange}
                />
                <View style={{ flex: 1, margin: 8 }}>
                  <TouchableOpacity style={{
                    backgroundColor: '#f87c09',
                    width: '100%',
                    height: '100%',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 8,
                    padding: 8
                  }} onPress={actions.handleSubmit}>
                    <Text style={{ fontSize: 25, color: 'white' }}>{update ? 'Actualizar' : 'Guardar'}</Text>
                  </TouchableOpacity>
                </View>
              </ScrollView>
          }
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#f87c09'
  },
  headerContainer: {
    height: 80,
  },
  textos: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#05375a',
    marginTop: 10,
    marginBottom: 5,
    marginLeft: 5
  },
  input: {
    marginTop: 10,
    marginHorizontal: 8,
    fontSize: 16,
    color: '#05375a',
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5
  }
});