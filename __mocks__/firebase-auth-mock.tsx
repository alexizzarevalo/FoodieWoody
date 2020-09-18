// https://jestjs.io/docs/en/getting-started#using-typescript
// https://github.com/invertase/react-native-firebase/issues/2475
// https://www.youtube.com/watch?v=06myVn41OTY
// https://callstack.github.io/react-native-testing-library/
// https://reactjs.org/docs/test-renderer.html

const signInWithEmailAndPassword = (email: string, password: string): Promise<string> => {
  return Promise.resolve('Ha iniciado sesion')
}

const sendPasswordResetEmail = (email: string): Promise<string> => {
  return Promise.resolve('Hola');
}

export const auth = () => {
  return {
    signInWithEmailAndPassword,
    sendPasswordResetEmail
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


