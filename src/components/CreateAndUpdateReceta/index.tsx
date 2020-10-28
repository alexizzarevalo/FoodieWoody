import React from 'react';
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import useCreateAndUpdateRecipeState, { Props } from "./state";

export default function Template({ update }: Props) {
  const { recipe, actions } = useCreateAndUpdateRecipeState({ update });

  return (
    <View style={{flex: 1, backgroundColor: '#f87c09'}}>
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.titulo}>{update ? 'Actualizar receta' : 'Crear receta'}</Text>
          <Text style={styles.textos}> Nombre: </Text>
          <TextInput
            testID={"nombre"}
            style={styles.texti}
            underlineColorAndroid="transparent"
            placeholder="Escribe un nombre para la receta"
            value={recipe.name.value}
            onChangeText={recipe.name.onChange}
          />
          <View style={styles.separador}></View>
          <Text style={styles.textos}> Descripción: </Text>
          <TextInput
            style={styles.texti}
            testID={"desc"}
            underlineColorAndroid="transparent"
            placeholder="Agrega una descripcion a tu receta"
            multiline
            value={recipe.description.value}
            onChangeText={recipe.description.onChange}
          />
          <View style={styles.separador}></View>
          <Text style={styles.textos}> Ingredientes: </Text>
          {
            recipe.ingredients.value.map((value, index) =>
              <View style={{ flexDirection: 'row', marginHorizontal: 8, marginVertical: 8 }}>
                <View style={{ width: '85%' }}>
                  <Text style={{ fontSize: 16 }}>• {value}</Text>
                </View>
                <View style={{ width: '15%' }}>
                  <View style={{ flex: 1 }}>
                    <TouchableOpacity style={{
                      backgroundColor: 'transparent',
                      width: '100%',
                      height: '100%',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: 8
                    }} onPress={() => recipe.ingredients.remove(index)}>
                      <Text style={{ fontSize: 16 }}>x</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            )
          }
          <View style={{ flexDirection: 'row', marginHorizontal: 8 }}>
            <View style={{ width: '85%' }}>
              <TextInput
                style={[styles.texti, { marginHorizontal: 0, marginRight: 8 }]}
                testID={"ingredientes"}
                blurOnSubmit={false}
                underlineColorAndroid="transparent"
                placeholder="Agrega un ingrediente..."
                value={recipe.ingredients.temp.value}
                onChangeText={recipe.ingredients.temp.onChange}
                onSubmitEditing={recipe.ingredients.add}
              />
            </View>
            <View style={{ width: '15%' }}>
              <View style={{ flex: 1 }}>
                <TouchableOpacity style={{
                  backgroundColor: 'purple',
                  width: '100%',
                  height: '100%',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 8
                }} onPress={recipe.ingredients.add}>
                  <Text style={{ fontSize: 30 }}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={styles.separador}></View>
          <Text style={styles.textos}> Tiempo de preparación: </Text>
          <TextInput
            style={styles.texti}
            testID={"preparacion"}
            underlineColorAndroid="transparent"
            placeholder=""
            keyboardType="numeric"
            value={recipe.time.value.toString()}
            onChangeText={recipe.time.onChange}
          />
          <View style={styles.separador}></View>
          <Text style={styles.textos}> Costo total: </Text>
          <TextInput
            style={styles.texti}
            testID={"total"}
            underlineColorAndroid="transparent"
            placeholder=""
            keyboardType="numeric"
            value={recipe.price.value.toString()}
            onChangeText={recipe.price.onChange}
          />
          <View style={{ flex: 1, margin: 8 }}>
            <TouchableOpacity style={{
              backgroundColor: 'purple',
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
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#f87c09'
  },
  textos: {
    marginBottom: 5,
    marginHorizontal: 8,
    color: 'white',
    fontSize: 18
  },
  titulo: {
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 20,
    fontSize: 30,
    color: 'white',
    fontWeight: 'bold'
  },
  texti: {
    marginHorizontal: 8,
    backgroundColor: 'white',
    borderWidth: 0,
    borderRadius: 5,
    fontSize: 16
  },
  boton: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10,
    width: '80%',
    justifyContent: 'flex-end',
    alignSelf: 'center',
    marginTop: 20
  },
  separador: {
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
    marginTop: 10,
    marginBottom: 10
  }
});