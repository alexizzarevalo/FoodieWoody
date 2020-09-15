import { FirebaseAuthTypes } from "@react-native-firebase/auth";

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


