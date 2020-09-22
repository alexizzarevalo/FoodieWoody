import { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore"

const createUserWithEmailAndPassword = (email: string, password: string): Promise<String> => {
  return Promise.resolve('Usuario Registrado')

}

export const auth = () => {
  return {
      createUserWithEmailAndPassword
  }
}

export const firebase = {
  auth
}

export default jest.mock('@react-native-firebase/auth', () => {
  return {
    firebase
  }
});


