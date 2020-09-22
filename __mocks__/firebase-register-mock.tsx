import { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore"

const createUserWithEmailAndPassword = (email: string, password: string): Promise<String> => {
  return Promise.resolve('Usuario Registrado')

}

export const auth = (value:any) => {
  return {
      createUserWithEmailAndPassword
  }
}

const set = () => {
  return Promise.resolve('')
}

const doc = (idt: string)=>{
  return{
    set
  }
}

const get = () => {
  return{
    doc
  }
}

const collection = (name: string) => {
  return {
      get
  }
}

export const firestore = () => {
  return {
      collection,
  }
}

export const firebase = {
  auth,
  firestore  
}



export default jest.mock('@react-native-firebase/auth', () => {
  return {
    firebase
  }
});


