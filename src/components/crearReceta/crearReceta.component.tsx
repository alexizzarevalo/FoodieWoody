import React, { useEffect, useState } from 'react';
import Template from './crearReceta.view';
import  {firebase,FirebaseFirestoreTypes} from '@react-native-firebase/firestore';

function add_receta(desc:any,nombrer:any,costo:any){
    return new Promise((resolve) => {firebase.firestore()
      .collection('ordenes')
      .add({
            descripcion: desc,
            id: "prueba",
            imagen: "https://dam.cocinafacil.com.mx/wp-content/uploads/2019/08/comida-tailandesa.jpg",
            negocio_id: "users/Z2Pzggc3gem8Bx5qsbgD", 
            nombre: nombrer,
            pasos: {},
            precio: parseInt(costo)
      })
      .then(resolve);
    })
  }

export default function crearReceta(
    { route, navigation }: any) {
    const [nombrer, setNombrer] = useState('');
    const [costo, setCosto] = useState('');
    const [desc, setDesc] = useState('');
    const [ingredientes, setIngredientes] = useState('');
    const [preparacion, setPreparacion] = useState('');
    const pressHandler = () => {
        add_receta(desc,nombrer,costo)
          .then(() => {
            console.log('Receta agregada!');
          })
  }

    return(
      <Template pressHandler={pressHandler}/>
    )
  }