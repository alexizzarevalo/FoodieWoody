// https://jestjs.io/docs/en/getting-started#using-typescript
// https://github.com/invertase/react-native-firebase/issues/2475
// https://www.youtube.com/watch?v=06myVn41OTY
// https://callstack.github.io/react-native-testing-library/
// https://reactjs.org/docs/test-renderer.html

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


