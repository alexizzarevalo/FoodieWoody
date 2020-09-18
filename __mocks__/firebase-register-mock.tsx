import { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore"

const signInWithEmailAndPassword = (email: string, password: string): Promise<FirebaseAuthTypes.UserCredential> => {
  return new Promise((resolve, reject) => {
      return reject(new Error('auth/wrong-password'))
  })
}

export const auth = () => {
  return {
    signInWithEmailAndPassword
  }
}


export default jest.mock('@react-native-firebase/auth', () => {
  return {
    firebase: {
      auth
    }
  }
});


