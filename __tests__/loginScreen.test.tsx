import '../__mocks__/firebase-auth-mock';

import React from 'react';
import renderer from 'react-test-renderer'
import LoginScreen from '../src/components/loginScreen'

describe('Login screen component', () => {
    test('renders', () => {
        renderer.create(<LoginScreen navigation={null}/>)
    })
})