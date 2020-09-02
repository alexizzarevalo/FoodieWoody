// https://jestjs.io/docs/en/getting-started#using-typescript
// https://github.com/invertase/react-native-firebase/issues/2475
// https://www.youtube.com/watch?v=06myVn41OTY
// https://callstack.github.io/react-native-testing-library/
// https://reactjs.org/docs/test-renderer.html
export default jest.mock('@react-native-firebase/auth', () => {
  auth: jest.fn(() => ({
    logEvent: jest.fn(),
    setUserProperties: jest.fn(),
    setUserId: jest.fn(),
    setCurrentScreen: jest.fn(),
  }))
});


