import React, {Component} from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList, Alert, SafeAreaView} from 'react-native';
import Element from './Element'

class VerModificarPerfil extends Component {

  constructor(props: any){
    super(props);
    this.state = {
      datos : [
        { tipo : "Nombre", contenido : "User 1", key : '0' },
        { tipo : "Correo", contenido : "correo@user1.com", key : '1' },
        { tipo : "Telefono", contenido : "12345678", key : '2' },
        { tipo : "Dirección", contenido : "Mixco, Guatemala", key : '3' }
      ]
    }
  }
  separador = () => {
    return(
      <View
        style={styles.separador}
      ></View>
    )
  }
  render(){
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.top}>
          <Image
            style={styles.imagen}
            source={{
              uri: 'https://reactnative.dev/img/tiny_logo.png',
            }}
          />
        </View>
        <View style={styles.bottom}>
          <FlatList
            data = {this.state.datos}
            renderItem ={ ({item}) => <Element data={item}></Element> }
            horizontal = {false}
            ItemSeparatorComponent = {this.separador}
            ListEmptyComponent = { <Text style={{ marginTop :40 }}> No hay elementos en la lista</Text>}
          ></FlatList>
          <TouchableOpacity 
            style={styles.contenedorboton}
            onPress={() => Alert.alert('Editaste tu perfil!')}
          >
            <Text style={styles.textoboton}>Editar</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  top : {
    flex: 1,
    backgroundColor: '#F87C09',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottom : {
    flex: 2,
    backgroundColor: '#e9e8e8',
  },
  imagen : {
    width: 170,
    height: 170,
    borderRadius: 170 / 2,
    overflow: "hidden",
    borderWidth: 4,
    borderColor: "purple"
  },
  contenedorboton : {
    backgroundColor: "#2d74ee",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    alignSelf : "center",
    marginBottom : 30
   
  },
  textoboton : {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase"
  },
  separador : {
    height : 1,
    width : '100%',
    backgroundColor : 'gray',
    marginVertical : 5
  }
});


export default VerModificarPerfil;